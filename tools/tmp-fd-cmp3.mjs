// List visible wix images on live /fatdissolving with positions (to verify section image ids).
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/fatdissolving', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3500));
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 150); else res(); }; s(); }); window.scrollTo(0, 0); });
await new Promise((r) => setTimeout(r, 2000));
const data = await pg.evaluate(() => {
  const out = [];
  document.querySelectorAll('img').forEach((im) => {
    const r = im.getBoundingClientRect();
    const src = im.currentSrc || im.src || '';
    const m = src.match(/([0-9a-f]{6}_[0-9a-f]{32}~mv2[^/?]*)/);
    if (!m || r.width < 60) return;
    // visibility check up the tree
    let node = im, hidden = false, hops = 0;
    while (node && hops < 25) { const c = getComputedStyle(node); if (c.display === 'none' || c.visibility === 'hidden') { hidden = true; break; } node = node.parentElement; hops++; }
    out.push({ y: Math.round(r.top + scrollY), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), hidden, id: m[1] });
  });
  return out.sort((a, b2) => a.y - b2.y);
});
console.log(JSON.stringify(data, null, 1));
await b.close();
