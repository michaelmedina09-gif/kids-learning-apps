// Grown-ups gate: real touch press-and-hold on iPhone/iPad-air (CDP touch events); quick tap must not open.
import {open,log} from './lib.mjs';
const app=process.argv[2]||'cove',vp=process.argv[3]||'iphone';const p=await open(app,vp);
await p.evaluate(app=>{if(app==='cove'){S=newState('Mia');S.placement={math:true,spell:true,write:true,at:Date.now()};S.current='fox'}else{S=newState('Leo');for(const k in S.placement)if(k!=='at')S.placement[k]=true;S.egg='sky'}save();render()},app);await p.waitForTimeout(300);
const cdp=await p.ctx.newCDPSession(p);const sel=app==='cove'?'#gate':'#gate,[aria-label*="Grown-ups"]';
const bb=await p.locator(sel).first().boundingBox();const x=bb.x+bb.width/2,y=bb.y+bb.height/2;
const touch=async ms=>{await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await p.waitForTimeout(ms);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForTimeout(400);return p.evaluate(()=>screen)};
log(app,vp,'quick tap ->',await touch(80));await p.evaluate(()=>render());log(app,vp,'1.6s hold ->',await touch(1600));log(p.errs);await p.b.close();
