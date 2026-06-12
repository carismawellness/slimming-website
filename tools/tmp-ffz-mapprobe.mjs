import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 4000));
await p.evaluate(async () => {
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
});
await new Promise((r) => setTimeout(r, 2000));
const res = await p.evaluate(() => {
  const ifr = [...document.querySelectorAll('iframe')].map((f) => ({ src: (f.src || '').slice(0, 140), w: f.clientWidth, h: f.clientHeight, y: Math.round(f.getBoundingClientRect().top + window.scrollY) }));
  // also look for review-ish text
  const hasReviews = ['MARK SPITERI', 'KRISTA', 'REBECCA', 'Read more'].map((t) => document.body.innerText.includes(t));
  return { iframes: ifr, hasReviews };
});
console.log(JSON.stringify(res, null, 1));
await b.close();
