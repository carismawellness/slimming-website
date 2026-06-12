import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto('https://www.carismaslimming.com/slimming-guide', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await p.evaluate(async () => {
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
});
await sleep(1000);
const targets = [
  "You've tried dieting before",
  'You want a quick fix',
  'You sit down. You eat protein first',
  'You stop dreading Monday mornings',
  'WEIGHT STABILITY',
  'STEP 2',
  'Visible inch loss and shape change',
  'OUR COMMITMENT',
  'Complimentary on-site parking',
  'Over 200+ Reviews',
  'If you have read this far',
  'Timing builds rhythm',
  'to Eat',
  'Maltese life is specific',
  'That is the system. Rhythm',
  'Adherence over perfection',
  'for ONLY',
];
const out = await p.evaluate((targets) => {
  const res = [];
  const all = [...document.querySelectorAll('span,p,h1,h2,h3,h4,h5,h6,div,li,a,button')];
  for (const t of targets) {
    const els = all.filter(e => (e.textContent || '').toLowerCase().includes(t.toLowerCase()) && e.children.length <= 1 && (e.textContent || '').length < 600);
    // pick deepest smallest
    let best = null;
    for (const e of els) { if (!best || e.textContent.length < best.textContent.length) best = e; }
    if (best) {
      const cs = getComputedStyle(best);
      const r = best.getBoundingClientRect();
      res.push({ t, tag: best.tagName, color: cs.color, fs: cs.fontSize, fw: cs.fontWeight, ls: cs.letterSpacing, ff: cs.fontFamily.slice(0, 30), w: Math.round(r.width) });
    } else res.push({ t, missing: true });
  }
  return res;
}, targets);
console.log(JSON.stringify(out, null, 1));
await b.close();
