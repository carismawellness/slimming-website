import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/fat-reduction', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3500));
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); });
await new Promise((r) => setTimeout(r, 800));
// click every element whose text starts with "N." question pattern
const qs = await pg.evaluate(() => Array.from(document.querySelectorAll('*'))
  .filter((el) => el.children.length === 0 && /^\d{1,2}\.\s+[A-Z]/.test((el.textContent || '').trim()))
  .map((el) => (el.textContent || '').trim()));
for (const q of qs) {
  await pg.evaluate((qq) => {
    const el = Array.from(document.querySelectorAll('*')).find((e) => e.children.length === 0 && (e.textContent || '').trim() === qq);
    if (el) { let n = el; for (let i = 0; i < 5 && n; i++) { try { n.click(); } catch (e) {} n = n.parentElement; } }
  }, q).catch(() => {});
  await new Promise((r) => setTimeout(r, 250));
}
await new Promise((r) => setTimeout(r, 800));
const dump = await pg.evaluate(() => {
  // Grab the FAQ region text
  const all = Array.from(document.querySelectorAll('*')).find((e) => /frequently asked questions/i.test((e.textContent || '')) && (e.textContent || '').length > 2000);
  return all ? all.innerText : document.body.innerText;
});
console.log(dump);
await b.close();
