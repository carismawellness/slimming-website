// Usage: node tools/tmp-qa-ms-probe2.mjs <url>
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(4000);
await p.evaluate(async () => {
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(2000);
const out = await p.evaluate(() => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const res = {};

  // 1. all imgs / bg-image divs in 4900-5500 (apple region)
  res.appleRegion = [];
  document.querySelectorAll('img').forEach((m) => {
    const r = m.getBoundingClientRect();
    const y = r.top + scrollY;
    if (y > 4850 && y < 5500 && r.width > 60) res.appleRegion.push({ src: decodeURIComponent((m.currentSrc || m.src).split('/').pop()).slice(0, 60), x: Math.round(r.left), y: Math.round(y), w: Math.round(r.width), h: Math.round(r.height) });
  });

  // 2. elig region 3100-3750: imgs and divs with bg-image or non-transparent bg
  res.eligRegion = [];
  document.querySelectorAll('img, div, section').forEach((m) => {
    const r = m.getBoundingClientRect();
    const y = r.top + scrollY;
    if (y > 3100 && y < 3700 && r.width > 200 && r.height > 150) {
      const cs = getComputedStyle(m);
      const bgi = cs.backgroundImage;
      if (m.tagName === 'IMG' || (bgi && bgi !== 'none') || cs.backgroundColor !== 'rgba(0, 0, 0, 0)') {
        res.eligRegion.push({ tag: m.tagName, src: m.tagName === 'IMG' ? decodeURIComponent((m.currentSrc || m.src).split('/').pop()).slice(0, 55) : bgi.slice(0, 55), x: Math.round(r.left), y: Math.round(y), w: Math.round(r.width), h: Math.round(r.height), br: cs.borderRadius, bg: cs.backgroundColor });
      }
    }
  });

  // 3. pill deep style: find deepest span with text ABDOMEN / CORE
  let deep = null;
  document.querySelectorAll('span, div, p, h1,h2,h3,h4,h5').forEach((el) => {
    if (norm(el.textContent).toUpperCase() === 'ABDOMEN / CORE' && el.children.length === 0) deep = el;
  });
  if (deep) {
    const cs = getComputedStyle(deep);
    res.pillSpan = { fs: cs.fontSize, fw: cs.fontWeight, color: cs.color, ff: cs.fontFamily.slice(0, 45), ls: cs.letterSpacing };
    // climb to find visible box
    let bx = deep; const chain = [];
    for (let i = 0; i < 8 && bx; i++) {
      const cs2 = getComputedStyle(bx);
      const r2 = bx.getBoundingClientRect();
      chain.push({ tag: bx.tagName, w: Math.round(r2.width), h: Math.round(r2.height), bg: cs2.backgroundColor, br: cs2.borderRadius, bd: cs2.border, sh: cs2.boxShadow.slice(0, 60) });
      bx = bx.parentElement;
    }
    res.pillChain = chain;
  }

  // 4. hero metrics
  const h1 = document.querySelector('h1');
  if (h1) {
    const r = h1.getBoundingClientRect(); const cs = getComputedStyle(h1);
    res.heroTitle = { text: norm(h1.textContent).slice(0, 40), x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), fs: cs.fontSize, lh: cs.lineHeight, color: cs.color };
  }
  // hero eyebrow
  let eb = null;
  document.querySelectorAll('p,span,h2,h3').forEach((el) => {
    const t = norm(el.textContent).toUpperCase();
    if ((t === 'EMSCULPT NEO MALTA' || t.endsWith('MED MALTA')) && el.children.length <= 1) eb = el;
  });
  if (eb) {
    const r = eb.getBoundingClientRect(); const cs = getComputedStyle(eb);
    res.heroEyebrow = { text: norm(eb.textContent), x: Math.round(r.left), y: Math.round(r.top + scrollY), fs: cs.fontSize, color: cs.color };
  }

  // 5. FAQ question y positions
  res.faqYs = [];
  for (let i = 1; i <= 10; i++) {
    let q = null;
    document.querySelectorAll('button, h2, h3, span, p, div').forEach((el) => {
      const t = norm(el.textContent);
      if (t.startsWith(`${i}. `) && t.length < 90 && (!q || el.textContent.length < q.textContent.length)) q = el;
    });
    if (q) { const r = q.getBoundingClientRect(); res.faqYs.push({ i, y: Math.round(r.top + scrollY), h: Math.round(r.height) }); }
  }

  // 6. dual heading
  let dh = null;
  document.querySelectorAll('h1,h2,h3,p,span').forEach((el) => {
    const t = norm(el.textContent).toLowerCase();
    if (t.startsWith('malta’s only dual technology') || t.startsWith("malta's only dual technology")) { if (!dh || el.textContent.length < dh.textContent.length) dh = el; }
  });
  if (dh) { const r = dh.getBoundingClientRect(); const cs = getComputedStyle(dh); res.dualHeading = { x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), fs: cs.fontSize, lh: cs.lineHeight, color: cs.color }; }

  // 7. "we are not / another diet clinic" colors
  res.diffHeading = [];
  document.querySelectorAll('h1,h2,h3,p,span').forEach((el) => {
    const t = norm(el.textContent).toLowerCase();
    if ((t === 'we are not' || t === 'another diet clinic.' || t === 'we are not another diet clinic.') && el.children.length <= 2) {
      const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      res.diffHeading.push({ text: norm(el.textContent), tag: el.tagName, x: Math.round(r.left), y: Math.round(r.top + scrollY), fs: cs.fontSize, color: cs.color });
    }
  });

  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
