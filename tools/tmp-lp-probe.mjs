// Probe live LP: hero form, videos, hero/section rects, key imgs
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3000);
await p.evaluate(async () => {
  await new Promise((res) => { let yy = 0; const s = () => { window.scrollBy(0, 900); yy += 900; if (yy < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(1500);
const data = await p.evaluate(() => {
  const out = { forms: [], videos: [], iframes: [], buttons: [] };
  document.querySelectorAll('form').forEach((f) => {
    const r = f.getBoundingClientRect();
    const fields = Array.from(f.querySelectorAll('input,select,textarea,button,label')).map((el) => {
      const rr = el.getBoundingClientRect();
      return {
        tag: el.tagName, type: el.type || '', placeholder: el.placeholder || '',
        label: (el.tagName === 'LABEL' || el.tagName === 'BUTTON') ? (el.textContent || '').trim().slice(0, 90) : '',
        y: Math.round(rr.top + scrollY), x: Math.round(rr.left), w: Math.round(rr.width), h: Math.round(rr.height),
        bg: getComputedStyle(el).backgroundColor, radius: getComputedStyle(el).borderRadius, border: getComputedStyle(el).border, fs: getComputedStyle(el).fontSize, color: getComputedStyle(el).color,
      };
    });
    out.forms.push({ y: Math.round(r.top + scrollY), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), fields });
  });
  document.querySelectorAll('video').forEach((v) => {
    const r = v.getBoundingClientRect();
    out.videos.push({ src: v.currentSrc || v.src, y: Math.round(r.top + scrollY), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), poster: v.poster });
  });
  document.querySelectorAll('iframe').forEach((f) => {
    const r = f.getBoundingClientRect();
    if (r.width > 50) out.iframes.push({ src: (f.src || '').slice(0, 120), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height) });
  });
  // big images with positions
  out.imgs = Array.from(document.querySelectorAll('img')).filter((i) => i.getBoundingClientRect().width > 80).map((i) => {
    const r = i.getBoundingClientRect();
    return { src: (i.currentSrc || i.src).split('/').pop().slice(0, 60), y: Math.round(r.top + scrollY), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) };
  });
  return out;
});
console.log(JSON.stringify(data, null, 1));
await b.close();
