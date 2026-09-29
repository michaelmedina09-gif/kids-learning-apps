import {open,shot,btns,text} from './lib.mjs';
for(const f of ['critter-cove.html','dino-star-patrol.html']){const p=await open(f);
 await shot(p,f.split('-')[0]+'-01-welcome');console.log(f,await text(p));console.log(await btns(p));console.log(p.errs);await p.b.close()}
