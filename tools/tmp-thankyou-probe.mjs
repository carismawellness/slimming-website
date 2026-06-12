// Usage: node tools/tmp-thankyou-probe.mjs
// Measures the thank-you hero section on the live site.
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto('https://www.carismaslimming.com/thank-you', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3000));
const out = await p.evaluate(() => {
  const info = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return { sel, MISSING: true };
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      sel,
      x: Math.round(r.left), y: Math.round(r.top + window.scrollY),
      w: Math.round(r.width), h: Math.round(r.height),
      font: cs.fontFamily.split(',')[0], size: cs.fontSize, weight: cs.fontWeight,
      color: cs.color, ls: cs.letterSpacing, lh: cs.lineHeight, tt: cs.textTransform,
      bg: cs.backgroundColor,
    };
  };
  const sec = info('#comp-mp75u5be');
  const underlay = info('#bgLayers_comp-mp75u5be [data-testid="colorUnderlay"]');
  const img = info('#img_comp-mp775iu4');
  const imgWrap = info('#comp-mp775iu4');
  const h2 = info('#comp-mp76n60j h2');
  const h3 = info('#comp-mp76ovp3 h3');
  const paras = info('#comp-mp76q7hx');
  const p1 = info('#comp-mp76q7hx p:nth-of-type(1)');
  const p2 = info('#comp-mp76q7hx p:nth-of-type(2)');
  const p3 = info('#comp-mp76q7hx p:nth-of-type(3)');
  const link = document.querySelector('#comp-mp775iu4 a');
  return { vw: innerWidth, sec, underlay, imgWrap, img, h2, h3, paras, p1, p2, p3, imgLink: link ? link.href : null };
});
console.log(JSON.stringify(out, null, 1));
await b.close();
