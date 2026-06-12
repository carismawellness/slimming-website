// Probe the "medical weight loss eligibility" section on the live GLP-1 page.
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = 'https://www.carismaslimming.com/medical-weight-loss';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await p.evaluate(async () => {
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(1500);
const out = await p.evaluate(() => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
  // find the heading
  let target = null;
  document.querySelectorAll('h1,h2,h3,h4,p,span,div').forEach((el) => {
    if (el.children.length > 2) return;
    if (norm(el.textContent).includes('selective by intention')) {
      if (!target || el.textContent.length < target.textContent.length) target = el;
    }
  });
  if (!target) return { MISSING: true };
  // walk up to section container
  let sec = target;
  for (let i = 0; i < 10 && sec.parentElement; i++) {
    sec = sec.parentElement;
    if (norm(sec.textContent).includes('unsuitable for')) break;
  }
  const r = sec.getBoundingClientRect();
  const info = (el) => {
    const cs = getComputedStyle(el);
    const rr = el.getBoundingClientRect();
    return { tag: el.tagName, text: el.textContent.replace(/\s+/g, ' ').trim(), font: cs.fontFamily.split(',')[0], size: cs.fontSize, weight: cs.fontWeight, color: cs.color, ls: cs.letterSpacing, tt: cs.textTransform, ta: cs.textAlign, lh: cs.lineHeight, y: Math.round(rr.top + window.scrollY), x: Math.round(rr.left), w: Math.round(rr.width), h: Math.round(rr.height) };
  };
  const items = [];
  sec.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,a,li').forEach((el) => {
    if (el.children.length > 1) return;
    const t = el.textContent.replace(/\s+/g, ' ').trim();
    if (!t) return;
    items.push(info(el));
  });
  // images/svgs (icons)
  const icons = [];
  sec.querySelectorAll('img, svg').forEach((el) => {
    const rr = el.getBoundingClientRect();
    icons.push({ tag: el.tagName, src: el.getAttribute('src') || '(svg)', w: Math.round(rr.width), h: Math.round(rr.height), x: Math.round(rr.left), y: Math.round(rr.top + window.scrollY) });
  });
  const cs = getComputedStyle(sec);
  return {
    secY: Math.round(r.top + window.scrollY),
    secH: Math.round(r.height),
    secBg: cs.backgroundColor,
    secBgImg: cs.backgroundImage.slice(0, 120),
    items,
    icons,
  };
});
console.log(JSON.stringify(out, null, 1));
await b.close();
