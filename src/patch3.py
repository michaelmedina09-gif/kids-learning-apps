import re,sys
def common(s):
    old="function kawaii(sp,size='md',cls='',label=''){"
    assert old in s; s=s.replace(old,"function kawaii(sp,size='md',cls='',label='',wear=null){const WR=wearSVG(wear,sp);")
    old="${defs}${back}${feet}${body}${mid}${eyes}${blush}${front}</svg>`}"
    assert old in s; s=s.replace(old,"${defs}${back}${WR.b}${feet}${body}${mid}${eyes}${blush}${front}${WR.f}</svg>`}")
    s=s.replace('</style>',open('explore.css').read()+'</style>',1)
    return s
# ---- daughter
s=open('critter-cove.html').read()
s=common(s)
s=s.replace('</style>',open('explore-light.css').read()+'</style>',1)
old="function spr(id,size='md',extra=''){const c=CRITTERS[id]||CRITTERS.owl;return kawaii(c.k,size,extra,c.sp)}"
assert old in s; s=s.replace(old,"function spr(id,size='md',extra='',wear=null){const c=CRITTERS[id]||CRITTERS.owl;return kawaii(c.k,size,extra,c.sp,wear)}")
# remove old coveScene
a=s.index('function coveScene(){');b=s.index('function renderRescue(){')
s=s[:a]+s[b:]
# insert extras + explore after ACT (before showCopy)
anchor='function showCopy(t){'
s=s.replace(anchor,open('cove_extra.js').read()+'\n'+open('explore.js').read()+"\nconst __save0=save;save=function(){if(S){try{checkUnlocks()}catch(e){console.warn(e)}}__save0()};\n"+anchor,1)
# state
old="function newState(name){"
i=s.index(old);j=s.index('\n',i)
line=s[i:j]
assert 'return{v:1' in s[i:s.index('\n',j+1)]
s=s.replace("qwIdx:0}}","qwIdx:0,outfit:{},scene:{bg:'sunset',decor:['umbrella']},stats:{},guide:[],quiz:[],owned:[],newItems:[]}}",1)
old="function migrate(s){if(!s||!s.skills||s.reset)return null;"
assert old in s; s=s.replace(old,old+"s.outfit=s.outfit||{};s.scene=s.scene||{bg:'sunset',decor:['umbrella']};s.stats=s.stats||{};s.guide=s.guide||[];s.quiz=s.quiz||[];s.owned=s.owned||[];s.newItems=s.newItems||[];")
old="function bumpStreak(){const t=today();if(S.streak.last===t)return;S.streak.n=S.streak.last===yesterday()?S.streak.n+1:1;S.streak.last=t}"
assert old in s; s=s.replace(old,"function bumpStreak(){bump('missions');const t=today();if(S.streak.last===t)return;S.streak.n=S.streak.last===yesterday()?S.streak.n+1:1;S.streak.last=t;S.stats.streakBest=Math.max(S.stats.streakBest||0,S.streak.n)}")
old="function finalize(firstOk){const q=RUN.q;RUN.results.push({skill:q.skill,ok:firstOk});const ch=record(q.skill,firstOk);"
assert old in s; s=s.replace(old,old+"if(firstOk){bump('correct');bump(SK[q.skill].area)}if(ch==='up')bump('levelups');")
old="if(ok){RUN.score++;gain(1);"
assert old in s; s=s.replace(old,"if(ok){bump('correct');bump('math');RUN.score++;gain(1);",1)
old="if(RUN.n>=8&&a>=.9&&RUN.score>=12&&sk.level<5){sk.level++;RUN.ups.push('facts')}"
assert old in s; s=s.replace(old,"if(RUN.n>=8&&a>=.9&&RUN.score>=12&&sk.level<5){sk.level++;RUN.ups.push('facts');bump('levelups')}")
old=" else if(RUN.station){const d=day();"
assert old in s; s=s.replace(old," else if(RUN.station){if(RUN.results.length>=4&&RUN.results.every(r=>r.ok))bump('perfect');const d=day();",1)
old="QW.busy=false;const revising=!!(QW.fb&&!QW.fb.self);"
assert old in s; s=s.replace(old,"QW.busy=false;const revising=!!(QW.fb&&!QW.fb.self);if(!revising){bump('writes');if(hand)bump('hand')}")
# home header
old="""<section class="box cove"><div class="card-h"><h2>The Cove</h2><span class="muted">${S.rescued.length} rescued</span></div>${coveScene()}</section>"""
assert old in s; s=s.replace(old,"""<section class="box cove"><div class="card-h"><h2>The Cove <span class="muted" style="font-size:15px;font-weight:500">${S.rescued.length} rescued</span></h2>${exploreButtons()}</div>${coveScene()}</section>""")
# rescue screen
old="""<h1>Rescue complete!</h1><p style="margin:0">You earned enough hearts to bring this ${c.sp} home to the Cove.</p><div class="fact">${esc(c.fact)}</div>"""
assert old in s; s=s.replace(old,"""<h1>Rescue complete!</h1><p style="margin:0">You earned enough hearts to bring this ${c.sp} home to the Cove.</p><div class="realcard"><div class="realtag">Real ${esc(SPEC[id].sp)}</div>${realImg(id)}<p class="cap">${esc(SPEC[id].cap)}</p></div><button class="btn ghost sm" data-act="learn" data-id="${id}">Learn more about the ${esc(SPEC[id].sp)}</button>""")
old="""<button class="btn teal" data-act="rescue-done">Welcome home ${ICON.arrow}</button></div>`;drawAll();wireGate()}"""
assert old in s; s=s.replace(old,old[:-1]+"say([`Rescue complete!`,400,`Meet your ${SPEC[id].sp}.`,600,SPEC[id].cap,600,SPEC[id].intro[0]])}")
old="'rescue-done'(){const nm=($('#cn').value||'').trim()||CRITTERS[S.current].name;const cost=need();"
assert old in s; s=s.replace(old,old+"if(S.outfit&&S.outfit.cur){S.outfit['r'+S.rescued.length]=S.outfit.cur;delete S.outfit.cur}")
a=s.index(" pet(b){const r=S.rescued[+b.dataset.i];");b=s.index('\n',a)
s=s[:a]+" pet(b){const r=S.rescued[+b.dataset.i];if(!r)return;tone([700,900],.06);openLearn(r.id,r.name)},"+s[b:]
open('critter-cove.html','w').write(s)
print('daughter ok')
