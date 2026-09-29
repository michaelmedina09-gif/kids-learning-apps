import {open} from './lib.mjs';import fs from 'fs';
const raw=fs.readFileSync('dino-state-d1.json','utf8');
const p=await open('dino','ipad',{init:`window.__rm=[];const __o=Storage.prototype.removeItem;Storage.prototype.removeItem=function(k){console.log('RM '+k+' '+new Error().stack.split('\\n').slice(2,6).join(' | '));return __o.call(this,k)};const __s=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='dino-star-patrol-v1')console.log('SET '+String(v).length+' '+new Error().stack.split('\\n').slice(2,4).join(' | '));return __s.call(this,k,v)};const __c=Storage.prototype.clear;Storage.prototype.clear=function(){console.log('CLEAR '+new Error().stack);return __c.call(this)}`});
p.on('console',m=>{if(/^(RM|SET|CLEAR)/.test(m.text()))console.log('>>',m.text().slice(0,400))});
await p.evaluate(r=>{localStorage.setItem('dino-star-patrol-v1',r)},raw);
for(let i=0;i<4;i++){await p.waitForTimeout(500);console.log(i,await p.evaluate(()=>!!localStorage.getItem('dino-star-patrol-v1')))}
await p.reload();await p.waitForTimeout(800);console.log('after',await p.evaluate(()=>!!localStorage.getItem('dino-star-patrol-v1')));
await p.b.close();
