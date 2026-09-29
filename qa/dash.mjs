import {open,shot,text,btns,SPEECH_MOCK} from './lib.mjs';import {placed} from './setup.mjs';
for(const f of ['critter-cove.html','dino-star-patrol.html']){const t=f.split('-')[0];const p=await open(f,'ipad',{init:SPEECH_MOCK});await placed(p);
 await p.click('#gate');await p.waitForTimeout(200);console.log(t,'tap toast',await p.evaluate(()=>[...document.querySelectorAll('.toast')].map(x=>x.innerText)),'screen',await p.evaluate(()=>screen));
 const b=await p.locator('#gate').boundingBox();await p.mouse.move(b.x+10,b.y+10);await p.mouse.down();await p.waitForTimeout(600);await p.mouse.up();console.log(' short hold screen',await p.evaluate(()=>screen));
 await p.mouse.down();await p.waitForTimeout(1400);await p.mouse.up();await p.waitForTimeout(300);console.log(' long hold screen',await p.evaluate(()=>screen),'toast after release',await p.evaluate(()=>[...document.querySelectorAll('.toast')].map(x=>x.innerText)));
 await shot(p,t+'-dash');console.log((await text(p)).slice(0,600));console.log(await btns(p));
 // settings
 await p.fill('#dn','');await p.click('[data-act="dash-name"]');console.log(' empty name keeps',await p.evaluate(()=>S.name));
 await p.fill('#dn','Zoe');await p.click('[data-act="dash-name"]');console.log(' name',await p.evaluate(()=>S.name));
 await p.click('[data-act="dash-copy"]');await p.waitForTimeout(300);console.log(' copy ->',await p.evaluate(()=>({modal:!document.querySelector('#modal').hidden,toast:[...document.querySelectorAll('.toast')].map(x=>x.innerText)})));
 await p.evaluate(()=>{document.querySelector('#modal').hidden=true});
 if(t==='dino'){const opts=await p.evaluate(()=>document.querySelector('#vsel')?[...document.querySelector('#vsel').options].map(o=>o.text):null);console.log(' voice opts',opts);await p.click('[data-act="dash-vtest"]').catch(e=>console.log('vtest err',e.message.slice(0,60)));await p.click('[data-act="dash-voice"]');console.log(' voice',await p.evaluate(()=>S.voice))}
 else{await p.click('[data-act="dash-hand"]');console.log(' hand',await p.evaluate(()=>S.hand))}
 await p.click('[data-act="dash-redo"]');await p.waitForTimeout(100);await p.click('#mNo');console.log(' redo cancel placement',await p.evaluate(()=>JSON.stringify(S.placement)));
 await p.click('[data-act="dash-reset"]');await p.waitForTimeout(100);await p.click('#mYes');await p.waitForTimeout(300);console.log(' after reset screen',await p.evaluate(()=>[screen,!!S,localStorage.length]));
 console.log(' errs',p.errs);await p.b.close()}
