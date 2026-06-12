import puppeteer from 'puppeteer-core';
const EDGE='C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b=await puppeteer.launch({executablePath:EDGE,headless:'new',args:['--no-sandbox','--hide-scrollbars','--window-size=1440,1000']});
const p=await b.newPage();
await p.setViewport({width:1440,height:1000});
await p.goto('https://www.carismaslimming.com/',{waitUntil:'networkidle2',timeout:90000}).catch(()=>{});
await new Promise(r=>setTimeout(r,5000));
const out=await p.evaluate(()=>{
  const Y=e=>{const r=e.getBoundingClientRect();return {x:Math.round(r.left),y:Math.round(r.top+window.scrollY),w:Math.round(r.width),h:Math.round(r.height)}};
  const leaf=[...document.querySelectorAll('*')].filter(e=>e.children.length===0);
  const find=re=>leaf.find(e=>re.test((e.textContent||'').trim()));
  const res={};
  // 1. hero: find big rounded container near top with bg
  const heroHits=[];
  for(const e of document.querySelectorAll('div,section')){
    const r=e.getBoundingClientRect();const y=r.top+window.scrollY;
    if(y>1300||r.width<600) continue;
    const cs=getComputedStyle(e);
    if(cs.borderRadius!=='0px'||cs.backgroundImage.includes('url')||cs.backgroundImage.includes('gradient')){
      heroHits.push({...Y(e),radius:cs.borderRadius,bg:cs.backgroundImage.slice(0,120),bgc:cs.backgroundColor});
    }
  }
  res.heroHits=heroHits.slice(0,8);
  // 2. pillar cards: find card containing 'Tanita body composition'
  const t=find(/Tanita body composition/i);
  if(t){let n=t;const chain=[];for(let i=0;i<10&&n;i++){const cs=getComputedStyle(n);chain.push({tag:n.tagName,...Y(n),radius:cs.borderRadius,grad:cs.backgroundImage.slice(0,160),bgc:cs.backgroundColor,pad:cs.padding});n=n.parentElement;}res.pillarChain=chain;}
  // 3. modality card: find 'EXPLORE' button / Weight Loss card
  const wl=leaf.find(e=>/^Weight Loss$/i.test((e.textContent||'').trim()));
  if(wl){let n=wl;const chain=[];for(let i=0;i<8&&n;i++){const cs=getComputedStyle(n);chain.push({tag:n.tagName,...Y(n),radius:cs.borderRadius,bgc:cs.backgroundColor});n=n.parentElement;}res.modalityChain=chain;}
  // 4. carisma difference card
  const cd=find(/the carisma difference/i);
  if(cd){let n=cd;const chain=[];for(let i=0;i<10&&n;i++){const cs=getComputedStyle(n);chain.push({tag:n.tagName,...Y(n),radius:cs.borderRadius,grad:cs.backgroundImage.slice(0,200),bgc:cs.backgroundColor});n=n.parentElement;}res.cdChain=chain;}
  // map iframe?
  res.iframes=[...document.querySelectorAll('iframe')].map(f=>({src:(f.src||'').slice(0,100),...Y(f)}));
  // real people heading
  const rp=find(/real people, real reviews/i);
  if(rp){const cs=getComputedStyle(rp);res.realPeople={...Y(rp),fs:cs.fontSize,col:cs.color,ls:cs.letterSpacing};}
  // 'as seen on' strip
  const seen=find(/as seen on/i);
  if(seen){const cs=getComputedStyle(seen);res.asSeenOn={...Y(seen),fs:cs.fontSize,col:cs.color};}
  // glp1 image + heading
  const glp=find(/medical weight loss in malta \(glp-1\)/i);
  if(glp){const cs=getComputedStyle(glp);res.glpHeading={...Y(glp),fs:cs.fontSize,col:cs.color};}
  return res;
});
console.log(JSON.stringify(out,null,1));
await b.close();
