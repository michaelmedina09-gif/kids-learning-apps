import sys
C='/home/claude/cove/critter-cove.html'; D='/home/claude/cove/dino-star-patrol.html'
src={C:open(C).read(),D:open(D).read()}
def R(files,old,new,n=1):
    for f in files:
        c=src[f].count(old)
        if c!=n: sys.exit(f'FAIL {f.split("/")[-1]}: expected {n} got {c}: {old[:90]!r}')
        src[f]=src[f].replace(old,new)
B=[C,D]

# ---------- Dress Up: scene strip under the stage, tab class for narrow screens ----------
R(B,"""<div class="dress-grid"><section class="box stagebox"><div class="stage">${CFG.sceneSVG(S.scene.bg,S.scene.decor)}<div class="stagepet">${pet?petArt(pet,'xl','bob'):''}</div></div>""",
"""<div class="dress-grid"><section class="box stagebox ${['bg','decor'].includes(DU.tab)?'tabscene':'tabwear'}"><div class="stage">${CFG.sceneSVG(S.scene.bg,S.scene.decor)}<div class="stagepet">${pet?petArt(pet,'xl','bob'):''}</div></div>${stripHTML()}""")
R(B,"const LOCK_TXT='Locked:';",
"""const LOCK_TXT='Locked:';
function stripHTML(){const svg=CFG.sceneSVG(S.scene.bg,S.scene.decor).replace(/preserveAspectRatio="[^"]*"/,'preserveAspectRatio="xMidYMid meet"');const m=svg.match(/viewBox="0 0 (\\d+) (\\d+)"/);return`<div class="scenestrip"><span class="sslabel">Your ${CFG.placeName}</span><div class="ssview" style="aspect-ratio:${m?m[1]+' / '+m[2]:'1000 / 280'}">${svg}</div></div>`}
const SAYBTN=act=>`<button class="iconbtn sm saybtn" data-act="${act}" aria-label="Read this to me">${ICON.speaker}</button>`;
Object.assign(ACT,{'say-dress'(){const parts=[];const h=$('.shophint span')||$('.goalsum span');if(h)parts.push(h.innerText);if(DU.tab==='goals')$$('.goal2 .gtext').slice(0,3).forEach(g=>parts.push(g.innerText.replace(/\\n+/g,'. ')));say(parts.flatMap(p=>[p,400]))}});""")
R(B,'<p class="shophint">','<p class="shophint">${SAYBTN(\'say-dress\')}<span>')
R(B,"shop items cost ${CFG.curName}.</p>","shop items cost ${CFG.curName}.</span></p>")
R(B,'<p class="goalsum">','<p class="goalsum">${SAYBTN(\'say-dress\')}<span>')
R(B,"Keep going to unlock the rest!</p>","Keep going to unlock the rest!</span></p>")

# ---------- Dino home: read-aloud button ----------
R([D],'<div class="card-h"><h2>Launch Check</h2></div>','<div class="card-h"><h2>Launch Check</h2>${SAYBTN(\'say-home\')}</div>')
R([D],'<div class="card-h"><h2>Today’s Mission</h2><span class="muted">about 20 min</span></div>','<div class="card-h"><h2>Today’s Mission</h2><span class="muted">about 20 min</span>${SAYBTN(\'say-home\')}</div>')
R([D],"Object.assign(ACT,{'say-dress'",
"""Object.assign(ACT,{'say-home'(){if(!placedAll()){say(['Launch Check.',300,'Show what you know before your first mission.','It is okay if something is new.','Just tap, I don’t know yet.',400,...CHECKS.flatMap(x=>[`${x.name}. ${x.sub}.${S.placement[x.id]?' Done!':''}`,300])]);return}const d=day(),all=STATIONS.every(x=>d.done[x.id]);say(['Today’s Mission.',300,...STATIONS.flatMap(x=>[`${x.name}. ${x.sub}.${d.done[x.id]?' Done!':''}`,300]),all?'Mission complete! Tap any station to play again.':'Tap the big blue button to go!'])}});
Object.assign(ACT,{'say-dress'""")

# ---------- CSS ----------
COMMON="""
/* ---- QA fixes ---- */
.toast{pointer-events:none}
@media (max-width:640px){.toast{bottom:auto;top:calc(10px + env(safe-area-inset-top,0px))}}
.iconbtn.sm{width:44px;height:44px;min-width:44px;flex:none;border-radius:13px}
.iconbtn.sm .ic,.iconbtn.sm svg{width:22px;height:22px}
.card-h .saybtn{margin-left:auto;align-self:center}
.shophint,.goalsum{display:flex;align-items:center;gap:10px}
.shophint .saybtn,.goalsum .saybtn{margin:0}
.scenestrip{display:flex;flex-direction:column;gap:6px;padding:0 14px}
.sslabel{font-weight:700;font-size:14px;color:var(--x-text)}
.ssview{position:relative;width:100%;border-radius:14px;overflow:hidden;border:2px solid var(--x-line)}
.ssview>svg{position:absolute;inset:0;width:100%;height:100%;display:block}
@media (max-width:860px){
 .stagebox{position:sticky;top:0;z-index:6;box-shadow:0 10px 22px rgba(0,0,0,.28)}
 .stagebox.tabscene .stage,.stagebox.tabscene .petpick,.stagebox.tabscene>.linkbtn{display:none}
 .stagebox.tabscene{padding-top:12px}
 .stagebox.tabwear .scenestrip{display:none}
}
@media (max-width:640px){
 .stagebox .stage{height:190px}
 .stagebox .stagepet{transform:translateX(-50%) scale(.68);transform-origin:50% 100%;bottom:6px}
 .petpick button{min-width:64px;padding:4px 6px}
}
.pkrow .pk{min-height:44px;padding:8px 14px}
.dtabs button{min-height:44px}
.linkbtn{min-height:44px}
.learn-h>div{min-width:0}
.learn-h h2{overflow-wrap:anywhere;min-width:0}
.learn-h .iconbtn{flex:none;min-width:44px;min-height:44px}
@media (max-width:640px){.learn-h h2{font-size:24px}}
.tier{font:700 11px/1 Lexend,sans-serif;padding:4px 8px}
.tier.t1{background:#1d5fcf}
.tier.t2{background:#6a2fd6}
.tier.t3{background:linear-gradient(90deg,#a8540a,#b5156f)}
.tlock{font-size:13px}
.tprog{font-size:12px}
.mini2.new{background:#d4193f}
.pkrow .pk.on{background:var(--pk,#6d45e0);border-color:var(--pk,#6d45e0)}
"""
CRIT="""
:root{--muted:#56656d}
.mini2.have{color:var(--teal-d)}
.dtabs button.on{background:var(--teal-d);border-color:var(--teal-d)}
.nlform .tbtn,.nlform .presets .tbtn,.padbar .tbtn{min-height:44px}
.nlform input{min-height:44px;width:72px}
@media (max-width:480px){
 .kb{gap:6px}
 .kb .kr{gap:3px}
 .kb button{height:54px;border-radius:9px;font-size:22px}
 .qcard{padding-left:10px;padding-right:10px}
}
"""
DINO="""
.pgrid{font-size:min(44px,calc((100vw - 96px) / (var(--cols,5) * 1.3)));gap:6px min(10px,1.6vw)}
.choice .pgrid{font-size:min(44px,calc((100vw - 120px) / (var(--cols,5) * 1.3)))}
.choices>.choice{min-width:0}
@media (max-width:640px){.choices:has(.pgrid){grid-template-columns:1fr}}
"""
R([C],"</style>",COMMON+CRIT+"</style>")
R([D],"</style>",COMMON+DINO+"</style>")
for f in B: open(f,'w').write(src[f])
print('ok')
