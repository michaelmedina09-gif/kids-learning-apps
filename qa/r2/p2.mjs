// P2 checks: step-dot contrast >= 4.5, grown-ups name box >= 44px, legacy art/story fields migrate to arts[]/stories[]
import {open,SPEECH_MOCK} from './lib.mjs';import {setup} from './common.mjs';
const out=[];const ok=(c,m)=>{out.push((c?'PASS ':'FAIL ')+m);if(!c)process.exitCode=1};
const p=await open('iphone',{init:SPEECH_MOCK});await setup(p);
const r=await p.evaluate(()=>{const t=today();S.books=[{id:'b1',title:'T',color:'#4c8dff',log:[{ch:1,date:t,summary:'Mara ran.',qs:[],art:true,artId:'artOld',story:'Old story'}]}];S=migrate(JSON.parse(JSON.stringify(S)));const e=S.books[0].log[0];
 BC.id='b1';BC.ent=0;BC.think=null;BC.view='think';renderBook();
 const lum=c=>{const [r,g,b]=c.match(/\d+/g).slice(0,3).map(x=>{x/=255;return x<=.03928?x/12.92:((x+.055)/1.055)**2.4});return .2126*r+.7152*g+.0722*b};
 const sp=document.querySelector('.bc-steps li.done span'),cs=getComputedStyle(sp);const L1=lum(cs.color),L2=lum(cs.backgroundColor);const cr=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);
 renderDash();const dn=document.querySelector('#dn').getBoundingClientRect().height;
 return{arts:e.arts,stories:e.stories,bookart:statC('bookart'),cr:Math.round(cr*100)/100,dn}});
ok(r.arts.join()==='artOld'&&r.stories.join()==='Old story'&&r.bookart===1,'legacy artId/story migrate to arts[]/stories[] '+JSON.stringify(r));
ok(r.cr>=4.5,'done-step number contrast '+r.cr+':1');ok(r.dn>=44,'grown-ups name box height '+r.dn+'px');
ok(p.errs.length===0,'no errors '+p.errs.join('|'));console.log(out.join('\n'));await p.b.close();
