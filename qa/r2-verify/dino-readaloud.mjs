// Dino read-aloud coverage on new screens: auto speech + speaker button on each
import {open,shot,setOff,log} from './lib.mjs';
const p=await open('dino','air');const R=[];const ok=(c,m)=>R.push((c?'PASS ':'FAIL ')+m);
const sp=async(ms=1500)=>{await p.waitForTimeout(ms);return p.evaluate(()=>{const s=window.__spoken.join(' / ');window.__spoken.length=0;return s})};
const hasBtn=()=>p.evaluate(()=>!![...document.querySelectorAll('[data-act$="say"],[data-act^="say"],.iconbtn.talk')].find(b=>b.getBoundingClientRect().width>0));
await p.evaluate(()=>{localStorage.setItem('__qaoff','0');S=newState('Leo');for(const k in S.placement)if(k!=='at')S.placement[k]=true;S.placement.at=Date.now();S.egg='sky';
 reviewAdd('add',mk('add',2));reviewAdd('sounds',{kind:'elk',w:'ship'});reviewAdd('spell',{kind:'chain',from:'cat',to:'cap'});save();render()});
await setOff(p,1);await p.evaluate(()=>render());await sp(300);
const home=await p.evaluate(()=>[...document.querySelectorAll('[data-act="start-station"]')].map(b=>b.innerText.replace(/\n/g,' ')));log('home stations',home);
ok(await hasBtn(),'home has read-aloud button');await p.click('[data-act="say-home"]').catch(()=>{});const hs=await sp(2500);log('home say:',hs);ok(/Comeback/i.test(hs)&&/Rex/i.test(hs),'home read-aloud names Comeback Cards and Read to Rex');
await p.click('[data-act="start-station"][data-st="comeback"]');const cb=await sp();ok(/Comeback Cards/.test(cb),'cb-intro auto-speaks: '+cb.slice(0,80));ok(await hasBtn(),'cb-intro has speaker');
await p.click('[data-act="cb-go"]');for(let i=0;i<3;i++){await p.waitForTimeout(400);const st=await p.evaluate(()=>({kind:RUN&&RUN.q&&RUN.q.kind,scr:screen}));if(st.scr!=='q')break;const s=await sp(1800);ok(s.length>5,`card ${i} (${st.kind||'q'}) auto-speaks: ${s.slice(0,90)}`);ok(await hasBtn(),`card ${i} has speaker`);
 await p.evaluate(()=>{RUN=null});break}
// read warm-up
await p.evaluate(()=>{RUN=null;day().done.comeback=true;render()});await sp(200);await p.click('[data-act="start-station"][data-st="read"]');await p.waitForTimeout(300);const w=await p.evaluate(()=>screen);const ws=await sp(2500);log('read start screen',w,ws.slice(0,160));ok(w==='warm'&&ws.length>10,'warm-up auto-speaks');ok(await hasBtn(),'warm-up has speaker');await shot(p,'dino-ra-warm',false);
// chain screen
await p.evaluate(()=>{sndOpen({kind:'chain',from:'cat',to:'cap'},{title:'Word Chains',pct:0,autoIntro:true,onDone(){},nextAct:'next'})});const cs=await sp(2500);ok(/cap/.test(cs),'chain intro speaks target: '+cs);await shot(p,'dino-ra-chain',false);
// rex: end and summary
await p.evaluate(()=>{RUN=null;render()});await p.click('[data-act="start-station"][data-st="rex"]');await sp(4000);await p.click('[data-act="rex-go"]');await sp(300);
const n=await p.evaluate(()=>REX.sents.length);for(let k=0;k<n;k++){await p.click('[data-act="rex-next"]');await p.waitForTimeout(80)}const es=await sp(2000);ok(/whole story/i.test(es),'rex end auto-speaks: '+es);ok(await hasBtn(),'rex end has speaker');
await p.click('[data-act="rex-qgo"]');const qs=await sp(2500);ok(/\?/.test(qs),'rex question auto-spoken');
for(let g=0;g<2;g++){const i=await p.evaluate(()=>REX.qs[REX.qi]?REX.qs[REX.qi].choices.findIndex(c=>c.ok):-1);if(i<0)break;await p.click(`[data-act="rex-ans"][data-i="${i}"]`);await p.waitForTimeout(2000)}
await p.waitForTimeout(500);const ss=await sp(1500);log('summary screen',await p.evaluate(()=>screen),ss);ok(ss.length>5,'rex summary speaks');ok(await hasBtn(),'rex summary has speaker');await shot(p,'dino-ra-rexsum',false);
ok(p.errs.length===0,'no errors '+p.errs.join('|'));for(const x of R)console.log(x);await p.b.close();
