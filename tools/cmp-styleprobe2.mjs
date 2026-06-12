// Usage: node tools/cmp-styleprobe2.mjs <url>
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await p.evaluate(async () => {
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(1500);
const out = await p.evaluate(() => {
  const norm = (s) => (s || '').replace(/[​]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
  const probe = (label, text) => {
    let best = null;
    document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,a,button,div,li').forEach((el) => {
      if (el.children.length > 3) return;
      if (norm(el.textContent) !== text) return;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const cs = getComputedStyle(el);
      const fs = parseFloat(cs.fontSize);
      if (best && best.fs >= fs) return;
      best = {
        fs, label,
        y: Math.round(r.top + window.scrollY),
        x: Math.round(r.left), w: Math.round(r.width),
        font: cs.fontFamily.split(',')[0], size: cs.fontSize, weight: cs.fontWeight,
        color: cs.color, ls: cs.letterSpacing, tt: cs.textTransform, ta: cs.textAlign, lh: cs.lineHeight,
      };
    });
    return best || { label, MISSING: text };
  };
  const res = [];
  res.push(probe('pillars-h2-line1', 'malta’s only multidisciplinary'));
  res.push(probe('pillars-h2-full', 'malta’s only multidisciplinary approach to slimming & weight-loss'));
  res.push(probe('modalities-h2', 'explore our modalities'));
  res.push(probe('results-sub-main', 'up to 1kg a week. measured. verified. committed to your weight loss'));
  res.push(probe('results-body', 'we are selective about who joins our weight loss transformation programs. we only accept clients we genuinely believe we can help reach their healthy weight through our slimming program. if you qualify and complete your program and do not hit your target weight, we will extend your weight management program at no extra program fee until we achieve your desired result.'));
  res.push(probe('diff-h2', 'malta’s #1 leading wellness chain'));
  res.push(probe('diff-commitment-h3', 'our commitment'));
  res.push(probe('diff-why-h3', 'why malta chooses carisma'));
  res.push(probe('glp1-intro', 'glp-1s are naturally occurring hormones that help regulate appetite and blood sugar. glp-1 prescription medications — such as ozempic and mounjaro, mimic or boost these signals so you feel full sooner, think about food less, and can lose weight more effectively when combined with a structured slimming plan and personalised meal plan.'));
  res.push(probe('pillar-bullet', 'tanita body composition analysis'));
  res.push(probe('hero-sub', "lose up to 1kg a week with malta's most comprehensive slimming program, combining medical weight loss, body contouring & personalised meal plans in one doctor-led plan"));
  // pillar card container: find element containing pillar1 title whose background isn't transparent
  const findCard = (text) => {
    let el = null;
    document.querySelectorAll('*').forEach((e) => { if (!el && norm(e.textContent) === text && e.children.length <= 3) el = e; });
    if (!el) return null;
    let node = el;
    for (let i = 0; i < 12 && node; i++) {
      const cs = getComputedStyle(node);
      const hasBg = (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent') || (cs.backgroundImage && cs.backgroundImage !== 'none');
      if (hasBg) {
        const r = node.getBoundingClientRect();
        return { y: Math.round(r.top + window.scrollY), w: Math.round(r.width), h: Math.round(r.height), bg: cs.backgroundColor, bgImage: cs.backgroundImage.slice(0, 200), radius: cs.borderRadius, shadow: cs.boxShadow.slice(0, 120) };
      }
      node = node.parentElement;
    }
    return null;
  };
  res.push({ label: 'pillar1-card', ...findCard('know your body before starting any program') });
  res.push({ label: 'results-panel', ...findCard('this is our extended care commitment') });
  res.push({ label: 'diff-panel', ...findCard('why malta chooses carisma') });
  // font-face URLs for wfont families
  const fonts = {};
  for (const sheet of document.styleSheets) {
    let rules; try { rules = sheet.cssRules; } catch { continue; }
    if (!rules) continue;
    for (const r of rules) {
      if (r instanceof CSSFontFaceRule) {
        const fam = r.style.getPropertyValue('font-family').replace(/['"]/g, '');
        const src = r.style.getPropertyValue('src');
        if (/wfont/.test(fam) && !fonts[fam]) fonts[fam] = (src.match(/url\(([^)]+)\)/) || [])[1] || src.slice(0, 100);
      }
    }
  }
  res.push({ label: 'FONTFACES', fonts });
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
