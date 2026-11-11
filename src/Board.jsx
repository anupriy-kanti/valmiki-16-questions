import { QUALITIES, CATS, COPY } from './content.js'
import Lines from './Lines.jsx'

const LEVEL = { exact: 1, clear: 0.82, partial: 0.64, turned: 0.64 }

// What the board shows when verse `n` has `k` words lit.
// A quality appears once its word in 1.1.2–4 has lit (on Answers all sixteen
// are there from the start). It lights once one of its answering words in
// 1.1.8–19 has lit. Kṛtajña's lens answers never light here.
export function boardState(n, k, allAsked) {
  return QUALITIES.map(q => {
    const u = q.askK
    const appeared = allAsked || q.v < n || (q.v === n && u < k)
    const hit = a => a.n < n || (a.n === n && a.k < k)
    const lit = q.grade !== 'none' && q.answers.some(hit)
    const now = n <= 4 ? q.v === n && appeared : q.answers.some(a => a.n === n && a.k < k)
    return { q, appeared, lit, now }
  })
}

const Turn = () => (
  <svg aria-label="turned" role="img" className="slot-turn" viewBox="0 0 12 12" width="11" height="11">
    <path d="M2 8.5a4 4 0 1 1 6.6 1.2m.2-2.7-.2 2.7-2.6-.5" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Slot({ s }) {
  const { q, appeared, lit } = s
  const c = CATS[q.cat]
  return (
    <li className={'slot' + (appeared ? ' is-in' : '') + (lit ? ' is-lit' : '')} style={{ '--c': c.dot, '--t': c.text, '--lv': LEVEL[q.grade] || 1 }} aria-hidden={!appeared}>
      <span className="slot-w">
        <span aria-hidden="true" className="slot-dot" />
        <i lang="sa-Latn">{q.short}</i> <span lang="sa-Deva" className="slot-dev">{q.dev}</span>
        {lit && q.grade === 'turned' && <Turn />}
      </span>
      <span className="slot-g">{lit ? q.gloss : ' '}</span>
    </li>
  )
}

// From 1280px: a quiet panel on the left of the stage. Below that: a slim
// strip under the nav with only the qualities lit in the current verse.
export default function Board({ n, k, allAsked, shown }) {
  const state = boardState(n, k, allAsked)
  const anyLit = state.some(s => s.lit)
  const now = state.filter(s => s.now)
  return (
    <div className={'board-wrap no-print' + (shown ? ' is-shown' : '')} aria-hidden={!shown}>
      <section aria-labelledby="board-title" className="board-panel">
        <h2 id="board-title" className="board-title caps">16 Qualities</h2>
        <Lines lines={COPY.board} className="board-caption" />
        <ol className="board-grid">
          {state.map(s => <Slot key={s.q.id} s={s} />)}
        </ol>
        <ul className={'board-key' + (anyLit ? ' is-on' : '')} aria-hidden={!anyLit}>
          {Object.entries(CATS).map(([id, c]) => (
            <li key={id}><span aria-hidden="true" className="key-dot" style={{ background: c.dot }} />{c.label}</li>
          ))}
        </ul>
      </section>

      <ul className="board-strip" aria-label="16 Qualities">
        {now.map(({ q, lit }) => (
          <li key={q.id} className={'chip' + (lit ? ' is-lit' : '')} style={{ '--c': CATS[q.cat].dot, '--t': CATS[q.cat].text, '--lv': LEVEL[q.grade] || 1 }}>
            <span aria-hidden="true" className="slot-dot" />
            <i lang="sa-Latn">{q.short}</i>
            {lit && q.grade === 'turned' && <Turn />}
          </li>
        ))}
      </ul>
    </div>
  )
}
