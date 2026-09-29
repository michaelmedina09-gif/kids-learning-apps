import {open,shot,SPEECH_MOCK,overflow} from './lib.mjs';
const p=await open('ipad',{init:SPEECH_MOCK});
await p.fill('#nm','Mia');await p.click('[data-act="welcome-go"]');await p.click('[data-act="pick-rescue"]');
await p.evaluate(()=>{S.placement={math:true,spell:true,write:true,at:Date.now()};save();renderHome()});
console.log(await p.evaluate(()=>document.querySelector('.mission').innerText));
await p.click('[data-act="bookclub"]');console.log(await p.evaluate(()=>document.body.innerText.slice(0,600)));
console.log('overflow',await overflow(p));console.log(p.errs);await p.b.close();
