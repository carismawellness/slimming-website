// Probe the eligibility section button + divider on live GLP-1 page.
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = 'https://www.carismaslimming.com/medical-weight-loss';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await p.evaluate(async () => {
  await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); });
  window.scrollTo(0, 0);
});
await sleep(1500);
const out = await p.evaluate(() => {
  const res = { buttons: [], hr: [], paragraph: '' };
  // buttons near y 4300-4450
  document.querySelectorAll('a, button').forEach((el) => {
    const r = el.getBoundingClientRect();
    const y = Math.round(r.top + window.scrollY);
    if (y < 4250 || y > 4480 || r.width === 0) return;
    const cs = getComputedStyle(el);
    let bg = cs.backgroundColor; let node = el; let d = 0;
    while ((bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') && node.children.length && d < 4) { node = node.children[0]; bg = getComputedStyle(node).backgroundColor; d++; }
    // also inner text span style
    let inner = el;
    el.querySelectorAll('*').forEach((c) => { if (c.textContent.trim() && c.children.length === 0) inner = c; });
    const ics = getComputedStyle(inner);
    res.buttons.push({ text: el.textContent.replace(/\s+/g, ' ').trim(), y, x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), bg, radius: cs.borderRadius, innerFont: ics.fontFamily.split(',')[0], innerSize: ics.fontSize, innerColor: ics.color, innerLs: ics.letterSpacing, innerWeight: ics.fontWeight, innerTt: ics.textTransform });
  });
  // horizontal lines / dividers between y 3850-3960
  document.querySelectorAll('div, hr').forEach((el) => {
    const r = el.getBoundingClientRect();
    const y = Math.round(r.top + window.scrollY);
    if (y < 3850 || y > 3970) return;
    if (r.height > 6 || r.width < 40 || r.width > 400 || r.height === 0) return;
    const cs = getComputedStyle(el);
    const bt = cs.borderTopWidth;
    res.hr.push({ y, x: Math.round(r.left), w: Math.round(r.width), h: r.height, bg: cs.backgroundColor, borderTop: bt + ' ' + cs.borderTopColor });
  });
  // full intro paragraph text
  document.querySelectorAll('p').forEach((el) => {
    if (el.textContent.includes('Ozempic and Mounjaro can be powerful')) res.paragraph = el.textContent.replace(/\s+/g, ' ').trim();
  });
  return res;
});
console.log(JSON.stringify(out, null, 1));
await p.screenshot({ path: 'd:/tmp/glp1-elig-live.png', clip: { x: 280, y: 3820, width: 880, height: 620 } });
await b.close();
