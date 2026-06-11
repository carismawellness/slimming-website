import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL = 'https://www.carismaslimming.com/fatdissolving';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3500));
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); });
await new Promise((r) => setTimeout(r, 800));

const questions = [
  'What can I expect during a Fat Dissolving treatment?',
  'Is Fat Dissolving painful?',
  'What is the recovery time for Fat Dissolving treatments?',
  'How long does it take to see the results of Fat Dissolving?',
  'How long do the results of Fat Dissolving?',
  'Are there any side effects or risks associated with Fat Dissolving?',
  'Who is a suitable candidate for Fat Dissolving treatment?',
  'What parts of the body you can treat with Fat Dissolving?',
];

const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();

for (let i = 0; i < questions.length; i++) {
  const q = questions[i];
  const next = questions[i + 1];
  // click to open this one
  await pg.evaluate((qq) => {
    const el = Array.from(document.querySelectorAll('*')).find((e) => e.children.length === 0 && (e.textContent || '').trim() === qq);
    if (el) { let n = el; for (let k = 0; k < 5 && n; k++) { try { n.click(); } catch (e) {} n = n.parentElement; } }
  }, q).catch(() => {});
  await new Promise((r) => setTimeout(r, 700));
  const ans = await pg.evaluate(({ qq, nx }) => {
    const cont = Array.from(document.querySelectorAll('*')).find((e) => /frequently asked questions/i.test((e.textContent || '')) && (e.textContent || '').length > 500 && e.textContent.length < 6000);
    let txt = cont ? cont.innerText : document.body.innerText;
    return txt;
  }, { qq: q, nx: next });
  // extract slice between question q and next question (or "dr." section)
  let slice = ans;
  const iQ = ans.indexOf(q);
  if (iQ >= 0) slice = ans.slice(iQ + q.length);
  if (next) {
    const iN = slice.indexOf(next);
    if (iN >= 0) slice = slice.slice(0, iN);
  } else {
    const iD = slice.search(/dr\.\s/i);
    if (iD >= 0) slice = slice.slice(0, iD);
  }
  console.log('==== Q:', q);
  console.log('ANS:', norm(slice));
  console.log('');
  // close
  await pg.evaluate((qq) => {
    const el = Array.from(document.querySelectorAll('*')).find((e) => e.children.length === 0 && (e.textContent || '').trim() === qq);
    if (el) { let n = el; for (let k = 0; k < 5 && n; k++) { try { n.click(); } catch (e) {} n = n.parentElement; } }
  }, q).catch(() => {});
  await new Promise((r) => setTimeout(r, 400));
}
await b.close();
