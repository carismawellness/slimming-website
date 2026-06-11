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
  const info = (el) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { tag: el.tagName.toLowerCase(), bg: cs.backgroundColor, radius: cs.borderRadius, border: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`, overflow: cs.overflow, w: Math.round(r.width), h: Math.round(r.height) };
  };
  const img = document.querySelector('img[src*="e49f864318"]');
  const chain = [];
  let n = img;
  for (let i = 0; i < 6 && n; i++) { chain.push(info(n)); n = n.parentElement; }
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const titleEl = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div')).find((e) => e.children.length <= 3 && /^cryolipolysis \(coolsculpting/i.test(norm(e.textContent)));
  let titleInfo = null;
  if (titleEl) { const cs = getComputedStyle(titleEl); titleInfo = { tag: titleEl.tagName.toLowerCase(), color: cs.color, font: cs.fontFamily.split(',')[0], size: cs.fontSize, weight: cs.fontWeight, textAlign: cs.textAlign }; }
  return { imgChain: chain, title: titleInfo };
});
console.log(JSON.stringify(out, null, 1));
await b.close();
