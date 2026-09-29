import {open,SPEECH_MOCK} from './lib.mjs';import {placed} from './setup.mjs';
for(const mode of ['hang','reject','badjson']){const init=SPEECH_MOCK+`window.claude={use:(k)=>{if(k==='db')return Promise.reject(new Error('no db'));if('${mode}'==='hang')return new Promise(()=>{});if('${mode}'==='reject')return Promise.reject(new Error('denied'));return Promise.resolve({json:async()=>{throw new Error('bad')},text:async()=>'garbage'})}};`;
 const p=await open('critter-cove.html','ipad',{init});await placed(p,{hand:'off'});
 await p.evaluate(()=>{RUN={mode:'practice',station:'write',title:'W',results:[],earned:0,ups:[],planner:{pos:()=>0,total:1,next:()=>null}};startQuickWrite()});
 await p.fill('#qwText','I think the otter is the best pet. For example, it is fun. Also it swims. That is why.');await p.dispatchEvent('#qwText','input');
 const t0=Date.now();await p.click('[data-act="qw-send"]');await p.waitForFunction(()=>!QW.busy,null,{timeout:30000}).catch(()=>{});
 console.log(mode,'feedback after',Date.now()-t0,'ms; src',await p.evaluate(()=>QW.fb&&QW.fb.src),'| coach:',(await p.evaluate(()=>document.querySelector('#coachArea').innerText)).replace(/\n+/g,' ').slice(0,120),p.errs);await p.b.close()}
