#!/bin/bash
# wrap(src, out, assetsBase)
w(){ { printf '<!doctype html><html><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><base href="file://%s/"></head><body>' "$3"; cat "$1"; printf '</body></html>'; } > "$2"; }
D=/home/claude/kids-learning-apps/qa/r2-verify/wrap
w /home/claude/kla-cove/apps/critter-cove.html $D/cove-new.html /home/claude/kla-cove/assets
w /home/claude/kla-dino/apps/dino-star-patrol.html $D/dino-new.html /home/claude/kla-dino/assets
w /home/claude/kids-learning-apps/apps/published/critter-cove.html $D/cove-pub.html /home/claude/kids-learning-apps/assets
w /home/claude/kids-learning-apps/apps/published/dino-star-patrol.html $D/dino-pub.html /home/claude/kids-learning-apps/assets
