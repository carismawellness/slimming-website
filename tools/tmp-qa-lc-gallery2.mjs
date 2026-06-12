import puppeteer from 'puppeteer-core';
const EDGE='C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const b=await puppeteer.launch({executablePath:EDGE,headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--window-size=1440,1000']});
const p=await b.newPage();
await p.setViewport({width:1440,height:1000});
await p.goto('https://www.carismaslimming.com/lipocavitation-malta',{waitUntil:'networkidle2',timeout:60000}).catch(()=>{});
await sleep(3000);
// dismiss popups
await p.evaluate(()=>{document.querySelectorAll('.kl-private-reset-css-Xuajs1,[class*=klaviyo]').forEach(e=>e.remove());});
await p.evaluate(async()=>{await new Promise(res=>{let y=0;const s=()=>{window.scrollBy(0,800);y+=800;if(y<document.body.scrollHeight)setTimeout(s,120);else res();};s();});});
await sleep(2000);
const out=await p.evaluate(()=>{
  const res={};
  const find=(t)=>{const e=[...document.querySelectorAll('p,span,h2,h3,h4,div')].filter(x=>x.children.length===0&&x.textContent.trim().toLowerCase().includes(t.toLowerCase()));return e.map(x=>{const r=x.getBoundingClientRect();return{txt:x.textContent.trim().slice(0,80),y:Math.round(r.top+scrollY),x:Math.round(r.left),w:Math.round(r.width)};});};
  res.maria=find('Maria B');
  res.francesca=find('Francesca M');
  res.stephanie=find('Stephanie A');
  res.readmore=find('Read more').slice(0,8);
  res.budge=find('budge no matter');
  res.secret=find('secret to a more defined');
  res.somefat=find("some fat simply");
  // any swiper/gallery/carousel containers
  res.galleries=[...document.querySelectorAll('[data-hook*=gallery],[class*=pro-gallery],[class*=swiper],[class*=carousel],[class*=slick]')].slice(0,10).map(e=>{const r=e.getBoundingClientRect();return{tag:e.tagName,cls:(e.className+'').slice(0,50),y:Math.round(r.top+scrollY),h:Math.round(r.height),w:Math.round(r.width)};});
  return res;
});
console.log(JSON.stringify(out,null,1));
await b.close();
