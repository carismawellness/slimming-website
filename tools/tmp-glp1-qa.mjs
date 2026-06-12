import puppeteer from 'puppeteer-core';
const EDGE='C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const b=await puppeteer.launch({executablePath:EDGE,headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--window-size=1440,1000']});
const p=await b.newPage();
await p.setViewport({width:1440,height:1000});
await p.goto('https://www.carismaslimming.com/medical-weight-loss',{waitUntil:'networkidle2',timeout:90000}).catch(()=>{});
await sleep(3000);
await p.evaluate(async()=>{await new Promise(res=>{let y=0;const s=()=>{window.scrollBy(0,900);y+=900;if(y<document.body.scrollHeight)setTimeout(s,120);else res();};s();});window.scrollTo(0,0);});
await sleep(2000);

const out = await p.evaluate(()=>{
  const r={};
  const cs=(el)=>getComputedStyle(el);
  // 1. all CTA-like buttons/links with BOOK text
  r.ctas=[...document.querySelectorAll('a,button')].filter(e=>/book your/i.test(e.textContent||'')&&e.getBoundingClientRect===undefined?false:/book your/i.test(e.textContent||'')).map(e=>{
    const b=e.getBoundingClientRect();
    if(b.width===0) return null;
    // find element with actual bg
    let bg=cs(e).backgroundColor, node=e;
    if(bg==='rgba(0, 0, 0, 0)'){const inner=e.querySelector('*');}
    return {text:(e.textContent||'').trim().slice(0,60), bg, color:cs(e).color, br:cs(e).borderRadius, y:Math.round(b.y+scrollY), x:Math.round(b.x), w:Math.round(b.width), h:Math.round(b.height), font:cs(e).fontFamily.split(',')[0], fs:cs(e).fontSize};
  }).filter(Boolean);
  // 2. hero: first section content
  const h1=document.querySelector('h1');
  r.h1={text:h1?.textContent.trim(), fs:h1&&cs(h1).fontSize, color:h1&&cs(h1).color, font:h1&&cs(h1).fontFamily};
  // videos
  r.videos=[...document.querySelectorAll('video')].map(v=>{const b=v.getBoundingClientRect();return{src:(v.currentSrc||v.src||'').slice(0,120),poster:(v.poster||'').slice(0,120),y:Math.round(b.y+scrollY),w:Math.round(b.width),h:Math.round(b.height)};});
  r.iframes=[...document.querySelectorAll('iframe')].map(f=>{const b=f.getBoundingClientRect();return{src:(f.src||'').slice(0,150),y:Math.round(b.y+scrollY),w:Math.round(b.width),h:Math.round(b.height)};}).filter(f=>f.w>50);
  // images in top 1500px
  r.topImgs=[...document.querySelectorAll('img')].map(i=>{const b=i.getBoundingClientRect();return{src:(i.src||'').split('/').pop().slice(0,90),alt:i.alt,y:Math.round(b.y+scrollY),x:Math.round(b.x),w:Math.round(b.width),h:Math.round(b.height),br:cs(i).borderRadius};}).filter(i=>i.y<1600&&i.w>20);
  // hero subhead - find text 'Struggling with constant'
  const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  const found=[];
  while(tw.nextNode()){const t=tw.currentNode.textContent.trim();if(/^struggling with constant/i.test(t)){const el=tw.currentNode.parentElement;const b=el.getBoundingClientRect();found.push({text:t.slice(0,90),tt:cs(el).textTransform,fs:cs(el).fontSize,color:cs(el).color,font:cs(el).fontFamily.split(',')[0],y:Math.round(b.y+scrollY),x:Math.round(b.x),w:Math.round(b.width)});}}
  r.subhead=found;
  // review text
  const tw2=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  r.reviews=[];
  while(tw2.nextNode()){const t=tw2.currentNode.textContent.trim();if(/over\s*\d+\+?\s*reviews/i.test(t)){const el=tw2.currentNode.parentElement;const b=el.getBoundingClientRect();r.reviews.push({t:t.slice(0,60),y:Math.round(b.y+scrollY)});}}
  // disclaimer
  const tw3=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  r.disclaimer=null;
  while(tw3.nextNode()){const t=tw3.currentNode.textContent.trim();if(/eligibility|results vary|individual/i.test(t)&&t.length>80){const el=tw3.currentNode.parentElement;const b=el.getBoundingClientRect();if(b.y+scrollY<2000){r.disclaimer={t:t.slice(0,300),y:Math.round(b.y+scrollY),fs:cs(el).fontSize,color:cs(el).color};break;}}}
  return r;
});
console.log(JSON.stringify(out,null,1));
await b.close();
