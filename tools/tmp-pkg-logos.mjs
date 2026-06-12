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
  const r = [];
  document.querySelectorAll('img').forEach((m) => {
    const rect = m.getBoundingClientRect();
    const y = rect.top + scrollY;
    if (y > 1000 && y < 1200 && rect.width > 20) {
      r.push({ src: m.currentSrc || m.src, x: Math.round(rect.left), y: Math.round(y), w: Math.round(rect.width), h: Math.round(rect.height) });
    }
  });
  return r;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
