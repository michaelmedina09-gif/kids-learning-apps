/* ---------- accessories (drawn on kawaii characters) ---------- */
const ACCART={
 sunhat:()=>({f:`<ellipse cx="60" cy="30" rx="38" ry="8" fill="#f6d27a" ${ST()}/><path d="M40 30 Q42 8 60 8 Q78 8 80 30Z" fill="#f6d27a" ${ST()}/><path d="M41 25 Q60 19 79 25" stroke="#ff6b8a" stroke-width="5" fill="none"/>`}),
 bow:()=>({f:`<g transform="translate(84 30) rotate(20)"><path d="M0 0 L-15 -10 L-15 10Z" fill="#ff6b9a" ${ST()}/><path d="M0 0 L15 -10 L15 10Z" fill="#ff6b9a" ${ST()}/><circle r="5" fill="#ff9cbc" ${ST()}/></g>`}),
 crown:()=>({f:`<path d="M40 32 L42 8 L52 20 L60 2 L68 20 L78 8 L80 32Z" fill="#ffd23f" ${ST()}/><circle cx="60" cy="11" r="3.4" fill="#ff5a6e"/><circle cx="47" cy="25" r="2.6" fill="#4aa8ff"/><circle cx="73" cy="25" r="2.6" fill="#4aa8ff"/>`}),
 partyhat:()=>({f:`<path d="M46 32 L62 -10 L76 30Z" fill="#8f6bff" ${ST()}/><path d="M52 18 L71 22M57 7 L68 10" stroke="#ffd23f" stroke-width="4"/><circle cx="62" cy="-11" r="6.5" fill="#ff6b9a" ${ST()}/>`}),
 flowercrown:()=>({f:[[34,34,'#ff8fb3'],[46,27,'#ffd23f'],[60,24,'#ff6b57'],[74,27,'#b38bff'],[86,34,'#5ec8ff']].map(([x,y,c])=>`<g transform="translate(${x} ${y})">${[0,72,144,216,288].map(a=>`<circle cx="${(5*Math.cos(a*Math.PI/180)).toFixed(1)}" cy="${(5*Math.sin(a*Math.PI/180)).toFixed(1)}" r="4.2" fill="${c}"/>`).join('')}<circle r="3" fill="#fff4b0"/></g>`).join('')}),
 beanie:()=>({f:`<path d="M34 34 Q36 4 60 4 Q84 4 86 34Z" fill="#4db6ac" ${ST()}/><rect x="32" y="27" width="56" height="11" rx="5.5" fill="#2e8f86" ${ST()}/><circle cx="60" cy="2" r="7" fill="#fff" ${ST()}/>`}),
 pirate:()=>({f:`<path d="M26 34 Q60 -8 94 34 Q60 22 26 34Z" fill="#2b2233" ${ST()}/><circle cx="60" cy="19" r="5" fill="#fff"/><path d="M56 25 L64 25" stroke="#fff" stroke-width="2"/>`}),
 cowboy:()=>({f:`<ellipse cx="60" cy="30" rx="42" ry="7" fill="#b07a44" ${ST()}/><path d="M42 30 Q39 5 52 8 Q60 14 68 8 Q81 5 78 30Z" fill="#c9905c" ${ST()}/><path d="M42 23 L78 23" stroke="#6a4429" stroke-width="4"/>`}),
 headphones:()=>({f:`<path d="M22 64 Q22 12 60 12 Q98 12 98 64" fill="none" stroke="${OL}" stroke-width="8"/><path d="M22 64 Q22 12 60 12 Q98 12 98 64" fill="none" stroke="#ff6b57" stroke-width="4.5"/><rect x="11" y="54" width="15" height="24" rx="7" fill="#ff6b57" ${ST()}/><rect x="94" y="54" width="15" height="24" rx="7" fill="#ff6b57" ${ST()}/>`}),
 spacehelmet:()=>({f:`<circle cx="60" cy="68" r="57" fill="rgba(190,230,255,.16)" stroke="#e3f5ff" stroke-width="4"/><path d="M28 42 Q38 24 56 20" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".85"/><rect x="34" y="118" width="52" height="11" rx="5" fill="#cfd8ea" ${ST()}/>`}),
 round:sp=>{const y=sp.ey||70;return{f:`<g fill="rgba(255,255,255,.2)" stroke="${OL}" stroke-width="3"><circle cx="43" cy="${y}" r="12.5"/><circle cx="77" cy="${y}" r="12.5"/></g><path d="M55.5 ${y-1} Q60 ${y-5} 64.5 ${y-1}" stroke="${OL}" stroke-width="3" fill="none"/>`}},
 heart:sp=>{const y=sp.ey||70,h=x=>`<path transform="translate(${x} ${y+3}) scale(1.45)" d="M0 6 C-11 -2 -10 -11 -4 -11 C-1 -11 0 -8 0 -7 C0 -8 1 -11 4 -11 C10 -11 11 -2 0 6Z" fill="rgba(255,80,140,.55)" stroke="#c2185b" stroke-width="2"/>`;return{f:h(43)+h(77)+`<path d="M53 ${y-2} L67 ${y-2}" stroke="#c2185b" stroke-width="2.5"/>`}},
 starshades:sp=>{const y=sp.ey||70,s=x=>`<path transform="translate(${x} ${y})" d="${Array.from({length:10},(_,i)=>{const a=i*Math.PI/5-Math.PI/2,r=i%2?7:15;return(i?'L':'M')+(r*Math.cos(a)).toFixed(1)+' '+(r*Math.sin(a)).toFixed(1)}).join(' ')}Z" fill="rgba(40,30,70,.78)" stroke="#ffc53d" stroke-width="2.5" stroke-linejoin="round"/>`;return{f:s(43)+s(77)+`<path d="M55 ${y-2} L65 ${y-2}" stroke="#ffc53d" stroke-width="3"/>`}},
 mask:sp=>{const y=sp.ey||70;return{f:`<path fill-rule="evenodd" d="M20 ${y-9} Q60 ${y-22} 100 ${y-9} L97 ${y+10} Q60 ${y+17} 23 ${y+10}Z M36.5 ${y} a6.5 8 0 1 0 13 0 a6.5 8 0 1 0 -13 0Z M70.5 ${y} a6.5 8 0 1 0 13 0 a6.5 8 0 1 0 -13 0Z" fill="#5b3fd1" stroke="${OL}" stroke-width="2"/>`}},
 goggles:sp=>{const y=sp.ey||70;return{f:`<path d="M14 ${y-2} L106 ${y-2}" stroke="#5a4a3a" stroke-width="7"/><g fill="rgba(120,220,255,.45)" stroke="${OL}" stroke-width="3"><circle cx="43" cy="${y}" r="13"/><circle cx="77" cy="${y}" r="13"/></g><g fill="#fff" opacity=".8"><circle cx="38" cy="${y-5}" r="3"/><circle cx="72" cy="${y-5}" r="3"/></g>`}},
 bowtie:()=>({f:`<path d="M60 92 L45 83 L45 101Z" fill="#e53950" ${ST()}/><path d="M60 92 L75 83 L75 101Z" fill="#e53950" ${ST()}/><circle cx="60" cy="92" r="4.8" fill="#ff6b7d" ${ST()}/>`}),
 bandana:()=>({f:`<path d="M34 85 Q60 94 86 85 L60 110Z" fill="#e8483a" ${ST()}/><g fill="#fff"><circle cx="53" cy="94" r="1.9"/><circle cx="66" cy="95" r="1.9"/><circle cx="60" cy="102" r="1.6"/></g>`}),
 scarf:()=>({f:`<path d="M30 83 Q60 96 90 83 L90 94 Q60 107 30 94Z" fill="#4c8dff" ${ST()}/><path d="M76 96 L79 119 L90 117 L87 93Z" fill="#4c8dff" ${ST()}/><path d="M34 88 Q60 99 86 88" stroke="#ffd23f" stroke-width="3" stroke-dasharray="6 6" fill="none"/>`}),
 necklace:()=>({f:[[38,86],[44,91],[51,95],[60,97],[69,95],[76,91],[82,86]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${i===3?5.5:3.8}" fill="${i===3?'#ff8fb3':'#fff8ec'}" stroke="${OL}" stroke-width="1.8"/>`).join('')}),
 medal:()=>({f:`<path d="M48 82 L60 100 L72 82" fill="none" stroke="#4a7bd1" stroke-width="7"/><circle cx="60" cy="104" r="9" fill="#ffc53d" ${ST()}/><path d="M60 98.5 l1.8 3.6 4 .6 -2.9 2.8 .7 4 -3.6 -1.9 -3.6 1.9 .7 -4 -2.9 -2.8 4 -.6Z" fill="#fff4b0"/>`}),
 cape:()=>({b:`<path d="M24 58 Q6 110 16 126 L104 126 Q114 110 96 58Z" fill="#c62f5a" ${ST()}/><path d="M30 70 Q18 110 24 122" stroke="#e8577f" stroke-width="3" fill="none"/>`,f:`<circle cx="42" cy="88" r="4" fill="#ffc53d" ${ST()}/><circle cx="78" cy="88" r="4" fill="#ffc53d" ${ST()}/>`}),
 flower:()=>({f:`<path d="M100 112 Q104 92 110 78" stroke="#3a9a4a" stroke-width="4" fill="none"/><path d="M103 98 Q94 92 96 86 Q104 90 103 98Z" fill="#5cc26a"/><g transform="translate(111 72)">${[0,72,144,216,288].map(a=>`<circle cx="${(6*Math.cos(a*Math.PI/180)).toFixed(1)}" cy="${(6*Math.sin(a*Math.PI/180)).toFixed(1)}" r="5.5" fill="#ff8fb3" stroke="${OL}" stroke-width="1.5"/>`).join('')}<circle r="4" fill="#ffd23f" stroke="${OL}" stroke-width="1.5"/></g>`}),
 icecream:()=>({f:`<path d="M99 88 L108 114 L117 88Z" fill="#e2a766" ${ST()}/><path d="M102 94 L114 94M104 101 L112 101" stroke="#b97a3e" stroke-width="2"/><circle cx="108" cy="82" r="10" fill="#ffb3cf" ${ST()}/><circle cx="110" cy="71" r="3.5" fill="#e53950" ${ST()}/>`}),
 balloon:()=>({f:`<path d="M100 102 Q114 84 116 50" stroke="${OL}" stroke-width="1.8" fill="none"/><ellipse cx="118" cy="34" rx="14" ry="17" fill="#ff5a6e" ${ST()}/><path d="M115 50 L121 50 L118 55Z" fill="#ff5a6e" ${ST()}/><ellipse cx="112" cy="27" rx="3.5" ry="6" fill="#fff" opacity=".6"/>`}),
 book:()=>({f:`<g transform="rotate(-12 106 96)"><rect x="94" y="82" width="26" height="30" rx="3" fill="#4c8dff" ${ST()}/><path d="M99 88 H115 M99 94 H112" stroke="#fff" stroke-width="2.5"/><rect x="94" y="82" width="5" height="30" fill="#2f63c9"/></g>`}),
 wand:()=>({f:`<path d="M98 108 L118 70" stroke="#6b4a2b" stroke-width="4" stroke-linecap="round"/><path transform="translate(120 64)" d="M0 -12 L3.5 -4 12 -3.5 5.5 2.5 7.5 11 0 6.5 -7.5 11 -5.5 2.5 -12 -3.5 -3.5 -4Z" fill="#ffd23f" ${ST()}/><g fill="#fff4b0"><circle cx="132" cy="54" r="2"/><circle cx="108" cy="56" r="1.6"/></g>`}),
 fish:()=>({f:`<g transform="translate(108 92) rotate(-20)"><ellipse rx="13" ry="8" fill="#5ec8ff" ${ST()}/><path d="M12 0 L22 -8 L22 8Z" fill="#5ec8ff" ${ST()}/><circle cx="-6" cy="-2" r="1.8" fill="${OL}"/></g>`}),
 telescope:()=>({f:`<g transform="rotate(-30 104 96)"><rect x="92" y="88" width="36" height="12" rx="3" fill="#8f6bff" ${ST()}/><rect x="124" y="85" width="8" height="18" rx="2" fill="#ffd23f" ${ST()}/></g>`}),
 toyrocket:()=>({f:`<g transform="translate(110 90) rotate(20)"><path d="M0 -24 C8 -16 9 -2 7 6 H-7 C-9 -2 -8 -16 0 -24Z" fill="#fff" ${ST()}/><circle cy="-10" r="3.5" fill="#5ec8ff" ${ST()}/><path d="M-7 2 L-13 10 L-6 8Z M7 2 L13 10 L6 8Z" fill="#ff5a6e" ${ST()}/><path d="M-4 7 L0 16 L4 7Z" fill="#ffc53d"/></g>`}),
};
function ST(){return `stroke="${OL}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`}
function wearSVG(w,sp){let b='',f='';if(!w)return{b,f};['neck','face','hat','hold'].forEach(slot=>{const id=w[slot];if(id&&ACCART[id]){const r=ACCART[id](sp);b+=r.b||'';f+=r.f||''}});return{b,f}}

/* ---------- unlocks, challenges ---------- */
const SLOTNAME={hat:'hat',face:'glasses',neck:'neckwear',hold:'held item',bg:'scene',decor:'decoration'};
const WEAR_SLOTS=['hat','face','neck','hold'];
function allItems(){const out=[];for(const k in CFG.items)CFG.items[k].forEach(it=>out.push({...it,slot:k}));return out}
const isOwned=it=>it.free||CFG.stat(it.need[0])>=it.need[1];
function checkUnlocks(silent){if(!S)return[];S.owned=S.owned||[];const newly=[];allItems().forEach(it=>{if(isOwned(it)&&!S.owned.includes(it.id)){S.owned.push(it.id);if(!it.free&&!silent)newly.push(it)}});
 if(newly.length){S.newItems=(S.newItems||[]).concat(newly.map(i=>i.id));newly.forEach((it,i)=>setTimeout(()=>{toast(`Unlocked a new ${SLOTNAME[it.slot]}: <b>${esc(it.name)}</b>! Check Dress Up.`);tone([523,784,1047],.08,'triangle')},1200+i*3000))}return newly}
function bump(k,n=1){S.stats=S.stats||{};S.stats[k]=(S.stats[k]||0)+n}
const wearOf=key=>(S.outfit&&S.outfit[key])||{};
function petArt(p,size,cls=''){return CFG.art(p.id,size,cls,wearOf(p.key))}
const newIn=slot=>(S.newItems||[]).filter(id=>{const it=allItems().find(x=>x.id===id);return it&&(slot?it.slot===slot:true)}).length;
function exploreButtons(){const n=newIn();return`<div class="xbtns"><button class="btn ghost sm" data-act="guide">${CFG.guideIcon} ${CFG.guideName}</button><button class="btn sm ${CFG.dressBtnCls}" data-act="dress">${ICON.star} Dress Up${n?`<span class="badge">${n}</span>`:''}</button></div>`}

/* ---------- dress up ---------- */
let DU={pet:0,tab:'hat'};
function tileHTML(it,pet){const owned=isOwned(it),slot=DU.tab,isNew=(S.newItems||[]).includes(it.id);let on=false,prev='';
 if(WEAR_SLOTS.includes(slot)){on=pet&&wearOf(pet.key)[slot]===it.id;const p=pet||CFG.samplePet;prev=CFG.art(p.id,'md','',{[slot]:it.id})}
 else if(slot==='bg'){on=(S.scene&&S.scene.bg)===it.id;prev=`<div class="bgthumb">${CFG.sceneSVG(it.id,[])}</div>`}
 else{on=(S.scene&&S.scene.decor||[]).includes(it.id);prev=`<svg class="decicon" viewBox="-70 -130 140 140" aria-hidden="true">${CFG.decorArt(it.id)}</svg>`}
 const v=it.free?0:Math.min(CFG.stat(it.need[0]),it.need[1]);
 return`<button class="tile2 ${owned?'':'locked'} ${on?'on':''}" data-act="du-item" data-id="${it.id}" aria-pressed="${on}" aria-label="${esc(it.name)}${owned?'':' (locked)'}">${isNew?'<span class="newtag">New!</span>':''}<span class="tprev">${prev}</span><span class="tname">${esc(it.name)}</span>${owned?(on?'<span class="tstate">Wearing</span>'.replace('Wearing',WEAR_SLOTS.includes(slot)?'Wearing':'On'):''):`<span class="tlock">${LOCK}<span>${esc(it.need[2])}</span><span class="tbar"><i style="width:${v/it.need[1]*100}%"></i></span><span class="tprog">${v} / ${it.need[1]}</span></span>`}</button>`}
const LOCK=`<svg viewBox="0 0 24 24" class="li" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2.5" fill="currentColor"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="2.4" fill="none"/></svg>`;
const DTABS=[['hat','Hats'],['face','Glasses'],['neck','Neckwear'],['hold','Hold'],['bg','Scenes'],['decor','Decorations'],['goals','Challenges']];
function goalsHTML(){const items=allItems(),owned=items.filter(isOwned).length;const locked=items.filter(it=>!isOwned(it)).map(it=>({it,r:Math.min(1,CFG.stat(it.need[0])/it.need[1])})).sort((a,b)=>b.r-a.r);
 return`<p class="goalsum">You’ve earned <b>${owned}</b> of <b>${items.length}</b> items. Keep going to unlock the rest!</p><div class="goals2">${locked.map(({it,r})=>`<div class="goal2"><span class="gprev">${WEAR_SLOTS.includes(it.slot)?CFG.art((CFG.pets()[DU.pet]||CFG.samplePet).id,'sm','',{[it.slot]:it.id}):it.slot==='bg'?`<span class="bgthumb sm">${CFG.sceneSVG(it.id,[])}</span>`:`<svg class="decicon" viewBox="-70 -130 140 140">${CFG.decorArt(it.id)}</svg>`}</span><span class="gtext"><b>${esc(it.name)}</b> <span class="muted">${SLOTNAME[it.slot]}</span><br>${esc(it.need[2])}<span class="tbar"><i style="width:${r*100}%"></i></span><span class="tprog">${Math.min(CFG.stat(it.need[0]),it.need[1])} / ${it.need[1]}</span></span></div>`).join('')||'<p>You unlocked everything. Amazing!</p>'}</div>`}
function renderDress(){screen='dress';hush();const pets=CFG.pets();if(DU.pet>=pets.length)DU.pet=0;const pet=pets[DU.pet]||null;const y=scrollY;
 app.innerHTML=`${topbar()}<div class="xpage"><div class="xhead"><button class="btn ghost sm" data-act="go-home">${ICON.back} Home</button><h1>Dress Up</h1></div>
 <div class="dress-grid"><section class="box stagebox"><div class="stage">${CFG.sceneSVG(S.scene.bg,S.scene.decor)}<div class="stagepet">${pet?petArt(pet,'xl','bob'):''}</div></div>
  ${pets.length?`<div class="petpick">${pets.map((p,i)=>`<button class="${i===DU.pet?'on':''}" data-act="du-pet" data-i="${i}">${petArt(p,'sm')}<span>${esc(p.name)}</span></button>`).join('')}</div>${pet&&Object.values(wearOf(pet.key)).some(Boolean)?`<button class="linkbtn" data-act="du-clear">Take everything off ${esc(pet.name)}</button>`:''}`:`<p class="muted" style="padding:0 14px">${CFG.noPets}</p>`}</section>
 <section class="box shopbox"><div class="dtabs" role="tablist">${DTABS.map(([k,l])=>`<button role="tab" aria-selected="${DU.tab===k}" class="${DU.tab===k?'on':''}" data-act="du-tab" data-t="${k}">${l}${k!=='goals'&&newIn(k)?'<i class="dot"></i>':''}</button>`).join('')}</div>
  ${DU.tab==='goals'?goalsHTML():`<p class="shophint">${WEAR_SLOTS.includes(DU.tab)?(pet?`Tap to put it on ${esc(pet.name)}. Tap again to take it off.`:'Pick a friend first.'):DU.tab==='bg'?'Pick the scene for your '+CFG.placeName+'.':'Pick up to 3 decorations for your '+CFG.placeName+'.'} Locked items show how to earn them.</p><div class="items2">${CFG.items[DU.tab].map(it=>tileHTML(it,pet)).join('')}</div>`}</section></div></div>`;
 S.newItems=(S.newItems||[]).filter(id=>{const it=allItems().find(x=>x.id===id);return it&&it.slot!==DU.tab});wireGate();scrollTo(0,y)}
Object.assign(ACT,{
 dress(){DU.tab=DU.tab||'hat';renderDress()},
 'du-tab'(b){DU.tab=b.dataset.t;renderDress()},
 'du-pet'(b){DU.pet=+b.dataset.i;sfx.tap();renderDress()},
 'du-clear'(){const p=CFG.pets()[DU.pet];if(p){S.outfit[p.key]={};save();renderDress()}},
 'du-item'(b){const it=allItems().find(x=>x.id===b.dataset.id);if(!it)return;if(!isOwned(it)){say(`To unlock the ${it.name}: ${it.need[2]}`);toast(`${LOCK_TXT} ${esc(it.need[2])}`);return}
  const pets=CFG.pets(),pet=pets[DU.pet];S.scene=S.scene||{bg:CFG.items.bg[0].id,decor:[]};
  if(WEAR_SLOTS.includes(it.slot)){if(!pet){toast(CFG.noPets);return}S.outfit=S.outfit||{};const w={...(S.outfit[pet.key]||{})};w[it.slot]=w[it.slot]===it.id?null:it.id;S.outfit[pet.key]=w;if(w[it.slot])tone([660,990],.06,'triangle')}
  else if(it.slot==='bg'){S.scene.bg=it.id;tone([520,780],.06,'triangle')}
  else{const d=S.scene.decor.slice();const i=d.indexOf(it.id);if(i>=0)d.splice(i,1);else{d.push(it.id);if(d.length>3)d.shift()}S.scene.decor=d;tone([600,900],.05,'triangle')}
  save();renderDress()},
});
const LOCK_TXT='Locked:';

/* ---------- field guide + quizzes ---------- */
const realImg=(id,cls='')=>`<img class="realpic ${cls}" src="${CFG.imgDir}/${id}.jpg" alt="${esc(CFG.spec[id].cap)}" onerror="this.style.display='none'">`;
function renderGuide(){screen='guide';hush();const ids=Object.keys(CFG.spec),have=new Set(CFG.pets().map(p=>p.id)),read=S.guide||[],qz=S.quiz||[];
 app.innerHTML=`${topbar()}<div class="xpage"><div class="xhead"><button class="btn ghost sm" data-act="go-home">${ICON.back} Home</button><h1>${CFG.guideName}</h1></div>
 <p class="xintro">${CFG.guideIntro} <b>${read.length}</b> of ${ids.length} explored · <b>${qz.length}</b> quizzes passed.</p>
 <div class="guide-grid">${ids.map(id=>{const r=CFG.spec[id];return`<button class="gcard" data-act="learn" data-id="${id}"><span class="gimg"><img src="${CFG.imgDir}/${id}.jpg" alt="" loading="lazy" onerror="this.style.visibility='hidden'"><span class="gface">${CFG.art(id,'sm')}</span></span><span class="gname">${esc(r.sp)}</span><span class="gmeta">${have.has(id)?`<span class="mini2 have">${CFG.haveLabel}</span>`:''}${qz.includes(id)?`<span class="mini2 gold">${ICON.star} Quiz</span>`:''}${read.includes(id)?'':'<span class="mini2 new">New</span>'}</span></button>`}).join('')}</div></div>`;wireGate();say(`${CFG.guideName}. Tap any animal to learn about it.`)}
function openLearn(id,who){const r=CFG.spec[id];if(!r)return;S.guide=S.guide||[];if(!S.guide.includes(id)){S.guide.push(id);save()}const m=$('#modal');
 const pet=CFG.pets().find(p=>p.id===id);
 m.innerHTML=`<div class="box learn" role="dialog" aria-modal="true" aria-label="${esc(r.sp)}"><div class="learn-h">${pet?petArt(pet,'md'):CFG.art(id,'md')}<div><div class="tag">Real animal facts</div><h2>${esc(r.sp)}</h2></div><button class="iconbtn" id="lClose" aria-label="Close">${ICON.x}</button></div>${realImg(id,'big')}<p class="cap">${esc(r.cap)}</p><div id="lBody"><ul class="facts">${r.intro.map(t=>`<li>${esc(t)}</li>`).join('')}</ul><div class="row"><button class="btn sm ${CFG.dressBtnCls}" id="lQuiz">${ICON.star} Quiz me!${(S.quiz||[]).includes(id)?'':` <span class="muted2">+${CFG.quizReward}</span>`}</button><button class="btn ghost sm" id="lSay">${ICON.speaker} Hear it again</button><button class="btn ghost sm" id="lDone">Back</button></div></div><p class="credit">${esc(r.credit)}</p></div>`;
 m.hidden=false;const speak=()=>say([who?`Hi! I'm ${who}!`:'',400,`This is ${r.say||r.sp}.`,500,r.cap,700,...r.intro.flatMap(t=>[t,450])]);speak();
 const close=()=>{m.hidden=true;hush();if(screen==='guide')renderGuide()};$('#lClose').onclick=close;$('#lDone').onclick=close;$('#lSay').onclick=speak;$('#lQuiz').onclick=()=>runQuiz(id);m.onclick=e=>{if(e.target===m)close()}}
function runQuiz(id){const r=CFG.spec[id],qs=r.quiz.map(q=>({q:q[0],c:shuffle(q.slice(1).map((t,i)=>({t,ok:i===0})))}));let i=0,score=0;const body=$('#lBody');
 const show=()=>{if(i>=qs.length)return done();const q=qs[i];body.innerHTML=`<div class="quiz"><div class="qn">Question ${i+1} of ${qs.length}</div><div class="qq">${esc(q.q)}</div><div class="qc">${q.c.map((c,k)=>`<button data-k="${k}">${esc(c.t)}</button>`).join('')}</div><div class="qfb" id="qfb"></div></div>`;
  say([q.q,600,...q.c.flatMap((c,k)=>[k?(k===q.c.length-1?'or':''):'',c.t,350]).filter(x=>x!=='')]);
  $$('.qc button',body).forEach(b=>b.onclick=()=>{if(body.dataset.lock==='1')return;body.dataset.lock='1';const c=q.c[+b.dataset.k];const right=$$('.qc button',body)[q.c.findIndex(x=>x.ok)];right.classList.add('right');
   if(c.ok){score++;sfx.good();$('#qfb').innerHTML=`<b>That’s right!</b>`;say('That is right!')}else{b.classList.add('wrong');sfx.bad();$('#qfb').innerHTML=`The answer is <b>${esc(q.c.find(x=>x.ok).t)}</b>.`;say(['The answer is',q.c.find(x=>x.ok).t])}
   setTimeout(()=>{body.dataset.lock='0';i++;show()},1700)})};
 const done=()=>{const pass=score>=2;S.quiz=S.quiz||[];let msg='';if(pass&&!S.quiz.includes(id)){S.quiz.push(id);CFG.gain(CFG.quizReward);msg=`You earned ${CFG.quizReward} ${CFG.curName}!`;burst();sfx.win()}else if(pass){msg='You already earned the reward for this one. Nice review!'}save();
  body.innerHTML=`<div class="quiz done"><div class="qq">${score} out of ${qs.length} right!</div><p>${pass?`Great job! ${msg}`:'Read the facts again and try one more time. You can do it!'}</p><div class="row"><button class="btn ghost sm" id="qAgain">Try again</button><button class="btn sm ${CFG.dressBtnCls}" id="qBack">Back to facts</button></div></div>`;
  say([`${score} out of ${qs.length} right!`,400,pass?`Great job! ${msg}`:'Read the facts again and try one more time.']);$('#qAgain').onclick=()=>runQuiz(id);$('#qBack').onclick=()=>openLearn(id)};
 body.dataset.lock='0';show()}
Object.assign(ACT,{guide(){renderGuide()},learn(b){openLearn(b.dataset.id)}});
