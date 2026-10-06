// Collect every FIXED spoken line from both apps -> au-lines-<app>.json
// (used by tools/gen-audio.py to pre-record them with the Heart voice)
import {open} from './lib.mjs';
import {placed} from './setup.mjs';
import fs from 'fs';

// identical copy of the in-app auKey() — keys must match at runtime
const auKey = t => {
  t = String(t).replace(/\s+/g, ' ').trim().toLowerCase();
  let h = 5381;
  for (let i = 0; i < t.length; i++) h = ((h * 33) ^ t.charCodeAt(i)) >>> 0;
  return t.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) + '-' + h.toString(36);
};

const litSay = file => { // say('...') literals in the source
  const src = fs.readFileSync('/home/user/kids-learning-apps/apps/' + file, 'utf8');
  const out = new Set();
  for (const m of src.matchAll(/\bsay\((['"])([^'"\\]{3,120})\1\)/g)) out.add(m[2]);
  for (const m of src.matchAll(/\bsay\(\[(['"])([^'"\\]{3,120})\1/g)) out.add(m[2]);
  return [...out];
};

async function dino() {
  const p = await open('dino-star-patrol.html', 'ipadair');
  await placed(p);
  const texts = await p.evaluate(() => {
    const got = new Set();
    const add = t => { t = String(t).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); if (t && !/^\d+$/.test(t)) t.split('|').forEach(x => { x = x.trim(); if (x) got.add(x); }); };
    RUN = {used: new Set()};
    for (const id of Object.keys(GEN).filter(id => SK[id] && SK[id].area !== 'math'))
      for (let L = 1; L <= 5; L++) for (let k = 0; k < 300; k++) {
        let q; try { q = mk(id, L) } catch (e) { continue }
        for (const part of [].concat(q.say || [], q.sayAgain || [], q.sayAll || []))
          if (typeof part === 'string') add(part);
        RUN.used = new Set();
      }
    return [...got];
  });
  await p.b.close();
  return texts.concat(litSay('dino-star-patrol.html'));
}

async function cove() {
  const p = await open('critter-cove.html', 'ipadair');
  await placed(p);
  const texts = await p.evaluate(() => {
    const out = new Set();
    for (const e of SPELL) {
      const plain = e.s.replace('___', e.w);
      out.add(e.w); out.add(plain);
      out.add(plain + '. Which word is spelled correctly?');
    }
    return [...out];
  });
  await p.b.close();
  return texts.concat(litSay('critter-cove.html'));
}

for (const [app, fn] of [['dino', dino], ['cove', cove]]) {
  const texts = [...new Set(await fn())];
  const lines = texts.map(text => ({key: auKey(text), text}));
  const dup = lines.length - new Set(lines.map(l => l.key)).size;
  fs.writeFileSync(`/home/user/kids-learning-apps/qa/au-lines-${app}.json`, JSON.stringify(lines, null, 1));
  console.log(app, lines.length, 'lines', dup ? ('KEY COLLISIONS: ' + dup) : '(no key collisions)');
}
