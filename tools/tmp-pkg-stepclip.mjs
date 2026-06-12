// Usage: node tools/tmp-pkg-stepclip.mjs <stepN> <outfile> <y> <h>
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const [stepN, out, y = '3380', h = '1050'] = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto('https://www.carismaslimming.com/packages', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await p.evaluate(async () => {
  await new Promise((res) => { let yy = 0; const s = () => { window.scrollBy(0, 900); yy += 900; if (yy < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(1500);
await p.evaluate((nn) => {
  const tabs = Array.from(document.querySelectorAll('*')).filter((e) => e.children.length === 0 && new RegExp('^step\\s*' + nn + '$', 'i').test((e.textContent || '').trim()));
  for (const t of tabs) { let el = t; for (let i = 0; i < 6 && el; i++) { try { el.click(); } catch (x) {} el = el.parentElement; } }
}, stepN).catch(() => {});
await sleep(1200);
await p.screenshot({ path: out, clip: { x: 0, y: +y, width: 1440, height: +h } });
console.log('OK', out);
await b.close();
