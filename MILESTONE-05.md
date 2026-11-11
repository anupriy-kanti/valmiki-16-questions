# Milestone 05: second fold, sync, English breaks, Patterns, copy

For cloud session **c.v16q-05**. Written by mytwiki-C22, 12 Nov 2026, from Anupriy's review of the live milestone 04 build and from REVIEW §8. House rules, stage and motion rules are those of `MILESTONE-04.md` unless this file changes them.

## 0. Stop first

Read this file, `MILESTONE-04.md` §1 and §3, and `REVIEW.md` §8. Post a short plan. Ask Anupriy to confirm the model (Fable 5.2, medium effort) and wait for his reply before changing any file.

## 1. House rules

- Commits start `c.v16q-05:`. Push to `main` is allowed for this session, as in 04.
- Copy in §2 and §6 is fixed: use it exactly, with its line breaks. Anything without copy gets `[copy needed: …]` and a line in REVIEW §9.
- No lone last word in any copy block at 360, 768 and 1440px.
- Opacity, scale and blur only. Nothing moves vertically.
- CHANGELOG entry, and a new REVIEW §9 with look-first items, judgement calls and checks, as in §8.

## 2. The second fold

Fold beat 1 stays as it is ("Before it tells a story, / the Rāmāyaṇa asks a question."). The old beats 2 and 3 are replaced by the beats below. Each beat is one swap on scroll, in this order. The scatter of the sixteen qualities moves to sit between beats 3 and 4, and fades as beat 4 arrives. The board starts empty at 1.1.1, as now.

1. `The poet Vālmīki asks` / `the sage Nārada`
2. `whether anyone alive today` / `holds sixteen qualities.`
3. The scatter: the sixteen qualities appear (IAST over Devanāgarī, as on the board), in the fixed scatter order of 04.
4. `Nārada takes a moment to think.` / `Such qualities are hard to find together.`
5. `But one man` / `comes to his mind.`
6. `His name is Rāma,` / `and he has them all.`
7. `Nārada’s answer` / `to Vālmīki’s questions`
8. `is where the whole story` / `of the epic begins.`

Beats 7 and 8 read as one sentence across two swaps. Keep the swap between them, so the second half lands on its own.

Grounding, for the reviewer: Goldman 1.1.6–8 has Nārada say the virtues named are hard to find, ask for a moment to think, promise to tell of a man who has them all, and then say "His name is Rāma and he was born in the House of Ikṣvāku."

## 3. Audio sync

Anupriy hears the highlight out of step with the voice, most of all at 1.1.1, where the recitation opens with oṃ before तपःस्वाध्यायनिरतं.

Cause: `src/content.js` spreads word times over the whole half-line window, from `start` to `end`. Each window holds lead-in silence and a pause between its two quarter-verses, so the spread drifts from the voice. At 1.1.1 the window also held the oṃ, and the a/b break sat at 6.95 s, inside the second quarter.

The data is now corrected in `data/audio-timings.json` (see its `_padas` note):

- Every half-line has `padas`: two `[onset, end]` pairs, one per quarter-verse, measured where the voice is.
- 1.1.1a's first quarter starts at 3.15 s. The oṃ (1.60 to 3.05 s) is not given to any word.
- The 1.1.1 a/b break is now 9.65 s.

Change the spread: split each half-line's syllables into two halves (at half the half-line's syllable total), and spread the first half across `padas[0]` and the second across `padas[1]`, by syllable count as now. Between the quarters the highlight holds on the last word. Playback still starts at the window `start` (so the oṃ is heard at 1.1.1), and the verse still ends at the window `end`.

When the voice starts, the highlight fades back to the first word over the 0.5 s settle pause, instead of jumping (REVIEW §8 item 3).

Check by ear and by script: at each verse, the first word lights within 0.15 s of the first quarter's onset. Report the largest offset across the 19 verses.

## 4. English line breaks

Some English lines break badly, for example Goldman at 1.1.17, where a line ends on "like the" before "fire of destruction".

Rule, for both Goldman and Debroy, at every width:

- No line ends on a short function word. Bind each of these to the word after it with a no-break space at render time: a, an, the, of, in, on, at, to, by, for, with, as, like, and, or, but, his, her, its, is, was, who.
- Where an English block holds several sentences, prefer breaks at sentence ends. Each sentence is its own balanced block when it fits on one line at that width.
- Leave the translators' words and punctuation exactly as they are. Only the breaks change.

Check every verse's English in both translations at 360, 768 and 1440px. Report the count of lines that end on a word from the list (target 0).

## 5. Patterns: why the table matters

Patterns shows the matrix and its lenses, but not what the table means for the Rāmāyaṇa. Add a short framing above the lens row, and a way back into the story below the matrix.

Framing (copy, fixed):

`Before the Rāmāyaṇa tells Rāma’s story,` / `it describes him, quality by quality,` / `in answer to Vālmīki’s sixteen questions.`

`This table shows where the answer meets each question,` / `and where it leaves a question open.`

Below the matrix, one link back into the Conversation at the 1.1.19 beat, with the text: `See where the description becomes the story`.

The "Where description becomes story" lens moves to the end of the lens row, where it already is. No other lens changes.

## 6. Copy replacements (REVIEW §8, old copy)

Replace each line exactly. Line breaks follow the existing markup.

**Sources & method, Sanskrit, first paragraph, last sentence.** Replace "It appears only where it has lines the Critical Edition does not." with:

> It appears only in the three half-lines heard in the recitation that the Critical Edition does not have.

**Sources & method, Sanskrit, second paragraph.** Replace the whole paragraph with:

> In the Conversation, the Devanāgarī is transliterated from the GRETIL IAST word by word, so each word lines up with its romanisation. The Critical Edition Sanskrit is shown with the two English translations made from it, Goldman’s and Debroy’s.

**Sources & method, bibliography, Gita Press item.** Replace "The Devanāgarī in the “Gita Press reading” boxes is transcribed verbatim from the Gita Press pages." with:

> The Devanāgarī of the three vulgate half-lines is transcribed verbatim from the Gita Press pages.

**Sources & method, "How the mapping was made".** Replace the bullet on question tags with:

> Each mark in the matrix is Anupriy Kanti’s reading of where a verse of Nārada’s answer meets one of the sixteen qualities. The readings are still being checked against the printed Critical Edition.

Replace the bullet on echo pills with:

> A mark is graded by how closely Nārada’s words meet Vālmīki’s: the same word, other words with the same sense, in part, or turned around. A quality with no mark is not answered in these verses.

Replace the bullet beginning "Debroy translates the Critical Edition. The Gita Press English follows the vulgate." with:

> Debroy also translates the Critical Edition. His English is shown at the verse it renders.

**Editorial card "Edition divergence", last sentence.** Replace "They are shown in muted “Gita Press reading” boxes at 1.1.13 and 1.1.19." with:

> They are heard in the recitation, and shown under 1.1.13 and 1.1.19 while they play.

**`index.html`, description and `og:description`.** Replace both with:

> Vālmīki’s sixteen questions and Nārada’s answer, Rāmāyaṇa 1.1.1–19, in the Critical Edition Sanskrit with Goldman’s and Debroy’s English.

**Link preview image.** Make a new `og.jpg` from the current hero (title over the image, 1200 × 630). No new copy.

**The paper block (`AuthorPart` in `src/Author.jsx`).** The site may outlast the SAI27 paper, so it names the paper as its origin, never as something the site belongs to.

- Label: `Origin`
- Sentence: `This site began as a companion to the paper` *[paper title, exactly as on the site now]*`, written for` *[conference name, exactly as on the site now]*`.`
- Drop the organisers, the principal partner and the dates.
- Show it on the About page only. Remove it from the last beat of the Conversation, which now ends on The Author.

Then search the whole site, including meta tags, for any other wording that makes the site part of the paper ("supplements", "accompanies", "part of"). List each in REVIEW §9 with its place. Do not change it.

## 7. Answers to REVIEW §8, look-first items

1. Phones, note in place of the English at 1.1.4, 1.1.17 and 1.1.19: accepted for now.
2. Small phones: no copy block under a verse scales below 85%. Where it would, the note becomes a one-line `Read the note` button under the verse that shows the note in place of the English. 1.1.19 at 360 × 640 is the test case.
3. Sync jump back: see §3 (fade back over the settle pause).
4. Matrix on a phone and the board at 1280px and wider: no change asked.

## 8. Checks

As in REVIEW §8, on the live site after deploy, at 360, 768 and 1440px, plus:

- The fold: eight beats in the §2 order, the scatter only between beats 3 and 4, 0 lone last words.
- Sync: the largest first-word offset across the 19 verses (target under 0.15 s), and 1.1.1 lighting तपः after the oṃ, not during it.
- English: 0 lines ending on a §4 word, both translations, three widths.
- Patterns: the framing shows, and the link lands on the 1.1.19 beat.
- Copy: every §6 replacement present, and 0 matches for "reference views", "echo pill", "three English", "Gita Press reading" and "supplements".
- Not tested last time: open the live site in Safari or WebKit (Playwright `webkit`) if the container allows it, and report the result.
