import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto('https://www.carismaslimming.com/fatdissolving', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3000));
await p.evaluate(async () => {
  await new Promise((res) => { let yy = 0; const s = () => { window.scrollBy(0, 900); yy += 900; if (yy < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await new Promise((r) => setTimeout(r, 1500));
const out = await p.evaluate(() => {
  const res = { img: null, headingLines: [] };
  for (const im of document.querySelectorAll('img')) {
    if ((im.src || '').includes('IMG_1134')) {
      res.img = im.src;
      break;
    }
  }
  // heading: find element containing 'CREATED FOR THOSE'
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.textContent.toUpperCase().includes('CREATED FOR THOSE')) {
      let el = node.parentElement;
      // climb to the heading block
      while (el && !/H\d|P/.test(el.tagName)) el = el.parentElement;
      if (el) {
        const r = el.getBoundingClientRect();
        res.headingLines.push({ tag: el.tagName, outer: el.outerHTML.slice(0, 700), w: Math.round(r.width), fs: getComputedStyle(el).fontSize });
      }
      break;
    }
  }
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
