import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { VERSES, QUESTIONS, catOf } from './content.js'
import { SanskritLabel } from './Reading.jsx'

// One verse per screen for talks. Arrow keys, Space, PageUp/PageDown, Home/End
// or a click move through the verses. Escape exits.
export default function Present({ nums, start, layers, q, markLine, onClose }) {
  const [i, setI] = useState(Math.max(0, nums.indexOf(start)))
  const box = useRef(null)
  const go = useCallback(d => setI(k => Math.max(0, Math.min(nums.length - 1, k + d))), [nums.length])
  const close = useCallback(() => onClose(nums[i]), [onClose, nums, i])

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    box.current?.focus()
    document.documentElement.requestFullscreen?.().catch(() => {})
    return () => {
      document.body.style.overflow = prevOverflow
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
    }
  }, [])

  useEffect(() => {
    const onKey = e => {
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) { e.preventDefault(); go(1) }
      else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); go(-1) }
      else if (e.key === 'Home') { e.preventDefault(); setI(0) }
      else if (e.key === 'End') { e.preventDefault(); setI(nums.length - 1) }
      else if (e.key === 'Escape') { e.preventDefault(); close() }
    }
    const onFs = () => { if (!document.fullscreenElement) box.current?.focus() }
    window.addEventListener('keydown', onKey)
    document.addEventListener('fullscreenchange', onFs)
    return () => { window.removeEventListener('keydown', onKey); document.removeEventListener('fullscreenchange', onFs) }
  }, [go, close, nums.length])

  const v = VERSES.find(x => x.n === nums[i])
  const onClick = e => {
    if (e.target.closest('button, a')) return
    go(e.clientX < window.innerWidth * 0.25 ? -1 : 1)
  }

  return createPortal(
    <div
      ref={box}
      role="dialog"
      aria-modal="true"
      aria-label={`Presentation, verse ${v.ce}, ${i + 1} of ${nums.length}`}
      tabIndex={-1}
      onClick={onClick}
      className="no-print fixed inset-0 z-40 flex flex-col bg-paper text-ink outline-none"
    >
      <div className="flex items-center gap-3 border-b border-line px-4 py-2 font-sans text-sm">
        <span className="font-semibold">{v.ce}</span>
        {v.gpLabel && <span className="text-muted">{v.gpLabel}</span>}
        <span className="ml-auto text-muted" aria-hidden="true">{i + 1} / {nums.length}</span>
        <button type="button" onClick={() => go(-1)} disabled={i === 0} className="rounded border border-line px-2 py-1 disabled:opacity-40" aria-label="Previous verse">←</button>
        <button type="button" onClick={() => go(1)} disabled={i === nums.length - 1} className="rounded border border-line px-2 py-1 disabled:opacity-40" aria-label="Next verse">→</button>
        <button type="button" onClick={close} className="rounded bg-accent px-3 py-1 text-white">Exit</button>
      </div>

      <div key={v.n} className="present-slide mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center overflow-y-auto px-5 py-6 sm:px-10">
        {v.answers.length > 0 && (
          <p className="mb-4 flex flex-wrap gap-2 font-sans">
            {v.answers.map(id => {
              const c = catOf(id)
              const on = q === id
              return (
                <span key={id} title={QUESTIONS.find(x => x.id === id)?.label}
                  style={{ background: on ? c.text : c.bg, color: on ? '#fff' : c.text, borderColor: c.border }}
                  className="rounded-full border px-3 py-0.5 text-sm font-semibold sm:text-base">{id}</span>
              )
            })}
          </p>
        )}
        <SanskritLabel className="mb-2" />
        {[0, 1].map(k => (
          <div key={k} className="mb-4">
            <p lang="sa-Deva" className="deva leading-snug" style={{ fontSize: 'clamp(1.6rem, 4.2vw, 3.6rem)' }}>{markLine(v, k, 'dev')}</p>
            <p lang="sa-Latn" className="italic text-muted" style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.9rem)' }}>{markLine(v, k, 'iast')}</p>
          </div>
        ))}
        {v.gpOnly && (
          <div className="mb-4 rounded bg-gp p-3 text-muted" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.25rem)' }}>
            <p className="font-sans text-xs font-semibold uppercase tracking-wide">Gita Press reading, not in the CE constituted text</p>
            {v.gpOnly.map(r => <p key={r.gp}><span className="font-sans text-xs font-semibold">{r.gp}</span> <span lang="sa-Deva" className="deva">{r.dev}</span> · <i lang="sa-Latn">{r.iast}</i></p>)}
          </div>
        )}
        <div className="grid gap-6 border-t border-line pt-4 md:grid-cols-2" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.4rem)' }}>
          {layers.debroy && v.debroy && (
            <div><p className="font-sans text-xs font-semibold uppercase tracking-wide text-muted">Debroy (CE)</p><p>{v.debroy}</p></div>
          )}
          {layers.gp && v.gita && (
            <div><p className="font-sans text-xs font-semibold uppercase tracking-wide text-muted">Gita Press (vulgate)</p><p>{v.gita}</p></div>
          )}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{`Verse ${v.ce}`}</p>
    </div>,
    document.body,
  )
}
