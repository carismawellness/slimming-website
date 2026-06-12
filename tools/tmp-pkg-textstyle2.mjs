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
  const snippets = [
    'Every program starts with a full in clinic consultation',
    'You are 35 to 65',
    'You are pregnant, or breastfeeding',
    'We are a doctor led transformation program',
    'DOCTOR-LED: FULL MEDICAL CHECK AND BODY SCAN',
    'We are selective about who joins our transformation programs',
    'Attend all scheduled in clinic sessions and weekly check ins',
    'Visible mid trim and shape change',
    'Created by the team behind',
    'How is this transformation program different',
    'Most diets give you a meal plan and leave you alone',
    'Major obesity guidelines recommend a daily energy reduction',
    'Combining structured exercise with diet delivers better long',
    'Understand your body composition',
    'Full body composition analysis',
    'Personalised food plan with a buddy',
  ];
  const res = {};
  for (const sn of snippets) {
    let best = null;
    document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div,a,li').forEach((el) => {
      if (!el.textContent.includes(sn)) return;
      if (best === null || best.contains(el)) best = el;
      else if (el.textContent.length < best.textContent.length) best = el;
    });
    if (best) {
      const r = best.getBoundingClientRect();
      const cs = getComputedStyle(best);
      res[sn] = { tag: best.tagName, y: Math.round(r.top + scrollY), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), fs: cs.fontSize, lh: cs.lineHeight, ff: cs.fontFamily.split(',')[0].slice(0, 30), color: cs.color, fw: cs.fontWeight, ta: cs.textAlign };
    } else res[sn] = null;
  }
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
