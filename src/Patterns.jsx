import { useEffect, useState, useSyncExternalStore } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { COPY, NOTES, LENSES, CATS, GRADE_NAME, QUALITIES, qualityOf } from './content.js'
import Matrix, { Mark } from './Matrix.jsx'
import Lines, { tie } from './Lines.jsx'

// True from 1024px: Patterns is then one fold, with a detail panel.
const WIDE = '(min-width: 1024px)'
const useWide = () => useSyncExternalStore(
  f => { const m = window.matchMedia(WIDE); m.addEventListener('change', f); return () => m.removeEventListener('change', f) },
  () => window.matchMedia(WIDE).matches,
)

// A dot's detail: the content of its tooltip, laid out larger, with the gloss.
function Detail({ pick }) {
  const q = qualityOf(pick.q)
  const c = CATS[q.cat]
  return (
    <div className="pd" style={{ '--c': c.dot, '--t': c.text }}>
      {pick.n && <p className="pd-cite caps">Vālmīki Rāmāyaṇa 1.1.{pick.n}</p>}
      <p className="pd-name"><i lang="sa-Latn">{q.full}</i> <span lang="sa-Deva" className="pd-dev">{q.fullDev}</span></p>
      <p className="pd-gloss">{pick.gloss}</p>
      <p className="pd-grade"><Mark grade={pick.grade} /> {GRADE_NAME[pick.grade]}</p>
      <ul className="pd-words">
        {pick.words.map(w => (
          <li key={w.word}><i lang="sa-Latn">{w.word}</i> · <span lang="sa-Deva" className="pd-wdev">{w.dev}</span> · {w.ce}</li>
        ))}
      </ul>
    </div>
  )
}

// Patterns: the matrix with lenses. A lens lights only its cells. The chosen
// lens is in the link (?lens=turned).
// From 1024px the page is one fold: the matrix on the left, and a panel on
// the right that shows the framing, a lens's note, or a dot's detail.
// Below 1024px it is one column, and a dot opens its detail in place.
export default function Patterns() {
  const [params, setParams] = useSearchParams()
  const lens = LENSES.some(([id]) => id === params.get('lens')) ? params.get('lens') : null
  const wide = useWide()
  const [pick, setPick] = useState(null)
  // ?q=Q3 (from a selected quality word on the stage) marks that quality's dots.
  const mark = !lens && QUALITIES.some(q => q.id === params.get('q')) ? params.get('q') : null
  const marked = mark && qualityOf(mark)
  const choose = id => { setPick(null); setParams(id === lens ? {} : { lens: id }, { replace: true }) }
  useEffect(() => {
    if (!pick) return
    const close = e => { if (e.key === 'Escape') setPick(null) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [pick])
  useEffect(() => { if (!wide) setPick(null) }, [wide])

  const frame = (
    <div className="pat-frame">
      {COPY.patternsFrame.map((l, j) => (wide ? <p key={j}>{tie(l.join(' '))}</p> : <Lines key={j} lines={l} />))}
    </div>
  )
  const lensNote = lens && <Lines key={lens} lines={NOTES[lens]} className="pat-note-text" />
  return (
    <div className={'pat' + (wide ? ' pat-wide' : ' py-6')}>
      <div className="pat-main">
        <h1 className="mx-title">{COPY.matrixTitle}</h1>
        {!wide && frame}
        <Lines lines={COPY.matrixCaption} className="mx-caption" />
        <div role="group" aria-label="Lenses" className="lens-row caps">
          {LENSES.map(([id, label]) => (
            <button key={id} type="button" aria-pressed={lens === id} onClick={() => choose(id)}>{label}</button>
          ))}
        </div>
        <Matrix lens={lens} mark={mark} titled={false} picked={wide ? pick?.id ?? null : undefined} onPick={wide ? setPick : undefined} />
        {!wide && <div className="pat-note" aria-live="polite">{lensNote}</div>}
        <p className="pat-back"><Link to="/?v=1.1.19" className="note-link caps">{tie(COPY.patternsBack)}</Link></p>
      </div>
      {wide && (
        <aside className="pat-panel" aria-live="polite">
          {pick ? <Detail key={pick.id} pick={pick} /> : lens ? lensNote : marked ? <Detail key={mark} pick={{ q: mark, grade: marked.grade, gloss: marked.gloss, words: marked.answers }} /> : frame}
        </aside>
      )}
    </div>
  )
}
