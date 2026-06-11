import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1400, height: 2200 });
await pg.goto('https://www-carismaslimming-com.filesusr.com/html/87fc13_2ba5327836986264dad25377604fb650.html', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(7000);
// scroll to trigger lazy load
for (let i = 0; i < 5; i++) { await pg.evaluate(() => window.scrollBy(0, 400)); await sleep(600); }
await sleep(3000);
// expand any "read more"
await pg.evaluate(() => {
  document.querySelectorAll('*').forEach((e) => { const t = (e.textContent || '').trim().toLowerCase(); if (e.children.length === 0 && (t === 'read more' || t === 'more')) { try { e.click(); } catch {} } });
});
await sleep(1500);

const out = await pg.evaluate(() => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
  // Elfsight review cards
  const cards = Array.from(document.querySelectorAll('[class*="ReviewsItem"],[class*="review-item"],[class*="eapps-reviews"]'))
    .filter((c) => c.querySelector('[class*="Author"],[class*="author"]') || /ago|week|month|day/i.test(norm(c.textContent)));
  const seen = new Set();
  const reviews = [];
  for (const c of cards) {
    const name = norm((c.querySelector('[class*="AuthorName"],[class*="author-name"],[class*="Name"]') || {}).textContent);
    const date = norm((c.querySelector('[class*="Date"],[class*="date"],[class*="Time"],[class*="time"]') || {}).textContent);
    const text = norm((c.querySelector('[class*="Text"],[class*="text"],[class*="Content"],[class*="content"]') || {}).textContent);
    const stars = c.querySelectorAll('[class*="Stars"] svg,[class*="star"] svg,svg[class*="star"]').length;
    if (!name || !text || text.length < 4) continue;
    const key = name + '|' + text.slice(0, 20);
    if (seen.has(key)) continue; seen.add(key);
    reviews.push({ name, date, text, stars });
  }
  // summary
  const all = norm(document.body.innerText);
  const sum = all.match(/([0-9.]+)\s*([0-9,]+)\s*reviews/i) || all.match(/([0-9.]+).{0,40}?([0-9,]+)\s*reviews/i);
  return { count: reviews.length, reviews, full: all };
});
console.log(out.full);
await b.close();
