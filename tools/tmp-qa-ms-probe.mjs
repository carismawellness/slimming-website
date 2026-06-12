// Usage: node tools/tmp-qa-ms-probe.mjs <url>
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(4000);
await p.evaluate(async () => {
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(2000);
const out = await p.evaluate(() => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const sty = (el, extra = []) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const o = { tag: el.tagName, x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), fs: cs.fontSize, fw: cs.fontWeight, color: cs.color, ff: cs.fontFamily.slice(0, 35), ls: cs.letterSpacing };
    for (const e of extra) o[e] = cs[e];
    return o;
  };
  const res = {};
  const findText = (sel, pred) => {
    let best = null;
    document.querySelectorAll(sel).forEach((el) => {
      const t = norm(el.textContent);
      if (pred(t) && (!best || el.textContent.length < best.textContent.length)) best = el;
    });
    return best;
  };

  // 1. EMSCULPT panel: title + tag + paras + list items
  const emsTitle = findText('h1,h2,h3,h4,p,span', (t) => /^emsculpt neo$/i.test(t));
  if (emsTitle) res.emsTitle = { ...sty(emsTitle), text: norm(emsTitle.textContent) };
  const emsTag = findText('h1,h2,h3,h4,p,span', (t) => /^muscle strengthening/i.test(t) && t.length < 60);
  if (emsTag) res.emsTag = { ...sty(emsTag), text: norm(emsTag.textContent) };
  const eff = findText('h1,h2,h3,h4,p,span', (t) => /^proven efficacy/i.test(t) && t.length < 25);
  if (eff) res.efficacyTitle = sty(eff);
  // panel container = nearest ancestor wider than 900
  if (emsTitle) {
    let c = emsTitle;
    while (c.parentElement) { c = c.parentElement; const r = c.getBoundingClientRect(); if (r.width > 900) break; }
    const cs = getComputedStyle(c);
    const r = c.getBoundingClientRect();
    res.emsPanel = { w: Math.round(r.width), h: Math.round(r.height), y: Math.round(r.top + scrollY), bg: cs.backgroundColor, bgi: cs.backgroundImage.slice(0, 120), br: cs.borderRadius, pad: cs.padding };
    // texts inside panel: p and li
    res.emsTexts = [];
    c.querySelectorAll('p, li').forEach((el) => {
      const t = norm(el.textContent);
      if (!t || t.length < 3) return;
      if (el.querySelector('p, li')) return;
      const cs2 = getComputedStyle(el);
      const r2 = el.getBoundingClientRect();
      res.emsTexts.push({ tag: el.tagName, li: el.tagName === 'LI', y: Math.round(r2.top + scrollY), x: Math.round(r2.left), w: Math.round(r2.width), fs: cs2.fontSize, fw: cs2.fontWeight, color: cs2.color, text: t.slice(0, 110) });
    });
    // images inside panel
    res.emsImgs = [];
    c.querySelectorAll('img').forEach((m) => {
      const r2 = m.getBoundingClientRect();
      if (r2.width < 30) return;
      res.emsImgs.push({ src: (m.currentSrc || m.src).split('/').pop().slice(0, 60), x: Math.round(r2.left), y: Math.round(r2.top + scrollY), w: Math.round(r2.width), h: Math.round(r2.height), br: getComputedStyle(m).borderRadius });
    });
  }

  // 2. ptHeading
  const ptH = findText('h1,h2,h3,h4,p,span', (t) => /^internationally renowned/i.test(t) && t.length < 60);
  if (ptH) res.ptHeading = { ...sty(ptH, ['textAlign', 'lineHeight']), html: ptH.innerHTML.slice(0, 200) };

  // 3. Eligibility section
  const eligIntro = findText('h1,h2,h3,h4,p,span', (t) => /^treat visible fat bulges/i.test(t) && t.length < 60);
  if (eligIntro) res.eligIntro = { ...sty(eligIntro, ['lineHeight']), html: eligIntro.innerHTML.slice(0, 200) };
  const pill = findText('h1,h2,h3,h4,p,span,div,button,a', (t) => /^abdomen \/ core$/i.test(t));
  if (pill) {
    res.pillText = sty(pill);
    // find pill box: ancestor with background
    let bx = pill;
    for (let i = 0; i < 5 && bx.parentElement; i++) {
      const cs = getComputedStyle(bx);
      if (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || cs.borderTopWidth !== '0px') break;
      bx = bx.parentElement;
    }
    const cs = getComputedStyle(bx);
    const r = bx.getBoundingClientRect();
    res.pillBox = { x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), bg: cs.backgroundColor, border: cs.border, br: cs.borderRadius, pad: cs.padding, shadow: cs.boxShadow.slice(0, 80) };
    // all pills
    res.pills = [];
    document.querySelectorAll('p,span,div,button,a').forEach((el) => {
      const t = norm(el.textContent);
      if (['ABDOMEN / CORE', 'GLUTES / BUTTOCKS', 'THIGHS (FRONT AND BACK)', 'CALVES', 'UPPER ARMS (BICEPS AND TRICEPS)'].includes(t.toUpperCase()) && el.children.length <= 1 && !el.querySelector('div,p')) {
        const r2 = el.getBoundingClientRect();
        res.pills.push({ text: t, x: Math.round(r2.left), y: Math.round(r2.top + scrollY), w: Math.round(r2.width), h: Math.round(r2.height) });
      }
    });
  }
  // elig image: the one near eligIntro
  if (eligIntro) {
    const y0 = eligIntro.getBoundingClientRect().top + scrollY;
    res.eligImgs = [];
    document.querySelectorAll('img').forEach((m) => {
      const r2 = m.getBoundingClientRect();
      const y = r2.top + scrollY;
      if (y > y0 - 400 && y < y0 + 500 && r2.width > 150) {
        res.eligImgs.push({ src: (m.currentSrc || m.src).split('/').pop().slice(0, 60), x: Math.round(r2.left), y: Math.round(y), w: Math.round(r2.width), h: Math.round(r2.height), br: getComputedStyle(m).borderRadius });
      }
    });
  }

  // 4. secret heading + carousel iframe/embed
  const secretH = findText('h1,h2,h3,h4,p,span', (t) => /^the secret to a more defined/i.test(t) && t.length < 60);
  if (secretH) {
    res.secretHeading = sty(secretH);
    const y0 = secretH.getBoundingClientRect().top + scrollY;
    res.secretEmbeds = [];
    document.querySelectorAll('iframe, [id*="comp"]').forEach((f) => {
      if (f.tagName !== 'IFRAME') return;
      const r2 = f.getBoundingClientRect();
      const y = r2.top + scrollY;
      if (y > y0 - 100 && y < y0 + 900) res.secretEmbeds.push({ src: (f.src || '').slice(0, 80), x: Math.round(r2.left), y: Math.round(y), w: Math.round(r2.width), h: Math.round(r2.height) });
    });
  }

  // 5. hero: video?
  res.heroMedia = [];
  document.querySelectorAll('video, img').forEach((m) => {
    const r2 = m.getBoundingClientRect();
    const y = r2.top + scrollY;
    if (y < 1100 && r2.width > 250 && r2.height > 300) {
      res.heroMedia.push({ tag: m.tagName, src: (m.currentSrc || m.src || m.poster || '').split('/').pop().slice(0, 70), x: Math.round(r2.left), y: Math.round(y), w: Math.round(r2.width), h: Math.round(r2.height), br: getComputedStyle(m).borderRadius });
    }
  });

  // 6. FAQ first question row
  const faq1 = findText('h1,h2,h3,h4,p,span,button,a,div', (t) => /^1\. what is included/i.test(t) && t.length < 90);
  if (faq1) res.faq1 = sty(faq1);
  const faq2 = findText('h1,h2,h3,h4,p,span,button,a,div', (t) => /^2\. am i a good candidate/i.test(t) && t.length < 60);
  if (faq2) res.faq2 = sty(faq2);
  const faqH = findText('h1,h2,h3,h4,p,span', (t) => /^frequently asked questions$/i.test(t));
  if (faqH) res.faqHeading = sty(faqH);

  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
