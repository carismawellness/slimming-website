// Probe computed border-radius of bespoke section images on live /fatdissolving.
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/fatdissolving', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3500));
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 150); else res(); }; s(); }); window.scrollTo(0, 0); });
await new Promise((r) => setTimeout(r, 1500));
const data = await pg.evaluate(() => {
  const ids = ['6ac670fc080e4fe4a974d6701eed38a8', '3b881cbf9132429a94159c9ebf160a1d', 'e4992fcc322c43c79922384b826fdc9c', '6aa76dd4c16347c89d2f92b4f5d2d105'];
  const out = {};
  document.querySelectorAll('img').forEach((im) => {
    const src = im.currentSrc || im.src || '';
    const id = ids.find((i) => src.includes(i));
    if (!id) return;
    // find effective radius: img itself or nearest clipping ancestor
    let node = im, hops = 0, found = [];
    while (node && hops < 6) {
      const cs = getComputedStyle(node);
      if (cs.borderRadius !== '0px') found.push(node.tagName + ':' + cs.borderRadius + (cs.overflow !== 'visible' ? ' (clip)' : ''));
      node = node.parentElement; hops++;
    }
    out[id.slice(0, 8)] = found;
  });
  return out;
});
console.log(JSON.stringify(data, null, 1));
await b.close();
