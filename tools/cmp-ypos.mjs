// Usage: node tools/cmp-ypos.mjs <url>
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
await sleep(2500);
const out = await p.evaluate(() => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const targets = [
    'as seen on',
    '4 core pillars of our weight loss methodology',
    'explore our modalities',
    'our results-driven approach',
    'medical weight loss in malta (glp-1)',
    'the carisma difference',
    'real people, real reviews',
    'dr. zaid teebi',
  ];
  const found = {};
  for (const t of targets) {
    let best = null;
    document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div').forEach((el) => {
      if (norm(el.textContent) !== t) return;
      const r = el.getBoundingClientRect();
      if (r.height === 0) return;
      const y = Math.round(r.top + window.scrollY);
      if (best === null || y < best) best = y;
    });
    found[t] = best;
  }
  found['TOTAL'] = document.body.scrollHeight;
  // iframe heights
  found['IFRAMES'] = Array.from(document.querySelectorAll('iframe')).map((f) => {
    const r = f.getBoundingClientRect();
    return { src: (f.src || '').slice(0, 60), y: Math.round(r.top + window.scrollY), h: Math.round(r.height) };
  });
  return found;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
