import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL = 'https://www.carismaslimming.com/muscle-stimulation';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3500));
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); });
await new Promise((r) => setTimeout(r, 800));

const questions = [
  '2. Am I a good candidate for EMSculpt Neo?',
  '3. How does EMSculpt Neo actually work?',
  '4. Does EMSculpt Neo replace the gym?',
  '5. How many areas can be treated?',
  '6. Does the treatment hurt?',
  '7. Is there any downtime after EMSculpt Neo?',
  '8. When will I start seeing results?',
  '9. Are the results permanent?',
  '10. Are there any risks or contraindications?',
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
