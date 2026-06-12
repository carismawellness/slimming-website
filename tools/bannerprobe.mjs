import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto(process.argv[2] || 'https://www.carismaslimming.com/skin-tightening', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 4000));
const d1 = await pg.evaluate(() => {
  const el = document.elementFromPoint(700, 17);
  let n = el, bg = 'rgba(0, 0, 0, 0)', chain = [];
  while (n && n !== document.body) {
    const cs = getComputedStyle(n);
    chain.push({ tag: n.tagName, id: n.id, bg: cs.backgroundColor, anim: cs.animationName, transform: cs.transform === 'none' ? 'none' : 'yes' });
    if (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && bg === 'rgba(0, 0, 0, 0)') bg = cs.backgroundColor;
    n = n.parentElement;
  }
  return { bg, chain: chain.slice(0, 12), text: (el.textContent || '').slice(0, 160) };
});
const pos = async () => pg.evaluate(() => {
  const els = [...document.querySelectorAll('div,span')].filter((e) => /voted slimming clinic/i.test(e.textContent || '') && (e.textContent || '').length < 300);
  const e = els[els.length - 1];
  return e ? Math.round(e.getBoundingClientRect().left) : null;
});
const t1 = await pos();
await new Promise((r) => setTimeout(r, 1500));
const t2 = await pos();
// full banner text incl. siblings
const full = await pg.evaluate(() => {
  const els = [...document.querySelectorAll('div,section')].filter((e) => {
    const r = e.getBoundingClientRect();
    return r.height > 20 && r.height < 60 && r.top < 5 && r.width > 1300;
  });
  return els.map((e) => ({ tag: e.tagName, id: e.id, text: (e.textContent || '').replace(/\s+/g, ' ').slice(0, 300), h: Math.round(e.getBoundingClientRect().height) })).slice(0, 5);
});
console.log(JSON.stringify({ d1, t1, t2, full }, null, 1));
await b.close();
