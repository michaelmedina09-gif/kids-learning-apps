import {open,setOff} from './lib.mjs';import fs from 'fs';
const raw=fs.readFileSync('dino-state-d1.json','utf8');
const p=await open('dino','ipad',{init:`window.__rm=[];const __o=Storage.prototype.removeItem;Storage.prototype.removeItem=function(k){window.__rm.push(k+' '+new Error().stack.split('\\n').slice(2,5).join(' '));return __o.call(this,k)};const __s=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='dino-star-patrol-v1')window.__rm.push('SET '+String(v).length);return __s.call(this,k,v)};window.__lsAtStart=localStorage.getItem('dino-star-patrol-v1')?localStorage.getItem('dino-star-patrol-v1').length:0;`});
await p.evaluate(r=>{localStorage.setItem('dino-star-patrol-v1',r);localStorage.setItem('__qaoff','0')},raw);
console.log('before',await p.evaluate(()=>localStorage.getItem(LS).length));
await p.reload();await p.waitForTimeout(1500);console.log('after reload0',await p.evaluate(()=>[screen,!!localStorage.getItem(LS),window.__lsAtStart,window.__rm]));
await p.b.close();
