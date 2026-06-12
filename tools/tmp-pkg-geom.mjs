// Geometry probe: evidence cards, pillar cards, steps panel, promise, wellness chain
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
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const res = {};
  const findDeep = (sn) => {
    let best = null;
    document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div,a,li').forEach((el) => {
      if (!norm(el.textContent).includes(sn)) return;
      if (best === null || best.contains(el)) best = el;
      else if (el.textContent.length < best.textContent.length) best = el;
    });
    return best;
  };
  // evidence card titles
  const titles = ['energy-restricted mediterranean nutrition', 'higher-protein, muscle-protective diet', 'diet plus exercise (not diet alone)', 'cryolipolysis', 'hifem + rf body sculpting', 'infrared and vacuum massage', 'lymphatic drainage and recovery massage', 'why we combine approaches'];
  res.evidence = {};
  for (const t of titles) {
    const el = findDeep(t);
    if (!el) { res.evidence[t] = null; continue; }
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    res.evidence[t] = { tag: el.tagName, x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), fs: cs.fontSize, lh: cs.lineHeight, ff: cs.fontFamily.split(',')[0].slice(0, 25), color: cs.color };
  }
  // all imgs y>idx evidence start
  const evStart = findDeep('evidence based approach');
  const y0 = evStart ? evStart.getBoundingClientRect().top + scrollY : 0;
  res.evidenceHeadingY = Math.round(y0);
  res.imgs = [];
  document.querySelectorAll('img').forEach((m) => {
    const r = m.getBoundingClientRect();
    const y = r.top + scrollY;
    if (y > y0 - 100 && y < y0 + 3200 && r.width > 80) {
      res.imgs.push({ src: (m.currentSrc || m.src).slice(-50), x: Math.round(r.left), y: Math.round(y), w: Math.round(r.width), h: Math.round(r.height) });
    }
  });
  // badges
  res.badges = [];
  ['high-evidence', 'moderate-high evidence', 'emerging high-quality evidence', 'moderate evidence', 'adjunct - supportive', 'synergy'].forEach((t) => {
    const el = findDeep(t);
    if (el) {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      res.badges.push({ t, x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), fs: cs.fontSize, bg: cs.backgroundColor, color: cs.color });
    }
  });
  // pillar cards: find by title labels
  res.pillars = {};
  ['medical grade assessment', 'diet and accountability', 'exercise and movement', 'targeted body treatments'].forEach((t) => {
    const el = findDeep(t);
    if (!el) { res.pillars[t] = null; return; }
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    res.pillars[t] = { tag: el.tagName, x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), fs: cs.fontSize, lh: cs.lineHeight, color: cs.color, fw: cs.fontWeight, ff: cs.fontFamily.split(',')[0].slice(0, 25) };
  });
  // section anchors
  ['how it works', 'step 1', 'suitable for', 'our promise', 'common questions we hear', 'clinical research'].forEach((t) => {
    const el = findDeep(t);
    if (el) {
      const r = el.getBoundingClientRect();
      res[t] = { y: Math.round(r.top + scrollY), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) };
    }
  });
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
