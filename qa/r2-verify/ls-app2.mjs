import pw from '/opt/node-tools/node_modules/playwright/index.js';const {chromium}=pw;import {URL} from './lib.mjs';
const b=await chromium.launch();const tally={};
for(const which of ['cove','blank'])for(let i=0;i<20;i++){const ctx=await b.newContext();const p=await ctx.newPage();await p.goto(which==='blank'?'file:///home/claude/kids-learning-apps/qa/r2-verify/wrap/blank.html':URL.cove);await p.waitForTimeout(500);
 await p.evaluate(w=>{if(w==='cove'){S=newState('Kid');save()}else localStorage.setItem('critter-cove-v1',JSON.stringify({x:'y'.repeat(4000)}));localStorage.setItem('zzfor','1')},which);await p.reload();await p.waitForTimeout(300);
 const r=await p.evaluate(()=>(localStorage.getItem('critter-cove-v1')?'A':'-')+(localStorage.getItem('zzfor')?'F':'-'));tally[which+':'+r]=(tally[which+':'+r]||0)+1;await ctx.close()}
console.log(tally);await b.close();
