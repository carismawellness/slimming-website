import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3500));
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); window.scrollTo(0, 0); });
await new Promise((r) => setTimeout(r, 1500));
const srcs = await pg.evaluate(() => Array.from(document.querySelectorAll('img')).map((i) => {
  const r = i.getBoundingClientRect();
  return { y: Math.round(r.top + window.scrollY), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), alt: (i.alt || '').slice(0, 60), src: (i.currentSrc || i.src).slice(0, 150) };
}).filter((s) => s.w > 10 && s.h > 10 && s.y < 6200));
for (const s of srcs) console.log(JSON.stringify(s));
await b.close();
