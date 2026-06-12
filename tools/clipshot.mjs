// Usage: node tools/clipshot.mjs <url> <outfile> <y> <height> [dsf=2]
import puppeteer from 'puppeteer-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
const out = process.argv[3];
const y = parseInt(process.argv[4] || '0', 10);
const h = parseInt(process.argv[5] || '400', 10);
const dsf = parseFloat(process.argv[6] || '2');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--window-size=1440,1000'],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: dsf });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
  await sleep(3500);
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let yy = 0;
      const step = () => {
        window.scrollBy(0, 900);
        yy += 900;
        if (yy < document.body.scrollHeight) setTimeout(step, 200);
        else resolve();
      };
      step();
    });
    window.scrollTo(0, 0);
  });
  await sleep(1500);
  await page.evaluate(() => {
    const closers = Array.from(document.querySelectorAll('button,[role="button"],a,span,div'))
      .filter((el) => {
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
  await sleep(800);
  await page.screenshot({ path: out, clip: { x: 0, y, width: 1440, height: h } });
  console.log('OK ' + out);
} finally {
  await browser.close();
}
