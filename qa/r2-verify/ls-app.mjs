import pw from '/opt/node-tools/node_modules/playwright/index.js';const {chromium}=pw;import {URL,DATE_MOCK,SPEECH_MOCK} from './lib.mjs';
const which=process.argv[2]||'cove',mocks=process.argv[3]!=='nomock';const KEY=which==='cove'?'critter-cove-v1':'dino-star-patrol-v1';
const TR=`const __o=Storage.prototype.removeItem;Storage.prototype.removeItem=function(k){console.log('RM '+k);return __o.call(this,k)};const __c=Storage.prototype.clear;Storage.prototype.clear=function(){console.log('CLEAR');return __c.call(this)};addEventListener('pagehide',()=>console.log('PAGEHIDE has='+!!localStorage.getItem('${KEY}')));console.log('START has='+!!localStorage.getItem('${KEY}'));`;
const b=await chromium.launch();let lost=0;const logs=[];
for(let i=0;i<12;i++){const ctx=await b.newContext();if(mocks){await ctx.addInitScript(DATE_MOCK);await ctx.addInitScript(SPEECH_MOCK)}await ctx.addInitScript(TR);const p=await ctx.newPage();p.on('console',m=>{if(/^(RM|CLEAR|PAGEHIDE|START)/.test(m.text()))logs.push(i+' '+m.text())});
 await p.goto(URL[which]);await p.waitForTimeout(600);
 await p.evaluate(()=>{S=newState('Kid');save()});await p.waitForTimeout(i%2?0:300);await p.reload();await p.waitForTimeout(500);
 const has=await p.evaluate(k=>!!localStorage.getItem(k),KEY);if(!has)lost++;await ctx.close()}
console.log(which,'mocks',mocks,'lost',lost,'/12');console.log(logs.filter(l=>/RM|CLEAR|has=false/.test(l)).slice(0,20).join('\n'));await b.close();
