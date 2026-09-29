import {open,shot} from './lib.mjs';import {placed} from './setup.mjs';
const p=await open('critter-cove.html','ipad');await placed(p);await p.evaluate(()=>{ACT.dress()});await p.waitForTimeout(200);
await p.evaluate(()=>scrollTo(0,99999));await p.waitForTimeout(200);await shot(p,'critter-dress-scrolled-bottom',false);
console.log(await p.evaluate(()=>[document.documentElement.scrollHeight,innerHeight,getComputedStyle(document.documentElement).backgroundColor]));await p.b.close();
