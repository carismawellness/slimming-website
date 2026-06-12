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
  const res = { questions: [] };
  for (let i = 1; i <= 10; i++) {
    let best = null;
    document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div').forEach((el) => {
      if (!el.textContent.trim().startsWith(`${i}.`)) return;
      if (el.textContent.length > 200) return;
      if (best === null || best.contains(el)) best = el;
    });
    if (best) {
      const r = best.getBoundingClientRect();
      const cs = getComputedStyle(best);
      res.questions.push({ i, y: Math.round(r.top + scrollY), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), fs: cs.fontSize, lh: cs.lineHeight, fw: cs.fontWeight, color: cs.color, ff: cs.fontFamily.split(',')[0].slice(0, 25), tt: cs.textTransform });
    }
  }
  // search input
  const inp = document.querySelector('input[type=text], input[type=search], input[placeholder]');
  if (inp) {
    const r = inp.getBoundingClientRect();
    res.search = { y: Math.round(r.top + scrollY), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), ph: inp.placeholder };
  }
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
