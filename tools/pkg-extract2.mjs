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

// ---- FAQ: click each question, capture region text after each click ----
console.log('########## FAQ ONE BY ONE ##########');
const qs = await pg.evaluate(() => Array.from(document.querySelectorAll('*'))
  .filter((el) => el.children.length === 0 && /^\d{1,2}\.\s+[A-Z]/.test((el.textContent || '').trim()))
  .map((el) => (el.textContent || '').trim()));
for (const q of qs) {
  await pg.evaluate((qq) => {
    const el = Array.from(document.querySelectorAll('*')).find((e) => e.children.length === 0 && (e.textContent || '').trim() === qq);
    if (el) { el.scrollIntoView({ block: 'center' }); let n = el; for (let i = 0; i < 5 && n; i++) { try { n.click(); } catch (e) {} n = n.parentElement; } }
  }, q).catch(() => {});
  await sleep(700);
  const txt = await pg.evaluate((qq) => {
    const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
    let el = Array.from(document.querySelectorAll('*')).find((e) => e.children.length === 0 && norm(e.textContent) === norm(qq));
    if (!el) return 'NOT FOUND';
    // walk up to the accordion item: ancestor whose text is noticeably longer than the question
    let anc = el;
    for (let i = 0; i < 10 && anc.parentElement; i++) {
      anc = anc.parentElement;
      const t = norm(anc.textContent);
      if (t.length > norm(qq).length + 80 && !/^\s*1\.\s/.test(t.slice(0, 4)) ) break;
    }
    return anc.innerText;
  }, q);
  console.log('=====Q ' + q.slice(0, 50) + ' =====');
  console.log(txt);
  console.log('');
}

// ---- Per-tab visible images + heading styles ----
console.log('########## TAB PANEL IMAGES ##########');
for (let n = 1; n <= 5; n++) {
  await pg.evaluate((nn) => {
    const tabs = Array.from(document.querySelectorAll('*')).filter((e) => e.children.length === 0 && new RegExp('^step\\s*' + nn + '$', 'i').test((e.textContent || '').trim()));
    for (const t of tabs) { let el = t; for (let i = 0; i < 6 && el; i++) { try { el.click(); } catch (x) {} el = el.parentElement; } }
  }, n).catch(() => {});
  await sleep(900);
  const info = await pg.evaluate(() => {
    const out = { imgs: [], heads: [] };
    document.querySelectorAll('img').forEach((im) => {
      const r = im.getBoundingClientRect();
      if (r.width < 5 || r.height < 5) return;
      const y = Math.round(r.top + window.scrollY);
      if (y < 3300 || y > 4600) return; // tabs widget zone
      const m = (im.src || '').match(/media\/([^/?]+)/);
      out.imgs.push({ y, x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), id: m ? m[1] : '', alt: im.alt });
    });
    document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span').forEach((e) => {
      if (e.children.length > 1) return;
      const t = (e.textContent || '').replace(/\s+/g, ' ').trim();
      if (!t || t.length > 60) return;
      const r = e.getBoundingClientRect();
      if (r.width < 5 || r.height < 5) return;
      const y = Math.round(r.top + window.scrollY);
      if (y < 3300 || y > 4600) return;
      const cs = getComputedStyle(e);
      if (parseFloat(cs.fontSize) < 15) return;
      out.heads.push({ y, x: Math.round(r.left), t: t.slice(0, 55), fs: cs.fontSize, fw: cs.fontWeight, color: cs.color, tag: e.tagName });
    });
    out.imgs.sort((a, b2) => a.y - b2.y);
    out.heads.sort((a, b2) => a.y - b2.y);
    return out;
  });
  console.log('=== STEP ' + n + ' ===');
  console.log(JSON.stringify(info, null, 1));
}
await b.close();
