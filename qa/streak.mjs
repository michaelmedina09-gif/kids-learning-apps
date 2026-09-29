import {open} from './lib.mjs';import {placed} from './setup.mjs';
for(const f of ['critter-cove.html','dino-star-patrol.html']){const p=await open(f,'ipad');await placed(p);
 console.log(f,await p.evaluate(()=>{const r=[];S.streak={n:5,last:yesterday()};r.push('yday5 now='+streakNow());bumpStreak();r.push('after bump='+S.streak.n+' now='+streakNow());bumpStreak();r.push('double bump='+S.streak.n);S.streak={n:5,last:'2026-09-01'};r.push('stale now='+streakNow());bumpStreak();r.push('stale bump='+S.streak.n);r.push('best='+S.stats.streakBest);return r.join(' | ')}));await p.b.close()}
