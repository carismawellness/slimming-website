import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/fat-reduction', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 250); else res(); }; s(); }); });
await sleep(4000);

const data = await pg.evaluate(() => {
  const out = {};
  // iframes
  out.iframes = Array.from(document.querySelectorAll('iframe')).map((f) => {
    const r = f.getBoundingClientRect();
    return { src: (f.src || '').slice(0, 120), y: Math.round(r.top + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) };
  });
  // search input near FAQ
  out.inputs = Array.from(document.querySelectorAll('input')).map((i) => {
    const r = i.getBoundingClientRect();
    return { ph: i.placeholder, y: Math.round(r.top + window.scrollY), w: Math.round(r.width) };
  });
  // all CTA-ish button/link labels with y
  out.ctas = Array.from(document.querySelectorAll('a,button')).map((a) => {
    const t = (a.textContent || '').replace(/\s+/g, ' ').trim();
    const r = a.getBoundingClientRect();
    return { t, y: Math.round(r.top + window.scrollY) };
  }).filter((x) => /claim|spot|consult/i.test(x.t) && x.t.length < 40);
  // check texts
  const body = document.body.innerText;
  out.hasMustli = /mustlidisciplinary/i.test(body);
  out.hasMulti = /multidisciplinary/i.test(body);
  out.hasReviews = /reviews on Google|Review us on Google|See all our reviews/i.test(body);
  out.has47 = /4\.7/.test(body);
  // shrink heading element style
  const els = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,span,p,div'));
  const find = (re) => {
    for (const el of els) {
      if (el.children.length > 3) continue;
      const t = (el.textContent || '').replace(/\s+/g, ' ').trim();
      if (re.test(t) && t.length < 90) {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return { t, font: cs.fontFamily.slice(0, 40), size: cs.fontSize, weight: cs.fontWeight, color: cs.color, align: cs.textAlign, y: Math.round(r.top + window.scrollY) };
      }
    }
    return null;
  };
  out.shrink = find(/^shrink love handles/i);
  out.secret = find(/^the secret to a more defined/i);
  out.faqHead = find(/^frequently asked questions$/i);
  out.dualHead = find(/dual technology/i);
  out.evHead = find(/^evidence based approach$/i);
  // hero media: largest img/video in first 1200px
  out.media = Array.from(document.querySelectorAll('img,video')).map((m) => {
    const r = m.getBoundingClientRect();
    return { tag: m.tagName, src: (m.currentSrc || m.src || '').slice(0, 100), y: Math.round(r.top + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) };
  }).filter((m) => m.y < 1300 && m.w > 200);
  return out;
});
console.log(JSON.stringify(data, null, 1));
await b.close();
