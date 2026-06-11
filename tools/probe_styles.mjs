import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/fat-reduction', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3500));
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); window.scrollTo(0, 0); });
await new Promise((r) => setTimeout(r, 1200));

const data = await pg.evaluate(() => {
  const txt = (el) => (el.textContent || '').trim().replace(/\s+/g, ' ');
  const result = { ctas: [], headings: [], eyebrows: [] };
  // CTA buttons / links containing claim/spot
  document.querySelectorAll('a,button,div,span').forEach((el) => {
    const t = txt(el).toLowerCase();
    if ((t === 'claim your spot now' || t === 'claim my spot now') && el.children.length <= 2) {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const top = Math.round(r.top + window.scrollY);
      // walk up to find the colored background
      let bg = cs.backgroundColor; let node = el; let depth = 0;
      while ((bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') && node.parentElement && depth < 4) { node = node.parentElement; bg = getComputedStyle(node).backgroundColor; depth++; }
      result.ctas.push({ y: top, text: txt(el), bg, color: cs.color, font: cs.fontFamily, size: cs.fontSize, weight: cs.fontWeight, ls: cs.letterSpacing, radius: getComputedStyle(node).borderRadius, pad: cs.padding });
    }
  });
  // big serif headings (h1/h2 style) - sample a few
  document.querySelectorAll('h1,h2,h3,[class]').forEach((el) => {
    const t = txt(el);
    if (/fat eraser protocol|secret to a more defined|another diet clinic|evidence based approach|frequently asked questions|leading wellness chain/i.test(t) && t.length < 60) {
      const cs = getComputedStyle(el);
      result.headings.push({ y: Math.round(el.getBoundingClientRect().top + window.scrollY), text: t, font: cs.fontFamily, size: cs.fontSize, weight: cs.fontWeight, color: cs.color, ls: cs.letterSpacing, transform: cs.textTransform, lh: cs.lineHeight });
    }
  });
  return result;
});
console.log(JSON.stringify(data, null, 1));
await b.close();
