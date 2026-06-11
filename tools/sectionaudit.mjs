import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pages = ['fat-reduction', 'fatdissolving', 'muscle-stimulation', 'skin-tightening', 'lipocavitation-malta', 'anti-cellulite', 'lymphatic-drainage'];
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
for (const slug of pages) {
  const pg = await b.newPage();
  await pg.setViewport({ width: 1440, height: 1000 });
  await pg.goto('https://www.carismaslimming.com/' + slug, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
  await sleep(3000);
  await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 100); else res(); }; s(); }); window.scrollTo(0, 0); });
  await sleep(1200);
  const data = await pg.evaluate(() => {
    const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
    const text = (document.querySelector('#PAGES_CONTAINER') || document.body).innerText.toLowerCase();
    const sig = {
      press: /trusted clinic for|non surgical fat reduction|malta'?s trusted/.test(text),
      eligibility: /eligibility criteria|selective by intention|treat visible fat bulges|areas of the body/.test(text),
      difference: /another diet clinic|we are not/.test(text),
      packageCard: /multidisciplinary approach|package treatments|proven efficacy/.test(text),
      dual: /starter pack|dual technology/.test(text),
      wellness: /leading wellness chain/.test(text),
      faq: /frequently asked questions/.test(text),
      evidence: /evidence based approach|clinical research/.test(text),
    };
    // ordered green Trajan headings (section backbone)
    const heads = [];
    document.querySelectorAll('h1,h2,h3,h4,h5,h6,span,div,p').forEach((el) => {
      if (el.children.length > 2) return;
      const cs = getComputedStyle(el);
      if (!/trajan/i.test(cs.fontFamily)) return;
      if (parseFloat(cs.fontSize) < 17) return;
      const t = norm(el.textContent);
      if (t.length < 3 || t.length > 70) return;
      const y = Math.round(el.getBoundingClientRect().top + window.scrollY);
      if (heads.length && heads[heads.length - 1].t === t) return;
      heads.push({ y, t });
    });
    heads.sort((a, b) => a.y - b.y);
    const dedup = [];
    for (const h of heads) { if (!dedup.length || dedup[dedup.length - 1].t !== h.t) dedup.push(h); }
    return { sig, heads: dedup.map((h) => h.t) };
  });
  console.log('===== ' + slug + ' =====');
  console.log('sig:', JSON.stringify(data.sig));
  console.log('headings:', JSON.stringify(data.heads, null, 0));
  await pg.close();
}
await b.close();
