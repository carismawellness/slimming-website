// Usage: node tools/tmp-pkg-li-probe.mjs <url>
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
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
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const res = {};
  // find the LOSE INCHES heading
  let h = null;
  document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div').forEach((el) => {
    const t = norm(el.textContent);
    if (t.startsWith('lose inches, gain energy') && t.includes('menu') && el.children.length < 4) {
      if (!h || el.textContent.length < h.textContent.length) h = el;
    }
  });
  if (h) {
    const r = h.getBoundingClientRect();
    const cs = getComputedStyle(h);
    res.heading = { tag: h.tagName, y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), fs: cs.fontSize, lh: cs.lineHeight, ff: cs.fontFamily.slice(0, 40), color: cs.color, fw: cs.fontWeight, ls: cs.letterSpacing, ta: cs.textAlign };
  }
  // find paragraph starting "You are eating better"
  let para = null;
  document.querySelectorAll('p,span,div').forEach((el) => {
    const t = norm(el.textContent);
    if (t.startsWith('you are eating better than you did') && (!para || el.textContent.length < para.textContent.length)) para = el;
  });
  if (para) {
    const r = para.getBoundingClientRect();
    const cs = getComputedStyle(para);
    res.para = { tag: para.tagName, y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), fs: cs.fontSize, lh: cs.lineHeight, color: cs.color, ff: cs.fontFamily.slice(0, 40) };
  }
  // images / videos in the vicinity (between heading y and heading y + 900)
  if (h) {
    const y0 = h.getBoundingClientRect().top + scrollY;
    res.media = [];
    document.querySelectorAll('img,video,iframe').forEach((m) => {
      const r = m.getBoundingClientRect();
      const y = r.top + scrollY;
      if (y > y0 - 200 && y < y0 + 900 && r.width > 50) {
        res.media.push({ tag: m.tagName, src: (m.currentSrc || m.src || m.poster || '').slice(-70), x: Math.round(r.left), y: Math.round(y), w: Math.round(r.width), h: Math.round(r.height), br: getComputedStyle(m).borderRadius });
      }
    });
    // section container: walk up from heading to a wide card
    let c = h;
    while (c.parentElement) {
      c = c.parentElement;
      const r = c.getBoundingClientRect();
      if (r.width > 1100) break;
    }
    const r = c.getBoundingClientRect();
    const cs = getComputedStyle(c);
    res.container = { w: Math.round(r.width), h: Math.round(r.height), y: Math.round(r.top + scrollY), bg: cs.backgroundColor, bgi: cs.backgroundImage.slice(0, 80), br: cs.borderRadius, pad: cs.padding };
  }
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
