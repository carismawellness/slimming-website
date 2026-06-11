import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/fat-reduction', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); window.scrollTo(0, 0); });
await sleep(1500);

const out = await pg.evaluate(() => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const styleOf = (el) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { tag: el.tagName.toLowerCase(), text: norm(el.textContent).slice(0, 36), w: Math.round(r.width), h: Math.round(r.height), color: cs.color, bg: cs.backgroundColor, font: cs.fontFamily.split(',')[0], size: cs.fontSize, weight: cs.fontWeight, ls: cs.letterSpacing, radius: cs.borderRadius, border: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`, textAlign: cs.textAlign, fontStyle: cs.fontStyle, deco: cs.textDecorationLine };
  };
  const all = Array.from(document.querySelectorAll('*'));
  const tag = all.find((e) => e.children.length === 0 && /moderate.?high evidence/i.test(norm(e.textContent)));
  let pill = tag;
  for (let i = 0; i < 5 && pill; i++) { const s = getComputedStyle(pill); if (s.backgroundColor !== 'rgba(0, 0, 0, 0)' || s.borderTopWidth !== '0px') break; pill = pill.parentElement; }
  const img = document.querySelector('img[src*="e49f864318"]');
  const title = all.find((e) => e.children.length <= 2 && /cryolipolysis \(coolsculpting/i.test(norm(e.textContent)));
  const readmore = all.find((e) => e.children.length === 0 && norm(e.textContent).toLowerCase() === 'read more');
  return { tagText: tag ? norm(tag.textContent) : null, pill: styleOf(pill), image: styleOf(img), title: styleOf(title), readmore: styleOf(readmore) };
});
console.log(JSON.stringify(out, null, 1));
await b.close();
