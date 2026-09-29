import {open} from './lib.mjs';
const p=await open('ipad');
const r=await p.evaluate(()=>{S=newState('T');const out={};for(const id of Object.keys(GEN).concat(Object.keys(BANKS))){let mx=0,sum=0;for(let i=0;i<30;i++){for(let L=1;L<=5;L++){const q=(GEN[id]||((L)=>bankQ(id,L)))(L);const n=JSON.stringify(q).length;mx=Math.max(mx,n);sum+=n}}out[id]=[mx,Math.round(sum/150)]}return out});
console.log(r);console.log(p.errs);await p.b.close();
