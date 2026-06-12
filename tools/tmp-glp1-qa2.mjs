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
const out=await p.evaluate(()=>{
  const cs=e=>getComputedStyle(e);
  const r={};
  // headings up to FAQ
  r.heads=[...document.querySelectorAll('h1,h2,h3,h4,h5')].map(h=>{const b=h.getBoundingClientRect();return{tag:h.tagName,t:h.textContent.trim().replace(/\s+/g,' ').slice(0,70),y:Math.round(b.y+scrollY),x:Math.round(b.x),w:Math.round(b.width),fs:cs(h).fontSize,font:cs(h).fontFamily.slice(0,60),color:cs(h).color,tt:cs(h).textTransform,ls:cs(h).letterSpacing,ta:cs(h).textAlign};}).filter(h=>h.w>0&&h.y<14500);
  // hero disclaimer: small text under reviews
  const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  r.smalltexts=[];
  while(tw.nextNode()){const t=tw.currentNode.textContent.trim();if(t.length>60){const el=tw.currentNode.parentElement;const bb=el.getBoundingClientRect();const y=Math.round(bb.y+scrollY);if(y>750&&y<1100&&bb.width>0){r.smalltexts.push({t:t.slice(0,400),y,fs:cs(el).fontSize,color:cs(el).color});}}}
  // bold spans in hero paragraph
  r.heroBolds=[...document.querySelectorAll('span,strong,b')].filter(e=>{const bb=e.getBoundingClientRect();const y=bb.y+scrollY;return y>280&&y<480&&bb.width>0&&parseInt(cs(e).fontWeight)>=600&&e.textContent.trim().length>2&&e.textContent.trim().length<40;}).map(e=>e.textContent.trim()).slice(0,20);
  // expertise section: find DR ZAID TEEBI text el and the photo img
  r.teebi={};
  const tw2=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  while(tw2.nextNode()){const t=tw2.currentNode.textContent.trim();if(/^dr\.? zaid teebi$/i.test(t)){const el=tw2.currentNode.parentElement;const bb=el.getBoundingClientRect();const y=Math.round(bb.y+scrollY);if(y<9000){r.teebi.title={t,y,x:Math.round(bb.x),fs:cs(el).fontSize,font:cs(el).fontFamily.slice(0,50),color:cs(el).color};break;}}}
  r.midImgs=[...document.querySelectorAll('img')].map(i=>{const bb=i.getBoundingClientRect();return{src:(i.src||'').split('/').pop().split('?')[0].slice(0,70),y:Math.round(bb.y+scrollY),x:Math.round(bb.x),w:Math.round(bb.width),h:Math.round(bb.height)};}).filter(i=>i.y>1500&&i.y<14500&&i.w>30);
  // FAQ questions
  r.faq=[...document.querySelectorAll('h2,h3,h4,span,p,div')].filter(e=>/^\d{1,2}\.\s/.test(e.textContent.trim())&&e.children.length<=2&&e.textContent.trim().length<120).map(e=>{const bb=e.getBoundingClientRect();return{t:e.textContent.trim().slice(0,110),y:Math.round(bb.y+scrollY)};});
  r.faq=r.faq.filter((f,i,a)=>a.findIndex(x=>x.t===f.t)===i).sort((a,b2)=>a.y-b2.y);
  // evidence: find 'WHAT IT DOES' occurrences
  r.evidence=[];
  const tw3=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  while(tw3.nextNode()){const t=tw3.currentNode.textContent.trim();if(/^what it does$/i.test(t)){const el=tw3.currentNode.parentElement;const bb=el.getBoundingClientRect();r.evidence.push({y:Math.round(bb.y+scrollY),x:Math.round(bb.x)});}}
  // read more buttons
  r.readmore=[...document.querySelectorAll('a,button,span,div')].filter(e=>/^read more$/i.test(e.textContent.trim())&&e.children.length===0).map(e=>{const bb=e.getBoundingClientRect();return{y:Math.round(bb.y+scrollY),x:Math.round(bb.x)};});
  // total height
  r.H=document.body.scrollHeight;
  return r;
});
console.log(JSON.stringify(out,null,1));
await b.close();
