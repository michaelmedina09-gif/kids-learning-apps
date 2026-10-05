# Kids Learning Apps

Two private, daily ~30-minute after-school learning games for our kids, built as single-file web pages and hosted as private claude.ai artifacts.

| App | Kid | Theme | Live artifact |
|---|---|---|---|
| Critter Cove | 5th grade daughter | Animal rescue lagoon | https://claude.ai/artifact/EBQy2Dv4DUvefSak5pGWBW |
| Dino Star Patrol | 1st grade son | Dinosaurs in space | https://claude.ai/artifact/4ZWejLFEismc5HEgWhuzKP |
| Cove & Patrol HQ | Parents + agents | Project board | https://claude.ai/artifact/5kiF57MwjEKqsnUWQcc6TZ (old account — unreachable, needs re-publish) |

> 2026-10-05: both games were re-published from Dad's account because the
> original artifact links above belonged to another Claude account and became
> unreachable (old links: `PzXsfWYYgLQxJa9rsbFphx`, `R4EaGhDYpsqG4WYqRX7Toi`).
> Saved progress on these new copies starts fresh; any old progress lives with
> the account that published the original links.

## Layout
- `apps/` – the two app HTML files (the source of truth that gets published). `apps/published/` – last known published copies.
- `assets/critters`, `assets/dino` – real photos published alongside each app (`critters/*.jpg`, `dino/*.jpg`).
- `src/` – building blocks and patch scripts used to assemble the apps (kawaii character engine, accessories, scenes, rewards, scratch pad, handwriting, speech).
- `qa/` – Playwright test sweeps (`layout.mjs`, `gen.mjs`, `old.mjs` are the reusable ones).
- `board/` – the HQ board page.
- `docs/` – project brief, team, release checklist, decisions.

Start with `docs/PROJECT.md`.
