def patch(f,btn,cur,icon):
    s=open(f).read()
    # placement wrong -> show answer
    for old in ["showFb('neutral',`<b>Thanks! On to the next one.</b>`);setTimeout(nextQ,800)","showFb('neutral',`<b>Thanks! On to the next one.</b>`);say('Thanks! On to the next one.');setTimeout(nextQ,1200)"]:
        s=s.replace(old,"RUN.missed.push(q);showMiss(q)")
    assert "RUN.missed.push(q);showMiss(q)" in s
    old="function answer(ok){if(RUN.locked)return;const q=RUN.q;addTime();"
    assert old in s
    s=s.replace(old,old+"RUN.missed=RUN.missed||[];if(RUN.mode==='bonus'){RUN.locked=true;RUN.bonusN=(RUN.bonusN||0)+1;if(ok){RUN.bonusOk=(RUN.bonusOk||0)+1;gain(1);RUN.earned++;const hc=$('#hc');if(hc)hc.textContent=S.%s;sfx.good();buddyJump();burst();showFb('good',`<b>You remembered! That’s right!</b><span class=\"plus\">+1 ${ICON.%s}</span>`);say(['You remembered!',250,'That is right!']);save();setTimeout(nextQ,1400)}else showMiss(q);return}"%(cur,icon))
    old="function finalize(firstOk){const q=RUN.q;"
    s=s.replace(old,old+"if(!firstOk&&RUN.missed)RUN.missed.push(q);")
    old="function finishSession(){"
    s=s.replace(old,old+"if(RUN.mode==='bonus'){RUN.mode=RUN.mode0;RUN.title=RUN.title0}",1)
    # bonus check: after RUN.after check for daughter, else at start
    if "if(RUN.after&&!RUN.afterDone){RUN.afterDone=true;return RUN.after()}" in s:
        s=s.replace("if(RUN.after&&!RUN.afterDone){RUN.afterDone=true;return RUN.after()}","if(RUN.missed&&RUN.missed.length&&!RUN.bonusDone)return offerBonus();if(RUN.after&&!RUN.afterDone){RUN.afterDone=true;return RUN.after()}",1)
    else:
        s=s.replace("function finishSession(){if(RUN.mode==='bonus'){RUN.mode=RUN.mode0;RUN.title=RUN.title0}","function finishSession(){if(RUN.mode==='bonus'){RUN.mode=RUN.mode0;RUN.title=RUN.title0}if(RUN.missed&&RUN.missed.length&&!RUN.bonusDone)return offerBonus();",1)
    assert "return offerBonus();" in s
    # summary line
    i=s.index("function renderSummary(){");j=s.index("${body}",i)
    s=s[:j]+"${body}${RUN.bonusN?`<p style=\"margin:0;font-weight:600\">Bonus round: ${RUN.bonusOk||0} of ${RUN.bonusN} remembered!</p>`:''}"+s[j+len("${body}"):]
    extra=r'''
function plainAns(q){return String(answerHTML(q)).replace(/<span class="fr" aria-label="([^"]+)">.*?<\/span><\/span>/g,' $1 ').replace(/<[^>]+>/g,' ').replace(/&gt;/g,'greater than').replace(/&lt;/g,'less than').replace(/\s+/g,' ').trim()}
function showMiss(q){$$('.choice').forEach((b,i)=>{if(q.choices&&q.choices[i]&&q.choices[i].ok)b.classList.add('right')});sfx.bad();
 showFb('teach',`<b>Not quite. The answer is ${answerHTML(q)}.</b><div class="exp">${q.explain||''}</div><button class="btn BTN" data-act="next">Got it ${ICON.arrow}</button>`);
 say(['Not quite.',300,'The answer is',plainAns(q),700,String(q.explain||'').replace(/<[^>]+>/g,' ')])}
function offerBonus(){screen='bonus';const n=RUN.missed.length;hush();
 app.innerHTML=`${topbar()}<div class="box center-card"><div class="glow">ART</div><h1>Bonus round!</h1><p style="margin:0;max-width:40ch">You missed ${n} question${n>1?'s':''}. You saw the right answer${n>1?'s':''}. Do you remember? Get each one right for <b>+1</b> bonus ${'CURNAME'}.</p><div class="row center"><button class="btn BTN" data-act="bonus-go">Start bonus round ${ICON.arrow}</button><button class="btn ghost" data-act="bonus-skip">Skip</button></div></div>`;wireGate();
 say(['Bonus round!',400,`You missed ${n} question${n>1?'s':''}.`,300,'Do you remember the right answers?'])}
function startBonus(){const L=RUN.missed.map(q=>({...q,choices:q.choices?q.choices.map(c=>({h:c.h,ok:c.ok})):q.choices,order:q.order}));RUN.missed=[];RUN.bonusDone=true;RUN.mode0=RUN.mode;RUN.title0=RUN.title;RUN.mode='bonus';RUN.title='Bonus Round';
 RUN.planner={total:L.length,i:0,pos(){return this.i-(RUN.q&&!RUN.locked?1:0)},next(){return this.i<L.length?L[this.i++]:null},result(){}};nextQ()}
Object.assign(ACT,{'bonus-go'(){startBonus()},'bonus-skip'(){RUN.bonusDone=true;RUN.missed=[];finishSession()}});
'''
    art="${spr(S.current||'owl','xl','bob')}" if 'critter' in f else "${crit(S.crew.length?S.crew[S.crew.length-1].id:'rex','xl','bob')}"
    extra=extra.replace('BTN',btn).replace('ART',art).replace("${'CURNAME'}",'heart' if cur=='hearts' else 'star')
    anc="const __save0=save;"
    assert anc in s
    s=s.replace(anc,extra+anc,1)
    open(f,'w').write(s)
patch('critter-cove.html','teal','hearts','heart')
patch('dino-star-patrol.html','cyan','stars','star')
print('ok')
