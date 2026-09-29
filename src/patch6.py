import re,sys
acc=open('acc2.js').read()+'\n'+open('acc3.js').read()
def cut(s,start,end_marker,repl,incl_end=False):
    i=s.index(start);j=s.index(end_marker,i)
    if incl_end:j=s.index('\n',j)+1
    return s[:i]+repl+s[j:]

EXPL_OLD_OWN="const isOwned=it=>it.free||CFG.stat(it.need[0])>=it.need[1];"
EXPL_NEW_OWN="""const isOwned=it=>it.free||(it.cost?(S.bought||[]).includes(it.id):CFG.stat(it.need[0])>=it.need[1]);
const TIER=['','Rare','Epic','Legendary'];
const coins=()=>S[CFG.curName]||0;
let DUPK='All';const packsOf=slot=>{const p=[];CFG.items[slot].forEach(it=>{const k=it.p||'Classic';if(!p.includes(k))p.push(k)});return p};"""

def patch_common(s,cur_icon):
    # accessories
    s=cut(s,"/* ---------- accessories (drawn on kawaii characters) ---------- */","function wearSVG(",acc+'\n',)
    pass
    s=s.replace("function ST(){return `stroke=\"${OL}\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"`}\n","",1) if s.count("function ST(){")>1 else s
    assert EXPL_OLD_OWN in s; s=s.replace(EXPL_OLD_OWN,EXPL_NEW_OWN)
    # checkUnlocks: skip shop items
    s=s.replace("allItems().forEach(it=>{if(isOwned(it)&&!S.owned.includes(it.id))","allItems().forEach(it=>{if(!it.cost&&isOwned(it)&&!S.owned.includes(it.id))")
    # tile: price / tier / pack
    old="const v=it.free?0:Math.min(CFG.stat(it.need[0]),it.need[1]);"
    assert old in s
    s=s.replace(old,"const v=it.free||it.cost?0:Math.min(CFG.stat(it.need[0]),it.need[1]),tg=it.t?`<span class=\"tier t${it.t}\">${TIER[it.t]}</span>`:'';")
    old="${isNew?'<span class=\"newtag\">New!</span>':''}<span class=\"tprev\">"
    assert old in s
    s=s.replace(old,"${isNew?'<span class=\"newtag\">New!</span>':tg}<span class=\"tprev\">")
    old="`<span class=\"tlock\">${LOCK}<span>${esc(it.need[2])}</span>"
    assert old in s
    s=s.replace(old,"(it.cost?`<span class=\"tprice ${wallet()>=it.cost?'ok':''}\">"+cur_icon+" ${it.cost.toLocaleString('en-US')}</span>`:`<span class=\"tlock\">${LOCK}<span>${esc(it.need[2])}</span>")
    old="<span class=\"tprog\">${v} / ${it.need[1]}</span></span>`}</button>`}"
    assert old in s
    s=s.replace(old,"<span class=\"tprog\">${v} / ${it.need[1]}</span></span>`)}</button>`}")
    # aria label
    s=s.replace("${owned?'':' (locked)'}\">","${owned?'':it.cost?` (costs ${it.cost} ${CFG.curName})`:' (locked)'}\">",1)
    # goals exclude shop
    s=s.replace("const locked=items.filter(it=>!isOwned(it)).map(","const locked=items.filter(it=>!isOwned(it)&&!it.cost).map(")
    # pack filter + balance in dress
    old="Locked items show how to earn them.</p><div class=\"items2\">${CFG.items[DU.tab].map(it=>tileHTML(it,pet)).join('')}</div>"
    assert old in s
    s=s.replace(old,"Locked items show how to earn them, and shop items cost "+"${CFG.curName}.</p><div class=\"pkrow\"><span class=\"wallet\">"+cur_icon+" ${wallet().toLocaleString('en-US')}</span>${['All',...packsOf(DU.tab)].map(p=>`<button class=\"pk ${DUPK===p?'on':''}\" data-act=\"du-pk\" data-p=\"${esc(p)}\">${esc(p)}</button>`).join('')}</div><div class=\"items2\">${CFG.items[DU.tab].filter(it=>DUPK==='All'||(it.p||'Classic')===DUPK).map(it=>tileHTML(it,pet)).join('')||'<p class=\"muted\">Nothing in this pack for this tab yet.</p>'}</div>")
    s=s.replace(" 'du-tab'(b){DU.tab=b.dataset.t;renderDress()},"," 'du-tab'(b){DU.tab=b.dataset.t;if(DU.tab!=='goals'&&DUPK!=='All'&&!packsOf(DU.tab).includes(DUPK))DUPK='All';renderDress()},\n 'du-pk'(b){DUPK=b.dataset.p;sfx.tap();renderDress()},")
    old="if(!isOwned(it)){say(`To unlock the ${it.name}: ${it.need[2]}`);toast(`${LOCK_TXT} ${esc(it.need[2])}`);return}"
    assert old in s
    s=s.replace(old,"""if(!isOwned(it)){if(it.cost){if(wallet()<it.cost){const need=it.cost-wallet();say(`The ${it.name} costs ${it.cost} ${CFG.curName}. You need ${need} more. Keep practicing!`);toast(`You need <b>${need.toLocaleString('en-US')}</b> more ${CFG.curName} for the ${esc(it.name)}.`);return}
   confirmBox(`Buy the <b>${esc(it.name)}</b> for <b>${it.cost.toLocaleString('en-US')}</b> ${CFG.curName}?<br><span class="muted">You have ${wallet().toLocaleString('en-US')}.</span>`,'Buy it!',()=>{S[CFG.curName]-=it.cost;S.bought=S.bought||[];S.bought.push(it.id);S.owned=S.owned||[];S.owned.push(it.id);tone([523,659,784,1047],.08,'triangle');toast(`You got the <b>${esc(it.name)}</b>!`);save();renderDress()},'Not now');return}
   say(`To unlock the ${it.name}: ${it.need[2]}`);toast(`${LOCK_TXT} ${esc(it.need[2])}`);return}""")
    # bonus stat: correct answer in bonus round
    return s

CSS="""
.tier{position:absolute;top:6px;left:6px;font:700 10px/1 Lexend,sans-serif;letter-spacing:.04em;text-transform:uppercase;padding:4px 7px;border-radius:99px;color:#fff;z-index:2}
.tier.t1{background:#3f8cff}.tier.t2{background:#9b5cff}.tier.t3{background:linear-gradient(90deg,#ffb700,#ff5aa8)}
.tprice{display:inline-flex;align-items:center;gap:4px;font:700 14px Lexend,sans-serif;padding:4px 10px;border-radius:99px;background:rgba(127,127,127,.16);margin-top:4px}
.tprice.ok{background:#ffe27a;color:#3d2c2e}
.tprice svg{width:16px;height:16px}
.pkrow{display:flex;gap:8px;flex-wrap:wrap;align-items:center;padding:0 14px 10px}
.pkrow .pk{border:2px solid rgba(127,127,127,.3);background:transparent;color:inherit;border-radius:99px;padding:7px 13px;font:600 14px Lexend,sans-serif;cursor:pointer}
.pkrow .pk.on{background:var(--pk,#8f6bff);border-color:var(--pk,#8f6bff);color:#fff}
.wallet{display:inline-flex;align-items:center;gap:5px;font:800 15px Lexend,sans-serif;margin-right:6px;padding:6px 12px;border-radius:99px;background:#ffe27a;color:#3d2c2e}
.wallet svg{width:18px;height:18px}
@keyframes spinme{to{transform:rotate(360deg)}}.spinme{animation:spinme 1.6s linear infinite;transform-box:fill-box;transform-origin:center}
"""

def per_app(fn,items,scene_src,scene_start,scene_end,stat_fn,cur,icon):
    s=open(fn).read()
    s=patch_common(s,'${ICON.'+icon+'}')
    # items + stat fn
    s=cut(s,"const ITEMS={",f"function {stat_fn}(",open(items).read().split(f"function {stat_fn}(")[0])
    i=s.index(f"function {stat_fn}(");j=s.index("\n",i)+1
    s=s[:i]+f"function {stat_fn}("+open(items).read().split(f"function {stat_fn}(")[1].rstrip('\n')+"\n"+s[j:]
    s=s.replace(f"function {stat_fn}(k){{const st=S.stats||{{}};switch(k){{",f"function {stat_fn}(k){{const st=S.stats||{{}};switch(k){{case'daysPlayed':return Math.max(st.daysPlayed||0,Object.keys(S.days||{{}}).length);",1)
    # scenes
    s=cut(s,scene_start,scene_end,scene_src)
    # stat bumps
    old="if(!S.days[t])S.days[t]={sec:0,q:0,c:0,areas:{},done:{}};"
    assert old in s
    s=s.replace(old,"if(!S.days[t]){S.days[t]={sec:0,q:0,c:0,areas:{},done:{}};S.stats=S.stats||{};S.stats.daysPlayed=(S.stats.daysPlayed||0)+1}")
    old="RUN.bonusOk=(RUN.bonusOk||0)+1;gain(1);"
    assert old in s
    s=s.replace(old,"RUN.bonusOk=(RUN.bonusOk||0)+1;gain(1);bump('bonus');")
    old=f"function gain(h){{S.{cur}+=h;"
    assert old in s
    s=s.replace(old,f"function gain(h){{S.stats=S.stats||{{}};S.stats.earned=Math.max(S.stats.earned||0,S.{cur})+h;S.{cur}+=h;")
    s=s.replace("</style>",CSS+"</style>",1)
    open(fn,'w').write(s)
    print(fn,'ok',len(s))

per_app('critter-cove.html','items_cove.js',open('scene_cove.js').read(),"let SVGN=0;","function coveScene(",'statC','hearts','heart')
d=open('dino_extra.js').read();dsc=d[d.index("let SVGN=0;"):d.index("function spaceScene(")]
per_app('dino-star-patrol.html','items_dino.js',dsc,"let SVGN=0;","function spaceScene(",'statD','stars','star')
