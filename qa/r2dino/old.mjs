import pw from '/opt/node-tools/node_modules/playwright/index.js';const {chromium}=pw;
const b=await chromium.launch();
const cases={
 critter:{file:'critter-cove.html',key:'critter-cove-v1',states:{
  minimal:{v:1,name:'Old',skills:{facts:{level:2,recent:[],hist:[],seen:0,correct:0}},placement:{math:true,spell:true,write:true,at:1},hearts:500,rescueHearts:10,current:'owl',rescued:[{id:'manatee',name:'M'},{id:'owl',name:'O'}],streak:{n:2,last:'2026-09-20'},days:{},missed:{},writing:[]},
  sceneNoDecor:{v:1,name:'S',skills:{},placement:{math:true,spell:true,write:true,at:1},hearts:5,rescueHearts:0,current:'fox',rescued:[],scene:{bg:'moonbase'},outfit:{cur:{hat:'no-such-hat',face:'ghost'}},bought:['gone-item']},
  sceneUnknown:{v:1,name:'S',skills:{},placement:{math:true,spell:true,write:true,at:1},hearts:5,rescueHearts:0,current:'fox',rescued:[],scene:{bg:'nope',decor:['nope2','umbrella','x','y']},stats:null},
  noPlacement:{v:1,name:'P',skills:{},hearts:0,rescueHearts:0,current:null,rescued:[]},
  bestMissing:{v:1,name:'B',skills:{},placement:{math:true,spell:true,write:true,at:1},hearts:0,rescueHearts:0,current:'fox',rescued:[],best:{},streak:null,days:{'2026-09-27':{sec:600,done:{math:true}}}},
  corruptJSON:'{not json',
 }},
 dino:{file:'dino-star-patrol.html',key:'dino-star-patrol-v1',states:{
  minimal:{v:1,name:'Old',skills:{count:{level:2,recent:[],hist:[],seen:0,correct:0}},placement:{math:true,read:true,at:1},stars:500,eggStars:10,egg:'sky',crew:[{id:'rex',name:'R'},{id:'dodo',name:'D'}],streak:{n:1,last:'2026-09-20'},days:{},words:{}},
  sceneNoDecor:{v:1,name:'S',skills:{},placement:{math:true,read:true,at:1},stars:5,eggStars:0,egg:'sky',crew:[{id:'rex',name:'R'}],scene:{bg:'moonbase'},outfit:{c0:{hat:'no-such-hat'}},bought:['gone']},
  sceneUnknown:{v:1,name:'S',skills:{},placement:{math:true,read:true,at:1},stars:5,eggStars:0,egg:'sky',crew:[],scene:{bg:'nope',decor:['nope2']},stats:null},
  noPlacement:{v:1,name:'P',skills:{},stars:0,eggStars:0,egg:null,crew:[]},
  hatching:{v:1,name:'H',skills:{},placement:{math:true,read:true,at:1},stars:40,eggStars:40,egg:'sky',hatching:'notadino',crew:[]},
  corruptJSON:'{not json',
  r1WithMissed:{v:1,name:'W',skills:{sight:{level:2,recent:[],hist:[],seen:3,correct:1}},placement:{math:true,read:true,at:1},stars:50,eggStars:3,egg:'sky',crew:[{id:'rex',name:'R'}],streak:{n:1,last:'2026-09-20'},missed:{said:{miss:2,right:0,skill:'sight'},frog:{miss:1,right:0,skill:'spell'},zzz:{miss:1,skill:'nope'}},days:{}},
  r2Junk:{v:1,name:'J',skills:{},placement:{math:true,read:true,at:1},stars:5,eggStars:0,egg:'sky',crew:[],review:[null,{key:5},{key:'x',skill:'nope',q:{}},{key:'add:1',skill:'add',q:{regen:1,skill:'add',level:2},box:9,due:'2020-01-01'},{key:'elk:ship',skill:'sounds',q:{kind:'elk',w:'ship'},box:1,due:'2020-01-01',wins:0}],rex:{cur:99,stories:null},snd:{lv:7,hist:'x'},blastLog:'no',best:null},
  todayDoneOld:{v:1,name:'T',skills:{},placement:{math:true,read:true,at:1},stars:5,eggStars:0,egg:'sky',crew:[],days:{[new Date().toISOString().slice(0,10)]:{sec:900,q:10,c:8,areas:{},done:{blast:true,math:true,read:true,write:true},complete:true}}},
 }}};
delete cases.critter;
for(const [app,c] of Object.entries(cases))for(const [nm,st] of Object.entries(c.states)){
 const ctx=await b.newContext({viewport:{width:1024,height:1366},hasTouch:true});await ctx.addInitScript(([k,v])=>{if(!sessionStorage.getItem('seeded')){localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v));sessionStorage.setItem('seeded','1')}},[c.key,st]);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.text().startsWith('STATE'))console.log(m.text());if(m.type()==='error'&&!/net::|fonts/.test(m.text()))errs.push('console '+m.text())});
 await p.goto('file:///home/claude/kla-dino/qa/r2dino/wrap/'+c.file);await p.waitForTimeout(400);
 const steps=[];const tryStep=async(n,fn)=>{const e0=errs.length;try{await p.evaluate(fn)}catch(e){errs.push(n+': '+e.message.split('\n')[0])}await p.waitForTimeout(150);steps.push(`${n}:${await p.evaluate(()=>screen)}${errs.length>e0?'!':''}`)};
 steps.push('boot:'+await p.evaluate(()=>typeof screen!=='undefined'?screen:'?'));
 await tryStep('render',()=>render());
 await tryStep('dress',()=>{if(!S)return;for(const t of ['hat','face','neck','hold','bg','decor','goals']){DU.tab=t;renderDress()}});
 await tryStep('du-item-decor',()=>{if(!S)return;DU.tab='decor';renderDress();document.querySelector('.tile2')?.click()});
 await tryStep('du-item-hat',()=>{if(!S)return;DU.tab='hat';renderDress();document.querySelector('.tile2')?.click()});
 await tryStep('du-clear',()=>{document.querySelector('[data-act="du-clear"]')?.click()});
 await tryStep('guide',()=>{if(S)renderGuide()});
 await tryStep('dash',()=>{if(S)renderDash()});
 await tryStep('home',()=>{if(S)goHome()});
 await tryStep('station',()=>{if(S&&S.placement&&(S.current||S.egg))startStation('math')});
 await tryStep('home2',()=>{if(S)goHome()});
 await tryStep('comeback',()=>{if(S&&S.placement&&S.egg)startStation('comeback')});await tryStep('cbgo',()=>{if(screen==='cb-intro')nextQ()});await tryStep('rex',()=>{if(S&&S.placement&&S.egg){goHome();startStation('rex')}});await tryStep('rexread',()=>{if(screen==='rex'){ACT['rex-go']();ACT['rex-next']()}});await tryStep('readwarm',()=>{if(S&&S.placement&&S.egg){goHome();startStation('read')}});await tryStep('dash2',()=>{if(S)renderDash()});await tryStep('summary',()=>{if(S)summaryText()});
 await tryStep('state',()=>{if(S)console.log('STATE',S.name,'review',S.review.length,S.review.map(x=>x.key).join(','),'rex.cur',S.rex.cur,'snd',S.snd.lv,'stations',stations().map(x=>x.id).join(','))});
 await tryStep('checkUnlocks',()=>{if(S)save()});
 await p.screenshot({path:`/home/claude/kla-dino/qa/shots/round2-dino/old-${app}-${nm}.png`});
 console.log(app,nm,steps.join(' '),errs.length?'ERRORS: '+[...new Set(errs)].join(' || '):'ok');await ctx.close()}
await b.close();
