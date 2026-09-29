import {open} from './lib.mjs';
for(const f of ['critter-cove.html','dino-star-patrol.html']){const p=await open(f,'iphone');console.log(f,await p.evaluate(()=>[innerWidth,innerHeight,document.documentElement.clientWidth,document.documentElement.scrollWidth]));await p.b.close()}
