import {open,shot,btns,text,answerAny,fbText,SPEECH_MOCK} from './lib.mjs';import {placed} from './setup.mjs';
const vp=process.argv[2]||'ipad';
const p=await open('dino-star-patrol.html',vp,{init:SPEECH_MOCK});
await placed(p);await p.evaluate(()=>{S.egg='sky';save();render()});await p.waitForTimeout(200);
const st=()=>p.evaluate(()=>({s:S.stars,e:S.eggStars,done:JSON.stringify(day().done),complete:day().complete,streak:JSON.stringify(S.streak),screen}));
await shot(p,'dino-home-placed-'+vp);console.log(await text(p));console.log(await btns(p));
await p.click('[data-act="start-station"]:has-text("Start")').catch(async()=>{console.log('no start mission btn');await p.click('[data-act="start-station"]')});await p.waitForTimeout(300);
console.log('screen',await p.evaluate(()=>screen));await shot(p,'dino-blast-intro-'+vp,false);console.log(await text(p));
await p.click('[data-act="blast-go"]');await p.waitForTimeout(300);await shot(p,'dino-blast-'+vp,false);
for(let i=0;i<8;i++){const ans=await p.evaluate(()=>RUN.q.fact.ans);await p.click(i===3?`.meteor:not([data-v="${ans}"])`:`.meteor[data-v="${ans}"]`,{force:true});await p.waitForTimeout(i===3?1000:400)}
await p.evaluate(()=>{RUN.end=Date.now()+30});await p.waitForTimeout(1200);console.log('blast',await st());console.log(await text(p));
for(const stn of ['math','read','write']){await p.click('[data-act="start-station"]');await p.waitForTimeout(300);let n=0;
 while(await p.evaluate(()=>screen)==='q'){
  const prompt=await p.evaluate(()=>document.querySelector('.prompt')?.innerText.replace(/\n/g,' '));
  if(n===1){await answerAny(p,false);await p.waitForTimeout(250);const f1=await fbText(p);await answerAny(p,false);await p.waitForTimeout(250);console.log(` ${stn} teach: ${prompt} :: ${f1} // ${await fbText(p)}`);await shot(p,`dino-${stn}-teach-${vp}`,false);const nb=await p.$('#fb [data-act="next"]');if(nb)await nb.click();else console.log('NO NEXT')}
  else{const q=await answerAny(p,true);console.log(` ${stn}#${n} ${q.type}: ${prompt}`);if(n===2)await shot(p,`dino-${stn}-q2-${vp}`,false);await p.waitForTimeout(1700)}
  n++;if(n>30)break}
 console.log(stn,'->',await st());if(await p.evaluate(()=>screen)==='bonus'){await p.click('[data-act="bonus-go"]');await p.waitForTimeout(300);while(await p.evaluate(()=>screen)==='q'){await answerAny(p,true);await p.waitForTimeout(1800)}}
 console.log(await text(p));}
await shot(p,'dino-mission-complete-'+vp);
console.log(p.errs);await p.b.close();
