import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const url = process.argv[2];
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 250); else res(); }; s(); }); });
await sleep(2500);

const data = await pg.evaluate(() => {
  const vis = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 5 || r.height < 5) return false;
    const cs = getComputedStyle(el);
    return cs.visibility !== 'hidden' && cs.display !== 'none' && parseFloat(cs.fontSize) > 12;
  };
  const els = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,span,p,div,a,button'));
  const find = (re) => {
    const hits = [];
    for (const el of els) {
      if (el.children.length > 3) continue;
      const t = (el.textContent || '').replace(/\s+/g, ' ').trim();
      if (re.test(t) && t.length < 100 && vis(el)) {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        hits.push({ t: t.slice(0, 70), font: cs.fontFamily.split(',')[0], size: cs.fontSize, weight: cs.fontWeight, color: cs.color, ls: cs.letterSpacing, y: Math.round(r.top + window.scrollY) });
      }
    }
    return hits.slice(0, 2);
  };
  const out = {};
  out.press = find(/non surgical fat reduction/i);
  out.secret = find(/^the secret to a more defined/i);
  out.shrink = find(/^shrink love handles/i);
  out.dual = find(/dual technology/i);
  out.ev = find(/^evidence based approach$/i);
  out.faq = find(/^frequently asked questions$/i);
  out.heroTitle = find(/^fat eraser protocol$/i);
  out.wellness = find(/leading wellness chain/i);
  // press logo sizes: imgs between press heading y and +400
  const py = out.press[0] ? out.press[0].y : 0;
  out.logos = Array.from(document.querySelectorAll('img')).map((m) => {
    const r = m.getBoundingClientRect();
    return { src: (m.currentSrc || m.src || '').split('/').pop().slice(0, 40), y: Math.round(r.top + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) };
  }).filter((m) => m.y > py && m.y < py + 350 && m.h > 15 && m.h < 120);
  return out;
});
console.log(JSON.stringify(data, null, 1));
await b.close();
