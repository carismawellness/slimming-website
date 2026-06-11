import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL = 'https://www.carismaslimming.com/skin-tightening';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3500));
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); });
await new Promise((r) => setTimeout(r, 800));

const questions = [
  '2. Who is this treatment best suited for?',
  '3. Does VelaShape III help with weight loss?',
  '4. How does VelaShape III tighten the skin?',
  '5. Does the treatment hurt?',
  '6. Is there any downtime after treatment?',
  '7. When will I start seeing results?',
  '8. How long do the results last?',
  '9. Is VelaShape III safe?',
  '10. Can VelaShape III help with cellulite?',
];

for (const q of questions) {
  await pg.evaluate((qq) => {
    const el = Array.from(document.querySelectorAll('*')).find((e) => e.children.length === 0 && (e.textContent || '').trim() === qq);
    if (el) { let n = el; for (let i = 0; i < 5 && n; i++) { try { n.click(); } catch (e) {} n = n.parentElement; } }
  }, q).catch(() => {});
  await new Promise((r) => setTimeout(r, 600));
  const ans = await pg.evaluate((qq) => {
    const cont = Array.from(document.querySelectorAll('*')).find((e) => /frequently asked questions/i.test((e.textContent || '')) && (e.textContent || '').length > 500);
    return cont ? cont.innerText : document.body.innerText;
  }, q);
  console.log('==== Q:', q);
  console.log(ans);
  console.log('==== END');
  await pg.evaluate((qq) => {
    const el = Array.from(document.querySelectorAll('*')).find((e) => e.children.length === 0 && (e.textContent || '').trim() === qq);
    if (el) { let n = el; for (let i = 0; i < 5 && n; i++) { try { n.click(); } catch (e) {} n = n.parentElement; } }
  }, q).catch(() => {});
  await new Promise((r) => setTimeout(r, 400));
}
await b.close();
