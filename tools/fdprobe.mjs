import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/fatdissolving', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3500));
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); window.scrollTo(0, 0); });
await new Promise((r) => setTimeout(r, 1200));

const data = await pg.evaluate(() => {
  const txt = (el) => (el.textContent || '').trim().replace(/\s+/g, ' ');
  const style = (el, extra = {}) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { y: Math.round(r.top + scrollY), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height),
      font: cs.fontFamily.split(',')[0], size: cs.fontSize, weight: cs.fontWeight, color: cs.color,
      ls: cs.letterSpacing, tt: cs.textTransform, align: cs.textAlign, bg: cs.backgroundColor, bgi: cs.backgroundImage.slice(0, 120), radius: cs.borderRadius, ...extra };
  };
  const out = {};

  // 1. "so your contours" heading
  document.querySelectorAll('h1,h2,h3,h4,h5,p,span,div').forEach((el) => {
    const t = txt(el).toLowerCase();
    if (t === 'so your contours feel like yours again' && el.children.length <= 1) {
      if (!out.contoursHeading) out.contoursHeading = style(el, { tag: el.tagName });
    }
    if (t.startsWith('do you ever feel like certain areas') && el.children.length <= 2 && t.length < 120) {
      if (!out.introQuestion) out.introQuestion = style(el, { tag: el.tagName });
    }
    if (t === 'frequently asked questions') {
      if (!out.faqHeading) out.faqHeading = style(el, { tag: el.tagName });
    }
  });

  // 2. panel behind contours heading: walk ancestors looking for non-transparent bg or bg-image
  if (out.contoursHeading) {
    const el = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,p,span,div')).find((e) => txt(e).toLowerCase() === 'so your contours feel like yours again' && e.children.length <= 1);
    let node = el, hops = 0, panels = [];
    while (node && hops < 10) {
      const cs = getComputedStyle(node);
      if ((cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') || cs.backgroundImage !== 'none') {
        const r = node.getBoundingClientRect();
        panels.push({ tag: node.tagName, w: Math.round(r.width), h: Math.round(r.height), bg: cs.backgroundColor, bgi: cs.backgroundImage.slice(0, 160), radius: cs.borderRadius });
      }
      node = node.parentElement; hops++;
    }
    out.contoursPanels = panels;
  }

  // 3. tick icons in contours text column? count imgs near the intro question
  out.contoursImgs = [];
  document.querySelectorAll('img').forEach((im) => {
    const r = im.getBoundingClientRect();
    const y = r.top + scrollY;
    if (y > 1500 && y < 3200 && r.width < 40 && r.width > 5) out.contoursImgs.push({ y: Math.round(y), w: Math.round(r.width), src: (im.currentSrc || im.src).split('/').pop().slice(0, 60) });
  });

  // 4. benefit card bg: find element containing 'INSTANT CONTOUR REFINEMENT'
  document.querySelectorAll('div,section,li').forEach((el) => {
    const t = txt(el);
    if (/^INSTANT CONTOUR REFINEMENT/i.test(t) && t.length < 200 && !out.benefitCard) {
      let node = el, hops = 0;
      while (node && hops < 8) {
        const cs = getComputedStyle(node);
        if (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || cs.backgroundImage !== 'none' || cs.borderWidth !== '0px') {
          const r = node.getBoundingClientRect();
          out.benefitCard = { tag: node.tagName, w: Math.round(r.width), h: Math.round(r.height), bg: cs.backgroundColor, bgi: cs.backgroundImage.slice(0, 200), radius: cs.borderRadius, border: cs.border };
          break;
        }
        node = node.parentElement; hops++;
      }
      // title style
      const titleEl = Array.from(el.querySelectorAll('*')).find((e) => txt(e) === 'INSTANT CONTOUR REFINEMENT' && e.children.length === 0) || el;
      out.benefitTitle = style(titleEl, { tag: titleEl.tagName });
    }
  });

  // 5. press logos: imgs between 'trusted clinic' heading and benefits
  const press = [];
  document.querySelectorAll('img').forEach((im) => {
    const r = im.getBoundingClientRect();
    const y = r.top + scrollY;
    const src = im.currentSrc || im.src;
    if (/f940f0_|87fc13_/.test(src) && y > 2500 && y < 3600 && r.height > 15 && r.height < 90) {
      press.push({ y: Math.round(y), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), id: (src.match(/([0-9a-f]{6}_[0-9a-f]{32})/) || ['', src.split('/').pop()])[1] });
    }
  });
  out.press = press.sort((a, b) => a.x - b.x);

  // 6. videos
  out.videos = Array.from(document.querySelectorAll('video')).map((v) => { const r = v.getBoundingClientRect(); return { y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), src: (v.currentSrc || v.src).split('/').slice(-2).join('/') }; });

  // 7. count occurrences of the offer heading & their styles
  out.offerHeadings = [];
  document.querySelectorAll('h1,h2,h3,h4,h5,p,span,div').forEach((el) => {
    if (txt(el).toLowerCase() === 'secure your exclusive fat dissolving offer' && el.children.length <= 1) {
      out.offerHeadings.push(style(el, { tag: el.tagName }));
    }
  });

  // 8. FAQ search input
  out.faqSearch = Array.from(document.querySelectorAll('input')).map((i) => ({ y: Math.round(i.getBoundingClientRect().top + scrollY), ph: i.placeholder, w: Math.round(i.getBoundingClientRect().width) })).filter((i) => i.w > 0);

  // 9. iframes (carousel embed)
  out.iframes = Array.from(document.querySelectorAll('iframe')).map((f) => { const r = f.getBoundingClientRect(); return { y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), src: (f.src || '').slice(0, 100) }; });

  return out;
});
console.log(JSON.stringify(data, null, 1));
await b.close();
