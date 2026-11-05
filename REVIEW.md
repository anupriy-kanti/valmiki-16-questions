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
