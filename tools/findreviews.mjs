import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const url = process.argv[2] || 'https://www.carismaslimming.com/';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
const apiHits = [];
pg.on('response', async (res) => {
  const u = res.url();
  if (/leadconnector|review|reputation|gohighlevel|highlevel/i.test(u)) {
    try { const t = await res.text(); if (/Ciantar|Zammit|Cutajar|"reviews"|reviewer|author/i.test(t)) apiHits.push({ u: u.slice(0, 120), len: t.length }); } catch {}
  }
});
await pg.setViewport({ width: 1440, height: 1600 });
await pg.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(4000);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 700); y += 700; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); window.scrollTo(0, 0); });
await sleep(5000);
const allFrames = await pg.evaluate(() => Array.from(document.querySelectorAll('iframe')).map((f) => ({ src: f.src, w: Math.round(f.getBoundingClientRect().width), h: Math.round(f.getBoundingClientRect().height) })));
const domHit = await pg.evaluate(() => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const docs = [document];
  document.querySelectorAll('iframe').forEach((f) => { try { if (f.contentDocument) docs.push(f.contentDocument); } catch {} });
  for (const d of docs) {
    const el = Array.from(d.querySelectorAll('*')).find((e) => /Ciantar|Zammit|Cutajar|reviews on Google|Review us on Google/i.test(norm(e.textContent)));
    if (el) { let r = el; for (let i = 0; i < 10 && r.parentElement; i++) r = r.parentElement; return norm(r.innerText).slice(0, 3000); }
  }
  return null;
});
console.log('FRAMES:', JSON.stringify(allFrames, null, 1));
console.log('API HITS:', JSON.stringify(apiHits, null, 1));
console.log('DOM HIT:', domHit || 'NONE');
await b.close();
