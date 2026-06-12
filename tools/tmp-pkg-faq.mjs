import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL = 'https://www.carismaslimming.com/packages';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); });
await sleep(1000);

// gather question texts
const qs = await pg.evaluate(() => Array.from(document.querySelectorAll('*'))
  .filter((el) => el.children.length === 0 && /^\d{1,2}\.\s+[A-Z]/.test((el.textContent || '').trim()))
  .map((el) => (el.textContent || '').trim()));

const faqContainer = () => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
  let el = Array.from(document.querySelectorAll('*')).find((e) => e.children.length === 0 && /^1\.\s/.test(norm(e.textContent)));
  if (!el) return null;
  let anc = el;
  for (let i = 0; i < 15 && anc.parentElement; i++) {
    anc = anc.parentElement;
    const t = norm(anc.textContent);
    if (/10\.\s/.test(t) && t.length > 1500) break;
  }
  return anc;
};

for (const q of qs) {
  await pg.evaluate((qq) => {
    const el = Array.from(document.querySelectorAll('*')).find((e) => e.children.length === 0 && (e.textContent || '').trim() === qq);
    if (el) { let n = el; for (let i = 0; i < 5 && n; i++) { try { n.click(); } catch (e) {} n = n.parentElement; } }
  }, q).catch(() => {});
  await sleep(800);
  const dump = await pg.evaluate(`(${faqContainer.toString()})() ? (${faqContainer.toString()})().innerText : 'NO FAQ'`);
  console.log('@@@@ OPEN Q:', q);
  console.log(dump);
  console.log('@@@@ END');
}
await b.close();
