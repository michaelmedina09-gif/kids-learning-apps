// Fact Sprint with no visible countdown: calm path + "beat your own score"
import {open,shot,SPEECH_MOCK,overflow} from './lib.mjs';import {setup} from './common.mjs';
const vp=process.argv[2]||'ipad';const P='sprint-'+vp+'-';const out=[];const ok=(c,m)=>{out.push((c?'PASS ':'FAIL ')+m);if(!c)process.exitCode=1};
const p=await open(vp,{init:SPEECH_MOCK});await setup(p);await p.evaluate(()=>{S.best.sprint=6;save();renderHome()});
await p.click('[data-act="start-station"][data-st="sprint"]');await shot(p,P+'01-intro');
const intro=await p.evaluate(()=>document.body.innerText);ok(!/second|timer|clock|hurry|fast as/i.test(intro),'no time-pressure words on intro');ok(/beat your own score/i.test(intro),'beat your own score wording');
await p.click('[data-act="sprint-go"]');
for(let i=0;i<8;i++){const a=await p.evaluate(()=>String(RUN.q.answer));const v=i===3?String(+a+1):a;for(const ch of v)await p.click(`[data-act="key"][data-k="${ch}"]`);await p.waitForTimeout(i===3?1000:260)}
await shot(p,P+'02-play');
const play=await p.evaluate(()=>({timer:!!document.querySelector('.timer,#tbar'),txt:document.querySelector('.qcard').innerText,on:document.querySelectorAll('#sppath i.on').length,best:!!document.querySelector('#sppath i.best'),rv:S.review.some(x=>x.skill==='facts')}));
ok(!play.timer,'no countdown bar');ok(!/\d+\s*s\b|sec|0:\d\d/i.test(play.txt),'no clock text: '+play.txt.replace(/\n/g,' | '));ok(play.on===7&&play.best,'path lights 7 stones, star marks best');ok(play.rv,'sprint miss became a Comeback Card');
await p.evaluate(()=>{RUN.end=Date.now()});await p.waitForTimeout(400);await shot(p,P+'03-summary');
const sum=await p.evaluate(()=>document.body.innerText);ok(/New personal best!/.test(sum)&&/7 right, 1 more than your best before/.test(sum),'gentle compare vs best');ok(!/Time!/.test(sum),'no "Time!" heading');
ok(await p.evaluate(()=>S.sprintLog.length===1&&S.sprintLog[0].score===7),'silent sprint log for parents');
ok(await overflow(p)<=0,'no overflow');ok(p.errs.length===0,'no errors '+p.errs.join(' | '));console.log(out.join('\n'));await p.b.close();
