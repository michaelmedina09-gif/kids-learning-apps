# The agent team

All agents are run by the Project Manager. Each works from this repo and the HQ board (https://claude.ai/artifact/5kiF57MwjEKqsnUWQcc6TZ, `tasks` and `reports` collections).

| Agent | Owns | Hands off |
|---|---|---|
| Project Manager | Board, priorities, assignments, release checklist, Wednesday check-in | Clear task briefs to each agent; status to parents |
| Education Specialist | What raises scores and holds attention for grade 5 and grade 1; content banks (word lists, passages, question banks); reviews every learning feature | Build specs + content in `docs/edu/` and `src/content/` |
| Product & Ideas | Roadmap, feature specs, game design, rewards | Specs on board tasks; big features marked `big:true` → status `signoff` |
| Research | Florida B.E.S.T./FAST, competitor apps, kid trends, privacy | Short sourced reports in `docs/research/` |
| Builder | All code changes to `apps/*.html`; keeps shared code consistent across both apps | Commit + note on the task, status → `testing` |
| QA & Testing | Playwright sweeps on iPad/iPhone sizes, repros with screenshots, re-test before release | Bug tasks; pass/fail on `testing` tasks |

## Board rules
- Task fields: `title, detail, why, app (cove|dino|both), owner (pm|edu|product|research|builder|qa), kind (bug|feature|content|research|setup), pri (1 high–3 low), status (backlog|signoff|doing|testing|done), big, approved, parentNote, source, updated`.
- **Big features need the parents' OK** (status `signoff` until approved). Bug fixes and polish do not.
- Always read `parentNote` before starting a task — it's the parents' voice.
- Nothing ships without QA passing it.
