import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { EchoWord } from './Reading.jsx'
import { STORY, QUESTIONS, ECHO_STYLE, CITES } from './content.js'
import { partAt } from './Shell.jsx'
import Board from './Board.jsx'

export const motionOn = () => document.documentElement.classList.contains('motion')
const clamp = x => Math.max(0, Math.min(1, x))

// How far the reader has scrolled through a pinned track: 0 when its top
// reaches the top of the screen, 1 when its sticky stage is about to leave.
export function progressOf(el) {
  const r = el.getBoundingClientRect()
  const run = r.height - window.innerHeight
  return run > 0 ? clamp(-r.top / run) : r.top <= 0 ? 1 : 0
}

// The two introduction paragraphs, verbatim, one sentence per screen.
const SENTENCES = [
  'The Rāmāyaṇa opens with a question.',
  'Before the story begins, the sage Vālmīki asks the sage Nārada whether any truly complete person is alive in the world right now, and lists sixteen qualities such a person would have.',
  'Nārada answers yes: a prince named Rāma, whom he then describes at length.',
  'This site places those sixteen questions beside Nārada’s answer, so you can see which quality is answered where.',
  'Reading the opening this way turns it into a piece of design you can inspect.',
  'Some qualities are answered many times over, one is never answered directly, and in the Sanskrit the answer sometimes repeats the exact word of the question.',
  'These patterns show how carefully the epic’s first lines are built.',
]

// A pinned stage. Each new sentence adds one more gold frame inside the last.
// Under reduced motion all sentences show at once, inside all the frames.
function Intro() {
  const track = useRef(null)
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (!motionOn()) return setIdx(SENTENCES.length - 1)
    let frame = 0
    const update = () => {
      frame = 0
      const p = progressOf(track.current)
      setIdx(Math.min(SENTENCES.length - 1, Math.floor(p * SENTENCES.length * 1.02)))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    let on = false
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !on) { on = true; window.addEventListener('scroll', onScroll, { passive: true }); update() }
      else if (!e.isIntersecting && on) { on = false; window.removeEventListener('scroll', onScroll); update() }
    })
    io.observe(track.current)
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame) }
  }, [])
  const last = SENTENCES.length - 1
  return (
    <section ref={track} id="part-frame" aria-label="Introduction" className="intro-track" style={{ '--n': SENTENCES.length }}>
      <div className="intro-stage">
        <div className="intro-box" style={{ '--k': idx + 1 }}>
          {SENTENCES.map((_, j) => (
            <span key={j} aria-hidden="true" className={'intro-frame' + (j <= idx ? ' is-on' : '')} style={{ '--j': j }} />
          ))}
          <div className="intro-text">
            {SENTENCES.map((s, j) => (
              <p key={j} className={'intro-sent' + (j === idx ? ' is-on' : '')}>{s}</p>
            ))}
            <p className={'intro-enter caps' + (idx === last ? ' is-on' : '')}>
              Enter the dialogue
              <svg aria-hidden="true" className="mx-auto mt-2" width="14" height="22" viewBox="0 0 14 22" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 1v19M1 14l6 6 6-6" />
              </svg>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Verse stages ───────────────────────────────────────────────────────────

const DEV_DIGITS = '०१२३४५६७८९'
const devNum = n => String(n).replace(/\d/g, d => DEV_DIGITS[d])

// Scroll within a verse's pinned run: words light over LIT_FROM–LIT_TO, then
// the translation (TRANS_AT), then the citation (CITE_AT).
const LIT_FROM = 0.05
const LIT_TO = 0.66
const TRANS_AT = 0.72
const CITE_AT = 0.8
export const litAt = (v, p) => (p < LIT_FROM ? 0 : Math.min(v.total, Math.floor(((p - LIT_FROM) / (LIT_TO - LIT_FROM)) * v.total) + 1))
export const phaseAt = p => (p >= CITE_AT ? 2 : p >= TRANS_AT ? 1 : 0)
// The scroll progress at which word k (1-based count lit) is first lit.
export const pForLit = (v, k) => (k <= 0 ? 0 : LIT_FROM + ((k - 1) / v.total) * (LIT_TO - LIT_FROM) + 0.002)

const line2Start = v => v.lines[0].length
export const EYEBROW = (v, k) =>
  v.n === 1 ? 'I · The Frame'
    : v.n <= 4 ? 'II · The Sixteen Questions'
      : v.n <= 7 ? 'III · The Frame'
        : v.n === 19 && k > line2Start(v) ? 'V · The Story Begins'
          : 'IV · Nārada’s Answer'

const TRANS = [
  ['goldman', 'Goldman'],
  ['debroy', 'Debroy'],
  ['gp', 'Gita Press'],
]
const TRANS_KEY = 'v16q-translation'
const readTrans = () => { try { const t = localStorage.getItem(TRANS_KEY); return TRANS.some(([k]) => k === t) ? t : 'goldman' } catch { return 'goldman' } }

function StageTranslation({ v, which }) {
  const text = which === 'goldman' ? v.goldman?.text : which === 'debroy' ? v.debroy : v.gita
  if (!text) {
    // 1.1.2–4 carry no Debroy or Gita Press English in this site's data.
    const name = which === 'debroy' ? 'Debroy' : 'Gita Press'
    return (
      <>
        <p className="stage-trans-text">{v.goldman.text}</p>
        <p className="stage-trans-meta">
          Goldman (CE) · <span className="italic">verse split by MYT, draft</span> · <Link to="/sources?ref=goldman" className="underline">{CITES.goldman}</Link>
          <br />This site has no separate {name} English for 1.1.2–4, so Goldman is shown.
        </p>
      </>
    )
  }
  return (
    <>
      <p className="stage-trans-text">{text}</p>
      <p className="stage-trans-meta">
        {which === 'goldman' && <>Goldman (CE) · <span className="italic">verse split by MYT, draft</span> · </>}
        {which === 'debroy' && <>Debroy (CE) · </>}
        {which === 'gp' && <>Gita Press (vulgate){v.gpLabel ? ` · ${v.gitaNote || v.gpLabel}` : ''} · </>}
        <Link to={`/sources?ref=${which}`} className="underline">{CITES[which]}</Link>
      </p>
    </>
  )
}

// One verse on its own pinned stage. `k` is how many words are lit, `ph` is
// 0 (lighting), 1 (translation shown) or 2 (citation shown). Lighting is
// visual only: the full verse is in the page for screen readers at all times.
const VerseStage = memo(function VerseStage({ v, k, ph, live, which, setWhich, extra }) {
  return (
    <section id={`s${v.n}`} data-n={v.n} className="stage-track" aria-labelledby={`st${v.n}`}>
      <div className="stage" aria-live="off">
        <div className="stage-inner">
          <p className="stage-eyebrow caps" aria-hidden="true">{EYEBROW(v, k)}</p>
          <h2 id={`st${v.n}`} className="sr-only">Verse {v.ce}</h2>
          <div className="stage-verse">
            {v.lines.map((line, li) => (
              <p key={li} className="stage-line">
                {line.map((u, ui) => {
                  const st = u.k < k ? (live && ph === 0 && u.k === k - 1 ? ' is-now' : ' is-lit') : ''
                  const unit = (
                    <span key={u.k} className={'u' + st + (u.echo ? ' is-echo' : '')}>
                      <span aria-hidden="true" className="u-d" lang="sa-Deva">{u.d}</span>
                      <span aria-hidden="true" className="u-i" lang="sa-Latn">{u.i}</span>
                      {u.echo && (
                        <EchoWord
                          text={<><span aria-hidden="true">{ECHO_STYLE[u.echo.type].sym}</span></>}
                          label={`${ECHO_STYLE[u.echo.type].tag} echo of ${u.echo.q}, ${u.echo.word}`}
                          echo={u.echo}
                          script="iast"
                          v={v}
                          className="u-pill"
                        />
                      )}
                    </span>
                    )
                    if (ui < line.length - 1) return unit
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
          {v.gpOnly && (
            <p className="stage-gp">
              Gita Press adds: {v.gpOnly.map((r, j) => <span key={r.gp}>{j > 0 && ' · '}<i lang="sa-Latn">{r.iast}</i></span>)}
            </p>
          )}
          <div className={'stage-trans' + (ph >= 1 ? ' is-on' : '')}>
            <StageTranslation v={v} which={which} />
          </div>
          <p className={'stage-cite caps' + (ph >= 2 ? ' is-on' : '')}>Vālmīki Rāmāyaṇa {v.ce} · Critical Edition</p>
          <div className="stage-foot">
            <div role="group" aria-label="Translation" className="stage-switch caps">
              {TRANS.map(([key, label], j) => (
                <span key={key}>
                  {j > 0 && <span aria-hidden="true" className="px-1.5 text-muted">·</span>}
                  <button type="button" aria-pressed={which === key} onClick={() => setWhich(key)}>{label}</button>
                </span>
              ))}
            </div>
            {extra}
          </div>
        </div>
      </div>
    </section>
  )
})

// Which verse is on stage, how many of its words are lit, and its phase.
// IntersectionObserver switches the scroll handler on while the stages are on
// screen; a single rAF-throttled handler reads the positions.
function useStoryProgress(track) {
  const [st, setSt] = useState({ cur: -1, k: 0, ph: 0, inside: false })
  useEffect(() => {
    const motion = motionOn()
    let frame = 0
    const update = () => {
      frame = 0
      const secs = track.current?.querySelectorAll('.stage-track')
      if (!secs) return
      let cur = -1
      let p = 0
      const line = motion ? 1 : window.innerHeight * 0.5
      secs.forEach((el, i) => {
        if (el.getBoundingClientRect().top < line) { cur = i; p = progressOf(el) }
      })
      const v = STORY[cur]
      const k = cur < 0 ? 0 : motion ? litAt(v, p) : v.total
      const ph = cur < 0 ? 0 : motion ? phaseAt(p) : 2
      const inside = track.current.getBoundingClientRect().bottom > window.innerHeight * 0.5
      setSt(prev => (prev.cur === cur && prev.k === k && prev.ph === ph && prev.inside === inside ? prev : { cur, k, ph, inside }))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    let on = false
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !on) { on = true; window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll) }
      else if (!e.isIntersecting && on) { on = false; window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
      update()
    }, { rootMargin: '100px 0px' })
    io.observe(track.current)
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame) }
  }, [track])
  return st
}

// Scroll position at which verse index i shows word count k (and phase).
export function scrollFor(i, k, ph = 0) {
  const el = document.querySelectorAll('.stage-track')[i]
  if (!el) return null
  const top = el.getBoundingClientRect().top + window.scrollY
  if (!motionOn()) return top - 56
  const run = el.offsetHeight - window.innerHeight
  const v = STORY[i]
  const p = ph === 2 ? CITE_AT + 0.01 : k >= v.total ? Math.max(pForLit(v, v.total), ph === 1 ? TRANS_AT + 0.01 : 0) : pForLit(v, k)
  return Math.round(top + run * p)
}

export default function Story() {
  const track = useRef(null)
  const st = useStoryProgress(track)
  const [which, setWhichState] = useState(readTrans)
  const setWhich = useCallback(t => { setWhichState(t); try { localStorage.setItem(TRANS_KEY, t) } catch { /* storage blocked */ } }, [])
  const [params] = useSearchParams()
  const target = params.get('v')
  const at = params.get('at')

  // Deep links: #/?v=1.1.14 opens that verse fully lit. #/?at=answer opens a part.
  useLayoutEffect(() => {
    const i = target ? STORY.findIndex(v => v.ce === target) : -1
    if (i >= 0) {
      const id = requestAnimationFrame(() => { const y = scrollFor(i, STORY[i].total, 2); if (y != null) window.scrollTo(0, y) })
      return () => cancelAnimationFrame(id)
    }
    if (at) {
      const id = requestAnimationFrame(() => document.querySelector(`.pager-dot[href="#/?at=${at}"]`)?.click())
      return () => cancelAnimationFrame(id)
    }
  }, [target, at])

  useEffect(() => {
    // The Story Begins: where 1.1.19's second line starts to light.
    partAt.story = () => scrollFor(18, line2Start(STORY[18]) + 1)
    return () => { delete partAt.story }
  }, [])

  return (
    <>
      <Intro />
      <p className="mx-auto max-w-[640px] py-10 text-center text-base text-muted">
        Each verse appears in the Sanskrit of the Critical Edition (CE), in Devanāgarī and in Roman letters
        (IAST), with three English translations to compare: Robert P. Goldman’s and Bibek Debroy’s (both of the
        CE) and the Gita Press edition’s. A <i>śloka</i> is a verse, and “1.1.8” means Bālakāṇḍa, sarga 1,
        verse 8 in the Critical Edition. Use the menu above to read only the Questions, only the Answers, or
        the Patterns.
      </p>
      <Board
        cur={motionOn() ? st.cur : STORY.length - 1}
        k={motionOn() ? st.k : STORY[STORY.length - 1].total}
        shown={st.cur >= 1 && st.inside}
      />
      <div ref={track} className="stages">
        {STORY.map((v, i) => {
          const k = i < st.cur ? v.total : i > st.cur ? 0 : st.k
          const ph = i < st.cur ? 2 : i > st.cur ? 0 : st.ph
          const ids = { 2: 'part-questions', 8: 'part-answer', 19: 'part-story' }
          return (
            <div key={v.n} id={ids[v.n]} className="stage-wrap">
              <VerseStage v={v} k={k} ph={ph} live={i === st.cur} which={which} setWhich={setWhich} />
            </div>
          )
        })}
      </div>
    </>
  )
}
