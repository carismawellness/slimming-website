import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/packages', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); window.scrollTo(0, 0); });
await sleep(1500);

// ---- 1. Step tabs ----
console.log('########## STEP TABS ##########');
for (let n = 1; n <= 5; n++) {
  await pg.evaluate((nn) => {
    const tabs = Array.from(document.querySelectorAll('*')).filter((e) => e.children.length === 0 && new RegExp('^step\\s*' + nn + '$', 'i').test((e.textContent || '').trim()));
    for (const t of tabs) { let el = t; for (let i = 0; i < 6 && el; i++) { try { el.click(); } catch (x) {} el = el.parentElement; } }
  }, n).catch(() => {});
  await sleep(900);
  const txt = await pg.evaluate(() => {
    // find the tab element for STEP 1; its ancestor containing all 5 step labels + long text is the tabs widget
    const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
    let el = Array.from(document.querySelectorAll('*')).find((e) => e.children.length === 0 && /^step\s*1$/i.test(norm(e.textContent)));
    if (!el) return 'NO TAB FOUND';
    let anc = el;
    for (let i = 0; i < 15 && anc.parentElement; i++) {
      anc = anc.parentElement;
      const t = norm(anc.textContent);
      if (/step\s*5/i.test(t) && t.length > 600) break;
    }
    return anc.innerText;
  });
  console.log('===== PANEL FOR STEP ' + n + ' =====');
  console.log(txt);
}

// ---- 2. FAQ ----
console.log('########## FAQ ##########');
const qs = await pg.evaluate(() => Array.from(document.querySelectorAll('*'))
  .filter((el) => el.children.length === 0 && /^\d{1,2}\.\s+[A-Z]/.test((el.textContent || '').trim()))
  .map((el) => (el.textContent || '').trim()));
for (const q of qs) {
  await pg.evaluate((qq) => {
    const el = Array.from(document.querySelectorAll('*')).find((e) => e.children.length === 0 && (e.textContent || '').trim() === qq);
    if (el) { let n = el; for (let i = 0; i < 5 && n; i++) { try { n.click(); } catch (e) {} n = n.parentElement; } }
  }, q).catch(() => {});
  await sleep(300);
}
await sleep(800);
const faqDump = await pg.evaluate(() => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
  let el = Array.from(document.querySelectorAll('*')).find((e) => e.children.length === 0 && /^1\.\s/.test(norm(e.textContent)));
  if (!el) return 'NO FAQ';
  let anc = el;
  for (let i = 0; i < 15 && anc.parentElement; i++) {
    anc = anc.parentElement;
    const t = norm(anc.textContent);
    if (/10\.\s/.test(t) && t.length > 2000) break;
  }
  return anc.innerText;
});
console.log(faqDump);

// ---- 3. Evidence cards (expand see more / read more) ----
console.log('########## EVIDENCE ##########');
await pg.evaluate(() => {
  Array.from(document.querySelectorAll('a,button,span,div')).forEach((e) => {
    const t = (e.textContent || '').trim().toLowerCase();
    if (e.children.length === 0 && (t === 'read more' || t === 'see more')) { try { e.click(); } catch (x) {} }
  });
});
await sleep(1000);
const ev = await pg.evaluate(() => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const head = Array.from(document.querySelectorAll('h1,h2,h3,h4,span,div,p')).find((e) => /^evidence based approach$/i.test(norm(e.textContent)));
  if (!head) return 'NO EVIDENCE HEADING';
  let sec = head;
  for (let i = 0; i < 15 && sec.parentElement; i++) {
    sec = sec.parentElement;
    const t = norm(sec.textContent);
    if (/key results/i.test(t) && t.length > 3000) break;
  }
  return sec.innerText;
});
console.log(ev);

// ---- 4. Images: all imgs with position, src id, alt ----
console.log('########## IMAGES ##########');
const imgs = await pg.evaluate(() => {
  const out = [];
  document.querySelectorAll('img').forEach((im) => {
    const r = im.getBoundingClientRect();
    const y = Math.round(r.top + window.scrollY);
    const m = (im.src || '').match(/media\/([^/?]+)/);
    out.push({ y, x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), id: m ? m[1] : (im.src || '').slice(0, 90), alt: im.alt || '' });
  });
  out.sort((a, b2) => a.y - b2.y || a.x - b2.x);
  return out;
});
console.log(JSON.stringify(imgs, null, 1));
await b.close();
