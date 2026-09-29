import {open} from './lib.mjs';import {placed} from './setup.mjs';
for(const f of ['dino-star-patrol.html'])for(const vp of ['iphone','ipadair']){const p=await open(f,vp);await placed(p);
 const r=await p.evaluate(()=>{const issues={};const add=(k,v)=>{(issues[k]=issues[k]||new Set()).add(v)};let n=0;RUN={used:new Set()};
  const ids=Object.keys(GEN||{}).filter(id=>SK[id]);
  for(const id of ids)for(let L=1;L<=5;L++)for(let k=0;k<40;k++){let q;try{q=mk(id,L)}catch(e){add('gen-throw',id+L+' '+e.message);continue}n++;
   const txt=(q.prompt||'')+' '+(q.sub||'')+' '+(q.explain||'')+' '+(q.choices||[]).map(c=>c.h).join(' | ');
   if(/undefined|NaN|\[object|null/.test(txt))add('bad-text',id+L+': '+txt.replace(/<[^>]+>/g,'').slice(0,140));
   if(/\b1 (?!moves)[a-z]+s\b(?! (?:in|the|is))/.test(txt.replace(/<[^>]+>/g,'')))add('plural',id+': '+txt.replace(/<[^>]+>/g,'').match(/[^.]*\b1 [a-z]+s\b[^.]*/)[0].slice(0,90));
   if(q.type==='mc'&&!/clock/.test(q.prompt)){const ok=q.choices.filter(c=>c.ok).length;if(ok!==1)add('mc-ok-count',id+L+' ok='+ok+' '+q.prompt.replace(/<[^>]+>/g,'').slice(0,60));const hs=q.choices.map(c=>c.h.replace(/<[^>]+>/g,'').trim());if(new Set(hs).size!==hs.length)add('dup-choice',id+L+': '+hs.join(' / ')+' :: '+q.prompt.replace(/<[^>]+>/g,'').slice(0,60))}
   if(q.type==='num'&&(typeof q.answer!=='number'||!isFinite(q.answer)))add('num-ans',id+L+' '+q.answer);
   if(q.type==='num'&&q.answer<0)add('neg',id+L+' '+q.answer);
   if(q.type==='num'&&String(q.answer).replace('.','').length>9)add('too-long-for-keypad',id+L+' '+q.answer);
   if(q.type==='num'&&/\.\d{3,}/.test(String(q.answer))&&!/\.\d{3}$/.test(String(q.answer)))add('many-decimals',id+L+' '+q.answer+' :: '+q.prompt.replace(/<[^>]+>/g,'').slice(0,80));
   RUN.used=new Set();if(k<6){RUN={mode:'practice',station:'x',title:'T',planner:{pos:()=>0,total:1,next:()=>null},results:[],used:new Set(),earned:0,ups:[]};RUN.q=q;RUN.tries=0;RUN.locked=false;A={buf:'',fr:{w:'',n:'',d:''},focus:'n',pick:[]};renderQ();const sw=document.documentElement.scrollWidth;if(sw>innerWidth+1)add('hoverflow',`${id}${L} sw=${sw}: ${q.prompt.replace(/<[^>]+>/g,'').slice(0,50)}`);
    const card=document.querySelector('.qcard');if(card){[...card.querySelectorAll('*')].forEach(e=>{const r=e.getBoundingClientRect(),cr=card.getBoundingClientRect();if(r.width&&(r.right>cr.right+2||r.left<cr.left-2)&&!e.closest('.buddy'))add('outside-card',`${id}${L} ${e.tagName}.${typeof e.className==='string'?e.className:''}`)})}}}
  const o={n};for(const k in issues)o[k]=[...issues[k]].slice(0,12);return o});
 console.log('=====',f,vp,JSON.stringify(r,null,1));await p.b.close()}
