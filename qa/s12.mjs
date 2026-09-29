import {open,shot} from './lib.mjs';import {placed} from './setup.mjs';
for(const f of ['critter-cove.html','dino-star-patrol.html'])for(const vp of ['ipad','ipadair','iphone']){const p=await open(f,vp);await placed(p);
 await p.evaluate(()=>{S.bought=allItems().filter(i=>i.cost).map(i=>i.id);DU.tab='decor';renderDress()});
 const res=await p.evaluate(async()=>{const out=[];const st=document.querySelector('.stage');const sr=st.getBoundingClientRect();const pet=document.querySelector('.stagepet').getBoundingClientRect();
  for(const it of CFG.items.decor){S.scene.decor=[it.id];document.querySelector('.stage').innerHTML=CFG.sceneSVG(S.scene.bg,[it.id])+document.querySelector('.stage').querySelector('.stagepet').outerHTML;
   const gs=[...document.querySelectorAll('.stage svg g[transform^="translate"]')];const g=gs[gs.length-1];if(!g){out.push(it.id+': no g');continue}const r=g.getBoundingClientRect();
   const vis=Math.max(0,Math.min(r.right,sr.right)-Math.max(r.left,sr.left))*Math.max(0,Math.min(r.bottom,sr.bottom)-Math.max(r.top,sr.top))/(r.width*r.height||1);
   const pov=Math.max(0,Math.min(r.right,pet.right)-Math.max(r.left,pet.left))*Math.max(0,Math.min(r.bottom,pet.bottom)-Math.max(r.top,pet.top))/(r.width*r.height||1);
   if(vis<.6||pov>.5)out.push(`${it.id}: ${Math.round(vis*100)}% on stage, ${Math.round(pov*100)}% under pet`)}return out});
 console.log(f,vp,res.join(' | ')||'all ok');await p.b.close()}
