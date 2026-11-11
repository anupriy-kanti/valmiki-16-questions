import { Link, useSearchParams } from 'react-router-dom'
import { COPY, NOTES, LENSES } from './content.js'
import Matrix from './Matrix.jsx'
import Lines, { tie } from './Lines.jsx'

// Patterns: the matrix with lenses. A lens lights only its cells and shows
// its note beside the matrix. The chosen lens is in the link (?lens=turned).
export default function Patterns() {
  const [params, setParams] = useSearchParams()
  const lens = LENSES.some(([id]) => id === params.get('lens')) ? params.get('lens') : null
  const choose = id => setParams(id === lens ? {} : { lens: id }, { replace: true })
  return (
    <div className="pat py-6">
      <h1 className="mx-title">{COPY.matrixTitle}</h1>
      <div className="pat-frame">
        {COPY.patternsFrame.map((l, j) => <Lines key={j} lines={l} />)}
      </div>
      <Lines lines={COPY.matrixCaption} className="mx-caption" />
      <div role="group" aria-label="Lenses" className="lens-row caps">
        {LENSES.map(([id, label]) => (
          <button key={id} type="button" aria-pressed={lens === id} onClick={() => choose(id)}>{label}</button>
        ))}
      </div>
      <div className="pat-grid">
        <Matrix lens={lens} titled={false} />
        <div className="pat-note" aria-live="polite">
          {lens && <Lines key={lens} lines={NOTES[lens]} className="pat-note-text" />}
        </div>
      </div>
      <p className="pat-back"><Link to="/?v=1.1.19" className="note-link caps">{tie(COPY.patternsBack)}</Link></p>
    </div>
  )
}
