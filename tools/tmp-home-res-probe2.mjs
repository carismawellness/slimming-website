import puppeteer from 'puppeteer-core';
const EDGE='C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b=await puppeteer.launch({executablePath:EDGE,headless:'new',args:['--no-sandbox','--hide-scrollbars','--window-size=1440,1000']});
const p=await b.newPage();
await p.setViewport({width:1440,height:1000});
await p.goto('https://www.carismaslimming.com/',{waitUntil:'networkidle2',timeout:90000}).catch(()=>{});
await new Promise(r=>setTimeout(r,4000));
const out=await p.evaluate(()=>{
  const leaf=[...document.querySelectorAll('*')].filter(e=>e.children.length===0);
  const el=leaf.find(e=>/results-driven/i.test(e.textContent||''));
  if(!el) return 'not found';
  const hr=el.getBoundingClientRect();
  const secTop=hr.top+window.scrollY;
  // all elements with gradient or bg color near this y range
  const hits=[];
  for(const e of document.querySelectorAll('*')){
    const r=e.getBoundingClientRect();
    const y=r.top+window.scrollY;
    if(y<secTop-200||y>secTop+800) continue;
    const cs=getComputedStyle(e);
    const hasGrad=cs.backgroundImage&&cs.backgroundImage.includes('gradient');
    const hasBg=cs.backgroundColor&&cs.backgroundColor!=='rgba(0, 0, 0, 0)';
    if((hasGrad||hasBg)&&r.width>300){
      hits.push({tag:e.tagName,id:e.id,w:Math.round(r.width),h:Math.round(r.height),x:Math.round(r.left),yAbs:Math.round(y),grad:cs.backgroundImage.slice(0,220),bgc:cs.backgroundColor,radius:cs.borderRadius});
    }
  }
  // image wrapper chain
  const sec=el.closest('section')||document;
  const img=[...document.querySelectorAll('img')].find(i=>/Batch2-018/.test(i.src));
  const ic=[];
  let n=img;
  for(let i=0;i<5&&n;i++){const cs=getComputedStyle(n);const r=n.getBoundingClientRect();ic.push({tag:n.tagName,w:Math.round(r.width),h:Math.round(r.height),x:Math.round(r.left),y:Math.round(r.top+window.scrollY),radius:cs.borderRadius,ov:cs.overflow});n=n.parentElement;}
  // heading positions
  const h2=leaf.find(e=>/up to 1kg a week/i.test(e.textContent||''));
  const h2r=h2?h2.getBoundingClientRect():null;
  return {headingY:Math.round(secTop), h2:{x:Math.round(h2r.left),y:Math.round(h2r.top+window.scrollY),w:Math.round(h2r.width)}, hits, imgChain:ic};
});
console.log(JSON.stringify(out,null,1));
await b.close();
