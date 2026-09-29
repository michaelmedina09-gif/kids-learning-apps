import {open} from './lib.mjs';import {placed} from './setup.mjs';
const p=await open('dino-star-patrol.html','iphone');await placed(p);
for(const [id,L] of [['compare',1],['story',1],['count',2]]){await p.evaluate(([id,L])=>{RUN={mode:'practice',station:'x',title:'T',planner:{pos:()=>0,total:1,next:()=>null},results:[],used:new Set(),earned:0,ups:[]};let q,best=0;for(let i=0;i<40;i++){const x=mk(id,L);const n=(x.fig||x.prompt||'').length;if(n>best){best=n;q=x}}RUN.q=q;RUN.tries=0;RUN.locked=false;A={buf:'',pick:[]};renderQ();scrollTo(0,0)},[id,L]);await p.waitForTimeout(200);await p.screenshot({path:`/home/claude/cove/qa/shots/dino-iphone-${id}${L}.png`,fullPage:true})}
await p.b.close();
