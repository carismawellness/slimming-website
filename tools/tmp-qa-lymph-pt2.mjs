import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/lymphatic-drainage', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3000);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); window.scrollTo(0, 0); });
await sleep(1500);
const out = await pg.evaluate(() => {
  const r = [];
  document.querySelectorAll('img').forEach((im) => {
    const bb = im.getBoundingClientRect();
    const y = Math.round(bb.top + window.scrollY);
    if (y > 4700 && y < 5300 && bb.width > 60) r.push({ y, x: Math.round(bb.left), w: Math.round(bb.width), h: Math.round(bb.height), src: im.currentSrc || im.src, pr: getComputedStyle(im.parentElement).borderRadius });
  });
  const p = [...document.querySelectorAll('p,span,div')].filter((e) => e.childElementCount === 0 && /therapeutic support/i.test(e.textContent));
  const info = p.map((e) => { const bb = e.getBoundingClientRect(); return { y: Math.round(bb.top + window.scrollY), x: Math.round(bb.left), w: Math.round(bb.width), text: e.textContent.slice(0, 70) }; });
  // also the card title + intro paragraph geometry
  const t = [...document.querySelectorAll('h2,h3,p,span')].filter((e) => e.childElementCount === 0 && /vital role in fluid balance/i.test(e.textContent)).map((e) => { const bb = e.getBoundingClientRect(); return { y: Math.round(bb.top + window.scrollY), x: Math.round(bb.left), w: Math.round(bb.width) }; });
  return { imgs: r, info, intro: t };
});
console.log(JSON.stringify(out, null, 1));
await b.close();
