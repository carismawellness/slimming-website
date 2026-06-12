// FINISHER probe: dump all elements between the "OUR TECHNOLOGY" eyebrow and the
// section heading on a live package page, to characterize the short divider.
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
const url = process.argv[2] || 'https://www.carismaslimming.com/skin-tightening';
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(4000);
await p.evaluate(async () => {
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(2000);
const eyeText = process.argv[3] || 'our technology';
const out = await p.evaluate((eyeText) => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
  let eye = null;
  document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span').forEach((e) => {
    if (norm(e.textContent) === eyeText && e.getBoundingClientRect().height > 0 && e.getBoundingClientRect().height < 60) eye = e;
  });
  if (!eye) return { err: 'eyebrow not found' };
  const er = eye.getBoundingClientRect();
  const top = er.bottom + window.scrollY - 2;
  const bot = top + 80;
  const found = [];
  document.querySelectorAll('*').forEach((e) => {
    const r = e.getBoundingClientRect();
    const y = r.top + window.scrollY;
    if (y >= top && y <= bot && r.height >= 0 && r.height <= 12 && r.width > 10 && r.width < 800) {
      const cs = getComputedStyle(e);
      found.push({ tag: e.tagName, id: e.id || '', cls: (e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className || '').toString().slice(0, 60), y: Math.round(y), x: Math.round(r.x), w: Math.round(r.width), h: +r.height.toFixed(1), bg: cs.backgroundColor, bt: cs.borderTop, bb: cs.borderBottom, txt: norm(e.textContent).slice(0, 30) });
    }
  });
  return { eyebrow: { y: Math.round(er.top + window.scrollY), bottom: Math.round(er.bottom + window.scrollY), x: Math.round(er.x), w: Math.round(er.width) }, found };
}, eyeText);
console.log(JSON.stringify(out, null, 1));
await b.close();
