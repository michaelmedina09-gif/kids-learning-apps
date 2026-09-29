import pw from '/opt/node-tools/node_modules/playwright/index.js';const {chromium}=pw;
export const DIR='/home/claude/kids-learning-apps/qa/r2-verify/';
export const VP={ipad:{width:1024,height:1366},air:{width:820,height:1180},iphone:{width:390,height:844}};
export const URL={cove:'file://'+DIR+'wrap/cove-new.html',dino:'file://'+DIR+'wrap/dino-new.html',covepub:'file://'+DIR+'wrap/cove-pub.html',dinopub:'file://'+DIR+'wrap/dino-pub.html'};
// Date offset in days, persisted in localStorage so reloads keep the simulated day
export const DATE_MOCK=`(()=>{const RD=Date;let off=0;try{off=+(localStorage.getItem('__qaoff')||0)}catch(e){}window.__qaSetOff=d=>{off=d;try{localStorage.setItem('__qaoff',d)}catch(e){}};
 const now=()=>RD.now()+off*864e5;function D(...a){if(!new.target)return new RD(now()).toString();return a.length?new RD(...a):new RD(now())}D.prototype=RD.prototype;D.now=now;D.parse=RD.parse;D.UTC=RD.UTC;window.Date=D})();`;
export const SPEECH_MOCK=`window.__spoken=[];window.__utts=[];(function(){const ss={speaking:false,pending:false,paused:false,getVoices:()=>[{name:'Samantha',lang:'en-US',localService:true}],cancel(){},pause(){},resume(){},addEventListener(){},speak(u){window.__spoken.push(u.text);window.__utts.push(u);const bd=!window.__noBoundary;setTimeout(()=>{u.onstart&&u.onstart({});if(bd&&u.onboundary){const re=/\\S+/g;let m;while((m=re.exec(u.text)))u.onboundary({name:'word',charIndex:m.index,charLength:m[0].length})}setTimeout(()=>{u.onend&&u.onend({})},20)},5)},onvoiceschanged:null};Object.defineProperty(window,'speechSynthesis',{value:ss,configurable:true});window.SpeechSynthesisUtterance=function(t){this.text=t;this.addEventListener=(n,f)=>{this['on'+n]=f}}})();`;
// in-memory stand-in for window.claude (db + sample). Persisted to localStorage '__qadb' so reloads see "remote" data.
export const CLAUDE_STUB=`(()=>{let store={};try{store=JSON.parse(localStorage.getItem('__qadb')||'{}')}catch(e){}const persist=()=>{try{localStorage.setItem('__qadb',JSON.stringify(store))}catch(e){}};
window.__db=store;window.__dbWrites=[];window.__prompts=[];window.__smode=window.__smode||'good';const subs={};
const snap=(p)=>({exists:p in store,id:p.split('/').pop(),data:()=>store[p]===undefined?undefined:JSON.parse(JSON.stringify(store[p]))});
const fire=p=>(subs[p]||[]).forEach(f=>f(snap(p)));
const doc=p=>({get:async()=>snap(p),set:async(d)=>{const s=JSON.stringify(d);window.__dbWrites.push({path:p,bytes:s.length});store[p]=JSON.parse(s);persist();fire(p)},update:async(d)=>{store[p]=Object.assign(store[p]||{},JSON.parse(JSON.stringify(d)));persist();fire(p)},delete:async()=>{delete store[p];persist()},onSnapshot:(f)=>{(subs[p]=subs[p]||[]).push(f);setTimeout(()=>f(snap(p)),0);return()=>{}}});
const collection=c=>({doc:id=>doc(c+'/'+id),get:async()=>({docs:Object.keys(store).filter(k=>k.startsWith(c+'/')).map(snap)}),add:async d=>{const id='x'+Math.random().toString(36).slice(2);await doc(c+'/'+id).set(d);return{id}}});
const smp={limits:async()=>({images:true}),json:async(prompt,opts)=>{window.__prompts.push({prompt,opts:opts?Object.keys(opts):[],images:!!(opts&&opts.images)});await new Promise(r=>setTimeout(r,60));const M=window.__smode;
 if(M==='throw')throw Object.assign(new Error('x'),{code:'rate_limited'});
 if(M==='junk')return 'not json';
 if(/Write 3 short, fun questions/.test(prompt)){
  if(M==='evil')return{questions:[
   {q:'Why did Lina climb the Pipeworks tower?',kind:'stem',grounded:true,basis:''},
   {q:'How many of the 12 keys did she find?',kind:'stem',grounded:true,basis:''},
   {q:'What do you predict happens next?',kind:'stem',grounded:false,basis:''},
   {q:'You wrote that Mara found a box. Why did Captain Doon want it?',kind:'summary',grounded:true,basis:'Mara found a box'},
   {q:'You wrote that the dragon ate the moon. Why?',kind:'summary',grounded:true,basis:'the dragon ate the moon'},
   {q:'Why did she hide the golden key under the old bridge?',kind:'stem',grounded:true,basis:''}]};
  return{questions:[{q:'You wrote that Mara found a strange box. Why do you think she opened it?',kind:'summary',grounded:true,basis:'Mara found a strange box'},{q:'What do you think will happen next?',kind:'stem',grounded:true,basis:''},{q:'How did Mara feel?',kind:'stem',grounded:true,basis:''}]}}
 if(/answered questions about a chapter/.test(prompt)){if(M==='evil')return{replies:['Great! Lina would agree with you.','Yes, and Captain Doon felt the same way.','You are wrong about that.','Nice, 42 is right!']};return{replies:['What a thoughtful reason!','Great thinking!','Love your prediction!']}}
 if(/HANDWRITTEN/.test(prompt))return{transcript:'Mara ran to the roof because she was scared.',who:true,what:true,why:true,glow:M==='evil'?'Great job telling about Lina and the Pipeworks.':'You told who and why.',grow:'Tell what Mara found.'};
 if(/summary/.test(prompt)&&/"who":true/.test(prompt))return{who:true,what:true,why:false,glow:M==='evil'?'Nice! Lina is a great hero in The City of Ember.':'You told who and what happened.',grow:M==='evil'?'Mention that Doon found the 12 keys.':'Add why it happened.',fixes:[{wrong:'storroom',right:'storeroom',why:'spelling'},{wrong:'notintext',right:'x',why:'spelling'}]};
 return{stars:2,glow:M==='evil'?'Great! In the real book, Lina and Doon also find a glowing box in Ember.':'You wrote a fun adventure!',grow:'Add one more detail.',fixes:[],rubric:{topic:2,details:1,organization:1,conventions:2},example:'',replies:[],questions:[]}}};
window.claude={use:async(cap)=>{if(cap==='db')return{doc,collection};if(cap==='sample')return smp;throw Object.assign(new Error('no'),{code:'not_declared'})}};})();`;
export async function open(which,vp='ipad',opts={}){
 const b=opts.browser||await chromium.launch();const ctx=await b.newContext({viewport:VP[vp],hasTouch:vp!=='ipad'||!!opts.touch,isMobile:vp==='iphone',deviceScaleFactor:1});
 if(opts.clip)await ctx.grantPermissions(['clipboard-read','clipboard-write']);
 const p=await ctx.newPage();p.errs=[];p.ctx=ctx;
 p.on('pageerror',e=>p.errs.push('PAGEERROR '+e.message+' '+(e.stack||'').split('\n').slice(1,3).join(' ')));
 p.on('console',m=>{if(m.type()==='error'&&!/ERR_TUNNEL|fonts\.g|net::ERR|Failed to load resource|ERR_NAME/.test(m.text()))p.errs.push('CONSOLE '+m.text())});
 await ctx.addInitScript(DATE_MOCK);await ctx.addInitScript(SPEECH_MOCK);
 if(opts.stub)await ctx.addInitScript(CLAUDE_STUB);
 for(const s of [].concat(opts.init||[]))await ctx.addInitScript(s);
 await p.goto(URL[which]);await p.waitForFunction(()=>typeof screen!=='undefined'&&screen!=='boot',null,{timeout:15000}).catch(()=>{});await p.waitForTimeout(opts.wait||500);p.b=b;return p}
export const shot=(p,n,full=true)=>p.screenshot({path:DIR+'shots/'+n+'.png',fullPage:full}).then(()=>DIR+'shots/'+n+'.png');
export const overflow=p=>p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
export const txt=p=>p.evaluate(()=>document.body.innerText);
export let RESTORED=0;
export async function setOff(p,d){const snap=await p.evaluate(d=>{window.__qaSetOff(d);const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);o[k]=localStorage.getItem(k)}return o},d);
 const wait=()=>p.waitForFunction(()=>typeof screen!=='undefined'&&screen!=='boot',null,{timeout:15000}).catch(()=>{});await p.reload();await wait();
 const missing=await p.evaluate(o=>{const m=[];for(const k in o)if(localStorage.getItem(k)===null){localStorage.setItem(k,o[k]);m.push(k)}return m},snap);
 if(missing.length){RESTORED++;console.log('HARNESS: localStorage keys lost on reload (restored):',missing.join(','));await p.reload();await wait()}await p.waitForTimeout(500)}
export const log=(...a)=>console.log(...a);
// generic layout audit on current screen
export async function audit(p,minTap=44){return p.evaluate((minTap)=>{const out={overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,small:[],clip:[],lowc:[]};
 const vis=e=>{const r=e.getBoundingClientRect();const cs=getComputedStyle(e);return r.width>0&&r.height>0&&cs.visibility!=='hidden'&&cs.display!=='none'&&!e.closest('[hidden]')};
 document.querySelectorAll('button,a,[data-act],input,select,textarea,label.btn').forEach(e=>{if(!vis(e))return;if(e.matches('input[type=file]'))return;const r=e.getBoundingClientRect();if(Math.min(r.width,r.height)<minTap)out.small.push(`${e.tagName}.${(e.className||'').toString().split(' ')[0]}[${e.dataset.act||''}] "${(e.innerText||e.getAttribute('aria-label')||'').trim().slice(0,30)}" ${Math.round(r.width)}x${Math.round(r.height)}`)});
 const lum=c=>{const m=c.match(/[\d.]+/g);if(!m)return null;const [r,g,b]=m.slice(0,3).map(v=>{v/=255;return v<=.03928?v/12.92:((v+.055)/1.055)**2.4});return{L:.2126*r+.7152*g+.0722*b,a:m[3]===undefined?1:+m[3]}};
 const bgOf=e=>{let x=e;while(x){const cs=getComputedStyle(x);if(cs.backgroundImage&&cs.backgroundImage!=='none')return null;const l=lum(cs.backgroundColor);if(l&&l.a>.9)return l.L;x=x.parentElement}return 1};
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;const seen=new Set();
 while((n=walker.nextNode())){const t=n.textContent.trim();if(!t)continue;const e=n.parentElement;if(!e||seen.has(e)||!vis(e))continue;seen.add(e);if(e.closest('svg'))continue;const cs=getComputedStyle(e);
  if((e.scrollWidth>e.clientWidth+2&&cs.overflow!=='visible'&&cs.overflowX!=='auto'&&cs.overflowX!=='scroll')||(cs.textOverflow==='ellipsis'&&e.scrollWidth>e.clientWidth+1))out.clip.push(t.slice(0,40));
  const fg=lum(cs.color),bg=bgOf(e);if(fg&&bg!=null&&+cs.opacity>0){const c=(Math.max(fg.L,bg)+.05)/(Math.min(fg.L,bg)+.05);const big=parseFloat(cs.fontSize)>=24||(parseFloat(cs.fontSize)>=18.66&&+cs.fontWeight>=700);if(c<(big?3:4.5))out.lowc.push(`${c.toFixed(2)} "${t.slice(0,30)}" ${cs.color}`)}}
 return out},minTap)}
export const TIMEWORDS=/\b(seconds?|secs?|time'?s up|time is up|hurry|quick,? quick|out of time|timer|countdown|clock|faster!?)\b/i;
