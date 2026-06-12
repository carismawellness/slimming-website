import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(4000);
const out = await p.evaluate(() => {
  const r = [];
  document.querySelectorAll('img').forEach((m) => {
    const src = m.currentSrc || m.src;
    if (/CarismaSlim_Batch2/.test(src)) r.push(src);
  });
  return r;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
