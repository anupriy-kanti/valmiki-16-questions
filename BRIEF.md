# Build brief · Vālmīki's 16 Questions (GitHub Pages)

Written by mytwiki-C21 (planning session), 5 Nov 2026, for a cloud execution session with a small budget. **Build, don't redesign.** Every decision below is settled. If something is ambiguous, pick the simpler option and list it in `REVIEW.md`.

## Goal

Turn the Claude artefact in `source/Valmikis_16_Questions.jsx` into a public static site on GitHub Pages: a landing page plus subpages showing the whole Vālmīki–Nārada exchange (Rāmāyaṇa, Bālakāṇḍa, sarga 1) with questions and answers. It accompanies Anupriy Kanti's SAI27 conference paper (Jan 2027) as supplementary material, so it must hold up to scholars: Critical Edition first, every text cited.

## Stack and hosting

- Vite + React + Tailwind (the artefact already uses Tailwind classes). `HashRouter` so deep links work on Pages.
- Repo `anupriy-kanti/valmiki-16-questions`, deploy with the official GitHub Pages Actions workflow on push to `main`. Set Vite `base: '/valmiki-16-questions/'`.
- Hero image: extract the base64 `HERO` constant from the source into `public/hero.jpg` and reference it as a file. If `source/` has no image, leave a placeholder and note it in `REVIEW.md`.
- Keep the artefact's visual style: EB Garamond, Tiro Devanagari Sanskrit, DM Sans, the warm palette, the nine category colours, echo pills. Refine spacing and a centred reading column (max ~760px) for desktop and projector, mobile first.

## Information architecture (Anupriy's ruling)

One **reading view** with a filter, plus two separate hygiene pages.

- **Top nav:** All · Questions · Answers · Patterns · Sources & method · About.
- **All** (`#/`, the landing): hero, title, a short frame ("Vālmīki asks Nārada…", the 16, why it matters: use the artefact's About text, corrected per below), the key/legend, then the full exchange in order: frame verses, the three question verses with the 16 question cards, Nārada's answer verse by verse, with the pattern notes inline where they belong.
- **Questions** (`#/questions`): the same view filtered to only the question parts (frame + 1.1.2–4 + the 16 cards).
- **Answers** (`#/answers`): filtered to only Nārada's answer (1.1.6–19) with question badges; tapping a badge spotlights it (keep the artefact's behaviour).
- **Patterns** (`#/patterns`): filtered to only the pattern cards, plus the Coverage checklist folded in as one section.
- **Sources & method** (`#/sources`): full bibliography, licences, the GP–CE concordance, how the mapping was made, the rights notice.
- **About** (`#/about`): Anupriy Kanti, Mythematical, the SAI27 paper. Content below.
- Selected question (`?q=Q4`) should survive moving between All / Questions / Answers.

## Text layers per verse

1. **Sanskrit, Critical Edition** (primary): Devanāgarī from `data/ce-sanskrit-1.1.1-21.json` (`dev`), IAST from the same file (`iast`). Number every verse by its **CE number** (1.1.n). Show the Gita Press number in small type where it differs ("GP 15").
2. **English, three translations, toggle (multi-select, default all three):**
   - **Goldman (CE)**, `data/goldman-1.1.1-24.json`. Goldman translates in paragraphs covering verse groups ([1–5], [6–11], [12–15], [16–24]). Show each paragraph once, at the head of its group, labelled "Goldman, 1.1.6–11". Do not split it into verses.
   - **Debroy (CE)** and **Gita Press (vulgate)**: the strings already in the artefact's `VERSES`, verbatim, moved to their CE verse via `data/gp-ce-concordance.md`.
3. **Gita Press Sanskrit** only where it differs from the CE: the vulgate-only half-lines, shown in a muted "Gita Press reading, not in the CE constituted text" box.

## Content corrections (must apply)

These come from aligning the artefact (keyed to Gita Press numbers) with the CE. See `data/gp-ce-concordance.md`.

1. **Renumber** everything (questions, answers, echoes, Coverage, Patterns text, alerts) from GP to CE numbers. E.g. priyadarśana echoes are at CE 1.1.15 and 1.1.17 (artefact "V.16 and V.18"); smṛtimān is at CE 1.1.14 (artefact V.15); the earth-forbearance verse is CE 1.1.17 (artefact V.18); the description ends at CE 1.1.19 and the story's verb *aicchat* is in CE 1.1.19b (artefact V.21).
2. **Remove the "Debroy compression" claim at GP V.13.** The artefact says Debroy drops *prajāpatisamaḥ…* as "prose compression". That half-line (GP 13a) is **not in the CE constituted text**, and neither is GP 14a (*rakṣitā svasya dharmasya svajanasya ca rakṣitā*). Debroy is following the CE. Replace with a neutral note: "Gita Press reading. Not in the Critical Edition's constituted text, so absent from the CE translations." Remove the same claim from the Patterns "Edition divergence" card.
3. **GP 20b** *prakṛtīnāṃ hitair yuktaṃ prakṛtipriyakāmyayā* is also not in the CE. The artefact tags Q8 (and Q1, Q5) on GP 20. In the CE view, CE 1.1.19a is *jyeṣṭhaṃ śreṣṭhaguṇair yuktaṃ priyaṃ daśarathaḥ sutam*: keep the badges that this half-line supports (Q1), drop the ones that rested only on 20b (Q8; Q5 had no basis in either half: drop it too and log in `REVIEW.md`).
4. **Keep** the earth-forbearance divergence (CE 1.1.17d *kṣamayā pṛthivīsamaḥ* is in the CE; Debroy's English omits it). Goldman's "yet he rivals the earth in forbearance" is now shown directly, so cut the "Goldman as proxy" wording.
5. Spellings: **Rāmāyaṇa** (never "Rāmāyaṇ"), **Bālakāṇḍa** (never "Bāl Kānd"). British English throughout. No semicolons in any copy you write.
6. **Remove the phone number** from the footer. Keep email and Instagram.
7. Do not add any new claim about Sanskrit grammar, word roots or meaning. Keep the artefact's existing interpretive notes as written (after renumbering) and list each one in `REVIEW.md` for Anupriy to re-read.
8. Drop the version log from the public page (move it to `CHANGELOG.md`).

## Citations and rights (Anupriy's ruling: full verbatim translations, cited and linked)

- Every translation block carries a short cite label ("Goldman 2021, p. 51") linking to its entry on Sources & method.
- Sources page, Chicago bibliography style:
  - Critical Edition: G. H. Bhatt et al., eds., *The Vālmīki-Rāmāyaṇa: Critical Edition*, 7 vols. (Baroda: Oriental Institute, 1960–75).
  - GRETIL e-text: "Rāmāyaṇa (Critical Edition)", data entry Muneo Tokunaga, contribution John Smith, GRETIL version 2020-04-16, https://gretil.sub.uni-goettingen.de/ , licence CC BY-NC-SA 4.0.
  - Devanāgarī e-text: John Smith, Vālmīki Rāmāyaṇa, https://bombay.indology.info/ramayana/ (Bālakāṇḍa file dated 21 Oct 2021).
  - Goldman: as in `data/goldman-1.1.1-24.json` `source`, with a link to the Princeton University Press page.
  - Debroy: Bibek Debroy, trans., *The Valmiki Ramayana*, vol. 1 (Gurgaon: Penguin Random House India, 2017). Link the publisher page.
  - Gita Press: *Śrīmad Vālmīki Rāmāyaṇa*, with Sanskrit text and English translation (Gorakhpur: Gita Press). Link gitapress.org. Page numbers: leave a `[p. ?]` placeholder and list in `REVIEW.md`.
- Rights notice on Sources and in the footer: "Translations are quoted for scholarly commentary and comparison. Copyright remains with the translators and publishers. To request removal, write to anupriy.kanti@gmail.com." Sanskrit e-texts credited under their licences. The site is non-commercial (needed for CC BY-NC-SA).
- Do not use the GP Devanāgarī as primary any more. Its old note "Devanāgarī transcribed verbatim from the Gita Press pages" moves to Sources, applying only to the GP-reading boxes.

## About page content

- **Anupriy Kanti**, UX strategist and content designer, founder of **Mythematical** (MYT): "Comparing mythologies from different cultures and all things too fantastical." Part of Before & Beyond History, with Prihistorica and Cosmonomic.
- Links: instagram.com/mythematical · youtube.com/@mythematical · linkedin.com/company/mythematical · anupriy.kanti@gmail.com
- **SAI27:** this site supplements the paper *Vālmīki's Unanswered Question: Kṛtajña/कृतज्ञ as Described, Debated, & Demonstrated through the Rāmāyaṇa*, for *Śabda, Artha, and Itihāsa: An Etymological Approach to Indian Storytelling* (Sindhu Veda Research Foundation with the Department of Sanskrit, University of Mumbai; principal partner Mythouse.org), 2–3 Jan 2027.
- A one-line method credit: "Mapped by Anupriy Kanti with Claude (Anthropic) as research assistant. Readings are Anupriy's."
- Leave a slot for a portrait and a longer bio, marked `TODO` in `REVIEW.md`.

## Done looks like

- Site live at `https://anupriy-kanti.github.io/valmiki-16-questions/`, all six routes working, deep links reload correctly.
- Lighthouse accessibility ≥ 90, works at 375px and 1440px, no horizontal scroll, Devanāgarī renders.
- `REVIEW.md` lists: every interpretive note kept, every judgement call, every placeholder.
- One PR or direct commits to `main`, with the live URL in the final message.
