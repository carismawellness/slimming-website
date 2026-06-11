import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--window-size=1440,1000'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/fat-reduction', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 150); else res(); }; s(); }); window.scrollTo(0, 0); });
await sleep(2500);

const info = await pg.evaluate(() => {
  const out = { maps: [], dualHeadingY: null, wellnessY: null, faqY: null };
  document.querySelectorAll('iframe').forEach((f) => {
    if (/googleMap|google-map|maps/i.test(f.src)) {
      const r = f.getBoundingClientRect();
      // climb to a section-ish ancestor and grab its text
      let sec = f; for (let i = 0; i < 8 && sec.parentElement; i++) sec = sec.parentElement;
      out.maps.push({ y: Math.round(r.top + window.scrollY), w: Math.round(r.width), h: Math.round(r.height), src: f.src.slice(0, 80) });
    }
  });
  const find = (re) => { const el = Array.from(document.querySelectorAll('*')).find((e) => e.children.length <= 2 && re.test((e.textContent || '').trim())); return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : null; };
  out.dualHeadingY = find(/starter pack for stubborn fat/i);
  out.wellnessY = find(/leading wellness chain/i);
  out.faqY = find(/frequently asked questions/i);
  out.parkingY = find(/complimentary on-site parking/i);
  return out;
});
console.log(JSON.stringify(info, null, 1));

// screenshot the wellness/map band WITHOUT removing iframes
await pg.evaluate(() => window.scrollTo(0, 6000));
await sleep(1500);
await pg.screenshot({ path: 'd:/tmp/live_map_band.png' });
await b.close();
