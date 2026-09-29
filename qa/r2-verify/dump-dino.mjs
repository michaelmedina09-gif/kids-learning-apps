import {open} from './lib.mjs';const p=await open('dino','ipad');
const d=await p.evaluate(()=>({elk:EDU1.elkonin,chains:EDU1.chains,stories:EDU1.stories.map(s=>({id:s.id,title:s.title,pattern:s.pattern,heart:s.heart,text:s.text,q:s.q||s.questions})),gate:REX_GATE,start:REX_START,chainlv:CHAIN_LV,E:Object.keys(E)}));
const fs=await import('fs');fs.writeFileSync('dino-content.json',JSON.stringify(d,null,1));console.log(p.errs);await p.b.close();
