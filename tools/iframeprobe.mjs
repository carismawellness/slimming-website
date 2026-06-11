import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pages = ['fat-reduction', 'fatdissolving', 'muscle-stimulation', 'skin-tightening', 'lipocavitation-malta', 'anti-cellulite', 'lymphatic-drainage'];
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
for (const slug of pages) {
  const pg = await b.newPage();
  await pg.setViewport({ width: 1440, height: 1000 });
  await pg.goto('https://www.carismaslimming.com/' + slug, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
  await sleep(3000);
  await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < 4000) setTimeout(s, 120); else res(); }; s(); }); });
  await sleep(1500);
  const frames = await pg.evaluate(() => Array.from(document.querySelectorAll('iframe'))
    .map((f) => { const r = f.getBoundingClientRect(); return { src: f.src, y: Math.round(r.top + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) }; })
    .filter((f) => /filesusr|html/i.test(f.src)));
  console.log(slug, JSON.stringify(frames));
  await pg.close();
}
await b.close();
