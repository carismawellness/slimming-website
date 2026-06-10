import puppeteer from 'puppeteer-core';
const EDGE='C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url=process.argv[2], prefix=process.argv[3];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const b=await puppeteer.launch({executablePath:EDGE,headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--window-size=1440,1000']});
const p=await b.newPage();
await p.setViewport({width:1440,height:1000});
await p.goto(url,{waitUntil:'networkidle2',timeout:60000}).catch(()=>{});
await sleep(3500);
await p.evaluate(async()=>{await new Promise(res=>{let y=0;const s=()=>{window.scrollBy(0,900);y+=900;if(y<document.body.scrollHeight)setTimeout(s,150);else res();};s();});window.scrollTo(0,0);});
await sleep(1500);
const H=await p.evaluate(()=>document.body.scrollHeight);
const vh=1000; let i=0;
for(let y=0;y<H;y+=vh){await p.evaluate(yy=>window.scrollTo(0,yy),y);await sleep(400);await p.screenshot({path:`${prefix}_${String(i).padStart(2,'0')}.png`});i++;}
console.log('TOTAL_HEIGHT',H,'BANDS',i);
await b.close();
