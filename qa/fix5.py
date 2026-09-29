# Round 1 completion pass (Builder), CSS: toast width on phones, bigger iPhone spelling keys.
import sys
C='/home/claude/kids-learning-apps/apps/critter-cove.html'; D='/home/claude/kids-learning-apps/apps/dino-star-patrol.html'
src={C:open(C).read(),D:open(D).read()}
def R(files,old,new,n=1):
    for f in files:
        c=src[f].count(old)
        if c!=n: sys.exit(f'FAIL {f.split("/")[-1]}: expected {n} got {c}: {old[:90]!r}')
        src[f]=src[f].replace(old,new)
B=[C,D]
# fix 5: left:50% + translate shrink-wraps the toast to half the screen; size it to its text (still capped by max-width)
R(B,"/* ---- QA fixes ---- */\n.toast{pointer-events:none}","/* ---- QA fixes ---- */\n.toast{pointer-events:none;width:max-content}")
# fix 13: iPhone spelling keys use the card's side padding too
R([C]," .kb .kr{gap:3px}\n"," .kb .kr{gap:2px}\n .qcard .kb{width:calc(100% + 12px);margin-inline:-6px}\n")
for f in B: open(f,'w').write(src[f])
print('ok')
