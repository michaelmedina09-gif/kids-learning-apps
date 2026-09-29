import {open,shot,btns,text,answerQ,fbText,SPEECH_MOCK} from './lib.mjs';import {placed} from './setup.mjs';
const vp=process.argv[2]||'ipad';
const p=await open('critter-cove.html',vp,{init:SPEECH_MOCK});
await placed(p,{hand:'always'});
await p.click('[data-act="start-station"][data-st="write"]');await p.waitForTimeout(300);
while(await p.evaluate(()=>screen)==='q'){await answerQ(p,true);await p.waitForTimeout(1300)}
console.log('mode',await p.evaluate(()=>QW.mode));
await p.click('[data-act="qw-send"]');await p.waitForTimeout(200);console.log('toast',await p.evaluate(()=>[...document.querySelectorAll('.toast')].map(t=>t.innerText)));
const box=await p.locator('#hw').boundingBox();console.log('paper box',box);
// draw with touch-ish mouse strokes
for(let line=0;line<4;line++){const y=box.y+80+line*46;await p.mouse.move(box.x+70,y);await p.mouse.down();for(let x=70;x<box.width-40;x+=12)await p.mouse.move(box.x+x,y+((x/12)%2?-8:8));await p.mouse.up()}
await shot(p,`critter-hw-drawn-${vp}`,false);
const st0=await p.evaluate(()=>({...S.stats,hearts:S.hearts}));
await p.click('[data-act="qw-send"]');await p.waitForTimeout(1500);
await shot(p,`critter-hw-self-${vp}`);console.log(await p.evaluate(()=>document.querySelector('#coachArea').innerText));console.log(await btns(p));
for(const i of [0,1,2])await p.click(`[data-act="qw-check"][data-i="${i}"]`);
await p.click('[data-act="qw-done"]');await p.waitForTimeout(400);
const st1=await p.evaluate(()=>({...S.stats,hearts:S.hearts,writing:S.writing.length}));console.log('stats before',st0,'after',st1);
console.log(await text(p));console.log(p.errs);await p.b.close();
