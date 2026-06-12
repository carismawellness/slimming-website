import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
const mediaUrls = new Set();
pg.on('response', (res) => {
  const u = res.url();
  if (/\.(mp4|m3u8|webm|mov)(\?|$)/i.test(u) || /video/i.test(res.headers()['content-type'] || '')) mediaUrls.add(u);
});
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/lymphatic-drainage', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); window.scrollTo(0, 0); });
await sleep(2000);

const dom = await pg.evaluate(() => {
  const out = { videoTags: [], iframes: [], wixVideo: [], playButtons: [] };
  document.querySelectorAll('video').forEach((v) => {
    const r = v.getBoundingClientRect();
    out.videoTags.push({ y: Math.round(r.top + window.scrollY), w: Math.round(r.width), h: Math.round(r.height), src: v.currentSrc || v.src, poster: v.poster, sources: Array.from(v.querySelectorAll('source')).map((s) => s.src) });
  });
  document.querySelectorAll('iframe').forEach((f) => {
    const r = f.getBoundingClientRect();
    if (r.width > 50 && r.height > 50) out.iframes.push({ y: Math.round(r.top + window.scrollY), w: Math.round(r.width), h: Math.round(r.height), src: f.src });
  });
  // wix video components
  document.querySelectorAll('wow-video, [data-testid*="video"], [class*="video" i], [data-mediatype="video"]').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width > 50 && r.height > 50) {
      const v = el.querySelector('video');
      out.wixVideo.push({ y: Math.round(r.top + window.scrollY), w: Math.round(r.width), h: Math.round(r.height), tag: el.tagName.toLowerCase(), id: el.id, vsrc: v ? (v.currentSrc || v.src) : null, vid: el.getAttribute('data-video-id') || el.getAttribute('data-publicid') || '' });
    }
  });
  return out;
});
console.log('=== DOM ===');
console.log(JSON.stringify(dom, null, 1));
console.log('=== NETWORK MEDIA ===');
console.log([...mediaUrls].join('\n') || '(none)');
await b.close();

