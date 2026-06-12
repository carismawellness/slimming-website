// Probe live fat-dissolving valueProps section: img src, rect, radius, heading lines
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto('https://www.carismaslimming.com/fatdissolving', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3000));
await p.evaluate(async () => {
  await new Promise((res) => { let yy = 0; const s = () => { window.scrollBy(0, 900); yy += 900; if (yy < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await new Promise((r) => setTimeout(r, 1500));
const out = await p.evaluate(() => {
  const res = { headings: [], imgs: [] };
  // find the heading
  for (const el of document.querySelectorAll('h1,h2,h3,h4,p,span')) {
    const t = (el.textContent || '').trim().toLowerCase();
    if (t.startsWith('created for those who value') && el.children.length <= 3) {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      res.headings.push({ tag: el.tagName, html: el.innerHTML.slice(0, 400), w: r.width, fontSize: cs.fontSize, y: r.top + scrollY });
    }
  }
  // imgs between y 2900 and 3900
  for (const im of document.querySelectorAll('img')) {
    const r = im.getBoundingClientRect();
    const y = r.top + scrollY;
    if (y > 2700 && y < 4000 && r.width > 150) {
      const cs = getComputedStyle(im);
      const wrap = im.closest('[style*="border-radius"], div');
      res.imgs.push({ src: (im.src || '').split('/').pop().slice(0, 60), y: Math.round(y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, fit: cs.objectFit, wrapRadius: wrap ? getComputedStyle(wrap).borderRadius : '' });
    }
  }
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
