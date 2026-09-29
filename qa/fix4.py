# Round 1 completion pass (Builder): gaps left after fix1-3.
import sys
C='/home/claude/kids-learning-apps/apps/critter-cove.html'; D='/home/claude/kids-learning-apps/apps/dino-star-patrol.html'
src={C:open(C).read(),D:open(D).read()}
def R(files,old,new,n=1):
    for f in files:
        c=src[f].count(old)
        if c!=n: sys.exit(f'FAIL {f.split("/")[-1]}: expected {n} got {c}: {old[:90]!r}')
        src[f]=src[f].replace(old,new)
B=[C,D]
# fix 1: a self-checked handwriting entry already counted; don't count again if the AI later answers
R([C],"const revising=!!(QW.fb&&!QW.fb.self);if(!revising){bump('writes');if(hand)bump('hand')}",
      "const revising=!!(QW.fb&&!QW.fb.self);if(!revising&&!QW.entry){bump('writes');if(hand)bump('hand')}")
# fix 2: toast wording
R(B,"toast(`Only 3 decorations fit — took off the ${esc(gi?gi.name:g)}`)","toast(`Only 3 decorations fit, so I took off the ${esc(gi?gi.name:g)}.`)")
# fix 3/6: belt-and-braces guards
R([C],"function sprintCheck(){const s=String(RUN.q.answer);","function sprintCheck(){if(!RUN||RUN.locked||screen!=='sprint'||!RUN.q)return;const s=String(RUN.q.answer);")
R([D],"function blastHit(btn){if(RUN.locked)return;","function blastHit(btn){if(!RUN||RUN.locked||screen!=='blast'||!RUN.q)return;")
R(B,"function answer(ok){if(RUN.locked)return;","function answer(ok){if(!RUN||RUN.locked||!RUN.q)return;")
for f in B: open(f,'w').write(src[f])
print('ok')
