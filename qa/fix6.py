# Round 1 completion pass (Builder), fix 16: never serve the same question twice in a row.
# fix1's mk() gave up after 8 tries when every option was in the 6-question window (small pools such as
# shapes, money, digraphs, writing banks), and then served whatever came last, often the one just shown.
import sys
C='/home/claude/kids-learning-apps/apps/critter-cove.html'; D='/home/claude/kids-learning-apps/apps/dino-star-patrol.html'
src={C:open(C).read(),D:open(D).read()}
def R(files,old,new,n=1):
    for f in files:
        c=src[f].count(old)
        if c!=n: sys.exit(f'FAIL {f.split("/")[-1]}: expected {n} got {c}: {old[:90]!r}')
        src[f]=src[f].replace(old,new)
B=[C,D]
R(B,"function mk(id,L,word){let q;for(let t=0;t<8;t++){q=GEN[id](L,word);q.skill=id;q.level=L;if(word||!RECENTQ.includes(qKey(q)))break}RECENTQ.push(qKey(q));if(RECENTQ.length>6)RECENTQ.shift();return q}",
    "function mk(id,L,word){const last=RECENTQ[RECENTQ.length-1];let q=null,alt=null,c;for(let t=0;t<12;t++){c=GEN[id](L,word);c.skill=id;c.level=L;const k=qKey(c);if(word||!RECENTQ.includes(k)){q=c;break}if(!alt&&k!==last)alt=c}q=q||alt||c;RECENTQ.push(qKey(q));if(RECENTQ.length>6)RECENTQ.shift();return q}")
for f in B: open(f,'w').write(src[f])
print('ok')
