import {open,shot,btns,text,answerQ,fbText,SPEECH_MOCK} from './lib.mjs';
const vp=process.argv[2]||'ipad';
const p=await open('critter-cove.html',vp,{init:SPEECH_MOCK});
await p.fill('#nm','Ava');await p.click('[data-act="welcome-go"]');await p.waitForTimeout(200);
await p.click('[data-act="pick-rescue"]');await p.waitForTimeout(200);
async function runArea(area,pattern,tag){
 await p.click(`[data-act="start-check"][data-area="${area}"]`).catch(async()=>{await p.evaluate(a=>startCheck(a),area)});await p.waitForTimeout(300);
 let n=0;
 while(true){const scr=await p.evaluate(()=>screen);if(scr!=='q')break;
  const right=pattern(n);const h0=await p.evaluate(()=>S.hearts);
  const q=await answerQ(p,right);await p.waitForTimeout(150);const fb=await fbText(p);const h1=await p.evaluate(()=>S.hearts);
  console.log(`${tag}#${n} ${q.type} ${right?'R':'W'} ans=${JSON.stringify(q.answer)} hearts ${h0}->${h1} fb=${fb}`);
  if(n===1||n===2)await shot(p,`${tag}-q${n}-${right?'right':'wrong'}`,false);
  if(right){await p.waitForTimeout(1300)}else{const nb=await p.$('#fb [data-act="next"]');if(nb){await nb.click()}else{console.log('  NO NEXT BUTTON after wrong');await p.waitForTimeout(1300)}await p.waitForTimeout(150)}
  n++;if(n>40)break}
 const scr=await p.evaluate(()=>screen);console.log(tag,'ended on',scr);await shot(p,tag+'-end');
 if(scr==='bonus'){console.log(await text(p));await p.click('[data-act="bonus-go"]');await p.waitForTimeout(300);let k=0;
  while(await p.evaluate(()=>screen)==='q'){const r=k%2===0;const h0=await p.evaluate(()=>S.hearts);const q=await answerQ(p,r);await p.waitForTimeout(150);console.log(`  bonus#${k} ${q.type} ${r?'R':'W'} hearts ${h0}->${await p.evaluate(()=>S.hearts)} fb=${await fbText(p)}`);if(k===1)await shot(p,tag+'-bonus-wrong',false);
   if(r)await p.waitForTimeout(1600);else{const nb=await p.$('#fb [data-act="next"]');if(nb)await nb.click();else{console.log('  NO NEXT in bonus');break}await p.waitForTimeout(200)}k++;if(k>30)break}
  console.log(tag,'after bonus screen',await p.evaluate(()=>screen));await shot(p,tag+'-after-bonus')}
 console.log(await text(p));
 const scr2=await p.evaluate(()=>screen);if(scr2==='qw'){return}
 const home=await p.$('[data-act="go-home"]');if(home)await home.click();await p.waitForTimeout(300)}
await runArea('math',n=>n%3!==1,'critter-pm');
await runArea('spell',n=>n%2===0,'critter-ps');
await runArea('write',n=>n%3!==2,'critter-pw');
console.log('screen',await p.evaluate(()=>screen));await shot(p,'critter-pw-qw');console.log(await btns(p));
console.log('spoken sample',(await p.evaluate(()=>__spoken)).slice(-8));
console.log(p.errs);await p.b.close();
