import {open,setOff,shot} from './lib.mjs';import {dSnd} from './dino-lib.mjs';
const p=await open('dino','ipad');const L=[];
await p.evaluate(()=>{localStorage.setItem('__qaoff','0');S=newState('Leo');for(const k in S.placement)if(k!=='at')S.placement[k]=true;S.placement.at=Date.now();S.egg='sky';
 reviewAdd('sounds',{kind:'elk',w:'ship'});reviewAdd('spell',{kind:'chain',from:'cat',to:'cap'});reviewAdd('sounds',{kind:'elk',w:'crab'});save()});
await setOff(p,1);await p.evaluate(()=>render());console.log('scr',await p.evaluate(()=>screen+' '+JSON.stringify(stations().map(x=>x.id))+' '+JSON.stringify(S.review.map(x=>x.due))));await p.click('[data-act="start-station"][data-st="comeback"]');await p.waitForTimeout(400);await p.click('[data-act="cb-go"]');await p.waitForTimeout(400);
for(let i=0;i<3;i++){const s=await p.evaluate(()=>({scr:screen,kind:RUN&&RUN.q&&RUN.q.kind,snd:SND&&SND.t,phase:SND&&SND.phase}));console.log('before',i,JSON.stringify(s));if(s.scr!=='q')break;
 try{await dSnd(p,false,L)}catch(e){console.log('ERR',e.message.slice(0,200));await shot(p,'probe2-'+i);break}
 console.log(JSON.stringify(await p.evaluate(()=>({scr:screen,fb:document.querySelector('#fb')&&document.querySelector('#fb').innerText,phase:SND&&SND.phase,btns:[...document.querySelectorAll('#fb button')].map(b=>b.dataset.act)}))));
 await shot(p,'probe2-after-'+i);if(await p.$('#fb:not([hidden]) button')){await p.click('#fb button');await p.waitForTimeout(500)}}
console.log(L,p.errs);await p.b.close();
