// Dino Comeback Cards over simulated days
import {open,shot,audit,txt,setOff,TIMEWORDS,log} from './lib.mjs';import {dAnswer,dSnd} from './dino-lib.mjs';
const vp=process.argv[2]||'ipad';const P='dino-rv-'+vp+'-';const R=[];const ok=(c,m)=>{R.push((c?'PASS ':'FAIL ')+m)};
const p=await open('dino',vp);await p.evaluate(()=>localStorage.setItem('__qaoff','0'));const scr=()=>p.evaluate(()=>screen);
try{
await p.evaluate(()=>{S=newState('Leo');for(const k in S.placement)if(k!=='at')S.placement[k]=true;S.placement.at=Date.now();S.egg='sky';
 reviewAdd('add',mk('add',2));reviewAdd('sounds',{kind:'elk',w:'ship'});reviewAdd('spell',{kind:'chain',from:'cat',to:'cap'});
 const sq=mk('sight',2);reviewAdd('sight',sq);reviewAdd('sounds',{kind:'elk',w:'frog'});save();render()});
const seeded=await p.evaluate(()=>S.review.map(x=>x.key+' b'+x.box+' '+x.due));log(seeded);
ok(await p.evaluate(()=>!stations().some(x=>x.id==='comeback')),'no Comeback station day 0');
const snd=[];
async function settle(){for(let g=0;g<4;g++){const s=await scr();if(s==='hatch'){await p.click('[data-act="hatch-done"]');await p.waitForTimeout(300)}else if(s==='choose'){await p.locator('[data-act="pick-egg"]').first().click();await p.waitForTimeout(300)}else return s}}
async function doCb(pattern,tag){await p.evaluate(()=>{RUN=null;render()});await settle();const has=await p.$('[data-act="start-station"][data-st="comeback"]');if(!has)return null;
 const first=await p.evaluate(()=>stations()[0].id);await has.click();await p.waitForTimeout(400);if(await scr()!=='cb-intro')return{scr:await scr()};const it=await txt(p);await shot(p,P+tag+'-intro');
 const a=await audit(p,56);if(a.small.length)R.push('INFO small '+tag+' intro: '+a.small.join('; '));
 await p.click('[data-act="cb-go"]');await p.waitForTimeout(400);const res=[];let i=0;
 while(await scr()==='q'&&i<8){const q=await p.evaluate(()=>({k:RUN.q.rkey,kind:RUN.q.kind}));const right=pattern(i,q.k);
  if(q.kind){await shot(p,P+tag+'-'+q.kind+'-'+i,false);await dSnd(p,right,snd)}else{await dAnswer(p,right);await p.waitForTimeout(300)}
  const fb=await p.evaluate(()=>{const f=document.querySelector('#fb');return f&&!f.hidden?f.innerText.replace(/\n/g,' | '):''});res.push({k:q.k,right,fb:fb.slice(0,160)});
  if(!right&&!q.kind)await shot(p,P+tag+'-miss-'+i,false);
  if(await p.$('#fb:not([hidden]) [data-act="next"]'))await p.click('#fb [data-act="next"]');else await p.waitForTimeout(2000);i++}
 await p.waitForTimeout(300);const sum=await txt(p);await shot(p,P+tag+'-sum');return{first,res,sum,scr:await scr(),introTime:TIMEWORDS.test(it)}}
const boxes=()=>p.evaluate(()=>Object.fromEntries(S.review.map(x=>[x.key,[x.box,x.due,x.wins,x.conq||'']])));
await setOff(p,1);let r=await doCb(()=>true,'d1');log('d1',JSON.stringify(r&&r.res));
ok(r&&r.first==='comeback','Comeback Cards is first station on day 1');ok(r&&r.res.length===3,'3 cards per day ('+(r&&r.res.length)+')');
ok(r&&new Set(r.res.map(x=>x.k.split(':')[0])).size===3,'3 different skills');let b=await boxes();log(b);
ok(r.res.every(x=>b[x.k][0]===2&&b[x.k][1]===null?false:b[x.k][0]===2),'right -> box 2');ok(await p.evaluate(ks=>ks.every(k=>S.review.find(x=>x.key===k).due===addDays(3)),r.res.map(x=>x.k)),'box 2 due in 3 days');
const d1keys=r.res.map(x=>x.k);
await setOff(p,2);r=await doCb(i=>i!==0,'d2');log('d2',JSON.stringify(r&&r.res));ok(r&&r.res.length===2,'day 2: remaining 2 due cards');
const miss=r&&r.res.find(x=>!x.right);ok(miss&&miss.fb.length>5,'miss shows answer: '+(miss&&miss.fb));b=await boxes();ok(miss&&b[miss.k][0]===1&&b[miss.k][1]===await p.evaluate(()=>addDays(1)),'miss -> box 1 due tomorrow');
// fast-forward: answer right on day 4, 11, 25, 55 for day-1 cards
for(const d of [4,11,25,55]){await setOff(p,d);r=await doCb(()=>true,'d'+d);log('d'+d,r&&r.res.map(x=>x.k+' '+x.fb.slice(0,50)));}
b=await boxes();log('final',b);const st=await p.evaluate(()=>reviewStats());log(st);ok(st.conq>=1,'conquered after 3 wins');
ok(await p.evaluate(()=>S.review.some(x=>x.done)),'a card retired after box 5');
await p.evaluate(()=>renderDash());await p.waitForTimeout(200);await shot(p,P+'dash');const dt=await p.evaluate(()=>{const s=[...document.querySelectorAll('section')].find(s=>/Comeback Cards/.test(s.innerText));return s&&s.innerText.replace(/\n/g,' | ')});log('dash',dt);
ok(dt&&dt.includes(String(st.conq)),'dash shows conquered');
const r2=await doCb(()=>true,'replay');R.push('INFO same-day replay after done: '+JSON.stringify(r2&&{n:r2.res&&r2.res.length,keys:r2.res&&r2.res.map(x=>x.k)}));
log('snd',snd);
}catch(e){R.push('CRASH '+e.message.slice(0,500)+' screen='+await scr())}
ok(p.errs.length===0,'no uncaught errors '+p.errs.join(' | '));for(const x of R)console.log(x);await p.b.close();
