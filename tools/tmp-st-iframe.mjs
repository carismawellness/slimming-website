// Extract skin-tightening testimonial iframe inner text (names + quotes)
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/skin-tightening', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3000);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < 4000) setTimeout(s, 120); else res(); }; s(); }); });
await sleep(2500);
for (const f of pg.frames()) {
  if (!/filesusr/i.test(f.url())) continue;
  const txt = await f.evaluate(() => document.body ? document.body.innerText : '').catch(() => '');
  console.log('=== FRAME', f.url().slice(0, 100));
  console.log(txt);
}
await b.close();
