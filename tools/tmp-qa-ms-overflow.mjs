// Usage: node tools/tmp-qa-ms-overflow.mjs <url>
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--window-size=390,844'] });
const p = await b.newPage();
await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
await p.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3000);
await p.evaluate(async () => {
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 700); y += 700; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(1200);
const out = await p.evaluate(() => {
  const doc = document.scrollingElement;
  const res = { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth, offenders: [] };
  document.querySelectorAll('*').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.right > 395 && r.width > 100) {
      // only report deepest offenders (skip if a child is also an offender of similar width)
      let childWider = false;
      for (const ch of el.children) {
        const cr = ch.getBoundingClientRect();
        if (cr.right > 395 && cr.width >= r.width - 10) { childWider = true; break; }
      }
      if (!childWider) {
        res.offenders.push({ tag: el.tagName, cls: (el.className && el.className.toString ? el.className.toString() : '').slice(0, 50), x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), right: Math.round(r.right), text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60), src: el.tagName === 'IMG' || el.tagName === 'VIDEO' || el.tagName === 'IFRAME' ? (el.currentSrc || el.src || '').slice(-50) : undefined });
      }
    }
  });
  res.offenders = res.offenders.slice(0, 40);
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
