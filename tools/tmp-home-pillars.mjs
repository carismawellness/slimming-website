import puppeteer from 'puppeteer-core';
const EDGE='C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b=await puppeteer.launch({executablePath:EDGE,headless:'new',args:['--no-sandbox','--hide-scrollbars','--window-size=1440,1000']});
const p=await b.newPage();
await p.setViewport({width:1440,height:1000});
await p.goto('https://www.carismaslimming.com/',{waitUntil:'networkidle2',timeout:90000}).catch(()=>{});
await new Promise(r=>setTimeout(r,5000));
await p.evaluate(async()=>{await new Promise(res=>{let y=0;const s=()=>{window.scrollBy(0,900);y+=900;if(y<document.body.scrollHeight)setTimeout(s,120);else res();};s();});window.scrollTo(0,0);});
await new Promise(r=>setTimeout(r,2000));
const out=await p.evaluate(()=>{
  const Y=e=>{const r=e.getBoundingClientRect();return {x:Math.round(r.left),y:Math.round(r.top+window.scrollY),w:Math.round(r.width),h:Math.round(r.height)}};
  const res={};
  const spans=[...document.querySelectorAll('span,p,li,h3,h4')];
  const tanita=spans.find(e=>/Tanita body composition/i.test(e.textContent||'')&&Y(e).y>1500&&Y(e).w<600);
  if(!tanita) return 'no tanita';
  let n=tanita;const chain=[];
  for(let i=0;i<12&&n;i++){const cs=getComputedStyle(n);const o={tag:n.tagName,...Y(n),radius:cs.borderRadius,grad:cs.backgroundImage.slice(0,170),bgc:cs.backgroundColor,pad:cs.padding,shadow:cs.boxShadow.slice(0,70)};chain.push(o);n=n.parentElement;if(o.grad.includes('gradient'))break;}
  res.chain=chain;
  // pillar text styles within first card area
  const card=chain[chain.length-1];
  const inCard=e=>{const r=Y(e);return r.x>=card.x-5&&r.x+r.w<=card.x+card.w+5&&r.y>=card.y-5&&r.y<=card.y+card.h+5};
  res.texts=spans.filter(e=>e.children.length===0&&inCard(e)).slice(0,12).map(e=>{const cs=getComputedStyle(e);return {t:(e.textContent||'').trim().slice(0,45),fs:cs.fontSize,fw:cs.fontWeight,col:cs.color,lh:cs.lineHeight,ls:cs.letterSpacing,ff:cs.fontFamily.slice(0,28)}});
  // icons
  res.icons=[...document.querySelectorAll('img')].map(e=>({...Y(e),src:e.src.split('/').pop().slice(0,44)})).filter(o=>o.y>1600&&o.y<2400&&o.w<120);
  // CTA button under pillars
  const cta=spans.find(e=>/get your free body analysis/i.test(e.textContent||'')&&Y(e).y>2000&&Y(e).y<2500);
  if(cta){let m=cta;const c2=[];for(let i=0;i<6&&m;i++){const cs=getComputedStyle(m);c2.push({tag:m.tagName,...Y(m),bgc:cs.backgroundColor,radius:cs.borderRadius,fs:cs.fontSize});m=m.parentElement;}res.cta=c2;}
  // press logos
  res.press=[...document.querySelectorAll('img')].map(e=>({...Y(e),src:e.src.split('/').pop().slice(0,44)})).filter(o=>o.y>1380&&o.y<1560);
  return res;
});
console.log(JSON.stringify(out,null,1));
await b.close();
