#!/bin/bash
# Wrap apps/critter-cove.html with a doctype+viewport skeleton for Playwright (round 2 worktree).
set -e
R=/home/claude/kla-cove
mkdir -p $R/qa/r2/wrap
{ printf '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><base href="file://%s/assets/">\n' "$R"; cat $R/apps/critter-cove.html; printf '\n</head></html>'; } > $R/qa/r2/wrap/critter-cove.html
python3 - <<'P'
import re
s=open('/home/claude/kla-cove/apps/critter-cove.html').read()
js=re.findall(r'<script>(.*?)</script>',s,re.S)
open('/home/claude/kla-cove/qa/r2/wrap/_x.js','w').write('\n'.join(js))
P
node --check $R/qa/r2/wrap/_x.js && echo "critter-cove.html parses OK"
