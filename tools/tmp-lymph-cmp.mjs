import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/lymphatic-drainage', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await sleep(3500);
await pg.evaluate(async () => { await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, 900); y += 900; if (y < document.body.scrollHeight) setTimeout(s, 120); else res(); }; s(); }); window.scrollTo(0, 0); });
await sleep(2500);
const out = await pg.evaluate(() => {
  const vis = (el) => { const r = el.getBoundingClientRect(); let n = el; while (n && n !== document.body) { const s = getComputedStyle(n); if (s.display === 'none' || s.visibility === 'hidden') return false; n = n.parentElement; } return r.width > 0 && r.height > 0; };
  const findText = (txt) => Array.from(document.querySelectorAll('h1,h2,h3,h4,p,span,div')).filter((e) => e.children.length === 0 && (e.textContent || '').toUpperCase().includes(txt.toUpperCase()));
  const res = {};

  // 1. press/trusted heading text + visibility
  res.trusted = findText('TRUSTED CLINIC FOR').map((e) => ({ text: e.textContent.trim().replace(/\s+/g, ' '), visible: vis(e), y: Math.round(e.getBoundingClientRect().top + scrollY) }));

  // 2. WHEN HUNGER heading styles
  res.hunger = findText('WHEN HUNGER').map((e) => {
    const s = getComputedStyle(e.closest('h1,h2,h3,p,div') || e);
    const r = e.getBoundingClientRect();
    return { tag: (e.closest('h1,h2,h3,p') || e).tagName, text: e.textContent.trim(), visible: vis(e), y: Math.round(r.top + scrollY), fontSize: s.fontSize, fontFamily: s.fontFamily.slice(0, 40), color: s.color, align: s.textAlign };
  });

  // 3. hero videos on page
  res.videos = Array.from(document.querySelectorAll('video')).map((v) => ({ src: (v.currentSrc || v.src || '').split('/').pop(), poster: (v.poster || '').split('/').pop().slice(0, 60), y: Math.round(v.getBoundingClientRect().top + scrollY), w: Math.round(v.getBoundingClientRect().width), visible: vis(v) }));

  // 4. testimonial carousel (Pauline)
  res.pauline = findText('Pauline Azzopardi').map((e) => ({ visible: vis(e), y: Math.round(e.getBoundingClientRect().top + scrollY), x: Math.round(e.getBoundingClientRect().left) }));
  // iframes (wix html embeds)
  res.iframes = Array.from(document.querySelectorAll('iframe')).map((f) => ({ src: (f.src || '').slice(0, 90), y: Math.round(f.getBoundingClientRect().top + scrollY), h: Math.round(f.getBoundingClientRect().height), visible: vis(f) }));

  // 5. "the carisma difference" / "we are not another diet clinic" section presence
  res.dietClinic = findText('not another diet clinic').map((e) => ({ text: e.textContent.trim(), visible: vis(e), y: Math.round(e.getBoundingClientRect().top + scrollY) }));

  // 6. secret heading
  res.secret = findText('THE SECRET TO A MORE').map((e) => ({ visible: vis(e), y: Math.round(e.getBoundingClientRect().top + scrollY), fontSize: getComputedStyle(e).fontSize }));

  // 7. evidence eyebrow
  res.evidence = findText('EVIDENCE BASED').concat(findText('CLINICAL RESEARCH')).map((e) => ({ text: e.textContent.trim().slice(0, 60), visible: vis(e), y: Math.round(e.getBoundingClientRect().top + scrollY) }));

  // 8. 4 core pillars heading
  res.pillars = findText('core pillars').map((e) => ({ text: e.textContent.trim(), visible: vis(e), y: Math.round(e.getBoundingClientRect().top + scrollY) }));
  res.dualSub = findText('dual technology starter pack').map((e) => ({ text: e.textContent.trim(), visible: vis(e), y: Math.round(e.getBoundingClientRect().top + scrollY) }));

  // 9. individual sessions price note
  res.priceNote = findText('individual session').map((e) => ({ text: e.textContent.trim(), visible: vis(e), y: Math.round(e.getBoundingClientRect().top + scrollY) }));

  // 10. map iframe?
  res.maps = Array.from(document.querySelectorAll('iframe')).filter((f) => /maps|google/.test(f.src)).length;

  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
