// Usage: node tools/tmp-qa-guide-probe.mjs <url>
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const url = process.argv[2];
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await p.evaluate(async () => {
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(1200);
const out = await p.evaluate(() => {
  const res = {};
  const pick = (txt) => {
    const all = [...document.querySelectorAll('span,p,h1,h2,h3,h4,h5,h6,li,a,button,strong,b,div')];
    const els = all.filter(e => (e.textContent || '').trim().toLowerCase().includes(txt.toLowerCase()) && (e.textContent || '').length < 400);
    let best = null;
    for (const e of els) { if (!best || e.textContent.length < best.textContent.length) best = e; }
    return best;
  };
  const info = (e) => {
    if (!e) return null;
    const cs = getComputedStyle(e);
    const r = e.getBoundingClientRect();
    return { tag: e.tagName, color: cs.color, fs: cs.fontSize, fw: cs.fontWeight, ff: cs.fontFamily.slice(0, 40), tt: cs.textTransform, w: Math.round(r.width), x: Math.round(r.x + window.scrollX), y: Math.round(r.y + window.scrollY), text: e.textContent.trim().slice(0, 60) };
  };
  const keys = {
    band1_sys: 'THIS IS A SYSTEM',
    band1_hold: 'BUILT TO HOLD',
    band1_fix: 'A QUICK FIX',
    band2_found: 'WHEN THESE FOUR FOUNDATIONS',
    band2_stab: 'STABILISE',
    band2_out: 'A NATURAL OUTCOME',
    method_h: 'fell apart is not a mystery',
    when_lead: 'When',
    step1: 'STEP 1',
    step2: 'STEP 2',
    wstab: 'Weight Stability',
    foryou1: "tried dieting before",
    foryouH: 'guide is for you if',
    most: 'already tried something',
    most_strong: 'already tried something',
    byend: 'list of rules to follow',
    adhere: 'Adherence over perfection',
  };
  for (const [k, t] of Object.entries(keys)) res[k] = info(pick(t));
  // strong inside band1
  const strongs = [...document.querySelectorAll('strong,b,span')].filter(e => (e.textContent||'').trim().toUpperCase().startsWith('BUILT TO HOLD') && e.textContent.length < 30);
  res.band1_hold_el = strongs.length ? info(strongs[0]) : null;
  const stab = [...document.querySelectorAll('strong,b,span')].filter(e => (e.textContent||'').trim().toUpperCase().startsWith('STABILISE') && e.textContent.length < 15);
  res.band2_stab_el = stab.length ? info(stab[0]) : null;
  // decorative imgs
  res.imgs = [...document.querySelectorAll('img')].map(im => {
    const r = im.getBoundingClientRect();
    return { src: (im.currentSrc || im.src || '').split('/').pop().slice(0, 50), x: Math.round(r.x + window.scrollX), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) };
  }).filter(i => i.w > 250);
  res.bodyH = document.body.scrollHeight;
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
