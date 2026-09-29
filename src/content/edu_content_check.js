// QA for edu_content.js — run: node src/content/edu_content_check.js
const EDU = require('./edu_content.js');
let bad = 0; const fail = (...a) => { bad++; console.log('FAIL', ...a); };

// 1) morphology joins
const join = (parts, rule) => {
  const [b, ...rest] = parts; const suf = rest.join('');
  if (!rule) return parts.join('');
  if (rule === 'drop-e') return b.replace(/e$/, '') + suf;
  if (rule === 'double') return b + b.slice(-1) + suf;
  if (rule === 'y-to-i') return b.replace(/y$/, 'i') + suf;
};
const groups = new Set(EDU.morphGroups.map(g => g.id));
EDU.morph.forEach(m => {
  if (join(m.parts, m.rule) !== m.w) fail('morph join', m.w, m.parts, m.rule);
  if (!groups.has(m.g)) fail('morph group', m.w, m.g);
});
if (new Set(EDU.morph.map(m => m.w)).size !== EDU.morph.length) fail('morph duplicates');
console.log('morph words:', EDU.morph.length);

// 2) combining
console.log('combine sets:', EDU.combine.length);
EDU.combine.forEach(c => { if (!/[.!?]$/.test(c.model)) fail('combine punct', c.model); });

// 3) passages 80–120 words
EDU.textPrompts.forEach(p => p.passages.forEach(x => {
  const n = x.text.split(/\s+/).filter(Boolean).length;
  if (n < 80 || n > 120) fail('passage length', p.id, x.title, n); else console.log('  passage', p.id, x.title, n);
}));

// 4) math answers: evaluate numeric expressions
const approx = (a, b) => Math.abs(a - b) < 1e-9;
const checks = {
  total: [48.6 + 53.75, (2 + 3/4) + (1 + 2/3), 4.5 - 2.75],
  difference: [312.8 - 250.5, 3/4 - 1/3, 2.35 + 1.8],
  change: [125.5 - 38.25, 5.5 + 2.75, 2006 - 1248],
  'equal-groups': [24 * 36, 1512 / 28, 6 * 2/3],
  'compare-times': [1.2 * 2.5, 15 / 3, 84 / 12],
  'multi-step': [12.5 + 3 * 8.75, 50 - 4 * 3.25, 8.5 * 4 / 2]
};
EDU.schemas.forEach(s => s.ex.forEach((e, i) => {
  if (!approx(checks[s.id][i], e.ans)) fail('math', s.id, i, checks[s.id][i], e.ans);
}));
console.log('schemas:', EDU.schemas.length, 'examples:', EDU.schemas.reduce((a, s) => a + s.ex.length, 0));

// 5) stories: 25–50 words; heart words used must be in heart list
const HW = new Set(EDU.heartWords.map(h => h.w.toLowerCase()));
EDU.stories.forEach(s => {
  const words = s.text.toLowerCase().replace(/[^a-z\s']/g, ' ').split(/\s+/).filter(Boolean);
  if (words.length < 25 || words.length > 50) fail('story length', s.id, words.length);
  s.heart.forEach(h => { if (!HW.has(h.toLowerCase())) fail('story heart not in list', s.id, h); if (!words.includes(h.toLowerCase())) console.log('  note: story', s.id, 'lists unused heart word', h); });
  const allHeart = [...HW].filter(w => words.includes(w) && !s.heart.map(x=>x.toLowerCase()).includes(w));
  if (allHeart.length) fail('story uses unlisted heart word', s.id, allHeart);
  console.log('  story', s.id, words.length, 'words');
});

// 6) elkonin + chains
EDU.elkonin.forEach(e => {
  const spelled = e.gr.map(g => g.replace('_e', '')).join('') + (e.gr.some(g => g.includes('_e')) ? 'e' : '');
  if (spelled !== e.w) fail('elkonin', e.w, e.gr);
});
console.log('elkonin items:', EDU.elkonin.length);
const lev = (a, b) => { const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1));
  return d[a.length][b.length]; };
// tokenise into graphemes so sh->ch counts as one change
const G = ['tch','sh','ch','th','wh','ck','ng','ee','ea','ai','ay','oa','ow','ll'];
const tok = w => { const t = []; for (let i = 0; i < w.length;) { const g = G.find(g => w.startsWith(g, i)); if (g) { t.push(g); i += g.length; } else { t.push(w[i]); i++; } } return t; };
EDU.chains.forEach(c => { for (let i = 1; i < c.words.length; i++) {
  const a = c.words[i-1], b = c.words[i]; const silentE = (a + 'e' === b) || (b + 'e' === a);
  if (!silentE && lev(tok(a), tok(b)) !== 1) fail('chain step', a, '->', b);
} });
console.log('chains:', EDU.chains.length);
console.log('heart words:', EDU.heartWords.length);
EDU.heartWords.forEach(h => { if (h.heart && !h.w.includes(h.heart.replace('_e', '')) ) fail('heart part not in word', h.w, h.heart); });
console.log(bad ? `${bad} FAILURES` : 'ALL CHECKS PASSED');
process.exit(bad ? 1 : 0);
