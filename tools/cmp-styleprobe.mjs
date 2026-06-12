// Usage: node tools/cmp-styleprobe.mjs <url>
// Probes computed styles of key homepage elements by exact (normalized) text.
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
  const probe = (label, text, opts = {}) => {
    let best = null;
    document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,a,button,div,li').forEach((el) => {
      if (el.children.length > 3) return;
      if (norm(el.textContent) !== text) return;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      // pick deepest match (smallest area)
      const area = r.width * r.height;
      if (best && best.area <= area) return;
      const cs = getComputedStyle(el);
      let bg = cs.backgroundColor; let node = el; let d = 0;
      while ((bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') && node.parentElement && d < 6) { node = node.parentElement; bg = getComputedStyle(node).backgroundColor; d++; }
      best = {
        area,
        label,
        y: Math.round(r.top + window.scrollY),
        x: Math.round(r.left),
        w: Math.round(r.width),
        font: cs.fontFamily.split(',')[0],
        size: cs.fontSize,
        weight: cs.fontWeight,
        color: cs.color,
        ls: cs.letterSpacing,
        tt: cs.textTransform,
        ta: cs.textAlign,
        lh: cs.lineHeight,
        bg,
      };
    });
    if (best) delete best.area;
    return best || { label, MISSING: text };
  };
  const res = [];
  res.push(probe('hero-h1', 'doctor-led slimming & weight loss in malta'));
  res.push(probe('asSeenOn', 'as seen on'));
  res.push(probe('pillars-eyebrow', '4 core pillars of our weight loss methodology'));
  res.push(probe('pillars-h2', "malta’s only multidisciplinary approach to slimming & weight-loss"));
  res.push(probe('pillar1-title', 'medical weight loss assessmen') || probe('pillar1-title', 'medical weight loss assessment'));
  res.push(probe('pillar1-sub', 'know your body before starting any program'));
  res.push(probe('cta-body-analysis', 'get your free body analysis') );
  res.push(probe('cta-body-analysis-arrow', 'get your free body analysis →'));
  res.push(probe('modalities-h2', 'explore our modalities'));
  res.push(probe('modality1-title', 'weight loss'));
  res.push(probe('explore-btn', 'explore'));
  res.push(probe('results-h2', 'our results-driven approach'));
  res.push(probe('results-sub', 'up to 1kg a week. measured. verified. committed to your weight loss'));
  res.push(probe('commitment', 'this is our extended care commitment'));
  res.push(probe('glp1-h2', 'medical weight loss in malta (glp-1)'));
  res.push(probe('glp1-optional', 'at our slimming clinic, glp-1 is an optional tool within your weight loss program, not a shortcut for everyone:'));
  res.push(probe('diff-eyebrow', 'the carisma difference'));
  res.push(probe('diff-h2', "malta’s #1 leading wellness chain"));
  res.push(probe('diff-commitment-h3', 'our commitment'));
  res.push(probe('diff-why-h3', 'why malta chooses carisma'));
  res.push(probe('parking', 'complimentary on-site parking'));
  res.push(probe('reviews-h2', 'real people, real reviews'));
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
