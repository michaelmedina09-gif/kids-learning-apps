import {open} from './lib.mjs';import {placed} from './setup.mjs';
const p=await open('dino-star-patrol.html','iphone');await placed(p);await p.evaluate(()=>openLearn('rex'));
console.log(await p.evaluate(()=>[...document.querySelector('.learn-h').children].map(c=>`${c.tagName}.${c.className&&c.className.baseVal!==undefined?c.className.baseVal:c.className} ${Math.round(c.getBoundingClientRect().width)}`)),await p.evaluate(()=>getComputedStyle(document.querySelector('.learn')).padding));await p.b.close();
