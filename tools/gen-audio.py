"""Pre-record all fixed spoken lines (qa/au-lines-*.json) with Kokoro 'Heart'.
Writes assets/audio/<app>/<key>.mp3. Skips clips that already exist, so
re-running after adding lines only renders what's new.
Model files: kokoro-v1.0.onnx + voices-v1.0.bin (github.com/thewh1teagle/kokoro-onnx releases)."""
import json, os, subprocess, sys, wave

TTS_DIR = sys.argv[1]            # dir holding kokoro model files
FF = sys.argv[2]                 # ffmpeg binary
ROOT = '/home/user/kids-learning-apps'
from kokoro_onnx import Kokoro
import soundfile as sf
k = Kokoro(f'{TTS_DIR}/kokoro-v1.0.onnx', f'{TTS_DIR}/voices-v1.0.bin')

for app in ['dino', 'cove']:
    lines = json.load(open(f'{ROOT}/qa/au-lines-{app}.json'))
    outdir = f'{ROOT}/assets/audio/{app}'
    os.makedirs(outdir, exist_ok=True)
    made = skipped = 0
    for i, ln in enumerate(lines):
        mp3 = f"{outdir}/{ln['key']}.mp3"
        if os.path.exists(mp3):
            skipped += 1; continue
        text = ln['text']
        # single words a touch slower and with a period so they don't clip
        single = ' ' not in text
        samples, sr = k.create(text if text.rstrip()[-1:] in '.?!' else text + '.',
                               voice='af_heart', speed=0.88 if single else 0.95)
        tmp = mp3 + '.wav'
        sf.write(tmp, samples, sr)
        subprocess.run([FF, '-y', '-v', 'error', '-i', tmp, '-ac', '1', '-b:a', '40k', mp3], check=True)
        os.remove(tmp)
        made += 1
        if made % 50 == 0: print(app, made, 'of', len(lines), flush=True)
    print(app, 'done:', made, 'new,', skipped, 'already there', flush=True)
print('ALL DONE', flush=True)
