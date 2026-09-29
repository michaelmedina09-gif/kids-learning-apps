// Old round-1 save (no review/books/sprintLog; missed words; odd book data) must load and migrate
import {open,shot,SPEECH_MOCK} from './lib.mjs';
const out=[];const ok=(c,m)=>{out.push((c?'PASS ':'FAIL ')+m);if(!c)process.exitCode=1};
const p0=await open('ipad',{init:SPEECH_MOCK});
const old=await p0.evaluate(()=>{const s=newState('Mia');delete s.review;delete s.books;delete s.sprintLog;s.placement={math:true,spell:true,write:true,at:1};s.current='fox';s.missed={because:{miss:2,right:0},zzznotaword:{miss:1,right:0}};s.hearts=120;return s});await p0.b.close();
const old2={...old,books:[{id:'b1',title:'Old Book',log:[{ch:1,date:'2026-09-01',summary:'x'},null,{ch:2}]},{title:'no id'}],review:[{key:'spell|because',skill:'spell',q:{word:'because'},box:9},{bad:1}]};
for(const [name,sv] of [['round1',old],['odd',old2]]){
 const p=await open('ipad',{init:[SPEECH_MOCK,`localStorage.setItem('critter-cove-v1',${JSON.stringify(JSON.stringify(sv))})`]});
 const r=await p.evaluate(()=>({screen,rev:S.review.map(x=>x.key+':'+x.box),books:S.books.map(b=>b.id+':'+b.log.length),sl:Array.isArray(S.sprintLog),chapters:statC('chapters')}));
 ok(r.screen==='home','['+name+'] loads to home');ok(Array.isArray(r.rev)&&r.sl,'['+name+'] fields migrated '+JSON.stringify(r));
 if(name==='round1')ok(r.rev.join()==='spell|because:1','old missed words seeded as Comeback Cards (unknown words skipped)');
 if(name==='odd')ok(r.books.join()==='b1:2'&&r.rev.join()==='spell|because:6','bad book/review rows cleaned');
 await p.click('[data-act="bookclub"]');await p.click('[data-act="bc-back"]');await p.evaluate(()=>renderDash());
 ok(p.errs.length===0,'['+name+'] no errors '+p.errs.join(' | '));await p.b.close()}
console.log(out.join('\n'));
