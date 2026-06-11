import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const slugs = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
for (const slug of slugs) {
  const pg = await b.newPage();
  const jsonHits = [];
  pg.on('response', async (res) => {
    const ct = res.headers()['content-type'] || '';
    if (!/json|javascript/.test(ct)) return;
    try {
      const t = await res.text();
      if (/author_name|reviewer|"reviews"|relativePublishTimeDescription|Reuben|Ciantar|Zammit/i.test(t)) {
        jsonHits.push({ url: res.url().slice(0, 90), snippet: t.slice(0, 60) });
      }
    } catch {}
  });
  await pg.setViewport({ width: 1440, height: 1000 });
  const target = slug.startsWith('http') ? slug : 'https://www.carismaslimming.com/' + slug;
  await pg.goto(target, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
  await sleep(3000);
  await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 800); y += 800; if (y < document.body.scrollHeight) setTimeout(s, 100); else res(); }; s(); }); });
  await sleep(2500);
  // search main doc + same-origin iframes for the widget
  const found = await pg.evaluate(() => {
    const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
    const docs = [document];
    document.querySelectorAll('iframe').forEach((f) => { try { if (f.contentDocument) docs.push(f.contentDocument); } catch {} });
    for (const d of docs) {
      const hit = Array.from(d.querySelectorAll('*')).find((e) => /review us on google|reviews on google|\bon Google\b/i.test(norm(e.textContent)) && norm(e.textContent).length < 200);
      if (hit) {
        // climb to a container, then read review-ish cards
        let root = hit; for (let i = 0; i < 8 && root.parentElement; i++) root = root.parentElement;
        return { where: d === document ? 'main' : 'iframe', summary: norm(hit.textContent).slice(0, 120), block: norm(root.innerText).slice(0, 2500) };
      }
    }
    return null;
  });
  // list cross-origin review iframes
  const frames = await pg.evaluate(() => Array.from(document.querySelectorAll('iframe')).map((f) => f.src).filter((s) => /review|elfsight|trustindex|sociablekit|featurable|embedsocial|widget/i.test(s)));
  console.log('===== /' + slug + ' =====');
  console.log('reviewIframes:', JSON.stringify(frames));
  console.log('jsonHits:', JSON.stringify(jsonHits.slice(0, 6)));
  console.log('found:', found ? JSON.stringify(found) : 'NONE');
  await pg.close();
}
await b.close();
