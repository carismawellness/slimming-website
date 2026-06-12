import puppeteer from 'puppeteer-core';
const EDGE='C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b=await puppeteer.launch({executablePath:EDGE,headless:'new',args:['--no-sandbox','--hide-scrollbars','--window-size=1440,1000']});
const p=await b.newPage();
await p.setViewport({width:1440,height:1000});
await p.goto('https://www.carismaslimming.com/',{waitUntil:'networkidle2',timeout:90000}).catch(()=>{});
await new Promise(r=>setTimeout(r,4000));
const out=await p.evaluate(()=>{
  const res={};
  const leaf=[...document.querySelectorAll('*')].filter(e=>e.children.length===0);
  const el=leaf.find(e=>/results-driven/i.test(e.textContent||''));
  if(!el) return 'not found';
  const chain=[];
  let n=el;
  for(let i=0;i<9&&n;i++){
    const cs=getComputedStyle(n);
    const r=n.getBoundingClientRect();
    chain.push({tag:n.tagName,w:Math.round(r.width),h:Math.round(r.height),bgimg:cs.backgroundImage.slice(0,200),bgc:cs.backgroundColor,radius:cs.borderRadius,pad:cs.padding});
    n=n.parentElement;
  }
  res.chain=chain;
  // headings inside the section
  const sec=el.closest('section')||el.parentElement.parentElement.parentElement;
  res.texts=[...sec.querySelectorAll('h1,h2,h3,h4,h5,p,span,li')].slice(0,30).map(e=>{
    if(e.children.length>0&&e.tagName!=='LI') return null;
    const cs=getComputedStyle(e);
    return {tag:e.tagName,t:(e.textContent||'').trim().slice(0,60),fs:cs.fontSize,fw:cs.fontWeight,col:cs.color,ff:cs.fontFamily.split(',')[0],tt:cs.textTransform,lh:cs.lineHeight};
  }).filter(Boolean);
  const img=sec.querySelector('img');
  if(img){const r=img.getBoundingClientRect();const cs=getComputedStyle(img);res.img={w:Math.round(r.width),h:Math.round(r.height),radius:cs.borderRadius,src:img.src.slice(-60)};}
  return res;
});
console.log(JSON.stringify(out,null,1));
await b.close();
