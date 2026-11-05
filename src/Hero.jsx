import { useLayoutEffect, useRef, useState } from 'react'

const BASE = import.meta.env.BASE_URL
const clamp = x => Math.max(0, Math.min(1, x))

// First fold: the image fills the screen. On the first scroll a dark overlay
// rises over the lower half, then the title, subtitle and byline fade in.
// The byline fades out again on the way to the second fold. Under reduced
// motion (no `.motion` class) everything shows at once and nothing moves.
export default function Hero() {
  const box = useRef(null)
  const img = useRef(null)
  const [scrolled, setScrolled] = useState(false)

  useLayoutEffect(() => {
    const el = box.current
    const motion = document.documentElement.classList.contains('motion')
    let frame = 0
    const update = () => {
      frame = 0
      const h = el.offsetHeight || window.innerHeight
      const p = Math.max(0, window.scrollY) / h
      setScrolled(window.scrollY > 8)
      if (!motion) return
      el.style.setProperty('--o', clamp(p / 0.2).toFixed(3))
      el.style.setProperty('--t1', clamp((p - 0.12) / 0.12).toFixed(3))
      el.style.setProperty('--t2', clamp((p - 0.2) / 0.12).toFixed(3))
      el.style.setProperty('--t3', (clamp((p - 0.26) / 0.1) * (1 - clamp((p - 0.55) / 0.25))).toFixed(3))
      if (img.current && p < 1.2) img.current.style.transform = `translateY(${(Math.min(p, 1) * h * 0.25).toFixed(1)}px) scale(${(1 + Math.min(p, 1) * 0.06).toFixed(4)})`
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
  }, [])

  const next = () => {
    const smooth = document.documentElement.classList.contains('motion')
    window.scrollTo({ top: box.current.offsetHeight - 48, behavior: smooth ? 'smooth' : 'auto' })
  }

  return (
    <header ref={box} className="hero relative overflow-hidden bg-paper">
      <img
        ref={img}
        src={`${BASE}hero.jpg`}
        srcSet={`${BASE}hero-640.webp 640w, ${BASE}hero-1024.webp 1024w`}
        sizes="100vw"
        width="1024"
        height="572"
        fetchpriority="high"
        alt="At dusk in a forest hermitage, the sage Vālmīki sits with a vīṇā and speaks with the elder sage Nārada, who listens with folded hands."
        className="hero-img absolute inset-0 h-full w-full origin-center object-cover object-center will-change-transform"
      />
      <div aria-hidden="true" className="hero-vignette absolute inset-0" />
      <div aria-hidden="true" className="hero-overlay absolute inset-x-0 bottom-0 h-[62%]" />
      <div className="hero-text absolute inset-x-0 bottom-[14%] mx-auto max-w-[760px] px-4 text-center">
        <h1 className="hero-t1 text-4xl font-semibold leading-tight text-white sm:text-6xl">Vālmīki’s 16 Questions</h1>
        <p className="hero-t2 mt-3 text-xl italic text-[#f1dcae] sm:text-2xl">The question that sets the Rāmāyaṇa in motion</p>
        <p className="hero-t3 mt-4 font-sans text-xs uppercase tracking-widest text-[#efe4d2] sm:text-sm">By Anupriy Kanti · Mythematical</p>
      </div>
      <button
        type="button"
        onClick={next}
        aria-label="Scroll to the introduction"
        className={'hero-cue no-print absolute bottom-3 left-1/2 flex -translate-x-1/2 flex-col items-center rounded px-3 py-1 font-sans text-xs uppercase tracking-widest text-ink' + (scrolled ? ' is-hidden' : '')}
      >
        Scroll
        <svg aria-hidden="true" className="hero-chevron mt-0.5" width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 1l10 10L21 1" />
        </svg>
      </button>
    </header>
  )
}
