import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto('https://www.carismaslimming.com/medical-weight-loss-lp', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3000);
await p.evaluate(async () => {
  await new Promise((res) => { let yy = 0; const s = () => { window.scrollBy(0, 900); yy += 900; if (yy < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(1200);
const rows = await p.evaluate(() =>
  Array.from(document.querySelectorAll('a,button')).map((el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    const t = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 50);
    if (r.width < 60 || r.height < 20 || !t) return null;
    if (s.backgroundColor === 'rgba(0, 0, 0, 0)') return null;
    return `y=${Math.round(r.top + scrollY)} x=${Math.round(r.left)} w=${Math.round(r.width)} h=${Math.round(r.height)} bg=${s.backgroundColor} color=${s.color} radius=${s.borderRadius} fs=${s.fontSize} | ${t}`;
  }).filter(Boolean)
);
console.log(rows.join('\n'));
await b.close();
