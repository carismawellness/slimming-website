import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2] || 'https://www.carismaslimming.com/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await p.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); window.scrollTo(0, 0); });
await sleep(1500);
const out = await p.evaluate(() => {
  const norm = (s) => (s || '').replace(/[​]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
  const res = {};
  // 1. CTA button container: find anchor/container around 'Get Your Free Body Analysis'
  const ctas = [];
  document.querySelectorAll('a,button,div').forEach((el) => {
    if (norm(el.textContent) !== 'get your free body analysis') return;
    const cs = getComputedStyle(el);
    if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') {
      const r = el.getBoundingClientRect();
      ctas.push({ y: Math.round(r.top + window.scrollY), w: Math.round(r.width), h: Math.round(r.height), bg: cs.backgroundColor, radius: cs.borderRadius });
    }
  });
  res.ctas = ctas;
  // also look one level up if none had bg
  if (!ctas.length) {
    document.querySelectorAll('a,button,div,span').forEach((el) => {
      if (norm(el.textContent) !== 'get your free body analysis') return;
      let n = el; let d = 0;
      while (n && d < 5) {
        const cs = getComputedStyle(n);
        if (cs.backgroundColor !== 'rgba(0, 0, 0, 0)') {
          const r = n.getBoundingClientRect();
          res.ctas.push({ y: Math.round(r.top + window.scrollY), w: Math.round(r.width), h: Math.round(r.height), bg: cs.backgroundColor, radius: cs.borderRadius, tag: n.tagName });
          break;
        }
        n = n.parentElement; d++;
      }
    });
  }
  // 2. list marker for 'attend all scheduled...'
  const findEl = (t) => {
    let found = null;
    document.querySelectorAll('li,p,span,div').forEach((el) => { if (!found && el.children.length <= 2 && norm(el.textContent) === t) found = el; });
    return found;
  };
  const li = findEl('attend all scheduled in clinic sessions and weekly check ins');
  if (li) {
    const before = getComputedStyle(li, '::before');
    const marker = getComputedStyle(li, '::marker');
    // look for sibling image/svg marker
    let prevDesc = null;
    const parent = li.closest('li') || li.parentElement;
    if (parent) {
      const imgs = parent.querySelectorAll('img,svg');
      if (imgs.length) prevDesc = imgs[0].outerHTML.slice(0, 150);
    }
    res.agreeItem = { tag: li.tagName, before: before.content, marker: marker.content, listStyle: getComputedStyle(li).listStyleType, siblingGraphic: prevDesc };
  }
  // 3. GLP-1 bullet structure: count separate items
  const texts = [
    'you first have a full medical weight loss assessment, body scan and review of your history and bloods',
    'if you medically qualify, the doctor explains your options, expected results and side effects so you can decide with confidence',
  ];
  res.glp1items = texts.map((t) => { const el = findEl(t); return el ? { found: true, tag: el.tagName, y: Math.round(el.getBoundingClientRect().top + window.scrollY), x: Math.round(el.getBoundingClientRect().left) } : { found: false }; });
  // 4. pillars eyebrow visible
  let eb = null;
  document.querySelectorAll('span,p,h2,h3,h4,div').forEach((el) => {
    if (el.children.length > 1) return;
    if (norm(el.textContent) !== '4 core pillars of our weight loss methodology') return;
    const cs = getComputedStyle(el);
    if (parseFloat(cs.fontSize) < 11) return;
    eb = { font: cs.fontFamily.split(',')[0], size: cs.fontSize, color: cs.color, ls: cs.letterSpacing, weight: cs.fontWeight, deco: cs.textDecorationLine };
  });
  res.pillarsEyebrow = eb;
  // 5. section bg behind pillar cards: sample element at point
  const pill = findEl('know your body before starting any program');
  if (pill) {
    const r = pill.getBoundingClientRect();
    // sample bg colors of ancestors
    const chain = [];
    let n = pill;
    for (let i = 0; i < 14 && n; i++) {
      const cs = getComputedStyle(n);
      if (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || cs.backgroundImage !== 'none') {
        chain.push({ tag: n.tagName, cls: (n.className || '').toString().slice(0, 40), bg: cs.backgroundColor, bgi: cs.backgroundImage.slice(0, 120), radius: cs.borderRadius, w: Math.round(n.getBoundingClientRect().width) });
      }
      n = n.parentElement;
    }
    res.pillarCardChain = chain;
  }
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
