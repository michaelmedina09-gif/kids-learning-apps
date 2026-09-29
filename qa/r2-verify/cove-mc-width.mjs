// iPhone: spelling multiple-choice with long words fits? new vs published
import {open,shot,log} from './lib.mjs';
for(const which of (process.env.W||'cove,covepub').split(',')){const p=await open(which,'iphone');
 await p.evaluate(()=>{S=newState('Mia');S.placement={math:true,spell:true,write:true,at:Date.now()};S.current='fox';save();renderHome()});
 const r=await p.evaluate(async()=>{const out=[];const words=(typeof SPELL!=='undefined'?SPELL:[]).map(x=>x.w).filter(w=>w.length>=9);
  for(const lv of [1,2,3,4,5]){for(let k=0;k<40;k++){let q;try{q=mk('spell',lv)}catch(e){break}if(!q||q.type!=='mc')continue;
   RUN={mode:'practice',station:'spell',title:'Spelling Springs',results:[],used:new Set(),earned:0,ups:[],lastT:Date.now(),planner:{total:8,i:0,pos(){return 0},next(){return q},result(){}}};RUN.q=q;RUN.tries=0;RUN.locked=false;renderQ();
   const ov=document.documentElement.scrollWidth-document.documentElement.clientWidth;if(ov>0){out.push({lv,ov,ch:q.choices.map(c=>c.h.replace(/<[^>]+>/g,'')).join('|')});}}}
  return {n:out.length,sample:out.slice(0,6)}});
 log(which,JSON.stringify(r));if(r.n){await p.evaluate(()=>scrollTo(0,0));await shot(p,which+'-iphone-spell-mc-overflow',false)}await p.b.close()}
