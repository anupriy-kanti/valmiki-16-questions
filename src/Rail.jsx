import { QUALITIES, CATS } from './content.js'

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
// From 1024px: a column down the right edge, IAST over Devanāgarī.
// - Conversation: a slot appears when its word lights in 1.1.2–4.
// - Questions: every slot is there from the start, and lights in gold as
//   its word lights.
// - Answers: every slot is there from the start.
// In Nārada's verses a slot lights in its group's colour, by grade, with
// its gloss beside it. The qualities with no answer stay unlit.
// Below 1024px: a strip above the verse, all sixteen in IAST, the verse's
// own qualities at full strength.
export default function Rail({ view, n, k, shown }) {
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
              <li key={q.id} className={'slot' + (present ? ' is-in' : '') + (gold ? ' is-asked' : '') + (lit ? ' is-lit' : '') + (now ? ' is-now' : '')} style={{ '--c': c.dot, '--t': c.text, '--lv': LEVEL[q.grade] || 1 }} aria-hidden={!present}>
                <span className="slot-g">{lit ? q.gloss : ''}</span>
                <span className="slot-w">
                  <i lang="sa-Latn">{q.short}</i>
                  {lit && q.grade === 'turned' && <Turn />}
                  <span aria-hidden="true" className="slot-dot" />
                </span>
                <span lang="sa-Deva" className="slot-dev">{q.dev}</span>
              </li>
            )
          })}
        </ol>
      </section>

      <ul className="strip" aria-label="16 Qualities">
        {state.map(({ q, lit, now }) => (
          <li key={q.id} className={'chip' + (now ? ' is-now' : '') + (now && lit ? ' is-lit' : '')} style={{ '--c': CATS[q.cat].dot, '--t': CATS[q.cat].text, '--lv': LEVEL[q.grade] || 1 }}>
            <i lang="sa-Latn">{q.short}</i>
          </li>
        ))}
      </ul>
    </div>
  )
}
