// iPhone: sideways scroll after a miss? Drive practice math, miss every question, record overflow + culprit. arg: cove|covepub
import {open,shot,log} from './lib.mjs';
const which=process.argv[2]||'cove';const p=await open(which,'iphone');
await p.fill('#nm','Mia');await p.click('[data-act="welcome-go"]');await p.locator('[data-act="pick-rescue"]').first().click();await p.waitForTimeout(300);
await p.click('[data-act="start-check"][data-area="math"]');await p.waitForTimeout(300);let shotDone=false;const out=[];
for(let i=0;i<40;i++){const s=await p.evaluate(()=>screen);if(s!=='q')break;
 const q=await p.evaluate(()=>({type:RUN.q.type,answer:RUN.q.answer,skill:RUN.q.skill,prompt:(RUN.q.prompt||RUN.q.q||'').toString().slice(0,60),choices:RUN.q.choices&&RUN.q.choices.map(c=>c.ok)}));
 for(let t=0;t<2;t++){if(!(await p.evaluate(()=>RUN&&!RUN.locked)))break;
  if(q.type==='mc'){const st=await p.evaluate(()=>[...document.querySelectorAll('.choice')].map(b=>b.disabled||getComputedStyle(b).pointerEvents==='none'));const k=q.choices.findIndex((c,j)=>!c&&!st[j]);if(k<0)break;await p.locator(`.choice[data-i="${k}"]`).click()}
  else if(q.type==='num'){for(const ch of String(+q.answer+1))await p.locator(`[data-act="key"][data-k="${ch}"]`).first().click();await p.locator('[data-act="check"]').first().click()}
  else if(q.type==='frac'){let [n,d]=q.answer;await p.click('#fs-n');for(const ch of String(n+1))await p.locator(`[data-act="key"][data-k="${ch}"]`).first().click();await p.click('#fs-d');for(const ch of String(d))await p.locator(`[data-act="key"][data-k="${ch}"]`).first().click();await p.locator('[data-act="check"]').first().click()}
  const samp=await p.evaluate(async()=>{const r=[];for(let k=0;k<30;k++){const ov=document.documentElement.scrollWidth-document.documentElement.clientWidth;if(ov>0){const w=[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>e.tagName+'.'+String(e.className).split(' ')[0]+':'+Math.round(e.getBoundingClientRect().right));r.push({k,ov,w:w.slice(0,5)})}await new Promise(z=>setTimeout(z,50))}return r});if(samp.length){out.push({skill:q.skill,t,first:samp[0],n:samp.length});if(!shotDone){await shot(p,which+'-iphone-overflow',false);shotDone=true}}}
 const ov=await p.evaluate(()=>{const ov=document.documentElement.scrollWidth-document.documentElement.clientWidth;if(ov<=0)return null;const w=[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>e.tagName+'.'+String(e.className).split(' ')[0]+':'+Math.round(e.getBoundingClientRect().right));return{ov,w:w.slice(0,6)}});
 if(ov){out.push({skill:q.skill,type:q.type,...ov});if(!shotDone){await shot(p,which+'-iphone-overflow');shotDone=true}}
 if(await p.$('#fb:not([hidden]) [data-act="next"]'))await p.click('#fb [data-act="next"]');else await p.waitForTimeout(1900)}
log(which,JSON.stringify(out,null,0).slice(0,2500));log(p.errs);await p.b.close();
