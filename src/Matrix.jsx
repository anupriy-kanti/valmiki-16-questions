import { useEffect, useState } from 'react'
import { QUALITIES, CATS, COPY, GRADE_NAME } from './content.js'
import Lines from './Lines.jsx'

export const COLS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

// The four marks. `turned` is the half dot with a small turn mark.
export function Mark({ grade }) {
  return (
    <svg aria-hidden="true" className="mk-svg" viewBox="0 0 16 16" width="16" height="16">
      {grade === 'exact' && <circle cx="8" cy="8" r="4.6" fill="currentColor" />}
      {grade === 'clear' && <circle cx="8" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />}
      {(grade === 'partial' || grade === 'turned') && (
        <>
          <circle cx="8" cy="8" r="4.1" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M8 3.9a4.1 4.1 0 0 0 0 8.2z" fill="currentColor" />
        </>
      )}
      {grade === 'turned' && <path d="M10.6 2.2a6.2 6.2 0 0 1 3.4 4.2m.1-2.6-.1 2.6-2.5-.6" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />}
      {grade === 'none' && <circle cx="8" cy="8" r="4.2" fill="none" stroke="currentColor" strokeWidth=".6" opacity=".7" />}
    </svg>
  )
}

// Which cells a lens lights. Returns 'on', 'off' or '' (no lens chosen).
const lensState = (lens, q, isLensMark) => {
  if (!lens) return ''
  if (lens === 'senses') return isLensMark ? 'on' : 'off'
  if (lens === 'partial') return q.grade === 'partial' || q.grade === 'turned' ? 'on' : 'off'
  if (lens === 'exact' || lens === 'clear' || lens === 'turned') return q.grade === lens ? 'on' : 'off'
  return 'off'
}

// Rows: the 16 qualities in their colour groups. Columns: 1.1.8 to 1.1.19.
// The data is data/answer-map.json, read as it is.
export default function Matrix({ lens = null, level = 2, titled = true }) {
  const H = `h${level}`
  const [open, setOpen] = useState(null)
  useEffect(() => {
    if (!open) return
    const close = e => { if (e.type === 'keydown' ? e.key === 'Escape' : !e.target.closest?.('.mk')) setOpen(null) }
    window.addEventListener('keydown', close)
    window.addEventListener('click', close)
    return () => { window.removeEventListener('keydown', close); window.removeEventListener('click', close) }
  }, [open])
  return (
    <div className={'mx' + (lens ? ' has-lens lens-' + lens : '')}>
      {titled && (
        <>
          <H className="mx-title">{COPY.matrixTitle}</H>
          <Lines lines={COPY.matrixCaption} className="mx-caption" />
        </>
      )}
      <table className="mx-table">
        <caption className="sr-only">{COPY.matrixTitle}</caption>
        <thead>
          <tr>
            <td />
            {COLS.map(n => (
              <th key={n} scope="col" className={lens === 'story' && n === 19 ? 'is-on' : ''}>
                <span className="mx-pre">1.1.</span>{n}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {QUALITIES.map((q, qi) => {
            const first = qi === 0 || QUALITIES[qi - 1].cat !== q.cat
            const rowOn = (lens === 'none' && q.grade === 'none') || (lens === 'senses' && q.lens)
            return (
              <tr key={q.id} className={(first ? 'g-first ' : '') + (q.grade === 'none' ? 'is-none ' : '') + (rowOn ? 'row-on' : '')}>
                <th scope="row">
                  <span aria-hidden="true" className="mx-dot" style={{ background: CATS[q.cat].dot }} />
                  <span className="mx-name">
                    <i lang="sa-Latn">{q.short}</i> <span lang="sa-Deva" className="mx-dev">{q.dev}</span>
                  </span>
                </th>
                {COLS.map((n, ci) => {
                  const lensMark = lens === 'senses' && q.lens
                  const words = (lensMark ? q.lens.answers : q.answers).filter(a => a.n === n)
                  const grade = lensMark ? q.lens.grade : q.grade
                  const id = q.id + '-' + n
                  const st = words.length ? lensState(lens, q, lensMark) : ''
                  const tip = words.map(w => `${w.word} · ${w.dev} · ${w.ce}`)
                  return (
                    <td key={n} className={lens === 'story' && n === 19 ? 'col-on' : ''}>
                      {words.length > 0 && (
                        <button
                          type="button"
                          className={'mk mk-' + grade + (st ? ' is-' + st : '') + (open === id ? ' is-open' : '') + (ci > 7 ? ' tip-r' : ci < 3 ? ' tip-l' : '')}
                          aria-label={`${tip.join(', ')}, ${GRADE_NAME[grade]}`}
                          onClick={() => setOpen(open === id ? null : id)}
                        >
                          <Mark grade={grade} />
                          <span aria-hidden="true" className="mk-tip">
                            {tip.map(t => <span key={t} className="block whitespace-nowrap">{t}</span>)}
                          </span>
                        </button>
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <ul className="mx-key">
        {['exact', 'clear', 'partial', 'turned', 'none'].map(g => (
          <li key={g}><Mark grade={g} /> {GRADE_NAME[g]}</li>
        ))}
      </ul>
      <p className="mx-review">{COPY.review.replace(/ (\S+)$/, ' $1')}</p>
    </div>
  )
}
