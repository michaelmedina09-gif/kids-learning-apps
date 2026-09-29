import {open,shot} from './lib.mjs';import {placed} from './setup.mjs';
for(const f of ['critter-cove.html','dino-star-patrol.html'])for(const vp of ['ipad','ipadair','iphone']){const t=f.split('-')[0];const p=await open(f,vp);await placed(p);
 await p.evaluate(()=>{if(S.crew)S.crew.push({id:'rex',name:'Rexy'});S.bought=allItems().filter(i=>i.cost).map(i=>i.id);allItems().filter(i=>i.need).forEach(i=>S.stats[i.need[0]]=99999);S.scene.decor=(S.crew?['rocketship','robot','tent']:['chair','surfboard','lighthouse']);save();DU.tab='decor';renderDress()});await p.waitForTimeout(300);
 await shot(p,`fix-${t}-${vp}-dress-decor`,false);
 // add 4th decor
 const d4=await p.evaluate(()=>CFG.items.decor.find(i=>isOwned(i)&&!S.scene.decor.includes(i.id)).id);await p.click(`[data-act="du-item"][data-id="${d4}"]`);await p.waitForTimeout(200);
 console.log(t,vp,'4th decor toast:',await p.evaluate(()=>document.querySelector('#toast').hidden?'':document.querySelector('#toast').innerText),'decor',await p.evaluate(()=>S.scene.decor));
 const vis=await p.evaluate(()=>{const v=document.querySelector('.ssview');if(!v||!v.offsetParent)return 'strip hidden';const vr=v.getBoundingClientRect();return [...v.querySelectorAll('svg g[transform^="translate"]')].slice(-3).map(g=>{const r=g.getBoundingClientRect();const a=Math.max(0,Math.min(r.right,vr.right)-Math.max(r.left,vr.left))*Math.max(0,Math.min(r.bottom,vr.bottom)-Math.max(r.top,vr.top))/(r.width*r.height||1);return Math.round(a*100)+'%'})});console.log('  strip decor visibility',vis);
 await p.evaluate(()=>{DU.tab='hat';renderDress();scrollTo(0,1400)});await p.waitForTimeout(200);await shot(p,`fix-${t}-${vp}-dress-hat-scrolled`,false);
 console.log('  stage top when scrolled',await p.evaluate(()=>Math.round(document.querySelector('.stagebox').getBoundingClientRect().top)),'height',await p.evaluate(()=>Math.round(document.querySelector('.stagebox').getBoundingClientRect().height)));
 await p.evaluate(()=>{DU.tab='bg';renderDress();scrollTo(0,900)});await p.waitForTimeout(200);await shot(p,`fix-${t}-${vp}-dress-bg-scrolled`,false);
 console.log('  errs',p.errs);await p.b.close()}
