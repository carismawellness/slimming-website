// Probe live /fatdissolving hero video dims.
import puppeteer from 'puppeteer-core';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto('https://www.carismaslimming.com/fatdissolving', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 4000));
const v = await pg.evaluate(() => Array.from(document.querySelectorAll('video')).map((v2) => { const r = v2.getBoundingClientRect(); const cs = getComputedStyle(v2.parentElement); return { y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), src: (v2.currentSrc || v2.src).split('/').slice(-2).join('/'), parentRadius: cs.borderRadius }; }));
console.log(JSON.stringify(v, null, 1));
await b.close();
