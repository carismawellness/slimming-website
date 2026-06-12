import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto('https://www.carismaslimming.com/medical-weight-loss', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3000));
const hrefs = await p.evaluate(() =>
  Array.from(document.querySelectorAll('a'))
    .filter((a) => /book your medical consultation/i.test(a.textContent))
    .map((a) => ({ t: a.textContent.replace(/\s+/g, ' ').trim(), h: a.href, y: Math.round(a.getBoundingClientRect().top + window.scrollY) }))
);
console.log(JSON.stringify(hrefs, null, 1));
await b.close();
