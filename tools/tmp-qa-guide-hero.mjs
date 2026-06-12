// Usage: node tools/tmp-qa-guide-hero.mjs <url>
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const url = process.argv[2];
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(4000);
const out = await p.evaluate(() => {
  const res = {};
  const leaf = (txt) => {
    const all = [...document.querySelectorAll('span,p,h1,h2,h3,h4,h5,h6,li,a,button,strong,b')];
    const els = all.filter(e => (e.textContent || '').trim().toLowerCase().includes(txt.toLowerCase()));
    let best = null;
    for (const e of els) { if (!best || e.textContent.length < best.textContent.length) best = e; }
    return best;
  };
  const info = (e) => {
    if (!e) return null;
    const cs = getComputedStyle(e);
    const r = e.getBoundingClientRect();
    return { tag: e.tagName, color: cs.color, fs: cs.fontSize, fw: cs.fontWeight, lh: cs.lineHeight, ls: cs.letterSpacing, ff: cs.fontFamily.slice(0, 35), x: Math.round(r.x + window.scrollX), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height), text: e.textContent.trim().slice(0, 50) };
  };
  res.h1a = info(leaf('THE WEIGHT-LOSS GUIDE'));
  res.h1b = info(leaf('BUILT FOR MALTESE LIFESTYLE'));
  res.sub = info(leaf('RECIPES, MEAL TIMING'));
  res.para = info(leaf('doctor-backed system'));
  res.feat1 = info(leaf('WHAT TO EAT'));
  res.price = info(leaf('FOR ONLY'));
  res.btn = info(leaf('GET SLIMMING GUIDE'));
  res.reviews = info(leaf('Over 200+ Reviews'));
  res.voted = info(leaf('#1 VOTED CLINIC IN MALTA'));
  res.method_h2 = info(leaf('fell apart is not a mystery'));
  res.wstab_h = info(leaf('Weight Stability'));
  res.wstab_p = info(leaf('You stop dreading Monday mornings'));
  res.notdiet = info(leaf('this is not a diet'));
  res.kicker_what = info(leaf('WHAT THIS IS'));
  res.success = info(leaf('What success actually looks like'));
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
