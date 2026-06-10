import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('https://www.carismaslimming.com/', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
  await sleep(3000);
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } });
  await sleep(1500);
  const imgs = await page.evaluate(() =>
    Array.from(document.querySelectorAll('img'))
      .map((i) => ({ src: i.currentSrc || i.src, alt: i.alt || '' }))
      .filter((i) => /wixstatic/.test(i.src) )
  );
  const seen = new Set();
  for (const i of imgs) {
    const id = (i.src.match(/media\/([A-Za-z0-9_~]+\.[a-z]+)/) || [])[1];
    if (id && !seen.has(id)) { seen.add(id); console.log(id + '  ||  ' + i.alt); }
  }
} finally { await browser.close(); }
