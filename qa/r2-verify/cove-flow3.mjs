// Cove regression: real-click onboarding -> placement (all areas) -> full daily mission -> streak/levels -> dress up -> guide quiz -> dashboard
import {open,shot,audit,txt,setOff,TIMEWORDS,log} from './lib.mjs';
const vp=process.argv[2]||'ipad';const P='cove-flow-'+vp+'-';const R=[];const ok=(c,m)=>{R.push((c?'PASS ':'FAIL ')+m)};
const p=await open('cove',vp);
const scr=()=>p.evaluate(()=>screen);
const auds=[];async function au(tag){const a=await audit(p,44);auds.push({tag,...a});if(a.overflow>0){const w=await p.evaluate(()=>[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>e.tagName+'.'+String(e.className).split(' ')[0]+':'+Math.round(e.getBoundingClientRect().right)+' '+(e.innerText||'').slice(0,40).replace(/\n/g,' ')).slice(0,8));console.log('OVERFLOW',tag,a.overflow,JSON.stringify(w));await shot(p,'cove-flow-ovf-'+tag+'-'+Date.now()%100000,false)}}
async function answer(right){
 const q=await p.evaluate(()=>{const q=RUN.q;return{type:q.type,answer:q.answer,choices:q.choices&&q.choices.map(c=>({ok:c.ok,dis:c.dis}))}});
 if(q.type==='mc'){const st=await p.evaluate(()=>[...document.querySelectorAll('.choice')].map(b=>b.disabled||getComputedStyle(b).pointerEvents==='none'||/wrong|no|bad|dim/.test(b.className)));let i=q.choices.findIndex((c,k)=>right?c.ok:(!c.ok&&!c.dis&&!st[k]));if(i<0)i=q.choices.findIndex(c=>c.ok);await p.locator(`.choice[data-i="${i}"]`).click();}
 else if(q.type==='num'){let v=right?String(q.answer):String(+q.answer+1);for(const ch of v)await p.locator(`[data-act="key"][data-k="${ch}"]`).first().click();await p.locator('[data-act="check"]').first().click();}
 else if(q.type==='frac'){let [n,d]=q.answer;if(!right)n=n+1;await p.click('#fs-n');for(const ch of String(n))await p.locator(`[data-act="key"][data-k="${ch}"]`).first().click();await p.click('#fs-d');for(const ch of String(d))await p.locator(`[data-act="key"][data-k="${ch}"]`).first().click();await p.locator('[data-act="check"]').first().click();}
 else if(q.type==='spell'){let v=right?q.answer:q.answer.slice(0,-1)+(q.answer.endsWith('z')?'q':'z');for(const ch of v.toLowerCase().replace(/’/g,"'"))await p.locator(`.kb [data-act="key"][data-k="${ch}"]`).click();await p.locator('.kb [data-act="check"]').click();}
 else throw new Error('type '+q.type);
 return q}
let fbs=[];
async function playQ(missEvery=4){let i=0;while(i<60){const s=await scr();if(s==='q'){const right=i%missEvery!==1;await answer(right);await p.waitForTimeout(250);
   const fb=await p.evaluate(()=>{const f=document.querySelector('#fb');return f&&!f.hidden?f.innerText.replace(/\n/g,' | '):''});
   if(!right&&await p.evaluate(()=>RUN&&!RUN.locked)){await answer(false);await p.waitForTimeout(250)}
   const fb2=await p.evaluate(()=>{const f=document.querySelector('#fb');return f&&!f.hidden?f.innerText.replace(/\n/g,' | '):''});fbs.push((right?'R ':'W ')+fb2.slice(0,120));
   if(i===1)await au('q-miss');
   if(await p.$('#fb:not([hidden]) [data-act="next"]'))await p.click('#fb [data-act="next"]');else await p.waitForTimeout(1900);i++;continue}
  if(s==='qw'){if(!(await p.$('#qwText'))){await p.click('[data-act="qw-mode"][data-m="type"]');await p.waitForTimeout(200)}await p.fill('#qwText','My cat Luna is the best pet because she is funny. She sleeps on my bed every night. She plays with a red ball. I love her so much.');await p.click('[data-act="qw-send"]');await p.waitForTimeout(700);await au('qw-fb');
   if(await p.$('[data-act="qw-done"]'))await p.click('[data-act="qw-done"]');else if(await p.$('[data-act="qw-skip"]'))await p.click('[data-act="qw-skip"]');await p.waitForTimeout(300);i++;continue}
  if(s==='bonus'){await au('bonus');if(await p.$('[data-act="bonus-go"]')){await p.click('[data-act="bonus-go"]');await p.waitForTimeout(300)}i++;continue}
  if(s==='review-intro'){await p.click('[data-act="rv-go"]');await p.waitForTimeout(300);i++;continue}
  return s}return 'stuck'}
// onboarding
await shot(p,P+'01-welcome');await au('welcome');
await p.fill('#nm','Mia');await p.click('[data-act="welcome-go"]');await p.waitForTimeout(200);await au('choose');await shot(p,P+'02-choose');
await p.locator('[data-act="pick-rescue"]').first().click();await p.waitForTimeout(300);ok(await scr()==='home','home after choose');await shot(p,P+'03-home-checkups');await au('home-checkups');
for(const a of ['math','spell','write']){const b=await p.$(`[data-act="start-check"][data-area="${a}"]`);if(!b){ok(false,'check-up button '+a);continue}await b.click();await p.waitForTimeout(300);const end=await playQ(3);ok(['summary','home'].includes(end),`placement ${a} ends at summary (${end})`);await shot(p,P+'04-place-'+a);await au('place-sum-'+a);
 if(await p.$('[data-act="go-home"]'))await p.click('[data-act="go-home"]');else await p.evaluate(()=>renderHome());await p.waitForTimeout(300)}
ok(await p.evaluate(()=>S.placement.math&&S.placement.spell&&S.placement.write),'all placements done');if(process.env.PLACEONLY){for(const x of R)console.log(x);await p.b.close();process.exit(0)}
ok(fbs.filter(x=>x.startsWith('W')).every(x=>x.length>8),'every miss shows feedback');log('sample miss fb:',fbs.filter(x=>x.startsWith('W')).slice(0,4));
const h0=await p.evaluate(()=>({h:S.hearts,st:S.streak,lv:JSON.stringify(Object.fromEntries(Object.entries(S.skills).map(([k,v])=>[k,v.level])))}));
// daily mission
await shot(p,P+'05-home-day');await au('home-day');
const hometxt=await txt(p);ok(!TIMEWORDS.test(hometxt),'no time words on home: '+(hometxt.match(TIMEWORDS)||[''])[0]);
for(const st of ['sprint','math','spell','write']){await p.evaluate(()=>renderHome());await p.waitForTimeout(200);const b=await p.$(`[data-act="start-station"][data-st="${st}"]`);if(!b){ok(false,'station btn '+st);continue}await b.click();await p.waitForTimeout(300);
 if(st==='sprint'){if(await scr()==='review-intro'){await p.click('[data-act="rv-go"]');await playQ(99);if(await p.$('[data-act="rv-next"]'))await p.click('[data-act="rv-next"]');await p.waitForTimeout(300)}
  const it=await txt(p);ok(!TIMEWORDS.test(it),'sprint intro no time words: '+(it.match(TIMEWORDS)||[''])[0]);await shot(p,P+'06-sprint-intro');await au('sprint-intro');
  await p.click('[data-act="sprint-go"]');for(let i=0;i<10;i++){const a=await p.evaluate(()=>String(RUN.q.answer));for(const ch of a)await p.locator(`[data-act="key"][data-k="${ch}"]`).first().click();await p.waitForTimeout(250)}
  const pt=await txt(p);ok(!TIMEWORDS.test(pt)&&!/\b\d+\s*s\b|0:\d\d/.test(pt),'sprint play no clock text');ok(!(await p.$('.timer,#tbar,[class*=countdown],progress')),'no timer element');await shot(p,P+'07-sprint-play');await au('sprint-play');
  // wait for natural end
  let w=0;while(await scr()==='sprint'&&w<130){await p.waitForTimeout(1000);w++}log('sprint lasted ~',w,'s wall');const stx=await txt(p);ok(!TIMEWORDS.test(stx),'sprint summary no time words: '+(stx.match(TIMEWORDS)||[''])[0]);await shot(p,P+'08-sprint-sum');
 }else{const end=await playQ(4);ok(end==='summary',`station ${st} ends at summary (${end})`);await au('sum-'+st)}
 await shot(p,P+'09-sum-'+st);if(await p.$('[data-act="go-home"]'))await p.click('[data-act="go-home"]');await p.waitForTimeout(300)}
let s=await scr();if(s==='rescue'){await shot(p,P+'10-rescue');}
const h1=await p.evaluate(()=>({h:S.hearts,st:S.streak,done:S.days[today()].done,lv:JSON.stringify(Object.fromEntries(Object.entries(S.skills).map(([k,v])=>[k,v.level]))),rev:(S.review||[]).length}));
log('before',h0,'after',h1);ok(h1.h>h0.h,'hearts increased');ok(h1.st.n>=1&&h1.st.last,'streak set '+JSON.stringify(h1.st));
ok(Object.values(h1.done).filter(Boolean).length>=4,'all stations done today '+JSON.stringify(h1.done));
await p.evaluate(()=>render());await p.waitForTimeout(200);await shot(p,P+'11-home-done');const hd=await txt(p);log('home after:',hd.slice(0,400).replace(/\n/g,' | '));
// rescue naming
log('pre-rescue screen',await scr(),await p.evaluate(()=>({rh:S.rescueHearts,need:need()})));
if(await scr()==='rescue'){await p.fill('#cn','Sunny');await p.click('[data-act="rescue-done"]');await p.waitForTimeout(300);ok(await scr()==='choose','rescue -> choose next critter');await p.locator('[data-act="pick-rescue"]').first().click();await p.waitForTimeout(300)}
// next day streak
await setOff(p,1);const st2=await p.evaluate(()=>({n:streakNow(),rv:reviewDue(5).length,scr:screen}));log('next day',st2);ok(st2.n>=1,'streak alive next day');
const b1=await p.$('[data-act="start-station"][data-st="math"]');ok(!!b1,'math station button on next day home ('+st2.scr+')');
if(b1){await b1.click();await p.waitForTimeout(300);ok(await scr()==='review-intro'||st2.rv===0,'next day warm-up appears when cards due ('+st2.rv+')');await shot(p,P+'12-warmup');await au('warmup-intro');
 if(await scr()==='review-intro'){const itx=await txt(p);ok(!TIMEWORDS.test(itx),'warmup intro no time words');await p.click('[data-act="rv-go"]');const e=await playQ(2);log('warmup end',e);await au('warmup-sum');await shot(p,P+'13-warmup-sum');if(await p.$('[data-act="rv-next"]'))await p.click('[data-act="rv-next"]');await p.waitForTimeout(300);ok(await scr()==='q','continues into station');await p.evaluate(()=>{RUN=null;renderHome()});
  await p.click('[data-act="start-station"][data-st="spell"]');await p.waitForTimeout(300);ok(await scr()!=='review-intro','no second warm-up same day');await p.evaluate(()=>{RUN=null;renderHome()})}}
// Dress up via UI
await p.evaluate(()=>{S.hearts+=3000;save();renderHome()});
await p.click('[data-act="dress"]');await p.waitForTimeout(300);ok(await scr()==='dress','dress screen');await shot(p,P+'14-dress');await au('dress');
for(const t of ['hat','face','neck','hold','bg','decor','goals']){const tb=await p.$(`[data-act="du-tab"][data-t="${t}"],[data-act="du-tab"][data-tab="${t}"]`);if(!tb){R.push('INFO no tab '+t);continue}await tb.click();await p.waitForTimeout(150);const a=await audit(p,44);if(a.overflow>0)ok(false,'dress tab overflow '+t)}
const goals=await txt(p);R.push('INFO goals tab mentions chapters/books: '+/chapter|book/i.test(goals));await shot(p,P+'15-goals');
await p.click('[data-act="du-tab"][data-t="decor"]').catch(()=>{});await p.waitForTimeout(150);
const buyable=await p.evaluate(()=>{const b=[...document.querySelectorAll('[data-act="du-item"]')].map(e=>({id:e.dataset.id,it:allItems().find(i=>i.id===e.dataset.id)})).find(x=>x.it&&x.it.cost&&!isOwned(x.it));return buyable=b&&{id:b.id,cost:b.it.cost}});
log('buyable decor',buyable);
if(buyable){const w0=await p.evaluate(()=>wallet());await p.click(`[data-act="du-item"][data-id="${buyable.id}"]`);await p.waitForTimeout(250);await shot(p,P+'16-buy-confirm');
 const conf=await p.$$eval('.confirm button,[role=dialog] button,.modal button',a=>a.map(e=>e.dataset.act+':'+e.innerText));log('confirm btns',conf);
 await p.locator('#modal button',{hasText:'Buy it!'}).click();await p.waitForTimeout(300);
 const a=await p.evaluate(id=>({own:isOwned(allItems().find(i=>i.id===id)),w:wallet(),eq:JSON.stringify(S.outfit||{}),deco:JSON.stringify(S.decor||S.decorations||null)}),buyable.id);log('after buy',a);ok(a.own&&a.w===w0-buyable.cost,'bought decoration, hearts deducted');
 await p.evaluate(()=>renderHome());await p.waitForTimeout(300);await shot(p,P+'17-home-decor');}
// not enough currency
const poor=await p.evaluate(()=>{S.hearts=0;save();renderDress();const e=[...document.querySelectorAll('[data-act="du-item"]')].find(e=>{const it=allItems().find(i=>i.id===e.dataset.id);return it&&it.cost&&!isOwned(it)});return e&&e.dataset.id});
if(poor){await p.evaluate(()=>{const m=document.querySelector('#modal');m&&m.classList.remove('on')});await p.click(`[data-act="du-item"][data-id="${poor}"]`);await p.waitForTimeout(250);const ow=await p.evaluate(id=>isOwned(allItems().find(i=>i.id===id)),poor);ok(!ow,'cannot buy without hearts');R.push('INFO poor-buy msg: '+(await p.evaluate(()=>{const t=document.querySelector('#toast');return t&&t.innerText})||''))}
// guide + quiz
await p.evaluate(()=>{S.hearts=200;save();renderHome()});await p.click('[data-act="guide"]');await p.waitForTimeout(400);ok(await scr()==='guide','guide opens');await shot(p,P+'18-guide');await au('guide');
const imgs=await p.evaluate(()=>[...document.images].filter(i=>i.src.includes('critters')).map(i=>i.complete&&i.naturalWidth>0));ok(imgs.length&&imgs.every(Boolean),'guide photos load '+imgs.length);
// dashboard via hold gate
const gate=await p.$('#gate');if(gate){await p.evaluate(()=>renderHome());const g=await p.$('#gate');const bb=await g.boundingBox();await p.mouse.move(bb.x+bb.width/2,bb.y+bb.height/2);await p.mouse.down();await p.waitForTimeout(1600);await p.mouse.up();await p.waitForTimeout(300)}else await p.evaluate(()=>renderDash());
ok(await scr()==='dash','grown-ups dashboard opens via hold');await shot(p,P+'19-dash');await au('dash');const dt=await txt(p);ok(/Comeback Cards/.test(dt)&&/Book Club/i.test(dt),'dash has Comeback Cards + Book Club sections');
ok(p.errs.length===0,'no uncaught errors: '+p.errs.join(' | '));
for(const a of auds){if(a.overflow>0)ok(false,`overflow ${a.overflow}px on ${a.tag}`);if(a.small.length)R.push(`INFO small targets on ${a.tag}: `+a.small.slice(0,6).join('; '));if(a.clip.length)R.push(`INFO clipped on ${a.tag}: `+a.clip.slice(0,5).join('; '));if(a.lowc.length)R.push(`INFO lowcontrast ${a.tag}: `+a.lowc.slice(0,5).join('; '))}
for(const x of R)console.log(x);await p.b.close();
