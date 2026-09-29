// Round 2 Dino click-through: Comeback Cards, Meteor Blast (no clock), Sound warm-up, Read to Rex x3, dashboard.
import {open,shot,answerAny} from './lib.mjs';import {placed} from './setup.mjs';import {audit} from './audit.mjs';
const vp=process.argv[2]||'ipad';const T='r2-'+vp;
// speech mock that fires word boundary events, so the read-along boundary path is exercised
const MOCK=`window.__spoken=[];window.__bounds=0;(function(){const ss={speaking:false,pending:false,getVoices:()=>[{name:'Samantha',lang:'en-US'}],cancel(){},speak(u){window.__spoken.push(u.text);setTimeout(()=>{u.onstart&&u.onstart();const re=/\\S+/g;let m,k=0;const ws=[];while((m=re.exec(u.text)))ws.push(m.index);if(u.onboundary){ws.forEach((ci,i)=>setTimeout(()=>{window.__bounds++;u.onboundary({name:'word',charIndex:ci})},10+i*25))}setTimeout(()=>{u.onend&&u.onend()},20+ws.length*25)},5)},onvoiceschanged:null};Object.defineProperty(window,'speechSynthesis',{value:ss,configurable:true});window.SpeechSynthesisUtterance=function(t){this.text=t}})();`;
const p=await open('dino-star-patrol.html',vp,{init:MOCK});const R=[];const log=(...a)=>console.log(...a);
const snap=async(n,full=true)=>{await p.waitForTimeout(250);R.push(await audit(p,n));await shot(p,`${T}-${n}`,full)};
const click=async sel=>{await p.click(sel);await p.waitForTimeout(120)};
const scr=()=>p.evaluate(()=>screen);
await placed(p);
await p.evaluate(()=>{S.crew.push({id:'zap',name:'Zap',at:today()});S.eggStars=5;
 // seed due Comeback Cards: a math fact, a sound-box word, a word chain, an old missed spelling word
 const t=today();const q=mk('add',2);const it0=reviewAdd('add',q);it0.wins=2;it0.box=3;reviewAdd('sounds',{kind:'elk',w:'ship'});reviewAdd('spell',{kind:'chain',from:'cat',to:'hat'});
 S.review.push({key:'sight:w:said',skill:'sight',q:{regen:1,skill:'sight',word:'said'},box:2,due:t,added:t,wins:2,misses:1});
 S.review.forEach(x=>x.due=t);delete S.days[t];save();render()});
await snap('home');
log('stations',await p.evaluate(()=>stations().map(x=>x.id).join(',')));
// ---------- Comeback Cards ----------
await click('.station[data-st="comeback"]');await snap('cb-intro');
await click('[data-act="cb-go"]');await p.waitForTimeout(400);
const plan=await p.evaluate(()=>day().rvPlan);log('rvPlan',plan);
for(let k=0;k<3;k++){const q=await p.evaluate(()=>({kind:RUN.q.kind,type:RUN.q.type,key:RUN.q.rkey}));log('card',k,q);
 if(!q.kind){await snap(`cb-card${k}`,false);await answerAny(p,true);await p.waitForTimeout(300);await snap(`cb-card${k}-right`,false);await p.waitForTimeout(1700)}
 else if(q.kind==='elk'){await snap('cb-elk',false);for(let i=0;i<2;i++)await click('#pebtray');await click('[data-act="snd-check"]');await p.waitForTimeout(300);await snap('cb-elk-miss',false);await click('[data-act="next"]');await p.waitForTimeout(400)}
 else{await snap('cb-chain',false);await click('.ctile[data-i="0"]');await snap('cb-chain-sel',false);await click('[data-act="snd-opt"][data-c="h"]');await p.waitForTimeout(1600);await p.waitForTimeout(1800)}}
log('screen after cb',await scr());await snap('cb-summary');
log('review after',await p.evaluate(()=>S.review.map(x=>`${x.key} box${x.box} due${x.due} wins${x.wins} conq${x.conq||'-'}`).join(' | ')),'conquered stat',await p.evaluate(()=>S.stats.conquered));
// ---------- Meteor Blast ----------
await p.evaluate(()=>goHome());await click('.station[data-st="blast"]');await snap('blast-intro');
const introTxt=await p.evaluate(()=>document.body.innerText);log('intro mentions seconds?',/second|hurry|time/i.test(introTxt));
await click('[data-act="blast-go"]');
for(let k=0;k<6;k++){const ans=await p.evaluate(()=>RUN.q.fact.ans);const right=k!==2;await p.evaluate(([a,r])=>{const m=[...document.querySelectorAll('.meteor')].find(b=>r?+b.dataset.v===a:+b.dataset.v!==a);m.click()},[ans,right]);await p.waitForTimeout(right?350:1000)}
await snap('blast-play',false);
log('timer element?',await p.evaluate(()=>!!document.querySelector('.timer,#tbar')),'text',await p.evaluate(()=>document.querySelector('.qcard').innerText.replace(/\n/g,' ')));
await p.evaluate(()=>{RUN.end=Date.now()-1});const ans=await p.evaluate(()=>RUN.q.fact.ans);await p.evaluate(a=>[...document.querySelectorAll('.meteor')].find(b=>+b.dataset.v===a).click(),ans);await p.waitForTimeout(600);
log('blast end screen',await scr(),await p.evaluate(()=>document.querySelector('.blastmsg')&&document.querySelector('.blastmsg').innerText),'blast review items',await p.evaluate(()=>S.review.filter(x=>x.q.fact).map(x=>x.key)),'log',await p.evaluate(()=>JSON.stringify(S.blastLog)));
await snap('blast-summary');
// ---------- Reading Rocket warm-up: sound boxes + word chains ----------
await p.evaluate(()=>goHome());await click('.station[data-st="read"]');await p.waitForTimeout(400);
log('warm steps',await p.evaluate(()=>RUN.warm.steps.map(s=>s.kind==='elk'?'elk:'+s.w:'chain:'+s.from+'>'+s.to).join(' ')),'lv',await p.evaluate(()=>S.snd.lv));
let si=0;while(await p.evaluate(()=>!!(RUN&&RUN.warm))&&si<8){const st=await p.evaluate(()=>({kind:SND.t.kind,n:SND.n,gr:SND.gr,tiles:SND.tiles,ed:SND.ed,from:SND.from,to:SND.to}));
 if(st.kind==='elk'){await snap(`warm-elk${si}`,false);
  if(si===0){for(let i=0;i<st.n+1;i++)await click('#pebtray');await click('[data-act="snd-check"]');await snap('warm-elk-warn',false)}
  // drag one pebble in, tap the rest
  const tb=await p.locator('#pebtray').boundingBox(),bb=await p.locator('#eboxes').boundingBox();await p.mouse.move(tb.x+tb.width/2,tb.y+tb.height/2);await p.mouse.down();await p.mouse.move(bb.x+30,bb.y+30,{steps:6});await p.mouse.up();await p.waitForTimeout(100);
  for(let i=1;i<st.n;i++)await click('#pebtray');await snap(`warm-elk${si}-pebbles`,false);await click('[data-act="snd-check"]');await p.waitForTimeout(1700);await snap(`warm-elk${si}-letters`,false);
  const used=new Set();for(const g of st.gr){const i=st.tiles.findIndex((x,k)=>x===g&&!used.has(k));used.add(i);await click(`[data-act="snd-tile"][data-i="${i}"]`)}await p.waitForTimeout(500);await snap(`warm-elk${si}-done`,false);await p.waitForTimeout(1500)}
 else{await snap(`warm-chain${si}`,false);const ed=st.ed;
  if(ed.op==='sub'){await click(`.ctile[data-i="${ed.pos}"]`);await snap(`warm-chain${si}-sel`,false);await click(`[data-act="snd-opt"][data-c="${ed.ch}"]`)}
  else if(ed.op==='ins'){await click(`[data-act="snd-opt"][data-c="${ed.ch}"]`)}else{await click(`.ctile[data-i="${ed.pos}"]`)}
  await p.waitForTimeout(500);await snap(`warm-chain${si}-done`,false);await p.waitForTimeout(1500)}
 si++}
log('after warm screen',await scr(),'q skill',await p.evaluate(()=>RUN&&RUN.q&&RUN.q.skill),'snd hist',await p.evaluate(()=>JSON.stringify(S.snd.hist)),'review keys',await p.evaluate(()=>S.review.map(x=>x.key).join(',')));
await snap('read-first-q',false);
// ---------- Read to Rex: three readings (one per day) ----------
for(let pass=0;pass<3;pass++){await p.evaluate(()=>{goHome();delete day().done.rex});
 await p.evaluate(()=>ACT['start-station']({dataset:{st:'rex'}}));await p.waitForTimeout(500);
 const info=await p.evaluate(()=>({id:REX.s.id,pass:REX.plan.pass,title:REX.s.title,n:REX.sents.length,pv:REX.pv.map(x=>x.w)}));log('rex',JSON.stringify(info));
 await snap(`rex${pass}-preview`);await click('[data-act="rex-pv"][data-i="0"]');
 await click('[data-act="rex-go"]');await p.waitForTimeout(pass===0?250:300);
 if(pass===0){await p.waitForTimeout(80);await snap('rex0-readalong',false);await p.waitForTimeout(900)}
 await click('[data-act="rex-word"][data-k="1"]');await snap(`rex${pass}-read`,false);
 if(pass===1){await click('[data-act="rex-tome"]');await p.waitForTimeout(60);log('highlighted during read-to-me',await p.evaluate(()=>document.querySelectorAll('.rw.on').length),'boundary events',await p.evaluate(()=>window.__bounds));await p.waitForTimeout(600)}
 for(let k=1;k<info.n;k++){await click('[data-act="rex-next"]');await p.waitForTimeout(pass===0?700:120)}
 await snap(`rex${pass}-lastsent`,false);await click('[data-act="rex-next"]');await p.waitForTimeout(300);await snap(`rex${pass}-end`,false);
 if(pass>=1){const h=await p.locator('#rexHold').boundingBox();await p.mouse.move(h.x+h.width/2,h.y+h.height/2);await p.mouse.down();await p.waitForTimeout(1350);await p.mouse.up();log('fluent marked',await p.evaluate(()=>REX.fluent))}
 await click('[data-act="rex-qgo"]');await p.waitForTimeout(300);
 for(let qi=0;qi<2;qi++){await snap(`rex${pass}-q${qi}`,false);const ch=await p.evaluate(()=>REX.qs[REX.qi].choices.map(c=>c.ok));
  if(qi===0&&pass===0){const w=ch.findIndex(x=>!x);await click(`[data-act="rex-ans"][data-i="${w}"]`);await snap('rex0-q-wrong',false)}
  await click(`[data-act="rex-ans"][data-i="${ch.findIndex(x=>x)}"]`);await p.waitForTimeout(1900)}
 await snap(`rex${pass}-done`);log('rex rec',await p.evaluate(()=>JSON.stringify(S.rex.stories[REX.s.id])),'done?',await p.evaluate(()=>day().done.rex))}
log('help words',await p.evaluate(()=>JSON.stringify(S.rex.help)));
await p.evaluate(()=>{S.rex.stories[S.rex.cur].doneAt=addDays(-3)});log('next plan after finishing',await p.evaluate(()=>JSON.stringify(rexPlan(true))));
// ---------- home + dashboard ----------
await p.evaluate(()=>goHome());await snap('home-after');
await p.evaluate(()=>renderDash());await snap('dash');
for(const r of R){if(r.hscroll||r.offRight.length||r.clipped.length||r.small.length)console.log(`${r.label}: hscroll=${r.hscroll} offRight=${JSON.stringify(r.offRight)} clipped=${JSON.stringify(r.clipped)} small=${r.small.join(' ')}`)}
console.log('errs',p.errs);await p.b.close();
