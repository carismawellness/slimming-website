import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/lipocavitation-malta', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(4000);
for (const y of [800, 1200, 1600, 2000, 5500, 6000, 6500, 7000]) {
  await pg.evaluate((yy) => window.scrollTo(0, yy), y);
  await sleep(2500);
}
const frames = await pg.evaluate(() => Array.from(document.querySelectorAll('iframe'))
  .map((f) => { const r = f.getBoundingClientRect(); return { src: (f.src || f.getAttribute('data-src') || '').slice(0, 140), y: Math.round(r.top + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) }; }));
console.log('FRAMES', JSON.stringify(frames, null, 1));
// where does the secret heading sit, and is there a gap element after it?
const probe = await pg.evaluate(() => {
  const els = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,p,span'))
    .filter((e) => /THE SECRET TO A MORE DEFINED|some fat simply/i.test(e.textContent || '') && e.children.length === 0)
    .map((e) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return { tag: e.tagName, text: (e.textContent || '').trim().slice(0, 70), y: Math.round(r.top + window.scrollY), fs: s.fontSize, ff: s.fontFamily.slice(0, 40), color: s.color }; });
  return els;
});
console.log('SECRET', JSON.stringify(probe, null, 1));
await b.close();
