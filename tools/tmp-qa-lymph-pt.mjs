import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const url = process.argv[2] || 'https://www.carismaslimming.com/lymphatic-drainage';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3000);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); window.scrollTo(0, 0); });
await sleep(1500);
const out = await pg.evaluate(() => {
  const r = { imgs: [], faq: [], dualHeading: null };
  document.querySelectorAll('img').forEach((im) => {
    const b2 = im.getBoundingClientRect();
    const y = Math.round(b2.top + window.scrollY);
    if (y > 4300 && y < 6100 && b2.width > 60) {
      r.imgs.push({ y, x: Math.round(b2.left), w: Math.round(b2.width), h: Math.round(b2.height), src: (im.currentSrc || im.src).split('/').pop().slice(0, 60), radius: getComputedStyle(im).borderRadius });
    }
  });
  // FAQ question rows: find elements containing the question text
  const qs = ['2. What concerns', '3. Is lymphatic', '4. How many'];
  qs.forEach((q) => {
    const el = [...document.querySelectorAll('h2,h3,p,span,button,div')].find((e) => e.childElementCount === 0 && e.textContent.trim().startsWith(q));
    if (el) {
      const bb = el.getBoundingClientRect();
      r.faq.push({ q, y: Math.round(bb.top + window.scrollY), h: Math.round(bb.height), fs: getComputedStyle(el).fontSize, ff: getComputedStyle(el).fontFamily.slice(0, 30) });
    }
  });
  const dh = [...document.querySelectorAll('h2,h3,p,span')].find((e) => /only dual technology/i.test(e.textContent) && e.textContent.length < 90);
  if (dh) {
    const bb = dh.getBoundingClientRect();
    r.dualHeading = { tag: dh.tagName, y: Math.round(bb.top + window.scrollY), h: Math.round(bb.height), html: dh.innerHTML.slice(0, 200), fs: getComputedStyle(dh).fontSize };
  }
  return r;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
