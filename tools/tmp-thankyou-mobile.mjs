// Usage: node tools/tmp-thankyou-mobile.mjs
// Measures the thank-you hero on the live site at mobile width.
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');
await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
await p.goto('https://www.carismaslimming.com/thank-you', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3000));
const out = await p.evaluate(() => {
  const info = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return { sel, MISSING: true };
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return { sel, x: Math.round(r.left), y: Math.round(r.top + window.scrollY), w: Math.round(r.width), h: Math.round(r.height), size: cs.fontSize, lh: cs.lineHeight, color: cs.color };
  };
  return {
    vw: innerWidth,
    sec: info('#comp-mp75u5be'),
    img: info('#img_comp-mp775iu4'),
    h2: info('#comp-mp76n60j h2'),
    h3: info('#comp-mp76ovp3 h3'),
    paras: info('#comp-mp76q7hx'),
  };
});
console.log(JSON.stringify(out, null, 1));
await p.screenshot({ path: 'shots/tmp-thankyou-mobile-live.png', fullPage: false });
await b.close();
