// Is "second rescue right after the first" new? Same leftover-hearts scenario in published vs new.
import {open,log} from './lib.mjs';
for(const w of ['covepub','cove']){const p=await open(w,'ipad');
 const r=await p.evaluate(async()=>{S=newState('Mia');S.placement={math:true,spell:true,write:true,at:Date.now()};S.current='fox';S.hearts=158;S.rescueHearts=158;save();render();const a=screen;ACT['rescue-done']();const pick=document.querySelector('[data-act="pick-rescue"]');pick.click();await new Promise(r=>setTimeout(r,300));const b=screen;render();return{first:a,afterPick:b,afterRender:screen,rh:S.rescueHearts,need:need()}});
 log(w,r);await p.b.close()}
