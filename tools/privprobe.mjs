import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
const url = process.argv[2] || 'https://www.carismaslimming.com/privacy-policy';
await pg.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3500));
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); window.scrollTo(0, 0); });
await new Promise((r) => setTimeout(r, 1200));

const data = await pg.evaluate(() => {
  const txt = (el) => (el.textContent || '').trim().replace(/\s+/g, ' ');
  const out = [];
  // every leaf-ish text node container in the top 2200px
  document.querySelectorAll('h1,h2,h3,h4,p,a,span,div').forEach((el) => {
    const t = txt(el);
    if (!t || t.length > 400) return;
    // only elements whose own text (excluding child elements text duplication) matters: pick elements with no element children OR heading tags
    const hasElemChild = Array.from(el.children).some((c) => txt(c) === t);
    if (hasElemChild) return;
    const r = el.getBoundingClientRect();
    const top = Math.round(r.top + window.scrollY);
    if (top > 2300 || r.width === 0) return;
    const cs = getComputedStyle(el);
    out.push({ tag: el.tagName, y: top, x: Math.round(r.left), w: Math.round(r.width), text: t.slice(0, 160), font: cs.fontFamily.split(',')[0], size: cs.fontSize, weight: cs.fontWeight, color: cs.color, ls: cs.letterSpacing, transform: cs.textTransform, align: cs.textAlign, lh: cs.lineHeight, href: el.tagName === 'A' ? el.getAttribute('href') : undefined });
  });
  out.sort((a, b2) => a.y - b2.y || a.x - b2.x);
  // dedupe identical text at same y
  const seen = new Set();
  const ded = out.filter((o) => { const k = o.y + '|' + o.text; if (seen.has(k)) return false; seen.add(k); return true; });
  // background bands: section-level bg colors in top 1400px
  const bands = [];
  document.querySelectorAll('section,div').forEach((el) => {
    const r = el.getBoundingClientRect();
    const top = Math.round(r.top + window.scrollY);
    if (top > 1400 || r.width < 1200 || r.height < 60) return;
    const bg = getComputedStyle(el).backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') bands.push({ y: top, h: Math.round(r.height), bg });
  });
  return { texts: ded.slice(0, 60), bands: bands.slice(0, 15) };
});
console.log(JSON.stringify(data, null, 1));
await b.close();
