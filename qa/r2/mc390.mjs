// Every spelling word as multiple choice (plus homophones) at 390px: no sideways scroll
import {open,shot,SPEECH_MOCK} from './lib.mjs';import {setup} from './common.mjs';
const p=await open('iphone',{init:SPEECH_MOCK});await setup(p);
const r=await p.evaluate(()=>{const out=[];let n=0;const test=q=>{RUN={mode:'practice',station:'spell',title:'Spelling Splash',results:[],used:new Set(),earned:0,ups:[],lastT:Date.now(),planner:{total:8,pos(){return 0},next(){return q},result(){}}};RUN.q=q;RUN.tries=0;RUN.locked=false;renderQ();n++;const ov=document.documentElement.scrollWidth-document.documentElement.clientWidth;if(ov>0)out.push(ov+':'+q.choices.map(c=>c.h).join('|'));if(q.skill==='spell')document.querySelectorAll('.choice').forEach(b=>{const r=document.createRange();r.selectNodeContents(b);const lines=new Set([...r.getClientRects()].map(x=>Math.round(x.top))).size;if(lines>1)out.push('split-word:'+b.innerText)})};
 for(const e of SPELL)for(let k=0;k<6;k++){const q=g_spell(3,e.w);q.skill='spell';if(q.type!=='mc'){q.type='mc';q.prompt='Which word is spelled correctly?';q.choices=mcChoices(e.w,misspell(e.w))}test(q)}
 for(let k=0;k<60;k++){const q=bankQ('homo',rnd(1,5));q.skill='homo';test(q)}
 const w=[...document.querySelectorAll('.choice')].map(b=>getComputedStyle(b).fontSize);return{n,over:out.length,sample:out.slice(0,5),font:w[0]}});
console.log(JSON.stringify(r));
await p.evaluate(()=>{const e=SPELL.reduce((a,b)=>b.w.length>a.w.length?b:a);const q=g_spell(3,e.w);q.skill='spell';q.type='mc';q.prompt='Which word is spelled correctly?';q.choices=mcChoices(e.w,misspell(e.w));RUN.q=q;renderQ()});await shot(p,'iphone-spell-mc-longest',false);
console.log(p.errs);await p.b.close();
