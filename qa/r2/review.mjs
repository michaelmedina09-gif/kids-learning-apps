// Comeback Cards: seeded due items -> warm-up before the first station -> promote/reset -> practice misses become cards
import {open,shot,SPEECH_MOCK,overflow,answerQ} from './lib.mjs';import {setup} from './common.mjs';
const vp=process.argv[2]||'ipad';const P='rv-'+vp+'-';const out=[];const ok=(c,m)=>{out.push((c?'PASS ':'FAIL ')+m);if(!c)process.exitCode=1};
const p=await open(vp,{init:SPEECH_MOCK});await setup(p);
await p.evaluate(()=>{const y=addDays(-1);S.review=[];
 const q1=mk('facts',3);const q2=bankQ('caps',3);q2.skill='caps';const q3=mk('frac',3);
 reviewAdd('facts',q1);reviewAdd('caps',q2);reviewAdd('spell',{word:'because'});reviewAdd('frac',q3);
 S.review.forEach(x=>{x.due=y;x.box=2});/* one more win = conquered */
 const q4=mk('geo',3);reviewAdd('geo',q4);S.review[4].due=addDays(3);/* not due */
 save();renderHome()});
ok(await p.evaluate(()=>reviewDue(5).length)===4,'4 cards due (1 not due yet)');
ok(await p.evaluate(()=>{const k=reviewDue(5).map(x=>x.skill);return new Set(k).size===4}),'due cards interleave skills');
await shot(p,P+'01-home-note');ok(await p.evaluate(()=>/Comeback Card/.test(document.querySelector('.mission').innerText)),'home shows comeback note');
await p.click('[data-act="start-station"][data-st="math"]');
ok(await p.evaluate(()=>screen)==='review-intro','warm-up opens before first station');
ok(await p.evaluate(()=>document.body.innerText.includes('These are ones that tripped you up before — let’s see if they stick!')),'friendly intro text');
await shot(p,P+'02-intro');ok(await overflow(p)<=0,'intro no overflow');
await p.click('[data-act="rv-go"]');await p.waitForTimeout(300);
const seen=[];let conq=false;
for(let i=0;i<4;i++){const info=await p.evaluate(()=>({k:RUN.q._rk,skill:RUN.q.skill,type:RUN.q.type}));const right=i!==1;seen.push(info.skill+(right?'+':'-'));
 await answerQ(p,right);await p.waitForTimeout(250);const fbt=await p.evaluate(()=>{const f=document.querySelector('#fb');return f&&!f.hidden?f.innerText:''});
 if(/Mistake conquered/.test(fbt))conq=true;
 if(i===0)await shot(p,P+'03-right');
 if(!right){ok(/answer|Correct/i.test(fbt)&&/tomorrow/i.test(fbt),'miss shows answer + explanation + comes back: '+fbt.replace(/\n/g,' | ').slice(0,140));await shot(p,P+'04-miss');await p.click('[data-act="next"]')}
 else await p.waitForTimeout(1800)}
ok(conq,'"Mistake conquered!" when a card reaches box 3');
await p.waitForTimeout(300);ok(await p.evaluate(()=>screen)==='summary','warm-up summary');await shot(p,P+'05-done');
const st=await p.evaluate(()=>S.review.map(x=>({s:x.skill,b:x.box,due:x.due})));
const missSkill=seen[1].slice(0,-1);
ok(st.find(x=>x.s===missSkill).b===1&&st.find(x=>x.s===missSkill).due===await p.evaluate(()=>addDays(1)),'miss resets to box 1, due tomorrow');
ok(st.filter(x=>x.s!==missSkill&&x.s!=='geo').every(x=>x.b>=2),'right answers promote a box');
ok(await p.evaluate(()=>reviewStats().conq>=1&&S.days[today()].review===true),'conquered counted + warm-up done for today');
await p.click('[data-act="rv-next"]');await p.waitForTimeout(200);ok(await p.evaluate(()=>RUN&&RUN.mode==='practice'&&RUN.station==='math'),'continues into Math Mission');
// a first-try miss in practice becomes a card
const n0=await p.evaluate(()=>S.review.length);const q=await answerQ(p,false);await p.waitForTimeout(150);
if(await p.evaluate(()=>!RUN.locked))await answerQ(p,false);await p.waitForTimeout(150);
ok(await p.evaluate(n=>S.review.length===n+1&&S.review[S.review.length-1].box===1,n0),'practice miss added to Comeback Cards');
// second station today: no warm-up again
await p.evaluate(()=>{RUN=null;renderHome()});await p.click('[data-act="start-station"][data-st="spell"]');ok(await p.evaluate(()=>RUN&&RUN.mode==='practice'),'no second warm-up the same day');
// cap + byte budget
const cap=await p.evaluate(()=>{for(let i=0;i<400;i++){const q=mk(pick(['geo','frac','word','ops']),rnd(1,5));reviewAdd(q.skill,q)}return{n:S.review.length,bytes:JSON.stringify(S.review).length}});
ok(cap.n<=300&&cap.bytes<=110000,'review list capped: '+JSON.stringify(cap));
await p.evaluate(()=>renderDash());await shot(p,P+'06-dash');ok(await p.evaluate(()=>/Mistakes conquered/i.test(document.body.innerText)),'dashboard shows mistakes conquered');
ok(p.errs.length===0,'no errors '+p.errs.join(' | '));console.log(seen.join(' '));console.log(out.join('\n'));await p.b.close();
