// Every new screen at 1024x1366, 820x1180, 390x844: no sideways scroll, tap targets >= 44px, no errors
import {open,shot,SPEECH_MOCK,overflow} from './lib.mjs';import {setup} from './common.mjs';
const out=[];const ok=(c,m)=>{out.push((c?'PASS ':'FAIL ')+m);if(!c)process.exitCode=1};
const SEED=()=>{const t=today();S.books=[{id:'b1',title:'From the Mixed-Up Files of Mrs. Basil E. Frankweiler',author:'E. L. Konigsburg',chapters:10,color:'#8f6bff',started:t,done:null,rating:null,fav:null,log:[
 {ch:1,date:t,summary:'Claudia wanted to run away because nobody appreciated her, so she picked her brother Jamie since he saved his money.',qs:[{q:'What do you predict will happen next?',a:'I think they will hide in a museum.'}],art:false,story:'One day, Jamie found a coin fountain and made a wish that lasted forever and ever.',artId:null},
 {ch:2,date:t,summary:'They got to the city.',qs:[],art:false,story:null,artId:null}]},
 {id:'b2',title:'Island of the Blue Dolphins',author:'Scott O’Dell',chapters:29,color:'#0f8b8d',started:t,done:t,rating:4,fav:'Rontu',loved:'A long sentence I loved very much from the book that goes on and on.',log:[{ch:1,date:t,summary:'A ship came.',qs:[],art:false,story:null,artId:null}]}];S.bookCur='b1';
 const y=addDays(-1);for(const id of ['facts','caps','frac']){const q=id==='caps'?Object.assign(bankQ('caps',3),{skill:'caps'}):mk(id,3);reviewAdd(id,q)}S.review.forEach(x=>x.due=y);S.sprintLog=[{d:t,score:12,n:14,sec:60}];save()};
const screens=[
 ['home',()=>renderHome()],['rv-intro',()=>renderReviewIntro('math',reviewDue(5))],['rv-q',()=>startReview('math')],
 ['sprint',()=>{startSprint();sprintGo();RUN.end=Date.now()+1e9;RUN.score=9;spUpdate()}],
 ['shelf',()=>openBookClub('shelf')],['add',()=>{BC.draft={kind:'book',title:'A really long book title that keeps going',author:'Someone',chapters:'12',color:'#ff6b57'};BC.view='add';renderBook()}],
 ['book',()=>{BC.id='b1';BC.view='book';renderBook()}],['log',()=>{BC.id='b1';BC.draft=null;BC.view='log';renderBook()}],
 ['log-hand',()=>{BC.id='b1';BC.draft=null;S.hand='always';BC.view='log';renderBook()}],
 ['think',()=>{S.hand='sometimes';BC.id='b1';BC.ent=0;BC.think={qs:[{q:'You wrote: “Claudia wanted to run away because nobody appreciated her.” Why do you think that happened?',kind:'summary'},{q:BC_STEMS[2].q,kind:'word'},{q:BC_STEMS[0].q,kind:'stem'}],ans:[],words:[],replies:['Great thinking!','Nice word!','Love it!']};BC.view='think';renderBook()}],
 ['make',()=>{BC.make=null;BC.view='make';renderBook()}],['draw',()=>{BC.make={kind:'draw',strokes:[],color:'#2b2233',size:.014,tool:'pen'};renderBook()}],
 ['story',()=>{BC.make={kind:'story',text:'One day',fb:null};renderBook()}],['finish',()=>{BC.draft=null;BC.view='finish';renderBook()}],
 ['cert',()=>{BC.id='b2';BC.view='cert';renderBook()}],['dash',()=>{RUN=null;renderDash()}]];
for(const vp of ['ipad','ipadair','iphone']){const p=await open(vp,{init:SPEECH_MOCK});await setup(p);await p.evaluate(SEED);
 for(const [n,fn] of screens){await p.evaluate(fn);await p.waitForTimeout(250);const ov=await overflow(p);ok(ov<=0,`${vp} ${n} no sideways scroll (${ov})`);
  const small=await p.evaluate(()=>[...document.querySelectorAll('#app button,#app label.btn,#app input,#app summary')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height&&getComputedStyle(e).visibility!=='hidden'&&(Math.round(r.height)<44||Math.round(r.width)<44)&&!e.closest('.keypad,.kb,.chips,.dtabs,.pkrow,.stations')}).map(e=>(e.dataset.act||e.id||e.tagName)+':'+Math.round(e.getBoundingClientRect().width)+'x'+Math.round(e.getBoundingClientRect().height)));
  if(['shelf','add','book','log','log-hand','think','make','draw','story','finish','cert','rv-intro'].includes(n))ok(!small.length,`${vp} ${n} tap targets >=44 ${small.join(',')}`);
  await shot(p,`layout-${vp}-${n}`)}
 ok(p.errs.length===0,vp+' no errors '+p.errs.join(' | '));await p.b.close()}
console.log(out.filter(x=>x.startsWith('FAIL')).join('\n')||'all layout checks passed');console.log(out.length+' checks');
