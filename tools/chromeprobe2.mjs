// Usage: node tools/chromeprobe2.mjs <url>
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
  const deepStyle = (root) => {
    // find deepest text-bearing element
    let el = root;
    while (true) {
      const kids = Array.from(el.children).filter((k) => txt(k).length > 0 && !['STYLE','SCRIPT'].includes(k.tagName));
      if (!kids.length) break;
      el = kids[0];
    }
    const cs = getComputedStyle(el);
    return { color: cs.color, size: cs.fontSize, weight: cs.fontWeight, ls: cs.letterSpacing, family: cs.fontFamily.slice(0, 60), transform: cs.textTransform, text: txt(el).slice(0, 80) };
  };
  const out = { banner: null, nav: [], cta: null, more: null, stickyEls: [] };
  // banner: element containing MEDICALLY QUALIFIED DOCTORS near top
  const cands = Array.from(document.querySelectorAll('div,span,p,h2')).filter((el) => /MEDICALLY QUALIFIED DOCTORS/i.test(txt(el)) && txt(el).length < 300);
  if (cands.length) {
    const el = cands[cands.length - 1];
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    let bg = cs.backgroundColor; let n = el; let d = 0;
    while ((bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') && n.parentElement && d < 8) { n = n.parentElement; bg = getComputedStyle(n).backgroundColor; d++; }
    const bgEl = n; const bgr = bgEl.getBoundingClientRect();
    out.banner = { text: txt(el), top: Math.round(r.top), stripBg: bg, stripH: Math.round(bgr.height), ...deepStyle(el), anim: cs.animationName, parentAnim: getComputedStyle(el.parentElement).animationName };
  }
  // nav items incl non-anchor (Packages dropdown trigger)
  Array.from(document.querySelectorAll('a,button,li,[role="button"]')).forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top > 30 && r.top < 110 && r.height > 8 && r.width > 30 && r.width < 250) {
      const t = txt(el);
      if (/^(weight loss|glp-1s|packages|slimming guide|more|free consultation|27802062)$/i.test(t)) {
        out.nav.push({ tag: el.tagName, x: Math.round(r.left), w: Math.round(r.width), ...deepStyle(el), href: el.getAttribute('href') });
      }
    }
  });
  // dedupe by text+x
  const seen = new Set();
  out.nav = out.nav.filter((n) => { const k = n.text + '|' + n.x; if (seen.has(k)) return false; seen.add(k); return true; });
  // CTA deep style
  const cta = Array.from(document.querySelectorAll('a')).find((el) => /free consultation/i.test(txt(el)) && el.getBoundingClientRect().top < 180);
  if (cta) {
    const ds = deepStyle(cta);
    const cs = getComputedStyle(cta);
    let bg = cs.backgroundColor; let n = cta; let d = 0;
    while ((bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') && d < 4) { const cand = n.querySelector(':scope > *'); if (!cand) break; n = cand; bg = getComputedStyle(n).backgroundColor; d++; }
    const r = cta.getBoundingClientRect();
    out.cta = { ...ds, bg, radius: getComputedStyle(n).borderRadius, w: Math.round(r.width), h: Math.round(r.height), href: cta.getAttribute('href') };
  }
  // sticky detection
  Array.from(document.querySelectorAll('header, [id*="SITE_HEADER"], div')).slice(0, 400).forEach((el) => {
    const cs = getComputedStyle(el);
    if ((cs.position === 'fixed' || cs.position === 'sticky') && el.getBoundingClientRect().top < 5 && el.getBoundingClientRect().height > 40 && el.getBoundingClientRect().width > 1000) {
      out.stickyEls.push({ id: el.id, tag: el.tagName, pos: cs.position, h: Math.round(el.getBoundingClientRect().height) });
    }
  });
  return out;
});
console.log(JSON.stringify(data, null, 1));
await b.close();
