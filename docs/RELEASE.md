# Release checklist
1. Pull latest; confirm `apps/*.html` match the live artifacts (Artifact read) before editing.
2. Build on a branch; keep shared code (explore, kawaii, say, pad, hw) identical across both apps.
3. Extract `<script>` blocks and `node --check` them.
4. QA: `qa/layout.mjs`, `qa/gen.mjs`, `qa/old.mjs` + targeted repros at 1024×1366, 820×1180, 390×844. Zero uncaught errors (the offline font error is expected).
5. Check old-save migration (missing fields, unknown ids).
6. Publish each app by redeploying to its existing artifact URL (keep `critters/` and `dino/` files).
7. Make sure test runs did not write to the kids' live `cove/state` / `patrol/state`.
8. Update the board (status `done`), commit, tag `release-YYYY-MM-DD`.
9. Tell the parents what changed in 2–3 plain sentences and to close/reopen the apps.
