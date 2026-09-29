import {open,SPEECH_MOCK,answerQ,fbText} from './lib.mjs';import {placed} from './setup.mjs';
for(const f of ['critter-cove.html','dino-star-patrol.html']){const p=await open(f,'ipad',{init:SPEECH_MOCK});
 console.log(f,'nm attrs',await p.evaluate(()=>{const i=document.querySelector('#nm');return [...i.attributes].map(a=>a.name+'='+a.value).join(' ')}));
 await p.fill('#nm','Kid');await p.press('#nm','Enter');await p.waitForTimeout(300);console.log(' Enter in name ->',await p.evaluate(()=>screen));
 await placed(p);
 if(f.startsWith('critter')){await p.evaluate(()=>{S.placement.math=false;save();startCheck('math')});await p.waitForTimeout(200);await p.click('[data-act="idk"]');await p.waitForTimeout(200);console.log(' idk ->',await fbText(p),'missed',await p.evaluate(()=>RUN.missed.length));
  // hardware keyboard
  await p.click('#fb [data-act="next"]');await p.waitForTimeout(200);const q=await p.evaluate(()=>({t:RUN.q.type,a:RUN.q.answer}));if(q.t==='num'){await p.keyboard.type(String(q.a));await p.keyboard.press('Enter');await p.waitForTimeout(200);console.log(' hw keyboard num ->',await fbText(p))}
  await p.evaluate(()=>{RUN=null;goHome();ACT.dress()});}
 const cn=await p.evaluate(()=>{render();return 1});
 // rescue/hatch name field
 await p.evaluate(()=>{if(S.rescueHearts!==undefined){S.rescueHearts=999}else{S.eggStars=999}save();render()});await p.waitForTimeout(4200);
 console.log(' cn attrs',await p.evaluate(()=>{const i=document.querySelector('#cn');return i?[...i.attributes].map(a=>a.name+'='+a.value).join(' '):'none'}));
 const has=await p.$('#cn');if(has){await p.fill('#cn','');await p.press('#cn','Enter');await p.waitForTimeout(300);console.log(' Enter in pet name ->',await p.evaluate(()=>screen))}
 console.log(' errs',p.errs);await p.b.close()}
