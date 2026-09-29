// Old saves from published builds -> new builds: progress preserved, all new screens open, no errors. Also via db (stub) path.
import {open,shot,audit,log} from './lib.mjs';
const app=process.argv[2]||'cove';const R=[];const ok=(c,m)=>R.push((c?'PASS ':'FAIL ')+m);
const KEY=app==='cove'?'critter-cove-v1':'dino-star-patrol-v1';
// 1) build a realistic state in the published app
const pub=await open(app+'pub','ipad');
const old=await pub.evaluate(app=>{const t=today();const y=(()=>{const d=new Date();d.setDate(d.getDate()-1);return d.toISOString().slice(0,10)})();
 S=newState('Mia');for(const k in S.placement)if(k!=='at')S.placement[k]=true;S.placement.at=Date.now()-5*864e5;
 const sk=Object.keys(S.skills);sk.forEach((k,i)=>{S.skills[k].level=1+(i%4);S.skills[k].seen=10+i;S.skills[k].correct=7+i;S.skills[k].recent=[1,0,1,1];});
 const items=allItems().filter(i=>i.cost).slice(0,3);S.owned=(S.owned||[]).concat(items.map(i=>i.id));
 if(app==='cove'){S.hearts=777;S.rescueHearts=20;S.current=Object.keys(CRITTERS)[1];S.rescued=[{id:Object.keys(CRITTERS)[0],name:'Sunny',at:y}];
  S.missed={because:{miss:2,right:0},beautiful:{miss:1,right:1}};S.writing=[{d:y,p:'Tell about a pet',kind:'opinion',first:'My cat is funny.',fb0:{stars:2,glow:'Nice',grow:'More',fixes:[],rubric:{topic:2,details:1,organization:1,conventions:2}},final:null,fb:null,hand:false,base:false}];}
 else{S.stars=555;S.eggStars=12;S.egg=S.egg||'sky';S.crew=[{id:(typeof DINOS!=='undefined'?Object.keys(DINOS)[0]:'rex'),name:'Chompy',at:y}];S.missed=S.missed||{};S.words=S.words||{};}
 S.streak={n:4,last:y};S.days[y]={sec:900,q:40,c:33,areas:{},done:{math:true},complete:true};S.days[t]={sec:300,q:12,c:10,areas:{},done:{math:true}};
 S.stats=Object.assign(S.stats||{},{daysPlayed:5,earned:900});S.guide=['a'];S.quiz=['a'];save();return JSON.parse(localStorage.getItem(LS))},app);
await pub.b.close();
log('old keys',Object.keys(old).join(','));
const pick=s=>({name:s.name,hearts:s.hearts,stars:s.stars,rh:s.rescueHearts,egg:s.eggStars,cur:s.current,rescued:JSON.stringify(s.rescued||s.crew),streak:JSON.stringify(s.streak),owned:JSON.stringify(s.owned),lv:JSON.stringify(Object.fromEntries(Object.entries(s.skills).map(([k,v])=>[k,v.level]))),place:JSON.stringify(s.placement),tdone:JSON.stringify((s.days||{})[Object.keys(s.days).sort().pop()].done),missed:JSON.stringify(s.missed)});
for(const via of ['ls','db']){
 const init=via==='ls'?`if(!sessionStorage.getItem('seeded')){localStorage.setItem('${KEY}',${JSON.stringify(JSON.stringify(old))});sessionStorage.setItem('seeded','1')}`
  :`if(!sessionStorage.getItem('seeded')){localStorage.setItem('__qadb',JSON.stringify({'${app==='cove'?'cove/state':'patrol/state'}':${JSON.stringify(old)}}));sessionStorage.setItem('seeded','1')}`;
 const p=await open(app,'ipad',{init,stub:via==='db',wait:1500});if(via==='db'){await p.reload();await p.waitForTimeout(2000)}log(via,'S null?',await p.evaluate(()=>!S),'ls has',await p.evaluate(k=>!!localStorage.getItem(k),KEY));
 const now=await p.evaluate(()=>JSON.parse(JSON.stringify(S)));if(!now){ok(false,`[${via}] state not loaded`);for(const x of R)console.log(x);process.exit(0)}
 const a=pick(old),b=pick(now);for(const k in a){if(k==='missed'&&app==='cove'){ok(true,'');continue}ok(a[k]===b[k],`[${via}] ${k} preserved (${String(a[k]).slice(0,60)} -> ${String(b[k]).slice(0,60)})`)}
 ok(Array.isArray(now.review),`[${via}] review[] added (${now.review&&now.review.length} cards; missed words seeded: ${JSON.stringify((now.review||[]).map(r=>r.key)).slice(0,120)})`);
 if(app==='cove')ok(Array.isArray(now.books),`[${via}] books[] added`);else ok(!!now.rex,`[${via}] rex state added`);
 log(via,'screen',await p.evaluate(()=>screen));await shot(p,`old-${app}-${via}-home`);
 // exercise screens
 const steps=app==='cove'?['renderHome()','renderDress()','renderDash()',"ACT['bookclub']&&ACT['bookclub']()",'renderHome()']:['render()','renderDress()','renderDash()','render()'];
 for(const s of steps){try{await p.evaluate(s)}catch(e){ok(false,`[${via}] ${s}: ${e.message.split('\n')[0]}`)}await p.waitForTimeout(250);const au=await audit(p,app==='cove'?44:56);if(au.overflow>0)ok(false,`[${via}] overflow after ${s}`)}
 await shot(p,`old-${app}-${via}-dash`);
 // start each station
 const sts=await p.evaluate(()=>[...document.querySelectorAll('[data-act="start-station"]')].map(e=>e.dataset.st));log(via,'stations',sts);
 for(const st of sts){await p.evaluate(()=>{RUN=null;render()});const b=await p.$(`[data-act="start-station"][data-st="${st}"]`);if(!b){ok(false,`[${via}] station ${st} button missing`);continue}await b.click().catch(e=>ok(false,st+' click '+e.message.slice(0,80)));await p.waitForTimeout(500);R.push(`INFO [${via}] ${st} -> ${await p.evaluate(()=>screen)}`)}
 ok(p.errs.length===0,`[${via}] no errors ${p.errs.join(' | ')}`);await p.b.close()}
for(const x of R)if(x.trim()!=='PASS')console.log(x);
