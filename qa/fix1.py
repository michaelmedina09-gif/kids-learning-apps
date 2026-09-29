import re,sys
C='/home/claude/cove/critter-cove.html'; D='/home/claude/cove/dino-star-patrol.html'
src={C:open(C).read(),D:open(D).read()}
def R(files,old,new,n=1):
    for f in files:
        c=src[f].count(old)
        if c!=n: sys.exit(f'FAIL {f.split("/")[-1]}: expected {n} got {c}: {old[:90]!r}')
        src[f]=src[f].replace(old,new)
B=[C,D]

# ---------- helpers: pluralize, recent-question memory ----------
R(B,"const pick=a=>a[Math.floor(Math.random()*a.length)];",
 "const pick=a=>a[Math.floor(Math.random()*a.length)];\nconst pl=(n,w,ws)=>n+' '+(+n===1?w:(ws||w+'s'));")
R(B,"function mk(id,L,word){const q=GEN[id](L,word);q.skill=id;q.level=L;return q}",
 "const RECENTQ=[];const qKey=q=>String(q.prompt||'')+'|'+String(q.fig||'')+'|'+String(q.type==='mc'?((q.choices||[]).find(c=>c.ok)||{}).h:q.answer);\n"
 "function mk(id,L,word){let q;for(let t=0;t<8;t++){q=GEN[id](L,word);q.skill=id;q.level=L;if(word||!RECENTQ.includes(qKey(q)))break}RECENTQ.push(qKey(q));if(RECENTQ.length>6)RECENTQ.shift();return q}")

# ---------- nextQ guard + stale timers ----------
R([C],"function nextQ(){const q=RUN.planner.next();",
 "function qLater(ms){const r=RUN,q=RUN&&RUN.q;setTimeout(()=>{if(RUN&&RUN===r&&RUN.q===q&&(screen==='q'))nextQ()},ms)}\nfunction nextQ(){if(!RUN||!RUN.planner)return;RUN.idk=false;const q=RUN.planner.next();")
R([D],"function nextQ(){const q=RUN.planner.next();",
 "function qLater(ms){const r=RUN,q=RUN&&RUN.q;setTimeout(()=>{if(RUN&&RUN===r&&RUN.q===q&&(screen==='q'))nextQ()},ms)}\nfunction nextQ(){if(!RUN||!RUN.planner)return;RUN.idk=false;const q=RUN.planner.next();")
for f,ms in [(C,['1050','1100','1400']),(D,['1400','1500','1500'])]:
    for m in set(ms):
        R([f],f"setTimeout(nextQ,{m})",f"qLater({m})",ms.count(m))

# ---------- "I haven't learned this yet" + showMiss period ----------
R(B,"idk(){answer(false)},","idk(){if(RUN)RUN.idk=true;answer(false)},")
R([C],"""function showMiss(q){$$('.choice').forEach((b,i)=>{if(q.choices&&q.choices[i]&&q.choices[i].ok)b.classList.add('right')});sfx.bad();
 showFb('teach',`<b>Not quite. The answer is ${answerHTML(q)}.</b><div class="exp">${q.explain||''}</div><button class="btn teal" data-act="next">Got it ${ICON.arrow}</button>`);
 say(['Not quite.',300,'The answer is',plainAns(q),700,String(q.explain||'').replace(/<[^>]+>/g,' ')])}""",
"""function showMiss(q){$$('.choice').forEach((b,i)=>{if(q.choices&&q.choices[i]&&q.choices[i].ok)b.classList.add('right')});sfx.bad();const idk=!!(RUN&&RUN.idk),pa=plainAns(q),dot=/[.!?]$/.test(pa)?'':'.';if(RUN)RUN.idk=false;
 showFb('teach',`${idk?`<b>That’s okay! Here’s how it works:</b><div>The answer is <b>${answerHTML(q)}</b>${dot}</div>`:`<b>Not quite. The answer is ${answerHTML(q)}${dot}</b>`}<div class="exp">${q.explain||''}</div><button class="btn teal" data-act="next">Got it ${ICON.arrow}</button>`);
 say([idk?'That’s okay! Here’s how it works.':'Not quite.',300,'The answer is',pa,700,String(q.explain||'').replace(/<[^>]+>/g,' ')])}""")
R([D],"""function showMiss(q){$$('.choice').forEach((b,i)=>{if(q.choices&&q.choices[i]&&q.choices[i].ok)b.classList.add('right')});sfx.bad();
 showFb('teach',`<b>Not quite. The answer is ${answerHTML(q)}.</b><div class="exp">${q.explain||''}</div><button class="btn cyan" data-act="next">Got it ${ICON.arrow}</button>`);
 say(['Not quite.',300,'The answer is',plainAns(q),700,String(q.explain||'').replace(/<[^>]+>/g,' ')])}""",
"""function showMiss(q){$$('.choice').forEach((b,i)=>{if(q.choices&&q.choices[i]&&q.choices[i].ok)b.classList.add('right')});sfx.bad();const idk=!!(RUN&&RUN.idk),pa=plainAns(q),dot=/[.!?]$/.test(pa)?'':'.';if(RUN)RUN.idk=false;
 showFb('teach',`${idk?`<b>That’s okay! Here’s how it works:</b><div>The answer is <b>${answerHTML(q)}</b>${dot}</div>`:`<b>Not quite. The answer is ${answerHTML(q)}${dot}</b>`}<div class="exp">${q.explain||''}</div><button class="btn cyan" data-act="next">Got it ${ICON.arrow}</button>`);
 say([idk?'That’s okay! Here’s how it works.':'Not quite.',300,'The answer is',pa,700,String(q.explain||'').replace(/<[^>]+>/g,' ')])}""")

# ---------- slot names, decor toast ----------
R(B,"const SLOTNAME={hat:'hat',face:'glasses',","const SLOTNAME={hat:'hat',face:'face item',")
R(B,"if(d.length>3)d.shift()","if(d.length>3){const g=d.shift(),gi=CFG.items.decor.find(x=>x.id===g);toast(`Only 3 decorations fit — took off the ${esc(gi?gi.name:g)}`)}")

# ---------- migrations ----------
R([C],"s.scene=s.scene||{bg:'sunset',decor:['umbrella']};",
 "s.scene=s.scene||{bg:'sunset',decor:['umbrella']};if(!Array.isArray(s.scene.decor))s.scene.decor=[];if(!s.scene.bg)s.scene.bg='sunset';s.placement=s.placement||{math:false,spell:false,write:false,at:null};")
R([D],"s.scene=s.scene||{bg:'nebula',decor:['rocketship']};",
 "s.scene=s.scene||{bg:'nebula',decor:['rocketship']};if(!Array.isArray(s.scene.decor))s.scene.decor=[];if(!s.scene.bg)s.scene.bg='nebula';s.placement=s.placement||{math:false,read:false,at:null};if(s.hatching&&!CREW[s.hatching])s.hatching=null;")

# ---------- guide quiz: stop when closed ----------
R(B,"setTimeout(()=>{body.dataset.lock='0';i++;show()},1700)",
 "setTimeout(()=>{body.dataset.lock='0';i++;if($('#modal').hidden||!body.isConnected){hush();if(i>=qs.length)done();return}show()},1700)")
R(B,"S.quiz=S.quiz||[];let msg='';if(pass&&!S.quiz.includes(id)){S.quiz.push(id);CFG.gain(CFG.quizReward);msg=`You earned ${CFG.quizReward} ${CFG.curName}!`;burst();sfx.win()}else if(pass){msg='You already earned the reward for this one. Nice review!'}save();",
 "S.quiz=S.quiz||[];let msg='',fresh=false;if(pass&&!S.quiz.includes(id)){S.quiz.push(id);CFG.gain(CFG.quizReward);msg=`You earned ${CFG.quizReward} ${CFG.curName}!`;fresh=true}else if(pass){msg='You already earned the reward for this one. Nice review!'}save();if($('#modal').hidden||!body.isConnected){hush();return}if(fresh){burst();sfx.win()}")

# ---------- critter: handwriting self-check counts ----------
R([C],"if(!fb){QW.busy=false;QW.fb={self:true,checks:[false,false,false,false]};if(!QW.entry){",
 "if(!fb){QW.busy=false;QW.fb={self:true,checks:[false,false,false,false]};if(!QW.entry){bump('writes');bump('hand');")

# ---------- critter: fact sprint lock + guards ----------
R([C],"function sprintNextQ(){RUN.q=mk(","function sprintNextQ(){if(screen!=='sprint'||!RUN||RUN.mode!=='sprint')return;RUN.locked=false;RUN.q=mk(")
R([C],"d.classList.add('ok');tone([880,1175],.05);buddyJump();setTimeout(sprintNextQ,160)",
 "d.classList.add('ok');tone([880,1175],.05);buddyJump();RUN.locked=true;setTimeout(sprintNextQ,160)")
R([C],"setTimeout(()=>{RUN.locked=false;sprintNextQ()},900)","setTimeout(sprintNextQ,900)")

# ---------- dino: blast guards + per-skill levels ----------
R([D],"function blastNext(){const f=blastFact();","function blastNext(){if(screen!=='blast'||!RUN||RUN.mode!=='blast')return;const f=blastFact();")
R([D],"function blastEnd(){screen='summary';addTime();const a=RUN.n?RUN.score/RUN.n:0,sk=S.skills.add;if(RUN.n>=8&&a>=.9&&RUN.score>=12&&sk.level<5){sk.level++;RUN.ups.push('add');bump('levelups')}else if(RUN.n>=5&&a<.6&&sk.level>1)sk.level--;",
 "function blastEnd(){screen='summary';addTime();['add','sub'].forEach(id=>{const rs=RUN.results.filter(r=>r.skill===id),n=rs.length,ok=rs.filter(r=>r.ok).length,a=n?ok/n:0,sk=S.skills[id];if(n>=8&&a>=.9&&RUN.score>=12&&sk.level<5){sk.level++;RUN.ups.push(id);bump('levelups')}else if(n>=5&&a<.6&&sk.level>1)sk.level--});")
R([D],"<div class=\"bigstat\"><b>+${RUN.earned}</b><span>stars</span></div></div>`;",
 "<div class=\"bigstat\"><b>+${RUN.earned}</b><span>stars</span></div></div>${RUN.ups.length?`<div class=\"ups\">${RUN.ups.map(id=>`<span class=\"up\">Level up! ${SK[id].kid}</span>`).join('')}</div>`:''}`;",1)

# ---------- critter: replaying a finished station ----------
R([C],"toast('Bonus round! Hearts still count.')","toast('Practice round! Hearts still count.')")
R([C]," else if(RUN.station){if(RUN.results.length>=4"," else if(RUN.station&&RUN.station!=='bonus'){if(RUN.results.length>=4")

# ---------- critter: Coach Hoot local fixes dedupe ----------
R([C],"if(low&&fixes.length<4){const w=low.split(/\\s+/)[0];fixes.push(",
 "if(low&&fixes.length<4){const w=low.split(/\\s+/)[0];if(!fixes.some(f=>f.wrong.toLowerCase()===w.toLowerCase()))fixes.push(")

# ---------- Enter submits pet name / dashboard name ----------
for f,act in [(C,'rescue-done'),(D,'hatch-done')]:
    R([f],"document.addEventListener('keydown',e=>{",
      "document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target&&(e.target.id==='cn'||e.target.id==='dn')){e.preventDefault();const f=ACT[e.target.id==='cn'?'"+act+"':'dash-name'];if(f)f();return}",1)

# ---------- wording ----------
R([C],"with ${n%k} left over. Those ${n%k} turtles still need a tank,",
 "with ${n%k} left over. ${n%k===1?'That 1 turtle still needs':`Those ${n%k} turtles still need`} a tank,")
R([D],"${b} aliens go home. How many are left?`,type:'num',answer:a-b,say:`There are ${a} aliens on the ship. ${b} aliens go home.",
 "${pl(b,'alien')} ${b===1?'goes':'go'} home. How many are left?`,type:'num',answer:a-b,say:`There are ${a} aliens on the ship. ${pl(b,'alien')} ${b===1?'goes':'go'} home.")
R([D],"explain:`${a} − ${b} = ${a-b} aliens left.`","explain:`${a} − ${b} = ${pl(a-b,'alien')} left.`")
R([D],"${it.names?' names get capitals,':''}","${it.names?(it.i?' names get capitals,':', names get capitals,'):''}")
# tens / ones in dino place-value + subtraction text
s=src[D]
a,b_=s.index('function g_sub('),s.index('function g_compare(')
seg=s[a:b_]
seg2=re.sub(r'\$\{([^{}]{1,20})\} tens',lambda m:"${pl("+m.group(1)+",'ten')}",seg)
seg2=re.sub(r'\$\{([^{}]{1,20})\} ones',lambda m:"${pl("+m.group(1)+",'one')}",seg2)
print('tens/ones replacements:',len(re.findall(r"pl\([^)]*'(?:ten|one)'\)",seg2)))
src[D]=s[:a]+seg2+s[b_:]

for f in B: open(f,'w').write(src[f])
print('ok')
