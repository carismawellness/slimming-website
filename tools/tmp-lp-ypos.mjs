// Usage: node tools/tmp-lp-ypos.mjs <url>
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3000);
await p.evaluate(async () => {
  await new Promise((res) => { let yy = 0; const s = () => { window.scrollBy(0, 900); yy += 900; if (yy < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(1200);
const rows = await p.evaluate(() => {
  const out = [];
  document.querySelectorAll('h1,h2,h3').forEach((el) => {
    const r = el.getBoundingClientRect();
    const t = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 70);
    if (r.height > 0 && t) out.push(`${el.tagName} y=${Math.round(r.top + window.scrollY)} h=${Math.round(r.height)} x=${Math.round(r.left)} w=${Math.round(r.width)} fs=${getComputedStyle(el).fontSize} color=${getComputedStyle(el).color} | ${t}`);
  });
  return out;
});
console.log(rows.join('\n'));
console.log('TOTAL', await p.evaluate(() => document.body.scrollHeight));
await b.close();
