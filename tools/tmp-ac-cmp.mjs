// Probe live anti-cellulite page for specific open questions
import puppeteer from 'puppeteer-core';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/anti-cellulite', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3000);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); });
await sleep(2000);
const out = await pg.evaluate(() => {
  const r = {};
  const Y = (e) => Math.round(e.getBoundingClientRect().top + scrollY);
  const st = (e) => { const s = getComputedStyle(e); return { y: Y(e), size: s.fontSize, weight: s.fontWeight, tt: s.textTransform, color: s.color, fam: s.fontFamily.split(',')[0].slice(0, 30), text: e.textContent.trim().slice(0, 90) }; };
  // 1. all occurrences of the subheading text
  const subs = Array.from(document.querySelectorAll('span,p,h1,h2,h3')).filter(e => e.children.length === 0 && /smooth stubborn cellulite and uneven texture/i.test(e.textContent));
  r.subheadingOccurrences = subs.map(st);
  // 2. eyebrow above evidence heading
  const ev = Array.from(document.querySelectorAll('span,p,h1,h2,h3')).filter(e => e.children.length === 0 && /evidence based approach/i.test(e.textContent));
  r.evidenceTexts = ev.map(st);
  const clin = Array.from(document.querySelectorAll('span,p,h1,h2,h3')).filter(e => e.children.length === 0 && /clinical research/i.test(e.textContent));
  r.clinicalTexts = clin.map(st);
  // 3. all claim buttons
  const claims = Array.from(document.querySelectorAll('a,button')).filter(e => /claim/i.test(e.textContent));
  r.claims = claims.map(e => ({ y: Y(e), text: e.textContent.trim().slice(0, 40), href: (e.href || '').slice(0, 80) }));
  // 4. FAQ search box
  const inputs = Array.from(document.querySelectorAll('input')).map(e => ({ y: Y(e), placeholder: e.placeholder, x: Math.round(e.getBoundingClientRect().left) }));
  r.inputs = inputs;
  const faqH = Array.from(document.querySelectorAll('h1,h2,h3,span,p')).find(e => /frequently asked questions/i.test(e.textContent) && e.children.length === 0);
  if (faqH) { const bx = faqH.getBoundingClientRect(); r.faqHeading = { y: Y(faqH), x: Math.round(bx.left), w: Math.round(bx.width), ...st(faqH) }; }
  // 5. iframes (map / embeds)
  r.iframes = Array.from(document.querySelectorAll('iframe')).map(e => { const bx = e.getBoundingClientRect(); return { y: Math.round(bx.top + scrollY), w: Math.round(bx.width), h: Math.round(bx.height), src: (e.src || '').slice(0, 110), title: e.title }; });
  // 6. hero video
  r.videos = Array.from(document.querySelectorAll('video')).map(e => { const bx = e.getBoundingClientRect(); return { y: Math.round(bx.top + scrollY), w: Math.round(bx.width), h: Math.round(bx.height), src: (e.currentSrc || e.src || '').slice(0, 120), poster: (e.poster || '').slice(0, 120) }; });
  // 7. price lines
  const tv = Array.from(document.querySelectorAll('span,p,h2,h3')).filter(e => /total value/i.test(e.textContent) && e.textContent.length < 120);
  r.totalValueLines = tv.map(st);
  const pn = Array.from(document.querySelectorAll('span,p')).filter(e => e.children.length === 0 && /individual sessions/i.test(e.textContent));
  r.priceNote = pn.map(st);
  // 8. testimonial carousel names
  const names = ['JULIA BECKER', 'MICHELLE SCERRI', 'FRANCESCA BIANCHI', 'LORRAINE VELLA'];
  r.testimonialFound = names.map(n => ({ n, found: document.body.innerText.toUpperCase().includes(n) }));
  // iframe embeds content check (carousel lives in filesusr iframe)
  return r;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
