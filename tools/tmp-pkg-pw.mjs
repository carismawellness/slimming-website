import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(4000);
await p.evaluate(async () => {
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(2000);
const out = await p.evaluate(() => {
  const res = {};
  res.iframes = Array.from(document.querySelectorAll('iframe')).map((f) => {
    const r = f.getBoundingClientRect();
    return { src: (f.src || '').slice(0, 80), x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height) };
  }).filter((f) => f.w > 50);
  // promise image and texts
  const snippets = ['UP TO 1KG A WEEK', 'This is our Extended Care Commitment', 'To keep your results', "MALTA'S #1 LEADING WELLNESS CHAIN", 'OUR COMMITMENT', 'WHY MALTA CHOOSES CARISMA', 'Visible inch loss', 'COMPLIMENTARY ON-SITE PARKING', 'GET YOUR FREE BODY ANALYSIS'];
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
  for (const sn of snippets) {
    let best = null;
    document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div,a').forEach((el) => {
      if (!norm(el.textContent).includes(norm(sn))) return;
      if (best === null || best.contains(el)) best = el;
      else if (el.textContent.length < best.textContent.length) best = el;
    });
    if (best) {
      const r = best.getBoundingClientRect();
      const cs = getComputedStyle(best);
      res[sn] = { tag: best.tagName, x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), fs: cs.fontSize, lh: cs.lineHeight, fw: cs.fontWeight, color: cs.color };
    } else res[sn] = null;
  }
  // imgs in promise/wellness range (y 4700-6300)
  res.imgs = [];
  document.querySelectorAll('img').forEach((m) => {
    const r = m.getBoundingClientRect();
    const y = r.top + scrollY;
    if (y > 4600 && y < 7300 && r.width > 30) res.imgs.push({ src: (m.currentSrc || m.src).slice(-45), x: Math.round(r.left), y: Math.round(y), w: Math.round(r.width), h: Math.round(r.height) });
  });
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
