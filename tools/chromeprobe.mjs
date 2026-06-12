// Usage: node tools/chromeprobe.mjs <url>
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 4000));

const data = await pg.evaluate(() => {
  const txt = (el) => (el.textContent || '').trim().replace(/\s+/g, ' ');
  const out = { banner: null, navLinks: [], phone: null, cta: null, logo: null, header: null };
  // header = topmost region elements
  const links = Array.from(document.querySelectorAll('header a, [data-testid*="header"] a, nav a, a'));
  const seen = new Set();
  links.forEach((a) => {
    const r = a.getBoundingClientRect();
    if (r.top > 180 || r.height === 0 || r.width === 0) return;
    const t = txt(a);
    const key = t + '|' + (a.href || '');
    if (seen.has(key)) return;
    seen.add(key);
    const cs = getComputedStyle(a);
    out.navLinks.push({
      text: t.slice(0, 60), href: a.getAttribute('href'), x: Math.round(r.left), y: Math.round(r.top),
      w: Math.round(r.width), color: cs.color, size: cs.fontSize, weight: cs.fontWeight,
      ls: cs.letterSpacing, family: cs.fontFamily.split(',')[0], transform: cs.textTransform,
      bg: cs.backgroundColor, radius: cs.borderRadius, pad: cs.padding,
      hasImg: !!a.querySelector('img'), imgSrc: a.querySelector('img') ? a.querySelector('img').src : null
    });
  });
  // banner: find top strip with colored bg
  const all = Array.from(document.querySelectorAll('div,section,p,span,marquee'));
  for (const el of all) {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    if (r.top <= 5 && r.height > 10 && r.height < 80 && r.width > 1200) {
      const bg = cs.backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'rgb(255, 255, 255)') {
        const t = txt(el);
        if (t.length > 5 && t.length < 400) {
          out.banner = { text: t, bg, h: Math.round(r.height), color: null };
          const sp = el.querySelector('span,p,h2,h3,div');
          if (sp) { const c2 = getComputedStyle(sp); out.banner.color = c2.color; out.banner.size = c2.fontSize; out.banner.weight = c2.fontWeight; out.banner.ls = c2.letterSpacing; out.banner.family = c2.fontFamily.split(',')[0]; out.banner.anim = c2.animationName || getComputedStyle(el).animationName; }
          break;
        }
      }
    }
  }
  // buttons in header region
  const btns = Array.from(document.querySelectorAll('a,button')).filter((el) => {
    const r = el.getBoundingClientRect();
    return r.top < 180 && r.height > 20 && /consult/i.test(txt(el));
  });
  if (btns.length) {
    const el = btns[0]; const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    let bg = cs.backgroundColor; let n = el; let d = 0;
    while ((bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') && n.parentElement && d < 4) { n = n.parentElement; bg = getComputedStyle(n).backgroundColor; d++; }
    out.cta = { text: txt(el), rawText: el.textContent.trim(), href: el.getAttribute('href') || (el.closest('a') ? el.closest('a').getAttribute('href') : null), bg, color: cs.color, size: cs.fontSize, weight: cs.fontWeight, radius: getComputedStyle(n).borderRadius, transform: cs.textTransform, family: cs.fontFamily.split(',')[0], ls: cs.letterSpacing, w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.left) };
  }
  // phone
  const ph = Array.from(document.querySelectorAll('a')).find((a) => (a.getAttribute('href') || '').startsWith('tel:') && a.getBoundingClientRect().top < 180);
  if (ph) { const cs = getComputedStyle(ph); out.phone = { text: txt(ph), href: ph.getAttribute('href'), color: cs.color, size: cs.fontSize, ls: cs.letterSpacing, family: cs.fontFamily.split(',')[0] }; }
  // sticky?
  const hdr = document.querySelector('header') || document.querySelector('[id*="SITE_HEADER"]');
  if (hdr) { const cs = getComputedStyle(hdr); out.header = { position: cs.position, bg: cs.backgroundColor, h: Math.round(hdr.getBoundingClientRect().height), borderBottom: cs.borderBottom }; }
  return out;
});
console.log(JSON.stringify(data, null, 1));
await b.close();
