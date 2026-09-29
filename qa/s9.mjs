import {open,shot,btns,text,SPEECH_MOCK} from './lib.mjs';import {placed} from './setup.mjs';
const [f,vp]=[process.argv[2]||'critter-cove.html',process.argv[3]||'ipad'];const tag=f.split('-')[0]+'-'+vp;
const p=await open(f,vp,{init:SPEECH_MOCK});
const cur=await p.evaluate(()=>CFG.curName);
await placed(p);
await p.evaluate(()=>{const ids=Object.keys(CFG.spec);if(S.rescued){S.rescued.push({id:ids[1],name:'Pip',at:today()},{id:ids[4],name:'Hoot',at:today()})}else{S.crew.push({id:ids[1],name:'Pip'},{id:ids[4],name:'Zed'})}save();render()});
const toasts=async()=>p.evaluate(()=>[...document.querySelectorAll('.toast')].map(t=>t.innerText));
await p.click('[data-act="dress"]');await p.waitForTimeout(300);await shot(p,tag+'-dress-hat');
console.log(await text(p));
// tabs
for(const t of ['hat','face','neck','hold','bg','decor','goals']){await p.click(`[data-act="du-tab"][data-t="${t}"]`);await p.waitForTimeout(150);
 const info=await p.evaluate(()=>({tiles:document.querySelectorAll('.tile2').length,pk:[...document.querySelectorAll('.pk')].map(b=>b.innerText),emptyPrev:[...document.querySelectorAll('.tile2 .tprev')].filter(e=>{const r=e.getBoundingClientRect();return r.width<10||r.height<10||!e.innerHTML.trim()}).length}));console.log(t,JSON.stringify(info));
 await shot(p,`${tag}-dress-${t}`);
 // pack chips
 if(info.pk.length>2){for(const pk of info.pk.slice(1)){await p.click(`[data-act="du-pk"][data-p="${pk}"]`);await p.waitForTimeout(80);const n=await p.evaluate(()=>document.querySelectorAll('.tile2').length);if(!n)console.log('  EMPTY pack',t,pk)}await p.click('[data-act="du-pk"][data-p="All"]')}}
// buy with not enough
await p.click('[data-act="du-tab"][data-t="hat"]');await p.waitForTimeout(100);
const shopId=await p.evaluate(()=>CFG.items.hat.filter(i=>i.cost).sort((a,b)=>a.cost-b.cost)[0].id);
const cost=await p.evaluate(id=>CFG.items.hat.find(i=>i.id===id).cost,shopId);
await p.click(`[data-act="du-item"][data-id="${shopId}"]`);await p.waitForTimeout(200);console.log('not enough ->',await toasts(),'modal hidden',await p.evaluate(()=>document.querySelector('#modal').hidden));
await p.evaluate(c=>{S[CFG.curName]=c+5;save();renderDress()},cost);
await p.click(`[data-act="du-item"][data-id="${shopId}"]`);await p.waitForTimeout(200);await shot(p,tag+'-buy-confirm',false);
console.log('confirm text',await p.evaluate(()=>document.querySelector('#modal').innerText));
await p.click('#mYes');await p.waitForTimeout(300);console.log('after buy wallet',await p.evaluate(()=>[wallet(),S.bought]),await toasts());
await p.click(`[data-act="du-item"][data-id="${shopId}"]`);await p.waitForTimeout(200);console.log('wearing?',await p.evaluate(id=>Object.values(S.outfit).some(w=>w.hat===id),shopId),'wallet',await p.evaluate(()=>wallet()));
await shot(p,tag+'-bought-worn');
// locked item click
const lockId=await p.evaluate(()=>CFG.items.hat.find(i=>!i.cost&&!isOwned(i)).id);await p.click(`[data-act="du-item"][data-id="${lockId}"]`);await p.waitForTimeout(150);console.log('locked toast',await toasts());
// equip free item in every slot on pet 2
await p.click('[data-act="du-pet"][data-i="1"]');
for(const t of ['hat','face','neck','hold']){await p.click(`[data-act="du-tab"][data-t="${t}"]`);const id=await p.evaluate(t=>CFG.items[t].find(i=>isOwned(i)).id,t);await p.click(`[data-act="du-item"][data-id="${id}"]`);await p.waitForTimeout(100)}
await shot(p,tag+'-pet2-dressed',false);
// decor max 3: give everything
await p.evaluate(()=>{S.bought=allItems().filter(i=>i.cost).map(i=>i.id);save();DU.tab='decor';renderDress()});
const decs=await p.evaluate(()=>CFG.items.decor.slice(0,5).map(i=>i.id));for(const d of decs){await p.click(`[data-act="du-item"][data-id="${d}"]`);await p.waitForTimeout(80)}
console.log('decor after 5 clicks',await p.evaluate(()=>S.scene.decor));
await shot(p,tag+'-decor3');
await p.click('[data-act="du-tab"][data-t="bg"]');const bgs=await p.evaluate(()=>CFG.items.bg.map(i=>i.id));
for(const b of bgs){await p.click(`[data-act="du-item"][data-id="${b}"]`);await p.waitForTimeout(60);await p.locator('.stage').screenshot({path:`/home/claude/cove/qa/shots/${tag}-scene-${b}.png`})}
// take everything off
await p.click('[data-act="du-pet"][data-i="1"]');const c=await p.$('[data-act="du-clear"]');console.log('clear btn',!!c);if(c){await c.click();await p.waitForTimeout(100)}
// goals
await p.click('[data-act="du-tab"][data-t="goals"]');await p.waitForTimeout(100);console.log((await text(p)).slice(0,300));
// tap targets in dress page
const small=await p.evaluate(()=>[...document.querySelectorAll('button')].filter(b=>b.offsetParent).map(b=>{const r=b.getBoundingClientRect();return{t:(b.innerText||b.getAttribute('aria-label')||'').trim().slice(0,20),w:Math.round(r.width),h:Math.round(r.height),act:b.dataset.act}}).filter(x=>x.h<44||x.w<44));
console.log('small targets',JSON.stringify(small.slice(0,20)),small.length);
console.log(p.errs);await p.b.close();
