// Probe live /fatdissolving for iframes / carousel between secret heading and panel.
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/fatdissolving', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3500));
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 150); else res(); }; s(); }); window.scrollTo(0, 0); });
await new Promise((r) => setTimeout(r, 2500));

const data = await pg.evaluate(() => {
  const txt = (el) => (el.textContent || '').trim().replace(/\s+/g, ' ');
  const out = {};
  out.iframes = Array.from(document.querySelectorAll('iframe')).map((f) => { const r = f.getBoundingClientRect(); return { y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), src: (f.src || '').slice(0, 140), visible: f.offsetParent !== null }; });
  // y of secret heading and contours panel
  let secretY = null, panelY = null;
  document.querySelectorAll('h1,h2,h3,h4,h5,p,span,div').forEach((el) => {
    const t = txt(el).toLowerCase();
    if (t.startsWith('the secret to a more defined') && t.length < 60 && secretY === null) secretY = Math.round(el.getBoundingClientRect().top + scrollY);
    if (t === 'so your contours feel like yours again' && panelY === null) panelY = Math.round(el.getBoundingClientRect().top + scrollY);
  });
  out.secretY = secretY; out.panelY = panelY;
  // custom elements / wix widgets in between
  out.between = [];
  document.querySelectorAll('section,div,wix-custom-element,iframe,img,video').forEach((el) => {
    const r = el.getBoundingClientRect();
    const y = r.top + scrollY;
    if (secretY && panelY && y > secretY + 40 && y + r.height < panelY + 40 && r.height > 80 && r.width > 200) {
      out.between.push({ tag: el.tagName, y: Math.round(y), w: Math.round(r.width), h: Math.round(r.height), id: (el.id || '').slice(0, 30), cls: (el.className || '').toString().slice(0, 50), src: (el.src || '').slice ? (el.src || '').slice(0, 100) : '' });
    }
  });
  out.between = out.between.slice(0, 25);
  return out;
});
console.log(JSON.stringify(data, null, 1));
await b.close();
