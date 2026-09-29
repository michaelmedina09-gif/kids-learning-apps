import {open} from './lib.mjs';const p=await open('dino','ipad');
await p.evaluate(()=>{S=newState('Leo');for(const k in S.placement)if(k!=='at')S.placement[k]=true;S.placement.at=Date.now();S.egg='sky';save();render()});await p.waitForTimeout(300);
console.log(await p.evaluate(()=>[...document.querySelectorAll('[data-act]')].map(e=>e.tagName+' '+e.dataset.act+' '+JSON.stringify(e.dataset)).join('\n')));await p.b.close();
