import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await p.evaluate(async () => {
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(1500);
const imgs = await p.evaluate(() => {
  const out = [];
  // <img> elements
  document.querySelectorAll('img').forEach((el) => {
    const r = el.getBoundingClientRect();
    const top = r.top + window.scrollY;
    if (r.width < 8 || r.height < 8) return;
    out.push({ t: Math.round(top), w: Math.round(r.width), h: Math.round(r.height), src: el.currentSrc || el.src });
  });
  // background images
  document.querySelectorAll('*').forEach((el) => {
    const bg = getComputedStyle(el).backgroundImage;
    if (bg && bg.includes('url(')) {
      const r = el.getBoundingClientRect();
      if (r.width < 40 || r.height < 40) return;
      const m = bg.match(/url\(["']?(.*?)["']?\)/);
      if (m && m[1].includes('wix')) {
        const top = r.top + window.scrollY;
        out.push({ t: Math.round(top), w: Math.round(r.width), h: Math.round(r.height), src: m[1], bg: true });
      }
    }
  });
  out.sort((a, b) => a.t - b.t);
  return out;
});
function mediaId(src) {
  const m = src.match(/\/(?:media|images)\/([^/]+?\.(?:png|jpg|jpeg|webp|avif|gif))/i) || src.match(/([0-9a-f]{6}_[0-9a-f]{32}~mv2\.[a-z]+)/i);
  return m ? m[1] : src.split('/').pop().split('?')[0];
}
for (const im of imgs) {
  console.log(`y=${String(im.t).padStart(5)} ${String(im.w).padStart(4)}x${String(im.h).padStart(4)} ${im.bg ? 'BG ' : '   '} ${mediaId(im.src)}`);
}
await b.close();
