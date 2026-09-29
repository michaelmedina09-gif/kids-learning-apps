import sys
D='/home/claude/cove/dino-star-patrol.html';s=open(D).read()
def R(old,new):
    global s
    assert s.count(old)==1,(s.count(old),old[:80]);s=s.replace(old,new)
R("const id=S.hatching||(S.hatching=pick(pool))","const id=(S.hatching&&CREW[S.hatching])?S.hatching:(S.hatching=pick(pool))")
R("setTimeout(()=>{const c=CREW[id],r=REAL[id];","setTimeout(()=>{if(screen!=='hatch'||!$('#hatchArt'))return;const c=CREW[id],r=REAL[id];")
R("${c.name} is a <b>${esc(r.sp)}</b>","${c.name} is ${/^[aeiou]/i.test(r.sp)?'an':'a'} <b>${esc(r.sp)}</b>")
R("is a ${r.say}, and your new","is ${/^[aeiou]/i.test(r.say)?'an':'a'} ${r.say}, and your new")
open(D,'w').write(s);print('ok')
