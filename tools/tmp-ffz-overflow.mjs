import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--window-size=390,844'] });
const p = await b.newPage();
await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
await p.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3000));
await p.evaluate(async () => {
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 700); y += 700; if (y < document.body.scrollHeight) setTimeout(s, 100); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await new Promise((r) => setTimeout(r, 1200));
const res = await p.evaluate(() => {
  const W = document.documentElement.clientWidth;
  const out = [];
  document.querySelectorAll('*').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.right > W + 1 || r.left < -1) {
      // only report deepest offenders (skip if a child also offends)
      out.push({
        tag: el.tagName, cls: (el.className && el.className.toString ? el.className.toString() : '').slice(0, 60),
        left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width),
        y: Math.round(r.top + window.scrollY),
        txt: (el.textContent || '').trim().slice(0, 40),
      });
    }
  });
  return { W, scrollW: document.documentElement.scrollWidth, bodyW: document.body.scrollWidth, count: out.length, sample: out.slice(0, 40) };
});
console.log(JSON.stringify(res, null, 1));
await b.close();
