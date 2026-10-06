import pw from '/opt/node-tools/node_modules/playwright/index.js';const {chromium}=pw;
export const VP={ipad:{width:1024,height:1366},ipadair:{width:820,height:1180},iphone:{width:390,height:844}};
export async function open(file,vp='ipad',opts={}){
 const b=await chromium.launch();const ctx=await b.newContext({viewport:VP[vp],hasTouch:true,isMobile:vp==='iphone',deviceScaleFactor:1});
 const p=await ctx.newPage();p.errs=[];
 p.on('pageerror',e=>p.errs.push('PAGEERROR '+e.message+' '+(e.stack||'').split('\n')[1]));
 p.on('console',m=>{if(m.type()==='error'&&!/ERR_TUNNEL|fonts\.g|net::ERR/.test(m.text()))p.errs.push('CONSOLE '+m.text())});
 if(opts.init)await ctx.addInitScript(opts.init);
 await p.goto((process.env.RAW?'file:///home/claude/cove/':'file:///home/claude/cove/qa/wrap/')+file);await p.waitForTimeout(400);p.b=b;return p}
export const shot=(p,n,full=true)=>p.screenshot({path:'/home/claude/cove/qa/shots/'+n+'.png',fullPage:full});
// list visible buttons
export const btns=p=>p.evaluate(()=>[...document.querySelectorAll('button,[data-act],input,textarea')].filter(e=>e.offsetParent||e.getClientRects().length).map(e=>`${e.tagName}${e.dataset.act?'['+e.dataset.act+']':''}${e.dataset.i!==undefined?'i='+e.dataset.i:''}${e.id?'#'+e.id:''} "${(e.innerText||e.value||e.getAttribute('aria-label')||'').trim().slice(0,40).replace(/\n/g,' ')}"`));
export const text=p=>p.evaluate(()=>document.body.innerText.slice(0,1500));
export const SPEECH_MOCK=`window.__NO_AU=1;window.__spoken=[];(function(){const ss={speaking:false,pending:false,getVoices:()=>[{name:'Samantha',lang:'en-US'}],cancel(){},speak(u){window.__spoken.push(u.text);setTimeout(()=>{u.onstart&&u.onstart();u.onend&&u.onend()},5)},onvoiceschanged:null};Object.defineProperty(window,'speechSynthesis',{value:ss,configurable:true});window.SpeechSynthesisUtterance=function(t){this.text=t}})();`;
// answer current RUN.q with real clicks. right=true/false
export async function answerQ(p,right){
 const q=await p.evaluate(()=>{const q=RUN.q;return{type:q.type,answer:q.answer,choices:q.choices&&q.choices.map(c=>({ok:c.ok,dis:c.dis})),pre:q.pre}});
 if(q.type==='mc'){let i=q.choices.findIndex(c=>right?c.ok:(!c.ok&&!c.dis));await p.click(`.choice[data-i="${i}"]`);return q}
 if(q.type==='num'){let v=right?String(q.answer):String(+q.answer+1);if(q.pre==='$'&&right)v=String(+q.answer);for(const ch of v)await p.click(`[data-act="key"][data-k="${ch}"]`);await p.click('[data-act="check"]');return q}
 if(q.type==='frac'){let [n,d]=q.answer;if(!right)n=n+1;await p.click('#fs-n');for(const ch of String(n))await p.click(`[data-act="key"][data-k="${ch}"]`);await p.click('#fs-d');for(const ch of String(d))await p.click(`[data-act="key"][data-k="${ch}"]`);await p.click('[data-act="check"]');return q}
 if(q.type==='spell'){let v=right?q.answer:q.answer.slice(0,-1)+(q.answer.endsWith('z')?'q':'z');for(const ch of v.toLowerCase().replace(/’/g,"'"))await p.click(`.kb [data-act="key"][data-k="${ch}"]`);await p.click('.kb [data-act="check"]');return q}
 throw new Error('unknown type '+q.type)}
export const fbText=p=>p.evaluate(()=>{const f=document.querySelector('#fb');return f&&!f.hidden?f.innerText.replace(/\n/g,' | '):null});
export async function answerAny(p,right){
 const q=await p.evaluate(()=>{const q=RUN.q;return{type:q.type,answer:q.answer,letters:q.letters,tokens:q.tokens}});
 if(q.type==='tiles'||q.type==='build'){const pool=q.type==='tiles'?q.letters:q.tokens;const want=q.type==='tiles'?[...q.answer]:q.answer.split(' ');let seq=[];const used=new Set();
  for(const w of want){const i=pool.findIndex((x,k)=>x===w&&!used.has(k));used.add(i);seq.push(i)}
  if(!right){seq=seq.slice();[seq[0],seq[seq.length-1]]=[seq[seq.length-1],seq[0]];if(seq.map(i=>pool[i]).join('')===want.join(''))seq.reverse()}
  for(const i of seq)await p.click(`[data-act="tile"][data-i="${i}"]`);await p.waitForTimeout(350);return q}
 return answerQ(p,right)}
