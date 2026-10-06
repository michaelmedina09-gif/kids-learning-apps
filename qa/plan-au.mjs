// Decide every clip to record, using the app's OWN auKey/auNumClips/AU_SENT_RE/AU_NUM_RE so keys always match playback.
import {open, SPEECH_MOCK} from './lib.mjs';
import fs from 'fs';
const BASE = [...Array(100).keys()].map(String).concat([1,2,3,4,5,6,7,8,9].map(n => n + ' hundred'),
  ['thousand', 'point', 'dollar', 'dollars', 'dollar and', 'dollars and', 'cent', 'cents', "o'clock", 'oh']);
for (const [app, file] of [['dino', 'dino-star-patrol.html'], ['cove', 'critter-cove.html']]) {
  const chunks = JSON.parse(fs.readFileSync(`harvest-${app}.json`, 'utf8'));
  const p = await open(file, 'ipadair', {init: SPEECH_MOCK});
  const units = await p.evaluate(([chunks, BASE]) => {
    const U = new Map(); // key -> {text, kind}
    const put = (text, kind) => { const k = auKey(text); if (k && !U.has(k)) U.set(k, {key: k, text: String(text).trim(), kind}); };
    BASE.forEach(t => put(t, 'piece'));
    for (const c of chunks) {
      const sents = (c.match(AU_SENT_RE) || [c]).map(s => s.trim()).filter(s => auKey(s));
      const hasNum = AU_NUM_RE.test(c);
      if (!hasNum && sents.length <= 2) put(c, 'line');
      for (const s of sents) {
        if (!AU_NUM_RE.test(s)) { if (hasNum || sents.length > 1) put(s, 'line'); continue }
        const ps = s.split(AU_NUM_RE);
        ps.forEach((x, i) => { if (i % 2) (auNumClips(x) || []).forEach(t => put(t, 'piece')); else put(x, 'piece'); });
      }
    }
    return [...U.values()];
  }, [chunks, BASE]);
  await p.b.close();
  fs.writeFileSync(`au-lines-${app}.json`, JSON.stringify(units, null, 1));
  const k = {line: 0, piece: 0}; units.forEach(u => k[u.kind]++);
  console.log(app, units.length, 'clips', JSON.stringify(k));
}
