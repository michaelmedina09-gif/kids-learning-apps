// How strict is bcSafe on normal, grounded coach text?
import {open,log} from './lib.mjs';
const p=await open('cove','ipad');
const sum='Mara found a strange box in the storeroom because the lights went out.';
const r=await p.evaluate(sum=>{const cases={
 q_opened:'You wrote "found a strange box". Why do you think she opened it?',
 q_feel:'You wrote "the lights went out". How do you think Mara felt?',
 q_scared:'You wrote "the lights went out". Was Mara scared or excited? Why?',
 q_next:'You wrote "a strange box". What might be inside it, and what clue makes you think so?',
 q_would:'You wrote "the lights went out". What would you do if that happened to you?',
 glow1:'You told who and what happened.',glow2:'You named the character and the main event clearly.',glow3:'Great job using the word because to explain why.',
 grow1:'Add why it happened.',grow2:'Try adding where the story takes place.',grow3:'Tell what Mara did next.',
 bad1:'In the real book, Lina finds the key.',bad2:'Why did she hide the golden key under the old bridge?',bad3:'You wrote "found a strange box". What was inside the silver chest?'};
 const o={};for(const [k,t] of Object.entries(cases))o[k]={safe:bcSafe(t,sum),quoted:bcQuoted(t,sum)};return o},sum);
for(const [k,v] of Object.entries(r))console.log(k.padEnd(8),v.safe?'SHOWN  ':'DROPPED',k.startsWith('q')||k.startsWith('bad')?'quoted='+v.quoted:'');await p.b.close();
