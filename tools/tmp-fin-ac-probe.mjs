// FINISHER probe: live anti-cellulite — (a) hairline under the serif tech-card header,
// (b) short divider under the "OUR TECHNOLOGY" section eyebrow.
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
const url = process.argv[2] || 'https://www.carismaslimming.com/anti-cellulite';
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(4000);
await p.evaluate(async () => {
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(2000);
const out = await p.evaluate(() => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const res = {};

  // (a) serif tech-card title ancestors: look for borderBottom hairline
  let titleEl = null;
  document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span').forEach((e) => {
    const t = norm(e.textContent);
    if ((t === 'velashape iii (cellulift protocol)' || t === 'velashape iii') && e.getBoundingClientRect().height > 0 && e.getBoundingClientRect().height < 120) titleEl = e;
  });
  res.titleText = titleEl ? norm(titleEl.textContent) : null;
  const chain = [];
  let cur = titleEl;
  for (let i = 0; i < 8 && cur; i++) {
    const cs = getComputedStyle(cur);
    const r = cur.getBoundingClientRect();
    chain.push({ tag: cur.tagName, id: cur.id || '', bb: cs.borderBottom, h: Math.round(r.height), w: Math.round(r.width) });
    cur = cur.parentElement;
  }
  res.titleAncestors = chain;
  // also: any 1-3px-tall hairline element within 60px below the title?
  if (titleEl) {
    const tr = titleEl.getBoundingClientRect();
    const ty = tr.bottom + window.scrollY;
    const lines = [];
    document.querySelectorAll('div,hr,span').forEach((e) => {
      const r = e.getBoundingClientRect();
      const y = r.top + window.scrollY;
      if (r.height > 0 && r.height <= 3 && r.width > 40 && y > ty - 4 && y < ty + 60) {
        const cs = getComputedStyle(e);
        lines.push({ tag: e.tagName, y: Math.round(y), w: Math.round(r.width), h: r.height, bg: cs.backgroundColor, bt: cs.borderTop, bb: cs.borderBottom });
      }
    });
    res.linesBelowTitle = lines;
  }

  // (b) "OUR TECHNOLOGY" eyebrow: short divider under it?
  let eye = null;
  document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span').forEach((e) => {
    if (norm(e.textContent) === 'our technology' && e.getBoundingClientRect().height > 0 && e.getBoundingClientRect().height < 60) eye = e;
  });
  if (eye) {
    const r = eye.getBoundingClientRect();
    res.eyebrow = { y: Math.round(r.top + window.scrollY), w: Math.round(r.width), x: Math.round(r.x) };
    const ey = r.bottom + window.scrollY;
    const lines = [];
    document.querySelectorAll('div,hr,span').forEach((e) => {
      const rr = e.getBoundingClientRect();
      const y = rr.top + window.scrollY;
      if (rr.height > 0 && rr.height <= 3 && rr.width > 20 && rr.width < 600 && y > ey - 4 && y < ey + 60) {
        const cs = getComputedStyle(e);
        lines.push({ tag: e.tagName, y: Math.round(y), x: Math.round(rr.x), w: Math.round(rr.width), h: rr.height, bg: cs.backgroundColor, bt: cs.borderTop });
      }
    });
    res.linesBelowEyebrow = lines;
  } else {
    res.eyebrow = null;
  }
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
