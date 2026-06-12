// Usage: node tools/tmp-thankyou-probe2.mjs
// Samples background colors and span colors on the live thank-you page.
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto('https://www.carismaslimming.com/thank-you', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3000));
const out = await p.evaluate(() => {
  const bgChain = (sel) => {
    let el = document.querySelector(sel);
    const chain = [];
    while (el) {
      const cs = getComputedStyle(el);
      chain.push({ tag: el.tagName + (el.id ? '#' + el.id : '') + '.' + (el.className && el.className.baseVal === undefined ? String(el.className).split(' ')[0] : ''), bg: cs.backgroundColor, bgImage: cs.backgroundImage.slice(0, 80) });
      el = el.parentElement;
    }
    return chain;
  };
  const spanColor = (sel) => {
    const el = document.querySelector(sel);
    return el ? getComputedStyle(el).color : null;
  };
  return {
    chain: bgChain('#comp-mp75u5be'),
    h2span: spanColor('#comp-mp76n60j h2 .color_43'),
    h3color: spanColor('#comp-mp76ovp3 h3'),
    pspan: spanColor('#comp-mp76q7hx p .color_43'),
    sectionNext: document.querySelector('#comp-mp75u5be').nextElementSibling ? document.querySelector('#comp-mp75u5be').nextElementSibling.id : null,
  };
});
console.log(JSON.stringify(out, null, 1));
// screenshot of the hero region for pixel sampling
await p.screenshot({ path: 'shots/tmp-thankyou-hero-now.png', clip: { x: 0, y: 0, width: 1440, height: 700 } });
await b.close();
