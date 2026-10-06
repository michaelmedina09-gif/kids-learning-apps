"""Pack assets/audio/<app>/*.mp3 into <out>/<app>/au/p0..p47.json (base64 per key) and inject the key
list into apps/<app>.html. An artifact version holds ~500 files max, so ~1500 clips must ship as packs.
Pack index = int(hash part of key, base 36) % 48 — same rule as auUrl() in the apps.
Usage: python3 tools/pack-audio.py <out-dir>"""
import base64, json, os, sys
ROOT = '/home/user/kids-learning-apps'; OUT = sys.argv[1]; P = 48
APPS = {'dino': 'dino-star-patrol.html', 'cove': 'critter-cove.html'}
for app, html in APPS.items():
    keys = sorted(u['key'] for u in json.load(open(f'{ROOT}/qa/au-lines-{app}.json')))
    packs = [dict() for _ in range(P)]
    for k in keys:
        b = open(f'{ROOT}/assets/audio/{app}/{k}.mp3', 'rb').read()
        packs[int(k.rsplit('-', 1)[1], 36) % P][k] = base64.b64encode(b).decode()
    d = f'{OUT}/{app}/au'; os.makedirs(d, exist_ok=True)
    for f in os.listdir(d): os.remove(f'{d}/{f}')
    for i, pk in enumerate(packs):
        json.dump(pk, open(f'{d}/p{i}.json', 'w'), separators=(',', ':'))
    sizes = [os.path.getsize(f'{d}/p{i}.json') for i in range(P)]
    p = f'{ROOT}/apps/{html}'; s = open(p, encoding='utf-8').read()
    a = s.index('/*AU_KEYS_START*/'); b = s.index('/*AU_KEYS_END*/') + len('/*AU_KEYS_END*/')
    s = s[:a] + '/*AU_KEYS_START*/const AU=new Set(' + json.dumps(keys, separators=(',', ':')) + ');/*AU_KEYS_END*/' + s[b:]
    open(p, 'w', encoding='utf-8').write(s)
    print(f'{app}: {len(keys)} clips -> {P} packs, {sum(sizes)/1e6:.1f} MB total, largest {max(sizes)/1e6:.2f} MB; keys injected')
