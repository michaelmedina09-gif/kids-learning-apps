// Recorded-voice coverage check (run after tools/pack-audio.py):
//  1. every key the app knows has an mp3 on disk and sits in the pack the app will fetch
//  2. every harvested line plays 100% in Heart (auPlan has no device-voice parts)
//  3. FRESH random questions (not the harvested ones) — report how often anything falls back
import {open, SPEECH_MOCK} from './lib.mjs';
import {placed} from './setup.mjs';
import fs from 'fs';
const STAGE = process.argv[2];
let fail = 0; const no = m => { fail++; console.log('FAIL', m) };
for (const [app, file] of [['dino', 'dino-star-patrol.html'], ['cove', 'critter-cove.html']]) {
  const src = fs.readFileSync('/home/user/kids-learning-apps/apps/' + file, 'utf8');
  const keys = JSON.parse(src.match(/AU_KEYS_START\*\/const AU=new Set\((\[.*?\])\);\/\*AU_KEYS_END/)[1]);
  const packs = [...Array(48).keys()].map(i => JSON.parse(fs.readFileSync(`${STAGE}/${app}/au/p${i}.json`, 'utf8')));
  const bad = keys.filter(k => !fs.existsSync(`/home/user/kids-learning-apps/assets/audio/${app}/${k}.mp3`) || !packs[parseInt(k.slice(k.lastIndexOf('-') + 1), 36) % 48][k]);
  bad.length ? no(`${app}: ${bad.length} keys missing audio/pack, e.g. ${bad.slice(0, 3)}`) : console.log(`PASS ${app}: ${keys.length} keys all have audio in the right pack`);
  const harvest = JSON.parse(fs.readFileSync(`harvest-${app}.json`, 'utf8'));
  const p = await open(file, 'ipadair', {init: SPEECH_MOCK});
  await placed(p);
  const r = await p.evaluate(harvest => {
    const unc = harvest.filter(t => auPlan(t).some(x => x.t));
    let n = 0, fall = 0; const ex = new Set();
    for (const id of Object.keys(GEN).filter(id => SK[id])) for (let L = 1; L <= 5; L++) for (let k = 0; k < 25; k++) {
      RUN = {used: new Set()}; let q; try { q = mk(id, L) } catch (e) { continue }
      const heard = []; const sn = window.speakNow; window.speakNow = (t, after) => { heard.push(t) };
      RUN = {mode: 'practice', station: 'math', title: 'T', planner: {pos: () => 0, total: 1, next: () => null}, results: [], used: new Set(), earned: 0, ups: [], missed: [], q, tries: 0, locked: false};
      try { ACT.speak() } catch (e) {} try { ACT.sayagain && ACT.sayagain() } catch (e) {}
      window.speakNow = sn;
      for (const part of [].concat(q.say || [], q.sayAgain || [], q.sayAll || [], heard)) if (typeof part === 'string') part.split('|').forEach(x => {
        x = x.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); if (!x) return; n++;
        const pl = auPlan(x); if (pl.some(y => y.t)) { fall++; ex.add(pl.filter(y => y.t).map(y => y.t).join(' / ').slice(0, 70)) }
      });
    }
    return {unc: unc.slice(0, 6), uncN: unc.length, n, fall, ex: [...ex].slice(0, 8)};
  }, harvest);
  await p.b.close();
  r.uncN ? no(`${app}: ${r.uncN} harvested lines still use the device voice, e.g. ${JSON.stringify(r.unc)}`) : console.log(`PASS ${app}: all ${harvest.length} harvested lines play fully in Heart`);
  console.log(`INFO ${app}: fresh random questions — ${r.n} spoken lines, ${r.fall} with any device-voice part (${(100 * r.fall / Math.max(1, r.n)).toFixed(2)}%)`, r.ex);
  if (r.fall / Math.max(1, r.n) > 0.01) no(`${app}: more than 1% of fresh question lines fall back to the device voice`);
}
console.log(fail ? fail + ' FAILURES' : 'AU-CHECK PASS'); process.exit(fail ? 1 : 0);
