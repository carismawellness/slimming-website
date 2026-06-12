import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto('https://www.carismaslimming.com/slimming-guide', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await p.evaluate(async () => {
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
});
await sleep(1500);
const data = await p.evaluate(() => {
  const out = { imgs: [], tabs: [] };
  document.querySelectorAll('img').forEach((el) => {
    const alt = el.getAttribute('alt') || '';
    const src = (el.currentSrc || el.src || '');
    const m = src.match(/([0-9a-f]{6}_[0-9a-f]{32}~mv2\.[a-z]+)/i);
    if (m) out.imgs.push({ alt, id: m[1] });
  });
  // find tab labels / panels near 'WEIGHT STABILITY'
  const els = [...document.querySelectorAll('*')].filter(e => /STEP\s*[1-4]/i.test(e.textContent || '') && e.children.length === 0);
  els.forEach(e => {
    const r = e.getBoundingClientRect();
    out.tabs.push({ txt: e.textContent.trim(), y: Math.round(r.top + window.scrollY), tag: e.tagName });
  });
  return out;
});
console.log(JSON.stringify(data, null, 1));
await b.close();
