import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/lymphatic-drainage', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); window.scrollTo(0, 0); });
await sleep(2000);
const out = await pg.evaluate(() => {
  const res = [];
  for (const name of ['Maria Camilleri', 'Joseph Farrugia', 'Elena Vella']) {
    const el = Array.from(document.querySelectorAll('p,span,h3,h4,div')).find((e) => e.children.length === 0 && (e.textContent || '').includes(name));
    if (!el) { res.push({ name, found: false }); continue; }
    let node = el, info = null;
    while (node && node !== document.body) {
      const s = getComputedStyle(node);
      if (s.display === 'none' || s.visibility === 'hidden' || parseFloat(s.opacity) === 0) { info = { hiddenBy: node.id || node.className, display: s.display, vis: s.visibility, op: s.opacity }; break; }
      node = node.parentElement;
    }
    const r = el.getBoundingClientRect();
    res.push({ name, found: true, y: Math.round(r.top + window.scrollY), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), hidden: info });
  }
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
