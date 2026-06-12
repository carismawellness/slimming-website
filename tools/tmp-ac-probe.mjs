import puppeteer from 'puppeteer-core';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/anti-cellulite', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3000);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); });
await sleep(2000);
const out = await pg.evaluate(() => {
  const r = {};
  r.iframes = Array.from(document.querySelectorAll('iframe')).map(f => { const b = f.getBoundingClientRect(); return { src: (f.src||'').slice(0,120), y: Math.round(b.top + window.scrollY), w: Math.round(b.width), h: Math.round(b.height) }; }).filter(f => f.w > 100);
  r.videos = Array.from(document.querySelectorAll('video')).map(v => { const b = v.getBoundingClientRect(); return { src: (v.currentSrc||v.src||'').slice(0,140), y: Math.round(b.top + window.scrollY), w: Math.round(b.width), h: Math.round(b.height) }; });
  // hero subheading check: find text node 'SMOOTH STUBBORN'
  r.smoothStubborn = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div')).filter(e => e.children.length === 0 && /smooth stubborn cellulite/i.test(e.textContent)).map(e => { const b = e.getBoundingClientRect(); const s = getComputedStyle(e); return { tag: e.tagName, y: Math.round(b.top + window.scrollY), text: e.textContent.trim().slice(0,80), size: s.fontSize, color: s.color, transform: s.textTransform }; });
  // claim buttons
  r.buttons = Array.from(document.querySelectorAll('a,button')).filter(e => /claim/i.test(e.textContent)).map(e => { const b = e.getBoundingClientRect(); const s = getComputedStyle(e); return { y: Math.round(b.top + window.scrollY), text: e.textContent.trim(), bg: s.backgroundColor, href: (e.href||'').slice(0,100) }; });
  // evidence eyebrow
  r.evid = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div')).filter(e => e.children.length === 0 && /(clinical research base|evidence based approach)/i.test(e.textContent)).map(e => { const b = e.getBoundingClientRect(); const s = getComputedStyle(e); return { tag: e.tagName, y: Math.round(b.top + window.scrollY), text: e.textContent.trim().slice(0,80), size: s.fontSize }; });
  // search box in FAQ
  r.faqSearch = Array.from(document.querySelectorAll('input')).map(e => { const b = e.getBoundingClientRect(); return { y: Math.round(b.top + window.scrollY), placeholder: e.placeholder, w: Math.round(b.width) }; });
  // total value lines
  r.totals = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div')).filter(e => e.children.length === 0 && /total value/i.test(e.textContent)).map(e => { const b = e.getBoundingClientRect(); const s = getComputedStyle(e); return { y: Math.round(b.top + window.scrollY), text: e.textContent.trim().slice(0,100), size: s.fontSize, weight: s.fontWeight, color: s.color }; });
  // testimonial names
  r.names = ['JULIA','BIANCHI','Reuben','Cutajar','4.7'].map(n => ({ n, found: document.body.textContent.includes(n) }));
  // map
  r.mapText = /complimentary on-site parking/i.test(document.body.textContent);
  return r;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
