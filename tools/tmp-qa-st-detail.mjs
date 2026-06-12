// Probe live skin-tightening: hero title span metrics, pt header tag style, FAQ CTA label
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2] || 'https://www.carismaslimming.com/skin-tightening';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(4000);
await p.evaluate(async () => {
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(2000);
const out = await p.evaluate(() => {
  const res = {};
  const pick = (el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { tag: el.tagName, text: (el.textContent || '').trim().slice(0, 60), fontSize: cs.fontSize, lineHeight: cs.lineHeight, letterSpacing: cs.letterSpacing, fontFamily: cs.fontFamily.slice(0, 50), fontWeight: cs.fontWeight, color: cs.color, bg: cs.backgroundColor, transform: cs.textTransform, rect: { x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height) } };
  };
  // hero title: deepest span containing the text with smallest area
  let best = null;
  document.querySelectorAll('h1 span, h2 span, h1, h2, h3 span').forEach((el) => {
    const t = (el.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
    if (!t.startsWith('4-in-1 skin tightening protocol')) return;
    const r = el.getBoundingClientRect();
    if (r.height === 0) return;
    if (!best || r.width * r.height <= best.area) best = { area: r.width * r.height, info: pick(el) };
  });
  res.heroTitle = best && best.info;
  // pt card tag
  let tagEl = null;
  document.querySelectorAll('span,p,div,h4,h5').forEach((el) => {
    const t = (el.textContent || '').replace(/\s+/g, ' ').trim();
    if (t !== 'Muscle strengthening, tone & metabolic support' && t.toLowerCase() !== 'muscle strengthening, tone & metabolic support') return;
    const r = el.getBoundingClientRect();
    if (r.height === 0 || r.height > 120) return;
    if (!tagEl || r.width * r.height <= tagEl.area) tagEl = { area: r.width * r.height, info: pick(el) };
  });
  res.ptTag = tagEl && tagEl.info;
  // velashape iii card eyebrow
  let ve = null;
  document.querySelectorAll('span,p,div,h3,h4').forEach((el) => {
    const t = (el.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
    if (t !== 'velashape iii') return;
    const r = el.getBoundingClientRect();
    if (r.height === 0 || r.top + scrollY < 4000) return;
    if (!ve || r.width * r.height <= ve.area) ve = { area: r.width * r.height, info: pick(el) };
  });
  res.ptEyebrowEl = ve && ve.info;
  // FAQ CTA: anchors/buttons between FAQ and evidence (y 7000-8400)
  res.ctas = [];
  document.querySelectorAll('a,button').forEach((el) => {
    const r = el.getBoundingClientRect();
    const y = Math.round(r.top + scrollY);
    if (y > 6900 && y < 8500 && r.width > 80 && r.height > 20) res.ctas.push({ text: (el.textContent || '').trim().slice(0, 40), y, w: Math.round(r.width), h: Math.round(r.height), bg: getComputedStyle(el).backgroundColor });
  });
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
