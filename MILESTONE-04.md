# MILESTONE-04 · brief for cloud-myt-v16q • 04 (c.v16q-04)

Planned in the vault session mytwiki-C22 (11 Nov 2026) with Anupriy, decision by decision. Every choice below is settled. Where this file and `MILESTONE-03.md` disagree, this file wins.

## 0. Stop first: confirm the model before any work

Before you edit, install or run anything:

1. Read this file, `REVIEW.md` §7, `src/` and the three data files named in §2.
2. Post a short plan in chat: the order you will build in and anything in this brief you think is unclear or contradictory.
3. **Ask Anupriy to confirm the session is on Fable 5.2 at medium effort, and wait for his answer.** He sets the model himself. Do not start until he says go.

## 1. House rules

- Commit messages start `c.v16q-04:`. Log each commit in `CHANGELOG.md`. Add `REVIEW.md` §8 for this milestone: judgement calls, checks, what Anupriy must decide.
- **Copy is fixed.** Use the copy in §9 exactly, with its line breaks. Do not write new visible copy. If a screen needs words this brief does not give, use a placeholder `[copy needed: …]` and list it in `REVIEW.md` §8.
- **Line breaks look intentional.** No line ends on a lone word, on any width from 320px up. Use the breaks given here on wide screens, `text-wrap: balance` for headings and short blocks, `text-wrap: pretty` for longer text, and a non-breaking space between the last two words where needed. Check every copy block at 360, 768 and 1440px.
- British English. IAST with diacritics. No semicolons in visible copy.
- Do not change the mapping data, the grades or the concordance. Read them.
- The open decisions in `REVIEW.md` §7 stay open unless this brief settles them.

## 2. New data in the repo (made in mytwiki-C22)

- `assets-src/audio/vr-1-1-1-to-19-bhide.mp3`: CE 1.1.1 to 1.1.19, 4 min 31 s, an unedited excerpt (00:23.6 to 04:54.6) of archive.org VR-Balkanda-01 by Vishwas Bhide (2018), CC BY-NC-ND 4.0. Copy it to `public/audio/` in the build. **Never re-encode, cut, splice or alter it.**
- `data/audio-timings.json`: 41 half-line windows (seconds from clip start). Rows marked `vulgate` are half-lines the reciter chants that are not in the CE constituted text (inside 1.1.13 twice, inside 1.1.19 once), with their IAST.
- `data/answer-map.json`: for each of the 16 qualities, the CE words in Nārada's answer that answer it, graded `exact`, `clear`, `partial`, `turned` or `none`, from the vault's Scaffold A. It **replaces** the artefact's `answers` and `echoes` for the board, the matrix and the lenses. Three qualities are `none`: kṛtajña (Q4), samartha (Q10), anasūyaka (Q15). Q4 also has a `lens` block (the "two senses" reading) used only in Patterns.

## 3. Motion: nothing moves up or down

- The Conversation, Questions and Answers views are **one pinned stage**. Scroll scrubs a timeline. Elements appear, fade, scale a little, blur and come back in place. **No element and no section translates vertically**, ever, including section changes. A slight horizontal drift is allowed for decorative elements only.
- Scrolling back up plays everything in reverse: what faded out reappears.
- Decorative layer, kept subtle and drawn in CSS or SVG: a warm lamp glow, a few slow motes or embers, faint palm-leaf edges at the margins. Nothing that competes with the verse.
- `prefers-reduced-motion`: instant swaps, no drift, no motes.
- Sources & method and About stay ordinary scrolling reading pages.

## 4. The Conversation view (was "All")

Rename the tab **Conversation**. The route stays `#/`. Order of the timeline:

1. **Hero:** as now (the image alone, uncropped, with the caption and scroll cue).
2. **The second fold (replaces `MILESTONE-03.md` §4, the nested frames and the old intro sentences).** Four beats, each appearing and disappearing in the same place at the centre:
   - Beats 1 to 3: the three copy blocks in §9.1, one per screen, EB Garamond italic.
   - Beat 4, no sentences: (4a) on a dark stage the sixteen qualities fade in one at a time, scattered, each in Devanāgarī with its IAST beneath, in dim gold. (4b) On scroll they fade out where they stand and verse 1.1.1 fades in at the centre. (4c) As each quality word lights in 1.1.2 to 4, the same word reappears on the 16 Qualities board. Nothing travels across the screen.
3. **The verses, 1.1.1 to 1.1.19.** One verse on stage at a time, anchored at the exact centre of the viewport at every width. The word-by-word gold highlight stays as built. **The English appears when the first word lights, stays for the whole verse, and leaves with the verse.** Section eyebrows stay as in `MILESTONE-03.md`.
4. **Inline notes:** after a verse's English is complete, its note (§9.3) fades in under it with a small `See it in Patterns` link. Notes after 1.1.4, 1.1.17 and 1.1.19, and the "Not answered here" note just before the matrix. The old boxed pattern cards are removed from this view.
5. **Vulgate half-lines:** while a vulgate window in `audio-timings.json` is playing, show that half-line in IAST as a faint line under the verse with the label in §9.4. It is not part of the highlight.
6. **The matrix** (§7) closes the view, then The Author as now.

Remove **Present mode** and its button entirely.

## 5. The 16 Qualities board

- Title **16 Qualities**. Each slot shows the quality in IAST and Devanāgarī. Its English gloss (from `answer-map.json`) shows only when the slot is lit.
- Fix the slot design: the colour dot aligns on the same baseline as the label. Replace the strong outline with a hairline at low opacity, or no outline, so the slots read as a quiet list. Keep it aesthetic and calm.
- **Appearing:** a quality's slot appears when its word lights in Vālmīki's verses (1.1.2 to 4). Before that the board is empty.
- **Lighting:** in Nārada's verses, a slot lights in its colour group's colour when one of its answering words lights. Brightness by grade: `exact` full, `clear` a step softer, `partial` softer again. `turned` (jitakrodha at 1.1.17) lights with a small turn mark. `none` (Q4, Q10, Q15) stays unlit to the end. Kṛtajña's lens answers never light here.
- Caption under the title: §9.2. The colour key (group names only, no descriptions) appears when the first colour lights. Keep the nine colour groups and their colours as they are in `src/content.js`.
- Remove the count of answering verses from the board.
- **Phones:** a slim strip pinned at the top showing only the qualities lit in the current verse.

## 6. Audio and the control cluster

- **Controls, bottom right, always present:** `Goldman` · `Debroy` · `Sound`. Goldman is the default. Sound starts off. On phones they become two small icons (translation and sound). Remove the per-verse Goldman / Debroy / Present tabs.
- At 1.1.2 to 4, where Debroy's English is missing, Debroy stays selectable and the English shows Goldman with the note in §9.4.
- **Two settings in one place in `src/content.js`:** `AUDIO_ENABLED = true` (false hides the Sound control and the credit and loads no audio) and `AUDIO_SYNC = true` (false keeps verse-window playback but turns off the highlight following the audio). Note in `REVIEW.md` that switching audio off for good also means deleting the mp3 from the repo.
- **Play rule (verse windows):** a verse's audio starts when that verse is on stage and scrolling has stopped for about 0.5 s. It always starts at the verse's first window. It plays the verse's windows in order, vulgate windows included, and stops at the end of the verse. Scrolling within the same verse never restarts it. Moving to another verse fades the current audio out over about 0.3 s, and the new verse waits for its own 0.5 s pause. Scrolling back up behaves the same way: the earlier verse plays from its start once the visitor settles. If the audio ends before the highlight, it stays silent.
- **Sync (when `AUDIO_SYNC` is true):** while the audio plays and the visitor is not scrolling, the gold highlight advances with the audio, word by word. Word times within each half-line window are spread by syllable count (count the vowels in each IAST word). The page's scroll position follows silently, so the next scroll continues from the lit word. When the visitor scrolls during playback, the scroll takes over the highlight and the audio carries on until they leave the verse.
- Credit (§9.4) beside the Sound control when sound is on, and in Sources & method.

## 7. The matrix

One composed fold. Title and caption: §9.3.

- **Rows:** the 16 qualities, grouped by colour group (each row with its dot colour, IAST and Devanāgarī). **Columns:** Nārada's verses 1.1.8 to 1.1.19.
- **Cells:** a mark where that verse answers that quality, from `answer-map.json`. `exact` a filled gold dot, `clear` a ring, `partial` a half dot, `turned` the half dot with a turn mark. The three `none` rows stay empty and must still read as rows, so the silence shows.
- Hover or tap a mark: the answering word (IAST and Devanāgarī) and the verse number.
- Key under it: §9.3. Review line under the key: §9.3.
- Design it as a composition, not a table: generous spacing, hairline guides, gold on near-black, legible on a 360px phone (the columns may compress to verse numbers only).

## 8. The other tabs

- **Questions:** the same pinned stage, filtered to 1.1.2 to 4, ending on one fold: the three question verses together at the centre, every quality word lit in its colour, the English under each verse, and tapping a quality shows its IAST, Devanāgarī and English. One line above it: §9.5.
- **Answers:** the same stage filtered to 1.1.8 to 1.1.19, ending on the matrix.
- **Patterns:** the matrix with **lenses**. A row of lens buttons: `Same word`, `Other words`, `In part`, `Turned`, `Not answered here`, `Two senses`, `Where description becomes story`. Choosing one lights only its cells (the `Two senses` lens lights Q4's lens answers at 1.1.9 and 1.1.14, and `Where description becomes story` lights the 1.1.19 column) and shows its note (§9.3) beside the matrix.
- **Sources & method:** add the two editorial cards from the old Patterns (edition divergence, translation provenance) as they are, the audio credit, and the count line (§9.4).
- Remove the old pattern cards `divide`, `verbatim`, `inverted`, `adjacency` and `story` from the code. Their place is taken by the §9 copy.

## 9. Copy (fixed, line breaks as given)

### 9.1 The second fold

```
Before it tells a story,
the Rāmāyaṇa asks a question.
```

```
The poet Vālmīki asks the sage Nārada
whether anyone alive today
holds sixteen qualities, and names them.
```

```
Nārada knows of one man.
He names him, Rāma,
and the story grows out of his answer.
```

### 9.2 The board

```
Each quality appears as Vālmīki asks for it,
and takes its colour when Nārada’s answer reaches it.
```

### 9.3 The matrix, notes and lenses

Matrix title:
```
What Vālmīki asked, and where Nārada answers
```

Matrix caption:
```
Rows are the qualities Vālmīki asks about,
columns the verses of Nārada’s answer.
A dot marks where a verse answers a quality.
```

Matrix key: `Same word` · `Other words` · `In part` · `Turned` · `Not answered here`

Review line:
```
This mapping is still being checked against the printed text.
```

Note after 1.1.4:
```
Vālmīki asks in three verses.
Nārada answers in twelve, from 1.1.8 to 1.1.19.
```

Note after 1.1.17, and the `Turned` lens:
```
Vālmīki asks who has conquered anger.
Here Nārada gives Rāma anger like the fire at the end of time,
and in the same line, the patience of the earth.
```

Note after 1.1.19, and the `Where description becomes story` lens:
```
The portrait runs straight into the story.
The Rāma Nārada has been describing is the son
the king now wishes to make his heir.
```

Note before the matrix, and the `Not answered here` lens:
```
Three qualities get no answer in these verses:
kṛtajña, samartha and anasūyaka.
Nārada has already said, at 1.1.7, that Rāma has every quality named,
so these three are covered by that claim but never named one by one.
```

`Same word` lens:
```
Three times Nārada answers with Vālmīki’s own word:
dyutimān at 1.1.8, dharmajña at 1.1.12,
and priyadarśana at 1.1.15 and again at 1.1.17.
```

`Other words` lens:
```
Six qualities are answered in Nārada’s own terms.
Vālmīki asks for someone truthful in speech,
and Nārada says Rāma keeps his word.
```

`In part` lens:
```
Four answers overlap with the question without matching it.
Asked for good conduct, Nārada offers pure, good and noble,
spread across 1.1.12 to 1.1.15.
```

`Two senses` lens:
```
Translators read kṛtajña two ways:
grateful, or knowing what is to be done.
Read the second way, nītimān (1.1.9) and vicakṣaṇa (1.1.14)
come close to an answer. Read the first way, nothing does.
```

### 9.4 Small copy

Vulgate line label:
```
Heard in the recitation, not in the Critical Edition text
```

Debroy note at 1.1.2 to 4:
```
Debroy’s English for this verse isn’t on the site yet. Goldman’s is shown.
```

Audio credit (link "Internet Archive" to `https://archive.org/details/Valmiki-Ramayana-Sanskrit-Samhita/VR-Balkanda-01.mp3` and the licence to its Creative Commons page):
```
Recitation by Vishwas Bhide (2018), from the Internet Archive · CC BY-NC-ND 4.0
```

Count line, Sources & method:
```
Sixteen is the count tradition gives. Some readers divide the questions
differently, for instance by taking guṇavān as a heading for the rest.
```

### 9.5 Questions closing fold

```
Sixteen qualities, asked in three verses.
```

## 10. Checks before you close

- Every copy block at 360, 768 and 1440px: no lone last word, breaks as given.
- No vertical translation anywhere on the stage (inspect the transforms). Reverse scroll restores each state.
- Audio: each verse starts at its first window. Leaving fades out. Scrolling back replays from the start. Vulgate label shows only during vulgate windows. Both settings switch off cleanly.
- Board: 13 slots light, 3 stay unlit, jitakrodha shows its turn mark.
- Reduced motion, keyboard access to the controls and lenses, Lighthouse mobile (note the numbers).
- Build passes, GitHub Pages deploy succeeds, and the live site is checked, not only `vite preview`.
- `REVIEW.md` §8 lists: judgement calls, every `[copy needed]`, the checks with numbers, and what Anupriy should look at first.
