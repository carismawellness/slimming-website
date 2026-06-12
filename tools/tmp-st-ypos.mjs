// Usage: node tools/tmp-st-ypos.mjs <url>
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
    'the secret to a more defined, confident look',
    'eligibility criteria',
    'our technology',
    'velashape iii',
    'muscle strengthening, tone & metabolic support',
    'frequently asked questions',
    'evidence based approach',
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
  // dual heading: contains 'starter protocol'
  let dual = null;
  document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div').forEach((el) => {
    const t = norm(el.textContent);
    if (!t.startsWith('malta’s most effective') && !t.startsWith("malta's most effective")) return;
    const r = el.getBoundingClientRect();
    if (r.height === 0) return;
    const y = Math.round(r.top + window.scrollY);
    if (dual === null || y < dual) dual = y;
  });
  found['DUAL'] = dual;
  found['TOTAL'] = document.body.scrollHeight;
  return found;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
