import { Link } from 'react-router-dom'
import { QUALITIES, CATS, COPY, GRADE_NAME, qualityOf } from './content.js'
import { Mark } from './Matrix.jsx'

const LEVEL = { exact: 1, clear: 0.82, partial: 0.64, turned: 0.64 }

// What the rail shows when verse `n` has `k` words lit.
// A quality is asked once its word in 1.1.2–4 has lit. It is answered once
// one of its answering words in 1.1.8–19 has lit. Kṛtajña's lens answers
// never light here. `now` marks the qualities of the verse on stage.
export function railState(n, k) {
  return QUALITIES.map(q => {
    const asked = q.v < n || (q.v === n && q.askK < k)
    const hit = a => a.n < n || (a.n === n && a.k < k)
    const lit = q.grade !== 'none' && q.answers.some(hit)
    const now = n <= 4 ? q.v === n && asked : q.answers.some(a => a.n === n && a.k < k)
    return { q, asked, lit, now }
  })
}

const Turn = () => (
  <svg aria-label="turned" role="img" className="slot-turn" viewBox="0 0 12 12" width="11" height="11">
    <path d="M2 8.5a4 4 0 1 1 6.6 1.2m.2-2.7-.2 2.7-2.6-.5" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// The one key to the sixteen qualities (MILESTONE-06 §5.1), in all three
// stage views.
// From 1024px: a column down the left edge, IAST over Devanāgarī. The
// pager's dots keep the right edge.
// - Conversation: a slot appears when its word lights in 1.1.2–4.
// - Questions: every slot is there from the start, and lights in gold as
//   its word lights.
// - Answers: every slot is there from the start.
// In Nārada's verses a slot lights in its group's colour, by grade, with
// its gloss beside it. The qualities with no answer stay unlit.
// Below 1024px: a strip above the verse, all sixteen in IAST, the verse's
// own qualities at full strength.
// `sel` is the quality of the selected word (§5.2): its slot blooms and its
// card opens, with the gloss, the verses that answer it, their grade and the
// link to Patterns. Every word of the card is existing copy.
function Card({ id }) {
  const q = qualityOf(id)
  const i = QUALITIES.indexOf(q)
  const verses = [...new Set(q.answers.map(a => a.ce))]
  return (
    <div className="q-card" data-pos={i < 2 ? 'top' : i > 13 ? 'bottom' : 'mid'} style={{ '--i': i, '--c': CATS[q.cat].dot, '--t': CATS[q.cat].text }}>
      <p className="qc-name"><i lang="sa-Latn">{q.short}</i> <span lang="sa-Deva" className="qc-dev">{q.dev}</span></p>
      <p className="qc-gloss">{q.gloss}</p>
      <p className="qc-ans">
        {verses.length > 0 && <span className="qc-verses">{verses.join(' · ')}</span>}
        <span className="qc-grade"><Mark grade={q.grade} /> {GRADE_NAME[q.grade]}</span>
      </p>
      <Link to={`/patterns?q=${q.id}`} className="note-link caps">{COPY.patternsLink}</Link>
    </div>
  )
}

export default function Rail({ view, n, k, shown, sel }) {
  const state = railState(n, k)
  return (
    <div className={'rail-wrap no-print' + (shown ? ' is-shown' : '')} aria-hidden={!shown}>
      <section aria-labelledby="rail-title" className="rail">
        <h2 id="rail-title" className="rail-title caps">16 Qualities</h2>
        <ol className="rail-list">
          {state.map(({ q, asked, lit, now }) => {
            const c = CATS[q.cat]
            const present = view !== 'conversation' || asked
            const gold = view === 'questions' && asked
            return (
              <li key={q.id} className={'slot' + (present ? ' is-in' : '') + (gold ? ' is-asked' : '') + (lit ? ' is-lit' : '') + (now ? ' is-now' : '') + (sel === q.id ? ' is-sel' : '')} style={{ '--c': c.dot, '--t': c.text, '--lv': LEVEL[q.grade] || 1 }} aria-hidden={!present}>
                <span className="slot-w">
                  <span aria-hidden="true" className="slot-dot" />
                  <i lang="sa-Latn">{q.short}</i>
                  {lit && q.grade === 'turned' && <Turn />}
                </span>
                <span lang="sa-Deva" className="slot-dev">{q.dev}</span>
                <span className="slot-g">{lit ? q.gloss : ''}</span>
              </li>
            )
          })}
        </ol>
      </section>

      <ul className="strip" aria-label="16 Qualities">
        {state.map(({ q, lit, now }) => (
          <li key={q.id} className={'chip' + (now ? ' is-now' : '') + (now && lit ? ' is-lit' : '') + (sel === q.id ? ' is-sel' : '')} style={{ '--c': CATS[q.cat].dot, '--t': CATS[q.cat].text, '--lv': LEVEL[q.grade] || 1 }}>
            <i lang="sa-Latn">{q.short}</i>
          </li>
        ))}
      </ul>
      <div className="q-card-wrap" aria-live="polite">{sel && <Card key={sel} id={sel} />}</div>
    </div>
  )
}
