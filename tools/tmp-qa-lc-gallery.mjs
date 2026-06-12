import puppeteer from 'puppeteer-core';
const EDGE='C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const b=await puppeteer.launch({executablePath:EDGE,headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--window-size=1440,1000']});
const p=await b.newPage();
await p.setViewport({width:1440,height:1000});
await p.goto('https://www.carismaslimming.com/lipocavitation-malta',{waitUntil:'networkidle2',timeout:60000}).catch(()=>{});
await sleep(3000);
await p.evaluate(()=>window.scrollTo(0,1400));
await sleep(3000);
const out=await p.evaluate(()=>{
  const res={};
  // find heading
  const els=[...document.querySelectorAll('h1,h2,h3,h4,p,span')];
  const h=els.find(e=>/SECRET TO A MORE DEFINED/i.test(e.textContent)&&e.children.length<5);
  if(h){const r=h.getBoundingClientRect();res.heading={y:r.top+scrollY,h:r.height};}
  // gallery region: elements between y 1300 and 1750
  const all=[...document.querySelectorAll('*')].filter(e=>{const r=e.getBoundingClientRect();const y=r.top+scrollY;return y>1290&&y<1760&&r.height>50&&r.width>100;});
  res.count=all.length;
  res.items=all.slice(0,40).map(e=>{const r=e.getBoundingClientRect();return {tag:e.tagName,id:e.id?.slice(0,30),cls:(e.className+'').slice(0,60),y:Math.round(r.top+scrollY),x:Math.round(r.left),w:Math.round(r.width),h:Math.round(r.height),txt:e.textContent.trim().slice(0,60)};});
  // images in region
  res.imgs=[...document.images].filter(i=>{const r=i.getBoundingClientRect();const y=r.top+scrollY;return y>1200&&y<1850;}).map(i=>({src:i.currentSrc.slice(0,120),y:Math.round(i.getBoundingClientRect().top+scrollY),w:Math.round(i.width),h:Math.round(i.height)}));
  return res;
});
console.log(JSON.stringify(out,null,1));
await b.close();
