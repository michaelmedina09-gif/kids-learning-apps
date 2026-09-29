import {open,shot,btns,text,answerQ,fbText,SPEECH_MOCK} from './lib.mjs';
const p=await open('critter-cove.html','ipad',{init:SPEECH_MOCK});
await p.click('[data-act="welcome-go"]');await p.waitForTimeout(200);console.log('empty name ->',await p.evaluate(()=>document.querySelector('.toast,#toast')?.innerText));
await p.fill('#nm','Ava');await p.click('[data-act="welcome-go"]');await p.waitForTimeout(300);
await shot(p,'critter-02-choose');console.log(await text(p));console.log(await btns(p));
await p.click('[data-act="pick-rescue"]');await p.waitForTimeout(300);
await shot(p,'critter-03-home');console.log(await text(p));console.log(await btns(p));
console.log(p.errs);await p.b.close();
