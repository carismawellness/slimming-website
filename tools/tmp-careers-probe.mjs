import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/careers', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);

const out = await pg.evaluate(() => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const res = { texts: [], images: [], bands: [], button: null };
  const targets = [
    'join the carisma aesthetics team',
    'our company is growing fast',
    'if you...',
    'want to work in the best 5 star hotels',
    'are hard working and motivated',
    'ambitions of high earnings',
    'fluent in multiple languages',
    'apply now',
  ];
  const all = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,li,div,a,button'));
  for (const t of targets) {
    let el = all.find((e) => e.children.length === 0 && norm(e.textContent).includes(t));
    if (!el) el = all.filter((e) => norm(e.textContent).includes(t)).pop();
    if (!el) { res.texts.push({ t, found: false }); continue; }
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    // look up chain for left border (requirement rules)
    let leftBorder = null, n = el;
    for (let i = 0; i < 5 && n; i++) {
      const s = getComputedStyle(n);
      if (s.borderLeftWidth !== '0px' && s.borderLeftStyle !== 'none') { leftBorder = `${s.borderLeftWidth} ${s.borderLeftStyle} ${s.borderLeftColor}`; break; }
      n = n.parentElement;
    }
    res.texts.push({
      t, tag: el.tagName.toLowerCase(), text: el.textContent.replace(/\s+/g, ' ').trim(),
      color: cs.color, font: cs.fontFamily.split(',')[0], size: cs.fontSize, weight: cs.fontWeight,
      ls: cs.letterSpacing, transform: cs.textTransform, lh: cs.lineHeight, align: cs.textAlign,
      rect: { x: Math.round(r.x + scrollX), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height) },
      leftBorder,
    });
  }
  // images in top 2200px
  for (const img of document.querySelectorAll('img')) {
    const r = img.getBoundingClientRect();
    const y = r.y + scrollY;
    if (y < 2400 && r.width > 80) {
      res.images.push({ src: (img.src || '').slice(0, 140), rect: { x: Math.round(r.x + scrollX), y: Math.round(y), w: Math.round(r.width), h: Math.round(r.height) }, fit: getComputedStyle(img).objectFit });
    }
  }
  // colored bands / divider lines in top 2400px
  for (const d of document.querySelectorAll('div,section')) {
    const r = d.getBoundingClientRect();
    const y = r.y + scrollY;
    if (y > 2400 || r.width < 5) continue;
    const cs = getComputedStyle(d);
    const bg = cs.backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'rgb(255, 255, 255)' && r.height > 2) {
      res.bands.push({ bg, rect: { x: Math.round(r.x + scrollX), y: Math.round(y), w: Math.round(r.width), h: Math.round(r.height) }, cls: (d.getAttribute('data-testid') || d.id || '').slice(0, 40) });
    }
  }
  // the APPLY NOW link
  const btn = Array.from(document.querySelectorAll('a')).find((a) => norm(a.textContent) === 'apply now');
  if (btn) {
    const cs = getComputedStyle(btn);
    const r = btn.getBoundingClientRect();
    res.button = { href: btn.href, target: btn.target, bg: cs.backgroundColor, color: cs.color, size: cs.fontSize, ls: cs.letterSpacing, radius: cs.borderRadius, rect: { x: Math.round(r.x + scrollX), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height) } };
  }
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
