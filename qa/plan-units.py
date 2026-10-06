"""Turn harvested spoken chunks into recordable units using the SAME split rules as the
runtime player (auPlan in the apps). Writes qa/au-lines-<app>.json."""
import json, re, sys
NUM = re.compile(r'(\d+(?:\.\d+)?)')
SENT = re.compile(r'[^.!?]+[.!?]*["”’\']?')
def norm(t): return re.sub(r'\s+', ' ', re.sub(r'[^a-z0-9 ]', ' ', t.lower())).strip()
def sentences(t): return [s.strip() for s in SENT.findall(t) if norm(s)]
def units_for(chunk):
    out = []
    if not NUM.search(chunk):
        ss = sentences(chunk)
        if len(ss) <= 2: out.append(chunk)
        if len(ss) > 1: out += ss
        return out
    for s in sentences(chunk):
        if not NUM.search(s): out.append(s); continue
        for piece in NUM.split(s):
            piece = piece.strip()
            if norm(piece): out.append(piece)
    return out
for app in ['dino', 'cove']:
    chunks = json.load(open(f'harvest-{app}.json'))
    units = {}
    for c in chunks:
        for u in units_for(c):
            units.setdefault(norm(u), u)   # first original spelling wins (keeps punctuation for prosody)
    nums = sorted({u for u in units.values() if re.fullmatch(r'\d+(?:\.\d+)?', u)}, key=float)
    frags = [u for u in units.values() if not re.fullmatch(r'\d+(?:\.\d+)?', u)]
    json.dump(list(units.values()), open(f'units-{app}.json', 'w'), indent=1)
    print(app, 'units:', len(units), '| numbers:', len(nums), 'range', nums[:3], '...', nums[-5:])
    odd = [u for u in frags if re.search(r'[/:$%]', u)]
    print('   odd formats:', odd[:12])
