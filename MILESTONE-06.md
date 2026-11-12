# Milestone 06: checkpoints, the quality rail, Patterns in one fold

For cloud session **c.v16q-06**. Written by mytwiki-C23, 12 Nov 2026, from Anupriy's review of the live milestone 05 build and his answers to REVIEW §9. House rules, stage and motion rules are those of `MILESTONE-04.md` and `MILESTONE-05.md` unless this file changes them.

## 0. Stop first

Read this file, `MILESTONE-04.md` §3 to §5, `MILESTONE-05.md` §3, and `REVIEW.md` §9. Read `src/Stage.jsx`, `src/Board.jsx`, `src/Matrix.jsx`, `src/Patterns.jsx` and `src/audio.js` before planning. Post a short plan that names the order in §1 and how you will build the checkpoint engine (§2). Ask Anupriy to confirm the model (Fable 5.2, medium effort) and wait for his reply before changing any file.

## 1. House rules and order

- Commits start `c.v16q-06:`. Push to `main` is allowed for this session.
- **No new copy.** Every word on the site already exists. Anything that would need new words gets `[copy needed: …]` and a line in REVIEW §10.
- No lone last word in any copy block at 360, 768 and 1440px.
- Opacity, scale and blur only. Nothing moves vertically, and nothing travels across the screen (§5 keeps to this).
- CHANGELOG entry, and a new REVIEW §10 with look-first items, judgement calls and checks, as in §9.

**Work in this order. Push after each item, once it passes its checks**, so that if the session runs out, what is live is whole:

1. The 1.1.3 timing fix (`11250f6`, already on `main` when you start) needs nothing from you. Fix 1.1.2a's syllable count: a vowel-less unit such as `nv` counts as 0 syllables, not 0.5, so every CE half-line counts 16 (`scripts/build-data.mjs` or wherever the count is made). Re-run the script check from §9 (every half-line window holds its two quarter-verses).
2. The checkpoint engine (§2 and §3).
3. Patterns in one fold (§4).
4. The quality rail (§5.1).
5. Selectable quality words (§5.2).
6. The REVIEW §9 answers (§6).
7. Lighthouse and a screen-reader pass (§7).

## 2. Checkpoints: one gesture, one step

Today the stage scrubs: scroll distance sets how many words are lit (`litAt`, `LIT_FROM`, `LIT_TO`). That makes the Conversation too sensitive. A fast scroll skips folds and runs through verses, and the scatter can show only some of the qualities before the next scroll moves on. It also causes a bug: on arriving at some verses, part of the verse lights, then goes grey again before the one-word highlight starts.

Replace scrubbing with **checkpoints** in the Conversation, Questions and Answers (they share the stage).

- **One gesture is one step**, however hard or long the wheel, trackpad or swipe. Down goes to the next checkpoint, up to the previous one.
- While a step's transition runs, and for a short cooldown after it, further input is ignored, so trackpad and phone inertia does not take a second step.
- Arrow Down, Page Down and Space step forward. Arrow Up, Page Up and Shift+Space step back. Home and End go to the first and last checkpoint.
- Put every duration in one constants block at the top of the engine, so Anupriy can tune them in one commit. Starting values:
  - fold swap: 0.9 s
  - verse checkpoint 1 to 2: 0.6 s
  - completing a verse (2 to 3): 0.4 s
  - cooldown after a step: 0.35 s
- `prefers-reduced-motion`: same steps, instant swaps.
- The URL keeps working: `?v=1.1.19` lands on that verse's last checkpoint (all lit, with its note if it has one). Update `?v=` as the reader moves, as now.
- The pager dots still jump. A jump lands on the target's first checkpoint.
- Sources & method and About stay ordinary scrolling pages. Patterns becomes a single fold (§4) and needs no checkpoints.
- The page must stay usable with a screen reader and without JavaScript-driven scrolling. The full verse text stays in the page, as now.

## 3. The checkpoint map

**Hero:** 1 checkpoint. **Each fold sentence:** 1 checkpoint (the eight beats of `MILESTONE-05.md` §2, in order).

**The scatter:** 1 checkpoint. On arrival, all sixteen qualities appear in a timed stagger (about 1.5 s in all, in the fixed scatter order). Input is ignored until the stagger ends. The next step fades them where they stand, as now.

**Each verse:**

1. **Grey.** The verse appears, no word lit. No English yet.
2. **The first word lights**, the English appears, and the recitation starts. The words then light **in time with the recitation**, not with the scroll, from the quarter-verse timings in `data/audio-timings.json` exactly as the sync works now.
   - **Sound off** (the default until the reader taps Sound): the words still light silently at the recitation's pace, from the same timings. The page reads the same with or without sound.
   - **During the lead-in** (the oṃ at 1.1.1, 3 s; the vulgate half-line at 1.1.13, 7 s), the first word is lit and waits. This answers REVIEW §9 item 2.
3. **All lit.** Reached either way:
   - when the recitation ends, the verse arrives at checkpoint 3 by itself. The page does not move. The next gesture goes on.
   - if the reader steps forward while the words are still lighting, all the words light (0.4 s), the audio fades out as it does when leaving a verse now, and the verse is at checkpoint 3. The next gesture goes on.
4. **The note**, only for verses that have one (1.1.4, 1.1.17, 1.1.19). It fades in under the English as now.

**Stepping back** reverses the steps. Entering the previous verse from below lands on its last checkpoint: all lit, note shown if it has one, silent.

The partial-lighting bug must be gone: on arrival at checkpoint 1, no word is lit, at any speed of input. Test with fast repeated wheel events and with a long trackpad fling.

**"Not answered here", the matrix, The Author, the colophon:** 1 checkpoint each. Questions ends on its closing fold, Answers on the matrix, as now.

## 4. Patterns: one fold on desktop, with a detail panel

At 1024px and wider, Patterns fits in one screen (check at 1440 × 900 and 1280 × 800) with no scroll. It follows the composition of the end of the Answers tab, which Anupriy likes: title, caption, matrix, legend.

- **Left:** the title, the caption (rows, columns, a dot), the lens row, the matrix, the legend, and the link `See where the description becomes the story`. Tighten the matrix rows only as far as needed to fit.
- **Right of the matrix: a detail panel** that fills the empty space beside it.
  - **By default** it shows the two framing paragraphs (`COPY.patternsFrame`), set as **prose**, without their forced line breaks. On desktop those breaks are unnecessary. The words do not change.
  - **When a dot is clicked**, the panel shows that dot's detail: the quality in IAST and Devanāgarī, its gloss (`answer-map.json`), the verse, the grade (the legend's own words: Same word, Other words, In part, Turned), and the answering words. Use the content the dot's tooltip shows now, laid out larger, plus the gloss. The dot stays marked. Clicking it again, or Escape, returns the panel to the framing.
  - **When a lens is chosen**, the panel shows that lens's note, as now beside the matrix.
- **Below 1024px:** one column, as now. The framing keeps its line breaks on phones. A dot opens its detail in place, as the tooltip does now.

## 5. The qualities, more clearly

The whole site is about the sixteen qualities, but today they are a small strip under the tabs (Questions: gold, Answers: coloured by group). It is hard to read and badly placed on narrow screens.

### 5.1 The rail

Replace the strip under the tabs with **one quality rail**, in all three stage views.

- **Desktop (1024px and up):** a column down the right edge of the stage listing all sixteen qualities, IAST over Devanāgarī, in the board's order. It is the 16 Qualities board of `MILESTONE-04.md` §5, made the single key: the same rules for appearing, lighting by grade, the turn mark on jitakrodha, unlit `none` qualities, and the gloss on lit slots. In Questions every slot is present from the start, unlit, and lights as its word lights in 1.1.2 to 4. In Answers, slots light in their group's colour as in the Conversation.
- **The verse stays at the exact centre of the viewport.** The rail takes the right margin. If the verse and its English cannot keep their centre and widths at 1024 to 1280px with the rail beside them, report it in REVIEW §10 with measurements before choosing a fix.
- **Phones and tablets (below 1024px):** a compact strip above the verse, at most two rows, showing all sixteen in IAST only: the current verse's qualities at full strength, the others dimmed. It must be readable at 360px.
- Readability is the point: larger than today's strip, with enough contrast that a dimmed quality is still legible.

### 5.2 Selecting a quality word

Every quality word in a verse can be selected: a click on desktop, a tap on phones.

- **Which words:** in Questions (1.1.2 to 4), the sixteen question words. In Answers and in the Conversation's answer verses (1.1.8 to 19), the words mapped in `answer-map.json`. Only words that are already lit can be selected.
- **On selection, nothing travels across the screen.** The word answers in place and the rail answers in place, together:
  1. A hairline outline appears around the word, close to it (minimal padding), in its group's colour.
  2. At the same moment the word gives off a soft echo: a copy of the word in place, scaling up slightly (about 1.08) while it blurs and fades out over about 0.6 s.
  3. In step with that echo, the word's slot on the rail **blooms**: it comes into focus from a blur, brightens, and opens a small card beside it with the gloss, the verses that answer the quality and their grades, and the link `See it in Patterns` to `/patterns?q=<quality>` with that quality's dots marked.
  4. A second click or tap, Escape, or stepping to the next checkpoint clears it.
- On phones the card opens under the strip, over the stage's dark space, and does not cover the verse.
- `prefers-reduced-motion`: the outline and the slot's card only, no echo and no bloom.
- Keyboard: selectable words are reachable with Tab only while their verse is on stage, and Enter selects. Each has an accessible name: the word, then its quality.
- The card uses only words that already exist (the gloss, the grade names, the verse numbers, the link text). Anything more is `[copy needed: …]`.

Anupriy asked for something immersive that still keeps the motion rules. The echo and bloom are the proposal. If it reads as too quiet, say so in REVIEW §10 and describe the alternative you would try (for example a faint thread of light drawn from the word to its slot, which is drawn, not moved). Do not build the alternative.

## 6. REVIEW §9: Anupriy's answers

1. **Sync by ear:** heard. No clear fault, to revisit after 06. No change.
2. **Lead-in:** light the first word and let it wait (§3, checkpoint 2).
3. **Short screens:** a smaller verse on short screens, not the English on its own beat. Scale the Devanāgarī and IAST down on screens under about 700px tall until every block under a verse is at 85% or more. 1.1.2 with Debroy at 360 × 640 and 1.1.19 with Goldman at 360 × 560 are the test cases. Report the smallest verse size used.
4. **The last beat of the Conversation** (the copy-link button and the footer): keep it.
5. **`Read the note` button:** remove it and its code. The note has its own checkpoint now.
6. **Not tested:** see §7.

## 7. Checks

On the live site after each deploy, at 360 × 640, 768 × 1024, 1280 × 800 and 1440 × 900, by script (Playwright, Chromium), as in REVIEW §9, plus:

- **Checkpoints.** For each view, step through every checkpoint with single wheel events, then with a burst of 20 wheel events in 200 ms, then with a simulated trackpad fling. A burst or a fling moves exactly one checkpoint. Report the checkpoint count per view.
- **The partial-lighting bug.** At every verse's checkpoint 1, 0 words lit, at every input speed.
- **Words in time.** With sound off and with sound on: at checkpoint 2, the first word is lit within 0.15 s of the step; the last word lights within 0.15 s of the last quarter's end; checkpoint 3 is reached by itself. Stepping during playback lights all words and fades the audio.
- **Scatter.** All sixteen visible at the end of its stagger, at every input speed.
- **Back and links.** Stepping back reverses every step. `?v=1.1.19` lands on 1.1.19, all lit, note shown.
- **Patterns.** No vertical scroll at 1440 × 900 and 1280 × 800. Default panel shows the framing. A dot click shows its detail, and a lens shows its note. Added after the defect of 12 Nov (REVIEW §10): also at 1024 × 768 and 1280 × 720, and "fits" means that no element is cut off by the screen or by a clipping parent, and that the link under the matrix can be clicked.
- **Nothing is cut off on the stage.** Added on 12 Nov after the Patterns defect (REVIEW §10). At every checkpoint of the Conversation (Goldman, and Debroy with sound on), Questions and Answers (Goldman, and Debroy with sound on), at 1440 × 900, 1280 × 800, 1280 × 720, 1024 × 768, 1366 × 768, 1536 × 864, 1920 × 1080, 1024 × 700, 360 × 640 and 768 × 1024: every visible text is inside the screen and below the nav, every control is the element under the mouse at its centre, and no text of the beat lies under the rail, the strip, the controls, the recitation credit, the pager, the bottom line or the card. The card is checked on the first and the last selectable word of each verse.
- **The rail.** Sixteen slots at 1024px and up, the strip at 360 and 768px, readable at 360px (report the smallest font size). The verse is still at the exact centre at 1024, 1280 and 1440px.
- **Selection.** Every selectable word in 1.1.2 to 4 and 1.1.8 to 19 opens the right slot's card. Reduced motion: no echo, no bloom.
- **Small phones.** Every block under a verse at 85% or more at 360 × 640 and 360 × 560.
- **Unchanged.** 0 lone last words, 0 English lines ending on a `MILESTONE-05.md` §4 word, 0 vertical transforms, 0 console errors, the audio file byte-identical, 23 matrix marks.
- **Lighthouse** (performance, accessibility, best practices) on Conversation, Patterns and About at mobile and desktop settings. Report the scores.
- **Screen reader:** with the accessibility tree (Playwright's snapshot), confirm each verse's full text, the rail's slot names and the selectable words' names are read in a sensible order.
- **Not possible here:** Safari or WebKit and real phones. Say so. Anupriy and mytwiki-C23 test those after the session.
