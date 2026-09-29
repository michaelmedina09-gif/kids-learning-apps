// Why does bookclub button vanish after reload?
import {open,shot,log} from './lib.mjs';
const stub=process.argv[2]==='stub';
const p=await open('cove','ipad',{stub});
await p.fill('#nm','Mia');await p.click('[data-act="welcome-go"]');await p.locator('[data-act="pick-rescue"]').first().click();
await p.evaluate(()=>{S.placement={math:true,spell:true,write:true,at:Date.now()};save();renderHome()});
await p.click('[data-act="bookclub"]');await p.click('[data-act="bc-add"]:not([data-s])');await p.fill('#bTitle','Test Book');await p.fill('#bAuthor','A B');await p.fill('#bCh','12');await p.click('[data-act="bc-save-book"]');
await p.evaluate(()=>{const b=S.books[0];for(let i=1;i<=12;i++)b.log.push({ch:i,date:today(),summary:'She went to the market because she needed food.',qs:[],art:false,story:'',artId:null});save()});
for(const w of [0,1500]){await p.waitForTimeout(w);await p.reload();await p.waitForTimeout(1200);
 log('wait',w,await p.evaluate(()=>({screen,has:!!localStorage.getItem('critter-cove-v1'),keys:Object.keys(localStorage),books:S&&S.books&&S.books.length,acts:[...document.querySelectorAll('[data-act]')].map(e=>e.dataset.act).slice(0,15)})));await shot(p,'cove-reload-'+w+(stub?'-stub':''))}
log(p.errs);await p.b.close();
