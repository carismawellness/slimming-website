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
  // ALL imgs full src
  r.imgs=[...document.querySelectorAll('img')].map(i=>{const bb=i.getBoundingClientRect();return{src:i.src,y:Math.round(bb.y+scrollY),x:Math.round(bb.x),w:Math.round(bb.width),h:Math.round(bb.height)};}).filter(i=>i.w>15);
  // h1 span styles
  const h1=document.querySelector('h1');
  r.h1spans=[...h1.querySelectorAll('span')].map(s=>({t:s.textContent.trim().slice(0,40),color:cs(s).color,font:cs(s).fontFamily.slice(0,80),fs:cs(s).fontSize,ls:cs(s).letterSpacing}));
  // hero CTA inner
  const cta=[...document.querySelectorAll('a')].find(a=>/book your medical weight loss consultation/i.test(a.textContent));
  if(cta){const sp=cta.querySelector('span,div');r.heroCta={outer:{bg:cs(cta).backgroundColor,br:cs(cta).borderRadius},inner:sp?{color:cs(sp).color,font:cs(sp).fontFamily.slice(0,60),fs:cs(sp).fontSize,ls:cs(sp).letterSpacing,fw:cs(sp).fontWeight,tt:cs(sp).textTransform,t:sp.textContent.trim().slice(0,60)}:null};}
  // FAQ q span
  const faqH=[...document.querySelectorAll('h3')].find(h=>/^1\.\s*What is medical weight loss/i.test(h.textContent.trim()));
  if(faqH){const sp=faqH.querySelector('span')||faqH;r.faqQ={color:cs(sp).color,tt:cs(sp).textTransform,fs:cs(sp).fontSize,font:cs(sp).fontFamily.slice(0,80),fw:cs(sp).fontWeight};}
  // evidence cards: find h2s
  const evTitles=['glp-1 receptor agonists','food noise','regain prevention','tolerability'];
  r.evCards=[...document.querySelectorAll('h2')].filter(h=>evTitles.some(t=>h.textContent.toLowerCase().includes(t))).map(h=>{
    const sp=h.querySelector('span')||h;
    // walk up to card container: ancestor with background
    let card=h.parentElement,depth=0;
    while(card&&depth<8){const bg=cs(card).backgroundColor;const bi=cs(card).backgroundImage;if((bg&&bg!=='rgba(0, 0, 0, 0)')||bi!=='none')break;card=card.parentElement;depth++;}
    const cb=card?card.getBoundingClientRect():null;
    return{title:h.textContent.trim().slice(0,60),spColor:cs(sp).color,spFont:cs(sp).fontFamily.slice(0,60),spFs:cs(sp).fontSize,
      cardBg:card?cs(card).backgroundColor:null,cardBgImg:card?cs(card).backgroundImage.slice(0,120):null,cardBr:card?cs(card).borderRadius:null,
      cardRect:cb?{x:Math.round(cb.x),y:Math.round(cb.y+scrollY),w:Math.round(cb.width),h:Math.round(cb.height)}:null,
      text:card?card.innerText.replace(/\n+/g,' | ').slice(0,1400):null};
  });
  // step1 panel: find 'Your medical weight loss' h3
  const s1=[...document.querySelectorAll('h3')].find(h=>/Your medical weight loss/i.test(h.textContent));
  if(s1){let c=s1.parentElement,d=0;while(c&&d<10){const st=cs(c);if(st.borderTopWidth!=='0px'||st.backgroundColor!=='rgba(0, 0, 0, 0)')break;c=c.parentElement;d++;}
    const cb=c?c.getBoundingClientRect():null;
    r.step1Card=c?{border:cs(c).border,bg:cs(c).backgroundColor,br:cs(c).borderRadius,rect:{x:Math.round(cb.x),y:Math.round(cb.y+scrollY),w:Math.round(cb.width),h:Math.round(cb.height)},text:c.innerText.replace(/\n+/g,' | ').slice(0,1500)}:null;}
  // suitable for col (how it works)
  const sf=[...document.querySelectorAll('h3')].find(h=>h.textContent.trim()==='SUITABLE FOR');
  if(sf){let c=sf.parentElement;for(let i=0;i<4&&c;i++){if(c.innerText.length>200)break;c=c.parentElement;}
    r.step1Suitable=c?c.innerText.replace(/\n+/g,' | ').slice(0,1200):null;}
  // tabs
  r.tabs=[...document.querySelectorAll('div,span,button,li')].filter(e=>/^step \d$/i.test(e.textContent.trim())&&e.children.length<=1).slice(0,12).map(e=>{const bb=e.getBoundingClientRect();return{t:e.textContent.trim(),x:Math.round(bb.x),y:Math.round(bb.y+scrollY),color:cs(e).color,fs:cs(e).fontSize,font:cs(e).fontFamily.slice(0,40)};});
  // science video wrapper border
  const yt=[...document.querySelectorAll('iframe')].find(f=>/youtube/.test(f.src));
  if(yt){let c=yt.parentElement;let found=null;for(let i=0;i<6&&c;i++){if(cs(c).borderTopWidth!=='0px'){found=c;break;}c=c.parentElement;}
    r.ytBorder=found?{border:cs(found).border,br:cs(found).borderRadius}:null;
    const bb=yt.getBoundingClientRect();r.ytRect={x:Math.round(bb.x),y:Math.round(bb.y+scrollY),w:Math.round(bb.width),h:Math.round(bb.height)};}
  // results iframe rect
  const ri=[...document.querySelectorAll('iframe')].find(f=>/filesusr/.test(f.src));
  if(ri){const bb=ri.getBoundingClientRect();r.resultsRect={x:Math.round(bb.x),y:Math.round(bb.y+scrollY),w:Math.round(bb.width),h:Math.round(bb.height)};}
  // press logos row: imgs y 3260-3330
  // promise box
  const pb=[...document.querySelectorAll('h3')].find(h=>/Only weight loss clinic/i.test(h.textContent));
  if(pb){const sp=pb.querySelector('span')||pb;let c=pb.parentElement,d=0;while(c&&d<8){if(cs(c).backgroundImage!=='none'||cs(c).backgroundColor!=='rgba(0, 0, 0, 0)')break;c=c.parentElement;d++;}
    const cb=c?c.getBoundingClientRect():null;
    r.promiseBox={spColor:cs(sp).color,spFont:cs(sp).fontFamily.slice(0,60),spFs:cs(sp).fontSize,spLs:cs(sp).letterSpacing,boxBg:c?cs(c).backgroundColor:null,boxBgImg:c?cs(c).backgroundImage.slice(0,160):null,boxBr:c?cs(c).borderRadius:null,rect:cb?{x:Math.round(cb.x),y:Math.round(cb.y+scrollY),w:Math.round(cb.width),h:Math.round(cb.height)}:null};}
  // teebi quote
  const q=[...document.querySelectorAll('p,span,h4,h5')].find(e=>/guesswork/i.test(e.textContent)&&e.textContent.length<260);
  if(q){const sp=q.querySelector('span')||q;r.quote={t:q.textContent.trim().slice(0,200),font:cs(sp).fontFamily.slice(0,80),fs:cs(sp).fontSize,color:cs(sp).color,fst:cs(sp).fontStyle};}
  return r;
});
console.log(JSON.stringify(out,null,1));
await b.close();
