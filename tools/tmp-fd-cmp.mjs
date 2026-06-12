// Probe live /fatdissolving: visibility of evidence section, procedure table,
// FAQ CTA, commitment right heading casing, offer price text.
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/fatdissolving', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3500));
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); window.scrollTo(0, 0); });
await new Promise((r) => setTimeout(r, 1200));

const data = await pg.evaluate(() => {
  const txt = (el) => (el.textContent || '').trim().replace(/\s+/g, ' ');
  const vis = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    let hiddenAncestor = null, node = el, hops = 0;
    while (node && hops < 25) {
      const c = getComputedStyle(node);
      if (c.display === 'none' || c.visibility === 'hidden') { hiddenAncestor = node.tagName + '.' + (node.id || node.className).toString().slice(0, 40); break; }
      node = node.parentElement; hops++;
    }
    return { y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), display: cs.display, visibility: cs.visibility, offsetParentNull: el.offsetParent === null, hiddenAncestor, tt: cs.textTransform, text: txt(el).slice(0, 90) };
  };
  const findLeaf = (needle) => {
    let best = null;
    document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div,td,button,a').forEach((el) => {
      const t = txt(el).toLowerCase();
      if (t.includes(needle.toLowerCase()) && t.length < needle.length + 40 && (!best || el.children.length < best.children.length)) best = el;
    });
    return best;
  };
  const out = {};
  out.clinical = vis(findLeaf('CLINICAL RESEARCH: BASIS OF OUR'));
  out.deoxy = vis(findLeaf('deoxycholic acid for submental'));
  out.procTime = vis(findLeaf('Procedure time'));
  out.anaes = vis(findLeaf('Anaesthetic'));
  out.whyMalta = vis(findLeaf('WHY MALTA CHOOSES'));
  out.offerToday = vis(findLeaf('€199 Only'));
  out.totalLine = vis(findLeaf('Total Value: €650'));
  out.claimMySpot = vis(findLeaf('CLAIM MY SPOT NOW'));
  // buttons between FAQ heading and dr zaid
  const faqEl = findLeaf('Frequently asked questions');
  const drEl = findLeaf('dr. zaid teebi');
  const faqY = faqEl ? faqEl.getBoundingClientRect().top + scrollY : 0;
  const drY = drEl ? drEl.getBoundingClientRect().top + scrollY : 0;
  out.faqY = Math.round(faqY); out.drY = Math.round(drY);
  out.betweenFaqAndDoctors = [];
  document.querySelectorAll('a,button').forEach((el) => {
    const r = el.getBoundingClientRect();
    const y = r.top + scrollY;
    if (y > faqY && y < drY && r.height > 10 && txt(el).length > 2 && txt(el).length < 60) out.betweenFaqAndDoctors.push({ y: Math.round(y), text: txt(el), visible: el.offsetParent !== null });
  });
  return out;
});
console.log(JSON.stringify(data, null, 1));
await b.close();
