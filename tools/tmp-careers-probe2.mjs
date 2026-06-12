import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/careers', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);

const out = await pg.evaluate(() => {
  const res = { dividers: [], handshake: null, requirementHtml: null };
  // any narrow tall element between heading and band (y 240..460) — lines via bg or border
  for (const d of document.querySelectorAll('div,span,hr')) {
    const r = d.getBoundingClientRect();
    const y = r.y + scrollY;
    if (y < 230 || y > 470) continue;
    const cs = getComputedStyle(d);
    const hasBg = cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)';
    const hasBorder = ['Left', 'Right', 'Top', 'Bottom'].some((s) => cs[`border${s}Width`] !== '0px' && cs[`border${s}Style`] !== 'none');
    if ((r.width <= 12 && r.height > 10 && (hasBg || hasBorder)) || (hasBorder && r.height <= 12 && r.width > 10 && r.width < 400)) {
      res.dividers.push({
        tag: d.tagName, rect: { x: Math.round(r.x + scrollX), y: Math.round(y), w: Math.round(r.width), h: Math.round(r.height) },
        bg: cs.backgroundColor,
        bl: `${cs.borderLeftWidth} ${cs.borderLeftStyle} ${cs.borderLeftColor}`,
        bt: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`,
      });
    }
  }
  // handshake image parent chain rects
  const img = Array.from(document.querySelectorAll('img')).find((i) => (i.src || '').includes('f940f0_b93ac2a5'));
  if (img) {
    const chain = [];
    let n = img;
    for (let i = 0; i < 5 && n; i++) {
      const r = n.getBoundingClientRect();
      const cs = getComputedStyle(n);
      chain.push({ tag: n.tagName, rect: { x: Math.round(r.x + scrollX), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height) }, overflow: cs.overflow, clip: cs.clipPath !== 'none' ? cs.clipPath.slice(0, 60) : null });
      n = n.parentElement;
    }
    res.handshake = chain;
  }
  // raw html of the requirements rich text to get exact line breaks
  const span = Array.from(document.querySelectorAll('div,p')).filter((e) => (e.textContent || '').includes('5 star hotels') && (e.textContent || '').includes('Fluent')).pop();
  if (span) res.requirementHtml = span.innerHTML.replace(/\s+/g, ' ').slice(0, 1500);
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
