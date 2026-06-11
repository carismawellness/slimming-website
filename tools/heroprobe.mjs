import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/fat-reduction', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);

const targets = [
  'COOLSCULPTING IN MALTA',
  'fat eraser protocol',
  'BURN STUBBORN FAT, NO SURGERY.',
  'For those who have tried dieting',
  '3x Fat Freezing sessions with CoolSculpting',
  'TOTAL VALUE',
  '€199',
  'individual sessions',
];

const out = await pg.evaluate((targets) => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const res = [];
  for (const t of targets) {
    // find the deepest element whose own text starts with / contains the target
    const all = Array.from(document.querySelectorAll('h1,h2,h3,h4,p,span,li,div,a'));
    let el = all.find((e) => e.children.length === 0 && norm(e.textContent).includes(norm(t)));
    if (!el) el = all.find((e) => norm(e.textContent).includes(norm(t)));
    if (!el) { res.push({ t, found: false }); continue; }
    const cs = getComputedStyle(el);
    // detect a bottom border / underline anywhere up the chain (for the title divider)
    let underline = null; let n = el;
    for (let i = 0; i < 4 && n; i++) {
      const s = getComputedStyle(n);
      if (s.borderBottomWidth !== '0px' && s.borderBottomStyle !== 'none') { underline = `${s.borderBottomWidth} ${s.borderBottomStyle} ${s.borderBottomColor}`; break; }
      n = n.parentElement;
    }
    res.push({ t, tag: el.tagName.toLowerCase(), color: cs.color, font: cs.fontFamily, size: cs.fontSize, weight: cs.fontWeight, ls: cs.letterSpacing, transform: cs.textTransform, lh: cs.lineHeight, listStyle: cs.listStyleType, underline });
  }
  return res;
}, targets);
console.log(JSON.stringify(out, null, 1));
await b.close();
