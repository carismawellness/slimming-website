import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3000));
const res = await p.evaluate(() => {
  const out = [];
  const walk = (root) => {
    const ps = [...root.querySelectorAll('p,span,h2,h3')];
    for (const el of ps) {
      const t = (el.textContent || '').trim();
      if (/^TOTAL VALUE/i.test(t) && t.length < 60) {
        const cs = getComputedStyle(el);
        const kids = [...el.querySelectorAll('span')].map((s) => {
          const k = getComputedStyle(s);
          return { txt: s.textContent.trim().slice(0, 20), weight: k.fontWeight, family: k.fontFamily.slice(0, 60), size: k.fontSize, color: k.color };
        });
        out.push({ tag: el.tagName, txt: t.slice(0, 60), weight: cs.fontWeight, family: cs.fontFamily.slice(0, 80), size: cs.fontSize, color: cs.color, kids });
      }
    }
  };
  walk(document);
  return out;
});
console.log(JSON.stringify(res, null, 1));
await b.close();
