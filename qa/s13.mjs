import {open,shot} from './lib.mjs';import {placed} from './setup.mjs';
for(const [f,dec] of [['critter-cove.html',['chair','surfboard','lighthouse']],['dino-star-patrol.html',['rocketship','robot','tent']]])for(const vp of ['ipad','iphone']){const p=await open(f,vp);await placed(p);
 await p.evaluate((dec)=>{S.bought=allItems().filter(i=>i.cost).map(i=>i.id);allItems().filter(i=>i.need).forEach(i=>S.stats[i.need[0]]=99999);S.scene.decor=dec;save();DU.tab='decor';renderDress()},dec);await p.waitForTimeout(200);
 const t=f.split('-')[0];await p.locator('.stagebox').screenshot({path:`/home/claude/cove/qa/shots/${t}-stage-decor-${vp}.png`});
 await p.evaluate(()=>goHome());await p.waitForTimeout(200);const sc=await p.$('.scene');if(sc)await sc.screenshot({path:`/home/claude/cove/qa/shots/${t}-homescene-decor-${vp}.png`});else console.log('no .scene on home',f);
 await p.b.close()}
