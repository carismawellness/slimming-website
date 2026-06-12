import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/slimming-guide', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3500));
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); window.scrollTo(0, 0); });
await new Promise((r) => setTimeout(r, 1200));

const data = await pg.evaluate(() => {
  const txt = (el) => (el.textContent || '').trim().replace(/\s+/g, ' ');
  const pats = [
    /^the weight-loss guide/i,
    /^recipes, meal timing/i,
    /^get slimming guide/i,
    /^for only/i,
    /^it was never about discipline/i,
    /^this is not a diet/i,
    /^adherence over perfection/i,
    /^when to eat$/i,
    /^what success actually looks like/i,
    /^weight stability$/i,
    /^step 1$/i,
    /^it was built for malta/i,
    /^friday evening, malta$/i,
    /^we do not fight culture here/i,
    /^most people who come to us/i,
    /^this guide is for you if$/i,
    /^you've tried dieting before/i,
    /^by the end, you will not have/i,
    /^the carisma slimming guide$/i,
    /^malta's #1 leading wellness chain$/i,
    /^the carisma difference$/i,
    /^our commitment$/i,
    /^complimentary on-site parking$/i,
    /^this is a system built to hold/i,
    /^when these four foundations/i,
    /^#1 voted clinic in malta$/i,
    /^designed for malta$/i,
    /^what this is$/i,
    /^the method$/i,
    /^before you start$/i,
  ];
  const seen = new Set();
  const out = [];
  document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,a,button,div,li').forEach((el) => {
    const t = txt(el);
    if (!t || t.length > 200) return;
    for (const p of pats) {
      if (p.test(t)) {
        const key = p.source + '|' + t.slice(0, 40);
        if (seen.has(key)) return;
        // prefer leaf-most: skip if a child matches the same text
        if ([...el.children].some((c) => txt(c) === t)) return;
        seen.add(key);
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        let bg = cs.backgroundColor; let node = el; let d = 0;
        while ((bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') && node.parentElement && d < 5) { node = node.parentElement; bg = getComputedStyle(node).backgroundColor; d++; }
        out.push({ y: Math.round(r.top + scrollY), tag: el.tagName, text: t.slice(0, 70), font: cs.fontFamily.split(',')[0], size: cs.fontSize, weight: cs.fontWeight, color: cs.color, ls: cs.letterSpacing, tt: cs.textTransform, bg, radius: getComputedStyle(node).borderRadius });
        return;
      }
    }
  });
  out.sort((a, b2) => a.y - b2.y);
  return out;
});
console.log(JSON.stringify(data, null, 1));
await b.close();
