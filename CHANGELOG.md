# Changelog

## Site v1.2 (motion, Nov 2026)

All motion is switched off under `prefers-reduced-motion: reduce`.

- **Route fade.** A 200ms fade-in on each page change. When moving between All, Questions and Answers, the page opens at the verse that was at the top of the screen, if the new page shows it.
- **Hero.** The title and kicker now sit over the bottom of the image on a dark gradient and fade in over 1.2s. On scroll the image drifts down slowly and zooms in by up to about 17%, inside its frame. In print the image is dropped and the title prints as plain text.
- **Verse reveal.** Each verse fades in and rises 8px as it scrolls into view, once only: verse number, then line 1, line 2, then the translations and notes, about 90ms apart. Content is never hidden in print, without JavaScript, or under reduced motion.
- **Selecting a question.** Matching verses ease into focus and the others ease to their dimmed colours over 300ms. The Sanskrit words that echo the selected question (from the artefact's echo layer) glow gold for 1.6s and keep a gold underline. Every echo word carries a dotted underline. Devanāgarī marks cover whole akṣara clusters, so no conjunct is broken. Where that is not possible (1.1.8 द्युतिमान्, 1.1.14 स्मृतिमान्, both joined by sandhi to the next word), only the IAST is marked.
- **Echo tooltips.** Echo words are buttons. Hover, keyboard focus or tap shows a small card with the question it echoes (Q number, label, Sanskrit, the artefact's English question), the echo type, and the verse's Debroy and Gita Press English side by side (stacked below 400px). Escape, a tap elsewhere or scrolling closes it. Word-by-word English renderings are not shown, because the data does not align English words to Sanskrit words.

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
