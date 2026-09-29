import {open} from './lib.mjs';import fs from 'fs';
const raw=fs.readFileSync('dino-state-d1.json','utf8');
const p=await open('dino','ipad');
await p.evaluate(r=>{localStorage.setItem('k_small','x');localStorage.setItem('k_big','y'.repeat(15000));localStorage.setItem('k_raw',r);localStorage.setItem('k_raw2',r.slice(0,7000))},raw);
await p.reload();await p.waitForTimeout(800);console.log(await p.evaluate(()=>Object.keys(localStorage).map(k=>k+':'+localStorage.getItem(k).length)));
await p.b.close();
