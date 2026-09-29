# What works: evidence review and build specs (Round 1)

*Education Specialist, 2026-09-29. Branch `edu/round1`. Content bank: `src/content/edu_content.js` (checked by `node src/content/edu_content_check.js`).*

**Parent question:** "Find what is showing positive results, higher scores, and attention, and let's incorporate it."

**Short answer:** The biggest proven gains for a 5th grader who struggles with writing come from **SRSD writing strategy instruction** (POW + TREE/TIDE). It is one of the largest effects in all of education research, and it maps directly onto the text-based B.E.S.T. Writing test she takes Mar 29 – Apr 9, 2027. The two apps already practice a lot of skills. What they lack is **spacing**: missed items come back only within the same day. For the 1st grader, the gap is **connected decodable text**. He practices words one at a time but rarely reads a whole little story, and the WWC guide says to do that daily. Two current features work against the evidence and against our own PROJECT.md rules. First, both apps show a **visible 60-second countdown** (Fact Sprint, Meteor Blast). Second, the day streak **drops back to 0** after a missed day, which is loss-based pressure.

How to read the tables:
- **ES** (effect size) is the average improvement in standard-deviation units. About 0.2 is small, about 0.5 is medium and 0.8 or more is large. ES from researcher-made tests usually runs higher than ES from state or standardized tests.
- **Tier** uses Evidence for ESSA / WWC labels. *Strong* means multiple randomized trials. *Moderate* means at least one good quasi-experiment or a smaller RCT. *Promising* is weaker again. *Meta* means a meta-analysis across many studies.
- Anything marked **(unverified)** is from my own knowledge of the literature and I could not confirm it from a source during this review.

---

## A. Evidence ranking by grade and subject

### Grade 5 (Critter Cove)

| Practice | Best evidence | ES | Tier | Notes for us |
|---|---|---|---|---|
| **SRSD writing (POW + TREE / TIDE)** | SRSD meta-analysis, 14 elementary studies; multi-site cluster RCT, grade 4, state-style writing tasks (Harris, Graham et al., *CEP* 2023) | **1.17** quality (meta); RCT: **0.87** holistic quality, **0.84** genre elements, **1.87** prompt adherence | Strong | Largest effect we have. Works best with explicit modeling, a mnemonic organizer, goal setting, self-talk and self-checking. |
| **Writing summaries about text** | Graham & Hebert, *Writing to Read* (Carnegie 2010) | **0.52** overall on comprehension; **0.79** in grades 3–4 | Meta | Book Club summaries improve reading as well as writing. |
| **Responding to text in writing** | Writing to Read | 0.77 (researcher tests), 0.40 (norm-referenced, all "write about text") | Meta | Supports text-based prompts and Book Club. |
| **Sentence combining** | Graham & Perin, *Writing Next* (2007), grades 4–12 | ~0.50 (unverified figure; ranked 6th of 11 on the source list) | Meta | Short, daily and gamifiable. Directly improves the Language domain ("varied sentence structure"). |
| **Spelling instruction → reading** | Writing to Read | 0.68 on word reading, grades 1–5 | Meta | Spelling practice also pays off in reading. |
| **Morphology (prefix/suffix/root) instruction** | Goodwin & Ahn 2013 (30 studies) | 0.32 overall; **0.30 spelling**, 0.59 decoding, 0.34 vocabulary | Meta | Moderate effect. Most useful for a speller who learns words one at a time. |
| **Schema-based word problems** (Fuchs/Jitendra) | Myers et al. 2022 meta (52 studies, students with math difficulty); WWC Math Intervention guide Rec 5 | **0.81** (outliers removed) to 1.01 | Meta + WWC | FAST gives word problems heavy weight. Teach problem *types* (Total, Difference, Change, Equal Groups, Times-as-many). |
| **Number-line fractions** (Fraction Face-Off!) | Evidence for ESSA, 2 RCTs, 425 grade-4 students | **+0.51** | Strong | Fractions on a number line, comparing, ordering and equivalence. Directly supports MA.5.FR. |
| **Interleaved (mixed) math practice** | Rohrer et al. 2020 cluster RCT, 54 grade-7 classes | **0.83** (test 1 month later; 61% vs 38%) | Strong (single large RCT, grade 7) | Mixing problem types makes students choose the strategy, and that choice is what FAST tests. |
| **Spaced retrieval** | Latimier et al. 2021 meta (spaced vs massed retrieval) | **0.74** | Meta | Spacing matters more than the exact schedule (expanding ≈ uniform, g = 0.03). |
| Spacing in math specifically | Murray, Horner & Göbel 2025 meta | 0.28 spacing; retrieval-vs-restudy 0.18 (CI crosses 0) | Meta | Smaller effect in math, so keep spacing but also teach strategies. |
| **Worked → faded examples** | Barbieri et al. 2023 meta (55 studies) | **0.48** | Meta | Correct examples beat incorrect or mixed ones. Self-explanation prompts *lowered* the effect, so keep the steps short and visual. |
| **Timed fluency activities** | WWC Math Intervention guide Rec 6 | — | Moderate (see "couldn't verify") | The guide calls for "meet or beat your own score" with charted progress and accuracy first. That does **not** require a visible countdown for a struggling child. |
| Strategy-based fact fluency (incremental rehearsal, cover-copy-compare) | Burns 2012 IR meta (single-case, phi); Joseph et al. CCC review | (unverified) | Promising | Mix about 1 unknown fact into many known ones. Very efficient for 6s, 7s and 8s. |

### Grade 1 (Dino Star Patrol)

| Practice | Best evidence | ES | Tier | Notes for us |
|---|---|---|---|---|
| **Phonemic awareness linked to letters** (sound boxes, segment and blend) | WWC Foundational Skills K–3 Rec 2 | NRP: PA overall ~0.53, larger with letters (unverified) | **Strong** | Elkonin boxes with letter tiles cover PA and phonics together. |
| **Decoding, word analysis, spelling words** (word chains, encoding) | WWC Rec 3 | — | **Strong** | Word chains change one sound at a time, so the child has to look at every letter. |
| **Reading connected (decodable) text daily** | WWC Rec 4 | — | **Moderate** | The current app has no whole stories. This is the main gap. |
| **Repeated reading** | Therrien 2004 meta | Positive for fluency and comprehension (exact ES unverified) | Meta | Works best with a model reading first, then feedback, then rereading to a goal. |
| Heart words (orthographic mapping of irregular parts) | Folded into WWC Rec 3 ("write and recognize words") | — | Strong (as part of Rec 3) | Mark only the irregular letters. Most of each word is still decoded. |
| Academic language / vocabulary | WWC Rec 1 | — | Minimal | Use the talk-about-the-story questions (low cost). |
| **Early number sense and facts** | WWC Math Intervention guide Recs 1, 3, 4 (systematic instruction, visual representations, number line) | — | Strong (Rec 1, 3) | Make-10, doubles and number lines with a visual model first, speed later. |

### Cross-cutting (both kids)

| Practice | Evidence | ES | Use |
|---|---|---|---|
| Gamification | Sailer & Homner 2020 meta | cognitive **0.49**, motivational 0.36, behavioral 0.25 | Game *fiction* (story) and collaboration moderate the effect. Our critter/dino stories count. |
| Digital learning games vs non-game | Clark, Tanner-Smith & Killingsworth 2016 | **0.33**; enhanced designs +0.34 over basic games | Design matters more than the medium. |
| Rewards | Deci, Koestner & Ryan 1999/2001 | Expected tangible rewards **−0.36**; completion-contingent −0.44; performance-contingent −0.28; **unexpected** rewards +0.01 (no harm); verbal praise +0.33 overall (+0.11 in children) | Stickers and coins are fine as **surprises** and for effort and growth. Don't make them the point, and don't announce "get 10/10 to win". |
| Optimal difficulty | Wilson et al. 2019, *Nature Communications* ("Eighty Five Percent Rule") | Theory plus simulations: training error of about 15% maximizes learning speed | Aim adaptive levels at about 80–85% first-try success. |
| Movement breaks | Classroom-activity meta-analyses (Watson et al. 2017, unverified figures) | On-task behavior improves after short active breaks | Use a 60–90 s "stretch with your critter/dino" between stations. |
| Low-effort detection | Wise normative-threshold method (NT10: faster than 10% of the item's typical time, capped at 10 s) | In grade 3, about 2% of students are meaningfully disengaged | Powers the Rapid-Guess Helper. |

### Florida specifics

- **B.E.S.T. Writing, grade 5:** a text-based prompt where students read several passages and respond. It is taken on a **computer**, in one 120-minute session. It is scored 1–4 in each of three domains: Purpose/Structure, Development, Language (12 points total). A score of 4 needs "varied transitional strategies", "effective elaboration" with source evidence "smoothly integrated and appropriately cited", and "varied sentence structure". Our current `PROMPTS` are personal and narrative (Opinion, How-to, Story, Describe) with **no source texts**. They need text-based passages, provided in the bank below. Because the test is typed, Writing Workshop should shift toward **typing** mode from January on.
- **FAST statewide 2025:** reading in grades 3–10 went from 53% to 57% at Level 3+, and math from about 55% to 58%. That is a statewide trend, not proof of any one program. FAST grade 5 math has four reporting categories of about 25% each.
- **New Worlds Reading (free books by mail, K–5):** the program reports that enrolled students "scored up to 15% higher" on spring FAST than eligible non-enrolled peers. This is **self-reported and correlational**, with no controls disclosed. Enrollment is still free and low effort, so it's worth doing, and the son qualifies if he meets eligibility.
- **Florida Tutoring Advantage (high-dosage tutoring pilot, K–5, about 3,500 students):** about **+11 scale-score points in math and +10 in reading** on end-of-year progress monitoring, versus non-participants. Sessions were at most 4:1, with 81% attendance and 96% tutor consistency. This is a quasi-experimental legislative update, not a peer-reviewed study. The lesson for us is that **consistency and dose** drive results. That is why "5 active days a week" is the right headline metric.
- **Science of reading:** Florida's B.E.S.T. ELA and the K–3 FAST (Star Early Literacy) test phonemic awareness, phonics and fluency directly. The Dino Star Patrol practices in this spec match what his FAST reports will show.

---

## B. Attention and engagement rules (ages 6 and 10)

1. **Session shape (keep ~30 min):** warm-up review (3–5 min) → new learning (8–10) → movement break (1) → mixed practice (8–10) → creative finish (5) → end screen with "what I got better at." The 1st grader gets 3–5-minute activities. The 5th grader gets 8–12 minutes.
2. **Success target of 80–85% first try.** Change the level rules. The current rule levels up at 4 of 5 correct and down at 1 of 4. Move up at **≥ 9 of the last 10 correct**. Move down at **≤ 6 of the last 10**, or 3 misses in a row. Otherwise hold. On the dashboard, show each skill's rolling first-try % with an 80–85% band.
3. **No visible countdown timers.** Replace Fact Sprint and Meteor Blast countdowns with "Beat your own score": a fixed set of 20 facts, with time recorded silently. The child sees "You answered 17 right, 3 more than last week!" The parent dashboard shows facts per minute. This follows the WWC fluency guidance ("meet or beat", chart progress) without countdown anxiety.
4. **Mistakes as learning:** after a miss, show the right answer with one "why" line and a **worked example**. Log it to "Comeback Cards" (spaced review). When it's answered right later, celebrate "Mistake conquered!" This is already a PROJECT.md success metric.
5. **Choice and autonomy:** let the child choose the *order* of stations and one of two themes, prompts or books. Never let choice skip the target skill.
6. **Rewards:** praise effort and strategy ("You used the number line, smart move"). Surprise bonuses stay *unexpected* (random, not announced). No loss-based mechanics: **a streak must never visibly reset to 0** (see f-weekly).
7. **Read-aloud everywhere for the 1st grader.** Every prompt gets a 🔊 button that auto-plays on first show. Keep speech short and one instruction at a time.

---

## C. Build specs, top 12 by impact × feasibility

Effort: **S** ≈ under 1 day of builder time, **M** ≈ 1–3 days, **L** ≈ over 3 days.

### 1. SRSD Writing Coach (POW + TREE/TIDE, text-based) → **f-writing** · Cove · M
*ES 1.17 (SRSD meta), 0.84–1.87 in a grade-4 state-task RCT · Strong*

**What she sees and does** (10–12 min, replaces "write with Coach Hoot" 3 days a week):
1. **Meet the trick (first time only, about 4 min):** Coach Hoot models POW + TIDE out loud on a sample, "thinking aloud" (SRSD stages: *develop background → discuss → model → memorize → support → independent*). Then a quick memory game: tap POW, TREE and TIDE letters to their meanings. She must "own the trick" (mnemonic 100%) before going independent.
2. **P (Pick):** read two short passages (`EDU.textPrompts[i].passages`) with 🔊 available. She taps "I think…" or "I'll explain…".
3. **O (Organize):** a planner card with one row per letter (T, R/I, E/D, E). Short notes only, entered with the Pencil (canvas) or keyboard. Each row has a "Find it" button that highlights sentences in the passages she can quote.
4. **W (Write and say more):** the essay editor with the plan pinned on the side. Sentence starters come from `srsd.TREE/TIDE[].starters`.
5. **Self-check:** a tap checklist (`srsd.checklist`). Then the AI (`use('sample')`, only her text plus the passages) scores **Purpose/Structure, Development and Language on the 1–4 B.E.S.T. scale**. It gives *one* glow and *one* grow per domain, quoting her words.
6. **Revise once** on the lowest domain, then compare with the previous score. Goal-setting: "Next time I'll add one more detail to each reason."
7. **Self-talk card** (`srsd.selfTalk`) appears whenever she pauses more than 60 s. The time is not shown to her.

**Scaffolding fade (adaptation):** Level 1: full planner, starters, and a model paragraph visible. Level 2: planner and starters. Level 3: planner only. Level 4: blank page with "Draw POW-TIDE yourself" (like the real test). Move up after 2 essays averaging ≥ 3 in every domain. Move down after 2 essays with any domain ≤ 1.5.
**Mode:** Pencil until December. From January, alternate, and use typed-only for the last 6 weeks before Mar 29, 2027 (the test is computer-based).
**Dashboard:** rubric trend per domain (line chart), counts of words / reasons / transitions / source citations per essay, and the latest essay with AI comments.
**Content:** `EDU.srsd`, `EDU.textPrompts` (8 prompts × 2 passages, 4 argument and 4 expository).

### 2. Spaced Review "Comeback Cards" → **f-review** · both · S–M
*g = 0.74 spaced vs massed retrieval (Latimier 2021); math spacing 0.28 · Meta*

**The child sees:** every session opens with 4 (Dino) or 6 (Cove) "Comeback Cards". These are items missed before, shown as a quick warm-up. A right answer sends the card flying into the critter's/dino's collection with "Mistake conquered!" on the 3rd spaced success.
**Rules:** each missed item is saved with `{skill, itemSeed or word, box:1, due:today+1}`. Correct first try → box+1, due in {1: 1 day, 2: 3 days, 3: 7 days, 4: 14 days, 5: done}. Missed → box = 1, due tomorrow, and show the worked example again. Cap at 6 cards a day, oldest due first, and mix skills (interleave). Also add 1–2 random already-mastered items weekly as "keep-sharp" retrieval.
**Dashboard:** "Mistakes conquered this week: N" and "Waiting to come back: N", listed by skill.
**Content:** built from existing generators and `S.missed`. Change `S.missed` from `{miss}` to a Leitner record and migrate old saves (PROJECT.md rule 5).

### 3. Decodable Story Reader + Repeated Reading → **f-rex** · Dino · M
*WWC Rec 4 daily connected text (Moderate); repeated reading (Therrien meta)*

**He sees:** a "Captain's Log" story card (a page of the 12 `EDU.stories`, 1–2 sentences per screen, big font, dino art).
1. **Listen (read 1):** the app reads it with word-by-word highlighting (Web Speech `onboundary`; if that's unsupported, use timed highlighting).
2. **Echo (read 2):** he taps each sentence, hears it, then reads it himself. Heart words glow ❤️ and target-pattern letters are tinted.
3. **Solo (read 3):** he reads alone. Any word can be tapped to hear it *sound by sound* (/r/ /e/ /x/ → "Rex"), never whole-word first.
4. **Two questions** read aloud: one literal (who/what), one "what happened because…". Picture choices.
5. The story "fuels the rocket". A reread on the next day is optional ("Read it faster to your dino").

**Adaptation:** stories unlock in pattern order. A story unlocks when the matching Reading Rocket skill (`cvc`, `digraph`, `magic`) is at level ≥ 2, or after 2 days on the previous story. Questions below 1/2 twice in a row → replay the story with more modeling.
**Optional mic:** if `webkitSpeechRecognition` works on his iPad, compare heard words to the text and mark likely misses for Mom. Don't grade him on it (recognition of child speech is unreliable).
**Dashboard:** stories read (count and which), rereads, question accuracy, and the words he tapped for help most often (these are the next heart-word or phonics targets).
**Content:** `EDU.stories` (12, 41–50 words, each with `pattern` and `heart`).

### 4. Sound Boxes + Word Chains → **f-sounds** · Dino · S–M
*WWC Rec 2 & 3 · Strong*

**He sees:** 2 of 3 boxes on screen. Dino says a word ("ship"). He pushes one space-pebble into a box for each sound he hears. The app says each sound as the pebble lands. Then the boxes flip into **letter tiles**, and he drags the letters in (`EDU.elkonin[i].gr`, so `sh` is one tile and `a_e` is one tile spanning the word). Finish with "Blast it!", which blends the sounds.
**Word chains:** "Change *ship* to *shop*": only one tile is movable, so he chooses which tile to swap. Uses `EDU.chains` (20 chains; each step changes exactly one sound, verified by the script).
**Heart words:** after each chain, 1 heart word. He sees it, hears it, and taps the regular letters (they turn green). The heart part turns ❤️ with the `why` read aloud. Then he spells it from memory with tiles.
**Adaptation:** start at 3 sounds, then 4 (blends), then 5, then silent-e. Move up at ≥ 9/10 first try. For a miss, replay the word slowly with finger-tap cues.
**Dashboard:** correct segmentation by word length; heart words secure (3 spaced correct) vs learning.
**Content:** `EDU.elkonin` (30), `EDU.chains` (20), `EDU.heartWords` (47, with `flash` marking temporary heart words).

### 5. Word-Problem Schemas → **f-mixed** · Cove · M
*g ≈ 0.81 (Myers 2022); WWC Rec 5 · Meta + WWC*

**She sees:** a word problem, then "What kind of story is this?" with 6 schema cards (Total, Difference, Change, Equal Groups, Times as Many, Two Steps; `EDU.schemas`). Next she fills a **schema diagram** by dragging the numbers into slots (e.g., Change: Start ▢ ± Change ▢ = End ▢, with the unknown as a "?"). Only then does she solve. It uses the RUN steps from Pirate Math and SBI: **R**ead, **U**nderline the question, **N**ame the schema.
**Adaptation:** Stage A shows the schema tag (she only fills the diagram). Stage B has her pick the schema. Stage C is mixed, including Two Steps. Advance at 85% across 10 problems. If she misses the schema twice in a row, show a worked example of that schema.
**Dashboard:** accuracy by schema type (which "stories" she recognizes), for example "Difference problems 50%".
**Content:** `EDU.schemas` (6 × 3 verified examples). Generators can reuse the templates with random decimals and fractions.

### 6. Interleaved Mixed Review → **f-mixed** · Cove (and Dino) · S
*d = 0.83 (Rohrer 2020, grade 7) · Strong (single large RCT)*

Change `planMath()` so at least **half of each Math Mission is mixed from different skills practiced in earlier weeks** (not today's focus), shuffled so two problems in a row never share a type. The pattern is 5 focus + 5 mixed, never blocked. Add the check-in question "Which tool do you need?" (estimate, number line, area model, schema) before she answers.
**Dashboard:** accuracy on mixed items vs focus items. Mixed accuracy is the better predictor of FAST.

### 7. Fraction Number Line → **f-mixed** · Cove · M
*+0.51 (Fraction Face-Off!, ESSA Strong); WWC Rec 4 number line*

**She sees:** an SVG 0–1 (then 0–2 and 0–3) number line. Tasks: **place** a fraction by dragging a critter (drop tolerance ±0.03); **compare** by placing two fractions and seeing which is further right; find **equivalents** by showing tick marks for 1/2, 2/4 and 4/8 landing on the same point; **add** unlike denominators by jumping. Language cue: "a fraction is a *number*, and it has a place on the line."
**Adaptation:** start with halves, fourths and eighths, then thirds and sixths, then tenths and hundredths (link to decimals, MA.5.NSO), then mixed numbers. Advance at 9/10.
**Dashboard:** placement error trend (average distance from the right spot).

### 8. Sentence Combining Studio → **f-writing** · Cove · S
*~0.50 (Writing Next, unverified figure) · Meta*

**She sees:** 2–3 short sentences as "puzzle pieces" and a connector chip (`because`, `although`, `who`…). She types or writes one combined sentence. Check: must include the connector (if one is given) and all key content words, plus a capital and end mark. The model answer is shown after, and alternative versions (`accept`) also count. Model answers are shown, not forced.
**Order:** and/but/so → because/when/after → although/until → who/which → adjective and phrase embedding → appositive. 3 sets a day in Writing Workshop warm-up.
**Dashboard:** connectors she's mastered. Later, the count of complex sentences in her essays (the AI can count them).
**Content:** `EDU.combine` (20).

### 9. Book Club (summaries + comprehension) → **f-bookclub** · Cove · M
*Summaries 0.52, grades 3–4 0.79 (Writing to Read) · Meta*

**She sees:** "Log a chapter." Step 1 is a 3–5-sentence summary using **Somebody–Wanted–But–So–Then** frames. Step 2 is 3 questions. Step 3 is a book-talk star rating and "a sentence I loved" (typed in by her).
**Grounding rules so the AI never invents plot facts:**
- The AI receives **only** (a) her summary text, (b) optionally the text of a **photo of one book page** she snaps (the photo is of the page only, never people; send the image or extracted text, and keep no title or author metadata beyond what she types), and (c) the question-stem bank below.
- System prompt: "Ask questions ONLY about details that appear in the provided summary or page text. Never state or assume any character, event, or fact not present. If more detail is needed, ask her to tell you."
- **Post-check before showing questions:** reject any AI question containing a capitalized name or number that doesn't appear in her summary or page text, and fall back to the generic stems.
- Question types: (1) **Recall from her summary:** "You wrote that ___. Why did that happen?" (2) **Generic stems**, which need no AI: "What does the main character want most? What's stopping them?" / "What do you predict will happen next? What clue made you think so?" / "Which word would you use to describe the main character? Find a moment that shows it." / "How did a character change in this chapter?" / "What question would you ask the author?" (3) **Page-photo vocabulary:** "Find a word on this page you didn't know. What do you think it means from the sentences around it?"
- The AI's reply comments on *her* reasoning and writing (Development and Language). It never "corrects" plot, because it doesn't know the book.

**Dashboard:** books and chapters logged, summary quality (the AI rates "includes who, wanted, but, so, then": 0–5), and minutes read (she reports it).

### 10. Morphology Spelling → **f-morph** · Cove · S
*d = 0.30 spelling, 0.59 decoding (Goodwin & Ahn 2013); spelling → reading 0.68*

**She sees:** 8 words a day from 1–2 groups (`EDU.morphGroups`). For each word:
1. **Build:** drag morpheme tiles (`parts`) together. For rule words, the join animates the change: the e drops, the consonant doubles, or the y turns into i.
2. **Meaning match:** "*mis* + *spell* = to spell ___" (uses `m`).
3. **Cover-copy-compare:** see the word, hear it, cover it, write it with the Pencil (or type it), then compare letter by letter. Mismatched letters are highlighted in their *morpheme* ("the suffix -ful has one l").
4. **Word sort** at the end of the week, e.g. "Which rule? drop-e / double / y→i / just add".

**Adaptation:** a new group only when 80% of the current group is spelled right on the *spaced* check (via f-review). Misspelled words go into Comeback Cards.
**Dashboard:** groups mastered, and rule errors vs random errors (for example, "she forgets to double" tells the parent exactly what to practice).
**Content:** `EDU.morph` (90 words in 21 groups: prefixes, suffixes, 3 spelling rules and 7 Latin/Greek roots; every split is verified by the script).

### 11. Worked → Faded Examples → **f-mixed** · Cove · S
*g = 0.48 (Barbieri 2023) · Meta*

When a skill is new, or after 2 misses on it, show **one correct worked example** (all steps), then a **faded twin** with the last step blank, then one more with 2 steps blank, then an independent problem. Keep steps visual (area model, number line, place-value chart). **Don't add "explain why" text boxes**: the meta found self-explanation prompts lowered the effect.
**Dashboard:** "Needed a worked example: N times this week" by skill.

### 12. Fact Fluency without a Timer (incremental rehearsal) → **f-review** (facts) · both · S
*WWC Rec 6 timed activities (Moderate; see note); IR (Promising, unverified ES)*

Replace the 60-second countdown with **"Fact Flight" / "Meteor Mix"**: 20 facts with no clock shown. Build them by incremental rehearsal: 1 unknown fact folded into known ones (known:unknown about 7:3 or more). Each unknown gets **a strategy card** (the existing `trick()`: doubles, make-10, 9s, break-apart). Speed is recorded silently. "Your best: 18 right" compares her only with herself. A fact counts as *fluent* when it's answered correctly in under 3 s (under 4 s for grade 1) on 3 separate days. The time limit is invisible and only used for the fact's status.
**Dashboard:** a fact grid (e.g., 0–12 × 0–12) colored new / learning / fluent, plus facts per minute over time (a parent-only chart).

### Engagement add-ons (low cost, high value)

**f-weekly: Weekly Goal + Shields** · both · S
- Replace the day streak with a **week**: 5 dino-eggs or critter-shells per week. Each finished mission fills one. The week's progress **never goes down**.
- **Shields**: finish all 4 stations on a day and earn 1 shield (max 2 held). A shield automatically covers a missed weekday, so "weeks in a row with 5" doesn't break for one sick day.
- The end-of-week screen celebrates effort ("5 days! You practiced 142 minutes") and shows 1 growth fact ("Your writing Development score went from 2 to 3"). Surprise rewards (new outfit or décor) come at *random* on goal weeks and are not announced beforehand.
- Keep `streakBest` for history. Migrate `S.streak` to `S.week = {start, days:[], shields}`.

**f-guess: Rapid-Guess Helper** · both · S
- Keep a median response time per item type (after 5 items). A response faster than **10% of that median** (min 1 s, max 10 s) counts as a rapid guess, following Wise's NT10 method.
- 2 rapid guesses in the last 5 items → a friendly slow-down: the critter/dino says "Let's read this one together," reads the question aloud and waits 2 s before choices can be tapped (with a gentle animation). No penalty and no scolding.
- Rapid-guess misses **don't count toward leveling down**, so the adaptive level stays honest.
- Dashboard: rapid-guess % per session (flag if over 10%) and the time of day it happens. That tells the parent when to schedule practice.

**Brain break** (both, S): a 60-second "stretch with your critter/dino" animation between stations 2 and 3, with read-aloud moves (reach to the stars, stomp like a dino). It can be skipped but is offered every day.

---

## D. What to build first

1. **f-review (Comeback Cards) and fixing the two policy breaks** (visible 60 s timers, streak reset to 0). Effort S–M. It compounds everything already in both apps, retires the anxiety-producing features, and "mistakes conquered" is already a success metric.
2. **f-writing (SRSD Writing Coach with text-based prompts).** It has the largest effect in the literature, targets her biggest struggle, and has a fixed deadline: B.E.S.T. Writing, Mar 29 2027, which needs about 20+ essays of practice across the scaffold fade. All passages and organizers are ready in `EDU`.
3. **f-rex and f-sounds for the 1st grader** (they share the tile/Elkonin component). This fills the WWC "daily connected text" gap. Stories, boxes, chains and heart words are ready.

---

## E. Content QA

`node --check src/content/edu_content.js` passes, and `node src/content/edu_content_check.js` passes all checks:
- 90 morphology words: every split rejoins to the word (with drop-e, double and y→i rules applied), with no duplicates.
- 16 passages, each 80–101 words.
- 18 word problems: every answer recomputed.
- 12 stories: 41–50 words each. Every heart word used is listed per story, and every listed heart word is in the heart-word bank. Decodability was checked by hand word by word, with pattern order CVC → digraphs → blends → silent-e → vowel teams. Early stories avoid `and` (a final blend) until the blend unit, and story 6 lists it as pre-taught `hf`.
- 30 Elkonin items: graphemes rejoin to the spelling. Digraphs and silent-e units count as one box.
- 20 word chains: each step is one grapheme-level change (or adding or removing a silent e).
- 47 heart words: each heart part is present in its word.

Facts in passages were chosen to be stable and checkable: the manatee cold-stress threshold (about 68 °F), springs at about 72 °F, hurricane 74 mph and ~80 °F water, the season June 1–Nov 30, the Everglades dry season (about Dec–May), Florida's 100 min/week recess law, and the AAP recess policy. They should still get a parent skim before publishing.

---

## F. Could not verify (flagged)

- **WWC math guide evidence levels:** two fetches of the same guide gave different levels for Recs 2, 4, 5 and 6. From memory: Rec 6 (timed activities) is Moderate. Check Table 1 of the PDF before quoting it.
- Exact **Writing Next** effect sizes (sentence combining ~0.50, summarization ~0.82, strategy instruction ~0.82) are from memory. The source page confirmed only the rank order.
- NRP phonemic-awareness effect sizes, repeated-reading ES (Therrien), incremental-rehearsal and cover-copy-compare effect sizes, and movement-break meta figures are unverified.
- The New Worlds Reading "15% higher" figure is vendor or state reported, correlational, and has no sample details.
- The Florida Tutoring Advantage pilot figures come from a secondary summary of a legislative presentation.
- Web Speech **recognition** on iPad Safari (for the optional mic) works inconsistently and needs a device test by QA. Read-aloud (speech *synthesis*) is fine.

## Sources
- SRSD RCT and meta figure: https://files.eric.ed.gov/fulltext/ED654039.pdf
- Writing to Read (Graham & Hebert 2010): https://media.carnegie.org/filer_public/9d/e2/9de20604-a055-42da-bc00-77da949b29d7/ccny_report_2010_writing.pdf
- Writing Next summary: https://www.adlit.org/topics/writing/summary-writing-next
- Fraction Face-Off (Evidence for ESSA): https://www.evidenceforessa.org/program/fraction-face-off/
- Pirate Math (Evidence for ESSA): https://www.evidenceforessa.org/program/pirate-math/
- Word-problem meta (Myers et al. 2022): https://journals.sagepub.com/doi/abs/10.3102/00346543211070049
- WWC Math Intervention guide: https://ies.ed.gov/ncee/wwc/PracticeGuide/26
- WWC Foundational Skills K–3: https://ies.ed.gov/ncee/wwc/practiceguide/21
- Interleaving RCT (Rohrer 2020): https://eric.ed.gov/?id=EJ1237752
- Spaced retrieval meta (Latimier 2021): https://eric.ed.gov/?id=EJ1310148
- Spacing/retrieval in math meta (2025): https://link.springer.com/article/10.1007/s10648-025-10035-1
- Worked examples meta (Barbieri 2023): https://eric.ed.gov/?id=EJ1364058
- Morphology meta (Goodwin & Ahn 2013): https://eric.ed.gov/?id=EJ1012349
- Repeated reading meta (Therrien 2004): https://eric.ed.gov/?id=EJ695617
- Gamification meta (Sailer & Homner 2020): https://eric.ed.gov/?id=EJ1245270
- Digital games meta (Clark et al. 2016): https://eric.ed.gov/?id=EJ1090510
- Rewards meta (Deci, Koestner & Ryan): https://www.selfdeterminationtheory.org/SDT/documents/2001_DeciKoestnerRyan.pdf
- 85% rule: https://www.nature.com/articles/s41467-019-12552-4
- Rapid guessing (NT10): https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2023.1127644/full
- B.E.S.T. Writing fact sheet 2025–26: https://www.fldoe.org/file/5663/2526BESTWritingFactSheet.pdf
- B.E.S.T. Writing 4–6 expository rubric: https://www.fldoe.org/core/fileparse.php/20102/urlt/4-6BESTWritingExpositoryRubric.pdf
- FAST 2025 statewide results: https://floridaphoenix.com/2025/06/25/florida-students-math-and-reading-scores-rise-in-2025/
- New Worlds Reading data: https://www.newworldsreading.com/en/data-shows-how-new-worlds-reading-makes-a-difference/
- Florida Tutoring Advantage pilot: https://citizenportal.ai/articles/7012327/Florida/2025-Legislature-FL/University-of-Florida-update-Florida-Tutoring-Advantage-pilot-showed-gains-program-to-scale-with-outcomes-based-contracts
