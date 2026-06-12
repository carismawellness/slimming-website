// Usage: node tools/tmp-thankyou-mobile2.mjs
// Gets mobile image src and text sizes for the live thank-you hero.
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');
await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
await p.goto('https://www.carismaslimming.com/thank-you', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3000));
const out = await p.evaluate(() => {
  const img = document.querySelector('#img_comp-mp775iu4');
  const ps = [...document.querySelectorAll('#comp-mp76q7hx p')].map((el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { size: cs.fontSize, lh: cs.lineHeight, h: Math.round(r.height) };
  });
  const h2cs = getComputedStyle(document.querySelector('#comp-mp76n60j h2'));
  const h2span = document.querySelector('#comp-mp76n60j h2 .color_43');
  return {
    src: img ? img.currentSrc : null,
    styleAttr: img ? img.getAttribute('style') : null,
    ps,
    h2size: h2cs.fontSize,
    h2lh: h2cs.lineHeight,
    h2spanColor: h2span ? getComputedStyle(h2span).color : null,
  };
});
console.log(JSON.stringify(out, null, 1));
await b.close();
