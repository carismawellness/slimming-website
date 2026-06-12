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

for (let n = 1; n <= 5; n++) {
  await pg.evaluate((nn) => {
    const tabs = Array.from(document.querySelectorAll('*')).filter((e) => e.children.length === 0 && new RegExp('^step\\s*' + nn + '$', 'i').test((e.textContent || '').trim()));
    for (const t of tabs) { let el = t; for (let i = 0; i < 6 && el; i++) { try { el.click(); } catch (x) {} el = el.parentElement; } }
  }, n).catch(() => {});
  await sleep(1000);
  const data = await pg.evaluate(() => {
    const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
    let el = Array.from(document.querySelectorAll('*')).find((e) => e.children.length === 0 && /^step\s*1$/i.test(norm(e.textContent)));
    if (!el) return 'NO TAB';
    let anc = el;
    for (let i = 0; i < 15 && anc.parentElement; i++) {
      anc = anc.parentElement;
      const t = norm(anc.textContent);
      if (/step\s*5/i.test(t) && t.length > 600) break;
    }
    const out = { imgs: [], heads: [] };
    anc.querySelectorAll('img').forEach((im) => {
      if (!im.checkVisibility()) return;
      const r = im.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return;
      const m = (im.src || '').match(/media\/([^/?]+)/);
      out.imgs.push({ y: Math.round(r.top + window.scrollY), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), id: m ? m[1] : im.src.slice(0, 60), alt: im.alt });
    });
    anc.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span').forEach((h) => {
      if (!h.checkVisibility()) return;
      const t = norm(h.textContent);
      if (!t || t.length > 80) return;
      const cs = getComputedStyle(h);
      const fs = parseFloat(cs.fontSize);
      if (parseInt(cs.fontWeight) >= 600 || fs >= 17) {
        const r = h.getBoundingClientRect();
        if (r.width < 2) return;
        out.heads.push({ tag: h.tagName, t: t.slice(0, 70), fs: cs.fontSize, fw: cs.fontWeight, color: cs.color, y: Math.round(r.top + window.scrollY), x: Math.round(r.left) });
      }
    });
    out.imgs.sort((a, b2) => a.y - b2.y || a.x - b2.x);
    return out;
  });
  console.log('===== STEP ' + n + ' =====');
  console.log(JSON.stringify(data, null, 1));
}
await b.close();
