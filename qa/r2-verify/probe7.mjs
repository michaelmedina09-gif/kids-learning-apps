import {open} from './lib.mjs';import fs from 'fs';
const raw=fs.readFileSync('dino-state-d1.json','utf8');
const p=await open('dino','ipad');
await p.evaluate(r=>{localStorage.setItem('dino-star-patrol-v1',r);localStorage.setItem('dino-star-patrol-v1x',r);localStorage.setItem('zz',r)},raw);
await p.reload();await p.waitForTimeout(800);console.log(await p.evaluate(()=>Object.keys(localStorage).map(k=>k+':'+localStorage.getItem(k).length)));
const p2=await open('dino','ipad',{browser:p.b});
await p2.evaluate(r=>{localStorage.setItem('dino-star-patrol-v1',r)},raw.replace(/"reset":[a-z]+/,''));await p2.reload();await p2.waitForTimeout(800);console.log('p2',await p2.evaluate(()=>[screen,Object.keys(localStorage).join()]));
const obj=JSON.parse(raw);console.log('keys with reset?',JSON.stringify(obj).match(/"reset[^,]*/g), 'updated',obj.updated, new Date(obj.updated).toISOString());
await p.b.close();
