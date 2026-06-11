import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL = 'https://www.carismaslimming.com/lymphatic-drainage';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3500));
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); });
await new Promise((r) => setTimeout(r, 1500));
const out = await pg.evaluate(() => {
  const all = Array.from(document.querySelectorAll('*'));
  const head = all.find(e => (e.textContent||'').trim().toUpperCase() === 'EVIDENCE BASED APPROACH' && e.children.length===0);
  let root = head;
  for (let i=0;i<10 && root;i++) root = root.parentElement;
  const res = [];
  const scope = root || document;
  const seen = new Set();
  function add(id,r,tag){ const k=id+Math.round(r.top); if(seen.has(k))return; seen.add(k); res.push({id, y:Math.round(r.top+window.scrollY), w:Math.round(r.width), h:Math.round(r.height), tag}); }
  scope.querySelectorAll('*').forEach(e => {
    const bg = getComputedStyle(e).backgroundImage;
    if (bg && bg.includes('wixstatic')) {
      const m = bg.match(/media\/([^\/")]+)/);
      const r = e.getBoundingClientRect();
      if (m && r.width>50 && r.height>50) add(m[1], r, 'bg');
    }
  });
  scope.querySelectorAll('img').forEach(e => {
    const s = e.src||'';
    if (s.includes('wixstatic')) {
      const m = s.match(/media\/([^\/")]+)/);
      const r = e.getBoundingClientRect();
      if (m && r.width>50 && r.height>50) add(m[1], r, 'img');
    }
  });
  res.sort((a,b)=>a.y-b.y);
  return {found: !!head, res};
});
console.log(JSON.stringify(out,null,1));
await b.close();
