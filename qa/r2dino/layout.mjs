import {open,shot,SPEECH_MOCK} from './lib.mjs';import {placed} from './setup.mjs';import {audit} from './audit.mjs';
const [f,vp]=[process.argv[2],process.argv[3]];const T=f.split('-')[0]+'-L-'+vp;
const p=await open(f,vp,{init:SPEECH_MOCK});const R=[];
const snap=async(n,full=true)=>{await p.waitForTimeout(250);R.push(await audit(p,n));await shot(p,`${T}-${n}`,full)};
await snap('welcome');
await placed(p);await p.evaluate(()=>{if(S.rescued){S.rescued.push({id:'owl',name:'Hoot',at:today()})}else{S.crew.push({id:'rex',name:'Rexy',at:today()})}S.streak={n:12,last:today()};S[CFG.curName]=12345;save();render()});await snap('home');
// question types
const crit=f.startsWith('critter');
const types=crit?[['math','num'],['math','frac'],['math','mc'],['spell','spell'],['write','mc']]:[['math','num'],['math','mc'],['read','tiles'],['write','build'],['read','mc']];
for(const [st,ty] of types){let found=false;for(let tries=0;tries<200&&!found;tries++){found=await p.evaluate(([st,ty])=>{const ids=Object.keys(SK).filter(k=>SK[k].area===st||(st==='spell'&&k==='spell'));for(const id of ids)for(const L of [1,2,3,4,5]){try{const q=mk(id,L);if(q.type===ty){RUN={mode:'practice',station:st,title:'Test',planner:{pos:()=>1,total:4,next:()=>null},results:[],used:new Set(),earned:0,ups:[],lastT:Date.now()};RUN.q=q;RUN.tries=0;RUN.locked=false;A={buf:'',fr:{w:'',n:'',d:''},focus:'n',pick:[]};renderQ();return true}}catch(e){}}return false},[st,ty])}
 if(!found){console.log('could not make',st,ty);continue}await snap(`q-${st}-${ty}`,false);
 if(ty==='num'||ty==='frac'){ // wrong twice -> teach
  await p.evaluate(()=>{answer(false);answer(false)});await snap(`q-${st}-${ty}-teach`,false)}}
// longest-prompt mc
if(crit){await p.evaluate(()=>{startStation('math')});await p.waitForTimeout(200);const pb=await p.$('[data-act="pad"]');if(pb){await pb.click();await snap('pad-open');await p.click('[data-act="pad-nlform"]');await snap('pad-nlform');await p.fill('#nlA','0');await p.fill('#nlB','3');await p.fill('#nlS','0.7');await p.click('[data-act="pad-nlc"]');await p.waitForTimeout(100);console.log('nl bad step toast',await p.evaluate(()=>[...document.querySelectorAll('.toast')].map(t=>t.innerText).join('|')));await p.click('[data-act="pad-nl"]');await p.waitForTimeout(100);
   const c=await p.locator('#nlc').boundingBox();const L=await p.evaluate(()=>PAD.lines[0]&&{y:PAD.lines[0].y,n:PAD.lines[0].n});if(L){const W=c.width;await p.mouse.click(c.x+36+2/L.n*(W-72),c.y+L.y);await p.mouse.click(c.x+36+7/L.n*(W-72),c.y+L.y)}
   const box=await p.locator('#ink').boundingBox();await p.click('[data-act="pad-pen"]');await p.mouse.move(box.x+40,box.y+200);await p.mouse.down();await p.mouse.move(box.x+200,box.y+260,{steps:8});await p.mouse.up();await snap('pad-drawn')}}
// write screens
if(crit){await p.evaluate(()=>{S.hand='off';RUN={mode:'practice',station:'write',title:'W',results:[],earned:0,ups:[],planner:{pos:()=>0,total:1,next:()=>null}};startQuickWrite()});await snap('qw-type');
 await p.fill('#qwText','i think otters are the best becuase they are fun and they swim alot and they hold hands when they sleep so they dont float away i love them');await p.dispatchEvent('#qwText','input');await p.click('[data-act="qw-send"]');await p.waitForTimeout(600);await snap('qw-fb');
 await p.evaluate(()=>{S.hand='always';startQuickWrite()});await snap('qw-hand')}
await p.evaluate(()=>{DU.tab='hat';renderDress()});await snap('dress');
await p.evaluate(()=>{DU.tab='goals';renderDress()});await snap('dress-goals');
await p.evaluate(()=>renderGuide());await snap('guide');
await p.evaluate(()=>openLearn(Object.keys(CFG.spec)[0]));await snap('learn',false);await p.evaluate(()=>{document.querySelector('#modal').hidden=true});
await p.evaluate(()=>renderDash());await snap('dash');
// summary + bonus
await p.evaluate(()=>{RUN={mode:'practice',station:crit?'math':'math',title:'Math',results:[{ok:true},{ok:false}],earned:12,ups:[],missed:[],planner:{}};renderSummary()}).catch(async()=>{await p.evaluate(()=>{RUN={mode:'practice',station:'math',title:'Math',results:[{ok:true},{ok:false}],earned:12,ups:[],missed:[],planner:{}};renderSummary()})});await snap('summary');
for(const r of R){const bad=r.hscroll||r.offRight.length||r.clipped.length;console.log(`${r.label}: hscroll=${r.hscroll} offRight=${JSON.stringify(r.offRight)} clipped=${JSON.stringify(r.clipped)} small=${r.small.join(' ')}`)}
console.log('errs',p.errs);await p.b.close();
