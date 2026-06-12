import puppeteer from 'puppeteer-core';
import fs from 'fs';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/terms-conditions', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3500));

const data = await pg.evaluate(() => {
  const out = { spans: [], fontFaces: [], text: '' };
  // the legal block paragraphs (width ~980, x ~239)
  const legals = [...document.querySelectorAll('p')].filter((p) => Math.round(p.getBoundingClientRect().width) === 980);
  out.legalParaCount = legals.length;
  out.text = legals.map((p) => p.innerText).join('\n=====PARA BREAK=====\n');
  // span-level style variety inside legal block
  const seen = new Set();
  legals.forEach((p) => p.querySelectorAll('span').forEach((s) => {
    const cs = getComputedStyle(s);
    const key = [cs.color, cs.fontWeight, cs.fontSize, cs.fontStyle, cs.textDecorationLine].join('|');
    if (!seen.has(key) && (s.textContent || '').trim().length > 1) { seen.add(key); out.spans.push({ key, sample: s.textContent.trim().slice(0, 70) }); }
  }));
  // font-face names
  for (const sheet of document.styleSheets) {
    try { for (const rule of sheet.cssRules) { if (rule instanceof CSSFontFaceRule) { const fam = rule.style.getPropertyValue('font-family'); if (/wfont_106523_1976|wfont_5aef8b_8403/.test(fam)) out.fontFaces.push({ fam, src: rule.style.getPropertyValue('src').slice(0, 200) }); } } } catch (e) {}
  }
  return out;
});
fs.writeFileSync('d:/WC_AES/carisma-slimming/shots/terms-live-text.txt', data.text, 'utf8');
delete data.text;
console.log(JSON.stringify(data, null, 1));
await b.close();
