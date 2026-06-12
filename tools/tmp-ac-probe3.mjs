import puppeteer from 'puppeteer-core';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/anti-cellulite', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3000);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); });
await sleep(1500);
const out = await pg.evaluate(() => {
  const r = {};
  r.clinical = Array.from(document.querySelectorAll('span,p,h1,h2,h3,h4,h5,h6')).filter(e => /clinical research/i.test(e.textContent) && e.textContent.length < 120).map(e => { const b = e.getBoundingClientRect(); const s = getComputedStyle(e); return { tag: e.tagName, y: Math.round(b.top + window.scrollY), text: e.textContent.trim(), size: s.fontSize, color: s.color }; });
  // where is 4.7 on live
  r.fourseven = Array.from(document.querySelectorAll('span,p,div,h1,h2,h3')).filter(e => e.children.length === 0 && e.textContent.includes('4.7')).map(e => { const b = e.getBoundingClientRect(); return { y: Math.round(b.top + window.scrollY), text: e.textContent.trim().slice(0,80) }; });
  // secret subheading container + card bg
  const sm = Array.from(document.querySelectorAll('span')).find(e => /smooth stubborn/i.test(e.textContent) && e.textContent.length < 100);
  if (sm) { const s = getComputedStyle(sm); r.smoothStyle = { size: s.fontSize, color: s.color, family: s.fontFamily.slice(0,60), variant: s.fontVariant, transform: s.textTransform }; }
  // hero title style
  const ht = Array.from(document.querySelectorAll('h1,h2,span')).find(e => /cellulift & contour protocol/i.test(e.textContent) && e.textContent.length < 60);
  if (ht) { const s = getComputedStyle(ht); const b2 = ht.getBoundingClientRect(); r.heroTitle = { tag: ht.tagName, size: s.fontSize, color: s.color, y: Math.round(b2.top + window.scrollY), w: Math.round(b2.width) }; }
  // eligibility pills
  r.pills = Array.from(document.querySelectorAll('span,p,div')).filter(e => e.children.length === 0 && /^(arms|buttocks and under-butt crease)$/i.test(e.textContent.trim())).map(e => { const b = e.getBoundingClientRect(); const par = e.closest('div'); const ps = par ? getComputedStyle(par) : null; return { y: Math.round(b.top + window.scrollY), x: Math.round(b.left), text: e.textContent.trim(), bg: ps ? ps.backgroundColor : null }; });
  // press logos heights
  r.logos = Array.from(document.querySelectorAll('img')).filter(i => { const b = i.getBoundingClientRect(); const y = b.top + window.scrollY; return y > 2300 && y < 2700 && b.width > 30; }).map(i => { const b = i.getBoundingClientRect(); return { y: Math.round(b.top + window.scrollY), x: Math.round(b.left), w: Math.round(b.width), h: Math.round(b.height), src: (i.src||'').slice(60,120) }; });
  // benefit card icons
  r.icons = Array.from(document.querySelectorAll('img')).filter(i => { const b = i.getBoundingClientRect(); const y = b.top + window.scrollY; return y > 2700 && y < 3100 && b.width > 30 && b.width < 150; }).map(i => { const b = i.getBoundingClientRect(); return { y: Math.round(b.top + window.scrollY), x: Math.round(b.left), w: Math.round(b.width), src: (i.src||'').match(/87fc13_[a-f0-9]{6}/)?.[0] }; });
  return r;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
