# Changelog

## Site v1.3 (milestone 02, c.v16q-02, Nov 2026)

Built by `cloud-myt-v16q • 02` (c.v16q-02) from `MILESTONE-02.md`. Open points are in `REVIEW.md` §6.

- **c.v16q-02 item 1 · Landing first fold.** The hero image now fills the first screen (`100svh`, centred, `object-fit: cover`) and fades to the page colour on all four sides. On All the top nav floats over the image, transparent, takes a light paper scrim once the reader starts to scroll (so the links stay readable over the picture), and turns solid past the first fold. On load only the image, the nav and a "Scroll" cue with a thin bobbing chevron show. Over the first third of the fold a dark overlay rises over the lower half, then the title, the subtitle "The question that sets the Rāmāyaṇa in motion" and the byline "By Anupriy Kanti · Mythematical" fade in, in that order. The byline fades out again on the way to the second fold. The cue hides once the reader scrolls and, when clicked, scrolls to the introduction. The image keeps a slow drift and a zoom of up to 6%. The "Rāmāyaṇa · Bālakāṇḍa · Sarga 1" eyebrow and the old "Beginning of the Bālakāṇḍa" line are gone from the hero. The progress rail now waits until the reader has left the hero. Under reduced motion all three lines and the overlay show at once and the chevron does not move. In print the image is dropped and the title prints as plain text.
- **c.v16q-02 item 2 · Second fold, the introduction.** Under the hero, a narrower centred column (640px) opens with the small label "Rāmāyaṇa · Bālakāṇḍa · Sarga 1", then the two introduction paragraphs, unchanged, in larger type. The label and paragraphs fade in and rise once, when they reach the screen. The existing short note on CE numbering, IAST and the three translations follows after a small divider. Then the reading view starts as before.
- **c.v16q-02 item 3 · Key as a tuck-away sidebar.** The key (nine themes, three echo types, their descriptions and the notes on numbering, Gita Press boxes and Goldman) leaves the page flow. A vertical "Key" tab on the right edge opens it on All, Questions, Answers and Patterns. It is closed on load until the reader opens it, and the choice is remembered per reader in `localStorage` (guarded, so blocked storage just means closed). A Close button or Escape tucks it away. Focus moves to Close on open and back to the tab on close. When closed it is hidden from screen readers and the tab order. From 1024px it slides in from the right as a full-height panel, as wide as the margin beside the 760px column allows (288–360px). At 1440px it sits clear of the column; at 1024–1279px it overlaps the column edge. Below 1024px it is a bottom sheet, at most 70% of the screen high. On All the tab waits until the reader has left the hero. The progress rail stays on the left.

## Site v1.2 (motion, Nov 2026)

All motion is switched off under `prefers-reduced-motion: reduce`.

- **Route fade.** A 200ms fade-in on each page change. When moving between All, Questions and Answers, the page opens at the verse that was at the top of the screen, if the new page shows it.
- **Hero.** The title and kicker now sit over the bottom of the image on a dark gradient and fade in over 1.2s. On scroll the image drifts down slowly and zooms in by up to about 17%, inside its frame. In print the image is dropped and the title prints as plain text.
- **Verse reveal.** Each verse fades in and rises 8px as it scrolls into view, once only: verse number, then line 1, line 2, then the translations and notes, about 90ms apart. Content is never hidden in print, without JavaScript, or under reduced motion.
- **Selecting a question.** Matching verses ease into focus and the others ease to their dimmed colours over 300ms. The Sanskrit words that echo the selected question (from the artefact's echo layer) glow gold for 1.6s and keep a gold underline. Every echo word carries a dotted underline. Devanāgarī marks cover whole akṣara clusters, so no conjunct is broken. Where that is not possible (1.1.8 द्युतिमान्, 1.1.14 स्मृतिमान्, both joined by sandhi to the next word), only the IAST is marked.
- **Echo tooltips.** Echo words are buttons. Hover, keyboard focus or tap shows a small card with the question it echoes (Q number, label, Sanskrit, the artefact's English question), the echo type, and the verse's Debroy and Gita Press English side by side (stacked below 400px). Escape, a tap elsewhere or scrolling closes it. Word-by-word English renderings are not shown, because the data does not align English words to Sanskrit words.
- **Progress rail.** From 1024px wide, a slim rail on the left of the reading view shows Frame (1.1.1–5), Questions (1.1.2–4, nested), Answer (1.1.6–19) and Pivot (1.1.19b). A gold fill tracks progress, the current part is marked, and each stop jumps to its place. Each page shows only the stops it contains. Hidden on smaller screens and in print.
- **Present mode.** A Present button in the toolbar opens one verse per screen in large type: CE number, question tags, Devanāgarī and IAST with echo words marked, any Gita Press-only half-lines, and the Debroy and Gita Press English that are switched on, side by side. Arrow keys, Space, Enter, PageUp/PageDown, Home/End, the arrow buttons or a click move through the verses (a click on the left quarter goes back). Escape or Exit closes it and leaves the page at the last verse shown. It starts at the verse in view, uses the verses of the current page, and asks for full screen.
- **Performance and contrast.** Small gold labels now use a darker gold (#7f5c1c, 5.6:1). Borders and the rail keep #a8782a. The Google Fonts stylesheet no longer blocks first paint. The hero is preloaded and served as WebP (640px 54 kB, 1024px 136 kB), with the JPEG kept for link previews. Local Lighthouse (vite preview): mobile performance 97, desktop 99–100, accessibility 100 on All and Answers.

## Site v1.1 (polish, Nov 2026)

- **Spotlight contrast.** Dimmed verses no longer use opacity. Opacity 0.45 drops body text to 2.7:1, below WCAG AA. They now use a muted text colour (#5c4f42, 7.3:1 on the page), no card fill and a dashed border. Badges keep their colours.
- **Verse links.** Each verse number links to itself (`#/answers?v=1.1.14`, or `#/questions?v=1.1.3` for 1.1.1–5). The link scrolls to the verse and rings it in gold. A ¶ button by the number copies the full link.
- **Print styles.** Printing hides the menu, hero, toggle bar and copy buttons, shows all three translations whatever the toggles say, and prints black on white with verses kept whole across pages.
- **Link previews.** Added Open Graph title, description, URL and image (hero.jpg, 1024×572, with alt text) plus a large-image Twitter card, for WhatsApp, LinkedIn and similar previews.

## Site v1 (MVP, Nov 2026)

GitHub Pages site built from artefact v6. Critical Edition Sanskrit as primary, CE numbering, Goldman added as a third translation, Gita Press-only half-lines in separate boxes. See `REVIEW.md`.

## Artefact version log (moved from the public page)

- **v6** Named the file, added the header image, section dividers, clearer heading hierarchy and spacing, contact details, and this version log.
- **v5** Readability pass: added the About panel and interactive key, the title and credit, and rewrote the Patterns notes as plain sentences.
- **v4** Made Questions the opening tab. Added the 6 + 5 + 5 line-level spread. Applied source-checked corrections to V.7, V.13 and V.18 (Goldman corroborating the earth-forbearance line).
- **v3** Added the original Sanskrit (Devanāgarī) and its IAST spelling to every verse, paired with both translations. Surfaced the closing enjambment.
- **v2** Re-anchored everything to verse numbers. Added the Gita Press as a second source with a translation toggle, the echo layer, edition-divergence flags, and the Patterns tab.

(Verse numbers in this log are the artefact's Gita Press numbers.)
