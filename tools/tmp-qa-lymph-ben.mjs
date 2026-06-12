import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const url = process.argv[2];
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3000);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); window.scrollTo(0, 0); });
await sleep(1500);
const out = await pg.evaluate(() => {
  // find the element whose text starts with 'MEDICALLY GUIDED' then walk up to the card (element with gradient background)
  const t = [...document.querySelectorAll('h3,p,span,div')].find((e) => e.childElementCount === 0 && /medically guided\s+approach/i.test(e.textContent));
  if (!t) return { err: 'title not found' };
  let el = t; const chain = [];
  for (let i = 0; i < 8 && el; i++) {
    const cs = getComputedStyle(el);
    const bb = el.getBoundingClientRect();
    chain.push({ tag: el.tagName, w: Math.round(bb.width), h: Math.round(bb.height), x: Math.round(bb.left), y: Math.round(bb.top + window.scrollY), radius: cs.borderRadius, bg: cs.backgroundImage !== 'none' ? cs.backgroundImage.slice(0, 120) : cs.backgroundColor });
    el = el.parentElement;
  }
  // title style
  const ts = getComputedStyle(t);
  // icon above
  const card = t.closest('div');
  return { chain, title: { fs: ts.fontSize, fw: ts.fontWeight, color: ts.color, ff: ts.fontFamily.slice(0, 40) } };
});
console.log(JSON.stringify(out, null, 1));
await b.close();
