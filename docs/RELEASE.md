# Release checklist
1. Pull latest; confirm `apps/*.html` match the live artifacts (Artifact read) before editing.
2. Build on a branch; keep shared code (explore, kawaii, say, pad, hw) identical across both apps.
3. Extract `<script>` blocks and `node --check` them.
4. QA: `qa/layout.mjs`, `qa/gen.mjs`, `qa/old.mjs` + targeted repros at 1024×1366, 820×1180, 390×844. Zero uncaught errors (the offline font error is expected).
5. Check old-save migration (missing fields, unknown ids).
5b. Voice (both apps speak through one channel: recorded Kokoro "Heart" clips first, device voice only
    for lines nobody can pre-record — her own writing, AI feedback). If any spoken text changed:
    `node qa/harvest.mjs` → `node qa/plan-au.mjs` → `python3 tools/gen-audio.py <kokoro-dir> <ffmpeg> <cache>`
    (renders only new clips) → `python3 tools/pack-audio.py <stage-dir>` (packs + injects keys) →
    `node qa/au-check.mjs <stage-dir>` and `node qa/voice-e2e.mjs <stage-dir>` (no overlaps, Heart only).
6. Publish each app by redeploying to its existing artifact URL (keep `critters/` and `dino/` files;
   publish the 16 `au/p*.json` voice packs alongside — an artifact holds ~500 files, so clips ship packed).
7. Make sure test runs did not write to the kids' live `cove/state` / `patrol/state`.
8. Update the board (status `done`), commit, tag `release-YYYY-MM-DD`.
9. Tell the parents what changed in 2–3 plain sentences and to close/reopen the apps.
