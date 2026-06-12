// Check hero title font sizes across live package pages
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const urls = [
  'https://www.carismaslimming.com/skin-tightening',
  'https://www.carismaslimming.com/fat-freezing',
  'https://www.carismaslimming.com/anti-cellulite',
];
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
for (const url of urls) {
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 1000 });
  await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
  await sleep(3000);
  const out = await p.evaluate(() => {
    const h1 = document.querySelector('h1, h2');
    if (!h1) return null;
    let el = h1.querySelector('span span') || h1.querySelector('span') || h1;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { text: (h1.textContent || '').trim().slice(0, 50), fontSize: cs.fontSize, lineHeight: cs.lineHeight, w: Math.round(r.width), h: Math.round(r.height) };
  });
  console.log(url.split('/').pop(), JSON.stringify(out));
  await p.close();
}
await b.close();
