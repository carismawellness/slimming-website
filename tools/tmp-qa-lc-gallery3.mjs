import puppeteer from 'puppeteer-core';
const EDGE='C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const b=await puppeteer.launch({executablePath:EDGE,headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--window-size=1440,1000']});
const p=await b.newPage();
await p.setViewport({width:1440,height:1000});
await p.goto('https://www.carismaslimming.com/lipocavitation-malta',{waitUntil:'networkidle2',timeout:60000}).catch(()=>{});
await sleep(3000);
await p.evaluate(()=>{document.querySelectorAll('.kl-private-reset-css-Xuajs1,[class*=klaviyo]').forEach(e=>e.remove());});
await p.evaluate(()=>window.scrollTo(0,1100));
await sleep(4000);
const out=await p.evaluate(()=>{
  const res={};
  res.iframes=[...document.querySelectorAll('iframe')].map(f=>{const r=f.getBoundingClientRect();return{src:(f.src||'').slice(0,120),y:Math.round(r.top+scrollY),h:Math.round(r.height),w:Math.round(r.width)};}).filter(f=>f.h>30);
  res.imgs=[...document.images].map(i=>{const r=i.getBoundingClientRect();return{src:i.currentSrc.slice(0,140),y:Math.round(r.top+scrollY),x:Math.round(r.left),w:Math.round(r.width),h:Math.round(r.height)};}).filter(i=>i.y>1250&&i.y<1800&&i.h>30);
  // sections in order
  res.sections=[...document.querySelectorAll('section')].map(s=>{const r=s.getBoundingClientRect();return{id:s.id,y:Math.round(r.top+scrollY),h:Math.round(r.height),txt:s.textContent.trim().slice(0,70)};}).filter(s=>s.h>20).sort((a,b)=>a.y-b.y).slice(0,12);
  return res;
});
console.log(JSON.stringify(out,null,1));
await b.close();
