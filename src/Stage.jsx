import { Fragment, memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { STORY, QUALITIES, CATS, CITES, COPY, NOTES, VERSE_NOTE, AUDIO_ENABLED, qualityOf } from './content.js'
import { partAt, Footer } from './Shell.jsx'
import Lines, { tie, useFit } from './Lines.jsx'
import Hero from './Hero.jsx'
import Board from './Board.jsx'
import Matrix from './Matrix.jsx'
import Controls, { TRANS } from './Controls.jsx'
import { AuthorHead, AuthorPart } from './Author.jsx'
import { useVerseAudio } from './audio.js'

export const motionOn = () => document.documentElement.classList.contains('motion')
const clamp = x => Math.max(0, Math.min(1, x))

const DEV_DIGITS = '०१२३४५६७८९'
const devNum = n => String(n).replace(/\d/g, d => DEV_DIGITS[d])

// Scroll within a verse's run: words light over LIT_FROM–LIT_TO, then its
// note (if it has one) at NOTE_AT.
const LIT_FROM = 0.05
const LIT_TO = 0.66
const NOTE_AT = 0.76
const litAt = (v, p) => (p < LIT_FROM ? 0 : Math.min(v.total, Math.floor(((p - LIT_FROM) / (LIT_TO - LIT_FROM)) * v.total) + 1))
const pForLit = (v, k) => (k <= 0 ? 0.01 : LIT_FROM + ((k - 1) / v.total) * (LIT_TO - LIT_FROM) + 0.004)

const line2Start = v => v.lines[0].length
const EYEBROW = (v, k) =>
  v.n === 1 ? 'I · The Frame'
    : v.n <= 4 ? 'II · The Sixteen Questions'
      : v.n <= 7 ? 'III · The Frame'
        : v.n === 19 && k > line2Start(v) ? 'V · The Story Begins'
          : 'IV · Nārada’s Answer'

// ─── The timeline: one pinned stage, a list of beats ────────────────────────
// `len` is the scroll length of a beat in screens.
function beatsFor(view, narrow) {
  const run = narrow ? 1 : 1.4
  const verse = v => ({ id: 'v' + v.n, type: 'verse', v, len: run + (VERSE_NOTE[v.n] ? 0.35 : 0) })
  if (view === 'questions') return [...STORY.slice(1, 4).map(verse), { id: 'qfold', type: 'qfold', len: 0.6 }]
  if (view === 'answers') return [...STORY.slice(7).map(verse), { id: 'matrix', type: 'matrix', len: 0.6 }]
  return [
    { id: 'hero', type: 'hero', len: 1 },
    ...COPY.fold.map((lines, j) => ({ id: 'fold' + j, type: 'fold', lines, len: 0.7 })),
    { id: 'scatter', type: 'scatter', len: 1.5 },
    ...STORY.map(verse),
    { id: 'none', type: 'none', len: 0.7 },
    { id: 'matrix', type: 'matrix', len: 1 },
    { id: 'author', type: 'author', len: 0.8 },
    { id: 'colophon', type: 'colophon', len: 0.5 },
  ]
}

const TRANS_KEY = 'v16q-translation'
const readTrans = () => { try { const t = localStorage.getItem(TRANS_KEY); return TRANS.some(([k]) => k === t) ? t : 'goldman' } catch { return 'goldman' } }

// ─── Beats ──────────────────────────────────────────────────────────────────

function Translation({ v, which }) {
  const missing = which === 'debroy' && !v.debroy
  const text = which === 'debroy' && v.debroy ? v.debroy : v.goldman.text
  const src = missing ? 'goldman' : which
  return (
    <>
      <p className="stage-trans-text">{tie(text)}</p>
      <p className="stage-trans-meta">
        {src === 'goldman' ? <>Goldman (CE) · <span className="italic">verse split by MYT, draft</span> · </> : <>Debroy (CE) · </>}
        <Link to={`/sources?ref=${src}`} className="underline whitespace-nowrap">{CITES[src]}</Link>
        {missing && <span className="ln">{tie(COPY.debroy)}</span>}
      </p>
    </>
  )
}

function Note({ note, lens, on }) {
  return (
    <div className={'vs-note' + (on ? ' is-on' : '')} aria-hidden={!on}>
      <Lines lines={NOTES[note]} />
      <Link to={lens ? `/patterns?lens=${lens}` : '/patterns'} tabIndex={on ? 0 : -1} className="note-link caps">{COPY.patternsLink}</Link>
    </div>
  )
}

// One verse, anchored at the exact centre of the screen. `k` is how many
// words are lit. Lighting is visual only: the full verse is in the page for
// screen readers.
const VerseBeat = memo(function VerseBeat({ v, k, on, note, which, vulgate }) {
  const below = useRef(null)
  // The English and the note share the space under the verse. On small
  // screens they scale down a little to fit it, in place.
  useFit(below, el => {
    const stage = el.closest('.tl-stage')
    const verse = el.parentElement
    return stage.clientHeight / 2 - verse.offsetHeight / 2 - (window.innerWidth < 768 ? 56 : 64)
  }, [which])
  const nd = VERSE_NOTE[v.n]
  return (
    <section className={'beat beat-verse' + (on ? ' is-on' : '')} aria-hidden={!on} aria-labelledby={`st${v.n}`}>
      <div className="vs">
        <div className="vs-above">
          <p className="stage-eyebrow caps" aria-hidden="true">{EYEBROW(v, k)}</p>
          <p className="stage-cite caps">Vālmīki Rāmāyaṇa {v.ce} · Critical{' '}Edition</p>
        </div>
        <h2 id={`st${v.n}`} className="sr-only">Verse {v.ce}</h2>
        <div className="stage-verse">
          {v.lines.map((line, li) => (
            <p key={li} className="stage-line">
              {line.map((u, ui) => {
                const st = u.k < k ? (on && u.k === k - 1 && k < v.total ? ' is-now' : ' is-lit') : ''
                const unit = (
                  <span key={u.k} className={'u' + st}>
                    <span aria-hidden="true" className="u-d" lang="sa-Deva">{u.d}</span>
                    <span aria-hidden="true" className="u-i" lang="sa-Latn">{u.i}</span>
                  </span>
                )
                // A space between units gives balanced wrapping its break points.
                if (ui < line.length - 1) return <Fragment key={u.k}>{unit}{' '}</Fragment>
                // The last word and its daṇḍa never part across a wrap.
                return (
                  <span key={u.k} className="u-last">
                    {unit}
                    <span aria-hidden="true" className={'danda' + (k >= v.total && li === 1 ? ' is-lit' : li === 0 && k > line2Start(v) ? ' is-lit' : '')}>
                      {li === 0 ? '।' : `॥ ${devNum(v.n)} ॥`}
                    </span>
                  </span>
                )
              })}
            </p>
          ))}
          <p lang="sa-Deva" className="sr-only">{v.lines.map(l => l.map(u => u.d).join(' ')).join(' । ')} ॥</p>
          <p lang="sa-Latn" className="sr-only">{v.lines.map(l => l.map(u => u.i).join(' ')).join(' / ')}</p>
        </div>
        <div ref={below} className={'vs-below' + (nd ? ' has-note' : '') + (note ? ' note-on' : '')}>
          {v.audio?.vulgate.length > 0 && (
            <div className="vs-vulgate" aria-live="off">
              {v.audio.vulgate.map((w, j) => (
                <p key={j} className={vulgate === j ? 'is-on' : ''} aria-hidden={vulgate !== j}>
                  <span className="vs-vlabel caps">{COPY.vulgate}</span>
                  <i lang="sa-Latn">{w.iast}</i>
                </p>
              ))}
            </div>
          )}
          <div className="vs-pair">
            <div className={'stage-trans' + (k >= 1 ? ' is-on' : '')}>
              <Translation v={v} which={which} />
            </div>
            {nd && <Note note={nd.note} lens={nd.lens} on={note} />}
          </div>
        </div>
      </div>
    </section>
  )
})

// Beat 4a: the sixteen qualities, scattered, one at a time, in dim gold.
// Offsets are fixed, so the scatter is the same on every visit.
const JIT = [[-18, 10], [14, -22], [-6, 24], [20, 6], [8, -14], [-22, -4], [16, 20], [-10, -24], [22, -10], [-14, 16], [4, 26], [-24, 2], [12, -6], [-4, -18], [18, 14], [-16, -12]]
const ORDER = [5, 12, 0, 9, 3, 14, 7, 1, 10, 15, 4, 8, 13, 2, 11, 6]
function Scatter({ count, on }) {
  return (
    <section className={'beat beat-scatter' + (on ? ' is-on' : '')} aria-hidden={!on} aria-label="The sixteen qualities">
      <ul className="scatter">
        {QUALITIES.map((q, j) => (
          <li key={q.id} className={ORDER.indexOf(j) < count ? 'is-in' : ''} style={{ left: JIT[j][0] * 0.4 + '%', top: JIT[j][1] * 0.4 + '%' }}>
            <span lang="sa-Deva" className="deva">{q.dev}</span>
            <i lang="sa-Latn">{q.short}</i>
          </li>
        ))}
      </ul>
    </section>
  )
}

// Questions, closing fold: the three question verses together, every quality
// word lit in its colour. Tapping a quality shows its full form and gloss.
function QuestionsFold({ on, which }) {
  const [sel, setSel] = useState(null)
  const ref = useRef(null)
  useFit(ref, el => el.closest('.tl-stage').clientHeight - 112, [])
  const q = sel && qualityOf(sel)
  return (
    <section className={'beat beat-fit' + (on ? ' is-on' : '')} aria-hidden={!on} aria-labelledby="qfold-title">
      <div ref={ref} className="qf">
        <h2 id="qfold-title" className="qf-title">{tie(COPY.questionsFold)}</h2>
        <p className="qf-detail" aria-live="polite">
          {q ? (
            <>
              <span aria-hidden="true" className="slot-dot" style={{ '--c': CATS[q.cat].dot, background: CATS[q.cat].dot }} />
              <i lang="sa-Latn">{q.full}</i> · <span lang="sa-Deva" className="deva">{q.fullDev}</span> · {q.gloss}
            </>
          ) : ' '}
        </p>
        {STORY.slice(1, 4).map(v => (
          <div key={v.n} className="qf-verse">
            {v.lines.map((line, li) => (
              <p key={li} className="qf-line">
                {line.map(u => {
                  const body = <><span lang="sa-Deva" className="u-d">{u.d}</span><span lang="sa-Latn" className="u-i">{u.i}</span></>
                  return (
                    <Fragment key={u.k}>
                      {u.q
                        ? <button type="button" tabIndex={on ? 0 : -1} className="u qf-q" aria-pressed={sel === u.q} style={{ '--t': CATS[qualityOf(u.q).cat].text, '--c': CATS[qualityOf(u.q).cat].dot }} onClick={() => setSel(sel === u.q ? null : u.q)}>{body}</button>
                        : <span className="u is-lit">{body}</span>}{' '}
                    </Fragment>
                  )
                })}
                <span aria-hidden="true" className="danda is-lit">{li === 0 ? '।' : `॥ ${devNum(v.n)} ॥`}</span>
              </p>
            ))}
            <p className="qf-en">{tie(v.goldman.text)}</p>
          </div>
        ))}
        {which === 'debroy' && <p className="qf-note">{tie(COPY.debroy)}</p>}
      </div>
    </section>
  )
}

function Fit({ on, room = 112, children, ...rest }) {
  const ref = useRef(null)
  useFit(ref, el => el.closest('.tl-stage').clientHeight - room, [])
  return (
    <section className={'beat beat-fit' + (on ? ' is-on' : '')} aria-hidden={!on} {...rest}>
      <div ref={ref} className="fit">{children}</div>
    </section>
  )
}

// Decorative layer: a warm lamp glow, a few slow motes (sideways drift only)
// and faint palm-leaf edges at the margins. No motes under reduced motion.
const MOTES = [[12, 68, 19, 0], [27, 34, 26, 5], [44, 80, 22, 9], [58, 22, 30, 2], [71, 61, 24, 12], [84, 40, 28, 7], [91, 76, 21, 15]]
const Decor = () => (
  <div aria-hidden="true" className="decor no-print">
    <div className="lamp" />
    <div className="leaf leaf-l" />
    <div className="leaf leaf-r" />
    {MOTES.map(([x, y, d, w], j) => <span key={j} className="mote" style={{ left: x + '%', top: y + '%', animationDuration: d + 's', animationDelay: -w + 's' }} />)}
  </div>
)

// ─── The stage ──────────────────────────────────────────────────────────────

export default function Stage({ view }) {
  const track = useRef(null)
  const stage = useRef(null)
  const [narrow, setNarrow] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const on = () => setNarrow(window.innerWidth < 768)
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  const tl = useMemo(() => {
    const beats = beatsFor(view, narrow)
    const starts = []
    let total = 0
    for (const b of beats) { starts.push(total); total += b.len }
    return { beats, starts, total }
  }, [view, narrow])

  // Scroll position (page y) of progress p inside beat i.
  const yFor = useCallback((i, p) => {
    const el = track.current
    if (!el) return null
    const run = el.offsetHeight - window.innerHeight
    return Math.round(el.offsetTop + (run * (tl.starts[i] + tl.beats[i].len * p)) / tl.total)
  }, [tl])

  // Which beat is on stage, and its state. One rAF-throttled scroll handler.
  const [st, setSt] = useState({ i: 0, k: 0, note: false })
  useLayoutEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = track.current
      const run = el.offsetHeight - window.innerHeight
      const g = clamp((window.scrollY - el.offsetTop) / run) * tl.total
      let i = tl.beats.length - 1
      while (i > 0 && tl.starts[i] > g) i--
      const b = tl.beats[i]
      const p = clamp((g - tl.starts[i]) / b.len)
      let k = 0
      let note = false
      if (b.type === 'verse') { k = litAt(b.v, p); note = p >= NOTE_AT }
      else if (b.type === 'scatter') k = p < 0.04 ? 0 : Math.min(16, Math.ceil(((p - 0.04) / 0.7) * 16))
      else if (b.type === 'hero') {
        // The hero's overlay and title follow the scroll directly.
        stage.current.style.setProperty('--ov', (clamp(p / 0.35) * 0.6).toFixed(3))
        stage.current.style.setProperty('--tt', clamp((p - 0.3) / 0.3).toFixed(3))
        k = window.scrollY > 8 ? 1 : 0
      }
      setSt(prev => (prev.i === i && prev.k === k && prev.note === note ? prev : { i, k, note }))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [tl])

  const [which, setWhichState] = useState(readTrans)
  const setWhich = useCallback(t => { setWhichState(t); try { localStorage.setItem(TRANS_KEY, t) } catch { /* storage blocked */ } }, [])

  const cur = tl.beats[st.i]
  const verse = cur.type === 'verse' ? cur.v : null

  // Audio: verse windows, and the sync that moves the scroll with the voice.
  const [sound, setSoundState] = useState(false)
  const yForK = useCallback(k => (verse ? yFor(st.i, pForLit(verse, k)) : null), [verse, st.i, yFor])
  const { vulgate, unlock } = useVerseAudio(AUDIO_ENABLED && sound, verse, yForK)
  const setSound = useCallback(on => { if (on) unlock(); setSoundState(on) }, [unlock])

  // Deep links: ?v=1.1.14 opens that verse fully lit. ?at=answer opens a part.
  const [params] = useSearchParams()
  const target = params.get('v')
  const at = params.get('at')
  useLayoutEffect(() => {
    const i = target ? tl.beats.findIndex(b => b.v?.ce === target) : -1
    if (i >= 0) window.scrollTo(0, yFor(i, 0.9))
    else if (at && partAt[at]) window.scrollTo(0, partAt[at]())
  }, [target, at]) // eslint-disable-line react-hooks/exhaustive-deps

  // Where each part of the Conversation starts, for the pager.
  useEffect(() => {
    if (view !== 'conversation') return
    const at = (id, p = 0.02) => () => yFor(tl.beats.findIndex(b => b.id === id), p)
    Object.assign(partAt, {
      frame: at('fold0'), questions: at('v2'), answer: at('v8'),
      story: at('v19', pForLit(STORY[18], line2Start(STORY[18]) + 1)),
      overview: at('matrix'), author: at('author'),
    })
    return () => { for (const k of Object.keys(partAt)) delete partAt[k] }
  }, [view, tl, yFor])

  const boardOn = verse && (view !== 'conversation' || verse.n >= 2)
  const vn = verse ? verse.n : view === 'answers' ? 20 : 1

  return (
    <div ref={track} className="tl-track" style={{ '--len': tl.total }}>
      <div ref={stage} className={'tl-stage' + (boardOn ? ' has-board' : '')}>
        <Decor />
        {tl.beats.map((b, j) => {
          if (Math.abs(j - st.i) > 1) return null
          const on = j === st.i
          if (b.type === 'hero') return <Hero key={b.id} on={on} scrolled={st.k > 0 || !on} onNext={() => window.scrollTo({ top: yFor(j, 0.75), behavior: motionOn() ? 'smooth' : 'auto' })} />
          if (b.type === 'fold') return (
            <section key={b.id} className={'beat' + (on ? ' is-on' : '')} aria-hidden={!on}>
              <Lines lines={b.lines} className="fold-copy" />
            </section>
          )
          if (b.type === 'scatter') return <Scatter key={b.id} on={on} count={on ? st.k : j < st.i ? 16 : 0} />
          if (b.type === 'verse') return (
            <VerseBeat key={b.id} v={b.v} on={on} k={on ? st.k : j < st.i ? b.v.total : 0} note={on ? st.note : j < st.i} which={which} vulgate={on ? vulgate : -1} />
          )
          if (b.type === 'none') return (
            <section key={b.id} className={'beat' + (on ? ' is-on' : '')} aria-hidden={!on}>
              <div className="lone-note"><Note note="none" lens="none" on={on} /></div>
            </section>
          )
          if (b.type === 'matrix') return <Fit key={b.id} on={on} aria-label={COPY.matrixTitle}><Matrix /></Fit>
          if (b.type === 'qfold') return <QuestionsFold key={b.id} on={on} which={which} />
          if (b.type === 'author') return <Fit key={b.id} on={on} aria-labelledby="author-name"><AuthorHead /></Fit>
          return <Fit key={b.id} on={on}><AuthorPart /><Footer /></Fit>
        })}
        <Board n={vn} k={verse ? st.k : 0} allAsked={view === 'answers'} shown={!!boardOn} />
        <Controls which={which} setWhich={setWhich} sound={sound} setSound={setSound} />
      </div>
      <Transcript view={view} which={which} />
    </div>
  )
}

// The whole text of the view, in order, for screen readers and for print.
// The stage shows one beat at a time, so this is where the page can be read
// straight through.
function Transcript({ view }) {
  const verses = view === 'questions' ? STORY.slice(1, 4) : view === 'answers' ? STORY.slice(7) : STORY
  return (
    <section aria-label="Full text" className="transcript sr-only">
      {view === 'conversation' && COPY.fold.map((l, j) => <p key={j}>{l.join(' ')}</p>)}
      {verses.map(v => (
        <div key={v.n} className="transcript-verse">
          <h3>Vālmīki Rāmāyaṇa {v.ce}</h3>
          <p lang="sa-Deva" className="deva">{v.dev.join(' ')}</p>
          <p lang="sa-Latn"><i>{v.iast.join(' / ')}</i></p>
          <p>{v.goldman.text}</p>
          {VERSE_NOTE[v.n] && <p>{NOTES[VERSE_NOTE[v.n].note].join(' ')}</p>}
        </div>
      ))}
      {view !== 'questions' && <p>{NOTES.none.join(' ')}</p>}
    </section>
  )
}
