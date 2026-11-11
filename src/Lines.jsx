import { useLayoutEffect } from 'react'

// A non-breaking space between the last two words, so no line ends on a lone word.
export const tie = s => s.replace(/ (\S+)$/, ' $1')

// English translations (MILESTONE-05 §4). No line may end on a short function
// word, so each is bound to the word after it with a no-break space. The
// translators' words and punctuation are not changed: only the breaks are.
const BOUND = new Set('a an the of in on at to by for with as like and or but his her its is was who'.split(' '))
export const bind = s => s.split(' ').map((w, j, all) =>
  j < all.length - 1 && BOUND.has(w.replace(/^[“‘"'(]+/, '').toLowerCase()) ? w + '\u00a0' : w + (j < all.length - 1 ? ' ' : '')).join('')
// Sentences end at . ? or ! (with any closing quote) before a space.
export const sentences = s => s.match(/.+?[.?!][”’"')]*(?=\s|$)|.+$/g).map(x => x.trim()).filter(Boolean)

// An English block. Each sentence is its own block that balances itself if it
// has to wrap, so the block breaks at sentence ends first.
export function English({ text, className = '' }) {
  return (
    <p className={'en ' + className}>
      {sentences(text).map((x, j, all) => <span key={j} className="sn">{bind(tie(x))}{j < all.length - 1 ? ' ' : ''}</span>)}
    </p>
  )
}

// Fixed copy with its given line breaks. Each line is a block that balances
// itself if it has to wrap, so the given breaks hold wherever they fit.
export default function Lines({ lines, className = '', as: Tag = 'p', ...rest }) {
  return (
    <Tag className={'lines ' + className} {...rest}>
      {lines.map((l, j) => <span key={j} className="ln">{tie(l)}{j < lines.length - 1 ? ' ' : ''}</span>)}
    </Tag>
  )
}

// Scales an element down (never up) so it fits the height its parent gives it.
// `room` returns the height available in px.
export function useFit(ref, room, deps = []) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => {
      const h = el.offsetHeight
      const s = h > 0 ? Math.min(1, room(el) / h) : 1
      const z = Math.max(0.5, s)
      el.style.transform = z < 0.999 ? `scale(${z.toFixed(3)})` : ''
      // The layout box shrinks with the scale, so the element stays centred.
      el.style.marginBottom = z < 0.999 ? `${(-(1 - z) * h).toFixed(1)}px` : ''
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    window.addEventListener('resize', fit)
    document.fonts?.ready.then(fit)
    return () => { ro.disconnect(); window.removeEventListener('resize', fit) }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}
