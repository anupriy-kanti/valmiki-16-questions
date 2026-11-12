import { Fragment, memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { STORY, QUALITIES, CATS, CITES, COPY, NOTES, VERSE_NOTE, AUDIO_ENABLED, qualityOf } from './content.js'
import { Footer } from './Shell.jsx'
import Lines, { tie, useFit, English } from './Lines.jsx'
import Hero from './Hero.jsx'
import Rail from './Rail.jsx'
import Matrix from './Matrix.jsx'
import Controls, { TRANS } from './Controls.jsx'
import { AuthorHead, CopyLink } from './Author.jsx'
import { useVerseClock } from './audio.js'
import { T, checkpoints, useSteps, stageInfo, motionOn } from './steps.js'

const DEV_DIGITS = '०१२३४५६७८९'
const devNum = n => String(n).replace(/\d/g, d => DEV_DIGITS[d])

const line2Start = v => v.lines[0].length
const EYEBROW = (v, k) =>
  v.n === 1 ? 'I · The Frame'
    : v.n <= 4 ? 'II · The Sixteen Questions'
      : v.n <= 7 ? 'III · The Frame'
        : v.n === 19 && k > line2Start(v) ? 'V · The Story Begins'
          : 'IV · Nārada’s Answer'

// ─── The timeline: one stage, a list of beats ───────────────────────────────
// Each beat is one checkpoint, except a verse, which has three or four
// (MILESTONE-06 §3).
function beatsFor(view) {
  const verse = v => ({ id: 'v' + v.n, type: 'verse', v })
  const fold = (lines, j) => ({ id: 'fold' + j, type: 'fold', lines })
  if (view === 'questions') return [...STORY.slice(1, 4).map(verse), { id: 'qfold', type: 'qfold' }]
  if (view === 'answers') return [...STORY.slice(7).map(verse), { id: 'matrix', type: 'matrix' }]
  return [
    { id: 'hero', type: 'hero' },
    ...COPY.fold.slice(0, COPY.foldScatterAfter).map(fold),
    { id: 'scatter', type: 'scatter' },
    ...COPY.fold.slice(COPY.foldScatterAfter).map((l, j) => fold(l, j + COPY.foldScatterAfter)),
    ...STORY.map(verse),
    { id: 'none', type: 'none' },
    { id: 'matrix', type: 'matrix' },
    { id: 'author', type: 'author' },
    { id: 'colophon', type: 'colophon' },
  ]
}
const hasNote = v => !!VERSE_NOTE[v.n]

// Screens under SHORT px tall may set the verse smaller, down to VZ_MIN of its size.
const SHORT = 700
const VZ_MIN = 0.6

const TRANS_KEY = 'v16q-translation'
const readTrans = () => { try { const t = localStorage.getItem(TRANS_KEY); return TRANS.some(([k]) => k === t) ? t : 'goldman' } catch { return 'goldman' } }

// ─── Beats ──────────────────────────────────────────────────────────────────

function Translation({ v, which }) {
  const missing = which === 'debroy' && !v.debroy
  const text = which === 'debroy' && v.debroy ? v.debroy : v.goldman.text
  const src = missing ? 'goldman' : which
  return (
    <>
      <English text={text} className="stage-trans-text" />
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
const VerseBeat = memo(function VerseBeat({ v, k, on, note, done, which, vulgate, sel, onSel }) {
  const below = useRef(null)
  const nd = VERSE_NOTE[v.n]
  // Small screens. No block under a verse may scale below 85%. Where it
  // would, three steps are tried in order, each only if the one before was
  // not enough:
  // 1. The English gives up its sentence-end breaks and flows as a paragraph.
  // 2. A vulgate line no longer keeps its own space. While it is heard, it
  //    shows in place of the English.
  // 3. On screens under 700px tall, the verse itself (Devanāgarī and IAST)
  //    is set smaller, step by step (MILESTONE-06 §6 item 3).
  const beat = useRef(null)
  const [mode, setMode] = useState({ flow: false, tight: false })
  const { flow, tight } = mode
  const room = el => {
    const stage = el.closest('.tl-stage')
    const verse = el.parentElement
    return stage.clientHeight / 2 - verse.offsetHeight / 2 - (window.innerWidth < 768 ? 56 : 64)
  }
  useLayoutEffect(() => {
    const el = below.current
    if (!el) return
    const measure = () => {
      const phone = window.innerWidth < 768
      const small = () => room(el) / el.offsetHeight < 0.85
      el.classList.remove('en-flow', 'is-tight')
      beat.current.style.removeProperty('--vz')
      const flow = small()
      el.classList.toggle('en-flow', flow)
      const tight = phone && !!el.querySelector('.vs-vulgate') && small()
      el.classList.toggle('is-tight', tight)
      if (window.innerHeight < SHORT) for (let z = 1; small() && z > VZ_MIN + 0.001;) { z -= 0.03; beat.current.style.setProperty('--vz', z.toFixed(2)) }
      setMode(m => (m.flow === flow && m.tight === tight ? m : { flow, tight }))
    }
    measure()
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [which]) // eslint-disable-line react-hooks/exhaustive-deps
  // The English and the note share the space under the verse. On small
  // screens they scale down a little to fit it, in place.
  useFit(below, room, [which])
  return (
    <section ref={beat} className={'beat beat-verse' + (on ? ' is-on' : '') + (done ? ' is-done' : '')} aria-hidden={!on} aria-labelledby={`st${v.n}`}>
      <div className="vs">
        <div className="vs-above">
          <p className="stage-eyebrow caps" aria-hidden="true">{EYEBROW(v, k)}</p>
          <p className="stage-cite caps">Vālmīki Rāmāyaṇa {v.ce} · Critical{' '}Edition</p>
        </div>
        <h2 id={`st${v.n}`} className="sr-only">Verse {v.ce}</h2>
        <div className="stage-verse">
          {/* The full verse, for screen readers, before its selectable words. */}
          <p lang="sa-Deva" className="sr-only">{v.lines.map(l => l.map(u => u.d).join(' ')).join(' । ')} ॥</p>
          <p lang="sa-Latn" className="sr-only">{v.lines.map(l => l.map(u => u.i).join(' ')).join(' / ')}</p>
          {v.lines.map((line, li) => (
            <p key={li} className="stage-line">
              {line.map((u, ui) => {
                const st = u.k < k ? (on && u.k === k - 1 && k < v.total ? ' is-now' : ' is-lit') : ''
                // A lit quality word can be selected (MILESTONE-06 §5.2): the
                // question words of 1.1.2–4 and the answering words of 1.1.8–19.
                const qid = u.q || u.a[0]
                const pick = on && qid && u.k < k
                const picked = pick && sel === u.k
                const choose = () => onSel(v.n, u.k, qid)
                const unit = (
                  <span
                    key={u.k}
                    className={'u' + st + (pick ? ' is-pick' : '') + (picked ? ' is-sel' : '')}
                    {...(pick ? {
                      role: 'button', tabIndex: 0, 'aria-pressed': picked, 'aria-label': `${u.i}, ${qualityOf(qid).short}`,
                      style: { '--c': CATS[qualityOf(qid).cat].dot },
                      onClick: choose, onKeyDown: e => { if (e.key === 'Enter') { e.preventDefault(); choose() } },
                    } : {})}
                  >
                    <span aria-hidden="true" className="u-d" lang="sa-Deva">{u.d}</span>
                    <span aria-hidden="true" className="u-i" lang="sa-Latn">{u.i}</span>
                    {/* The mark of a selected word: a gold underline that draws itself from the centre. */}
                    {picked && <span aria-hidden="true" className="u-line" />}
                    {/* The echo: a copy of the word, in place, that scales up a little, blurs and fades. */}
                    {picked && motionOn() && (
                      <span aria-hidden="true" className="u-echo">
                        <span className="u-d" lang="sa-Deva">{u.d}</span>
                        <span className="u-i" lang="sa-Latn">{u.i}</span>
                      </span>
                    )}
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
        </div>
        <div ref={below} className={'vs-below' + (nd ? ' has-note' : '') + (note ? ' note-on' : '') + (flow ? ' en-flow' : '') + (tight ? ' is-tight' : '') + (vulgate >= 0 ? ' vul-on' : '')}>
          <div className="vs-body">
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
      </div>
    </section>
  )
})

// The sixteen qualities, scattered, one at a time, in dim gold. The scatter
// sits inside the second fold, after its third sentence (MILESTONE-05 §2).
// Offsets are fixed, so the scatter is the same on every visit.
const JIT = [[-18, 10], [14, -22], [-6, 24], [20, 6], [8, -14], [-22, -4], [16, 20], [-10, -24], [22, -10], [-14, 16], [4, 26], [-24, 2], [12, -6], [-4, -18], [18, 14], [-16, -12]]
const ORDER = [5, 12, 0, 9, 3, 14, 7, 1, 10, 15, 4, 8, 13, 2, 11, 6]
// On arrival from above they appear in a timed stagger, in the fixed order.
// Coming back from below, all sixteen are there with the beat.
const SCATTER_GAP = (T.SCATTER - T.SCATTER_ITEM) / 15
function Scatter({ on, back }) {
  return (
    <section className={'beat beat-scatter' + (on ? ' is-on' : '') + (back ? ' is-back' : '')} aria-hidden={!on} aria-label="The sixteen qualities">
      <ul className="scatter">
        {QUALITIES.map((q, j) => (
          <li key={q.id} style={{ left: JIT[j][0] * 0.4 + '%', top: JIT[j][1] * 0.4 + '%', '--d': Math.round(T.FOLD_SWAP + ORDER.indexOf(j) * SCATTER_GAP) + 'ms' }}>
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
            <English text={v.goldman.text} className="qf-en" />
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
  const { beats, cps, firstOf, lastOf } = useMemo(() => {
    const beats = beatsFor(view)
    const cps = checkpoints(beats, hasNote)
    const firstOf = id => cps.findIndex(c => beats[c.i].id === id)
    const lastOf = id => cps.findLastIndex(c => beats[c.i].id === id)
    return { beats, cps, firstOf, lastOf }
  }, [view])

  // The parts of the Conversation, for the pager: each starts at the first
  // checkpoint of a beat.
  const parts = useMemo(() => (view !== 'conversation' ? null : {
    frame: firstOf('fold0'), questions: firstOf('v2'), answer: firstOf('v8'),
    story: firstOf('v19'), overview: firstOf('matrix'), author: firstOf('author'),
  }), [view, firstOf])

  // Deep links: ?v=1.1.14 opens that verse at its last checkpoint (all lit,
  // with its note if it has one). ?at=answer opens a part.
  const [params, setParams] = useSearchParams()
  const target = params.get('v')
  const landing = (v, at) => {
    const b = v && beats.find(x => x.v?.ce === v)
    if (b) return lastOf(b.id)
    return at && parts?.[at] != null ? parts[at] : -1
  }
  const { idx, dir, go, jump, arrive } = useSteps(cps, beats, () => Math.max(0, landing(target, params.get('at'))))

  const cur = cps[idx]
  const beat = beats[cur.i]
  const verse = beat.type === 'verse' ? beat.v : null
  const c = cur.c

  const [which, setWhichState] = useState(readTrans)
  const setWhich = useCallback(t => { setWhichState(t); try { localStorage.setItem(TRANS_KEY, t) } catch { /* storage blocked */ } }, [])

  // The verse clock: at a verse's second checkpoint its words light in time
  // with the recitation, heard or not. At its end the verse arrives at its
  // third checkpoint by itself.
  const [sound, setSoundState] = useState(false)
  const playing = !!verse && c === 1
  const onEnd = useCallback(() => arrive(idx), [arrive, idx])
  const { lit, vulgate, unlock } = useVerseClock(AUDIO_ENABLED && sound, verse, playing, onEnd)
  const setSound = useCallback(on => { if (on) unlock(); setSoundState(on) }, [unlock])
  // Words lit in the verse on stage. At the first checkpoint: none, always.
  const k = !verse || c === 0 ? 0 : c === 1 ? (lit.n === verse.n ? Math.max(1, lit.k) : 1) : verse.total

  // A selected quality word: { n, k, q }. A second click or tap, Escape, or
  // a step to another checkpoint clears it.
  const [sel, setSel] = useState(null)
  const onSel = useCallback((n, k, q) => setSel(s => (s && s.n === n && s.k === k ? null : { n, k, q })), [])
  useEffect(() => setSel(null), [idx])
  useEffect(() => {
    if (!sel) return
    const close = e => { if (e.key === 'Escape') setSel(null) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [sel])

  // The hero: the image alone, then its overlay and title by themselves.
  const [title, setTitle] = useState(idx > 0)
  useEffect(() => {
    if (title) return
    if (idx > 0) return setTitle(true)
    const t = setTimeout(() => setTitle(true), T.HERO_HOLD)
    return () => clearTimeout(t)
  }, [idx, title])

  // The link follows the reader: ?v= is the verse on stage.
  const wrote = useRef(target)
  const ce = verse?.ce || null
  useEffect(() => {
    if (params.get('v') === ce && !params.has('at')) return
    wrote.current = ce
    setParams(ce ? { v: ce } : {}, { replace: true })
  }, [ce]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!target || target === wrote.current) return
    wrote.current = target
    jump(landing(target))
  }, [target]) // eslint-disable-line react-hooks/exhaustive-deps

  // The nav's scrim and the pager's parts.
  useEffect(() => {
    if (!parts) return
    stageInfo.jumpTo = id => jump(parts[id])
    stageInfo.set({ parts: Object.keys(parts).filter(id => parts[id] >= 0) })
    return () => { stageInfo.jumpTo = () => {}; stageInfo.set({ parts: [], part: null, scrim: false }) }
  }, [parts, jump])
  useEffect(() => {
    let part = null
    if (parts) for (const [id, at] of Object.entries(parts)) if (at >= 0 && at <= idx) part = id
    stageInfo.set({ part, scrim: view !== 'conversation' || idx > 0 || title })
  }, [parts, idx, title, view])

  const boardOn = verse && (view !== 'conversation' || verse.n >= 2)
  const vn = verse ? verse.n : view === 'answers' ? 20 : 1
  const vars = {
    '--t-fold': T.FOLD_SWAP + 'ms', '--t-start': T.VERSE_START + 'ms', '--t-complete': T.VERSE_COMPLETE + 'ms',
    '--t-note': T.NOTE + 'ms', '--t-item': T.SCATTER_ITEM + 'ms', '--t-hero': T.HERO_TITLE + 'ms',
  }

  return (
    <div className="tl-track">
      <div className={'tl-stage' + (boardOn ? ' has-rail' : '')} style={vars} data-cp={idx} data-beat={beat.id} data-c={c} data-of={cps.length}>
        <Decor />
        {beats.map((b, j) => {
          if (Math.abs(j - cur.i) > 1) return null
          const on = j === cur.i
          const past = j < cur.i
          if (b.type === 'hero') return <Hero key={b.id} on={on} title={title} onNext={() => go(1)} />
          if (b.type === 'fold') return (
            <section key={b.id} className={'beat' + (on ? ' is-on' : '')} aria-hidden={!on}>
              <Lines lines={b.lines} className="fold-copy" />
            </section>
          )
          if (b.type === 'scatter') return <Scatter key={b.id} on={on} back={on && dir < 0} />
          if (b.type === 'verse') return (
            <VerseBeat key={b.id} v={b.v} on={on} k={on ? k : past ? b.v.total : 0} note={on ? c === 3 : past} done={on ? c >= 2 : past} which={which} vulgate={on && playing ? vulgate : -1} sel={on && sel?.n === b.v.n ? sel.k : -1} onSel={onSel} />
          )
          if (b.type === 'none') return (
            <section key={b.id} className={'beat' + (on ? ' is-on' : '')} aria-hidden={!on}>
              <div className="lone-note"><Note note="none" lens="none" on={on} /></div>
            </section>
          )
          if (b.type === 'matrix') return <Fit key={b.id} on={on} aria-label={COPY.matrixTitle}><Matrix /></Fit>
          if (b.type === 'qfold') return <QuestionsFold key={b.id} on={on} which={which} />
          if (b.type === 'author') return <Fit key={b.id} on={on} aria-labelledby="author-name"><AuthorHead /></Fit>
          return <Fit key={b.id} on={on}><CopyLink /><Footer /></Fit>
        })}
        <Rail view={view} n={vn} k={k} shown={!!boardOn} sel={verse && sel?.n === verse.n ? sel.q : null} />
        <Controls which={which} setWhich={setWhich} sound={sound} setSound={setSound} />
      </div>
      <Transcript view={view} />
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
          <h2>Vālmīki Rāmāyaṇa {v.ce}</h2>
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
