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
