// iPhone: can a spelling multiple-choice option be tapped?
import {open,shot,log} from './lib.mjs';
const which=process.argv[2]||'cove';const p=await open(which,'iphone');
await p.fill('#nm','Mia');await p.click('[data-act="welcome-go"]');await p.locator('[data-act="pick-rescue"]').first().click();await p.waitForTimeout(300);
await p.click('[data-act="start-check"][data-area="spell"]');await p.waitForTimeout(400);
for(let k=0;k<25;k++){const q=await p.evaluate(()=>RUN&&RUN.q&&{type:RUN.q.type,n:RUN.q.choices&&RUN.q.choices.length});if(!q)break;
 if(q.type==='mc'){await p.waitForTimeout(600);const info=await p.evaluate(()=>[...document.querySelectorAll('.choice')].map(b=>{const r=b.getBoundingClientRect();const x=r.left+r.width/2,y=r.top+r.height/2;const e=document.elementFromPoint(x,y);return{t:b.innerText,r:[r.left,r.top,r.width,r.height].map(Math.round),hit:e?e.className+'/'+e.tagName:'none',inView:y<innerHeight&&y>0}}));
  log('mc',JSON.stringify(info),'vh',await p.evaluate(()=>[innerWidth,innerHeight,document.documentElement.scrollHeight,scrollY]));await shot(p,which+'-iphone-spell-mc',false);await shot(p,which+'-iphone-spell-mc-full',true);
  const r=await p.locator('.choice[data-i="0"]').tap({timeout:5000}).then(()=>'tapped',e=>'TAPFAIL '+e.message.split('\n')[0]);log(r);break}
 // answer non-mc quickly via state
 const a=await p.evaluate(()=>RUN.q.answer);for(const ch of String(a).toLowerCase())await p.locator(`.kb [data-act="key"][data-k="${ch}"]`).click();await p.locator('.kb [data-act="check"]').click();await p.waitForTimeout(300);
 if(await p.$('#fb:not([hidden]) [data-act="next"]'))await p.click('#fb [data-act="next"]');else await p.waitForTimeout(1900)}
log(p.errs);await p.b.close();
