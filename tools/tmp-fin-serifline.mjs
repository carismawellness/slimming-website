// FINISHER probe: any wixui-horizontal-line / hairline within 80px below the serif
// tech-card title row on a live package page.
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
const url = process.argv[2] || 'https://www.carismaslimming.com/anti-cellulite';
const titleText = process.argv[3] || 'velashape iii (cellulift protocol)';
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(4000);
await p.evaluate(async () => {
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(2000);
const out = await p.evaluate((titleText) => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
  let titleEl = null;
  document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span').forEach((e) => {
    if (norm(e.textContent) === titleText && e.getBoundingClientRect().height > 0 && e.getBoundingClientRect().height < 120) titleEl = e;
  });
  if (!titleEl) return { err: 'title not found' };
  const tr = titleEl.getBoundingClientRect();
  const top = tr.bottom + window.scrollY - 4;
  const bot = top + 84;
  const found = [];
  document.querySelectorAll('*').forEach((e) => {
    const r = e.getBoundingClientRect();
    const y = r.top + window.scrollY;
    if (y >= top && y <= bot && r.height >= 0 && r.height <= 12 && r.width > 30) {
      const cs = getComputedStyle(e);
      found.push({ tag: e.tagName, cls: ((e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className) || '').toString().slice(0, 60), y: Math.round(y), x: Math.round(r.x), w: Math.round(r.width), h: +r.height.toFixed(1), bt: cs.borderTop, bb: cs.borderBottom, bg: cs.backgroundColor });
    }
  });
  return { title: { y: Math.round(tr.top + window.scrollY), bottom: Math.round(tr.bottom + window.scrollY), x: Math.round(tr.x), w: Math.round(tr.width) }, found };
}, titleText);
console.log(JSON.stringify(out, null, 1));
await b.close();
