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
  // all blue CTAs
  res.ctas=[...document.querySelectorAll('a,button')].map(e=>({...Y(e),bgc:getComputedStyle(e).backgroundColor,t:(e.textContent||'').trim().slice(0,40)})).filter(o=>o.bgc==='rgb(99, 145, 171)');
  // results panel texts positions
  const leaf=[...document.querySelectorAll('span,p,h2,h3,li')].filter(e=>e.children.length===0);
  const sel=leaf.find(e=>/We are selective/i.test(e.textContent||''));
  if(sel) res.weAreSelective=Y(sel);
  const agree=leaf.find(e=>/you agree to|agree to:?$/i.test(e.textContent||'')&&Y(e).y>3000&&Y(e).y<3700);
  if(agree){res.agree={...Y(agree),fs:getComputedStyle(agree).fontSize};}
  const att=leaf.find(e=>/Attend all scheduled/i.test(e.textContent||''));
  if(att) res.attend=Y(att);
  // hero left column: heading
  const h1=leaf.find(e=>/doctor-led slimming/i.test(e.textContent||''));
  if(h1){const cs=getComputedStyle(h1.parentElement);res.h1={...Y(h1),fs:getComputedStyle(h1).fontSize};}
  const bookH=leaf.find(e=>/book your free consultation/i.test(e.textContent||''));
  if(bookH){res.book={...Y(bookH),fs:getComputedStyle(bookH).fontSize};}
  // hero video
  const vid=document.querySelector('video');
  if(vid){res.video={...Y(vid),radius:getComputedStyle(vid.parentElement).borderRadius};}
  const vids=[...document.querySelectorAll('video,wix-video')].map(e=>({tag:e.tagName,...Y(e)}));
  res.vids=vids;
  // hero bullets
  const bull=leaf.find(e=>/Medical weight loss assessment with prescription/i.test(e.textContent||''));
  if(bull){res.heroBullet={...Y(bull),fs:getComputedStyle(bull).fontSize,lh:getComputedStyle(bull).lineHeight};}
  // hero paragraph
  const par=leaf.find(e=>/LOSE UP TO 1KG A WEEK/i.test(e.textContent||''));
  if(par){res.heroPar={...Y(par),fs:getComputedStyle(par).fontSize};}
  // map
  const map=document.getElementById('mapContainer_comp-mj8ft40q');
  if(map) res.map=Y(map);
  // parking
  const park=leaf.find(e=>/complimentary on-site parking/i.test(e.textContent||''));
  if(park) res.park=Y(park);
  // commitment headings
  const oc=leaf.find(e=>/^Our Commitment$/i.test((e.textContent||'').trim()));
  if(oc){res.ourCommitment={...Y(oc),fs:getComputedStyle(oc).fontSize};}
  // malta award + google img in hero
  res.heroImgs=[...document.querySelectorAll('img')].map(e=>({...Y(e),src:e.src.split('/').pop().slice(0,40)})).filter(o=>o.y<1400&&o.y>900);
  return res;
});
console.log(JSON.stringify(out,null,1));
await b.close();
