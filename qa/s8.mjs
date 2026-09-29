import {open,shot,btns,text,answerQ,fbText,SPEECH_MOCK} from './lib.mjs';import {placed} from './setup.mjs';
const vp=process.argv[2]||'ipad';
const p=await open('critter-cove.html',vp,{init:SPEECH_MOCK});
await placed(p,{hand:'off'});
const st=()=>p.evaluate(()=>({h:S.hearts,rh:S.rescueHearts,done:JSON.stringify(day().done),complete:day().complete,streak:JSON.stringify(S.streak),screen}));
console.log('start',await st());
// Sprint via Start mission button
await p.click('[data-act="start-station"]:has-text("Start mission")');await p.waitForTimeout(300);console.log('after start mission screen',await p.evaluate(()=>screen));
await shot(p,'critter-sprint-intro-'+vp,false);
await p.click('[data-act="sprint-go"]');await p.waitForTimeout(200);
// answer 5 right quickly, 1 wrong, and test fast typing race
for(let i=0;i<5;i++){const a=await p.evaluate(()=>String(RUN.q.answer));for(const ch of a)await p.click(`[data-act="key"][data-k="${ch}"]`);await p.waitForTimeout(250)}
// race: type correct answer then immediately a digit
const a=await p.evaluate(()=>String(RUN.q.answer));const before=await p.evaluate(()=>[RUN.score,RUN.n]);
for(const ch of a)await p.click(`[data-act="key"][data-k="${ch}"]`);
await p.evaluate(()=>{document.querySelector('[data-act="key"][data-k="3"]').click()});
await p.waitForTimeout(80);await shot(p,'critter-sprint-race-'+vp,false);
await p.waitForTimeout(1200);console.log('race: before',before,'after',await p.evaluate(()=>[RUN.score,RUN.n,RUN.results.slice(-3)]));
await shot(p,'critter-sprint-'+vp,false);
await p.evaluate(()=>{RUN.end=Date.now()+50});await p.waitForTimeout(400);
console.log('after sprint',await st());console.log(await text(p));
await p.click('[data-act="start-station"]').catch(e=>console.log('no next btn',e.message.slice(0,80)));await p.waitForTimeout(300);
// Math mission: first question wrong twice, second wrong then right, rest right
let n=0;while(await p.evaluate(()=>screen)==='q'){
 if(n===0){await answerQ(p,false);console.log(' try1',await fbText(p));await answerQ(p,false).catch(e=>console.log('second wrong failed',e.message.slice(0,100)));await p.waitForTimeout(150);console.log(' try2',await fbText(p));await shot(p,'critter-math-teach-'+vp,false);await p.click('#fb [data-act="next"]')}
 else if(n===1){await answerQ(p,false);await p.waitForTimeout(100);console.log(' w then',await fbText(p));await answerQ(p,true);await p.waitForTimeout(100);console.log(' r',await fbText(p));await p.waitForTimeout(1200)}
 else{await answerQ(p,true);await p.waitForTimeout(1200)}n++;if(n>30)break}
console.log('math done',await st());await shot(p,'critter-math-end-'+vp);console.log(await text(p));
if(await p.evaluate(()=>screen)==='bonus'){await p.click('[data-act="bonus-go"]');await p.waitForTimeout(200);while(await p.evaluate(()=>screen)==='q'){await answerQ(p,true);await p.waitForTimeout(1600)}}
console.log('after bonus',await st());console.log(await text(p));
await p.click('[data-act="start-station"]');await p.waitForTimeout(300);
n=0;while(await p.evaluate(()=>screen)==='q'){await answerQ(p,n!==2);await p.waitForTimeout(150);if(n===2){await answerQ(p,false);await p.waitForTimeout(150);console.log('spell teach',await fbText(p));await shot(p,'critter-spell-teach-'+vp,false);await p.click('#fb [data-act="next"]')}else await p.waitForTimeout(1200);n++}
if(await p.evaluate(()=>screen)==='bonus'){await p.click('[data-act="bonus-skip"]');await p.waitForTimeout(200)}
console.log('spell done',await st());
await p.click('[data-act="start-station"]');await p.waitForTimeout(300);
while(await p.evaluate(()=>screen)==='q'){await answerQ(p,true);await p.waitForTimeout(1250)}
await p.fill('#qwText','I think the manatee would be best. For example, it is calm. Also it eats plants. That is why I pick it.');await p.dispatchEvent('#qwText','input');
await p.click('[data-act="qw-send"]');await p.waitForTimeout(800);await p.click('[data-act="qw-done"]');await p.waitForTimeout(500);
console.log('write done',await st());await shot(p,'critter-mission-complete-'+vp);console.log(await text(p));
await p.click('[data-act="go-home"]').catch(()=>{});await p.waitForTimeout(300);await shot(p,'critter-home-after-mission-'+vp);
console.log(await text(p));console.log(await btns(p));
// replay a done station
await p.click('[data-act="start-station"][data-st="math"]');await p.waitForTimeout(300);console.log('replay screen',await p.evaluate(()=>[screen,RUN.station,RUN.mode]));
console.log(p.errs);await p.b.close();
