// Guards the speech pipeline: no question may ever SPEAK its pause numbers
// (bug 2026-10-05: fullSay nested q.say arrays, so TTS read "300 / 700 / 800" aloud).
import {open, SPEECH_MOCK} from './lib.mjs';
import {placed} from './setup.mjs';
const p = await open('dino-star-patrol.html', 'ipadair', {init: SPEECH_MOCK});
await placed(p);
const r = await p.evaluate(async () => {
  const bad = [];
  let n = 0;
  RUN = {used: new Set()};
  for (const id of Object.keys(GEN).filter(id => SK[id] && SK[id].area !== 'math')) for (let L = 1; L <= 5; L++) for (let k = 0; k < 30; k++) {
    let q; try { q = mk(id, L) } catch (e) { continue }
    n++;
    for (const out of [fullSay(q), [].concat(q.sayAgain || []), [].concat(q.sayAll || [])]) {
      if (out.some(Array.isArray)) bad.push(id + L + ' NESTED: ' + JSON.stringify(out).slice(0, 90));
      for (const part of out) {
        if (typeof part === 'string' && /(^|[\s,|])\d{3,4}([\s,|]|$)/.test(part.replace(/<[^>]+>/g, '')) && !/hundred|thousand|\+|−|×|÷|=/.test(part))
          bad.push(id + L + ' SPOKEN-NUMBER: "' + part.replace(/<[^>]+>/g, '').slice(0, 80) + '"');
      }
    }
    RUN.used = new Set();
  }
  // live check: speak one sight-word question through the real say() with mocked TTS
  window.__spoken = [];
  const q = mk('sight', 3);
  say(fullSay(q));
  await new Promise(r => setTimeout(r, 2500));
  const heard = __spoken.join(' | ');
  if (/\b\d{3}\b/.test(heard)) bad.push('LIVE: spoke numbers: ' + heard.slice(0, 120));
  if (!heard.toLowerCase().includes(q.word.toLowerCase())) bad.push('LIVE: never spoke the word "' + q.word + '": ' + heard.slice(0, 120));
  return {checked: n, heardSample: heard.slice(0, 140), bad: bad.slice(0, 10)};
});
console.log(JSON.stringify(r, null, 1));
await p.b.close();
process.exit(r.bad.length ? 1 : 0);
