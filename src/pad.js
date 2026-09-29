/* ---------- scratch pad + number lines ---------- */
const PAD={open:false,strokes:[],lines:[],tool:'pen',color:'#132530',grid:true,jump:false,sel:null,penSeen:false,form:false};
const PENS=[['#132530','Black pen'],['#1f6fd1','Blue pen'],['#e8483a','Red pen'],['#1b8f66','Green pen']];
let padCur=null;
const isMathQ=q=>q&&SK[q.skill]&&SK[q.skill].area==='math';
function padBtn(){return`<button class="btn ghost sm padtoggle" data-act="pad" aria-pressed="${PAD.open}">${ICON.pencil} ${PAD.open?'Hide scratch pad':'Scratch pad'}</button>`}
function padHTML(){return`<section class="box pad" id="pad" aria-label="Scratch pad">
 <div class="padbar"><div class="seg">${PENS.map(([c,l])=>`<button class="tool ${PAD.tool==='pen'&&PAD.color===c?'on':''}" data-act="pad-pen" data-c="${c}" aria-label="${l}"><i style="background:${c}"></i></button>`).join('')}<button class="tool ${PAD.tool==='eraser'?'on':''}" data-act="pad-eraser" aria-label="Eraser"><svg viewBox="0 0 24 24" class="li"><path d="M4 16l8-8 8 8-4 4H8z" fill="#ffc9d2" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M4 20h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button></div>
 <div class="seg"><button class="tbtn" data-act="pad-undo">Undo</button><button class="tbtn" data-act="pad-clear">Clear</button><button class="tbtn ${PAD.grid?'on':''}" data-act="pad-grid">Grid</button></div>
 <div class="seg"><button class="tbtn nl" data-act="pad-nlform">+ Number line</button><button class="tbtn ${PAD.jump?'on':''}" data-act="pad-jump" ${PAD.lines.length?'':'disabled'}>Draw jumps</button></div></div>
 <div class="nlform" id="nlform" ${PAD.form?'':'hidden'}><div class="presets"><span class="muted">Quick lines:</span>${[['0 to 10',0,10,1],['0 to 20',0,20,1],['0 to 100 by 10s',0,100,10],['0 to 1 by tenths',0,1,.1]].map(([t,a,b,s])=>`<button class="tbtn" data-act="pad-nl" data-a="${a}" data-b="${b}" data-s="${s}">${t}</button>`).join('')}${[2,3,4,6,8].map(d=>`<button class="tbtn" data-act="pad-nlf" data-d="${d}">0 to 1 in ${({2:'halves',3:'thirds',4:'fourths',6:'sixths',8:'eighths'})[d]}</button>`).join('')}</div>
 <div class="custom"><span class="muted">Make your own:</span><label>From <input id="nlA" inputmode="decimal" value="0"></label><label>To <input id="nlB" inputmode="decimal" value="10"></label><label>Count by <input id="nlS" inputmode="decimal" value="1"></label><button class="btn teal sm" data-act="pad-nlc">Add line</button></div></div>
 <div class="padwrap ${PAD.grid?'grid':''}" id="padwrap"><canvas id="nlc" aria-hidden="true"></canvas><canvas id="ink" aria-label="Drawing area"></canvas><div class="padhint" id="padhint" ${PAD.strokes.length||PAD.lines.length?'hidden':''}>${PAD.jump?'Tap a number, then tap another to draw a jump.':'Write with your finger or Apple Pencil. Add a number line to count jumps.'}</div></div></section>`}
function padMount(){const lay=$('.qlayout');if(!lay)return;const old=$('#pad');if(old)old.remove();lay.classList.toggle('with-pad',PAD.open);if(PAD.open){lay.insertAdjacentHTML('beforeend',padHTML());padInit()}const t=$('.padtoggle');if(t)t.outerHTML=padBtn()}
function padRefreshBar(){const p=$('#pad');if(!p)return;const tmp=document.createElement('div');tmp.innerHTML=padHTML();p.querySelector('.padbar').replaceWith(tmp.querySelector('.padbar'));const f=p.querySelector('#nlform');f.hidden=!PAD.form;const h=$('#padhint');if(h){h.hidden=!!(PAD.strokes.length||PAD.lines.length)&&!PAD.jump;h.textContent=PAD.jump?'Tap a number, then tap another to draw a jump.':'Write with your finger or Apple Pencil. Add a number line to count jumps.'}$('#padwrap').classList.toggle('grid',PAD.grid)}
function padInit(){const w=$('#padwrap');if(!w)return;const dpr=window.devicePixelRatio||1;['ink','nlc'].forEach(id=>{const c=$('#'+id);c.width=Math.round(w.clientWidth*dpr);c.height=Math.round(w.clientHeight*dpr);c.getContext('2d').setTransform(dpr,0,0,dpr,0,0)});padRedraw();
 const ink=$('#ink'),ctx=ink.getContext('2d');const pt=e=>{const r=ink.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}};
 ink.onpointerdown=e=>{if(e.pointerType==='pen')PAD.penSeen=true;else if(e.pointerType==='touch'&&PAD.penSeen)return;e.preventDefault();const p=pt(e);if(PAD.jump){padJumpTap(p);return}try{ink.setPointerCapture(e.pointerId)}catch(_){}padCur={c:PAD.color,w:PAD.tool==='eraser'?24:3.4,er:PAD.tool==='eraser',pts:[p]};PAD.strokes.push(padCur);drawStroke(ctx,padCur,0);const h=$('#padhint');if(h)h.hidden=true};
 ink.onpointermove=e=>{if(!padCur)return;e.preventDefault();const evs=e.getCoalescedEvents?e.getCoalescedEvents():[e];const start=padCur.pts.length-1;(evs.length?evs:[e]).forEach(ev=>padCur.pts.push(pt(ev)));drawStroke(ctx,padCur,start)};
 ink.onpointerup=ink.onpointercancel=()=>{padCur=null}}
function drawStroke(ctx,s,from){const p=s.pts;ctx.save();ctx.globalCompositeOperation=s.er?'destination-out':'source-over';ctx.strokeStyle=s.c;ctx.fillStyle=s.c;ctx.lineWidth=s.w;ctx.lineCap='round';ctx.lineJoin='round';
 if(p.length===1){ctx.beginPath();ctx.arc(p[0].x,p[0].y,s.w/2,0,6.283);ctx.fill()}else{ctx.beginPath();ctx.moveTo(p[Math.max(0,from)].x,p[Math.max(0,from)].y);for(let i=Math.max(1,from+1);i<p.length;i++)ctx.lineTo(p[i].x,p[i].y);ctx.stroke()}ctx.restore()}
function padRedraw(){const ink=$('#ink');if(!ink)return;const ctx=ink.getContext('2d');ctx.clearRect(0,0,ink.width,ink.height);PAD.strokes.forEach(s=>drawStroke(ctx,s,0));drawLines()}
const nlX=(L,i,W)=>36+i/L.n*(W-72);
function nlLabel(L,i){if(L.d)return i===0?'0':i===L.d?'1':`${i}/${L.d}`;return fmtN(L.from+i*L.step)}
function drawLines(){const c=$('#nlc');if(!c)return;const ctx=c.getContext('2d'),W=c.clientWidth;ctx.clearRect(0,0,c.width,c.height);
 PAD.lines.forEach(L=>{const y=L.y;ctx.strokeStyle='#132530';ctx.fillStyle='#132530';ctx.lineWidth=3;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(16,y);ctx.lineTo(W-16,y);ctx.stroke();
  [[16,1],[W-16,-1]].forEach(([x,dir])=>{ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+dir*10,y-6);ctx.lineTo(x+dir*10,y+6);ctx.closePath();ctx.fill()});
  const k=Math.max(1,Math.ceil((L.n+1)/(W<500?8:13)));ctx.font='600 14px Lexend, system-ui, sans-serif';ctx.textAlign='center';
  for(let i=0;i<=L.n;i++){const x=nlX(L,i,W),major=i%k===0||i===L.n;ctx.lineWidth=major?3:2;ctx.beginPath();ctx.moveTo(x,y-(major?11:7));ctx.lineTo(x,y+(major?11:7));ctx.stroke();if(major)ctx.fillText(nlLabel(L,i),x,y+30)}
  L.jumps.forEach(j=>{const xa=nlX(L,j.a,W),xb=nlX(L,j.b,W),mid=(xa+xb)/2,h=Math.min(46,Math.abs(xb-xa)*.4+14);ctx.strokeStyle='#e8483a';ctx.fillStyle='#e8483a';ctx.lineWidth=2.6;ctx.beginPath();ctx.moveTo(xa,y-8);ctx.quadraticCurveTo(mid,y-8-2*h,xb,y-8);ctx.stroke();
   const dir=xb>xa?1:-1;ctx.beginPath();ctx.moveTo(xb,y-7);ctx.lineTo(xb-dir*9,y-15);ctx.lineTo(xb-dir*2,y-18);ctx.closePath();ctx.fill();
   const diff=j.b-j.a,sign=diff>0?'+':'−',lab=L.d?`${sign}${Math.abs(diff)}/${L.d}`:`${sign}${fmtN(Math.abs(diff)*L.step)}`;ctx.font='700 15px Lexend, system-ui, sans-serif';ctx.fillText(lab,mid,y-12-h)});
  if(PAD.sel&&PAD.sel.L===L){ctx.fillStyle='#ffc53d';ctx.strokeStyle='#132530';ctx.lineWidth=2;ctx.beginPath();ctx.arc(nlX(L,PAD.sel.i,W),y,9,0,6.283);ctx.fill();ctx.stroke()}})}
function padAddLine(from,to,step,d){if(PAD.lines.length>=3){toast('Up to 3 number lines. Tap Clear to start over.');return}let L;
 if(d)L={from:0,to:1,step:1/d,d,n:d};else{const n=(to-from)/step;if(!(step>0)||!(to>from)||!isFinite(n)){toast('Check your numbers: “To” must be bigger than “From.”');return}if(Math.abs(n-Math.round(n))>1e-6){toast('Counting by '+fmtN(step)+' doesn’t land on '+fmtN(to)+'. Try another number.');return}if(n>50){toast('That’s too many marks. Count by a bigger number.');return}L={from,to,step,n:Math.round(n)}}
 const h=$('#padwrap').clientHeight;L.y=Math.min(h-40,86+PAD.lines.length*Math.max(92,(h-60)/3.2));L.jumps=[];PAD.lines.push(L);PAD.form=false;PAD.jump=true;padRefreshBar();drawLines();sfx.tap()}
function padJumpTap(p){const W=$('#nlc').clientWidth;let best=null;PAD.lines.forEach(L=>{const dy=Math.abs(p.y-L.y);if(dy<60&&(!best||dy<best.dy)){const i=Math.max(0,Math.min(L.n,Math.round((p.x-36)/(W-72)*L.n)));best={L,i,dy}}});if(!best){PAD.sel=null;drawLines();return}
 if(PAD.sel&&PAD.sel.L===best.L&&PAD.sel.i!==best.i){best.L.jumps.push({a:PAD.sel.i,b:best.i});PAD.sel={L:best.L,i:best.i};tone([660,880],.05)}else{PAD.sel={L:best.L,i:best.i};sfx.tap()}drawLines()}
function padReset(){PAD.strokes=[];PAD.lines=[];PAD.sel=null;PAD.jump=false;PAD.form=false}
Object.assign(ACT,{
 pad(){PAD.open=!PAD.open;padMount();if(PAD.open)setTimeout(()=>{const p=$('#pad');if(p&&innerWidth<900)p.scrollIntoView({behavior:REDUCED?'auto':'smooth',block:'start'})},50)},
 'pad-pen'(b){PAD.tool='pen';PAD.color=b.dataset.c;PAD.jump=false;padRefreshBar()},
 'pad-eraser'(){PAD.tool='eraser';PAD.jump=false;padRefreshBar()},
 'pad-undo'(){if(PAD.strokes.length)PAD.strokes.pop();else{const L=PAD.lines[PAD.lines.length-1];if(L&&L.jumps.length)L.jumps.pop();else if(L)PAD.lines.pop()}PAD.sel=null;if(!PAD.lines.length)PAD.jump=false;padRefreshBar();padRedraw()},
 'pad-clear'(){padReset();padRefreshBar();padRedraw()},
 'pad-grid'(){PAD.grid=!PAD.grid;padRefreshBar()},
 'pad-nlform'(){PAD.form=!PAD.form;padRefreshBar()},
 'pad-jump'(){PAD.jump=!PAD.jump;PAD.sel=null;padRefreshBar();drawLines()},
 'pad-nl'(b){padAddLine(+b.dataset.a,+b.dataset.b,+b.dataset.s)},
 'pad-nlf'(b){padAddLine(0,1,0,+b.dataset.d)},
 'pad-nlc'(){padAddLine(parseFloat($('#nlA').value),parseFloat($('#nlB').value),parseFloat($('#nlS').value))},
});
let padRT;addEventListener('resize',()=>{clearTimeout(padRT);padRT=setTimeout(()=>{if(PAD.open&&$('#pad'))padInit()},200)});
