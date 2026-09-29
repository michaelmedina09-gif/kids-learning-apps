import pw from '/opt/node-tools/node_modules/playwright/index.js';const {chromium}=pw;
export const VP={ipad:{width:1024,height:1366},ipadair:{width:820,height:1180},iphone:{width:390,height:844}};
export const SHOTS='/home/claude/kla-cove/qa/shots/round2-cove/';
export async function open(vp='ipad',opts={}){
 const b=await chromium.launch();const ctx=await b.newContext({viewport:VP[vp],hasTouch:true,isMobile:vp==='iphone',deviceScaleFactor:1});
 const p=await ctx.newPage();p.errs=[];
 p.on('pageerror',e=>p.errs.push('PAGEERROR '+e.message+' '+(e.stack||'').split('\n')[1]));
 p.on('console',m=>{if(m.type()==='error'&&!/ERR_TUNNEL|fonts\.g|net::ERR|Failed to load resource/.test(m.text()))p.errs.push('CONSOLE '+m.text())});
 if(opts.init)for(const s of [].concat(opts.init))await ctx.addInitScript(s);
 await p.goto('file:///home/claude/kla-cove/qa/r2/wrap/critter-cove.html');await p.waitForTimeout(400);p.b=b;return p}
export const shot=(p,n,full=true)=>p.screenshot({path:SHOTS+n+'.png',fullPage:full});
export const SPEECH_MOCK=`window.__spoken=[];(function(){const ss={speaking:false,pending:false,getVoices:()=>[{name:'Samantha',lang:'en-US'}],cancel(){},speak(u){window.__spoken.push(u.text);setTimeout(()=>{u.onstart&&u.onstart();u.onend&&u.onend()},5)},onvoiceschanged:null};Object.defineProperty(window,'speechSynthesis',{value:ss,configurable:true});window.SpeechSynthesisUtterance=function(t){this.text=t}})();`;
export const overflow=p=>p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
export async function answerQ(p,right){
 const q=await p.evaluate(()=>{const q=RUN.q;return{type:q.type,answer:q.answer,choices:q.choices&&q.choices.map(c=>({ok:c.ok,dis:c.dis})),pre:q.pre}});
 if(q.type==='mc'){let i=q.choices.findIndex(c=>right?c.ok:(!c.ok&&!c.dis));await p.click(`.choice[data-i="${i}"]`);return q}
 if(q.type==='num'){let v=right?String(q.answer):String(+q.answer+1);for(const ch of v)await p.click(`[data-act="key"][data-k="${ch}"]`);await p.click('[data-act="check"]');return q}
 if(q.type==='frac'){let [n,d]=q.answer;if(!right)n=n+1;await p.click('#fs-n');for(const ch of String(n))await p.click(`[data-act="key"][data-k="${ch}"]`);await p.click('#fs-d');for(const ch of String(d))await p.click(`[data-act="key"][data-k="${ch}"]`);await p.click('[data-act="check"]');return q}
 if(q.type==='spell'){let v=right?q.answer:q.answer.slice(0,-1)+(q.answer.endsWith('z')?'q':'z');for(const ch of v.toLowerCase().replace(/’/g,"'"))await p.click(`.kb [data-act="key"][data-k="${ch}"]`);await p.click('.kb [data-act="check"]');return q}
 throw new Error('unknown type '+q.type)}
