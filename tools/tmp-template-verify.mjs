// Usage: node tools/tmp-template-verify.mjs <url>
// Verifies ambiguous shared-template findings against a live package page:
// press heading size + logo sizes/order, dual heading size, hero CTA width,
// secret image radius + panel gradient, benefit/evidence card gradients,
// hero price-note transform, all "claim ... spot" CTA labels with positions,
// FAQ heading/question/answer styles, dual price-line styles, tech-card header,
// hero stars row.
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await p.evaluate(async () => {
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(1500);
const out = await p.evaluate(() => {
  const norm = (s) => (s || '').replace(/\s+|​/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
  const info = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return { text: norm(el.textContent).slice(0, 70), y: Math.round(r.top + scrollY), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), font: cs.fontFamily.split(',')[0], size: cs.fontSize, weight: cs.fontWeight, color: cs.color, tt: cs.textTransform, bg: cs.backgroundColor, bgi: cs.backgroundImage.slice(0, 140), br: cs.borderRadius };
  };
  const findText = (re, tags = 'h1,h2,h3,h4,p,span,a,div,li,button') => {
    let best = null;
    document.querySelectorAll(tags).forEach((el) => {
      if (el.children.length > 3) return;
      if (!re.test(norm(el.textContent))) return;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const area = r.width * r.height;
      if (best && best._a <= area) return;
      best = { _a: area, ...info(el) };
    });
    if (best) delete best._a;
    return best;
  };
  const res = {};
  // press heading
  res.pressHeading = findText(/trusted clinic for/);
  // press logos: imgs within 0..400px below press heading
  if (res.pressHeading) {
    const y0 = res.pressHeading.y;
    res.pressLogos = [...document.querySelectorAll('img')].map((im) => {
      const r = im.getBoundingClientRect();
      return { src: (im.src || '').split('/').pop().slice(0, 50), y: Math.round(r.top + scrollY), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) };
    }).filter((o) => o.y > y0 && o.y < y0 + 380 && o.w > 20).sort((a, b2) => a.x - b2.x);
  }
  // all claim CTAs
  res.ctas = [...document.querySelectorAll('a,button')].filter((el) => /claim (my|your) spot now/.test(norm(el.textContent)) && el.children.length < 4).map((el) => info(el)).filter((o) => o.w && o.h && o.h < 120);
  // dual heading: contains 'starter pack' or 'protocol' as h2-ish big text
  res.dualHeading = findText(/(starter pack|smoothing & contouring protocol|contouring starter)/, 'h2,h3,p,span,div');
  // secret subheading panel: elements whose backgroundImage references rgba(142, 176, 147
  res.greenGradients = [];
  document.querySelectorAll('div,section').forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.backgroundImage.includes('142, 176, 147')) {
      const r = el.getBoundingClientRect();
      if (r.width > 100) res.greenGradients.push({ y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), br: cs.borderRadius, bgi: cs.backgroundImage.slice(0, 160) });
    }
  });
  // all linear-gradient backgrounds (unique), to inspect benefit/evidence cards
  const grads = new Map();
  document.querySelectorAll('div,section,li').forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.backgroundImage.startsWith('linear-gradient')) {
      const r = el.getBoundingClientRect();
      if (r.width < 80 || r.height < 60) return;
      const k = cs.backgroundImage;
      if (!grads.has(k)) grads.set(k, []);
      if (grads.get(k).length < 3) grads.get(k).push({ y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), br: cs.borderRadius });
    }
  });
  res.gradients = [...grads.entries()].map(([g, els]) => ({ g: g.slice(0, 180), els }));
  // images with petal/non-uniform radius
  res.petalImgs = [...document.querySelectorAll('img')].map((im) => {
    const cs = getComputedStyle(im);
    const r = im.getBoundingClientRect();
    return { src: (im.src || '').split('/').pop().slice(0, 40), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), br: cs.borderRadius };
  }).filter((o) => o.w > 150 && o.br && o.br !== '0px' && o.br.includes(' '));
  // hero price note
  res.priceNote = findText(/for individual sessions?$/);
  res.priceLine = findText(/^total value:/);
  // dual price pieces
  res.todayPrices = [...document.querySelectorAll('span,p,b,strong')].filter((el) => /^€\d+ only\.?$/.test(norm(el.textContent))).map(info);
  // FAQ bits
  res.faqHeading = findText(/^frequently asked questions$/);
  res.faqQ1 = findText(/^1\. /);
  res.faqSearch = (() => { const i = document.querySelector('input[placeholder*="Looking"]'); return i ? info(i) : null; })();
  // tech card header (eyebrow text varies); look for vertical-rule + tag near 'protocol)' or known eyebrows
  res.techTitle = findText(/(coolsculpting|emsculpt|ultrasound cavitation|velashape|lymphatic drainage therapy)/, 'h2,h3,h4,p,span');
  // tag pill candidates: elements with border-radius>=15 and border green
  res.pills = [...document.querySelectorAll('span,div,p')].filter((el) => {
    const cs = getComputedStyle(el);
    return parseFloat(cs.borderRadius) >= 15 && cs.borderWidth !== '0px' && cs.borderColor.includes('142');
  }).map(info).slice(0, 8);
  // stars row: 'over 200+ reviews'
  res.reviews = findText(/over 200\+ reviews/);
  if (res.reviews) {
    res.reviewImgs = [...document.querySelectorAll('img')].map((im) => {
      const r = im.getBoundingClientRect();
      return { src: (im.src || '').split('/').pop().slice(0, 50), y: Math.round(r.top + scrollY), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) };
    }).filter((o) => Math.abs(o.y - res.reviews.y) < 40 && o.w < 400);
  }
  // evidence eyebrow divider check: hairline elements under 'clinical research'
  res.evEyebrow = findText(/clinical research: basis of our met/);
  // hero media element
  const v = document.querySelector('video');
  if (v) { const r = v.getBoundingClientRect(); res.heroVideo = { y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height) }; }
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
