import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 700); y += 700; if (y < document.body.scrollHeight) setTimeout(s, 100); else res(); }; s(); }); window.scrollTo(0, 0); });
await sleep(1500);
const out = await pg.evaluate(() => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const res = [];
  document.querySelectorAll('*').forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.backgroundImage && cs.backgroundImage.includes('gradient')) {
      const t = norm(el.textContent);
      if (/medical weight loss assessment|personalised nutrition|exercise and movement|targeted body contouring|tanita body composition|grand hotel excelsior/i.test(t)) {
        const r = el.getBoundingClientRect();
        res.push({ tag: el.tagName.toLowerCase(), w: Math.round(r.width), h: Math.round(r.height), grad: cs.backgroundImage, radius: cs.borderRadius, shadow: cs.boxShadow, textStart: t.slice(0, 40) });
      }
    }
  });
  // dedupe by grad+size
  const seen = new Set();
  return res.filter((x) => { const k = x.grad + x.w + x.h; if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 6);
});
console.log(JSON.stringify(out, null, 1));
await b.close();
