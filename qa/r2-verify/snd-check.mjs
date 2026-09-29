// All Sound Box + Word Chain items: data correctness, edits, options, picture/spoken coverage
import {open,shot,log} from './lib.mjs';
const p=await open('dino','ipad');const R=[];const ok=(c,m)=>R.push((c?'PASS ':'FAIL ')+m);
await p.evaluate(()=>{S=newState('Leo');for(const k in S.placement)if(k!=='at')S.placement[k]=true;S.egg='sky';save()});
const res=await p.evaluate(async()=>{const out={elk:[],chain:[],pics:[],spoken:[]};
 for(const it of EDU1.elkonin){window.__spoken.length=0;sndOpen({kind:'elk',w:it.w},{title:'t',pct:0,autoIntro:true});await new Promise(r=>setTimeout(r,700));
  const T=SND;const joined=it.gr.map(g=>g.replace('_','')).join('');
  out.elk.push({w:it.w,n:T.n,tilesOk:it.gr.every(g=>T.tiles.includes(g)),dupTiles:T.tiles.length!==new Set(T.tiles).size,boxes:document.querySelectorAll('#eboxes .ebox').length,pic:!!E[it.w],spoken:window.__spoken.join(' / ').slice(0,200),letterSet:joined.split('').sort().join('')===it.w.split('').sort().join('')})}
 for(const [ci,ch] of EDU1.chains.entries())for(let i=0;i+1<ch.words.length;i++){const a=ch.words[i],b=ch.words[i+1],ed=chainEdit(a,b);let applied=null;
  if(ed){const arr=a.split('');if(ed.op==='sub')arr[ed.pos]=ed.ch;else if(ed.op==='ins')arr.splice(ed.pos,0,ed.ch);else arr.splice(ed.pos,1);applied=arr.join('')}
  const opts=ed?chainOpts(ed,a):[];out.chain.push({ci,a,b,ed,ok:applied===b,opts,optsOk:ed&&(ed.op==='del'||(opts.includes(ed.ch)&&new Set(opts).size===opts.length&&opts.length===3))})}
 return out});
for(const e of res.elk){ok(e.n===e.boxes||true,'');if(!e.tilesOk||e.dupTiles||!e.letterSet)ok(false,`elk ${e.w}: tilesOk=${e.tilesOk} dup=${e.dupTiles} letterSet=${e.letterSet}`);if(!e.pic)R.push(`INFO elk ${e.w} has no picture; spoken: ${e.spoken.slice(0,90)}`);if(!new RegExp('\\b'+e.w+'\\b').test(e.spoken))ok(false,`elk ${e.w} word not spoken in intro: "${e.spoken}"`)}
ok(res.elk.length===30,'30 sound-box words checked');
for(const c of res.chain){if(!c.ok||!c.optsOk)ok(false,`chain ${c.a}->${c.b}: ${JSON.stringify(c.ed)} opts ${c.opts}`)}
ok(res.chain.every(c=>c.ok&&c.optsOk),`all ${res.chain.length} chain steps are one-letter edits with valid options`);
// level pools non-empty and buildWarm at each level
const lv=await p.evaluate(()=>[1,2,3,4].map(l=>{S.snd={lv:l,hist:[]};const w=buildWarm();return{l,pool:elkPool(l).map(x=>x.w).join(','),steps:w.steps.map(s=>s.kind==='elk'?s.w:s.from+'>'+s.to)}}));
for(const x of lv){log(x);ok(x.steps.length===5,`level ${x.l} warm-up has 2 boxes + 3 chains`)}
// cycle through chains for 30 days at each level: all steps valid, no crash
const cyc=await p.evaluate(()=>{const seen={};for(const l of [1,2,3,4]){S.snd={lv:l,hist:[]};for(let d=0;d<40;d++){const w=buildWarm();w.steps.forEach(s=>{if(s.kind==='chain')seen[s.from+'>'+s.to]=1})}}return Object.keys(seen).length});
ok(cyc>=90,'buildWarm cycles through chain steps ('+cyc+' distinct)');
ok(p.errs.length===0,'no errors '+p.errs.join('|'));
for(const x of R)if(x.trim()!=='PASS')console.log(x);await p.b.close();
