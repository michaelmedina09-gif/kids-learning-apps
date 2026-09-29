// Regression: check-up, full mission (math/spell/write) still works; Book Club day skips only the Write It piece
import {open,shot,SPEECH_MOCK,answerQ} from './lib.mjs';
const out=[];const ok=(c,m)=>{out.push((c?'PASS ':'FAIL ')+m);if(!c)process.exitCode=1};
const p=await open('ipad',{init:SPEECH_MOCK});
await p.fill('#nm','Mia');await p.click('[data-act="welcome-go"]');await p.click('[data-act="pick-rescue"]');
// placement: math check-up, answer all, first one wrong
await p.click('[data-act="start-check"][data-area="math"]');let i=0;
while(await p.evaluate(()=>screen==='q')&&i<40){await answerQ(p,i!==0);await p.waitForTimeout(150);if(await p.$('[data-act="next"]'))await p.click('[data-act="next"]');else await p.waitForTimeout(1100);i++}
console.log(await p.evaluate(()=>JSON.stringify({pl:S.placement,rv:S.review.map(x=>x.key+x.q.level),i:'x',scr:screen})));ok(await p.evaluate(()=>S.review.length===1&&S.review[0].box===1&&screen==='bonus'),'check-up miss (grade level) became a card; check-up reaches its bonus offer');
await p.evaluate(()=>{S.placement={math:true,spell:true,write:true,at:1};S.review=[];RUN=null;save();renderHome()});
async function station(st){await p.evaluate(s=>{RUN=null;startStation(s)},st);let n=0;while(await p.evaluate(()=>screen==='q')&&n<30){await answerQ(p,true);await p.waitForTimeout(1200);n++}return p.evaluate(()=>screen)}
ok(await station('math')==='summary','math station completes');
await p.evaluate(()=>{day().book=true;save()});
ok(await station('write')==='summary','writing station on a Book Club day ends after sentence fixes (no Write It)');
await p.evaluate(()=>{delete day().book;delete day().done.write;save()});
ok(await station('write')==='qw','writing station without Book Club still goes to Write It');
ok(p.errs.length===0,'no errors '+p.errs.join(' | '));console.log(out.join('\n'));await p.b.close();
