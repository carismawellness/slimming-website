import puppeteer from 'puppeteer-core';
const EDGE='C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const b=await puppeteer.launch({executablePath:EDGE,headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--window-size=1440,1000']});
const p=await b.newPage();
await p.setViewport({width:1440,height:1000});
await p.goto('https://www.carismaslimming.com/lipocavitation-malta',{waitUntil:'networkidle2',timeout:60000}).catch(()=>{});
await sleep(3000);
for(let y=0;y<4000;y+=700){await p.evaluate(yy=>window.scrollTo(0,yy),y);await sleep(150);}
await sleep(1500);
const out=await p.evaluate(()=>{
  return [...document.images].map(i=>{const r=i.getBoundingClientRect();return{src:i.currentSrc,y:Math.round(r.top+scrollY),x:Math.round(r.left),w:Math.round(r.width),h:Math.round(r.height),alt:i.alt};}).filter(i=>i.y>2500&&i.y<3300);
});
console.log(JSON.stringify(out,null,1));
await b.close();
