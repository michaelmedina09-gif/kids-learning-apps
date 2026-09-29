import {open,shot} from './lib.mjs';import {placed} from './setup.mjs';
const p=await open('dino-star-patrol.html','ipad');await placed(p);await p.waitForTimeout(200);await p.locator('.mission').screenshot({path:'/home/claude/cove/qa/shots/fix-dino-ipad-mission-speaker.png'});await p.b.close();
const q=await open('critter-cove.html','ipadair');await placed(q);await q.evaluate(()=>{DU.tab='hat';renderDress()});await q.waitForTimeout(200);await q.locator('.shopbox').screenshot({path:'/home/claude/cove/qa/shots/fix-critter-ipadair-shop-speaker.png',clip:undefined});await q.b.close();
