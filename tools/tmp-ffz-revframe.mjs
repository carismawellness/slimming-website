import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto('https://www.carismaslimming.com/fat-reduction', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 4000));
await p.evaluate(() => window.scrollTo(0, 1100));
await new Promise((r) => setTimeout(r, 3000));
for (const f of p.frames()) {
  const u = f.url();
  if (u.includes('filesusr')) {
    const txt = await f.evaluate(() => document.body ? document.body.innerText.slice(0, 2000) : 'NOBODY').catch((e) => 'ERR ' + e.message);
    const imgs = await f.evaluate(() => [...document.querySelectorAll('img')].map((i) => i.src).slice(0, 12)).catch(() => []);
    console.log('FRAME', u.slice(0, 90));
    console.log(txt);
    console.log('IMGS', JSON.stringify(imgs, null, 1));
  }
}
await b.close();
