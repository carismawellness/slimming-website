import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL = 'https://www.carismaslimming.com/lipocavitation-malta';
const QUESTIONS = [
  'How many sessions will I need?',
  'Does it hurt?',
  'When will I see results?',
  'Are the results permanent?',
  'Which areas can be treated?',
  'Can I combine this with other treatments?',
  'Is there any downtime?',
  'Who is not a suitable candidate?',
];
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3500));
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); });
await new Promise((r) => setTimeout(r, 800));

function clickQ(pg, qq) {
  return pg.evaluate((qq) => {
    const el = Array.from(document.querySelectorAll('*')).find((e) => e.children.length === 0 && (e.textContent || '').trim() === qq);
    if (el) { let n = el; for (let i = 0; i < 6 && n; i++) { try { n.click(); } catch (e) {} n = n.parentElement; } }
  }, qq).catch(() => {});
}

const results = [];
for (const q of QUESTIONS) {
  await clickQ(pg, q); // open
  await new Promise((r) => setTimeout(r, 700));
  const dump = await pg.evaluate(() => {
    const all = Array.from(document.querySelectorAll('*')).find((e) => /frequently asked questions/i.test((e.textContent || '')) && (e.textContent || '').length > 500 && (e.textContent || '').length < 8000);
    return all ? all.innerText : document.body.innerText;
  });
  results.push({ q, dump });
  await clickQ(pg, q); // close again
  await new Promise((r) => setTimeout(r, 500));
}

for (const { q, dump } of results) {
  console.log('===== Q: ' + q + ' =====');
  console.log(dump);
  console.log('');
}
await b.close();
