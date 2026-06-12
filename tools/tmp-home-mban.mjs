import puppeteer from 'puppeteer-core';
const EDGE='C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const b=await puppeteer.launch({executablePath:EDGE,headless:'new',args:['--no-sandbox','--hide-scrollbars']});
const p=await b.newPage();
await p.setViewport({width:390,height:844,isMobile:true,hasTouch:true,deviceScaleFactor:2});
await p.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');
await p.goto('https://www.carismaslimming.com/',{waitUntil:'networkidle2',timeout:90000}).catch(()=>{});
await new Promise(r=>setTimeout(r,4000));
const out=await p.evaluate(()=>{
  const hits=[];
  for(const e of document.querySelectorAll('*')){
    if(e.children.length>0) continue;
    const t=(e.textContent||'').trim();
    if(/COMPREHENSIVE SLIMMING PROGRAM|MEDICALLY QUALIFIED DOCTORS|#1 VOTED SLIMMING/i.test(t)){
      const r=e.getBoundingClientRect();
      const cs=getComputedStyle(e);
      hits.push({t:t.slice(0,60),y:Math.round(r.top+window.scrollY),h:Math.round(r.height),vis:cs.visibility,disp:cs.display,inView:r.width>0&&r.height>0});
    }
  }
  return hits.slice(0,8);
});
console.log(JSON.stringify(out,null,1));
await b.close();
