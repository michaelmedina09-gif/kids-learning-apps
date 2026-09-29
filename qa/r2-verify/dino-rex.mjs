// Read to Rex: passes on different days, tap-a-word, read-along (boundary + timed), hold confirm, questions, unlock order
import {open,shot,audit,txt,setOff,TIMEWORDS,log} from './lib.mjs';
const vp=process.argv[2]||'ipad';const P='dino-rex-'+vp+'-';const R=[];const ok=(c,m)=>{R.push((c?'PASS ':'FAIL ')+m)};
// realistic speech: boundaries 120ms apart, end after all words
const SPEECH=`window.__spoken=[];window.__hi=[];(function(){const ss={speaking:false,pending:false,paused:false,getVoices:()=>[{name:'Samantha',lang:'en-US',localService:true}],cancel(){ss._c=(ss._c||0)+1},pause(){},resume(){},addEventListener(){},speak(u){window.__spoken.push(u.text);const my=ss._c;const ws=[];const re=/\\S+/g;let m;while((m=re.exec(u.text)))ws.push(m.index);setTimeout(()=>{u.onstart&&u.onstart({});ws.forEach((ci,i)=>setTimeout(()=>{if(ss._c!==my)return;if(!window.__noBoundary&&u.onboundary)u.onboundary({name:'word',charIndex:ci})},40+i*120));setTimeout(()=>{if(ss._c!==my)return;u.onend&&u.onend({})},80+ws.length*120)},5)}};Object.defineProperty(window,'speechSynthesis',{value:ss,configurable:true});window.SpeechSynthesisUtterance=function(t){this.text=t}})();`;
const p=await open('dino',vp,{init:SPEECH});await p.evaluate(()=>localStorage.setItem('__qaoff','0'));const scr=()=>p.evaluate(()=>screen);
async function settle(){for(let g=0;g<4;g++){const s=await scr();if(s==='hatch'){await p.click('[data-act="hatch-done"]');await p.waitForTimeout(300)}else if(s==='choose'){await p.locator('[data-act="pick-egg"]').first().click();await p.waitForTimeout(300)}else return s}}
const auds=[];const au=async t=>auds.push({t,...await audit(p,56)});
async function startRexUI(){await p.evaluate(()=>{RUN=null;render()});await settle();const b=await p.$('[data-act="start-station"][data-st="rex"]');if(!b)return null;await b.click();await p.waitForTimeout(500);return p.evaluate(()=>({id:REX.s.id,pass:REX.plan.pass,re:REX.plan.reread,replay:REX.replay,n:REX.sents.length}))}
async function readThrough(opts={}){await p.click('[data-act="rex-go"]');await p.waitForTimeout(200);const n=await p.evaluate(()=>REX.sents.length);
 for(let k=0;k<n;k++){if(opts.wait)await p.waitForTimeout(opts.wait);await p.click('[data-act="rex-next"]');await p.waitForTimeout(120)}}
async function answerQs(wrongFirst){const out=[];let g=0;while(await p.evaluate(()=>screen==='rex'&&REX.phase==='q'&&!!REX.qs[REX.qi])&&g++<4){const q=await p.evaluate(()=>{const q=REX.qs[REX.qi];return{p:q.prompt,ch:q.choices.map(c=>({n:c.name,ok:c.ok}))}});
  if(wrongFirst){const w=q.ch.findIndex(c=>!c.ok);await p.click(`[data-act="rex-ans"][data-i="${w}"]`);await p.waitForTimeout(250);out.push('wrong1:'+(await p.evaluate(()=>document.querySelector('#fb').innerText)));const w2=q.ch.findIndex((c,i)=>!c.ok&&i!==w);await p.click(`[data-act="rex-ans"][data-i="${w2}"]`);await p.waitForTimeout(300);
   const fb=await p.evaluate(()=>document.querySelector('#fb').innerText.replace(/\n/g,' | '));out.push('wrong2:'+fb);await shot(p,P+'q-wrong2',false);await p.click('[data-act="rex-qnext"]');await p.waitForTimeout(300);continue}
  await p.click(`[data-act="rex-ans"][data-i="${q.ch.findIndex(c=>c.ok)}"]`);await p.waitForTimeout(1900);out.push(q.p+' -> ok')}return out}
try{
// ---------- new kid ----------
await p.evaluate(()=>{S=newState('Leo');for(const k in S.placement)if(k!=='at')S.placement[k]=true;S.placement.at=Date.now();S.egg='sky';save();render()});
let info=await startRexUI();log('d0',info);ok(info&&info.id===1&&info.pass===0,'new kid: story 1 (CVC), reading 1');await au('preview');await shot(p,P+'d0-preview');
const pvSpoken=await p.evaluate(()=>window.__spoken.join(' / '));ok(/Read to Rex/.test(pvSpoken)&&/Zap and the Cat/.test(pvSpoken),'preview read aloud: '+pvSpoken.slice(0,160));
await p.evaluate(()=>window.__spoken.length=0);await p.click('[data-act="rex-pv"][data-i="0"]');await p.waitForTimeout(100);ok(await p.evaluate(()=>window.__spoken.length>0),'tap preview word speaks');
// pass 0 read-along auto with boundaries
await p.click('[data-act="rex-go"]');await p.waitForTimeout(100);await au('read');
const seq=[];for(let t=0;t<14;t++){seq.push(await p.evaluate(()=>[...document.querySelectorAll('#rsent .rw')].findIndex(b=>b.classList.contains('on'))));await p.waitForTimeout(110)}
log('boundary highlight seq',seq.join(','));const nw=await p.evaluate(()=>REX.sents[0].tok.length);ok(new Set(seq.filter(x=>x>=0)).size>=Math.min(nw,4),'read-along highlight moves word by word (boundary) '+seq.join(','));await shot(p,P+'d0-readalong',false);
await p.waitForTimeout(800);const sp0=await p.evaluate(()=>window.__spoken.slice(-2));ok(sp0.some(x=>/Now you read it/.test(x)),'after read-along says "Now you read it"');
// tap a word
await p.evaluate(()=>window.__spoken.length=0);const w2=await p.evaluate(()=>REX.sents[0].tok[2].w);await p.click('[data-act="rex-word"][data-k="2"]');await p.waitForTimeout(80);const spw=await p.evaluate(()=>window.__spoken.slice());ok(spw.includes(w2),`tap-a-word speaks "${w2}": ${JSON.stringify(spw)}`);
ok(await p.evaluate(w=>S.rex.help[w.toLowerCase()]>=1,w2),'tapped word logged for grown-ups');
// timed mode (no boundary events)
await p.evaluate(()=>{window.__noBoundary=true});await p.click('[data-act="rex-tome"]');const seq2=[];for(let t=0;t<16;t++){seq2.push(await p.evaluate(()=>[...document.querySelectorAll('#rsent .rw')].findIndex(b=>b.classList.contains('on'))));await p.waitForTimeout(150)}
log('timed seq',seq2.join(','));ok(new Set(seq2.filter(x=>x>=0)).size>=3,'read-along works without boundary events (timed) '+seq2.join(','));await p.evaluate(()=>{window.__noBoundary=false});
// no voice at all
const noTTS=await p.evaluate(async()=>{const hits=[];await new Promise(r=>readAlong('A fat cat ran.',rexTok('A fat cat ran.',REX.s).tok,k=>hits.push(k),r));return hits});log('readAlong hits',noTTS);
// finish reading
const n=await p.evaluate(()=>REX.sents.length);for(let k=0;k<n;k++){await p.click('[data-act="rex-next"]');await p.waitForTimeout(100)}
ok(await p.evaluate(()=>REX.phase==='end'),'end screen');await au('end');await shot(p,P+'d0-end');
// hold button: quick tap
const hb=await p.locator('#rexHold').boundingBox();ok(hb.height>=44,'hold button height '+hb.height);
await p.locator('#rexHold').click();await p.waitForTimeout(200);ok(!(await p.evaluate(()=>REX.fluent)),'quick tap does NOT mark fluent');const tt=await p.evaluate(()=>document.querySelector('#toast').innerText);log('tap toast',tt);
await p.mouse.move(hb.x+hb.width/2,hb.y+hb.height/2);await p.mouse.down();await p.waitForTimeout(600);await p.mouse.up();await p.waitForTimeout(800);ok(!(await p.evaluate(()=>REX.fluent)),'0.6s press does NOT mark fluent');
// touch tap
if(vp!=='ipad'){await p.locator('#rexHold').tap();await p.waitForTimeout(200);ok(!(await p.evaluate(()=>REX.fluent)),'touch tap does NOT mark fluent')}
await p.mouse.move(hb.x+hb.width/2,hb.y+hb.height/2);await p.mouse.down();await p.waitForTimeout(1400);await p.mouse.up();ok(await p.evaluate(()=>REX.fluent),'1.4s hold marks fluent');
await p.click('[data-act="rex-qgo"]');await p.waitForTimeout(300);await au('q');await shot(p,P+'d0-q',false);const qspoken=await p.evaluate(()=>window.__spoken.slice(-1)[0]);log('q spoken',qspoken);ok(/\?/.test(qspoken||''),'question read aloud with choices');
const qa=await answerQs(true);log('qa',qa);ok(qa.some(x=>/It was/.test(x)),'after 2 misses shows correct answer');
await p.waitForTimeout(400);ok(await scr()==='summary','rex summary');await shot(p,P+'d0-sum');await au('sum');
let rec=await p.evaluate(()=>S.rex.stories[1]);log('rec d0',rec);ok(rec.reads===1&&rec.fluent===1,'reads=1 fluent=1');
// same day replay
info=await startRexUI();log('d0 replay',info);ok(info&&(info.replay||info.re),'same day again = replay (not a new reading)');if(info){await readThrough();await p.click('[data-act="rex-qgo"]');await p.waitForTimeout(300);await answerQs(false)}
rec=await p.evaluate(()=>S.rex.stories[1]);ok(rec.reads===1,'replay same day does not count as reading 2 ('+rec.reads+')');
// day 1, 2
for(const d of [1,2]){await setOff(p,d);info=await startRexUI();log('d'+d,info);ok(info&&info.id===1&&info.pass===d,`day ${d}: story 1 reading ${d+1}`);await shot(p,P+`d${d}-preview`);
 const tip=await p.evaluate(()=>document.querySelector('.qtop .tag').innerText);log('pass tag',tip);
 await readThrough();await p.click('[data-act="rex-qgo"]');await p.waitForTimeout(300);await answerQs(false);await p.waitForTimeout(300);if(d===2){await shot(p,P+'d2-sum');const s=await txt(p);ok(/three times/.test(s),'3rd reading: finished message')}}
rec=await p.evaluate(()=>S.rex.stories[1]);log('rec',rec);ok(rec.reads===3&&new Set(rec.dates).size===3,'3 readings on 3 different days');
await setOff(p,3);info=await startRexUI();log('d3',info);ok(info&&info.id===2&&info.pass===0,'day 3: next story 2');
// ---------- gating: story 3 finished, digraph level 1 ----------
await p.evaluate(()=>{S.skills.digraph.level=1;S.rex.cur=3;S.rex.stories[3]={reads:3,dates:['a','b','c'],fluent:0,q:[0,0],rereads:0,doneAt:today()};save()});
const g0=await p.evaluate(()=>rexPlan(true));log('gate same day',g0);
await setOff(p,4);const g1=await p.evaluate(()=>rexPlan(true));log('gate +1',g1);ok(g1.reread,'story 4 locked day after -> reread');
await setOff(p,5);const g2=await p.evaluate(()=>rexPlan(true));log('gate +2',g2);ok(g2.id===4&&!g2.reread,'2 days later story 4 opens');
// ---------- advanced kid ----------
await p.evaluate(()=>{S=newState('Max');for(const k in S.placement)if(k!=='at')S.placement[k]=true;S.egg='sky';S.skills.digraph.level=3;S.skills.cvc.level=5;S.skills.magic.level=4;save();render()});
const adv=await p.evaluate(()=>rexPlan(true));log('advanced',adv);ok(adv.id===10,'advanced kid starts at story 10');
const mid=await p.evaluate(()=>{S.rex={stories:{},help:{}};S.skills.magic.level=1;return rexPlan(true)});log('mid',mid);ok(mid.id===6,'digraph3+cvc4 starts at 6');
// ---------- questions for every story ----------
const allq=await p.evaluate(()=>EDU1.stories.map(s=>({id:s.id,qs:rexQuestions(s).map(q=>({p:q.prompt,ok:q.choices.filter(c=>c.ok).map(c=>c.name),wrong:q.choices.filter(c=>!c.ok).map(c=>c.name)}))})));
for(const s of allq){log(s.id,JSON.stringify(s.qs));ok(s.qs.length===2,`story ${s.id} has 2 questions (${s.qs.length})`);}
const texts=await p.evaluate(()=>Object.fromEntries(EDU1.stories.map(s=>[s.id,s.text.toLowerCase()])));
for(const s of allq)for(const q of s.qs){const bad=q.wrong.filter(w=>new RegExp('\\b'+w+'s?\\b').test(texts[s.id]));if(bad.length)ok(false,`story ${s.id} wrong choice appears in story: ${bad}`);if(!new RegExp('\\b'+q.ok[0].toLowerCase()).test(texts[s.id]))ok(false,`story ${s.id} answer ${q.ok} not in story`)}
}catch(e){R.push('CRASH '+e.message.slice(0,500)+' screen='+await scr())}
ok(p.errs.length===0,'no uncaught errors '+p.errs.join(' | '));
const agg={};for(const a of auds){if(a.overflow>0)R.push('FAIL overflow '+a.t+' '+a.overflow);for(const k of ['small','clip','lowc'])for(const x of a[k])agg[k+'|'+a.t+'|'+x]=1}for(const k of Object.keys(agg))R.push('INFO '+k);
for(const x of R)console.log(x);await p.b.close();
