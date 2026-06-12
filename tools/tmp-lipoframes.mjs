import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/lipocavitation-malta', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 150); else res(); }; s(); });
  window.scrollTo(0, 0); });
await sleep(2000);
const frames = await pg.evaluate(() => Array.from(document.querySelectorAll('iframe'))
  .map((f) => { const r = f.getBoundingClientRect(); return { src: (f.src || '').slice(0, 120), y: Math.round(r.top + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) }; }));
console.log(JSON.stringify(frames, null, 1));
// also probe FAQ widget: search input + share icons
const faq = await pg.evaluate(() => {
  const inp = Array.from(document.querySelectorAll('input')).map((i) => ({ ph: i.placeholder, y: Math.round(i.getBoundingClientRect().top + window.scrollY) }));
  return inp;
});
console.log('INPUTS', JSON.stringify(faq));
await b.close();
