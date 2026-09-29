import pw from '/opt/node-tools/node_modules/playwright/index.js';const {chromium}=pw;import {URL} from './lib.mjs';
const b=await chromium.launch();
async function t(url,label,prep){let lost=0;for(let i=0;i<16;i++){const ctx=await b.newContext();const p=await ctx.newPage();await p.goto(url);await p.waitForTimeout(500);
 await p.evaluate(()=>{localStorage.setItem('qqq','x'.repeat(15000))});await p.reload();await p.waitForTimeout(300);if(!(await p.evaluate(()=>localStorage.getItem('qqq'))))lost++;await ctx.close()}console.log(label,'lost',lost,'/16')}
await t('file:///home/claude/kids-learning-apps/qa/r2-verify/wrap/blank.html','blank 15KB');
await t(URL.cove,'cove page, foreign key');
await t(URL.dinopub,'published dino page, foreign key');
await b.close();
