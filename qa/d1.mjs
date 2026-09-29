import {open,shot,btns,text,answerAny,fbText,SPEECH_MOCK} from './lib.mjs';
const vp=process.argv[2]||'ipad';
const p=await open('dino-star-patrol.html',vp,{init:SPEECH_MOCK});
await p.fill('#nm','Leo');await p.click('[data-act="welcome-go"]');await p.waitForTimeout(300);
await shot(p,'dino-02-choose-'+vp);console.log(await text(p));console.log(await btns(p));
await p.click('[data-act="pick-egg"]');await p.waitForTimeout(300);await shot(p,'dino-03-home-'+vp);console.log(await text(p));console.log(await btns(p));
const areas=await p.evaluate(()=>[...document.querySelectorAll('[data-act="start-check"]')].map(b=>b.dataset.area));
for(const area of areas){await p.click(`[data-act="start-check"][data-area="${area}"]`);await p.waitForTimeout(300);let n=0;
 while(await p.evaluate(()=>screen)==='q'){const right=n%3!==1;const h0=await p.evaluate(()=>S.stars);const q=await answerAny(p,right);await p.waitForTimeout(200);
  const prompt=await p.evaluate(()=>document.querySelector('.prompt')?.innerText.replace(/\n/g,' '));
  console.log(`${area}#${n} ${q.type} ${right?'R':'W'} stars ${h0}->${await p.evaluate(()=>S.stars)} | ${prompt} | fb=${await fbText(p)}`);
  if(n<3)await shot(p,`dino-p${area}-q${n}-${vp}`,false);
  if(right)await p.waitForTimeout(1600);else{const nb=await p.$('#fb [data-act="next"]');if(nb)await nb.click();else{console.log(' NO NEXT');await p.waitForTimeout(1600)}await p.waitForTimeout(200)}
  n++;if(n>40)break}
 console.log(area,'end screen',await p.evaluate(()=>screen));await shot(p,`dino-p${area}-end-${vp}`);
 if(await p.evaluate(()=>screen)==='bonus'){console.log(await text(p));await p.click('[data-act="bonus-go"]');await p.waitForTimeout(300);let k=0;
  while(await p.evaluate(()=>screen)==='q'){const r=k%2===0;const q=await answerAny(p,r);await p.waitForTimeout(200);console.log(`  bonus#${k} ${q.type} ${r?'R':'W'} fb=${await fbText(p)}`);if(r)await p.waitForTimeout(1700);else{const nb=await p.$('#fb [data-act="next"]');if(nb)await nb.click();else{console.log('  NO NEXT');break}await p.waitForTimeout(200)}k++}}
 console.log(await text(p));await shot(p,`dino-p${area}-summary-${vp}`);const h=await p.$('[data-act="go-home"]');if(h)await h.click();await p.waitForTimeout(300)}
await shot(p,'dino-home-after-placement-'+vp);console.log(await text(p));
console.log("SPOKEN-EMOJI",(await p.evaluate(()=>__spoken)).filter(t=>/\p{Extended_Pictographic}/u.test(t)));console.log(p.errs);await p.b.close();
