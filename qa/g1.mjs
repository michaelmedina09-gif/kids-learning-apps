import {open,shot,btns,text,SPEECH_MOCK} from './lib.mjs';import {placed} from './setup.mjs';
for(const f of ['critter-cove.html','dino-star-patrol.html'])for(const vp of ['ipad','iphone']){const t=f.split('-')[0]+'-'+vp;const p=await open(f,vp,{init:SPEECH_MOCK});await placed(p);
 await p.click('[data-act="guide"]');await p.waitForTimeout(800);await shot(p,t+'-guide');
 const imgs=await p.evaluate(()=>[...document.querySelectorAll('.gcard img')].map(i=>[i.src.split('/').pop(),i.complete&&i.naturalWidth>0]));const broken=imgs.filter(x=>!x[1]);console.log(t,'guide imgs',imgs.length,'broken',JSON.stringify(broken));
 const cur0=await p.evaluate(()=>wallet());
 const id=await p.evaluate(()=>Object.keys(CFG.spec)[2]);await p.click(`[data-act="learn"][data-id="${id}"]`);await p.waitForTimeout(600);await shot(p,t+'-learn',false);
 const big=await p.evaluate(()=>{const i=document.querySelector('#modal img.realpic');return i?[i.naturalWidth,i.getBoundingClientRect().height]:null});console.log(' learn img',big,'modal overflow?',await p.evaluate(()=>{const b=document.querySelector('#modal .learn').getBoundingClientRect();return [Math.round(b.top),Math.round(b.bottom),innerHeight,document.querySelector('#modal').scrollHeight]}));
 async function quiz(nRight){await p.click('#lQuiz');await p.waitForTimeout(200);for(let k=0;k<3;k++){const ok=await p.evaluate(()=>{return 1});const btnsQ=await p.$$('.qc button');
   // find right index via text: we need q data -> use class after click; choose by probing spec
   const idx=await p.evaluate(({id,k})=>{const qq=CFG.spec[id].quiz;const cur=document.querySelector('.qq').innerText;const q=qq.find(x=>x[0]===cur);return [...document.querySelectorAll('.qc button')].findIndex(b=>b.innerText===q[1])},{id,k});
   const pickI=k<nRight?idx:(idx+1)%btnsQ.length;await btnsQ[pickI].click();await p.waitForTimeout(250);if(k===0&&nRight===3)await shot(p,t+'-quiz-fb',false);await p.waitForTimeout(1600)}
  return p.evaluate(()=>document.querySelector('.quiz.done')?.innerText.replace(/\n/g,' | '))}
 console.log(' pass1',await quiz(3),'wallet',cur0,'->',await p.evaluate(()=>wallet()));
 await p.click('#qBack');await p.waitForTimeout(300);
 console.log(' pass2',await quiz(2),'wallet',await p.evaluate(()=>wallet()));await p.click('#qBack');await p.waitForTimeout(200);
 console.log(' fail',await quiz(1),'wallet',await p.evaluate(()=>wallet()));
 // phantom speech: start quiz, answer q1, close immediately
 await p.click('#qBack');await p.waitForTimeout(200);await p.click('#lQuiz');await p.waitForTimeout(200);await (await p.$$('.qc button'))[0].click();await p.waitForTimeout(100);await p.click('#lClose');
 const n0=await p.evaluate(()=>__spoken.length);await p.waitForTimeout(2500);console.log(' spoken after close:',await p.evaluate(n=>__spoken.slice(n),n0),'modal hidden',await p.evaluate(()=>document.querySelector('#modal').hidden));
 console.log(' errs',p.errs);await p.b.close()}
