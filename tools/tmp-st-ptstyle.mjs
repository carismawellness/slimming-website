// Probe live skin-tightening tech-card header styles
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto('https://www.carismaslimming.com/skin-tightening', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(4000);
await p.evaluate(async () => {
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(2000);
const out = await p.evaluate(() => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const probe = (txt) => {
    let best = null;
    document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span').forEach((el) => {
      if (norm(el.textContent) !== txt) return;
      const r = el.getBoundingClientRect();
      if (r.height === 0) return;
      if (!best || r.height < best.rect.h) {
        const cs = getComputedStyle(el);
        best = { tag: el.tagName, rect: { x: Math.round(r.x), y: Math.round(r.top + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) },
          font: cs.fontFamily.slice(0, 60), size: cs.fontSize, weight: cs.fontWeight, color: cs.color, ls: cs.letterSpacing, tt: cs.textTransform, lh: cs.lineHeight };
      }
    });
    return best;
  };
  const res = {};
  res.title = probe('velashape iii');
  res.tagline = probe('muscle strengthening, tone & metabolic support');
  res.lead = probe('smooths cellulite, tightens skin and improves contour in one comfortable treatment.');
  res.bullet1 = probe('proven efficacy: shown to reduce the appearance of cellulite and improve skin firmness in clinical studies.');
  // look for a bold lead span inside bullet1
  let leadSpan = null;
  document.querySelectorAll('span').forEach((el) => {
    if (norm(el.textContent) === 'proven efficacy:' || norm(el.textContent) === 'proven efficacy') {
      const cs = getComputedStyle(el);
      leadSpan = { weight: cs.fontWeight, color: cs.color };
    }
  });
  res.bulletLead = leadSpan;
  // hairline: borders of ancestors of title
  let el = null;
  document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span').forEach((e) => { if (norm(e.textContent) === 'velashape iii' && e.getBoundingClientRect().height > 0 && e.getBoundingClientRect().height < 80) el = e; });
  const chain = [];
  let cur = el;
  for (let i = 0; i < 6 && cur; i++) {
    const cs = getComputedStyle(cur);
    chain.push({ tag: cur.tagName, bb: cs.borderBottom, h: Math.round(cur.getBoundingClientRect().height) });
    cur = cur.parentElement;
  }
  res.titleAncestors = chain;
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
