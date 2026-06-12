// Usage: node tools/tmp-qa-st-frames.mjs <url>
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
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 150); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(2500);
const out = await p.evaluate(() => {
  const res = { iframes: [], imgs: [] };
  document.querySelectorAll('iframe').forEach((f) => {
    const r = f.getBoundingClientRect();
    res.iframes.push({ src: (f.src || '').slice(0, 140), y: Math.round(r.top + scrollY), x: Math.round(r.x), w: Math.round(r.width), h: Math.round(r.height) });
  });
  document.querySelectorAll('img').forEach((im) => {
    const r = im.getBoundingClientRect();
    const y = Math.round(r.top + scrollY);
    if (y > 4400 && y < 6200 && r.width > 30) res.imgs.push({ src: (im.currentSrc || im.src || '').slice(0, 160), y, x: Math.round(r.x), w: Math.round(r.width), h: Math.round(r.height) });
  });
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
