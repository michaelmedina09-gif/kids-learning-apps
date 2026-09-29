import {open,shot,SPEECH_MOCK} from './lib.mjs';import {placed} from './setup.mjs';
// critter sprint: answer wrong right as timer ends
{const p=await open('critter-cove.html','ipad',{init:SPEECH_MOCK});await placed(p);await p.evaluate(()=>startSprint());await p.click('[data-act="sprint-go"]');
 const a=await p.evaluate(()=>String(RUN.q.answer));const w=String((+a+1)%10).repeat(a.length);for(const ch of w)await p.click(`[data-act="key"][data-k="${ch}"]`);
 await p.evaluate(()=>{RUN.end=Date.now()+50});await p.waitForTimeout(1500);console.log('critter sprint end-race screen',await p.evaluate(()=>screen),p.errs);await shot(p,'critter-sprint-endrace',false);await p.b.close()}
// dino blast
{const p=await open('dino-star-patrol.html','ipad',{init:SPEECH_MOCK});await placed(p);await p.evaluate(()=>startBlast());await p.waitForTimeout(200);await p.click('[data-act="blast-go"]');await p.waitForTimeout(200);
 const ans=await p.evaluate(()=>RUN.q.fact.ans);await p.click(`.meteor:not([data-v="${ans}"])`,{force:true});await p.evaluate(()=>{RUN.end=Date.now()+50});await p.waitForTimeout(1500);console.log('dino blast end-race screen',await p.evaluate(()=>screen),p.errs);await shot(p,'dino-blast-endrace',false);
 // quit during correct feedback in math station
 await p.evaluate(()=>goHome());await p.waitForTimeout(200);await p.evaluate(()=>startStation('math'));await p.waitForTimeout(200);
 const {answerAny}=await import('./lib.mjs');await answerAny(p,true);await p.click('[data-act="quit"]');await p.waitForTimeout(150);await p.click('#mYes');await p.waitForTimeout(1800);
 console.log('dino after quit during correct-feedback: screen',await p.evaluate(()=>screen),'has qcard',!!await p.$('.qcard'),'modal hidden',await p.evaluate(()=>document.querySelector('#modal').hidden));await shot(p,'dino-quit-race',false);await p.b.close()}
{const p=await open('critter-cove.html','ipad',{init:SPEECH_MOCK});await placed(p);await p.evaluate(()=>startStation('math'));await p.waitForTimeout(200);
 const {answerQ}=await import('./lib.mjs');await answerQ(p,true);await p.click('[data-act="quit"]');await p.waitForTimeout(150);await p.click('#mYes');await p.waitForTimeout(1500);
 console.log('critter after quit during correct-feedback: screen',await p.evaluate(()=>screen),'has qcard',!!await p.$('.qcard'));await shot(p,'critter-quit-race',false);await p.b.close()}
