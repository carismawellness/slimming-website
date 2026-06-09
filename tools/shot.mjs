// Usage: node tools/shot.mjs <url> <outfile> [fullpage:0|1]
import puppeteer from 'puppeteer-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
const out = process.argv[3];
const fullPage = process.argv[4] !== '0';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--window-size=1440,1000'],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
  await sleep(3500);

  // Scroll through to trigger lazy-loaded images
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        window.scrollBy(0, 900);
        y += 900;
        if (y < document.body.scrollHeight) setTimeout(step, 200);
        else resolve();
      };
      step();
    });
    window.scrollTo(0, 0);
  });
  await sleep(1500);

  // Dismiss popups / overlays / chat widgets
  await page.evaluate(() => {
    // try clicking close affordances
    const closers = Array.from(document.querySelectorAll('button,[role="button"],a,span,div'))
      .filter((el) => {
        const t = (el.getAttribute('aria-label') || el.textContent || '').trim().toLowerCase();
        return t === 'close' || t === '×' || t === 'x' || t === 'no thanks' || t === 'i am not interested' || t.includes('not interested');
      });
    closers.forEach((el) => { try { el.click(); } catch (e) {} });
    // remove big fixed/absolute high-z overlays + iframes (popups, chat) but keep header/footer
    const vw = window.innerWidth, vh = window.innerHeight;
    Array.from(document.querySelectorAll('*')).forEach((el) => {
      const s = getComputedStyle(el);
      const z = parseInt(s.zIndex) || 0;
      const r = el.getBoundingClientRect();
      const big = r.width > vw * 0.5 && r.height > vh * 0.5;
      const fixedish = s.position === 'fixed' || s.position === 'absolute';
      const isOverlay = fixedish && z >= 1000 && big;
      const tag = el.tagName.toLowerCase();
      if (isOverlay || (tag === 'iframe' && z >= 1000)) { el.remove(); }
    });
    // remove dim backdrops
    Array.from(document.querySelectorAll('*')).forEach((el) => {
      const s = getComputedStyle(el);
      if ((s.position === 'fixed') && (parseInt(s.zIndex) || 0) >= 900) {
        const r = el.getBoundingClientRect();
        if (r.width > window.innerWidth * 0.8 && r.height > window.innerHeight * 0.8) el.remove();
      }
    });
  });
  await sleep(800);

  await page.screenshot({ path: out, fullPage });
  console.log('OK ' + out);
} finally {
  await browser.close();
}
