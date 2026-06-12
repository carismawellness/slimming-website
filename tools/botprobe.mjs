import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto(process.argv[2] || 'https://www.carismaslimming.com/skin-tightening', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 4000));
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 150); else res(); }; s(); }); });
await new Promise((r) => setTimeout(r, 1500));
const data = await pg.evaluate(() => {
  const txt = (el) => (el.textContent || '').trim().replace(/\s+/g, ' ');
  const out = { reviewsLine: null, buttons: [], search: null, votedHeading: null, stayHeads: [], legal: [] };
  // reviews line near aesthetics logo
  document.querySelectorAll('p,span,div,h2,h3').forEach((el) => {
    const t = txt(el);
    if (/over\s*\d+.*reviews/i.test(t) && t.length < 40) {
      const cs = getComputedStyle(el);
      out.reviewsLine = out.reviewsLine || { text: t, color: cs.color, size: cs.fontSize, y: Math.round(el.getBoundingClientRect().top + scrollY) };
    }
  });
  // discover buttons
  document.querySelectorAll('a,button').forEach((el) => {
    const t = txt(el);
    if (/^discover/i.test(t) && t.length < 30) {
      const cs = getComputedStyle(el);
      let bg = cs.backgroundColor; let n = el; let d = 0;
      while ((bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') && d < 4) { const k = n.querySelector(':scope > *'); if (!k) { if (!n.parentElement) break; n = n.parentElement; bg = getComputedStyle(n).backgroundColor; } else { n = k; bg = getComputedStyle(n).backgroundColor; } d++; }
      const r = el.getBoundingClientRect();
      out.buttons.push({ text: t, href: el.getAttribute('href'), bg, radius: getComputedStyle(n).borderRadius, x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height) });
    }
  });
  // search input
  const inp = document.querySelector('input[type="search"], input[placeholder]');
  if (inp) {
    const cs = getComputedStyle(inp);
    out.search = { placeholder: inp.placeholder, radius: cs.borderRadius, border: cs.border, color: cs.color, size: cs.fontSize, h: Math.round(inp.getBoundingClientRect().height), w: Math.round(inp.getBoundingClientRect().width) };
  }
  // voted heading
  document.querySelectorAll('h1,h2,h3,h4,p,span,div').forEach((el) => {
    const t = txt(el);
    if (/^#1 voted clinic in malta$/i.test(t) && !out.votedHeading) {
      const cs = getComputedStyle(el);
      out.votedHeading = { text: t, tag: el.tagName, color: cs.color, size: cs.fontSize, weight: cs.fontWeight, family: cs.fontFamily.slice(0, 50), align: cs.textAlign, y: Math.round(el.getBoundingClientRect().top + scrollY) };
    }
    if (/^stay in touch$/i.test(t) && el.children.length === 0) {
      const cs = getComputedStyle(el);
      out.stayHeads.push({ tag: el.tagName, color: cs.color, size: cs.fontSize, ls: cs.letterSpacing, family: cs.fontFamily.slice(0, 40) });
    }
  });
  // legal bar
  document.querySelectorAll('a,p,span').forEach((el) => {
    const t = txt(el);
    if (/privacy policy|terms & condition|all rights reserved/i.test(t) && t.length < 60 && el.children.length <= 1) {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (r.top + scrollY > document.body.scrollHeight - 1200) out.legal.push({ text: t, href: el.getAttribute && el.getAttribute('href'), color: cs.color, size: cs.fontSize, x: Math.round(r.left) });
    }
  });
  out.legal = out.legal.slice(0, 8);
  return out;
});
console.log(JSON.stringify(data, null, 1));
await b.close();
