# Milestone 02 · cloud-myt-v16q • 02 (short form c.v16q-02)

Planned in mytwiki-C21, 5 Nov 2026, with Anupriy's rulings. Build exactly this. Anything ambiguous goes in `REVIEW.md` §6 (new section "Milestone 02") rather than a guess. Rules from `BRIEF.md` still hold: no change to verse text, badges or numbering, British English, no semicolons in copy you write, no new claims about Sanskrit.

Session naming from now on: cloud sessions on this site are `cloud-myt-v16q • NN — <short description>`, short form `c.v16q-NN`. The first build was 01. This is 02. Use `c.v16q-02:` at the start of every commit message and log it in `CHANGELOG.md`.

## 1. Landing (first fold): the image is the stage

- The hero image fills the first screen (`100svh`), centred, `object-fit: cover`, with a soft vignette that fades to the page background on **all four sides**, so the top nav and the tabs sit inside the picture rather than above it. The nav sits over the image, transparent, and turns solid once you scroll past the first fold.
- On load: only the image, the nav and a small scroll cue (a thin animated chevron, bottom centre, with the label "Scroll").
- On the first scroll (about the first 30–40% of the fold): a dark gradient overlay rises over the lower half of the image, then fades in, in this order:
  - Title: **Vālmīki's 16 Questions**
  - Subtitle: **The question that sets the Rāmāyaṇa in motion**
  - Byline: **By Anupriy Kanti · Mythematical**. It shows with the title and fades out as the reader scrolls on to the second fold.
- Drop the old "Rāmāyaṇa · Bālakāṇḍa · Sarga 1" eyebrow from the hero. It moves to the second fold as a small label.
- Reduced motion: everything visible at once, static overlay, no chevron animation.
- The scroll cue hides once the reader has scrolled.

## 2. Second fold: the introduction

- A calm, centred column. Small label "Rāmāyaṇa · Bālakāṇḍa · Sarga 1". Then the two introduction paragraphs, verbatim from the current site, from "The Rāmāyaṇa opens with a question." to "These patterns show how carefully the epic's first lines are built."
- They fade in on arrival (once). After them, the reading view starts as it does now.

## 3. Key as a tuck-away sidebar

- Take the key (nine themes, three echo types, their descriptions) out of the page flow into a sidebar on the right.
- **Closed on load.** A vertical "Key" tab on the right edge opens it. A close button and Escape tuck it away. Remember open or closed per reader in `localStorage` (wrapped in try/catch).
- At 1024px and wider, it slides in over the page margin and does not cover the 760px reading column if there is room. Below 1024px it opens as a bottom sheet, at most 70% of the screen high.
- Focus moves into it on open and back to the tab on close. It must not clash with the progress rail (rail left, key right).

## 4. Label the Sanskrit

- Above each verse's primary Sanskrit, a small label: **Sanskrit · Critical Edition (GRETIL)**. It links to the GRETIL entry on Sources.
- The existing boxes stay as they are: "Gita Press reading, not in the CE constituted text".
- On Sources & method, add one short paragraph: the primary Sanskrit is the Baroda Critical Edition (constituted text) from GRETIL in IAST and from John Smith's Unicode file in Devanāgarī. The Gita Press Sanskrit is the vulgate recension and appears only where it has lines the CE does not.

## 5. Goldman verse by verse (marked as MYT's alignment)

- Use `data/goldman-aligned-draft.json` in place of the paragraph blocks: one Goldman piece per verse, 1.1.1–19, verbatim.
- Every piece carries the label **Goldman (CE)** and a small note: "Verse split by MYT. Goldman's paragraph covers 1.1.6–11" (the right range per piece), linking to a disclosure that shows the whole paragraph.
- Show the two notes in the file at 1.1.18 and 1.1.19 (Goldman moves 1.1.18b into the next sentence).
- Draft banner: until Anupriy has checked the split, Sources & method says "The verse-by-verse split of Goldman's paragraphs is a draft by MYT, under review". Add an item to `REVIEW.md` for Anupriy to check the 19 pieces against print pp. 51–52.
- Present mode now shows the Goldman piece for each verse too.

## 6. Done looks like

- All six routes work, deep links still work (`#/answers?v=1.1.14`), Present mode still works.
- Lighthouse on the local preview: accessibility 100, mobile performance at least 90. Report the numbers.
- 375px and 1440px checked, no sideways scroll, the reduced-motion version checked.
- Each item is a separate commit with a `c.v16q-02:` prefix, pushed to `main`, logged in `CHANGELOG.md`, with the unfinished parts in `REVIEW.md` §6.
- Final message: what was done, what was not, and anything Anupriy must decide.
