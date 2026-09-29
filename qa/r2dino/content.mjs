import {open,SPEECH_MOCK} from './lib.mjs';import {placed} from './setup.mjs';
const p=await open('dino-star-patrol.html','ipad',{init:SPEECH_MOCK});await placed(p);
const r=await p.evaluate(()=>{const out=[];for(const s of EDU1.stories){const sents=rexSentences(s.text);const joined=sents.join(' ');const qs=rexQuestions(s);
 out.push({id:s.id,n:sents.length,rejoin:joined===s.text.replace(/\s+/g,' '),sents,pv:rexPreviewWords(s).map(w=>w.w+(w.heart?'♥':'')),qs:qs.map(q=>q.prompt+' => '+q.answer+' ['+q.choices.map(c=>c.name+(c.ok?'*':'')).join(',')+']'),nq:qs.length,oneRight:qs.every(q=>q.choices.filter(c=>c.ok).length===1)})}
 const bad=[];EDU1.chains.forEach((c,ci)=>{for(let i=0;i+1<c.words.length;i++){const e=chainEdit(c.words[i],c.words[i+1]);if(!e)bad.push(ci+':'+c.words[i]+'>'+c.words[i+1])}});
 const lv=[1,2,3,4].map(l=>l+':'+elkPool(l).map(x=>x.w).join(','));return{out,bad,lv}});
for(const o of r.out)console.log(o.id,'sent',o.n,'rejoin',o.rejoin,'q',o.nq,o.oneRight,'\n  pv',o.pv.join(' '),'\n  ',o.qs.join('\n   '),'\n  ',o.sents.join(' | '));
console.log('bad chain steps',r.bad);console.log(r.lv.join('\n'));console.log('errs',p.errs);await p.b.close();
