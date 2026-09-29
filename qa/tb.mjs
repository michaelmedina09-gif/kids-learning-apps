import {open,shot} from './lib.mjs';import {placed} from './setup.mjs';
for(const f of ['critter-cove.html','dino-star-patrol.html']){const p=await open(f,'iphone');await placed(p);await p.evaluate(()=>{S[CFG.curName]=12345;save();ACT.dress()});await p.waitForTimeout(400);
await p.screenshot({path:`/home/claude/cove/qa/shots/${f.split('-')[0]}-iphone-dress-top.png`});
console.log(await p.evaluate(()=>{const t=document.querySelector('.topbar,header');return t?t.outerHTML.slice(0,600):'none'}));
console.log(await p.evaluate(()=>[...document.querySelectorAll('.topbar *')].filter(e=>e.children.length===0).map(e=>{const r=e.getBoundingClientRect(),cs=getComputedStyle(e);return `${e.tagName} "${e.textContent.trim().slice(0,10)}" ${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)} op=${cs.opacity} vis=${cs.visibility}`}).join('\n')));await p.b.close()}
