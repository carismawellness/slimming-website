import puppeteer from 'puppeteer-core';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/anti-cellulite', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3000);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); });
await sleep(1500);
const out = await pg.evaluate(() => {
  const st = (e) => { const s = getComputedStyle(e); const b = e.getBoundingClientRect(); return { y: Math.round(b.top + scrollY), size: s.fontSize, weight: s.fontWeight, color: s.color, family: s.fontFamily.split(',')[0].slice(0,40), text: e.textContent.trim().slice(0,50) }; };
  const leaf = (re) => Array.from(document.querySelectorAll('span,p,h1,h2,h3,h4')).find(e => e.children.length === 0 && re.test(e.textContent));
  const r = {};
  const a = leaf(/CelluLift uses VelaShape III vacuum roller/i); if (a) r.techPara = st(a);
  const bb = leaf(/Smooths the appearance of cellulite, improves skin/i); if (bb) r.techIntro = st(bb);
  const cc = leaf(/^velashape iii/i) || leaf(/velashape iii \(cellulift/i); if (cc) r.techTitle = st(cc);
  const dd = leaf(/muscle strengthening, tone/i); if (dd) r.techTag = st(dd);
  const ee = leaf(/Clinically proven approach/i); if (ee) r.techBullet = st(ee);
  // secret panel: ancestor of subheading with background
  const sm = leaf(/smooth stubborn cellulite/i);
  if (sm) { let el = sm, chain = []; for (let i=0;i<10 && el;i++){ const s = getComputedStyle(el); if (s.backgroundColor !== 'rgba(0, 0, 0, 0)' || s.backgroundImage !== 'none') { const bx = el.getBoundingClientRect(); chain.push({ tag: el.tagName, y: Math.round(bx.top+scrollY), w: Math.round(bx.width), h: Math.round(bx.height), bg: s.backgroundColor, bgi: s.backgroundImage.slice(0,90), br: s.borderRadius }); } el = el.parentElement; } r.secretPanel = chain; }
  const si = leaf(/You eat well, stay active/i); if (si) r.secretIntro = st(si);
  const sb = leaf(/You exercise regularly, but the bumpy/i); if (sb) r.secretBullet = st(sb);
  // benefit card
  const bt = leaf(/targeted cellulite contouring/i);
  if (bt) { let el = bt.closest('div'); for (let i=0;i<8 && el;i++){ const s = getComputedStyle(el); if (s.backgroundImage !== 'none' || s.backgroundColor !== 'rgba(0, 0, 0, 0)') { const bx = el.getBoundingClientRect(); r.benefitCard = { w: Math.round(bx.width), h: Math.round(bx.height), bg: s.backgroundColor, bgi: s.backgroundImage.slice(0,120), br: s.borderRadius }; break; } el = el.parentElement; } r.benefitTitle = st(bt); }
  // FAQ heading box
  const fh = Array.from(document.querySelectorAll('h1')).find(e => /frequently asked/i.test(e.textContent));
  if (fh) { const bx = fh.getBoundingClientRect(); r.faqHeadingBox = { x: Math.round(bx.left), w: Math.round(bx.width) }; }
  // dual price spans
  const dp = leaf(/€199 only/i); if (dp) r.dualPrice = st(dp);
  const dl = leaf(/total value: €625\./i); if (dl) r.dualLabel = st(dl);
  // hero G logo size
  const g = Array.from(document.querySelectorAll('img')).find(i => /c507b5f7e86f4eed|google/i.test(i.src) && i.getBoundingClientRect().top + scrollY < 1000);
  if (g) { const bx = g.getBoundingClientRect(); r.heroG = { y: Math.round(bx.top+scrollY), w: Math.round(bx.width), h: Math.round(bx.height) }; }
  return r;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
