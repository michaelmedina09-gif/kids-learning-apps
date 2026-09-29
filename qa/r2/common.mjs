export async function setup(p,name='Mia'){
 await p.fill('#nm',name);await p.click('[data-act="welcome-go"]');await p.click('[data-act="pick-rescue"]');
 await p.evaluate(()=>{S.placement={math:true,spell:true,write:true,at:Date.now()};save();renderHome()});}
export async function draw(p,sel='#drc'){await p.locator(sel).scrollIntoViewIfNeeded();await p.evaluate(s=>{const r=document.querySelector(s).getBoundingClientRect();scrollBy(0,r.top-60)},sel);await p.waitForTimeout(100);const b=await p.locator(sel).boundingBox();b.height=Math.min(b.height,844-b.y-20);
 const lines=[[.1,.8,.9,.8],[.2,.2,.4,.6],[.5,.3,.8,.5],[.3,.5,.35,.7]];
 for(const [x1,y1,x2,y2] of lines){await p.mouse.move(b.x+b.width*x1,b.y+b.height*y1);await p.mouse.down();for(let i=1;i<=12;i++)await p.mouse.move(b.x+b.width*(x1+(x2-x1)*i/12),b.y+b.height*(y1+(y2-y1)*i/12));await p.mouse.up()}}
export const toastText=p=>p.evaluate(()=>{const t=document.querySelector('#toast');return t&&!t.hidden?t.innerText:''});
