// Dino: box 5 card answered right -> retired; miss at box 4 -> box 1
import {open,log} from './lib.mjs';
const p=await open('dino','ipad');
const r=await p.evaluate(()=>{S=newState('Leo');for(const k in S.placement)if(k!=='at')S.placement[k]=true;S.egg='sky';
 reviewAdd('add',mk('add',2));reviewAdd('sight',mk('sight',2));const [a,b]=S.review;a.box=5;a.due=today();a.wins=4;b.box=4;b.due=today();save();
 reviewResult(a.key,true);reviewResult(b.key,false);return{a:JSON.stringify(S.review[0]),b:JSON.stringify(S.review[1]),t:addDays(1),stats:reviewStats()}});
log(r);console.log(r.a.includes('"done":true')||/"box":6/.test(r.a)?'PASS box5 right -> retired':'FAIL box5 right not retired');console.log(/"box":1/.test(r.b)&&r.b.includes(r.t)?'PASS box4 miss -> box1 tomorrow':'FAIL box4 miss');await p.b.close();
