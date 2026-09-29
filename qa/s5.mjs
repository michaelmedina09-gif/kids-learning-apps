import {open,shot} from './lib.mjs';
for(const f of ['critter-cove.html','dino-star-patrol.html']){const p=await open(f);
 const r=await p.evaluate(()=>{const out={blank:[],err:[],counts:{},dupBg:[],badDecor:[]};
  const ids=Object.keys(CFG.spec);out.chars=ids;
  for(const slot of ['hat','face','neck','hold']){out.counts[slot]=CFG.items[slot].length;for(const it of CFG.items[slot])for(const id of ids){try{const a=CFG.art(id,'md','',{}),b=CFG.art(id,'md','',{[slot]:it.id});if(a===b)out.blank.push(slot+':'+it.id+'@'+id)}catch(e){out.err.push(slot+':'+it.id+'@'+id+' '+e.message)}}}
  const seen={};for(const it of CFG.items.bg){try{const s=CFG.sceneSVG(it.id,[]);if(seen[s])out.dupBg.push(it.id+'=='+seen[s]);seen[s]=it.id;if(s.length<200)out.badDecor.push('bg short '+it.id)}catch(e){out.err.push('bg '+it.id+' '+e.message)}}
  out.counts.bg=CFG.items.bg.length;out.counts.decor=CFG.items.decor.length;
  for(const it of CFG.items.decor){try{const d=CFG.decorArt(it.id);if(!d||d.length<30)out.badDecor.push(it.id)}catch(e){out.err.push('decor '+it.id+' '+e.message)}}
  // unknown bg
  try{out.unknownBg=CFG.sceneSVG('nope',['nope2']).length}catch(e){out.err.push('unknown bg crash '+e.message)}
  // item fields
  out.itemIssues=allItems().filter(it=>!it.free&&!it.cost&&!(it.need&&it.need.length===3)).map(i=>i.id);
  const idc={};allItems().forEach(it=>{idc[it.id]=(idc[it.id]||0)+1});out.dupIds=Object.keys(idc).filter(k=>idc[k]>1);
  out.statKeys=[...new Set(allItems().filter(i=>i.need).map(i=>i.need[0]))];
  return out});
 console.log(f,JSON.stringify(r,null,0));await p.b.close()}
