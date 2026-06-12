// Usage: node tools/tmp-qa-st-hero.mjs <url>
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(4000);
const out = await p.evaluate(() => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const res = { videos: [], iframes: [], title: null, subtitle: null };
  document.querySelectorAll('video').forEach((v) => {
    const r = v.getBoundingClientRect();
    res.videos.push({ src: v.currentSrc || v.src, poster: v.poster, autoplay: v.autoplay, muted: v.muted, loop: v.loop, paused: v.paused, rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }, radius: getComputedStyle(v).borderRadius });
  });
  document.querySelectorAll('iframe').forEach((f) => {
    const r = f.getBoundingClientRect();
    if (r.width > 50 && r.top < 1500) res.iframes.push({ src: (f.src || '').slice(0, 200), rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } });
  });
  // title
  document.querySelectorAll('h1,h2,h3,h4,span,div,p').forEach((el) => {
    const t = norm(el.textContent);
    if (res.title === null && (t === '4-in-1 skin tightening protocol' || t === '4-in-1 skin tightening protocol.')) {
      const r = el.getBoundingClientRect();
      if (r.height > 0 && r.height < 200) {
        const cs = getComputedStyle(el);
        res.title = { fontSize: cs.fontSize, lineHeight: cs.lineHeight, letterSpacing: cs.letterSpacing, fontFamily: cs.fontFamily.slice(0, 60), color: cs.color, transform: cs.textTransform, rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } };
      }
    }
    if (res.subtitle === null && t.startsWith('smoother, firmer, and tighter skin')) {
      const r = el.getBoundingClientRect();
      if (r.height > 0 && r.height < 120) {
        const cs = getComputedStyle(el);
        res.subtitle = { fontSize: cs.fontSize, color: cs.color, rect: { y: Math.round(r.y), h: Math.round(r.height) } };
      }
    }
  });
  // hero card: find big rounded container near top
  let card = null;
  document.querySelectorAll('div,section').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top > 20 && r.top < 220 && r.width > 1100 && r.width < 1420 && r.height > 500) {
      if (!card || r.height > card.h) card = { y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height), bg: getComputedStyle(el).backgroundColor, radius: getComputedStyle(el).borderRadius };
    }
  });
  res.card = card;
  // secret heading y
  let secret = null;
  document.querySelectorAll('h1,h2,h3,h4,span,div,p').forEach((el) => {
    const t = norm(el.textContent);
    if (t === 'the secret to a more defined, confident look') {
      const r = el.getBoundingClientRect();
      if (r.height > 0 && (secret === null || r.top + scrollY < secret)) secret = Math.round(r.top + scrollY);
    }
  });
  res.secretY = secret;
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
