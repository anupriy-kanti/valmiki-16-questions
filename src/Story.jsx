import { useEffect, useRef, useState } from 'react'
import Reading from './Reading.jsx'

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

export default function Story() {
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
      <Reading mode="all" noIntro />
    </>
  )
}
