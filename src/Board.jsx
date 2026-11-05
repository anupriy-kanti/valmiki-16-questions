import { useEffect, useRef, useState } from 'react'
import { STORY, QUESTIONS, ECHO_STYLE, catOf } from './content.js'

// What the board shows after verse index `cur` has `k` words lit. A question
// is asked once its word in 1.1.2–4 has lit. It is answered once a verse that
// lists it in `answers` has finished lighting (the artefact's mapping, as is).
export function boardState(cur, k) {
  const asked = new Set()
  const count = {}
  const syms = {}
  STORY.forEach((v, i) => {
    const lit = i < cur ? v.total : i === cur ? k : 0
    for (const u of v.lines.flat()) if (u.q && u.k < lit) asked.add(u.q)
    if (lit < v.total) return
    for (const q of v.answers) count[q] = (count[q] || 0) + 1
    for (const e of v.echoes || []) (syms[e.q] ||= new Set()).add(ECHO_STYLE[e.type].sym)
  })
  return { asked, count, syms }
}

const status = (q, b) => !b.asked.has(q.id)
  ? 'not yet asked'
  : b.count[q.id] ? `answered by ${b.count[q.id]} verse${b.count[q.id] > 1 ? 's' : ''} so far` : 'asked, not yet answered'

function Slot({ q, b }) {
  const asked = b.asked.has(q.id)
  const n = b.count[q.id] || 0
  const cls = !asked ? ' is-off' : n ? ' is-answered' : ' is-asked'
  return (
    <li className={'slot' + cls}>
      <span aria-hidden="true" className="slot-dot" style={{ background: catOf(q.id).dot }} />
      <span className="slot-q caps">{q.id}</span>
      <span aria-hidden="true" className="slot-sep">·</span>
      <i lang="sa-Latn" className="slot-w">{q.iast}</i>
      {n > 0 && <span aria-hidden="true" className="slot-n">{n}{b.syms[q.id] ? ' ' + [...b.syms[q.id]].join('') : ''}</span>}
      <span className="sr-only">, {status(q, b)}</span>
    </li>
  )
}

function Slots({ b }) {
  return (
    <ol className="board-grid">
      {QUESTIONS.map(q => <Slot key={q.id} q={q} b={b} />)}
    </ol>
  )
}

const KeyLine = () => (
  <p className="board-key">Outline: asked. Gold: answered, with the number of answering verses so far.</p>
)

// From 1280px: a slim panel on the left of the stage, two columns of eight.
// Below: a strip of 16 dots under the nav that opens the board as a bottom sheet.
export default function Board({ cur, k, shown }) {
  const b = boardState(cur, k)
  const [open, setOpen] = useState(false)
  const strip = useRef(null)
  const closeBtn = useRef(null)
  useEffect(() => {
    if (!open) return
    closeBtn.current?.focus()
    const onKey = e => { if (e.key === 'Escape') { setOpen(false); strip.current?.focus() } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])
  useEffect(() => { if (!shown) setOpen(false) }, [shown])
  const done = QUESTIONS.filter(q => b.count[q.id]).length
  return (
    <div className={'board-wrap no-print' + (shown ? ' is-shown' : '')}>
      <section aria-label="Question board" className="board-panel">
        <p className="board-title caps">The Sixteen Questions</p>
        <Slots b={b} />
        <KeyLine />
      </section>

      <button
        ref={strip}
        type="button"
        className="board-strip"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`Question board: ${b.asked.size} of 16 asked, ${done} answered. Open the board.`}
        onClick={() => setOpen(true)}
        tabIndex={shown ? 0 : -1}
      >
        {QUESTIONS.map(q => {
          const st = !b.asked.has(q.id) ? 'is-off' : b.count[q.id] ? 'is-answered' : 'is-asked'
          return <span key={q.id} aria-hidden="true" className={'strip-dot ' + st} style={{ '--c': catOf(q.id).dot }} />
        })}
      </button>

      {open && (
        <div className="board-sheet-back" onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}>
          <div role="dialog" aria-modal="true" aria-labelledby="board-sheet-title" className="board-sheet">
            <div className="mb-2 flex items-center justify-between">
              <h2 id="board-sheet-title" className="caps text-xs text-gold">The Sixteen Questions</h2>
              <button ref={closeBtn} type="button" onClick={() => { setOpen(false); strip.current?.focus() }} className="caps rounded-full border border-line px-3 py-1 text-[10px] text-ink">
                Close <span aria-hidden="true">×</span>
              </button>
            </div>
            <Slots b={b} />
            <KeyLine />
          </div>
        </div>
      )}
    </div>
  )
}
