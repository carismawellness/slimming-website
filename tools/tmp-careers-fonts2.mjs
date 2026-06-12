import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
const fontReqs = new Set();
pg.on('response', (res) => {
  const u = res.url();
  if (/\.(woff2?|ttf|otf)(\?|$)/i.test(u) || /ufonts|user-site-fonts|static.parastorage.*font/i.test(u)) fontReqs.add(u);
});
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/careers', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(4000);
// also fetch the css files that define wfont
const cssUrls = await pg.evaluate(() => Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map((l) => l.href));
console.log('=== font/network ===');
console.log([...fontReqs].join('\n'));
console.log('=== css links ===');
console.log(cssUrls.join('\n'));
await b.close();
