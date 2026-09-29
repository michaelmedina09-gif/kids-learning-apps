import {open,shot} from './lib.mjs';import {placed} from './setup.mjs';
for(const f of ['critter-cove.html','dino-star-patrol.html']){const p=await open(f,'iphone');await placed(p);
 const r=await p.evaluate(()=>Object.keys(CFG.spec).map(id=>{openLearn(id);const h=document.querySelector('.learn-h h2'),c=document.querySelector('#lClose').getBoundingClientRect();const words=h.innerText.split(/\s+/);return (h.scrollWidth>h.clientWidth+1||c.right>innerWidth||h.getClientRects().length===0)?id+' overflow':null}).filter(Boolean));
 console.log(f,'learn title issues',r);await p.evaluate(()=>openLearn(Object.keys(CFG.spec).find(i=>/rex|dolphin/.test(i))));await p.waitForTimeout(200);await shot(p,'fix-'+f.split('-')[0]+'-iphone-learn-title',false);await p.b.close()}
