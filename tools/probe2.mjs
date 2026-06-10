import puppeteer from 'puppeteer-core';
const EDGE='C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe';
const s=(ms)=>new Promise(r=>setTimeout(r,ms));
const b=await puppeteer.launch({executablePath:EDGE,headless:'new',args:['--no-sandbox','--disable-gpu']});
try{const p=await b.newPage();await p.setViewport({width:1440,height:1000});
await p.goto('https://www.carismaslimming.com/packages',{waitUntil:'networkidle2',timeout:60000}).catch(()=>{});
await s(2500);await p.evaluate(async()=>{for(let y=0;y<3500;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,120));}});await s(1200);
const imgs=await p.evaluate(()=>Array.from(document.querySelectorAll('img')).map(i=>({src:i.currentSrc||i.src,alt:i.alt||''})).filter(i=>/wixstatic/.test(i.src)&&/(lovin|bay|daily|times|malta today|as seen|press|news)/i.test(i.alt)));
const seen=new Set();for(const i of imgs){const id=(i.src.match(/media\/([A-Za-z0-9_~]+\.[a-z]+)/)||[])[1];if(id&&!seen.has(id)){seen.add(id);console.log(id+'  ||  '+i.alt);}}
}finally{await b.close();}
