import pw from '/opt/node-tools/node_modules/playwright/index.js';const {chromium}=pw;
const b=await chromium.launch();let lost=0,lostApp=0;
for(let i=0;i<15;i++){const ctx=await b.newContext();const p=await ctx.newPage();await p.goto('file:///home/claude/kids-learning-apps/qa/r2-verify/wrap/blank.html');
 await p.evaluate(()=>localStorage.setItem('k'+Math.random(),'x'.repeat(3000)));await p.reload();if(await p.evaluate(()=>localStorage.length)===0)lost++;await ctx.close()}
for(let i=0;i<15;i++){const ctx=await b.newContext();const p=await ctx.newPage();await p.goto('file:///home/claude/kids-learning-apps/qa/r2-verify/wrap/blank.html');
 await p.evaluate(()=>localStorage.setItem('k','x'.repeat(3000)));await p.waitForTimeout(1500);await p.reload();if(await p.evaluate(()=>localStorage.length)===0)lostApp++;await ctx.close()}
console.log('blank page immediate reload lost',lost,'/15; after 1.5s wait lost',lostApp,'/15');await b.close();
