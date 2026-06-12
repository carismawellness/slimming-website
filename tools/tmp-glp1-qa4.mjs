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
  // find the four evidence card containers: ancestors of each card h2 that are siblings
  const h2s=[...document.querySelectorAll('h2')].filter(h=>/(receptor agonists for weight|food noise|regain prevention|tolerability of medically)/i.test(h.textContent));
  r.cards=h2s.map(h=>{
    // climb until the container's innerText starts with the title (i.e., contains only this card)
    let c=h.parentElement;let last=h;
    while(c&&c.innerText.replace(/\s+/g,' ').toLowerCase().split('what it does').length<=2&&!/receptor agonists for weight[\s\S]*food noise[\s\S]*regain/i.test(c.innerText)){last=c;c=c.parentElement;
      if(c&&h2s.filter(x=>c.contains(x)).length>1){break;}}
    const el=last;const bb=el.getBoundingClientRect();
    return {y:Math.round(bb.y+scrollY),x:Math.round(bb.x),w:Math.round(bb.width),h:Math.round(bb.height),bg:cs(el).backgroundColor,bgi:cs(el).backgroundImage.slice(0,100),br:cs(el).borderRadius,text:el.innerText};
  });
  // tag pills: find element containing 'Doctor-prescribed medication'
  const tag=[...document.querySelectorAll('span,div,p')].find(e=>e.textContent.trim()==='Doctor-prescribed medication');
  if(tag){r.tagStyle={bg:cs(tag).backgroundColor,color:cs(tag).color,fs:cs(tag).fontSize,br:cs(tag).borderRadius,border:cs(tag).border,pad:cs(tag).padding,font:cs(tag).fontFamily.slice(0,50)};
    const pe=tag.parentElement;r.tagParentStyle={bg:cs(pe).backgroundColor,br:cs(pe).borderRadius,border:cs(pe).border,pad:cs(pe).padding};}
  // badge 'Moderate-high evidence'
  const badge=[...document.querySelectorAll('span,div,p,h4,h5')].filter(e=>/^(moderate-high|high) evidence$/i.test(e.textContent.trim()));
  r.badges=badge.slice(0,8).map(e=>{const bb=e.getBoundingClientRect();return{t:e.textContent.trim(),x:Math.round(bb.x),y:Math.round(bb.y+scrollY),bg:cs(e).backgroundColor,color:cs(e).color,fs:cs(e).fontSize,br:cs(e).borderRadius,pad:cs(e).padding};});
  // read more style
  const rm=[...document.querySelectorAll('a,button,span,div')].filter(e=>e.textContent.trim()==='Read more'&&e.children.length===0);
  r.readMore=rm.slice(0,2).map(e=>({color:cs(e).color,fs:cs(e).fontSize,td:cs(e).textDecorationLine,font:cs(e).fontFamily.slice(0,40),fst:cs(e).fontStyle}));
  // FAQ q1 deep span check
  const faqH=[...document.querySelectorAll('h3')].find(h=>/^1\.\s*What is medical weight loss/i.test(h.textContent.trim()));
  if(faqH){r.faqDeep=[...faqH.querySelectorAll('*')].map(e=>({tag:e.tagName,tt:cs(e).textTransform,color:cs(e).color,fs:cs(e).fontSize,fw:cs(e).fontWeight}));r.faqOuter={tt:cs(faqH).textTransform,color:cs(faqH).color};}
  // evidence CTA
  const cta=[...document.querySelectorAll('a')].find(a=>/book your medical weight loss consultation/i.test(a.textContent)&&a.getBoundingClientRect().top+scrollY>12000);
  if(cta){const bb=cta.getBoundingClientRect();r.evCta={bg:cs(cta).backgroundColor,br:cs(cta).borderRadius,w:Math.round(bb.width),h:Math.round(bb.height),x:Math.round(bb.x),y:Math.round(bb.y+scrollY)};}
  return r;
});
console.log(JSON.stringify(out,null,1));
await b.close();
