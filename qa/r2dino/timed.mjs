import {open,shot,SPEECH_MOCK} from './lib.mjs';import {placed} from './setup.mjs';
const p=await open('dino-star-patrol.html','ipad',{init:SPEECH_MOCK}); // mock without onboundary -> timed fallback
await placed(p);await p.evaluate(()=>{goHome();startStation('rex')});await p.waitForTimeout(300);await p.click('[data-act="rex-go"]');
const seen=new Set();for(let i=0;i<30;i++){await p.waitForTimeout(100);const k=await p.evaluate(()=>[...document.querySelectorAll('.rw')].findIndex(b=>b.classList.contains('on')));if(k>=0)seen.add(k)}
console.log('timed fallback highlighted words',[...seen].sort().join(','),'of',await p.evaluate(()=>REX.sents[0].tok.length));
await shot(p,'r2-ipad-rex-timed-fallback',false);
// voice off: still highlights
await p.evaluate(()=>{S.voice=false});await p.click('[data-act="rex-tome"]');await p.waitForTimeout(500);console.log('voice off highlight',await p.evaluate(()=>document.querySelectorAll('.rw.on').length));
console.log('errs',p.errs);await p.b.close();
