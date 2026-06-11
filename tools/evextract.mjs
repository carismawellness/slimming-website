import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); window.scrollTo(0, 0); });
await sleep(1500);
// expand all "read more"
await pg.evaluate(() => {
  Array.from(document.querySelectorAll('a,button,span')).forEach((e) => { if ((e.textContent || '').trim().toLowerCase() === 'read more') { try { e.click(); } catch (x) {} } });
});
await sleep(800);

const out = await pg.evaluate(() => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
  // find the EVIDENCE BASED APPROACH heading
  const head = Array.from(document.querySelectorAll('*')).find((e) => e.children.length <= 2 && /^evidence based approach$/i.test(norm(e.textContent)));
  if (!head) return { error: 'no heading' };
  const headY = head.getBoundingClientRect().top + window.scrollY;
  // collect evidence images (landscape) below the heading and before doctors
  const imgs = [];
  document.querySelectorAll('img').forEach((im) => {
    const r = im.getBoundingClientRect();
    const y = r.top + window.scrollY;
    if (y > headY && y < headY + 2200 && r.width > 200 && r.height > 80 && r.width / r.height > 1.4) {
      const m = (im.src || '').match(/media\/([^/?]+)/);
      imgs.push({ y: Math.round(y), x: Math.round(r.left), id: m ? m[1] : im.src });
    }
  });
  imgs.sort((a, b) => a.y - b.y || a.x - b.x);
  // section text: walk a big ancestor that contains the heading and the cards
  let sec = head;
  for (let i = 0; i < 12 && sec.parentElement; i++) { sec = sec.parentElement; if (norm(sec.textContent).length > 1500 && /what it does/i.test(norm(sec.textContent))) break; }
  return { imgs, text: sec.innerText };
});
console.log('=== IMAGES ===');
console.log(JSON.stringify(out.imgs, null, 0));
console.log('=== TEXT ===');
console.log(out.text);
await b.close();
