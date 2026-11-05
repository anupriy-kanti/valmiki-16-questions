import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const BASE = import.meta.env.BASE_URL
export const HERO_ALT = 'At a forest hermitage at dusk, the sage Nārada, holding a vīṇā, speaks, while the elder sage Vālmīki listens with folded hands.'
export const IMAGE_CREDIT = 'Nārada answering Vālmīki’s question. An AI-generated image (Google Gemini), directed by Anupriy Kanti.'

const clamp = x => Math.max(0, Math.min(1, x))

// First fold: the image alone, whole and uncropped, edges masked into the
// page, vertically centred, with its caption and a scroll cue. The hero is
// pinned for about one more screen: a uniform dark overlay (60%) fades over
// it, then the title block fades in, centred in the viewport. Under reduced
// motion (no `.motion` class) the title block sits below the image, static.
export default function Hero() {
  const track = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const el = track.current
    const motion = document.documentElement.classList.contains('motion')
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 8)
      if (!motion) return
      const run = el.offsetHeight - window.innerHeight
      const p = run > 0 ? clamp(window.scrollY / run) : 0
      el.style.setProperty('--ov', (clamp(p / 0.35) * 0.6).toFixed(3))
      el.style.setProperty('--tt', clamp((p - 0.3) / 0.3).toFixed(3))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])

  // The subtitle fills the title's width: one line from 640px, two balanced
  // lines on phones, where the title itself is two lines.
  useLayoutEffect(() => {
    const h1 = track.current.querySelector('.hero-tblock h1')
    const sub = track.current.querySelector('.hero-sub')
    const fit = () => {
      sub.style.fontSize = ''
      sub.classList.add('is-measuring')
      const natural = sub.getBoundingClientRect().width
      const base = parseFloat(getComputedStyle(sub).fontSize)
      sub.classList.remove('is-measuring')
      const lines = window.innerWidth < 640 ? 2 : 1
      const size = base * lines * (h1.getBoundingClientRect().width / natural) * (lines > 1 ? 1.02 : 0.99)
      sub.style.fontSize = Math.max(base, Math.min(base * 2.4, size)).toFixed(1) + 'px'
    }
    fit()
    document.fonts?.ready.then(fit)
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  const next = () => {
    const motion = document.documentElement.classList.contains('motion')
    const y = motion ? (track.current.offsetHeight - window.innerHeight) * 0.75 : track.current.querySelector('.hero-tblock').getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: y, behavior: motion ? 'smooth' : 'auto' })
  }

  return (
    <header ref={track} className="hero-track">
      <div className="hero-stage">
        <figure className="hero-fig">
          <picture>
            <source type="image/webp" srcSet={`${BASE}hero-v2-960.webp 960w, ${BASE}hero-v2-1600.webp 1600w, ${BASE}hero-v2-2300.webp 2300w`} sizes="(min-aspect-ratio: 139/100) calc(78vh * 1.7774), min(100vw, 2300px)" />
            <img
              src={`${BASE}hero-v2-1600.jpg`}
              srcSet={`${BASE}hero-v2-960.jpg 960w, ${BASE}hero-v2-1600.jpg 1600w, ${BASE}hero-v2-2300.jpg 2300w`}
              sizes="(min-aspect-ratio: 139/100) calc(78vh * 1.7774), min(100vw, 2300px)"
              width="2300"
              height="1294"
              fetchpriority="high"
              alt={HERO_ALT}
              className="hero-img block"
            />
          </picture>
          <figcaption className="hero-credit italic text-muted">
            <span className="block">Nārada answering Vālmīki’s question.</span>
            <span className="block">An AI-generated image (Google Gemini), directed by Anupriy Kanti.</span>
          </figcaption>
        </figure>
        <div aria-hidden="true" className="hero-overlay" />
        <div className="hero-title">
          <div className="hero-tblock">
            <h1 className="text-[2.1rem] leading-tight sm:text-5xl lg:text-[3.6rem]">Vālmīki’s 16<br className="sm:hidden" /> Questions</h1>
            <p className="hero-sub mt-2 text-lg italic leading-snug">The question that sets the Rāmāyaṇa in motion</p>
          </div>
          <p className="hero-by caps mt-5 text-gold-bright">By Anupriy Kanti</p>
        </div>
        <button
          type="button"
          onClick={next}
          aria-label="Scroll to the title"
          className={'hero-cue caps no-print absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-col items-center rounded px-3 py-1 text-[11px] text-gold' + (scrolled ? ' is-hidden' : '')}
        >
          Scroll
          <svg aria-hidden="true" className="hero-chevron mt-0.5" width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 1l10 10L21 1" />
          </svg>
        </button>
      </div>
    </header>
  )
}
