import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL = 'https://www.carismaslimming.com/skin-tightening';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3500));
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); });
await new Promise((r) => setTimeout(r, 800));
const imgs = await pg.evaluate(() => {
  return Array.from(document.querySelectorAll('img')).map(im=>{
    const r=im.getBoundingClientRect();
    const sc=window.scrollY;
    return {y:Math.round(r.top+sc),x:Math.round(r.left),w:Math.round(r.width),h:Math.round(r.height),src:im.src};
  }).filter(o=>o.y>8000&&o.y<11500&&o.w>100);
});
for(const o of imgs.sort((a,b)=>a.y-b.y||a.x-b.x)) console.log('y='+o.y,'x='+o.x,o.w+'x'+o.h, o.src);
await b.close();
