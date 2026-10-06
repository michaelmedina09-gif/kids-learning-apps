// End-to-end voice test over HTTP with REAL audio clips (packs) and a realistic iPad speech mock
// (voice list arrives late, utterances take real time). Plays stations through the real UI and reports:
// which voice spoke each line, any moment two sounds overlap, and every line that fell back to the device voice.
// Usage: node voice-e2e.mjs <stage-dir>   (stage-dir holds <app>/<file>.html + <app>/au/p*.json)
import pw from '/opt/node-tools/node_modules/playwright/index.js';
import http from 'http'; import fs from 'fs'; import path from 'path';
import {answerAny} from './lib.mjs'; import {placed} from './setup.mjs';
const STAGE = process.argv[2];
const srv = http.createServer((q, r) => { const f = path.join(STAGE, decodeURIComponent(q.url.split('?')[0])); fs.readFile(f, (e, b) => { if (e) { r.writeHead(404); return r.end() } r.writeHead(200, {'content-type': f.endsWith('.json') ? 'application/json' : f.endsWith('.jpg') ? 'image/jpeg' : f.endsWith('.png') ? 'image/png' : 'text/html'}); r.end(b) }) }).listen(0);
const PORT = srv.address().port;
const MOCK = fs.readFileSync(new URL('./voice-mock.js', import.meta.url), 'utf8');
let FAIL = 0;
async function run(app, file, stations, tapDelay, label) {
  const b = await pw.chromium.launch({args: ['--autoplay-policy=no-user-gesture-required']});
  const ctx = await b.newContext({viewport: {width: 820, height: 1180}, hasTouch: true}); await ctx.addInitScript(MOCK);
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(`http://127.0.0.1:${PORT}/${app}/${file}`); await p.waitForTimeout(500);
  await placed(p, {voiceName: 'Daniel'});
  await p.mouse.click(400, 10); await p.waitForTimeout(2500); // first tap: unlock + background prefetch
  for (const st of stations) {
    await p.evaluate(st => startStation(st), st); await p.waitForTimeout(1500);
    for (let k = 0; k < 7; k++) {
      if (!await p.evaluate(() => !!(RUN && RUN.q && !RUN.locked))) break;
      await p.waitForTimeout(tapDelay);
      try { await answerAny(p, k % 3 !== 1) } catch (e) { break }
      await p.waitForTimeout(tapDelay + 600);
      for (const sel of ['[data-act="next"]', '[data-act="gotit"]', '[data-act="cont"]', '[data-act="miss-next"]']) { const e = await p.$(sel); if (e && await e.isVisible()) { await e.click().catch(() => {}); break } }
      await p.waitForTimeout(400);
    }
    await p.evaluate(() => { try { hush() } catch (e) {} }); await p.waitForTimeout(300);
  }
  await p.waitForTimeout(1500);
  const log = await p.evaluate(() => window.__log);
  await b.close();
  const iv = log.map(x => ({...x, e: x.e ?? x.s + 300}));
  const overlaps = [];
  for (let i = 0; i < iv.length; i++) for (let j = i + 1; j < iv.length; j++) { const a = iv[i], c = iv[j]; if (c.s < a.e - 40 && a.s < c.e - 40) overlaps.push(`${a.voice}:"${a.text.slice(0, 28)}" + ${c.voice}:"${c.text.slice(0, 28)}"`) }
  const by = {}; log.forEach(x => by[x.voice] = (by[x.voice] || 0) + 1);
  const tts = [...new Set(log.filter(x => x.kind === 'tts').map(x => `[${x.voice}] ${x.text.slice(0, 80)}`))];
  console.log(`\n##### ${label}`); console.log('sounds by voice:', JSON.stringify(by));
  console.log('overlaps:', overlaps.length, overlaps.slice(0, 5)); console.log('device-voice lines:', tts.length, tts.slice(0, 8));
  console.log('page errors:', errs.length ? errs.slice(0, 3) : 'none');
  if (overlaps.length || errs.length || (by.Heart || 0) < 3) FAIL++;
  return {by, tts};
}
await run('dino', 'dino-star-patrol.html', ['read', 'math', 'write'], 900, 'DINO normal pace');
await run('dino', 'dino-star-patrol.html', ['read', 'math'], 120, 'DINO fast tapping');
await run('cove', 'critter-cove.html', ['spell', 'math'], 900, 'COVE normal pace');
await run('cove', 'critter-cove.html', ['spell', 'math'], 120, 'COVE fast tapping');
srv.close(); console.log(FAIL ? `\n${FAIL} RUN(S) FAILED` : '\nVOICE-E2E PASS'); process.exit(FAIL ? 1 : 0);
