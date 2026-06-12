// Usage: node tools/cmp-clip.mjs <url> <outprefix> <y1,y2,y3...> [height=1000]
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
const prefix = process.argv[3];
const ys = process.argv[4].split(',').map(Number);
const H = parseInt(process.argv[5] || '1000', 10);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--window-size=1440,1050'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await p.evaluate(async () => {
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 150); else res(); }; s(); });
});
await sleep(2000);
// dismiss overlays
await p.evaluate(() => {
  const closers = Array.from(document.querySelectorAll('button,[role="button"],a,span,div')).filter((el) => {
    const t = (el.getAttribute('aria-label') || el.textContent || '').trim().toLowerCase();
    return t === 'close' || t === '×' || t === 'x' || t === 'no thanks' || t.includes('not interested');
  });
  closers.forEach((el) => { try { el.click(); } catch (e) {} });
  const vw = window.innerWidth, vh = window.innerHeight;
  Array.from(document.querySelectorAll('*')).forEach((el) => {
    const s = getComputedStyle(el);
    const z = parseInt(s.zIndex) || 0;
    const r = el.getBoundingClientRect();
    const big = r.width > vw * 0.5 && r.height > vh * 0.5;
    const fixedish = s.position === 'fixed' || s.position === 'absolute';
    if ((fixedish && z >= 1000 && big) || (el.tagName.toLowerCase() === 'iframe' && z >= 1000)) el.remove();
  });
});
let i = 0;
for (const y of ys) {
  await p.evaluate((yy) => window.scrollTo(0, yy), y);
  await sleep(900);
  const out = `${prefix}-y${y}.png`;
  await p.screenshot({ path: out });
  console.log('OK ' + out);
  i++;
}
await b.close();
