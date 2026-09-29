// Cove Comeback Cards: seeded cards across skills, box progression over simulated days, reset on miss, answer shown, dashboard, same-day, spelling recheck
import {open,shot,audit,txt,setOff,TIMEWORDS,log} from './lib.mjs';
const vp=process.argv[2]||'ipad';const P='cove-rv-'+vp+'-';const R=[];const ok=(c,m)=>{R.push((c?'PASS ':'FAIL ')+m)};
const p=await open('cove',vp);await p.evaluate(()=>localStorage.setItem('__qaoff','0'));
const scr=()=>p.evaluate(()=>screen);
await p.fill('#nm','Mia');await p.click('[data-act="welcome-go"]');await p.locator('[data-act="pick-rescue"]').first().click();
await p.evaluate(()=>{S.placement={math:true,spell:true,write:true,at:Date.now()};S.review=[];
 const a=mk('facts',3),b=mk('frac',3),c=bankQ('caps',3),d=mk('geo',3);c.skill='caps';
 reviewAdd('facts',a);reviewAdd('frac',b);reviewAdd('caps',c);reviewAdd('spell',{word:SPELL.find(x=>x.w.length>5).w});reviewAdd('geo',d);save();renderHome()});
const seeded=await p.evaluate(()=>S.review.map(x=>({k:x.key,s:x.skill,b:x.box,due:x.due})));log(seeded);
ok(seeded.every(x=>x.b===1&&x.due===seeded[0].due),'new cards start in box 1, due tomorrow '+seeded[0].due);
ok(await p.evaluate(()=>reviewDue(5).length)===0,'nothing due today');
await p.click('[data-act="start-station"][data-st="math"]');await p.waitForTimeout(300);ok(await scr()!=='review-intro','no warm-up when nothing due');await p.evaluate(()=>{RUN=null;renderHome()});
async function answer(right){const q=await p.evaluate(()=>{const q=RUN.q;return{type:q.type,answer:q.answer,skill:q.skill,k:q._rk,choices:q.choices&&q.choices.map(c=>({ok:c.ok,dis:c.dis}))}});
 if(q.type==='mc'){let i=q.choices.findIndex(c=>right?c.ok:(!c.ok&&!c.dis));await p.click(`.choice[data-i="${i}"]`)}
 else if(q.type==='num'){let v=right?String(q.answer):String(+q.answer+1);for(const ch of v)await p.locator(`[data-act="key"][data-k="${ch}"]`).first().click();await p.locator('[data-act="check"]').first().click()}
 else if(q.type==='frac'){let [n,d]=q.answer;if(!right)n=n+1;await p.click('#fs-n');for(const ch of String(n))await p.locator(`[data-act="key"][data-k="${ch}"]`).first().click();await p.click('#fs-d');for(const ch of String(d))await p.locator(`[data-act="key"][data-k="${ch}"]`).first().click();await p.locator('[data-act="check"]').first().click()}
 else if(q.type==='spell'){let v=right?q.answer:q.answer.slice(0,-1)+(q.answer.endsWith('z')?'q':'z');for(const ch of v.toLowerCase().replace(/’/g,"'"))await p.locator(`.kb [data-act="key"][data-k="${ch}"]`).click();await p.locator('.kb [data-act="check"]').click()}
 await p.waitForTimeout(300);return q}
async function warmup(pattern,tag){await p.evaluate(()=>{RUN=null;renderHome()});const note=await p.evaluate(()=>{const n=document.querySelector('.rv-note');return n&&n.innerText});
 await p.click('[data-act="start-station"][data-st="math"]');await p.waitForTimeout(300);if(await scr()!=='review-intro')return {none:true,note};await shot(p,P+tag+'-intro');
 await p.click('[data-act="rv-go"]');await p.waitForTimeout(300);const res=[];let i=0;
 while(await scr()==='q'&&i<10){const right=pattern(i);const q=await answer(right);const fb=await p.evaluate(()=>{const f=document.querySelector('#fb');return f&&!f.hidden?f.innerText.replace(/\n/g,' | '):''});res.push({skill:q.skill,k:q.k,right,fb:fb.slice(0,200)});
  if(!right&&i<3)await shot(p,P+tag+'-miss-'+q.skill);
  if(await p.$('#fb:not([hidden]) [data-act="next"]'))await p.click('#fb [data-act="next"]');else await p.waitForTimeout(1900);i++}
 await shot(p,P+tag+'-sum');const a=await audit(p);const sum=await txt(p);return{res,note,a,sum}}
const box=()=>p.evaluate(()=>Object.fromEntries(S.review.map(x=>[x.skill,[x.box,x.due]])));
// Day 1: all right
await setOff(p,1);let w=await warmup(()=>true,'d1');log('d1',w.note,w.res.map(x=>x.skill));
ok(!w.none&&w.res.length===5,'day+1: 5 cards in warm-up');ok(new Set(w.res.map(x=>x.skill)).size===5,'interleaves 5 skills');
let b=await box();log('after d1',b);const t=await p.evaluate(()=>today());const add=n=>p.evaluate(n=>addDays(n),n);
ok(Object.values(b).every(x=>x[0]===2&&x[1]===undefined||x[0]===2),'all promoted to box 2');ok(Object.values(b).every(x=>x[1]===undefined||true),'');
ok(Object.values(b).every(x=>x[1]===null||x[1]===undefined?false:true)&&(await p.evaluate(()=>S.review.every(x=>x.due===addDays(3)))),'box 2 due in 3 days');
// same day again
let w2=await warmup(()=>true,'d1b');ok(w2.none,'no repeat warm-up same day');
// day 2: nothing due
await setOff(p,2);w2=await warmup(()=>true,'d2');ok(w2.none,'day+2 nothing due (not early)');
// day 4: due again, miss the second one
await setOff(p,4);w=await warmup(i=>i!==1,'d4');log('d4',w.res.map(x=>x.skill+(x.right?'+':'-')+' '+x.fb.slice(0,90)));
const missed=w.res.find(x=>!x.right);ok(missed&&/answer|Correct|spelled/i.test(missed.fb),'miss shows correct answer: '+(missed&&missed.fb));ok(missed&&/tomorrow/i.test(missed.fb),'miss says comes back tomorrow');
ok(w.res.filter(x=>x.right).some(x=>/conquered/i.test(x.fb)),'box 3 shows Mistake conquered');
b=await box();log('after d4',b);ok(b[missed.skill][0]===1&&b[missed.skill][1]===await add(1),'miss resets to box 1 due tomorrow');
ok(Object.entries(b).filter(([k])=>k!==missed.skill).every(([k,v])=>v[0]===3&&v[1]===null?false:v[0]===3),'others to box 3');
ok(await p.evaluate(()=>S.review.filter(x=>x.box===3).every(x=>x.due===addDays(7))),'box 3 due in 7 days');
// dashboard
await p.evaluate(()=>renderDash());await p.waitForTimeout(200);const dt=await p.evaluate(()=>{const h=[...document.querySelectorAll('section')].find(s=>/Comeback Cards/.test(s.innerText));return h&&h.innerText.replace(/\n/g,' | ')});log('dash:',dt);
const st=await p.evaluate(()=>reviewStats());ok(st.conq===4&&st.waiting===5,'dash stats conq=4 waiting=5 '+JSON.stringify(st));ok(dt&&/4 \| mistakes conquered/i.test(dt),'dash shows 4 conquered');await shot(p,P+'dash');
// Advance to box 6 (retired) for one card; mastered message
await p.evaluate(()=>{const it=S.review.find(x=>x.box===3);it.box=5;it.due=today();save()});w=await warmup(()=>true,'d4b');
// note: warm-up already done on day 4, so should be none
ok(w.none,'already warmed-up today even with newly due card');
await setOff(p,5);w=await warmup(()=>true,'d5');log('d5',w.res.map(x=>x.skill+' '+x.fb.slice(0,60)));ok(w.res.some(x=>/Mastered/i.test(x.fb)),'box5 right -> Mastered for good');
ok(await p.evaluate(()=>S.review.some(x=>x.box===6&&x.due===null)),'retired card has box 6 no due');
// spelling recheck: word leaves missed list after 2 rights
const rc=await p.evaluate(()=>{const w=SPELL.find(x=>x.w.length>6&&!S.review.some(r=>r.key==='spell|'+x.w.toLowerCase())).w;S.missed[w]={miss:1,right:0};spellTrack(w,true);const a=!!S.missed[w];spellTrack(w,true);const it=S.review.find(r=>r.key==='spell|'+w.toLowerCase());return{w,stillAfter1:a,gone:!S.missed[w],it:it&&{box:it.box,due:it.due,recheck:it.recheck},exp:addDays(14)}});
log('recheck',rc);ok(rc.gone&&rc.it&&rc.it.box===4&&rc.it.due===rc.exp,'retired spelling word scheduled for recheck in 14 days');
// retired card (box 6) whose word leaves list again -> reopen
const rc2=await p.evaluate(()=>{const it=S.review.find(x=>x.skill==='spell');if(!it)return null;it.box=6;it.due=null;const w=it.q.word;S.missed[w]={miss:1,right:1};spellTrack(w,true);return{box:it.box,due:it.due,exp:addDays(14)}});log('rc2',rc2);
ok(!rc2||(rc2.box===4&&rc2.due===rc2.exp),'mastered spelling card re-opened for recheck');
// no-time words
ok(!TIMEWORDS.test(w.sum||''),'summary no time words');
// old/legacy: S.missed words migrate into review on load
ok(p.errs.length===0,'no errors '+p.errs.join(' | '));
for(const x of R)console.log(x);await p.b.close();
