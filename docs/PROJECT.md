# Project brief

## Goal
Replace an hourly tutor with two fun, gamified daily programs the kids *want* to open, built on Florida B.E.S.T. standards (Palm Beach County), with an iReady-like placement, adaptive practice, and a parent dashboard.

## The kids
- **Daughter, 5th grade.** Struggles with writing clearly, spelling and math. Creative, fun, great attitude. Uses an iPad with Apple Pencil. App: **Critter Cove**. Standards: MA.5.*, ELA.5.C.* (writing), spelling, reading (Book Club).
- **Son, 1st grade.** Loves dinosaurs and space. App: **Dino Star Patrol**. Standards: MA.1.*, ELA.1.F.* (phonics, sight words). Needs everything read aloud.

## Constraints (do not break)
- Each app is one self-contained HTML file published as a private claude.ai artifact. External images are blocked; photos ship as published files. Fonts only from Google Fonts.
- Runtime: `window.claude.use('db')` for saved state (`cove/state`, `patrol/state`), `use('sample')` for AI feedback (Critter Cove only), Web Speech for read-aloud, localStorage mirror.
- iPad first (landscape + portrait); Mom tests on iPhone. Tap targets ≥ 44 pt (bigger for the 1st grader).
- About 30 minutes a day with a clear end. No timers shown to a struggling child.
- Original art only: no real brands, characters, logos or titles (trend-inspired originals are fine).
- Privacy: send only the child's writing to the AI, never names, school, photos of the child or location. Family-only sharing.
- Rewards support learning (effort, growth, completion); never pay-to-win, never loss-based pressure.

## Definition of "polished"
1. No crashes or console errors on iPad 1024/820 and iPhone 390 widths.
2. Every question has exactly one right answer; correct answers get clear praise; misses show the right answer and why.
3. Every screen a 1st grader sees can be read aloud.
4. Layout never overflows sideways; text never clipped.
5. Old saved progress keeps working after every release.
6. Parents can see progress in under a minute on a phone.

## Success metrics
Active days per week (goal 5), minutes vs 30, skills gained since placement, first-try accuracy trend, mistakes conquered on spaced review, writing rubric average, books/chapters logged (daughter), sight words and stories read (son).

## Key dates (2026–27)
FAST PM2: Nov 30 2026 – Jan 22 2027 · B.E.S.T. Writing (grades 4–10): Mar 29 – Apr 9 2027 · PM3: Apr–May 2027.
