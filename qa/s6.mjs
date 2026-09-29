import {open} from './lib.mjs';
for(const f of ['critter-cove.html','dino-star-patrol.html']){const p=await open(f);
 const r=await p.evaluate(()=>{const areas=[...new Set(Object.values(SK).map(s=>s.area))];const src=document.scripts[0].text;
  const need={};allItems().filter(i=>i.need).forEach(i=>{(need[i.need[0]]=need[i.need[0]]||[]).push(`${i.id}(${i.slot},${i.need[1]}: ${i.need[2]})`)});
  return{areas,need}});
 console.log(f,'areas',r.areas);for(const k of ['chapters','bookart','books','write','read','hand','writes','crew','rescues','bonus'])if(r.need[k])console.log(' ',k,r.need[k].join(' | '));await p.b.close()}
