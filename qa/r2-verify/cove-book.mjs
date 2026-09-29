// Cove Book Club: mode = offline | good | evil
import {open,shot,audit,txt,log,TIMEWORDS} from './lib.mjs';
const mode=process.argv[2]||'offline',vp=process.argv[3]||'ipad';const P=`cove-bc-${mode}-${vp}-`;const R=[];const ok=(c,m)=>{R.push((c?'PASS ':'FAIL ')+m)};
const stub=mode!=='offline';
const p=await open('cove',vp,{stub,clip:true,init:mode==='evil'?`window.__smode='evil'`:''});
const scr=()=>p.evaluate(()=>screen);const auds=[];const au=async t=>auds.push({t,...await audit(p,44)});
const toast=()=>p.evaluate(()=>{const t=document.querySelector('#toast');return t&&!t.hidden?t.innerText:''});
async function draw(sel){const el=p.locator(sel);await el.scrollIntoViewIfNeeded();const b=await el.boundingBox();const H=Math.min(b.height,(await p.evaluate(()=>innerHeight))-b.y-10);
 for(const [x1,y1,x2,y2] of [[.1,.2,.9,.3],[.2,.5,.7,.4],[.3,.2,.4,.9]]){await p.mouse.move(b.x+b.width*x1,b.y+H*y1);await p.mouse.down();for(let i=1;i<=14;i++)await p.mouse.move(b.x+b.width*(x1+(x2-x1)*i/14),b.y+H*(y1+(y2-y1)*i/14));await p.mouse.up()}}
await p.fill('#nm','Mia');await p.click('[data-act="welcome-go"]');await p.locator('[data-act="pick-rescue"]').first().click();
await p.evaluate(()=>{S.placement={math:true,spell:true,write:true,at:Date.now()};save();renderHome()});
const TITLE='The Moonlight Pipeworks',AUTH='Zara Quill';
const st0=await p.evaluate(()=>({h:S.hearts,ch:statC('chapters'),art:statC('bookart'),bk:statC('books')}));
await p.click('[data-act="bookclub"]');await p.waitForTimeout(200);await shot(p,P+'01-shelf');await au('shelf');
await p.click('[data-act="bc-add"]:not([data-s])');await p.fill('#bTitle',TITLE);await p.fill('#bAuthor',AUTH);await p.fill('#bCh','12');await au('add');await shot(p,P+'02-add');
await p.click('[data-act="bc-save-book"]');await p.waitForTimeout(200);ok(await p.evaluate(()=>S.books.length===1&&S.books[0].chapters===12),'own book saved');
// chapter 1 typed
await p.click('[data-act="bc-log"]');await p.waitForTimeout(200);if(!(await p.$('#bcText'))){await p.click('[data-act="bc-mode"][data-m="type"]');await p.waitForTimeout(150)}
await p.fill('#bcText','Mara found a strange box in the storroom because the lights went out.');await au('log');
await p.click('[data-act="bc-send"]');await p.waitForTimeout(900);const fb1=await p.evaluate(()=>document.querySelector('#bcCoach').innerText.replace(/\n/g,' | '));log('fb1',fb1);await shot(p,P+'03-log-fb');await au('log-fb');
ok(/Glow/.test(fb1)&&/Grow/.test(fb1),'coach glow+grow shown');
if(mode==='evil'){ok(!/Lina|Ember|Doon|12 keys/.test(fb1),'invented names/numbers in coach glow/grow replaced: '+fb1)}
if(stub)ok(!/notintext/.test(fb1),'fix-it for word not in text dropped');
if(stub&&mode==='good')ok(/storroom/.test(fb1)&&/storeroom/.test(fb1),'real spelling fix-it shown');
ok(await p.evaluate(()=>S.books[0].log.length===1&&day().book===true),'chapter logged, counts for day');
// think
await p.click('[data-act="bc-to-think"]');await p.waitForTimeout(200);await au('think-intro');await shot(p,P+'04-think-intro');
await p.click('[data-act="bc-ask"]');await p.waitForTimeout(900);const qs=await p.evaluate(()=>({qs:BC.think.qs.map(q=>q.q),dropped:BC.think.dropped,src:BC.think.src}));log('qs',qs);await shot(p,P+'05-qs');await au('think-qs');
ok(qs.qs.length===3,'3 questions shown');
const bad=/Lina|Pipeworks|Doon|Captain|12|dragon|moon\b|golden key|bridge/i;const badQ=qs.qs.filter(q=>bad.test(q));
if(mode==='evil'){ok(badQ.length===0,'no invented-fact questions shown; leaked: '+JSON.stringify(badQ));ok(qs.dropped>=4,'dropped count '+qs.dropped)}
const ans=['I think she was brave because she went in the dark.','She felt scared but curious.','Maybe she opens the box next.'];
const tas=await p.$$('.bc-ans');for(const [i,t] of tas.entries())await t.fill(ans[i]);if(await p.$('.bc-word'))await p.fill('.bc-word','storeroom');
await p.click('[data-act="bc-share"]');await p.waitForTimeout(900);const reps=await p.evaluate(()=>BC.think.replies);log('replies',reps);await shot(p,P+'06-replies');await au('replies');
ok(reps.length===3,'3 replies');if(mode==='evil')ok(!reps.some(r=>/Lina|Doon|Captain|wrong|42/i.test(r)),'evil replies replaced: '+JSON.stringify(reps));
// make: draw
await p.click('[data-act="bc-to-make"]');await p.waitForTimeout(200);await au('make-choose');await p.click('[data-act="bc-make-kind"][data-k="draw"]');await p.waitForTimeout(300);await au('draw');
await draw('#drc');await shot(p,P+'07-draw');await p.click('[data-act="dr-save"]');await p.waitForTimeout(600);const t1=await toast();log('draw toast',t1);
const e1=await p.evaluate(()=>{const e=S.books[0].log[0];return{art:e.art,id:e.artId}});ok(e1.art&&e1.id,'drawing saved on entry');
if(stub){const w=await p.evaluate(id=>({doc:!!window.__db['cove_art/'+id],bytes:(window.__db['cove_art/'+id]||{}).data?.length,stateHasImg:JSON.stringify(window.__db['cove/state']||{}).includes('data:image')}),e1.id);log('art doc',w);ok(w.doc&&w.bytes>1000,'drawing stored in separate db doc cove_art/<id>');ok(!w.stateHasImg,'db state doc has no image data');ok(/gallery/i.test(t1),'toast says saved to gallery')}
else ok(/this device/i.test(t1),'offline toast mentions device only');
// make another drawing for same chapter -> does the first survive?
const firstUrl=await p.evaluate(id=>localStorage.getItem('critter-cove-art-'+id)||(window.__db&&window.__db['cove_art/'+id]&&window.__db['cove_art/'+id].data)||'',e1.id);
await p.click('[data-act="bc-make"][data-i="0"]');await p.waitForTimeout(200);await p.click('[data-act="bc-make-kind"][data-k="draw"]');await p.waitForTimeout(300);await p.click('[data-act="dr-color"][data-c="#e8483a"]');await draw('#drc');await p.click('[data-act="dr-save"]');await p.waitForTimeout(600);
const after2=await p.evaluate(()=>{const ids=[];S.books[0].log.forEach(e=>e.artId&&ids.push(e.artId));return{ids,gallery:null}});
const secondUrl=await p.evaluate(id=>localStorage.getItem('critter-cove-art-'+id)||(window.__db&&window.__db['cove_art/'+id]&&window.__db['cove_art/'+id].data)||'',e1.id);
ok(secondUrl!==firstUrl?false:true,`"Make another" drawing keeps first drawing (same id ${after2.ids.join(',')}; overwritten=${secondUrl!==firstUrl})`);
// story
await p.click('[data-act="bc-make"][data-i="0"]');await p.waitForTimeout(200);await p.click('[data-act="bc-make-kind"][data-k="story"]');await p.waitForTimeout(200);await au('story');
await p.fill('#bcStory','One day Mara took the box to the roof. Suddenly it began to glow. Then a tiny robot climbed out and waved. In the end they became best friends.');
await p.click('[data-act="st-coach"]');await p.waitForTimeout(900);const sfb=await p.evaluate(()=>document.querySelector('#bcCoach').innerText.replace(/\n/g,' | '));log('story fb',sfb);await shot(p,P+'08-story-fb');
if(mode==='evil')ok(!/Lina|Ember/.test(sfb),'side-story coach feedback free of invented book facts: '+sfb.slice(0,160));
await p.click('[data-act="st-save"]');await p.waitForTimeout(300);ok(await p.evaluate(()=>!!S.books[0].log[0].story),'story saved');
// chapter 2 by hand (stub reads handwriting; offline -> self-check)
await p.evaluate(()=>{S.hand='sometimes';save()});await p.click('[data-act="bc-log"]');await p.waitForTimeout(200);
if(await p.$('[data-act="bc-mode"][data-m="hand"]')){await p.click('[data-act="bc-mode"][data-m="hand"]');await p.waitForTimeout(300);await au('log-hand');await draw('#hw');await p.click('[data-act="bc-send"]');await p.waitForTimeout(1200);
 const hfb=await p.evaluate(()=>document.querySelector('#bcCoach').innerText.replace(/\n/g,' | '));log('hand fb',hfb);await shot(p,P+'09-hand-fb');
 const e2=await p.evaluate(()=>{const e=S.books[0].log[1];return e&&{sum:e.summary,hw:e.hwId}});log('e2',e2);ok(e2&&e2.hw,'handwritten summary image saved with id');
 if(stub){ok(await p.evaluate(id=>!!window.__db['cove_art/'+id],e2.hw),'handwriting image in separate db doc');ok(/Coach Hoot read/.test(hfb),'shows transcript');if(mode==='evil')ok(!/Lina|Pipeworks/.test(hfb),'hand glow invented names replaced: '+hfb)}
 else ok(/Check your own summary/.test(hfb),'offline hand -> self check');
 // think for handwritten
 await p.click('[data-act="bc-to-think"]');await p.click('[data-act="bc-ask"]');await p.waitForTimeout(900);const hq=await p.evaluate(()=>BC.think.qs.map(q=>q.q));log('hand qs',hq);ok(hq.length===3&&!hq.some(q=>bad.test(q)),'handwritten chapter questions safe');await p.click('[data-act="bc-back"]');await p.waitForTimeout(200)}
// several more chapters to test state size
await p.evaluate(()=>{const b=S.books[0];for(let i=3;i<=12;i++)b.log.push({ch:i,date:today(),summary:'She went to the market because she needed food for her family and friends. Then she met a new friend there.'.repeat(2),qs:[{q:'Why do you think that happened? '.repeat(3),a:'Because she was hungry and wanted to help her family, I think. '.repeat(3)}],art:false,story:'x'.repeat(600),artId:null});save()});
const size=await p.evaluate(()=>({ls:(localStorage.getItem('critter-cove-v1')||'').length,db:window.__db?JSON.stringify(window.__db['cove/state']||{}).length:null}));log('state size',size);ok(size.ls<60000,'main state < 60KB with 12 chapters: '+size.ls);
// finish + cert
await p.evaluate(()=>{BC.view='book';BC.id=S.books[0].id;renderBook()});await p.click('[data-act="bc-finish"]');await p.waitForTimeout(200);await au('finish');
await p.click('[data-act="bc-finish-go"]');await p.waitForTimeout(200);ok(/rate/i.test(await toast()),'must rate before finish');
await p.click('[data-act="bc-rate"][data-r="4"]');await p.fill('#bFav','Mara');await p.fill('#bLoved','The lights went out.');await p.click('[data-act="bc-finish-go"]');await p.waitForTimeout(400);ok(await scr()==='book'&&await p.evaluate(()=>BC.view==='cert'),'certificate shown');await shot(p,P+'10-cert');await au('cert');
const st1=await p.evaluate(()=>({h:S.hearts,ch:statC('chapters'),art:statC('bookart'),bk:statC('books')}));log('stats',st0,st1);ok(st1.ch===12&&st1.bk===1&&st1.art>=1,'dress-up counters moved chapters/books/bookart');
// dress goals shows book challenges progress
await p.evaluate(()=>{renderDress()});await p.waitForTimeout(200);await p.click('[data-act="du-tab"][data-t="goals"]').catch(()=>{});await p.waitForTimeout(200);const gt=await txt(p);log('goals book lines',(gt.match(/.*(chapter|book|draw).*\n?.*/gi)||[]).slice(0,6));await shot(p,P+'11-goals');
const bunny=await p.evaluate(()=>isOwned(allItems().find(i=>i.id==='bunnyears')));ok(bunny,'Bunny Ears (5 chapters) unlocked');
// privacy: sample prompts
if(stub){const pr=await p.evaluate(()=>window.__prompts.map(x=>x.prompt));log('prompts',pr.length);const fs=await import('fs');fs.writeFileSync('/home/claude/kids-learning-apps/qa/r2-verify/prompts-'+mode+'.txt',pr.join('\n=====\n'));
 const leaks=pr.filter(x=>/Mia\b/.test(x)||x.includes(TITLE)||x.includes(AUTH)||/Pipeworks|Quill/.test(x));ok(pr.length>=4&&leaks.length===0,`no child name/title/author in ${pr.length} sample prompts (leaks ${leaks.length})`);
 const bcpr=pr.filter(x=>/reading coach|reading buddy/.test(x));ok(bcpr.every(x=>!/Palm Beach/.test(x)),'book prompts have no location');
}
// reload -> gallery
if(stub)await p.evaluate(()=>{Object.keys(localStorage).filter(k=>k.startsWith('critter-cove-art')).forEach(k=>localStorage.removeItem(k))});
await p.reload();await p.waitForTimeout(900);await p.click('[data-act="bookclub"]');await p.waitForTimeout(1200);await shot(p,P+'12-gallery-reload');
const gal=await p.evaluate(()=>({n:document.querySelectorAll('.bc-gitem img').length,ok:document.querySelectorAll('.bc-gitem img.ok').length,miss:document.querySelectorAll('.bc-gitem img.miss').length}));log('gallery',gal);ok(gal.n>=1&&gal.ok===gal.n,'gallery shows drawing after reload'+(stub?' (loaded from db doc)':''));
// grown-ups reading log + copy
await p.evaluate(()=>renderDash());await p.waitForTimeout(300);await au('dash');await shot(p,P+'13-dash');
const rl=await p.evaluate(()=>{const s=[...document.querySelectorAll('section')].find(s=>/reading log/i.test(s.innerText));return s&&s.innerText.slice(0,300)});log('rlog',rl&&rl.replace(/\n/g,' | '));
await p.click('[data-act="dash-rlog"]');await p.waitForTimeout(400);const clip=await p.evaluate(async()=>{try{return await navigator.clipboard.readText()}catch(e){return 'ERR '+e.message}});const ct=await toast();
const modalTxt=await p.evaluate(()=>{const m=document.querySelector('#modal');return m&&!m.hidden?(m.querySelector('textarea')||m).innerText||m.querySelector('textarea').value:''});
log('copy toast',ct,'clip',clip.slice(0,200),'modal',modalTxt.slice(0,100));ok(/Chapter 1/.test(clip)||/Chapter 1/.test(modalTxt),'reading log copied (or copy box shown)');ok(/The Moonlight Pipeworks by Zara Quill/.test(clip+modalTxt),'log has title by author');
ok(!TIMEWORDS.test(await txt(p)),'no time words');
ok(p.errs.length===0,'no uncaught errors: '+p.errs.join(' | '));
for(const a of auds){if(a.overflow>0)ok(false,`overflow ${a.overflow}px on ${a.t}`);if(a.small.length)R.push(`INFO small targets ${a.t}: `+a.small.slice(0,8).join('; '));if(a.clip.length)R.push(`INFO clipped ${a.t}: `+a.clip.slice(0,5).join('; '));if(a.lowc.length)R.push(`INFO lowcontrast ${a.t}: `+[...new Set(a.lowc)].slice(0,5).join('; '))}
for(const x of R)console.log(x);await p.b.close();
