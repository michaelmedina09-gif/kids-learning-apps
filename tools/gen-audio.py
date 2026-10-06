"""Render every planned clip (qa/au-lines-<app>.json, made by qa/plan-au.mjs) with Kokoro 'Heart'.
Clips render once into a shared cache, are trimmed of silence, then copied to assets/audio/<app>/<key>.mp3.
Settings: single words & pieces at normal speed (slowed single words get stretched — "shiii-ip"),
sentences at 0.95. Re-running only renders what's missing from the cache.
Usage: python3 tools/gen-audio.py <kokoro-model-dir> <ffmpeg> <cache-dir>"""
import json, os, re, shutil, subprocess, sys
import numpy as np, soundfile as sf
MODEL, FF, CACHE = sys.argv[1:4]
ROOT = '/home/user/kids-learning-apps'
from kokoro_onnx import Kokoro
k = Kokoro(f'{MODEL}/kokoro-v1.0.onnx', f'{MODEL}/voices-v1.0.bin')
os.makedirs(CACHE, exist_ok=True)

def spoken(t):  # mirror of auSpoken() in the apps (affects pronunciation only, never keys)
    for a, b in [('☐', ' blank '), ('=', ' equals '), ('+', ' plus '), ('−', ' minus '), ('×', ' times '),
                 ('÷', ' divided by '), ('%', ' percent '), ('<', ' less than '), ('>', ' greater than ')]:
        t = t.replace(a, b)
    return re.sub(r'\s+', ' ', t).strip()

def trim(x, sr, pad):
    a = np.abs(x); thr = 0.015 * (a.max() or 1)
    idx = np.where(a > thr)[0]
    if not len(idx): return x
    s = max(0, idx[0] - int(pad * sr)); e = min(len(x), idx[-1] + int(pad * sr))
    return x[s:e]

units = {}
for app in ['dino', 'cove']:
    for u in json.load(open(f'{ROOT}/qa/au-lines-{app}.json')):
        units.setdefault(u['key'], u)
todo = [u for u in units.values() if not os.path.exists(f"{CACHE}/{u['key']}.mp3")]
print('clips:', len(units), '| to render:', len(todo), flush=True)
if len(sys.argv) > 4 and sys.argv[4] == 'reverse': todo.reverse()
for n, u in enumerate(todo, 1):
    if os.path.exists(f"{CACHE}/{u['key']}.mp3") or os.path.exists(f"{CACHE}/{u['key']}.wav"): continue
    text = spoken(u['text'])
    single = len(text.split()) == 1
    if u['kind'] == 'line' and not re.search(r'[.!?]["”’\']?$', text): text += '.'
    speed = 1.0 if (single or u['kind'] == 'piece') else 0.95
    x, sr = k.create(text, voice='af_heart', speed=speed)
    x = trim(x, sr, 0.03 if u['kind'] == 'piece' else 0.06)
    tmp = f"{CACHE}/{u['key']}.wav"
    sf.write(tmp, x, sr)
    subprocess.run([FF, '-y', '-v', 'error', '-i', tmp, '-ac', '1', '-b:a', '40k', f"{CACHE}/{u['key']}.mp3"], check=True)
    os.remove(tmp)
    if n % 100 == 0: print('rendered', n, 'of', len(todo), flush=True)
if len(sys.argv) > 4 and sys.argv[4] == 'reverse':
    print('WORKER DONE', flush=True); sys.exit(0)
missing = [u for u in units.values() if not os.path.exists(f"{CACHE}/{u['key']}.mp3")]
if missing: print('WAITING ON', len(missing), 'clips from the other worker', flush=True)
import time
while [u for u in units.values() if not os.path.exists(f"{CACHE}/{u['key']}.mp3")]: time.sleep(3)
for app in ['dino', 'cove']:
    d = f'{ROOT}/assets/audio/{app}'
    shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
    for u in json.load(open(f'{ROOT}/qa/au-lines-{app}.json')):
        shutil.copy(f"{CACHE}/{u['key']}.mp3", f"{d}/{u['key']}.mp3")
    print(app, 'copied', len(os.listdir(d)), flush=True)
print('ALL DONE', flush=True)
