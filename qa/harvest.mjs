// Harvest every line the games can speak, by running the real code with speakNow/readAlong
// patched to record instead of play. Output: qa/harvest-<app>.json (raw spoken chunks).
import {open, SPEECH_MOCK} from './lib.mjs';
import {placed} from './setup.mjs';
import fs from 'fs';

async function harvest(file) {
  const p = await open(file, 'ipadair', {init: SPEECH_MOCK});
  await placed(p);
  await p.evaluate(() => {
    window.__got = new Set();
    window.burst = () => {}; window.confetti = () => {}; window.sfx = new Proxy({}, {get: () => () => {}}); window.toast = () => {};
  });
  const ids = await p.evaluate(() => Object.keys(GEN).filter(id => SK[id]));
  for (const id of ids) for (let L = 1; L <= 5; L++) {
    await p.evaluate(([id, L]) => {
      const got = window.__got;
      const add = t => { t = String(t || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); if (t && /[a-z0-9]/i.test(t)) got.add(t); };
      window.speakNow = (t, after) => { add(t); after && after(); };
      window.qLater = () => {};
      const tryy = f => { try { f() } catch (e) {} };
      const stub = q => ({mode: 'practice', station: 'math', title: 'T', planner: {pos: () => 0, total: 1, next: () => null}, results: [], used: new Set(), earned: 0, ups: [], missed: [], q, tries: 0, locked: false, lastT: Date.now()});
      for (let k = 0, K = SK[id].area === 'math' ? 60 : 220; k < K; k++) {
        let q; RUN = {used: new Set()};
        try { q = mk(id, L) } catch (e) { continue }
        [].concat(q.say || [], q.sayAgain || [], q.sayAll || []).forEach(x => typeof x === 'string' && x.split('|').forEach(add));
        if (q.hint) add(String(q.hint)); if (q.explain) add(String(q.explain).replace(/<[^>]+>/g, ' '));
        for (const pass of ['wrong', 'right']) {
          RUN = stub(q); A = {buf: '', fr: {w: '', n: '', d: ''}, focus: 'n', pick: []};
          tryy(() => renderQ()); tryy(() => ACT.speak()); tryy(() => ACT.sayagain && ACT.sayagain());
          if (pass === 'wrong') { tryy(() => answer(false)); RUN.locked = false; tryy(() => answer(false)); RUN.locked = false; tryy(() => answer(false)); }
          else tryy(() => answer(true));
        }
      }
      document.getElementById('app') && (document.getElementById('app').innerHTML = '');
    }, [id, L]);
  }
  const out = await p.evaluate(async () => {
    const got = window.__got;
    const add = t => { t = String(t || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); if (t && /[a-z0-9]/i.test(t)) got.add(t); };
    window.speakNow = (t, after) => { add(t); after && after(); };
    if (typeof readAlong === 'function') window.readAlong = (text, tok, onWord, onDone) => { add(text); onDone && onDone(); };
    window.qLater = () => {}; // don't auto-advance
    const tryy = f => { try { f() } catch (e) {} };
    const stub = q => ({mode: 'practice', station: 'math', title: 'T', planner: {pos: () => 0, total: 1, next: () => null}, results: [], used: new Set(), earned: 0, ups: [], missed: [], q, tries: 0, locked: false, lastT: Date.now()});
    // 2) praise + fixed banks
    (window.PRAISE || []).forEach(add);
    if (typeof PRAISE !== 'undefined') PRAISE.forEach(add);
    // 3) field guide pages + quizzes (data walk + real openLearn)
    for (const id of Object.keys(CFG.spec || {})) {
      const r = CFG.spec[id];
      tryy(() => openLearn(id)); tryy(() => openLearn(id, 'Rexy'));
      [r.say, r.sp, r.cap].forEach(add); (r.intro || []).forEach(add);
      add(`This is ${r.say || r.sp}.`);
      (r.quiz || r.q || []).forEach(qq => { add(qq.q); (qq.c || []).forEach(c => add(c.t)) });
    }
    tryy(() => { const m = document.querySelector('#modal'); if (m) m.hidden = true });
    // 4) Dino-only: stories, sound boxes, intros
    if (typeof EDU1 !== 'undefined' && EDU1.stories) {
      for (const st of EDU1.stories) {
        add(st.title); add(`Today’s story is: ${st.title}.`);
        tryy(() => rexSentences(st.text).forEach(add));
        tryy(() => rexQuestions(st).forEach(qq => { add(qq.prompt); (qq.choices || []).forEach(c => add(c.name)); if (qq.lab) { add(`It was ${qq.lab}.`); add(qq.lab) } }));
        tryy(() => rexPreviewWords(st).forEach(w => { add(w.w || w); }));
      }
    }
    // 4b) Dino phonics templates: enumerate EVERY word in the banks, not just random samples
    if (typeof FIRSTS !== 'undefined') {
      FIRSTS.forEach(t => add(`Which one starts with the same sound as ${t}?`));
      LASTS.forEach(t => add(`Which one ends with the same sound as ${t}?`));
      Object.values(VOW).flat().forEach(t => add(`Which one has the same middle sound as ${t}?`));
      Object.keys(PHON).forEach(w => { add(`How many sounds do you hear in ${w}? ${w}.`); add(`How many sounds do you hear in ${w}?`); add(`${w}.`) });
      DG.forEach(([w]) => add(`${w}. What letters make the first sound?`)); DGE.forEach(([w]) => add(`${w}. What letters make the last sound?`));
      SUBS.forEach(([a, b, l]) => add(`${a}. Change the first sound to ${l}. What is the new word?`));
      Object.keys(E).forEach(add);
    }
    // 4c) Cove: every spelling word + sentence; fraction words with every operator
    if (typeof SPELL !== 'undefined') for (const e of SPELL) { const pl = e.s.replace('___', e.w); add(e.w); add(pl); add(pl + '. Which word is spelled correctly?') }
    for (const w of ['half','halves','third','thirds','fourth','fourths','fifth','fifths','sixth','sixths','eighth','eighths','tenth','tenths','twelfth','twelfths','hundredth','hundredths'])
      for (const op of ['+', '−', 'minus', 'plus', 'times', '×', '= ?', '=', 'and', 'of', 'or', ''] ) { add(`1 ${w} ${op} 2`); add(`1 ${w}${op ? ' ' + op : ''}`) }
    // 4d) Dino sound boxes + word chains (every word in the data)
    if (typeof EDU1 !== 'undefined' && EDU1.elkonin) {
      for (const it of EDU1.elkonin) { const w = it.w, n = it.gr.length;
        [w, `${w}.`, `Push one pebble for each sound you hear in ${w}.`, `${w} has ${n} sounds.`, `${w} is spelled`, it.gr.map(g => g.replace('_e', ' e')).join(', ')].forEach(add) }
      for (const ch of EDU1.chains) for (let i = 0; i + 1 < ch.words.length; i++) { const a = ch.words[i], b = ch.words[i + 1];
        [`This word is ${a}.`, `Change one letter to make ${b}.`, `Add one letter to make ${b}.`, `Take away one letter to make ${b}.`, a, b].forEach(add) }
      (EDU1.heartWords || []).forEach(h => add(h.w || h));
    }
    // 5) home / mission / intros via real handlers
    for (const a of ['say-home', 'speak-home', 'mission-say']) tryy(() => ACT[a] && ACT[a]());
    tryy(() => startBlast && startBlast());
    // Cove: prompts, starters, hatch lines
    if (typeof PROMPTS !== 'undefined') PROMPTS.forEach(x => add(x.t));
    if (typeof STARTERS !== 'undefined') Object.values(STARTERS).flat().forEach(add);
    if (typeof SPEC !== 'undefined') for (const id in SPEC) { add(`Meet your ${SPEC[id].sp}.`); add(SPEC[id].cap); (SPEC[id].intro || []).forEach(add) }
    ['Rescue complete!', 'Bonus round!', 'Comeback Cards!', 'Mission complete! Amazing work!', 'There is nothing written yet.', 'Here are your questions.', 'That’s okay! Here’s how it works.', 'Not quite.', 'The answer is', 'Almost! Try again.', 'Say it slowly.', 'Listen.', 'Listen again.', 'Push one pebble for each sound.', 'Which sound comes first?', 'Now let’s find the letters.', 'Think about the story.', 'It was', 'Heart word.', 'Great reading!', 'Great job!', 'You beat a tricky one!'].forEach(add);
    return [...got];
  });
  await p.b.close();
  const src = fs.readFileSync('/home/user/kids-learning-apps/apps/' + file, 'utf8');
  for (const m of src.matchAll(/\bsay\(\[?((?:[^()]|\([^()]*\))*)\)/g))
    for (const q of m[1].matchAll(/'((?:[^'\\]|\\.){3,200})'|`([^`$]{3,200})`|"([^"\\]{3,200})"/g)) {
      const t = (q[1] || q[2] || q[3]).replace(/\\'/g, "'"); if (/[a-z]/i.test(t) && !/[<>{}=]/.test(t)) out.push(t) }
  return [...new Set(out)];
}
for (const [app, file] of [['dino', 'dino-star-patrol.html'], ['cove', 'critter-cove.html']]) {
  const lines = await harvest(file);
  fs.writeFileSync(`/home/user/kids-learning-apps/qa/harvest-${app}.json`, JSON.stringify(lines, null, 1));
  const withNum = lines.filter(t => /\d/.test(t)).length;
  console.log(app, lines.length, 'distinct spoken chunks;', withNum, 'contain numbers');
}
