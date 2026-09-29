import {open,answerAny,SPEECH_MOCK} from './lib.mjs';import {placed} from './setup.mjs';
for(const f of ['critter-cove.html','dino-star-patrol.html']){const p=await open(f,'ipad',{init:SPEECH_MOCK});await placed(p,{hand:'off'});
 await p.evaluate(()=>{day().done.math=true;save();render()});await p.waitForTimeout(200);const w0=await p.evaluate(()=>wallet());
 await p.click('[data-act="start-station"][data-st="math"]');await p.waitForTimeout(200);console.log(f,'toast',await p.evaluate(()=>document.querySelector('#toast').hidden?'':document.querySelector('#toast').innerText),'station',await p.evaluate(()=>RUN.station));
 let right=0;while(await p.evaluate(()=>screen)==='q'){await answerAny(p,true);right++;await p.waitForTimeout(1700)}
 console.log(' replay earned',await p.evaluate(()=>wallet())-w0,'for',right,'right answers; done keys',await p.evaluate(()=>Object.keys(day().done)));await p.b.close()}
