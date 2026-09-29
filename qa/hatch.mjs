import {open,shot,text,btns,SPEECH_MOCK} from './lib.mjs';import {placed} from './setup.mjs';
for(const bad of [false,true]){const p=await open('dino-star-patrol.html','ipad',{init:SPEECH_MOCK});await placed(p);
await p.evaluate((bad)=>{S.eggStars=40;S.stars=40;if(bad)S.hatching='notadino';save();render()},bad);await p.waitForTimeout(4500);
console.log(bad?'BAD':'normal',await p.evaluate(()=>screen),(await text(p)).replace(/\n+/g,' | ').slice(0,300));console.log(await btns(p));await shot(p,'dino-hatch-'+(bad?'bad':'ok'),false);
if(!bad){await p.fill('#cn','Sparky Jr');await p.click('[data-act="hatch-done"]');await p.waitForTimeout(400);console.log('after',await p.evaluate(()=>[screen,JSON.stringify(S.crew),S.eggStars,S.stars]));await shot(p,'dino-after-hatch',false)}
console.log(p.errs);await p.b.close()}
