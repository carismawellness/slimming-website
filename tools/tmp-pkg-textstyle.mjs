// Deep text style probe: finds deepest elements whose own text matches snippets
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(4000);
await p.evaluate(async () => {
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(2000);
const out = await p.evaluate(() => {
  const snippets = [
    'You are eating better than you did',
    'Since your late thirties or early forties',
    'LOSE INCHES, GAIN ENERGY',
    'Why is it so hard to lose weight after 30',
    'Most of what you have tried',
    'WHAT THOSE PLANS IGNORED',
    'Your metabolism naturally slows',
    'So you end up',
    'Our program is built to reverse',
    'GET YOUR FREE BODY ANALYSIS',
  ];
  const res = {};
  for (const sn of snippets) {
    // find deepest element containing snippet
    let best = null;
    document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div,a,li,button').forEach((el) => {
      if (!el.textContent.includes(sn)) return;
      if (best === null || best.contains(el)) best = el;
      else if (el.textContent.length < best.textContent.length) best = el;
    });
    if (best) {
      const r = best.getBoundingClientRect();
      const cs = getComputedStyle(best);
      res[sn] = { tag: best.tagName, y: Math.round(r.top + scrollY), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), fs: cs.fontSize, lh: cs.lineHeight, ff: cs.fontFamily.split(',')[0], color: cs.color, fw: cs.fontWeight, ls: cs.letterSpacing, ta: cs.textAlign, bg: cs.backgroundColor };
    } else res[sn] = null;
  }
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
