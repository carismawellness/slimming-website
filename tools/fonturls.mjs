import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
const fontReqs = new Set();
pg.on('response', (res) => {
  const u = res.url();
  if (/\.(woff2?|ttf|otf)(\?|$)/i.test(u)) fontReqs.add(u);
});
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/fat-reduction', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(4000);
// scan @font-face rules in all stylesheets
const faces = await pg.evaluate(() => {
  const out = [];
  for (const ss of Array.from(document.styleSheets)) {
    let rules;
    try { rules = ss.cssRules; } catch (e) { continue; }
    if (!rules) continue;
    for (const r of Array.from(rules)) {
      if (r.constructor.name === 'CSSFontFaceRule' || (r.cssText && r.cssText.startsWith('@font-face'))) {
        const fam = (r.style && r.style.fontFamily) || '';
        if (/trajan|novecento|roboto/i.test(r.cssText)) out.push({ fam, src: r.style ? r.style.getPropertyValue('src') : '', css: r.cssText.slice(0, 400) });
      }
    }
  }
  return out;
});
console.log('=== @font-face (trajan/novecento/roboto) ===');
console.log(JSON.stringify(faces, null, 1));
console.log('=== network font files ===');
console.log([...fontReqs].join('\n'));
await b.close();
