import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Present from './Present.jsx'
import {
  VERSES, GOLDMAN, QUESTIONS, QUESTION_LINES, PATTERNS, CITES, CATS, ECHO_STYLE, PHASE_LABELS,
  catOf, answersFor, echoesFor,
} from './content.js'

const LAYERS = [
  ['goldman', 'Goldman (CE)'],
  ['debroy', 'Debroy (CE)'],
  ['gp', 'Gita Press (vulgate)'],
]

const Label = ({ children, className = '' }) => (
  <p className={'font-sans text-xs font-semibold uppercase tracking-wide ' + className}>{children}</p>
)

function Cite({ id }) {
  return (
    <Link to={`/sources?ref=${id}`} className="font-sans text-xs text-accent underline">
      {CITES[id]}
    </Link>
  )
}

function QBadge({ id, active, onClick }) {
  const c = catOf(id)
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      title={QUESTIONS.find(q => q.id === id)?.label}
      style={{
        background: active ? c.text : c.bg,
        color: active ? '#fff' : c.text,
        borderColor: c.border,
      }}
      className="rounded-full border px-2 py-0.5 font-sans text-xs font-semibold"
    >
      {id}
    </button>
  )
}

function EchoPill({ echo, withVerse }) {
  const s = ECHO_STYLE[echo.type]
  return (
    <span
      style={{ background: s.bg, color: s.text, borderColor: s.border }}
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-sans text-xs"
    >
      <b aria-hidden="true">{s.sym}</b>
      <span>{echo.q} · <i>{echo.word}</i> · {s.tag}{withVerse && ` · 1.1.${echo.n}`}</span>
    </span>
  )
}

function GoldmanBlock({ start, off }) {
  const b = GOLDMAN.blocks.find(x => x.start === start)
  if (!b) return null
  return (
    <aside className={'my-4 rounded-lg border-l-4 border-gold bg-card p-4' + (off ? ' print-only' : '')}>
      <Label className="mb-1 text-gold-ink">
        Goldman, {b.range}
        {b.range !== b.label && <span className="normal-case"> (paragraph {b.label}, cut at 1.1.19)</span>}
      </Label>
      <p>{b.text}</p>
      <Cite id="goldman" />
    </aside>
  )
}

function Translation({ v, kind, off }) {
  const text = kind === 'debroy' ? v.debroy : v.gita
  if (!text) return null
  const name = kind === 'debroy' ? 'Debroy (CE)' : 'Gita Press (vulgate)'
  const gpNote = kind === 'gp' && (v.gitaNote || (v.gpLabel && `Gita Press ${v.gpLabel.replace('GP ', '')}`))
  return (
    <div className={'mt-3 border-t border-line pt-2' + (off ? ' print-only' : '')}>
      <Label className="text-muted">
        {name}
        {gpNote && <span className="font-normal normal-case"> · {gpNote}</span>}
      </Label>
      <p>{text}</p>
      <Cite id={kind} />
    </div>
  )
}

function VerseLink({ v }) {
  const [copied, setCopied] = useState(false)
  const route = `${v.n <= 5 ? '/questions' : '/answers'}?v=${v.ce}`
  const copy = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${route}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      window.prompt('Copy this link', url)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <>
      <Link to={route} className="text-sm font-semibold hover:underline">{v.ce}</Link>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy link to verse ${v.ce}`}
        title="Copy link to this verse"
        className="no-print rounded px-1 text-xs text-muted hover:bg-accent-soft hover:text-accent"
      >
        ¶
      </button>
      {copied && <span role="status" className="text-xs text-accent">Link copied</span>}
    </>
  )
}

// Devanāgarī stems for the artefact's echo words, used only to find the word in the line.
const ECHO_DEV = {
  dyutimān: 'द्युतिमान्', dharmajña: 'धर्मज्ञ', smṛtimān: 'स्मृतिमान्',
  priyadarśana: 'प्रियदर्शन', vīrya: 'वीर्य', krodha: 'क्रोध',
}

const COMBINING = /[\u0900-\u0903\u093A-\u094F\u0951-\u0957\u0962\u0963]/

// Splits a line into plain text and echo words. `script` is 'iast' or 'dev'.
function markEchoes(line, echoes, script, render) {
  if (!echoes?.length) return line
  const hits = []
  for (const e of echoes) {
    let stem = script === 'dev' ? ECHO_DEV[e.word] : e.word
    let at = stem ? line.indexOf(stem) : -1
    if (at < 0 && script === 'iast') { stem = e.word.slice(0, -1); at = line.indexOf(stem) }
    if (at < 0) continue
    let end = at + stem.length
    if (script === 'dev') {
      // Keep whole akṣara clusters so no conjunct is split across elements.
      while (at > 0 && line[at - 1] === '\u094D') at -= 2
      while (end < line.length && COMBINING.test(line[end])) end++
      if (line[end - 1] === '\u094D' && /[\u0915-\u0939]/.test(line[end] || '')) continue
    }
    hits.push({ at, end, e })
  }
  hits.sort((a, b) => a.at - b.at)
  const out = []
  let pos = 0
  hits.forEach((h, k) => {
    if (h.at < pos) return
    out.push(line.slice(pos, h.at), render(line.slice(h.at, h.end), h.e, k))
    pos = h.end
  })
  out.push(line.slice(pos))
  return out
}

function EchoWord({ text, echo, glow, script, v }) {
  const [pos, setPos] = useState(null)
  const ref = useRef(null)
  const tipId = `tip-${v.n}-${echo.q}-${script}`
  const question = QUESTIONS.find(x => x.id === echo.q)
  const style = ECHO_STYLE[echo.type]
  const open = () => {
    const r = ref.current.getBoundingClientRect()
    const width = Math.min(448, window.innerWidth - 16)
    const left = Math.max(8, Math.min(r.left, window.innerWidth - width - 8))
    const below = r.bottom + 8
    setPos({ left, width, top: below, flip: below > window.innerHeight * 0.55, anchorTop: r.top })
  }
  const close = () => setPos(null)
  useEffect(() => {
    if (!pos) return
    const onKey = e => { if (e.key === 'Escape') { close(); ref.current?.focus() } }
    const onDown = e => { if (!ref.current?.contains(e.target) && !e.target.closest?.('[role="tooltip"]')) close() }
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', close, { passive: true })
    document.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', close)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [pos])
  return (
    <>
      <button
        ref={ref}
        type="button"
        key={glow ? 'g' : 'n'}
        lang={script === 'dev' ? 'sa-Deva' : 'sa-Latn'}
        className={'echo-word' + (glow ? ' echo-glow' : '')}
        aria-describedby={pos ? tipId : undefined}
        aria-expanded={!!pos}
        onClick={() => (pos ? close() : open())}
        onPointerEnter={e => { if (e.pointerType === 'mouse') open() }}
        onPointerLeave={e => { if (e.pointerType === 'mouse') close() }}
        onFocus={e => { if (e.target.matches(':focus-visible')) open() }}
        onBlur={close}
      >
        {text}
      </button>
      {pos && (
        <span
          id={tipId}
          role="tooltip"
          className="echo-tip fixed z-50 block rounded-lg border border-line bg-card p-3 text-left font-sans text-sm not-italic text-ink shadow-lg"
          style={pos.flip
            ? { left: pos.left, width: pos.width, bottom: window.innerHeight - pos.anchorTop + 8 }
            : { left: pos.left, width: pos.width, top: pos.top }}
        >
          <span className="flex flex-wrap items-baseline gap-2">
            <span className="font-bold" style={{ color: catOf(echo.q).text }}>{echo.q} · {question.label}</span>
            <span lang="sa-Deva" className="deva">{question.dev}</span>
            <i lang="sa-Latn" className="font-serif">{question.iast}</i>
          </span>
          <span className="block font-serif text-base">{question.text}</span>
          <span className="mt-1 block text-xs" style={{ color: style.text }}>
            <b aria-hidden="true">{style.sym}</b> {style.tag} echo of <i>{echo.word}</i> at {v.ce}
          </span>
          {(v.debroy || v.gita) && (
            <span className="mt-2 grid grid-cols-1 gap-2 border-t border-line pt-2 min-[400px]:grid-cols-2">
              {v.debroy && (
                <span className="block">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-muted">Debroy</span>
                  <span className="block font-serif">{v.debroy}</span>
                </span>
              )}
              {v.gita && (
                <span className="block">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-muted">Gita Press</span>
                  <span className="block font-serif">{v.gita}</span>
                </span>
              )}
            </span>
          )}
        </span>
      )}
    </>
  )
}

function Verse({ v, layers, q, setQ, spotlight, target }) {
  const lit = q && v.answers.includes(q)
  const dim = spotlight && q && !lit
  const lines = QUESTION_LINES[v.n]
  return (
    <article
      id={`v${v.n}`}
      className={
        'verse my-4 scroll-mt-16 rounded-lg border bg-card p-4 ' +
        (lit ? 'border-accent shadow-md' : 'border-line') +
        (dim ? ' dimmed' : '') +
        (target ? ' ring-2 ring-gold ring-offset-2 ring-offset-paper' : '')
      }
    >
      <header className="rv mb-2 flex flex-wrap items-baseline gap-2 font-sans" style={{ '--i': 0 }}>
        <VerseLink v={v} />
        {v.gpLabel && <span className="text-xs text-muted">{v.gpLabel}</span>}
        {lines && <span className="text-xs text-muted">{lines.range}</span>}
        <span className="ml-auto flex flex-wrap gap-1">
          {v.answers.map(id => (
            <QBadge key={id} id={id} active={q === id} onClick={() => setQ(q === id ? null : id)} />
          ))}
        </span>
      </header>

      {[0, 1].map(i => (
        <div key={i} className="rv mb-1" data-line={i + 1} style={{ '--i': i + 1 }}>
          <p lang="sa-Deva" className="deva text-xl">
            {markEchoes(v.dev[i], v.echoes, 'dev', (t, e, k) => <EchoWord key={k} text={t} echo={e} glow={q === e.q} script="dev" v={v} />)}
          </p>
          <p lang="sa-Latn" className="italic text-muted">
            {markEchoes(v.iast[i], v.echoes, 'iast', (t, e, k) => <EchoWord key={k} text={t} echo={e} glow={q === e.q} script="iast" v={v} />)}
          </p>
          {lines && (
            <p className="mt-1 flex flex-wrap gap-1">
              {lines.lines[i].map(id => (
                <QBadge key={id} id={id} active={q === id} onClick={() => setQ(q === id ? null : id)} />
              ))}
            </p>
          )}
        </div>
      ))}

      <div className="rv" style={{ '--i': 3 }}>
      {v.echoes && (
        <p className="mt-2 flex flex-wrap gap-1">
          {v.echoes.map(e => <EchoPill key={e.q + e.word} echo={e} />)}
        </p>
      )}

      {v.gpOnly && (
        <div className="mt-3 rounded bg-gp p-3 text-muted">
          <Label className="mb-1">Gita Press reading, not in the CE constituted text</Label>
          {v.gpOnly.map(r => (
            <div key={r.gp} className="mb-1">
              <span className="font-sans text-xs font-semibold">{r.gp}</span>{' '}
              <span lang="sa-Deva" className="deva">{r.dev}</span>
              <br />
              <i lang="sa-Latn">{r.iast}</i>
            </div>
          ))}
        </div>
      )}

      <Translation v={v} kind="debroy" off={!layers.debroy} />
      <Translation v={v} kind="gp" off={!layers.gp} />

      {lines?.note && <p className="mt-3 font-sans text-sm text-muted">{lines.note}</p>}
      {v.note && <p className="mt-3 border-l-2 border-line pl-3 font-sans text-sm text-muted">{v.note}</p>}
      {v.divergenceNote && (
        <div className="mt-3 rounded border border-[#fca5a5] bg-[#fee2e2] p-3 font-sans text-sm text-[#7f1d1d]">
          <Label className="mb-1">Edition divergence ⚠</Label>
          {v.divergenceNote}
        </div>
      )}
      </div>
    </article>
  )
}

function PatternCard({ p }) {
  const rows = p.echoType
    ? VERSES.flatMap(v => (v.echoes || []).filter(e => e.type === p.echoType).map(e => ({ n: v.n, ...e })))
    : []
  return (
    <aside className="my-4 rounded-lg border border-dashed border-gold bg-paper p-4">
      <Label className="text-gold-ink">Pattern</Label>
      <h3 className="text-lg font-semibold">{p.title}</h3>
      {rows.length > 0 && (
        <p className="my-2 flex flex-wrap gap-1">
          {rows.map(e => <EchoPill key={e.n + e.word} echo={e} withVerse />)}
        </p>
      )}
      <p>{p.body}</p>
    </aside>
  )
}

function QuestionCards({ q, setQ }) {
  return (
    <section aria-labelledby="sixteen" className="my-8">
      <h2 id="sixteen" className="text-2xl font-semibold">The sixteen questions</h2>
      <p className="font-sans text-sm text-muted">
        Sixteen qualities asked across three ślokas, 1.1.2–4, spread 6 + 5 + 5. Tap a card to select it,
        then open Answers to see every verse that answers it.
      </p>
      <ol className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {QUESTIONS.map(x => {
          const c = catOf(x.id)
          const hits = answersFor(x.id)
          const sel = q === x.id
          return (
            <li key={x.id}>
              <div
                style={{ background: c.bg, borderColor: sel ? c.text : c.border }}
                className={'h-full rounded-lg border p-3 ' + (sel ? 'ring-2 ring-offset-1' : '')}
              >
                <button
                  type="button"
                  onClick={() => setQ(sel ? null : x.id)}
                  aria-pressed={sel}
                  className="w-full text-left"
                >
                  <span className="flex items-baseline justify-between font-sans text-xs" style={{ color: c.text }}>
                    <span className="font-bold">{x.id} · {x.label}</span>
                    <span>1.1.{x.v}</span>
                  </span>
                  <span lang="sa-Deva" className="deva block text-xl">{x.dev}</span>
                  <span lang="sa-Latn" className="block italic">{x.iast}</span>
                  <span className="block text-base">{x.text}</span>
                </button>
                <p className="mt-2 flex flex-wrap gap-1 font-sans text-xs">
                  {hits.length ? (
                    hits.map(n => (
                      <Link
                        key={n}
                        to={`/answers?q=${x.id}`}
                        style={{ color: c.text, borderColor: c.border }}
                        className="rounded border bg-white/60 px-2 py-0.5 font-semibold"
                      >
                        1.1.{n}
                      </Link>
                    ))
                  ) : (
                    <span className="italic" style={{ color: c.text }}>Not directly answered</span>
                  )}
                </p>
                {echoesFor(x.id).length > 0 && (
                  <p className="mt-1 flex flex-wrap gap-1">
                    {echoesFor(x.id).map(e => <EchoPill key={e.n + e.word} echo={e} withVerse />)}
                  </p>
                )}
                {x.alert && <p className="mt-2 font-sans text-xs italic" style={{ color: c.text }}>↳ {x.alert}</p>}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function Coverage() {
  return (
    <section aria-labelledby="coverage" className="my-8">
      <h2 id="coverage" className="text-2xl font-semibold">Coverage checklist</h2>
      <p className="font-sans text-sm text-muted">
        For each of the sixteen questions, the verses that answer it, and any place where the answer repeats
        the question’s exact word. Where a question has no verse listed, it is never answered directly.
      </p>
      <ul className="mt-3 space-y-2">
        {QUESTIONS.map(x => {
          const c = catOf(x.id)
          const hits = answersFor(x.id)
          return (
            <li key={x.id} style={{ background: c.bg, borderColor: c.border }} className="rounded-lg border p-3">
              <p className="flex flex-wrap items-baseline gap-2">
                <span className="font-sans text-xs font-bold" style={{ color: c.text }}>{x.id}</span>
                <span lang="sa-Deva" className="deva text-lg">{x.dev}</span>
                <i>{x.iast}</i>
              </p>
              <p className="font-sans text-xs" style={{ color: c.text }}>
                {hits.length ? hits.map(n => `1.1.${n}`).join(' · ') : <i>Not directly answered</i>}
              </p>
              {echoesFor(x.id).length > 0 && (
                <p className="mt-1 flex flex-wrap gap-1">
                  {echoesFor(x.id).map(e => <EchoPill key={e.n + e.word} echo={e} withVerse />)}
                </p>
              )}
              {x.alert && <p className="mt-1 font-sans text-xs italic" style={{ color: c.text }}>↳ {x.alert}</p>}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function Legend() {
  const [open, setOpen] = useState(null)
  const toggle = k => setOpen(open === k ? null : k)
  const active = open && (CATS[open]
    ? { name: CATS[open].label, ...CATS[open] }
    : { name: `${ECHO_STYLE[open].sym} ${ECHO_STYLE[open].tag} echo`, ...ECHO_STYLE[open] })
  return (
    <div className="space-y-2">
      <p className="font-sans text-xs text-muted">Tap any chip to see what it means.</p>
      <div className="flex flex-wrap gap-1.5">
        {Object.entries(CATS).map(([k, c]) => (
          <button key={k} type="button" onClick={() => toggle(k)} aria-pressed={open === k}
            style={{ background: c.bg, color: c.text, borderColor: open === k ? c.text : c.border }}
            className="rounded-full border px-2 py-0.5 font-sans text-xs">{c.label}</button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {Object.entries(ECHO_STYLE).map(([k, s]) => (
          <button key={k} type="button" onClick={() => toggle(k)} aria-pressed={open === k}
            style={{ background: s.bg, color: s.text, borderColor: open === k ? s.text : s.border }}
            className="rounded-full border px-2 py-0.5 font-sans text-xs"><b aria-hidden="true">{s.sym}</b> {s.tag} echo</button>
        ))}
      </div>
      {active && (
        <div role="status" style={{ background: active.bg, color: active.text, borderColor: active.border }} className="rounded-lg border px-3 py-2">
          <p className="font-sans text-xs font-semibold">{active.name}</p>
          <p className="text-sm">{active.desc}</p>
        </div>
      )}
      <ul className="space-y-1 pt-2 font-sans text-xs text-muted">
        <li><b className="text-ink">1.1.8</b> Critical Edition verse number. <b>GP 15</b> marks the Gita Press number where it differs.</li>
        <li><span className="rounded bg-gp px-1">Gita Press reading</span> A vulgate half-line not in the CE constituted text.</li>
        <li><span className="border-l-4 border-gold pl-1">Goldman</span> One paragraph per verse group, shown at the head of the group.</li>
      </ul>
      <p className="font-sans text-xs italic text-muted">
        The nine themes are one way of grouping the questions for this experience, not a classification from the text itself.
      </p>
    </div>
  )
}

const KEY_STORE = 'v16q-key-open'
const readKeyOpen = () => { try { return localStorage.getItem(KEY_STORE) === '1' } catch { return false } }

// The key as a tuck-away sidebar: a vertical tab on the right edge opens it.
// From 1024px it slides in from the right, in the page margin where there is
// room. Below that it is a bottom sheet. Open or closed is remembered per reader.
function KeyPanel({ mode }) {
  const [open, setOpen] = useState(readKeyOpen)
  const [past, setPast] = useState(mode !== 'all')
  const tab = useRef(null)
  const closeBtn = useRef(null)
  const moved = useRef(false)
  useEffect(() => {
    try { localStorage.setItem(KEY_STORE, open ? '1' : '0') } catch { /* storage blocked */ }
    if (!moved.current) return
    if (open) closeBtn.current?.focus()
    else tab.current?.focus()
  }, [open])
  useEffect(() => {
    if (mode !== 'all') return setPast(true)
    // On All the key waits until the reader has left the hero.
    const update = () => setPast(window.scrollY > window.innerHeight * 0.75)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [mode])
  const shown = open && past
  useEffect(() => {
    if (!shown) return
    const onKey = e => {
      if (e.key !== 'Escape' || document.querySelector('[aria-modal="true"], [role="tooltip"]')) return
      moved.current = true
      setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [shown])
  const set = v => { moved.current = true; setOpen(v) }
  return (
    <div className="no-print">
      <button
        ref={tab}
        type="button"
        onClick={() => set(!open)}
        aria-expanded={shown}
        aria-controls="key-panel"
        className={'key-tab fixed right-0 z-30 rounded-l-md border border-r-0 border-gold bg-card px-1.5 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-gold-ink shadow' + (past ? '' : ' is-off')}
      >
        Key
      </button>
      <section
        id="key-panel"
        aria-labelledby="key"
        className={'key-panel fixed z-30 overflow-y-auto border-line bg-card p-4 shadow-xl' + (shown ? ' is-open' : '')}
      >
        <div className="mb-2 flex items-center justify-between">
          <h2 id="key" className="text-lg font-semibold">Key</h2>
          <button ref={closeBtn} type="button" onClick={() => set(false)} className="rounded-full border border-line px-3 py-1 font-sans text-sm hover:bg-accent-soft">
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <Legend />
      </section>
    </div>
  )
}

// Second fold on All: a calm, centred introduction that fades in once.
function Intro() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!('IntersectionObserver' in window)) return el.classList.add('revealed')
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('revealed'); io.disconnect() }
    }, { rootMargin: '0px 0px -12% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <section ref={ref} aria-label="Introduction" className="intro mx-auto max-w-[640px] pb-6 pt-10 sm:pb-10 sm:pt-16">
      <p className="rv text-center font-sans text-xs uppercase tracking-widest text-gold-ink" style={{ '--i': 0 }}>Rāmāyaṇa · Bālakāṇḍa · Sarga 1</p>
      <div className="mt-6 space-y-4 text-lg leading-relaxed sm:text-xl">
        <p className="rv" style={{ '--i': 1 }}>
          The Rāmāyaṇa opens with a question. Before the story begins, the sage Vālmīki asks the sage Nārada
          whether any truly complete person is alive in the world right now, and lists sixteen qualities such
          a person would have. Nārada answers yes: a prince named Rāma, whom he then describes at length. This
          site places those sixteen questions beside Nārada’s answer, so you can see which quality is answered where.
        </p>
        <p className="rv" style={{ '--i': 3 }}>
          Reading the opening this way turns it into a piece of design you can inspect. Some qualities are
          answered many times over, one is never answered directly, and in the Sanskrit the answer sometimes
          repeats the exact word of the question. These patterns show how carefully the epic’s first lines are built.
        </p>
      </div>
      <p aria-hidden="true" className="rv my-8 text-center text-gold" style={{ '--i': 5 }}>· · ·</p>
      <p className="rv font-sans text-sm text-muted" style={{ '--i': 5 }}>
        Each verse appears in the Sanskrit of the Critical Edition (CE), in Devanāgarī and in Roman letters
        (IAST), with three English translations to compare: Robert P. Goldman’s and Bibek Debroy’s (both of the
        CE) and the Gita Press edition’s. A <i>śloka</i> is a verse, and “1.1.8” means Bālakāṇḍa, sarga 1,
        verse 8 in the Critical Edition. Use the menu above to read only the Questions, only the Answers, or
        the Patterns.
      </p>
    </section>
  )
}

const TITLES = {
  questions: ['Questions', 'The sixteen qualities, grouped by the three verses they come from, with the frame verses around them.'],
  answers: ['Answers', 'Nārada’s reply, read verse by verse. The coloured tags mark which of the sixteen questions each verse answers. Tap a tag to spotlight it.'],
  patterns: ['Patterns', 'The notable findings from mapping the questions to the answer, and a checklist of where each question is answered.'],
}

const STOPS = [
  { key: 'frame', label: 'Frame', range: '1.1.1–5', sel: '#v1', depth: 0 },
  { key: 'questions', label: 'Questions', range: '1.1.2–4', sel: '#v2', depth: 1 },
  { key: 'answer', label: 'Answer', range: '1.1.6–19', sel: '#v6', depth: 0 },
  { key: 'pivot', label: 'Pivot', range: '1.1.19b', sel: '#v19 [data-line="2"]', depth: 0 },
]

// Which stop holds verse n (and line), for the active marker.
const stopFor = (n, line) => (n >= 2 && n <= 4 ? 'questions' : n <= 5 ? 'frame' : n === 19 && line === 2 ? 'pivot' : 'answer')

function ProgressRail({ mode }) {
  const [state, setState] = useState({ progress: 0, active: null, shown: mode !== 'all' })
  const [stops, setStops] = useState([])
  useEffect(() => {
    setStops(STOPS.filter(st => document.querySelector(st.sel)))
    let frame = 0
    const update = () => {
      frame = 0
      const arts = [...document.querySelectorAll('article[id^="v"]')]
      if (!arts.length) return
      const startY = arts[0].getBoundingClientRect().top + window.scrollY
      const endY = arts[arts.length - 1].getBoundingClientRect().bottom + window.scrollY
      const mid = window.scrollY + window.innerHeight * 0.4
      const progress = Math.max(0, Math.min(1, (mid - startY) / (endY - startY)))
      let active = null
      for (const a of arts) {
        const r = a.getBoundingClientRect()
        if (r.top > window.innerHeight * 0.4) break
        const n = Number(a.id.slice(1))
        const l2 = a.querySelector('[data-line="2"]')
        active = stopFor(n, l2 && l2.getBoundingClientRect().top < window.innerHeight * 0.4 ? 2 : 1)
      }
      // On All the rail waits until the reader has left the hero.
      const shown = mode !== 'all' || window.scrollY > window.innerHeight * 0.75
      setState(prev => (prev.progress === progress && prev.active === active && prev.shown === shown ? prev : { progress, active, shown }))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [mode])
  if (stops.length < 2) return null
  const jump = st => {
    const el = document.querySelector(st.sel)
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' })
  }
  return (
    <nav aria-label="Reading progress" className={'rail no-print fixed top-1/2 z-10 hidden -translate-y-1/2 lg:block' + (state.shown ? '' : ' is-off')} style={{ left: 'max(12px, calc(50% - 380px - 150px))' }}>
      <div className="relative pl-4">
        <div aria-hidden="true" className="absolute bottom-1 left-0 top-1 w-[3px] rounded bg-line">
          <div className="rail-fill w-full rounded bg-gold" style={{ height: `${(state.progress * 100).toFixed(1)}%` }} />
        </div>
        <ol className="space-y-3 font-sans text-xs">
          {stops.map(st => (
            <li key={st.key} style={{ paddingLeft: st.depth * 12 }}>
              <button
                type="button"
                onClick={() => jump(st)}
                aria-current={state.active === st.key ? 'step' : undefined}
                className={'block rounded px-1 text-left leading-tight hover:bg-accent-soft ' + (state.active === st.key ? 'font-semibold text-accent' : 'text-muted')}
              >
                {st.label}
                <span className="block text-[11px] font-normal">{st.range}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}

export default function Reading({ mode }) {
  const [params, setParams] = useSearchParams()
  const q = params.get('q')
  const target = params.get('v')
  useEffect(() => {
    if (!target) return
    const n = target.split('.')[2]
    const id = requestAnimationFrame(() => document.getElementById(`v${n}`)?.scrollIntoView({ block: 'start' }))
    return () => cancelAnimationFrame(id)
  }, [target, mode])
  useEffect(() => {
    const els = [...document.querySelectorAll('article[id^="v"]:not(.revealed)')]
    if (!('IntersectionObserver' in window)) return els.forEach(e => e.classList.add('revealed'))
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        e.target.classList.add('revealed')
        io.unobserve(e.target)
      }
    }, { rootMargin: '0px 0px -8% 0px' })
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [mode])
  const setQ = id => {
    const next = new URLSearchParams(params)
    if (id) next.set('q', id)
    else next.delete('q')
    setParams(next, { replace: true })
  }
  const [layers, setLayers] = useState({ goldman: true, debroy: true, gp: true })
  const [presenting, setPresenting] = useState(false)
  const startPresent = () => {
    const nav = document.querySelector('nav')?.getBoundingClientRect().bottom || 0
    const el = [...document.querySelectorAll('article[id^="v"]')].find(a => a.getBoundingClientRect().bottom > nav + 60)
    setPresenting(target ? Number(target.split('.')[2]) : el ? Number(el.id.slice(1)) : true)
  }
  const endPresent = n => {
    setPresenting(false)
    const next = new URLSearchParams(params)
    next.set('v', `1.1.${n}`)
    setParams(next, { replace: true })
    requestAnimationFrame(() => document.getElementById(`v${n}`)?.scrollIntoView({ block: 'start' }))
  }
  const markLine = (v, k, script) => markEchoes(
    script === 'dev' ? v.dev[k] : v.iast[k], v.echoes, script,
    (t, e, j) => <EchoWord key={j} text={t} echo={e} glow={q === e.q} script={script} v={v} />,
  )

  if (mode === 'patterns') {
    return (
      <div className="py-6">
        <h1 className="text-4xl font-semibold">{TITLES.patterns[0]}</h1>
        <p className="mt-2 text-muted">{TITLES.patterns[1]}</p>
        <KeyPanel mode={mode} />
        {PATTERNS.map(p => <PatternCard key={p.id} p={p} />)}
        <Coverage />
      </div>
    )
  }

  const nums = mode === 'questions' ? [1, 2, 3, 4, 5] : mode === 'answers' ? VERSES.filter(v => v.n >= 6).map(v => v.n) : VERSES.map(v => v.n)
  let lastPhase = null

  return (
    <div className="py-2">
      <ProgressRail mode={mode} />
      <KeyPanel mode={mode} />
      {presenting && (
        <Present nums={nums} start={typeof presenting === 'number' ? presenting : nums[0]} layers={layers} q={q} markLine={markLine} onClose={endPresent} />
      )}
      {mode === 'all' ? (
        <>
          <Intro />
        </>
      ) : (
        <div className="py-6">
          <h1 className="text-4xl font-semibold">{TITLES[mode][0]}</h1>
          <p className="mt-2 text-muted">{TITLES[mode][1]}</p>
        </div>
      )}

      <fieldset className="no-print z-10 -mx-4 sm:sticky sm:top-[49px] my-4 flex flex-wrap items-center gap-2 bg-paper/95 px-4 py-2 font-sans text-sm backdrop-blur">
        <legend className="sr-only">English translations to show</legend>
        <span className="text-muted" aria-hidden="true">English:</span>
        {LAYERS.map(([k, label]) => (
          <label key={k} className="flex cursor-pointer items-center gap-1 rounded-full border border-line bg-card px-3 py-1">
            <input
              type="checkbox"
              checked={layers[k]}
              onChange={() => setLayers({ ...layers, [k]: !layers[k] })}
              className="accent-[#9a3f1c]"
            />
            {label}
          </label>
        ))}
        <button type="button" onClick={startPresent} className="ml-auto rounded-full bg-ink px-3 py-1 text-paper" aria-haspopup="dialog">
          Present
        </button>
        {q && (
          <span className="flex items-center gap-1">
            <QBadge id={q} active onClick={() => setQ(null)} />
            <i>{QUESTIONS.find(x => x.id === q)?.iast}</i>
            <button type="button" className="underline" onClick={() => setQ(null)}>Clear</button>
          </span>
        )}
      </fieldset>

      {nums.map(n => {
        const v = VERSES.find(x => x.n === n)
        const phaseHead = v.phase !== lastPhase && PHASE_LABELS[v.phase]
        lastPhase = v.phase
        return (
          <div key={n}>
            {n === 1 && <h2 className="mt-8 text-3xl font-semibold">Vālmīki asks</h2>}
            {n === 6 && <h2 className="mt-10 text-3xl font-semibold">Nārada answers</h2>}
            {phaseHead && <Label className="mt-6 text-gold-ink">{phaseHead}</Label>}
            <GoldmanBlock start={n} off={!layers.goldman} />
            <Verse v={v} layers={layers} q={q} setQ={setQ} spotlight={mode !== 'questions'} target={target === v.ce} />
            {mode === 'all' && PATTERNS.filter(p => p.after === n).map(p => <PatternCard key={p.id} p={p} />)}
            {n === 5 && mode !== 'answers' && <QuestionCards q={q} setQ={setQ} />}
          </div>
        )
      })}
    </div>
  )
}
