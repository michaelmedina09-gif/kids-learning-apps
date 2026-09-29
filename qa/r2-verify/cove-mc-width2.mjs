// All MC question types (every skill/level) at 390 and 320 wide: no overflow, no clipped choice text; screenshot a long spelling set
import pw from '/opt/node-tools/node_modules/playwright/index.js';const {chromium}=pw;import {URL,DATE_MOCK,SPEECH_MOCK,DIR} from './lib.mjs';
const b=await chromium.launch();
for(const w of [390,360,320,820]){const ctx=await b.newContext({viewport:{width:w,height:844},hasTouch:true,isMobile:w<500});await ctx.addInitScript(DATE_MOCK);await ctx.addInitScript(SPEECH_MOCK);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL.cove);await p.waitForTimeout(500);
 const r=await p.evaluate(()=>{S=newState('Mia');S.placement={math:true,spell:true,write:true,at:Date.now()};S.current='fox';save();const out=[];let n=0;
  for(const sk of Object.keys(SK))for(let lv=1;lv<=6;lv++)for(let k=0;k<12;k++){let q;try{q=mk(sk,lv)}catch(e){try{q=bankQ(sk,lv)}catch(e2){break}}if(!q||q.type!=='mc')continue;n++;
   RUN={mode:'practice',station:'spell',title:'Spelling Springs',results:[],used:new Set(),earned:0,ups:[],lastT:Date.now(),planner:{total:8,i:0,pos(){return 0},next(){return q},result(){}}};RUN.q=q;RUN.tries=0;RUN.locked=false;renderQ();
   const ov=document.documentElement.scrollWidth-document.documentElement.clientWidth;const clip=[...document.querySelectorAll('.choice')].filter(b=>b.scrollWidth>b.clientWidth+1).map(b=>b.innerText);
   const small=[...document.querySelectorAll('.choice')].filter(b=>{const r=b.getBoundingClientRect();return r.height<44||r.width<44}).length;
   if(ov>0||clip.length||small)out.push({sk,lv,ov,clip,small})}
  return{n,bad:out.length,sample:out.slice(0,5)}});
 console.log(w,JSON.stringify(r),errs);
 if(w===390){await p.evaluate(()=>{const q={type:'mc',prompt:'Which word is spelled correctly?',sent:'We will go <b>____</b>.',choices:[{h:'tommorrow',ok:false},{h:'tomorrow',ok:true},{h:'tomoorrow',ok:false},{h:'tomrorow',ok:false}],answer:'tomorrow',skill:'spell'};RUN.q=Object.assign(mk('spell',2),{choices:q.choices});renderQ()});await p.screenshot({path:DIR+'shots/r3-cove-iphone-spell-mc.png'})}
 await ctx.close()}
await b.close();
