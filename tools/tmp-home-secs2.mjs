import puppeteer from 'puppeteer-core';
const EDGE='C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b=await puppeteer.launch({executablePath:EDGE,headless:'new',args:['--no-sandbox','--hide-scrollbars','--window-size=1440,1000']});
const p=await b.newPage();
await p.setViewport({width:1440,height:1000});
await p.goto('https://www.carismaslimming.com/',{waitUntil:'networkidle2',timeout:90000}).catch(()=>{});
await new Promise(r=>setTimeout(r,5000));
// scroll through page to force lazy content
await p.evaluate(async()=>{await new Promise(res=>{let y=0;const s=()=>{window.scrollBy(0,900);y+=900;if(y<document.body.scrollHeight)setTimeout(s,120);else res();};s();});window.scrollTo(0,0);});
await new Promise(r=>setTimeout(r,2000));
const out=await p.evaluate(()=>{
  const Y=e=>{const r=e.getBoundingClientRect();return {x:Math.round(r.left),y:Math.round(r.top+window.scrollY),w:Math.round(r.width),h:Math.round(r.height)}};
  const texts=[...document.querySelectorAll('span,p,h1,h2,h3,h4,h5,h6,li,div')];
  const find=re=>texts.find(e=>re.test((e.textContent||'').trim())&&e.children.length===0);
  const res={};
  // pillar card: locate 'Medical weight loss assessmen' heading then walk up to card with gradient
  const ph=find(/Medical weight loss assessmen/i);
  if(ph){let n=ph;const chain=[];for(let i=0;i<12&&n;i++){const cs=getComputedStyle(n);const o={tag:n.tagName,...Y(n),radius:cs.borderRadius,grad:cs.backgroundImage.slice(0,160),bgc:cs.backgroundColor,pad:cs.padding,shadow:cs.boxShadow.slice(0,80)};chain.push(o);if(o.grad.includes('gradient'))break;n=n.parentElement;}res.pillarChain=chain;}
  // pillar heading styles
  const ph2=find(/4 core pillars/i); if(ph2){const cs=getComputedStyle(ph2);res.pillarsKicker={...Y(ph2),fs:cs.fontSize,ls:cs.letterSpacing,col:cs.color};}
  const ph3=find(/multidisciplinary/i); if(ph3){const cs=getComputedStyle(ph3);res.pillarsH2={...Y(ph3),fs:cs.fontSize,col:cs.color,lh:cs.lineHeight};}
  // modality card: find EXPLORE button inside main content (y>1500)
  const exp=texts.filter(e=>/^EXPLORE$/i.test((e.textContent||'').trim())).map(e=>({el:e,r:e.getBoundingClientRect()})).filter(o=>o.r.top+window.scrollY>1500);
  if(exp.length){const e=exp[0].el;let n=e;const chain=[];for(let i=0;i<10&&n;i++){const cs=getComputedStyle(n);chain.push({tag:n.tagName,...Y(n),radius:cs.borderRadius,bgc:cs.backgroundColor,border:cs.border});n=n.parentElement;}res.exploreChain=chain;}
  // all images in modalities region (between 1600 and 3050)
  res.modImgs=[...document.querySelectorAll('img')].map(i=>({...Y(i),src:i.src.split('/').pop().slice(0,50)})).filter(o=>o.y>1500&&o.y<3100&&o.w>200).slice(0,10);
  // carisma difference: gradient/watermark layers between 4400-5400
  const hits=[];
  for(const e of document.querySelectorAll('div,img,section,wow-image')){
    const r=e.getBoundingClientRect();const y=r.top+window.scrollY;
    if(y<4400||y>5400||r.width<300) continue;
    const cs=getComputedStyle(e);
    const hasGrad=cs.backgroundImage.includes('gradient')||cs.backgroundImage.includes('url');
    const hasBg=cs.backgroundColor!=='rgba(0, 0, 0, 0)';
    if(hasGrad||hasBg||e.tagName==='IMG') hits.push({tag:e.tagName,...Y(e),grad:cs.backgroundImage.slice(0,180),bgc:cs.backgroundColor,radius:cs.borderRadius,src:e.tagName==='IMG'?e.src.split('/').pop().slice(0,40):undefined});
  }
  res.cdLayers=hits.slice(0,14);
  // does live have a map element?
  res.mapEls=[...document.querySelectorAll('[data-testid*="map" i],[id*="map" i],iframe')].map(e=>({tag:e.tagName,id:e.id,src:(e.src||'').slice(0,80),...Y(e)})).slice(0,10);
  return res;
});
console.log(JSON.stringify(out,null,1));
await b.close();
