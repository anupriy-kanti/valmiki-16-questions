# REVIEW · for Anupriy

Written by the build session, 5 Nov 2026. Read this before the site goes public.

## 0. One step left: switch on GitHub Pages

**Done (mytwiki-C21, 5 Nov 2026):** Pages is switched on with GitHub Actions as its source, and the site is live at https://anupriy-kanti.github.io/valmiki-16-questions/ . The steps below are kept for the record.

The build passes in Actions, but the deploy stops at `configure-pages` with "Create Pages site failed. Resource not accessible by integration". The workflow token cannot create a Pages site, and this session had no working `gh` login.

Do this once:

1. Open **github.com/anupriy-kanti/valmiki-16-questions → Settings → Pages**.
2. Under **Build and deployment → Source**, pick **GitHub Actions**.
3. Open **Actions → Deploy to GitHub Pages → Run workflow** (or push any commit).

The site then goes live at https://anupriy-kanti.github.io/valmiki-16-questions/

## 1. Data problems found and fixed

- **Devanāgarī: resolved (mytwiki-C21, 5 Nov 2026).** The extraction script had cut one character from every line. The data file is now re-extracted from the bombay.indology.info file and the repair step is gone. The rebuilt output is identical to the repaired lines, all 38 of them.
- **CE 1.1.14 reads `sarvaśāstrārthatattvajña smṛtimān`** (no visarga) in the data file. The artefact's GP text has `…tattvajñaḥ`. Kept as the data file has it. Check against GRETIL.
- **CE 1.1.20 `dev`** holds three lines (it starts with GP 21b *tasyābhiṣeka…*), the IAST holds two. The site stops at 1.1.19, so this does not show. Fix the data file if you reuse it.
- **CE 1.1.15 reads *sadaikapriyadarśanaḥ*,** the GP reads *sadaiva priyadarśanaḥ*. The echo pill keeps the artefact's word *priyadarśana*. No new claim added.

## 2. Judgement calls

1. **Goldman [16–24] paragraph cut** after "…and was gifted with other excellent virtues." (the end of the CE 1.1.19 sentence). It is labelled "Goldman, 1.1.16–19 (paragraph 1.1.16–24, cut at 1.1.19)". The JSON note says this paragraph is not proof-read against print.
2. **Goldman paragraphs** are placed at the head of 1.1.1, 1.1.6, 1.1.12 and 1.1.16. The page range is one cite for all four ("Goldman 2021, pp. 51–52"). Split per page if you want.
3. **CE 1.1.13 tags** = union of GP 13 [Q8, Q3] and GP 14 [Q9, Q10, Q3] → **Q8, Q3, Q9, Q10**. Q3 on GP 14 may have rested on GP 14a (*rakṣitā svasya dharmasya*, not in the CE). Q3 stays, because CE 1.1.13a still has *dharmasya parirakṣitā*. Please confirm.
4. **CE 1.1.19 tags**: Q1 kept (*śreṣṭhaguṇair yuktaṃ*). **Q8 dropped** (rested only on GP 20b). **Q5 dropped** (no basis in either half, per the brief).
5. **English for split verses kept whole.** Gita Press English for GP 13 and GP 14 is joined under CE 1.1.13 (it includes the English of GP 13a and 14a). GP 20 English sits under CE 1.1.19, labelled "Gita Press 20, including 20b". Debroy GP 13 + GP 14 strings are joined under CE 1.1.13 (per the concordance). Debroy's GP 14 string ends "He knows the truth about all the sacred texts", which may belong to CE 1.1.14. Check against print.
6. **GP 21a** has no English in the artefact, so CE 1.1.19 has only GP 20 English.
7. **Pattern "How the questions and answer divide up" recounted for the CE**: "twelve verses of description (1.1.8–19, thirteen verses in the Gita Press numbering)". The artefact said thirteen ślokas (V.8–20). The "32 lines" sentence is kept but its last clause ("measured in verses, the answer is thirteen ślokas long") is cut. Consider cutting the "32 lines" sentence, as it reads like a changelog.
8. **Patterns "Edition divergence"**: the V.13 "Debroy compression" claim removed and replaced with the brief's neutral wording. The 1.1.17 note keeps "a translator's prose compression, not a textual absence in the CE", but the "[High confidence… Bhatt 1960 apparatus unseen]" tail and the "Goldman as proxy" wording are cut.
9. **Patterns "On translation provenance"**: kept the first paragraph only. The second ("Goldman stands as a faithful proxy…") is cut per the brief. Note it still says "Goldman (Princeton, 1984–2016)", while the site cites the 2021 complete edition.
10. **Patterns "Note on the text"** removed from Patterns. Its GP Devanāgarī sentence moved to Sources (GP entry) and now applies only to the GP-reading boxes.
11. **About text (landing)**: the artefact's About text, with "Rāmāyaṇa", "three English translations" (was two), "1.1.8 means…" (was "V.8 means verse 8"), and the four-tabs list replaced by one sentence about the menu.
12. **Phase labels**: "Closing Anchor" and "Narrative Begins" merged into "Closing Anchor and Narrative Begins", as both now fall in CE 1.1.19.
13. **Inline pattern placement** in All: "divide up" after 1.1.4, "adjacency" after 1.1.14, "inverted" after 1.1.17, "story" after 1.1.19. "Verbatim", "divergence" and "provenance" appear only on Patterns (the divergence note already shows inside 1.1.17).
14. **Question cards** sit after 1.1.5 (after the frame verse) in All and Questions.
15. **Translation toggle**: multi-select, all three on. Not remembered between pages.
16. **Hero** extracted to `public/hero.jpg` (1024×572, 174 kB) with the artefact's alt text.
17. **Publisher links** go to the publishers' home pages (press.princeton.edu, penguin.co.in), not book pages. I could not verify the book-page URLs.
18. **Pushed straight to `main`** as the task asked. The branch `claude/pensive-edison-9cbbvb` mirrors `main`.

## 3. Interpretive notes kept (renumbered GP → CE). Please re-read each

Question alerts:
- Q4 kṛtajña: "No verbatim answer in EITHER edition. Nearest is smṛtimān … at 1.1.14 — a semantic neighbour, not an answer."
- Q6: "Nearest answer: the Himalaya-firmness simile at 1.1.16."
- Q11: "Most expanded … AND echoed verbatim twice — 1.1.15 and 1.1.17."
- Q13: "The word krodha returns at 1.1.17 — but inverted …"
- Q15: "Answered through equanimity — adīnātmā (1.1.14), sarvasama (1.1.15)."
- Q16: "Answered only in the fire-of-dissolution simile at 1.1.17."
- Question-verse notes on 1.1.2 (opening pair frames everything) and 1.1.4 (Q16 alone, the only question with a condition).

Verse notes:
- 1.1.7 Debroy's "I have heard about him", reported knowledge.
- 1.1.8 name and lineage first, dyutimān verbatim from 1.1.4.
- 1.1.11 1.1.9–11 physical portrait, three ślokas for Q11.
- 1.1.12 dharmajñaḥ verbatim, "the cleanest single-word answer".
- 1.1.14 smṛtimān as adjacency to kṛtajña.
- 1.1.15 first simile, shift to cosmic comparisons, priyadarśana first appearance.
- 1.1.16 Himalaya-firmness nearest to Q6.
- 1.1.17 divergence note (see 2.8).
- 1.1.18 tyāga not among the sixteen, describing words carry into 1.1.19.
- 1.1.19 seam between description and story, *aicchat* governs the portrait (artefact GP 20 note and GP 21 pivot note merged into one).

Pattern cards: divide up, verbatim echoes, inverted echo, adjacency (the kṛtajña gap), where the description becomes the story, edition divergence, translation provenance.

Echo layer and the nine themes with their descriptions: unchanged from the artefact.

## 4. Placeholders

- **Gita Press page numbers**: `[p. ?]` in the cite label and on Sources.
- **Debroy page numbers**: `[p. ?]` in the cite label.
- **About**: no portrait and no longer bio yet. Add both to `src/About.jsx`.
- **Goldman per-block page numbers**: one range for all blocks.
- **GP 13a, 14a, 20b in the CE apparatus or appendix**: unchecked, so the site says only "not in the constituted text".

## 5. Not done, and deviations from the polish and motion requests

Done and logged in `CHANGELOG.md` (v1.1 and v1.2). What is left, or done differently from the request:

- **Spotlight dimming is by colour, not opacity.** The request said opacity around 0.45. At 0.45 body text falls to 2.7:1 and muted text to 1.95:1, so WCAG AA cannot be met that way. Dimmed verses now use #5c4f42 text (7.3:1), no card fill and a dashed border.
- **No animated thread from question card to answer words.** On All the card and the answering verses are far apart, and Answers shows no cards, so a drawn line would cross much of the page. For a projected talk this seemed gimmicky. The echo words glow instead (gold, 1.6s) when a question is selected. Say if you still want the thread.
- **Tooltips show verse-level English, not word-level.** No data aligns English words to Sanskrit words, and picking them would be a new interpretive claim. The tooltip shows the question, the echo type, and the verse's Debroy and Gita Press English side by side.
- **Devanāgarī echo marks** cover whole akṣara clusters (1.1.17 marks त्प्रियदर्शनः, one extra consonant from the sandhi). At 1.1.8 (द्युतिमान्धृ…) and 1.1.14 (स्मृतिमान्प्र…) only the IAST is marked, because a mark would break a conjunct.
- **Route change is a fade-in (200ms), not a true cross-fade.** The old page is not kept on screen while the new one fades in. A true cross-fade needs the View Transitions API with a React Router data router, which is a larger change.
- **Progress rail** shows from 1024px up only. Below that there is no room beside the text.
- **Present mode** shows Sanskrit, tags, Gita Press-only lines and the Debroy and Gita Press English. It does not show Goldman's paragraphs, which are too long for one screen, or the notes and pattern cards. It needs a test on the projector and clicker you will use. Most clickers send PageDown/PageUp or arrow keys, which work.
- **Lighthouse** was run locally on `vite preview`, not on the live site: mobile performance 97, desktop 99–100, accessibility 100 (All and Answers). Patterns, Sources and About were not audited separately. Run it on the live URL once.
- **The hero preload** is in `index.html`, so pages other than All also fetch the hero (54 kB on phones). Small cost, kept for the landing page's speed.
- **Fonts swap in.** Text first shows in fallback fonts, then switches to EB Garamond, Tiro and DM Sans.
- **Not done:** dark mode, self-hosted fonts. Node 20 deprecation warnings in Actions are harmless for now.

## 6. Milestone 02 (c.v16q-02, 5 Nov 2026)

### To check

- **Goldman verse split (item 5).** Check the 19 pieces in `data/goldman-aligned-draft.json` against print pp. 51–52. Each piece is verbatim and the build confirms they join back into Goldman's paragraphs, but where each verse starts and ends is MYT's reading. Once checked, remove the draft note at the top of Sources & method (`src/Sources.jsx`) and the word "draft" from the key (`src/Reading.jsx`, Legend).
- **Hero crop on phones (item 1).** The brief says "centred". On a portrait phone the centred crop of the wide image shows the vīṇā and hands but neither sage in full. Say if you want the crop shifted (for example towards the sage with the vīṇā).
- **Hero image resolution.** The largest hero file is 1024px wide. Filling a 1440px screen with `cover` stretches it to about 1600px, so it looks a little soft on large monitors and projectors. A 2000px source would fix this. `og.jpg` (1200×630) is also made from the 1024px image.
- **Byline fades out** on the way to the second fold, as the milestone says. Say if you would rather it stays with the title.
- **Sanskrit label (item 4)** reads "Sanskrit · Critical Edition (GRETIL)" and links to GRETIL, as asked. The Devanāgarī comes from John Smith's file, not GRETIL. The new Sources paragraph says so, but the label alone credits GRETIL for both scripts. Consider "Sanskrit · Critical Edition" with the link kept.

### Your mid-session rulings (these replace parts of `MILESTONE-02.md` §1)

1. The first fold fades to **black**, not the page colour. A band below the hero takes black to paper, and it stays dark while the title arrives, so the light colour comes only on further scroll.
2. Nav tabs and metadata sit on the dark: light tab text over the image, and the "Rāmāyaṇa · Bālakāṇḍa · Sarga 1" label moved from the top of the introduction into the dark band (milestone §2 put it at the top of the second fold).
3. Desktop tabs spread out. The current tab has a gold underline, not a pill (on every page and width, not only desktop).
4. A lighter overlay behind the title, with a text shadow.
5. Link previews use a new `og.jpg` with the title set over the image. The page that rendered it is not in the repo. If the title changes, the image must be made again.

### Judgement calls

- **Introduction (item 2).** The milestone names the two paragraphs. The third, small note (CE numbering, IAST, the three translations, how to use the menu) is kept after a small divider, because nothing else on the page explains "1.1.8" now that the key is tucked away.
- **Old hero lines.** "Beginning of the Bālakāṇḍa" and the old byline under the hero are gone. The new subtitle and the byline in the hero replace them.
- **Hero motion.** The image keeps a slow drift and a zoom of up to 6% while scrolling (it was up to about 17%). Off under reduced motion.
- **Nav states on All.** Transparent over the image, a dark scrim once the reader scrolls (so the tabs stay readable over the picture), paper and solid after the dark band.
- **Key (item 3).** The tab shows on All, Questions, Answers and Patterns, not on Sources or About. "Closed on load" is read as the default: a reader who left it open sees it open on the next visit, as "remember open or closed" requires. On All the tab and panel wait until the reader leaves the hero. At 1024–1279px the panel overlaps the right edge of the column (there is no room beside it). On phones the vertical tab covers about 8px of the text edge at mid-screen. The key no longer prints (it used to print on All).
- **Progress rail.** It now has a paper backing so it reads over the dark band, and waits until the reader leaves the hero.
- **Goldman (item 5).** The 1.1.16–24 disclosure shows the paragraph only to the end of 1.1.19, with a line saying it continues. The data file holds that paragraph only part way into 1.1.20 (and not proof-read), so "the whole paragraph" is not available. The Goldman piece comes first of the three translations, matching the toggle order. In Present mode the three translations sit in three columns from 1280px, two below that.
- **REVIEW §5 is partly out of date:** Present mode now shows Goldman (the piece for each verse).

### Checks (local `vite preview` only; the live site was not checked from this session)

- All six routes, deep links `#/answers?v=1.1.14` and `#/questions?v=1.1.3&q=Q4` (verse scrolled to and ringed), and Present mode (arrows, Escape returns to the last verse) work at 375px and 1440px, with and without reduced motion. No sideways scroll and no console errors on any route.
- Lighthouse 12.2.1, accessibility: 100 on all six routes (mobile). Patterns was 98 (pattern titles h3 under h1, from before this milestone), fixed.
- Lighthouse mobile performance: All 92–96 (one first run after a rebuild gave 86), Answers 95–97. LCP 2.1–2.4 s, CLS 0. Desktop: All and Answers 100 performance, 100 accessibility.

## 7. Milestone 03 (c.v16q-03, 5 Nov 2026)

### Judgement calls

- **Item 1 · small text.** DM Sans is dropped, so every small note that used it (verse notes, cite links, tooltips, the key) is now EB Garamond, not Cinzel. Cinzel is kept for titles, eyebrows, labels, badges and the nav, as the brief lists. Spaced Cinzel capitals for whole notes would be hard to read.
- **Item 1 · dimmed verses** (spotlight on Answers) use #8d7f71 text on the dark page (4.6:1, AA).
- **Item 2 · title over the image.** At screens narrower than about 1.4:1 (for example 1024×768) the image is limited by width, and the title band in the top fifth sits over Nārada's topknot and halo. A soft dark pool behind the band keeps it legible. Say if you would rather the band sits above the image at those sizes (the first screen would then not show the whole image).
- **Item 2 · link preview.** `public/og.jpg` is still made from the old hero image. It needs remaking from the new one (the page that rendered it is not in the repo).
- **Item 3 · shell widths.** The pager and the bottom line show from 768px (the brief gives no width). On phones there is no margin for them, and the pager would cover the text edge. The vertical byline shows on every page, not only All.
- **Item 4 · the third intro note** (CE numbering, IAST, three translations, how to use the menu) is kept as one small centred paragraph after the frames, before 1.1.1. Nothing else on All explains "1.1.8".
- **Item 4 · sentence split.** The two paragraphs make seven sentences, so seven frames. Phones use a 7px step between frames, wider screens 12px.
- **Item 5 · word-by-word Devanāgarī.** Transliterating each GRETIL word on its own gives word-final forms where the e-text joins words by sandhi: कश् च, न्व् अस्मिन्, वाल्मीकिर् मुनिपुंगवम्, ऽनसूयकः. This is what lines each word up with its IAST, as the brief asks, but it reads differently from a printed Devanāgarī line. Please look at a few stages.
- **Item 5 · Debroy and Gita Press at 1.1.2–4.** The site's data has no Debroy or Gita Press English for the three question verses (the artefact showed question cards there). When either is chosen, those stages show Goldman with the line "This site has no separate Debroy English for 1.1.2–4, so Goldman is shown."
- **Item 5 · pin length.** 1.4 screens of scroll per verse from 768px, 1 screen on phones. Words light over the first two thirds, then the translation (at 72%), then the citation (at 80%). The whole All story is long: about 45 screens on a desktop. Shorten `--run` in `src/index.css` if it feels slow.
- **Item 5 · what left All.** The verse cards, the inline pattern cards, the question cards, the progress rail and the key now live only on Questions, Answers and Patterns. The verse notes (the artefact's interpretive notes) are not on the stages. They stay on the reference tabs.
- **Item 5 · echo pills** sit at the top right of the lit word as a small round button (↺, ⇄, ≈). The tooltip opens on tap or hover, and closes on scroll, as before.
- **Item 6 · slot shape.** Each slot shows the Q number on the first line and the IAST word on the second ("Q4" over "kṛtajña"), not "Q4 · kṛtajña" on one line. In a two-column panel the one-line form wrapped unevenly. The "·" is kept for screen readers.
- **Item 6 · echoes on the board** show only on answered questions, as the brief says. So Q4's adjacency echo (≈ smṛtimān, 1.1.14) does not show on its grey slot. Say if you want it shown.
- **Item 6 · when the board appears.** It shows from the moment 1.1.2's stage is current, before its first word lights. The strip on phones moves the stage content down by about 20px.
- **Item 7 · portrait.** `public/author.jpg` arrived from mytwiki-C21 mid-session, so the AK monogram placeholder was not needed.
- **Item 7 · the bio says "His".** It is verbatim from the Mahābhārata site, as briefed. Check it is the wording you want here.
- **Item 7 · About.** The old one-line bio ("UX strategist and content designer, and founder of Mythematical…") is replaced by the author block. The Mythematical line and the links stay under a "Mythematical" heading. The SAI27 section became the author block's "Part of" line, so it is not repeated.
- **Item 7 · "the board expands into a 4 × 4 grid"** is done as a hand-over, not a morph: the board fades out as the overview's grid fades in. A true shared-element morph would need much more code for little gain.
- **Item 7 · grid on phones** is 2 columns. 4 × 4 does not fit at 375px.
- **Item 2b · supersedes the item 2 note** about the title over Nārada's topknot: the title now arrives on the overlay, centred.
- **Item 2b · caption width.** The brief asks for two set lines and a maximum of about 40ch. The second line is 64 characters, so at 40ch it breaks into two by itself and the caption becomes three lines on every screen. The caption block is 66ch wide instead: two lines on tablets and desktops, and on phones each line is balanced on its own (four short lines at 375px).
- **Item 2b · contrast** of the title block is set by the 60% overlay plus a text shadow over a busy image. Lighthouse cannot measure text over an image, so this was checked by eye only. Raise the overlay (`--ov`, 0.6, in `src/Hero.jsx`) if it reads weakly on the projector.
- **Item 8 · where Present lives.** The button sits at the foot of each verse stage, beside the translation switch, not in the hero or nav. Present starts at the verse on stage, so scroll to 1.1.1 first for a full talk. Test with your clicker: most send PageDown or the arrow keys, which step one word. A whole verse per click needs Shift, which clickers do not send.
- **Board colour (your ruling).** I read "the yellow colour fill" as the answered slots on the question board, and made them near-black with gold text, edge and glow. If you meant another fill (for example the amber Excellence cells on Patterns), say so.

### Checks (local `vite preview` only; the live site was not checked from this session)

- Lighthouse 12.2.1, accessibility 100 on all six routes (mobile), and on All and Answers (desktop).
- Mobile performance: All 98–99 (LCP 1.9–2.0 s, CLS 0.001), Answers 98, Patterns 98, Sources 99, About 97. **Questions 82–93 over three runs** (LCP 3.2–4.8 s): its largest paint is text that waits for the web fonts, and the hero preload in `index.html` competes with the fonts on every route. Moving the hero preload into the All route only, or self-hosting the fonts, would fix it.
- Desktop performance: All 100, Answers 100.
- All routes and the deep links at 375, 1024, 1440 and 1920px, with and without reduced motion: no sideways scroll, no console errors. Present mode stepping checked by script (word, Shift+verse, click, Escape).
- **Unlit words** (#5a5048 on #1a1410, 2.3:1) are below AA by design. They are hidden from screen readers, and each verse is in the page in full as screen-reader text, so Lighthouse does not flag them. Sighted readers with low vision see them only as the not-yet-lit state, and every word is gold once lit.
- **Deviation from MILESTONE-03 §5 (your ruling, via mytwiki-C21):** the story's translation switch is "Goldman · Debroy", not "Goldman · Debroy · Gita Press". §3's bottom line drops "and the Gita Press" to match.
- **Addition to MILESTONE-03 §10 (phones), your ruling via mytwiki-C21:** half-verses wrap as balanced blocks. One limit: at 375px a very long compound can still stand alone on a row, because it is too wide to share one (1.1.1 तपःस्वाध्यायनिरतं, 1.1.14 सर्वशास्त्रार्थतत्त्वज्ञ).

### Status and what you must decide

All ten items are built and pushed (plus §2b and your mid-session rulings). Nothing is left undone. To decide or check:

1. **Word-by-word Devanāgarī** on the stages (कश् च, न्व् अस्मिन्): acceptable as a reading aid, or do you want the e-text joins back (which breaks the word alignment)?
2. **Story length**: about 45 screens on desktop. Keep 1.4 screens per verse, or shorten?
3. **Link preview** `og.jpg` still shows the old hero. It needs remaking.
4. **Board fill**: is the near-black, gold-edged answered slot the change you meant?
5. **Bio wording** ("His…") and the portrait on All and About.
6. **Present mode on your clicker**: one word per click. Is that the pace you want for the talk?
7. **Questions tab mobile performance** (82–93): move the hero preload to All only?
8. **Messages to mytwiki-C21 not delivered.** This cloud session may not message a session on your computer without your approval, and I did not ask for that access. Everything it needs is in this file and in `CHANGELOG.md`.

## 8. Milestone 04 (c.v16q-04, 11 Nov 2026)

Built from `MILESTONE-04.md` and your six answers in chat (branch, hero and author, `In part`, short IAST forms, phone strip, key circle, the three pieces of small copy). There is no `[copy needed]` placeholder on the site.

### Look at these first

1. **Phones, verses with a note (1.1.4, 1.1.17, 1.1.19).** Under a centred verse a phone has no room for the English and the note together. Below 768px the note takes the place of the English, in the same spot, and scrolling back returns the English. This departs from "the English stays for the whole verse" on phones only. Say if you prefer the note on its own beat after the verse.
2. **Small phones, 1.1.13 and 1.1.19.** These verses also keep room for the vulgate line. At 360 × 640 the block under the verse is scaled to 89% (1.1.13) and 68% (1.1.19) to fit. The 1.1.19 text is small there. Taller phones give it more room.
3. **Sound with sync.** When the voice starts, the highlight goes back to the first word of the verse and then follows the voice. If you had scrolled to the end of the verse, the lit words and the note go away for the length of the recitation. This follows §6 ("always starts at the verse's first window"). Listen to 1.1.12 and 1.1.13, and say if the jump back is acceptable.
4. **The matrix on a phone**, and the Patterns lenses.
5. **The board** at 1280px and wider, at 1.1.8, 1.1.12 and 1.1.17.

### Judgement calls

- **Stage.** The stage is `position: sticky` inside one tall track. It holds its place while the page scrolls under it. The last beat ends where the page ends, so the stage never scrolls away.
- **Beat lengths.** Hero 1 screen, each fold sentence 0.7, the scatter 1.5, a verse 1.4 (1 on phones, plus 0.35 where it has a note), the "Not answered here" note 0.7, the matrix 1, the author 0.8, the last beat 0.5. Conversation is about 38 screens on a desktop. The numbers are in `beatsFor` in `src/Stage.jsx`.
- **Swaps are timed, not scrubbed.** A beat changes at a scroll threshold and fades over about 0.5 s. Only the hero overlay and title follow the scroll continuously, as before.
- **Verse reference.** "Vālmīki Rāmāyaṇa 1.1.8 · Critical Edition" moved from under the English to a small line under the eyebrow, above the verse. It is always shown, so the verse number is on screen while the notes name verses.
- **Vulgate lines.** 1.1.13 and 1.1.19 keep an empty space under the verse for the vulgate line, so the English does not move when the line appears. The old "Gita Press adds" line on those stages is removed, because the vulgate line replaces it.
- **Author.** The Author is two beats: name, portrait and bio, then "Part of", the copy-link button and the footer. One beat did not fit a phone.
- **Footer.** Questions and Answers have no footer, because they must end on their fold. The rights line is on Conversation, Patterns, Sources & method and About.
- **Scatter.** Sixteen fixed positions in a 4 × 4 grid (3 columns on phones), in a fixed order that is not Q1 to Q16.
- **Board.** `turned` uses the same brightness as `partial`, plus the turn mark. On Answers all sixteen slots are present from the start, because the question verses are not in that view. On Questions no slot takes colour. Two slots (sarvabhūteṣu hitaḥ, bibhyati devāḥ) wrap their Devanāgarī to a second line. From 768 to 1279px the strip is used, as on phones.
- **Controls.** On phones the translation icon shows the letter of the current translation (G or D) and opens a two-item menu. The sound icon's accessible name gives the state ("Sound on" or "Sound off"), as you set.
- **Matrix marks.** A cell with two answering words (for example niyatātmā and vaśī at 1.1.8) has one mark, and its detail shows both words on two lines.
- **`Not answered here` and `Where description becomes story` lenses** light row names and the 1.1.19 column, not cells, because they have no marks to light. Column 1.1.19 holds no mark in the data.
- **Pager.** The right-edge dots stay. The matrix keeps the old label "Overview", because the brief gives no new label. The bottom line now shows from 1280px, so it does not run under the controls.
- **Tabs.** Moving between Conversation, Questions and Answers now opens the new view at its start. The old "open at the same verse" behaviour is removed with the old views.
- **Hero cue.** The chevron no longer bobs up and down. It pulses in place.
- **Accessible names without visible copy.** The lens row is named "Lenses", the phone strip "16 Qualities", the scatter "The sixteen qualities", and each view has a hidden "Full text" section with every verse and note in order, for screen readers and for print.
- **Sources & method.** The audio credit is the last item in the list of Sanskrit sources, so it needed no new heading. The count line opens "How the mapping was made". The two editorial cards close the page.
- **Data kept but not shown.** `src/content.js` still holds the Gita Press English, the artefact's verse notes and the question alerts. Nothing on the site reads them now. Say if you want them deleted.
- **Audio off for good.** `AUDIO_ENABLED = false` hides the control and the credit and loads no audio, but the build still copies the mp3. To remove the recording, also delete `assets-src/audio/vr-1-1-1-to-19-bhide.mp3`, remove the `copyAudio` step from `vite.config.js`, and remove the credit from Sources & method.

### Old copy that no longer matches the site (your words needed)

The copy is fixed, so these lines are unchanged. They describe things milestone 04 removed.

- Sources & method, "How the mapping was made": the bullets on question tags, echo pills (verbatim, inverted, adjacency) and "made first on the Gita Press text". The board and matrix now read Scaffold A.
- Sources & method, Sanskrit paragraph: "The reference views show the Devanāgarī e-text as published" and "The Gita Press (vulgate) translation appears in the reference views". There are no reference views.
- Editorial card "Edition divergence": "They are shown in muted 'Gita Press reading' boxes at 1.1.13 and 1.1.19". They now show as the vulgate line while heard.
- `index.html` description and link preview: "with three English translations". The site shows two.
- Still open from §7: the link preview image `og.jpg` uses the old hero.

### Checks

Local checks ran on `vite preview` with Playwright (Chromium), by script. The live-site results are at the end of this section.

- **Copy blocks at 360, 768 and 1440px.** No block ends on a lone word (0 found, all beats of the three stage views, the seven lenses, Sources & method and About). The given line breaks hold at 768 and 1440px for every block. At 360px the longer lines wrap, balanced.
- **No vertical translation.** Every element on the stage was read at each scroll step (every 0.2 screen, three widths): 0 elements with a vertical `transform` or `translate`. The visible verse text is 0px from the centre of the screen at all 19 verses and all three widths.
- **Reverse scroll.** Scrolling back up gave the same state at every step (beat, lit words, English, note, scatter, board): 0 differences.
- **Audio** (Chromium, autoplay allowed): 1.1.12 starts at 149.75 s about 0.5 s after scrolling stops. A scroll inside the verse does not restart it, and the sync stops moving the page. Leaving fades to silence in 0.3 s. 1.1.13 starts at 163.15 s. The vulgate line shows in both vulgate windows and not in the window between them. Going back to 1.1.12 plays it from its start. At the end of the verse the audio stops and stays silent. With `AUDIO_ENABLED = false`: no Sound control, no credit, 0 requests for the mp3. With `AUDIO_SYNC = false`: the audio plays and the page does not move. The built mp3 is byte-identical to `assets-src/audio/` (`cmp`).
- **Board.** At the end of 1.1.19: 16 slots, 13 lit, 3 unlit (kṛtajña, samartha, anasūyaka), the turn mark on jitakrodha only.
- **Matrix.** 23 marks: 4 `exact`, 11 `clear`, 7 `partial`, 1 `turned`. `Two senses` lights 2 (1.1.9 and 1.1.14).
- **Reduced motion.** No motes, no lamp animation, all transitions 0 s, the swap is complete 60 ms after a scroll.
- **Keyboard.** Tab reaches the menu, the pager, the hero cue, the source link, Goldman, Debroy and Sound, with a focus ring. Enter and Space work on the controls, the lenses, the matrix marks and the quality words on the Questions fold. Beats that are not on stage are out of the tab order.
- **Lighthouse 12, mobile, local.** Performance / accessibility: Conversation 98 / 98, Questions 98 / 100, Answers 99 / 100, Patterns 99 / 96, Sources & method 98 / 100, About 98 / 100. LCP 2.1 to 2.3 s. The Conversation 98 was a heading-order fault, corrected after the run. Patterns 96 is `target-size`: twelve columns cannot each be 24px wide on a 360px phone, so the marks are about 17 × 26px there.
- **Not tested:** Safari and iOS (audio start after the Sound tap, `text-wrap: balance` needs Safari 17.5), real phones, a screen reader. Chromium only.

### Live site (https://anupriy-kanti.github.io/valmiki-16-questions/)

The container could not reach the Pages host at first (the network proxy refused it). You approved a personal cloud environment named `valmiki-16-questions` that allows `anupriy-kanti.github.io`, and the checks below then ran on the live site.

- **Deploys.** Runs 55 (`3945064`) and 56 (`c991855`) of "Deploy to GitHub Pages" succeeded. The live page serves the same bundle as the local build. The live mp3 is byte-identical to `assets-src/audio/vr-1-1-1-to-19-bhide.mp3` (`cmp`).
- **Scroll check, live, 360, 768 and 1440px** (run 55): 0 lone last words, 0 vertical transforms, 0 reverse-scroll differences, 0 console errors, visible verse text 0px from the centre. Board at the end of 1.1.19: 16 slots, 13 lit, 3 unlit, the turn mark on jitakrodha.
- **Audio, live.** Same results as local. The first live run showed one error: during the fade-out a volume value of 1.005 was refused by the browser, which could leave the old verse playing. The value is now clamped (`c991855`). The re-run on run 56 shows the audio paused 0.5 s after leaving the verse and 0 errors.
- **Reduced motion, keyboard, lenses, Questions fold, live:** same results as local.
- **Lighthouse 12, mobile, live.** Performance / accessibility: Conversation 97 / 100, Questions 98 / 100, Answers 97 / 100, Patterns 98 / 96 (`target-size`, see above), Sources & method 97 / 100, About 94 / 100. LCP 2.4 to 2.9 s, CLS 0 to 0.002.

### Raised after the build (your words needed)

- **The site and the SAI27 paper.** You said the site can outlast the paper, so it can name the paper as its origin but must not read as a part of it. One block does that now: the last beat of Conversation and the About page (`AuthorPart` in `src/Author.jsx`), with the label "Part of" and the sentence "This site supplements the paper …". Copy is fixed, so it is unchanged. It needs a new label and sentence from you. Nothing else on the site names the paper or the conference.

## 9. Milestone 05 (c.v16q-05, 12 Nov 2026)

Built from `MILESTONE-05.md`. There is no `[copy needed]` placeholder on the site. The readings of the brief that I gave in the plan (two sentences on two lines in the fourth fold sentence, one block per English sentence, 1.1.13 keeps its 89%) are the ones built.

### Listen to and look at these first

1. **Sync, by ear.** The script shows that each first word lights 0.04 to 0.06 s after its quarter's onset. It cannot show that the words inside a quarter fall on the right syllables. Listen to 1.1.1 (the oṃ, then तपः), 1.1.12 and 1.1.13. Then listen to **1.1.3**: in `data/audio-timings.json` its first half-line ends at 36.35 s, but the second quarter of that half-line is given as 34.35 to 37.05 s, which is 0.7 s after the end of its own window. I used the data as it is. One of the two numbers is probably wrong. Also listen to 1.1.19b, which the data note calls the least certain split.
2. **The fade back.** 0.1 s after you stop scrolling, the lit words fade to unlit in place (0.35 s). The voice starts at 0.5 s and the page moves only then. The English stays on (its class drops for one frame as the first word lights, too short to see). During the lead-in no word is lit. At 1.1.1 this is 3 s (the oṃ). At 1.1.13 it is 7 s, because the verse opens with a vulgate half-line. Say if you prefer the first word lit and waiting.
3. **The `Read the note` button is built, but it never shows.** At 1.1.19 on a 360 × 640 phone the tall part is Goldman's English (37 words), not the note. The note is shorter. With the button the block scaled to 75%, because the button adds a line. So the button shows only where the note is taller than the English, and no verse meets that at 360 to 390px. Two other steps do the work first (see the next item). Result at 360 × 640: 1.1.19 is at 87% with Goldman and 95% with Debroy (it was 68%). On phones the note still takes the place of the English as you scroll, as you accepted in §7 item 1. Say if you want the button always shown on phones in place of that.
4. **Small phones, what still scales below 85%.** One case at 360 × 640: **1.1.2 with Debroy selected, 73%.** The block holds Goldman's three sentences, his credit line and the line "Debroy’s English for this verse isn’t on the site yet". I did not remove any of them. On screens shorter than 640px (a 360 × 640 phone with the browser bars showing has about 560px) more verses go below 85%, for example 1.1.19 with Goldman at 65% at 360 × 560. The cause is the same each time: the English alone is taller than the space under the verse. This needs your decision: a smaller verse on short screens, or the English on its own beat.
5. **The vulgate line on small phones.** Where the block would go below 85%, the vulgate line no longer keeps its own empty space. While it is heard, it shows in place of the English, and the English comes back after it. This happens at 1.1.19 at 360 × 640 with Goldman. I added this because the empty space was the largest part of the problem there. It is not in the brief.
6. **English with one sentence per block.** Look at 1.1.9 to 1.1.11 with Debroy at 1440px: five short sentences make five lines. On small phones, where this would push the block below 85%, the sentences flow as one paragraph again (1.1.2 with Goldman at 360 × 640, for example). The function words stay bound in both cases.
7. **The second fold.** Eight sentences, with the scatter after the third. Read beats 7 and 8 across the swap.
8. **The link preview image.** `public/og.jpg` is now the title fold: the hero, the 60% dark overlay, the title, the subtitle and "By Anupriy Kanti". The old card said "By Anupriy Kanti · Mythematical". Its alt text had the two sages the wrong way round (Vālmīki with the vīṇā). The new alt text joins the title words and the hero's own alt text. No words are new.

### Judgement calls

- **Fold order.** `COPY.fold` holds the eight sentences and `foldScatterAfter: 3` puts the scatter after the third. Each sentence is 0.7 screen, the scatter 1.5, as before.
- **Word times.** A word belongs to the first quarter if it starts before half the half-line's syllable total. A word that crosses the middle starts in the first quarter and holds through the pause.
- **The last beat of the Conversation.** The Origin block is gone from it. The beat still holds the "Copy link to this page" button and the rights footer, because the rights line must stay on the Conversation. It is under the pager's "The Author" dot, so the Conversation still ends on The Author. Say if you want that beat removed and the rights line placed elsewhere.
- **About.** The Author, then Origin, then the copy-link button.
- **Patterns order.** Title, the framing (two paragraphs), the caption about rows and columns, the lens row, the matrix, then the link. The link goes to `#/?v=1.1.19`, which opens 1.1.19 fully lit with its note. The lens row was not changed.
- **Sentence ends.** A sentence ends at a full stop, question mark or exclamation mark, with any closing quote, before a space. The Questions fold uses the same English blocks.
- **Sources & method.** One no-break space was added in the Critical Edition citation ("Institute, 1960–75"), so the year does not sit alone on the last line. No word changed.
- **Skip link.** Found during the keyboard check: the first Tab on a verse focused the hidden "Skip to content" link at the top of the page, and the browser scrolled the stage back to the hero. The link is now fixed in place. Tab on 1.1.17 now reaches the menu, the pager, the source link, "See it in Patterns", Goldman, Debroy and Sound.
- **Data kept but not shown.** `src/content.js` still holds the old verse notes. One of them contains the words "Gita Press reading" (the 1.1.13 note). It is not shown on any page, but the words are in the JavaScript file. Say if you want the unused data deleted.

### Wording that ties the site to the paper (listed, not changed)

Searched `src/`, `index.html` and the meta tags for "supplements", "accompanies", "part of", "companion", "paper" and "conference".

- No other wording makes the site part of the paper. The only place that names the paper or the conference is the Origin block on About.
- One match is not about the paper: About, Mythematical section, "Mythematical is part of Before & Beyond History, with Prihistorica and Cosmonomic."

### Checks

All checks ran by script (Playwright, Chromium) on the live site, https://anupriy-kanti.github.io/valmiki-16-questions/, at 360 × 640, 768 × 1024 and 1440 × 900, on the build of commit `24d65c0` (deploy run 60, after run 59 for `83b968c`). Both runs succeeded.

- **The fold.** Eight sentences in the §2 order at all three widths. The scatter shows only between the third and fourth sentence. 0 lone last words.
- **Copy blocks.** 0 lone last words on every beat of Conversation, Questions and Answers (Goldman and Debroy), on Patterns and on About. Sources & method: 0 at 768 and 1440px. At 360px one heading, "On translation provenance", sets as two lines with "provenance" alone, because the three words do not fit on one line. It was the same in milestone 04.
- **Sync.** Largest first-word offset across the 19 verses: 0.057 s at 1440px, 0.052 s at 360px, 0.051 s at 768px (target under 0.15 s). In all 19 verses no word is lit before the first quarter's onset. At 1.1.1 no word is lit at 1.64 s (inside the oṃ) and तपः lights at 3.20 s (onset 3.15 s). The words are unlit 0.16 to 0.18 s after the last scroll and the voice starts at 0.56 to 0.59 s.
- **English.** 0 lines end on a §4 word, in both translations, at the three widths (and at 320, 360 × 800 and 390px locally).
- **Patterns.** The framing shows above the lens row. "Where description becomes story" is the last lens. The link lands on 1.1.19, 11 of 11 words lit, eyebrow "V · The Story Begins".
- **Copy.** All seven §6 replacements, the Origin label and sentence, and both description tags are present. 0 matches on any page for "reference views", "echo pill", "three English", "Gita Press reading", "supplements", "Principal partner" and "January 2027". The last beat of the Conversation holds the copy-link button and the footer only.
- **No vertical translation, reverse scroll, errors.** 0 elements with a vertical transform or translate at every scroll step. 0 differences when scrolling back up. 0 console errors.
- **Audio.** 1.1.12 starts after the settle pause. A scroll inside the verse does not restart it. Leaving fades it out (volume 0.25 after 0.25 s). 1.1.13 shows the vulgate line in both vulgate windows and not between them, and stops at its end. The live mp3 is byte-identical to `assets-src/audio/vr-1-1-1-to-19-bhide.mp3` (`cmp`). `AUDIO_ENABLED` and `AUDIO_SYNC` were not changed, and their off states were not tested again.
- **Board and matrix.** Unchanged: 16 slots, 13 lit, the turn mark on jitakrodha. 23 marks (4, 11, 7, 1).
- **Reduced motion.** No motes, transitions 0 s.
- **Small phones.** At 360 × 640 every block under a verse is at 85% or more, except 1.1.2 with Debroy (73%). See "look first" items 3 and 4.
- **Not tested.** Safari or WebKit: Playwright's WebKit is not installed in this container and I may not install browsers here. This matters for the audio start after the Sound tap and for `text-wrap: balance` (Safari 17.5). Also not tested: real phones, a screen reader, Lighthouse.

