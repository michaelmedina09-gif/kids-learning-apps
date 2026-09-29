import {open,SPEECH_MOCK} from './lib.mjs';import {placed} from './setup.mjs';
const p=await open('dino-star-patrol.html','ipad',{init:SPEECH_MOCK});await placed(p);
await p.evaluate(()=>{S.placement={math:false,read:false,at:null};save();render()});let n0=await p.evaluate(()=>__spoken.length);await p.click('[data-act="say-home"]');await p.waitForTimeout(6000);console.log('launch:',(await p.evaluate(n=>__spoken.slice(n),n0)).join(' / '));
await p.evaluate(()=>{S.placement={math:true,read:true,at:1};day().done.blast=true;save();render()});n0=await p.evaluate(()=>__spoken.length);await p.click('[data-act="say-home"]');await p.waitForTimeout(6000);console.log('mission:',(await p.evaluate(n=>__spoken.slice(n),n0)).join(' / '));
await p.evaluate(()=>{S.crew.push({id:'rex',name:'R'});DU.tab='goals';renderDress()});n0=await p.evaluate(()=>__spoken.length);await p.click('.goalsum [data-act="say-dress"]');await p.waitForTimeout(5000);console.log('goals:',(await p.evaluate(n=>__spoken.slice(n),n0)).join(' / '));
await p.evaluate(()=>{S.hatching='shelly';S.eggStars=999;save();render()});await p.waitForTimeout(2500);console.log('hatch say:',(await p.evaluate(()=>__spoken.filter(t=>/new/.test(t)))).join(' / '));
console.log(p.errs);await p.b.close();
