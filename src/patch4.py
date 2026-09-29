exec(open('patch3.py').read().split('# ---- daughter')[0])
s=open('dino-star-patrol.html').read()
s=common(s)
s=s.replace('</style>',open('explore-dark.css').read()+'</style>',1)
old="function crit(id,size='md',extra=''){const c=CREW[id]||CREW.rex;return kawaii(c.k,size,extra,c.name)}"
assert old in s; s=s.replace(old,"function crit(id,size='md',extra='',wear=null){const c=CREW[id]||CREW.rex;return kawaii(c.k,size,extra,c.name,wear)}")
a=s.index('function spaceScene(){');b=s.index('\n',a);s=s[:a]+s[b+1:]
a=s.index("const realImg=(id,cls='')=>");b=s.index('\n',a);s=s[:a]+s[b+1:]
a=s.index('function openLearn(id,who){');b=s.index('function renderHatch(){');s=s[:a]+s[b:]
anchor='function showCopy(t){'
assert anchor in s
s=s.replace(anchor,open('dino_extra.js').read()+'\n'+open('explore.js').read()+"\nconst __save0=save;save=function(){if(S){try{checkUnlocks()}catch(e){console.warn(e)}}__save0()};\n"+anchor,1)
s=s.replace("best:{blast:0}}}","best:{blast:0},outfit:{},scene:{bg:'nebula',decor:['rocketship']},stats:{},guide:[],quiz:[],owned:[],newItems:[]}}",1)
old="function migrate(s){if(!s||!s.skills||s.reset)return null;"
assert old in s; s=s.replace(old,old+"s.outfit=s.outfit||{};s.scene=s.scene||{bg:'nebula',decor:['rocketship']};s.stats=s.stats||{};s.guide=s.guide||[];s.quiz=s.quiz||[];s.owned=s.owned||[];s.newItems=s.newItems||[];")
old="function bumpStreak(){const t=today();if(S.streak.last===t)return;S.streak.n=S.streak.last===yesterday()?S.streak.n+1:1;S.streak.last=t}"
assert old in s; s=s.replace(old,"function bumpStreak(){bump('missions');const t=today();if(S.streak.last===t)return;S.streak.n=S.streak.last===yesterday()?S.streak.n+1:1;S.streak.last=t;S.stats.streakBest=Math.max(S.stats.streakBest||0,S.streak.n)}")
old="function finalize(firstOk){const q=RUN.q;RUN.results.push({skill:q.skill,ok:firstOk});const ch=record(q.skill,firstOk);"
assert old in s; s=s.replace(old,old+"if(firstOk){bump('correct');bump(SK[q.skill].area)}if(ch==='up')bump('levelups');")
old="if(ok){RUN.score++;gain(1);"
assert old in s; s=s.replace(old,"if(ok){bump('correct');bump('math');RUN.score++;gain(1);",1)
old="if(RUN.n>=8&&a>=.9&&RUN.score>=12&&sk.level<5){sk.level++;RUN.ups.push('add')}"
assert old in s; s=s.replace(old,"if(RUN.n>=8&&a>=.9&&RUN.score>=12&&sk.level<5){sk.level++;RUN.ups.push('add');bump('levelups')}")
old=" else if(RUN.station&&RUN.station!=='bonus'){const d=day();"
assert old in s; s=s.replace(old," else if(RUN.station&&RUN.station!=='bonus'){if(RUN.results.length>=4&&RUN.results.every(r=>r.ok))bump('perfect');const d=day();")
old="""<div class="card-h"><h2>Your crew</h2><span class="muted">${S.crew.length} hatched</span></div>${spaceScene()}"""
assert old in s; s=s.replace(old,"""<div class="card-h"><h2>Your crew <span class="muted" style="font-size:16px;font-weight:500">${S.crew.length} hatched</span></h2>${exploreButtons()}</div>${spaceScene()}""")
open('dino-star-patrol.html','w').write(s);print('son ok')
