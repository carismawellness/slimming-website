import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto('https://www.carismaslimming.com/lymphatic-drainage', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3000);
await p.evaluate(() => window.scrollTo(0, 1000));
await sleep(6000);
await p.evaluate(() => {
  // remove overlay popups
  const vw = window.innerWidth, vh = window.innerHeight;
  Array.from(document.querySelectorAll('*')).forEach((el) => {
    const s = getComputedStyle(el);
    const z = parseInt(s.zIndex) || 0;
    const r = el.getBoundingClientRect();
    const big = r.width > vw * 0.4 && r.height > vh * 0.4;
    if ((s.position === 'fixed' || s.position === 'absolute') && z >= 999 && big) el.remove();
  });
});
await sleep(1500);
await p.screenshot({ path: 'shots/cmp-lymph-live-carousel2.png', clip: { x: 0, y: 1000, width: 1440, height: 700 } });
console.log('OK');
await b.close();
