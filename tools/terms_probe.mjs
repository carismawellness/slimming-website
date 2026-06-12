import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/terms-conditions', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3500));
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 100); else res(); }; s(); }); window.scrollTo(0, 0); });
await new Promise((r) => setTimeout(r, 1000));

const data = await pg.evaluate(() => {
  const txt = (el) => (el.textContent || '').trim().replace(/\s+/g, ' ');
  const style = (el) => { const cs = getComputedStyle(el); const r = el.getBoundingClientRect(); return { y: Math.round(r.top + scrollY), x: Math.round(r.left), w: Math.round(r.width), text: txt(el).slice(0, 90), font: cs.fontFamily.split(',')[0], size: cs.fontSize, weight: cs.fontWeight, color: cs.color, lh: cs.lineHeight, ls: cs.letterSpacing, transform: cs.textTransform, align: cs.textAlign, bg: cs.backgroundColor, marginBottom: cs.marginBottom, marginTop: cs.marginTop }; };
  const out = { title: null, rule: null, paras: [], lists: [], tables: [], bolds: [], container: null, last: [] };
  // page title h1/h2
  document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((el) => { const t = txt(el).toLowerCase(); if (t.includes('terms') && t.length < 40) out.title = { tag: el.tagName, ...style(el) }; });
  // find hr / decorative line near title
  document.querySelectorAll('hr, [class*="line"], [class*="Line"]').forEach((el) => { const r = el.getBoundingClientRect(); const y = Math.round(r.top + scrollY); if (y > 100 && y < 400 && r.width > 100) out.rule = { tag: el.tagName, y, w: Math.round(r.width), border: getComputedStyle(el).borderTopColor, bColor: getComputedStyle(el).backgroundColor, h: Math.round(r.height) }; });
  // sample paragraphs
  const paras = [...document.querySelectorAll('p')].filter((p) => txt(p).length > 0);
  out.paraCount = paras.length;
  [0, 1, 2, 3, 4, 5, 6, 10, 50].forEach((i) => { if (paras[i]) out.paras.push(style(paras[i])); });
  // last few paragraphs
  paras.slice(-6).forEach((p) => out.last.push({ text: txt(p).slice(0, 120), y: Math.round(p.getBoundingClientRect().top + scrollY) }));
  // lists
  document.querySelectorAll('ul,ol').forEach((el) => { if (out.lists.length < 3) out.lists.push({ tag: el.tagName, items: el.querySelectorAll('li').length, listStyle: getComputedStyle(el).listStyleType, pad: getComputedStyle(el).paddingLeft, sample: txt(el.querySelector('li') || el).slice(0, 60), y: Math.round(el.getBoundingClientRect().top + scrollY) }); });
  out.listCount = document.querySelectorAll('ul,ol').length;
  // tables
  document.querySelectorAll('table').forEach((el) => out.tables.push({ y: Math.round(el.getBoundingClientRect().top + scrollY), rows: el.querySelectorAll('tr').length, sample: txt(el).slice(0, 100) }));
  // bold spans within content
  document.querySelectorAll('p strong, p b, p span').forEach((el) => { const cs = getComputedStyle(el); if (parseInt(cs.fontWeight) >= 600 && txt(el).length > 2 && out.bolds.length < 8) out.bolds.push({ text: txt(el).slice(0, 60), weight: cs.fontWeight, color: cs.color }); });
  // container width of the text block
  if (paras[5]) { let n = paras[5]; while (n.parentElement && n.getBoundingClientRect().width < 900) n = n.parentElement; out.container = { w: Math.round(paras[5].getBoundingClientRect().width), x: Math.round(paras[5].getBoundingClientRect().left) }; }
  // does "PART A: GENERAL TERMS" line have special styling?
  paras.forEach((p) => { const t = txt(p); if (/^PART A/i.test(t) || /^PART B/i.test(t) || /^1\. Acceptance/i.test(t) || /^Last updated/i.test(t) || /^TERMS AND CONDITIONS/i.test(t) || /^Carisma Aesthetics Ltd\., trading/i.test(t) || /^18\.5\./.test(t) === false && /Notice Period/.test(t) && t.length < 60) { out[t.slice(0, 28)] = style(p); } });
  return out;
});
console.log(JSON.stringify(data, null, 1));
await b.close();
