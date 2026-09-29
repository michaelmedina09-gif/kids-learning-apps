// shared Dino driver
export async function dAnswer(p,right){
 const q=await p.evaluate(()=>{const q=RUN.q;return{type:q.type,kind:q.kind,answer:q.answer,letters:q.letters,tokens:q.tokens,choices:q.choices&&q.choices.map(c=>({ok:c.ok,dis:c.dis}))}});
 if(q.kind)return dSnd(p,right).then(()=>q);
 if(q.type==='mc'){let i=q.choices.findIndex(c=>right?c.ok:(!c.ok&&!c.dis));if(i<0&&!right)i=q.choices.findIndex(c=>c.ok);if(i<0){const full=await p.evaluate(()=>JSON.stringify({p:RUN.q.prompt,skill:RUN.q.skill,ch:RUN.q.choices,locked:RUN.locked,tries:RUN.tries}));throw new Error('NO CHOICE right='+right+' '+full)}await p.locator(`.choice[data-i="${i}"]`).first().click();return q}
 if(q.type==='num'){const v=right?String(q.answer):String(+q.answer+1);for(const ch of v)await p.locator(`[data-act="key"][data-k="${ch}"]`).first().click();await p.locator('[data-act="check"]').first().click();return q}
 if(q.type==='tiles'||q.type==='build'){const pool=q.type==='tiles'?q.letters:q.tokens;const want=q.type==='tiles'?[...q.answer]:q.answer.split(' ');let seq=[];const used=new Set();
  for(const w of want){const i=pool.findIndex((x,k)=>x===w&&!used.has(k));used.add(i);seq.push(i)}
  if(!right){[seq[0],seq[seq.length-1]]=[seq[seq.length-1],seq[0]];if(seq.map(i=>pool[i]).join('')===want.join(''))seq.reverse();if(seq.map(i=>pool[i]).join('')===want.join('')){const extra=pool.findIndex((x,k)=>!seq.includes(k));if(extra>=0)seq[seq.length-1]=extra}}
  for(const i of seq)await p.locator(`[data-act="tile"][data-i="${i}"]`).click();await p.waitForTimeout(350);return q}
 throw new Error('unknown q '+JSON.stringify(q))}
// sound boxes / word chain in SND
export async function dSnd(p,right,log){await p.waitForTimeout(250);const st=await p.evaluate(()=>({kind:SND.t.kind,n:SND.n,gr:SND.gr,tiles:SND.tiles,ed:SND.ed,from:SND.from,to:SND.to,w:SND.t.w,tries:SND.o.tries}));
 if(st.kind==='elk'){if(!(await p.$('#pebtray'))){if(log)log.push('NO PEBTRAY phase='+(await p.evaluate(()=>SND.phase))+' '+st.w);return st}const n=right?st.n:(st.n===5?4:st.n+1);for(let i=0;i<n;i++)await p.click('#pebtray');await p.click('[data-act="snd-check"]');await p.waitForTimeout(300);
  let fb=await p.evaluate(()=>{const f=document.querySelector('#fb');return f&&!f.hidden?f.innerText.replace(/\n/g,' | '):''});if(log)log.push('elk '+st.w+' count'+(right?'+':'-')+': '+fb);
  if(!right){ // try again wrong until tries exhausted
   for(let t=1;t<st.tries&&await p.evaluate(()=>SND&&SND.phase==='count');t++){for(let i=0;i<n;i++)await p.click('#pebtray');await p.click('[data-act="snd-check"]');await p.waitForTimeout(300)}
   fb=await p.evaluate(()=>{const f=document.querySelector('#fb');return f&&!f.hidden?f.innerText.replace(/\n/g,' | '):''});if(log)log.push('elk '+st.w+' after tries: '+fb);
   if(await p.$('#fb:not([hidden]) [data-act="next"],#fb:not([hidden]) [data-act="warm-next"]')){await p.click('#fb button');await p.waitForTimeout(400);return st}
  }
  await p.waitForTimeout(2400);if(!(await p.evaluate(()=>SND&&SND.phase==='letters')))return st;
  const used=new Set();for(const g of st.gr){const i=st.tiles.findIndex((x,k)=>x===g&&!used.has(k));used.add(i);await p.click(`[data-act="snd-tile"][data-i="${i}"]`)}await p.waitForTimeout(600);
  fb=await p.evaluate(()=>{const f=document.querySelector('#fb');return f&&!f.hidden?f.innerText.replace(/\n/g,' | '):''});if(log)log.push('elk '+st.w+' letters: '+fb);await p.waitForTimeout(1700);return st}
 const ed=st.ed;
 if(right){if(ed.op==='sub'){await p.click(`.ctile[data-i="${ed.pos}"]`);await p.click(`[data-act="snd-opt"][data-c="${ed.ch}"]`)}else if(ed.op==='ins')await p.click(`[data-act="snd-opt"][data-c="${ed.ch}"]`);else await p.click(`.ctile[data-i="${ed.pos}"]`);await p.waitForTimeout(500);
  const fb=await p.evaluate(()=>{const f=document.querySelector('#fb');return f&&!f.hidden?f.innerText.replace(/\n/g,' | '):''});if(log)log.push(`chain ${st.from}>${st.to} +: ${fb}`);await p.waitForTimeout(1700);return st}
 for(let t=0;t<st.tries;t++){if(!(await p.evaluate(()=>SND&&SND.phase==='chain')))break;
  if(ed.op==='sub'){await p.click(`.ctile[data-i="${ed.pos}"]`);const wrong=await p.evaluate(()=>SND.opts.find(c=>c!==SND.ed.ch));await p.click(`[data-act="snd-opt"][data-c="${wrong}"]`)}
  else if(ed.op==='ins'){const wrong=await p.evaluate(()=>SND.opts.find(c=>c!==SND.ed.ch));await p.click(`[data-act="snd-opt"][data-c="${wrong}"]`)}
  else{const len=st.from.length;await p.click(`.ctile[data-i="${ed.pos===0?len-1:0}"]`)}await p.waitForTimeout(450)}
 const fb=await p.evaluate(()=>{const f=document.querySelector('#fb');return f&&!f.hidden?f.innerText.replace(/\n/g,' | '):''});if(log)log.push(`chain ${st.from}>${st.to} -: ${fb}`);
 if(await p.$('#fb:not([hidden]) button')){await p.click('#fb button');await p.waitForTimeout(400)}return st}
