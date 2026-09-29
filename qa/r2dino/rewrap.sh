# wrap raw artifact HTML with doctype + viewport for Playwright (this worktree only)
mkdir -p /home/claude/kla-dino/qa/r2dino/wrap
cd /home/claude/kla-dino/apps && for f in dino-star-patrol.html; do { printf '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><base href="file:///home/claude/kla-dino/apps/">\n'; cat $f; printf '\n</head></html>'; } > /home/claude/kla-dino/qa/r2dino/wrap/$f; done
