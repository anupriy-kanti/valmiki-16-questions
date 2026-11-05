# Milestone 03 · cloud-myt-v16q • 03 (short form c.v16q-03)

Planned in mytwiki-C21, 5 Nov 2026, with Anupriy's rulings. This is the big one: a dark, immersive scroll story on the All tab, modelled on Anupriy's Mahābhārata site (*The Four Narrative Layers of the Mahābhārata*, Claude Design version) and on a reference video where a Sanskrit verse lights up word by word. The standing rules from `BRIEF.md` still apply: no change to verse text, badges, mapping or numbering, British English, no semicolons in copy you write, no new claims about Sanskrit. Commit each numbered item separately with the prefix `c.v16q-03:`, push to `main`, and log it in `CHANGELOG.md`. Put judgement calls and anything unfinished in `REVIEW.md` §7 "Milestone 03".

Where this brief and `MILESTONE-02.md` disagree, this brief wins (the hero especially).

## 1. Dark only, and the type of the Mahābhārata site

- Remove the light theme. One dark palette, taken from the Mahābhārata site:
  - background `#1a1410`, with a soft warm radial glow behind the stage (`#2a2018` at centre, fading out)
  - text `#f0e8d8`
  - muted text `#a8998a`
  - gold `#c9a85c` (labels, rules, frames), with a brighter gold `#e8c87a` for lit words and glow
  - frame lines: gold at about 35% opacity, 1px
- Give each of the nine category colours a dark-page version: deep tinted fill, light text, AA contrast. Keep the hue of each.
- Type: **Cinzel** (400/600/700) for titles, eyebrows, labels and nav, in spaced capitals (letter-spacing about 0.15–0.2em for small labels). **EB Garamond** (with italics) for all reading text. **Tiro Devanagari Sanskrit** for Devanāgarī. Drop DM Sans.
- Print stays light (black on white), as now.

## 2. The hero: whole image, never cropped, never stretched

- New image: `assets-src/hero-v2-2300.jpg` (2300 × 1294, Gemini, cropped by the planning session to remove Gemini watermarks). From it, generate `public/hero-v2-{960,1600,2300}.{webp,jpg}` at build time or once, and use `srcset` and `sizes`. Delete the old hero files and the old preload, and preload the new one.
- Show the **whole image at its own aspect ratio**, scaled to fit the viewport (`object-fit: contain`, width up to `min(100vw, 2300px)`, height up to about 78svh). Never `cover`, never cropped, never upscaled beyond 2300px.
- Fade its edges into the background on **all four sides** with a CSS mask (radial or four linear gradients, roughly the outer 8–12%), so it melts into the dark page like the Mahābhārata site's images.
- Title band above or over the top fifth of the image (the sky there is calm): eyebrow "Rāmāyaṇa · Bālakāṇḍa · Sarga 1" in Cinzel caps, gold. Title **Vālmīki's 16 Questions** in Cinzel. Subtitle *The question that sets the Rāmāyaṇa in motion* in EB Garamond italic. Byline "By Anupriy Kanti" in Cinzel caps. The byline stays with the title.
- Scroll cue (thin chevron and "Scroll") at the bottom. It hides once the reader scrolls.
- Alt text: "At a forest hermitage at dusk, the sage Nārada, holding a vīṇā, speaks, while the elder sage Vālmīki listens with folded hands."
- **Image credit (Anupriy's ruling, for transparency):** a small caption under the hero, in EB Garamond italic, muted, about 0.8rem: "Nārada answering Vālmīki's question. An AI-generated image (Google Gemini), directed by Anupriy Kanti." Repeat it on Sources & method under a short "Image" heading, and as the last line of the print footer.

## 3. The shell (from the Mahābhārata site)

- **Left edge:** vertical text "Anupriy Kanti · Mythematical" in small Cinzel caps, muted gold, rotated 90°. From 1024px only.
- **Right edge:** a dot pager for the sections of the All story: The Frame · The Questions · The Answer · The Story Begins · Overview · The Author. Each dot shows its label on hover or when active, but labels show only from 1280px, never over the reading column. The active dot is gold and filled. Dots are links.
- **Bottom line** (small Cinzel caps, muted): "Critical Edition text from GRETIL · translations by Goldman, Debroy and the Gita Press". It shows on the All story only.
- The top nav (All · Questions · Answers · Patterns · Sources & method · About) stays, in small Cinzel caps, transparent over the dark page.

## 4. The introduction: one sentence at a time, in frames

- After the hero, the two introduction paragraphs (verbatim, "The Rāmāyaṇa opens with a question." to "…how carefully the epic's first lines are built.") are shown **one sentence per screen**, centred, in EB Garamond italic, inside a thin gold frame.
- Each new sentence adds one more frame inside the last (the Mahābhārata site's nested frames). The frames echo the subject: a question asked inside a story.
- Scroll drives it: a pinned stage (`position: sticky`) while the sentences change. Fade between sentences (about 400ms).
- The last frame holds a small Cinzel caps label "Enter the dialogue" and a down arrow.

## 5. The verse stage: words light up as you scroll

This is the centre of the milestone. The reference is three frames in Anupriy's vault: a near-black stage, one verse centred, every word grey at first. As you scroll, each word lights to glowing gold in turn, with its IAST lit under it. When the verse is complete, the English fades in below in italic, then the citation in spaced caps.

- **One pinned stage per verse**, 1.1.1 to 1.1.19, each pinned for about 1.2–1.6 screens of scroll (shorter on phones). Scroll progress within the verse drives which word is lit.
- **Words:** each verse is shown as its two lines (half-verses) of word units. Each unit is the Devanāgarī word with its IAST word centred under it. Daṇḍa at the end of line 1 (।) and line 2 (॥ with the verse number).
- **Devanāgarī for the stage is generated from the GRETIL IAST, word by word**, so word units line up exactly. Use `@indic-transliteration/sanscript` (IAST → Devanagari) in `scripts/build-data.mjs`, and keep spaces at GRETIL's word breaks. Smith's Devanāgarī (the current `dev` field) stays in use in the reference tabs. Add a line on Sources & method: "In the scroll story, the Devanāgarī is transliterated from the GRETIL IAST word by word, so each word lines up with its romanisation. The reference views show the Devanāgarī e-text as published."
- **States:** unlit words are `#5a5048`. The current word is bright gold with a soft glow (text-shadow). Words already lit settle to gold. IAST follows the same states at a smaller size, in EB Garamond italic.
- **After the last word:** the translation fades in (EB Garamond italic, about 1.15rem), then the citation in Cinzel caps: "VĀLMĪKI RĀMĀYAṆA 1.1.14 · CRITICAL EDITION".
- **Translation switcher:** one translation at a time, with a small Cinzel caps switch, "Goldman · Debroy · Gita Press", at the foot of the stage. Goldman by default, and the choice is remembered (`localStorage`, wrapped in try/catch). Goldman pieces carry the small note "verse split by MYT, draft".
- **Section eyebrows** at the top of the stage, Cinzel caps gold: "I · The Frame" (1.1.1), "II · The Sixteen Questions" (1.1.2–4), "III · The Frame" (1.1.5–7), "IV · Nārada's Answer" (1.1.8–19), "V · The Story Begins" (1.1.19b, shown as the last beat of 1.1.19).
- **Gita Press-only half-lines** (1.1.13 and 1.1.19): one small muted line under the verse, "Gita Press adds:" with the IAST, no lighting.
- **Echo words** (the artefact's `echoes`): when lit, they glow brighter and show a small echo pill beside the word (↺ verbatim, ⇄ inverted, ≈ adjacency). The existing tooltip still works on tap or hover.

## 6. The question board

- Sixteen slots, one per question, carrying the Q number and the IAST word (for example "Q4 · kṛtajña").
- **Desktop (1280px and up):** two columns of eight, in a slim panel on the left of the stage, inside the vertical byline. **Below 1280px:** a slim strip of 16 dots under the nav. Tapping it opens the full board as a bottom sheet.
- **States, driven by scroll:**
  1. Hidden until 1.1.2 begins.
  2. **Asked:** as each question word lights in 1.1.2–4, its slot appears as a grey outline with a small category-colour dot.
  3. **Answered:** when an answer verse (1.1.8–19) finishes lighting, every question in that verse's `answers` list fills gold, with a small count of answering verses so far. An echo adds its symbol.
  4. Questions that no verse answers stay grey outlines to the end. No text calls this out on the stage. The board shows it.
- Use the artefact's mapping exactly as it now stands in the data, renumbered to CE. Do not add or remove any mapping.

## 7. The overview, then the author

- **Overview** (after 1.1.19): eyebrow "About the mapping", title "The Sixteen Questions and Nārada's Answer" in Cinzel. The board expands into a 4 × 4 grid. Each cell shows the Q number, the Devanāgarī and IAST, the category, the CE verses that answer it, and any echoes. Unanswered cells stay dark and read "Not directly answered" (the existing Coverage wording). Below it, three Cinzel caps links: "Read the questions" (Questions tab), "Read the answer" (Answers tab), "See the patterns" (Patterns tab).
- **The author** (end of All, and the top of the About page), laid out like the Mahābhārata site:
  - Eyebrow "The Author", name "Anupriy Kanti" in Cinzel.
  - Portrait slot `public/author.jpg`. If the file is missing, show a quiet monogram "AK" in a gold frame and log it in `REVIEW.md`.
  - Bio, verbatim from the Mahābhārata site. In italic: "Anupriy Kanti is a storyteller and UX leader who loves building experiences and finding stories that explore, explain, and express Life as we know it." Then in plain text: "His research and practice are fuelled by a fascination with all things Too Fantastical — which turned into the platform *Mythematical*, where he explores global mythic traditions through structured analysis of narrative motifs and symbolic frameworks."
  - "Part of" label, then the SAI27 line already on the About page (the paper title and the conference).
  - A "Copy link to this page" button (Cinzel caps, gold outline).
  - Keep the method credit and the links already on About.

## 8. Present mode

- Present mode becomes the All story full screen. The arrow keys, Space and click step one word at a time, Shift+arrow steps a whole verse, and Escape exits. The board stays visible.

## 9. Reference tabs

- Questions, Answers, Patterns, Sources & method and About keep their structure and content, restyled dark with the new type. The Key sidebar stays (dark).

## 10. Motion, access and performance

- Pinning via `position: sticky` and scroll progress via `IntersectionObserver` plus a single rAF-throttled scroll handler. No GSAP unless it is unavoidable, and log it if used.
- Lighting is visual only: the full verse text is in the DOM and readable by screen readers at all times. The stage carries `aria-live="off"`.
- **Reduced motion:** no pinning. Every verse is shown fully lit with its translation, the intro sentences all show, the board shows its final state, and nothing animates.
- **Phones (375px):** the stage works. Word units wrap within the line, the IAST stays under its word, nothing scrolls sideways, and the pin lengths are shorter.
- Targets on the local preview: Lighthouse accessibility 100, mobile performance at least 90, desktop at least 95. Report the numbers.

## 11. Done looks like

- The All story works end to end at 375px, 1024px, 1440px and 1920px, and with reduced motion. Deep links (`#/answers?v=1.1.14`) and the reference tabs still work.
- `REVIEW.md` §7 lists every judgement call, every deviation from this brief, and every placeholder (the author photo especially).
- Final message: what was done, what was not, and what Anupriy must decide.
