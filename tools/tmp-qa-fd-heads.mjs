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
  const targets = ['the secret to a more defined', 'created for those', '35+ years delivering', 'secure your exclusive', 'frequently asked', "malta's trusted clinic", 'so your contours'];
  const found = [];
  const seen = new Set();
  for (const el of document.querySelectorAll('h1,h2,h3,h4,h5,span,p')) {
    const t = (el.textContent || '').trim().toLowerCase().replace(/\s+/g, ' ');
    for (const k of targets) {
      if (t.startsWith(k) && t.length < 120 && !seen.has(k)) {
        seen.add(k);
        const cs = getComputedStyle(el);
        found.push({ k, tag: el.tagName, fs: cs.fontSize, col: cs.color });
      }
    }
  }
  return found;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
