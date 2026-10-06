// Recorded-voice coverage: every injected AU key has an mp3 on disk, and every
// speech chunk of freshly generated reading/spelling questions is recorded
// (so kids hear the Heart voice, never the robot, on those stations).
import {open} from './lib.mjs';
import {placed} from './setup.mjs';
import fs from 'fs';
let fail = 0;
const no = m => { fail++; console.log('FAIL', m) };

for (const [app, file] of [['dino', 'dino-star-patrol.html'], ['cove', 'critter-cove.html']]) {
  const src = fs.readFileSync('/home/user/kids-learning-apps/apps/' + file, 'utf8');
  const keys = JSON.parse(src.match(/AU_KEYS_START\*\/const AU=new Set\((\[.*?\])\);\/\*AU_KEYS_END/)[1]);
  const dir = `/home/user/kids-learning-apps/assets/audio/${app}/`;
  const missing = keys.filter(k => !fs.existsSync(dir + k + '.mp3'));
  if (missing.length) no(`${app}: ${missing.length} keys have no mp3, e.g. ${missing.slice(0, 3)}`);
  else console.log(`PASS ${app}: all ${keys.length} injected keys have audio files`);
  const empty = keys.filter(k => fs.existsSync(dir + k + '.mp3') && fs.statSync(dir + k + '.mp3').size < 1500);
  if (empty.length) no(`${app}: suspiciously tiny clips: ${empty.slice(0, 3)}`);

  const p = await open(file, 'ipadair');
  await placed(p);
  const r = await p.evaluate(app => {
    const bad = new Set(); let chunks = 0;
    const checkStr = t => String(t).replace(/<[^>]+>/g, ' ').split('|').forEach(x => {
      x = x.replace(/\s+/g, ' ').trim();
      if (!x) return; chunks++;
      if (!AU.has(auKey(x))) bad.add(x.slice(0, 60));
    });
    RUN = {used: new Set()};
    if (app === 'dino') {
      for (const id of Object.keys(GEN).filter(id => SK[id] && SK[id].area !== 'math'))
        for (let L = 1; L <= 5; L++) for (let k = 0; k < 120; k++) {
          let q; try { q = mk(id, L) } catch (e) { continue }
          [].concat(q.say || [], q.sayAgain || [], q.sayAll || []).forEach(x => { if (typeof x === 'string') checkStr(x) });
          RUN.used = new Set();
        }
    } else {
      for (const e of SPELL) { checkStr(e.w); checkStr(e.s.replace('___', e.w)); checkStr(e.s.replace('___', e.w) + '. Which word is spelled correctly?') }
    }
    return {chunks, bad: [...bad].slice(0, 8)};
  }, app);
  await p.b.close();
  if (r.bad.length) no(`${app}: unrecorded speech chunks: ${JSON.stringify(r.bad)}`);
  else console.log(`PASS ${app}: ${r.chunks} speech chunks all covered by recordings`);
}
console.log(fail ? fail + ' FAILURES' : 'AU-CHECK PASS');
process.exit(fail ? 1 : 0);
