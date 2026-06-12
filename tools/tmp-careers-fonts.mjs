import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/careers', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
const out = await pg.evaluate(() => {
  const ids = ['wfont_5aef8b_8403deee212c496489cf54765e6c12b4', 'wfont_2a65f1_015f67774ca74a4c9a9bc8b509e223e8'];
  const found = {};
  for (const ss of Array.from(document.styleSheets)) {
    let rules;
    try { rules = ss.cssRules; } catch (e) { continue; }
    if (!rules) continue;
    for (const r of Array.from(rules)) {
      if (!r.cssText || !r.cssText.startsWith('@font-face')) continue;
      for (const id of ids) {
        if (r.cssText.includes(id)) {
          (found[id] = found[id] || []).push(r.cssText.slice(0, 500));
        }
      }
    }
  }
  return found;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
