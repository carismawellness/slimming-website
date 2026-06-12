import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/terms-conditions', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3500));

const data = await pg.evaluate(() => {
  const out = { feeRegion: [], gap: null };
  // locate elements containing fee-table-ish text
  const all = [...document.querySelectorAll('*')];
  for (const el of all) {
    const t = (el.textContent || '').trim();
    if ((/Notice Period/i.test(t) || /No fee/i.test(t) || /50% of the session fee/i.test(t)) && el.children.length === 0) {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      out.feeRegion.push({ tag: el.tagName, text: t.slice(0, 80), y: Math.round(r.top + scrollY), x: Math.round(r.left), w: Math.round(r.width), size: cs.fontSize, weight: cs.fontWeight, color: cs.color, bg: cs.backgroundColor, border: cs.borderTopWidth + ' ' + cs.borderTopColor });
    }
  }
  // y positions of the paragraphs ending 18.5 and starting 18.6
  const ps = [...document.querySelectorAll('p')].filter((p) => Math.round(p.getBoundingClientRect().width) === 980);
  ps.forEach((p) => {
    const t = p.innerText;
    if (t.includes('18.5.')) { const r = p.getBoundingClientRect(); out.gap = { ...(out.gap || {}), endOf185: Math.round(r.bottom + scrollY) }; }
    if (t.startsWith('18.6.')) { const r = p.getBoundingClientRect(); out.gap = { ...(out.gap || {}), startOf186: Math.round(r.top + scrollY) }; }
  });
  return out;
});
console.log(JSON.stringify(data, null, 1));
await b.close();
