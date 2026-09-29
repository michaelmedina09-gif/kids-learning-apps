import {open,shot,SPEECH_MOCK} from './lib.mjs';import {placed} from './setup.mjs';
for(const f of ['critter-cove.html','dino-star-patrol.html']){const p=await open(f,'ipad',{init:SPEECH_MOCK});await placed(p);
await p.evaluate(()=>{S.bought=allItems().filter(i=>i.cost).map(i=>i.id);allItems().filter(i=>i.need).forEach(i=>S.stats[i.need[0]]=99999);S.scene={bg:CFG.items.bg[0].id,decor:[]};save();DU.tab='decor';renderDress()});
const decs=await p.evaluate(()=>CFG.items.decor.filter(isOwned).slice(0,5).map(i=>i.id));
for(const d of decs){await p.click(`[data-act="du-item"][data-id="${d}"]`);await p.waitForTimeout(80)}
console.log(f,'owned decor clicked',decs,'->',await p.evaluate(()=>S.scene.decor), 'On tags',await p.evaluate(()=>document.querySelectorAll('.tile2.on').length));
await shot(p,f.split('-')[0]+'-decor-max3',false);
await p.b.close()}
