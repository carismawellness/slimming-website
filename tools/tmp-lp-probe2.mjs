import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto('https://www.carismaslimming.com/medical-weight-loss-lp', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3000);
await p.evaluate(async () => {
  await new Promise((res) => { let yy = 0; const s = () => { window.scrollBy(0, 900); yy += 900; if (yy < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(1500);
const data = await p.evaluate(() => {
  const out = {};
  out.imgs = Array.from(document.querySelectorAll('img')).filter((i) => i.getBoundingClientRect().width > 60).map((i) => {
    const r = i.getBoundingClientRect();
    return { src: (i.currentSrc || i.src).slice(0, 150), y: Math.round(r.top + scrollY), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) };
  });
  out.iframes = Array.from(document.querySelectorAll('iframe')).map((f) => {
    const r = f.getBoundingClientRect();
    const s = getComputedStyle(f);
    let vis = true; let el = f;
    while (el) { const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) { vis = false; break; } el = el.parentElement; }
    return { src: (f.src || '').slice(0, 120), x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), vis, z: s.zIndex };
  });
  return out;
});
console.log(JSON.stringify(data, null, 1));
await b.close();
