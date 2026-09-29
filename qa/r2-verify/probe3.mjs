import {open,setOff} from './lib.mjs';
const p=await open('dino','ipad');
p.on('console',m=>console.log('C',m.type(),m.text().slice(0,200)));
console.log(await p.evaluate(()=>{localStorage.setItem('__qaoff','0');S=newState('Leo');for(const k in S.placement)if(k!=='at')S.placement[k]=true;S.placement.at=Date.now();S.egg='sky';
 reviewAdd('sounds',{kind:'elk',w:'ship'});reviewAdd('spell',{kind:'chain',from:'cat',to:'cap'});reviewAdd('sounds',{kind:'elk',w:'crab'});save();return Object.keys(localStorage).map(k=>k+':'+localStorage.getItem(k).length)}));
await setOff(p,1);console.log(await p.evaluate(()=>[screen,!!S,Object.keys(localStorage).join(',')]));
console.log(await p.evaluate(()=>{try{const r=JSON.parse(localStorage.getItem(LS));return typeof migrate==='function'?JSON.stringify(Object.keys(migrate(r)||{})).slice(0,200):'nomigrate'}catch(e){return 'ERR '+e.message+e.stack.slice(0,300)}}));
await p.b.close();
