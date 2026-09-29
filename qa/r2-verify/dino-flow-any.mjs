// Dino regression: UI onboarding -> placement -> full daily mission (comeback, blast, math, read+warm-up, rex, write) over several simulated days
import {open,shot,audit,txt,setOff,TIMEWORDS,log} from './lib.mjs';import {dAnswer,dSnd} from './dino-lib.mjs';const DIRX='/home/claude/kids-learning-apps/qa/r2-verify/';
const vp=process.argv[2]||'ipad';const P='dino-flow-'+vp+'-';const R=[];const ok=(c,m)=>{R.push((c?'PASS ':'FAIL ')+m)};
const TRACE=`const __o=Storage.prototype.removeItem;Storage.prototype.removeItem=function(k){console.log('RM '+k+' '+new Error().stack.split('\\n').slice(2,6).join(' | '));return __o.call(this,k)};const __c=Storage.prototype.clear;Storage.prototype.clear=function(){console.log('CLEAR '+new Error().stack.split('\\n').slice(2,6).join(' | '));return __c.call(this)};addEventListener('pagehide',()=>console.log('PAGEHIDE has='+!!localStorage.getItem('dino-star-patrol-v1')));console.log('START has='+!!localStorage.getItem('dino-star-patrol-v1'));`;
const p=await open(process.env.APP||'dino',vp,{init:process.env.TRACE?TRACE:''});p.on('console',m=>{if(/^(RM|CLEAR|PAGEHIDE|START)/.test(m.text()))console.log('>>',m.text().slice(0,500))});await p.evaluate(()=>localStorage.setItem('__qaoff','0'));
const scr=()=>p.evaluate(()=>screen);const auds=[];const au=async t=>auds.push({t,...await audit(p,56)});const sndlog=[];const fbs=[];const spokenAll=[];
async function spoken(){const s=await p.evaluate(()=>{const s=window.__spoken.slice();window.__spoken.length=0;return s});spokenAll.push(...s);return s}
async function relCheck(tag){if(!process.env.BISECT)return;await p.waitForTimeout(300);const before=await p.evaluate(()=>!!localStorage.getItem(LS));await p.reload();await p.waitForFunction(()=>typeof screen!=='undefined'&&screen!=='boot').catch(()=>{});await p.waitForTimeout(400);const after=await p.evaluate(()=>!!localStorage.getItem(LS));console.log('BISECT',tag,before,after);if(!after)throw new Error('LOST after '+tag)}
async function settle(){for(let g=0;g<4;g++){const s=await scr();if(s==='hatch'){await shot(p,P+'hatch');await au('hatch');await p.click('[data-act="hatch-done"]');await p.waitForTimeout(300)}else if(s==='choose'){await p.locator('[data-act="pick-egg"]').first().click();await p.waitForTimeout(300)}else return s}}
async function play(missEvery=4,max=80){let i=0;while(i<max){const s=await scr();
  if(s==='q'||s==='warm'){const isSnd=await p.evaluate(()=>typeof SND!=='undefined'&&!!(SND&&(screen==='warm'||(RUN&&RUN.q&&RUN.q.kind))));const right=i%missEvery!==1;
   if(isSnd){await dSnd(p,right,sndlog);if(i<3)await au('snd');i++;continue}
   await dAnswer(p,right);await p.waitForTimeout(300);
   if(!right&&await p.evaluate(()=>RUN&&!RUN.locked)){await dAnswer(p,false);await p.waitForTimeout(300)}
   const fb=await p.evaluate(()=>{const f=document.querySelector('#fb');return f&&!f.hidden?f.innerText.replace(/\n/g,' | '):''});fbs.push((right?'R ':'W ')+fb.slice(0,100));if(i===1)await au('q-fb');
   if(await p.$('#fb:not([hidden]) [data-act="next"]'))await p.click('#fb [data-act="next"]');else await p.waitForTimeout(1900);i++;continue}
  if(s==='bonus'){if(await p.$('[data-act="bonus-go"]')){await p.click('[data-act="bonus-go"]');await p.waitForTimeout(300)}else if(await p.$('[data-act="bonus-skip"]'))await p.click('[data-act="bonus-skip"]');i++;continue}
  if(s==='cb-intro'){await au('cb-intro');await p.click('[data-act="cb-go"]');await p.waitForTimeout(300);i++;continue}
  return s}return 'stuck'}
async function blast(){await p.click('[data-act="blast-go"]');await p.waitForTimeout(300);let k=0;
 while(await scr()==='blast'&&k<200){const a=await p.evaluate(()=>RUN.q&&RUN.q.fact?(RUN.q.fact.ans??RUN.q.answer):RUN.q.answer);const right=k%5!==2;
  const clicked=await p.evaluate(([a,r])=>{const m=[...document.querySelectorAll('.meteor')].find(b=>r?+b.dataset.v===+a:+b.dataset.v!==+a);if(m){m.click();return true}return false},[a,right]);
  await p.waitForTimeout(right?350:1000);if(k===3){const t=await txt(p);ok(!TIMEWORDS.test(t),'blast play has no time words: '+(t.match(TIMEWORDS)||[''])[0]);ok(!(await p.$('.timer,#tbar,progress,[class*=countdown]')),'no timer element');await shot(p,P+'blast-play',false);await au('blast')}k++}
 return scr()}
async function rex(pass,opts={}){await p.waitForTimeout(400);ok(await scr()==='rex','rex preview opens');const info=await p.evaluate(()=>({id:REX.s.id,pass:REX.plan.pass,re:REX.plan.reread,n:REX.sents.length,title:REX.s.title}));
 await au('rex-preview');await shot(p,P+`rex-d${pass}-preview`);await p.click('[data-act="rex-go"]');await p.waitForTimeout(400);await au('rex-read');
 for(let k=1;k<info.n;k++){await p.click('[data-act="rex-next"]');await p.waitForTimeout(150)}await p.click('[data-act="rex-next"]');await p.waitForTimeout(300);await au('rex-end');
 await p.click('[data-act="rex-qgo"]');await p.waitForTimeout(300);let qn=0;while(await p.evaluate(()=>screen==='rex'&&REX&&REX.phase==='q'&&!!REX.qs[REX.qi])&&qn<4){await au('rex-q');const ch=await p.evaluate(()=>REX.qs[REX.qi].choices.map(c=>c.ok));await p.click(`[data-act="rex-ans"][data-i="${ch.findIndex(x=>x)}"]`);await p.waitForTimeout(1900);qn++}
 return info}
try{
// ---------- onboarding ----------
await au('welcome');await shot(p,P+'01-welcome');await p.fill('#nm','Leo');await p.click('[data-act="welcome-go"]');await p.waitForTimeout(200);await au('choose');
await p.locator('[data-act="pick-egg"]').first().click();await p.waitForTimeout(300);ok(await scr()==='home','home after egg');await au('home-check');await shot(p,P+'02-home');
const areas=await p.$$eval('[data-act="start-check"]',a=>a.map(e=>e.dataset.area));log('check areas',areas);
for(let guard=0;guard<6;guard++){await settle();const area=await p.evaluate(()=>{const e=[...document.querySelectorAll('[data-act="start-check"]')].find(e=>!S.placement[e.dataset.area]);return e&&e.dataset.area});if(!area)break;const b=await p.$(`[data-act="start-check"][data-area="${area}"]`);const a=await b.getAttribute('data-area');await b.click();await p.waitForTimeout(300);const end=await play(3);ok(end==='summary','placement '+a+' -> '+end);await relCheck('place-'+a);await au('place-sum');await shot(p,P+'03-place-'+a);
 await p.evaluate(()=>{RUN=null;render()});await p.waitForTimeout(300)}
ok(await p.evaluate(()=>Object.entries(S.placement).filter(([k])=>k!=='at').every(([k,v])=>v)),'all placements done '+JSON.stringify(await p.evaluate(()=>S.placement)));
log('misses fb',fbs.filter(x=>x.startsWith('W')).slice(0,5));
// ---------- daily missions over 4 days ----------
const rexInfo=[];
for(let dayN=0;dayN<(+process.env.DAYS||4);dayN++){if(dayN){const fs=await import('fs');const raw=await p.evaluate(()=>localStorage.getItem(LS));fs.writeFileSync(DIRX+'dino-state-d'+dayN+'.json',raw||'');await setOff(p,dayN);const chk=await p.evaluate(()=>{try{const r=localStorage.getItem(LS);if(!r)return 'NO KEY';migrate(JSON.parse(r));return 'ok'}catch(e){return 'ERR '+e.message+' '+e.stack.split('\n').slice(0,3).join(' ')}});if(chk!=='ok')R.push('FAIL state reload day '+dayN+': '+chk)}await p.evaluate(()=>render());await p.waitForTimeout(300);await settle();
 const sts=await p.evaluate(()=>(typeof stations==='function'?stations():STATIONS).map(x=>x.id));log('day',dayN,'stations',sts);await shot(p,P+`home-d${dayN}`);await au('home');
 const ht=await txt(p);ok(!TIMEWORDS.test(ht),'home no time words');
 for(const st of sts){await p.evaluate(()=>{RUN=null;render()});await p.waitForTimeout(250);await settle();
  const b=await p.$(`[data-act="start-station"][data-st="${st}"]`);if(!b){ok(false,`day${dayN} station button ${st} screen=${await scr()}`);await shot(p,P+'nobtn');continue}await b.click();await p.waitForTimeout(400);let end;
  if(st==='blast'){await au('blast-intro');const it=await txt(p);ok(!TIMEWORDS.test(it),'blast intro no time words: '+(it.match(TIMEWORDS)||[''])[0]);end=await blast();const bt=await txt(p);ok(!TIMEWORDS.test(bt),'blast summary no time words: '+(bt.match(TIMEWORDS)||[''])[0]);}
  else if(st==='rex'){const info=await rex(dayN);rexInfo.push(info);end=await scr()}
  else end=await play(4);
  ok(end==='summary',`day${dayN} ${st} -> ${end}`);await relCheck(`d${dayN}-${st}`);await au('sum-'+st);if(dayN===0)await shot(p,P+`sum-${st}`)}
 const d=await p.evaluate(()=>({done:day().done,complete:day().complete,streak:streakNow(),stars:S.stars,egg:S.eggStars,rv:typeof reviewStats==='function'?reviewStats():null}));log('day',dayN,JSON.stringify(d));
 ok(d.complete,`day${dayN} mission complete`);ok(d.streak===dayN+1,`streak ${d.streak} on day ${dayN}`)}
log('rex over days',rexInfo);
if(rexInfo.length>=4){ok(rexInfo[0].id===1&&rexInfo[0].pass===0,'new kid starts at story 1 pass 1 (CVC)');ok(rexInfo[1].id===rexInfo[0].id&&rexInfo[1].pass===1&&rexInfo[2].pass===2,'passes 2 and 3 on later days, same story');ok(rexInfo[3].id===2||rexInfo[3].re,'day 4: next story or reread '+JSON.stringify(rexInfo[3]))}
log('snd',sndlog.slice(0,12));
// dress up + dashboard
await p.evaluate(()=>{S.stars+=3000;save();render()});await settle();
await p.click('[data-act="dress"]');await p.waitForTimeout(300);ok(await scr()==='dress','dress opens');await au('dress');
const buyable=await p.evaluate(()=>{const e=[...document.querySelectorAll('[data-act="du-item"]')].find(e=>{const it=allItems().find(i=>i.id===e.dataset.id);return it&&it.cost&&!isOwned(it)});return e&&e.dataset.id});
if(buyable){const w0=await p.evaluate(()=>wallet());await p.click(`[data-act="du-item"][data-id="${buyable}"]`);await p.waitForTimeout(250);const yes=p.locator('#modal button').last();if(await yes.count())await yes.click();await p.waitForTimeout(300);ok(await p.evaluate(([id,w])=>isOwned(allItems().find(i=>i.id===id))&&wallet()<w,[buyable,w0]),'dino buy item')}
await p.evaluate(()=>renderDash());await p.waitForTimeout(300);await au('dash');await shot(p,P+'dash');const dt=await txt(p);ok(/Comeback Cards/.test(dt)&&/Read to Rex/.test(dt)&&/Sound Boxes/.test(dt),'dash sections present');
}catch(e){R.push('CRASH '+e.message.slice(0,600)+' screen='+await scr())}
ok(p.errs.length===0,'no uncaught errors: '+p.errs.join(' | '));
const sp=await spoken();R.push('INFO spoken sample time words: '+spokenAll.filter(x=>TIMEWORDS.test(x)).slice(0,5).join(' / '));
for(const a of auds){if(a.overflow>0)ok(false,`overflow ${a.overflow}px on ${a.t}`)}
const agg={};for(const a of auds){for(const k of ['small','clip','lowc'])for(const x of a[k]){const key=k+'|'+a.t+'|'+x;agg[key]=1}}
for(const k of Object.keys(agg).slice(0,80))R.push('INFO '+k);
for(const x of R)console.log(x);await p.b.close();
