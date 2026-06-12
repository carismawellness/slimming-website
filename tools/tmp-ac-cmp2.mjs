// Probe live anti-cellulite FAQ + secret subheading + dual price + crops
import puppeteer from 'puppeteer-core';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/anti-cellulite', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3000);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); window.scrollTo(0,0); });
await sleep(2000);
const out = await pg.evaluate(() => {
  const r = {};
  const Y = (e) => Math.round(e.getBoundingClientRect().top + scrollY);
  const st = (e) => { const s = getComputedStyle(e); return { y: Y(e), size: s.fontSize, weight: s.fontWeight, tt: s.textTransform, color: s.color, fam: s.fontFamily.split(',')[0].slice(0, 34), text: e.textContent.trim().slice(0, 70) }; };
  const leaf = (re) => Array.from(document.querySelectorAll('span,p,h1,h2,h3,h4,h5,div,button,a')).filter(e => e.children.length === 0 && re.test(e.textContent));
  r.q1 = leaf(/What is included in the CelluLift protocol/i).map(st).slice(0, 3);
  r.q2 = leaf(/Who is this treatment best suited for/i).map(st).slice(0, 3);
  r.a1 = leaf(/The protocol includes three VelaShape vacuum roller sessions/i).map(st).slice(0, 2);
  // share icons in faq?
  r.shareIcons = Array.from(document.querySelectorAll('[data-hook*="share"],[aria-label*="Share"],[aria-label*="share"]')).map(e => ({ y: Y(e), tag: e.tagName, label: e.getAttribute('aria-label') }));
  // secret subheading + nearby heading
  r.secretHead = leaf(/THE SECRET TO A MORE DEFINED/i).map(st).slice(0, 2);
  // dual price visible spans
  const dp = leaf(/€199 Only/).map(st);
  r.dualPrice = dp;
  // claim btn after faq — context: what's around y? give parent bg
  const c8 = Array.from(document.querySelectorAll('a')).filter(e => /claim my spot now/i.test(e.textContent));
  r.claimBtns = c8.map(e => { const s = getComputedStyle(e); const bx = e.getBoundingClientRect(); return { y: Math.round(bx.top + scrollY), x: Math.round(bx.left), w: Math.round(bx.width), h: Math.round(bx.height), bg: s.backgroundColor, br: s.borderRadius, color: s.color, size: s.fontSize, fam: s.fontFamily.split(',')[0].slice(0,30), text: e.textContent.trim() };});
  // hero subhead check: any WIDE-font line between title and description?
  const ht = leaf(/cellulift & contour protocol/i).map(st);
  r.heroTitle = ht;
  const hd = leaf(/Our cellulite protocol combines three VelaShape/i).map(st).slice(0,2);
  r.heroDesc = hd;
  return r;
});
console.log(JSON.stringify(out, null, 1));
// crops: FAQ heading row, claim-after-faq, evidence eyebrow, secret subheading, dual price
const crops = [
  ['shots/cmp-ac-live-faqrow.png', 6850, 500],
  ['shots/cmp-ac-live-postfaq.png', 8050, 420],
  ['shots/cmp-ac-live-secretsub.png', 1580, 320],
  ['shots/cmp-ac-live-dualprice.png', 5600, 420],
];
for (const [out2, top, h] of crops) {
  await pg.screenshot({ path: out2, clip: { x: 0, y: top, width: 1440, height: h } });
  console.log('OK ' + out2);
}
await b.close();
