import { useLayoutEffect, useRef } from 'react'

const BASE = import.meta.env.BASE_URL
export const HERO_ALT = 'At a forest hermitage at dusk, the sage Nārada, holding a vīṇā, speaks, while the elder sage Vālmīki listens with folded hands.'
export const IMAGE_CREDIT = 'Nārada answering Vālmīki’s question. An AI-generated image (Google Gemini), directed by Anupriy Kanti.'

const clamp = x => Math.max(0, Math.min(1, x))

// First beat of the Conversation stage: the image alone, whole and uncropped,
// edges masked into the page, with its caption and a scroll cue. As the
// visitor scrolls, a uniform dark overlay (60%) fades over it, then the title
// block fades in, centred, in place. The stage sets --ov and --tt.
export default function Hero({ on, scrolled, onNext }) {
  const track = useRef(null)

  // The subtitle fills the title's width: one line from 640px. On phones
  // both title and subtitle are two set lines.
  useLayoutEffect(() => {
    const h1 = track.current.querySelector('.hero-tblock h1')
    const sub = track.current.querySelector('.hero-sub')
    // Widest rendered line: text pieces on the same line are added up.
    const widest = el => {
      const r = document.createRange()
      r.selectNodeContents(el)
      const lines = {}
      for (const x of r.getClientRects()) {
        const key = Math.round(x.top / 4)
        const l = (lines[key] ||= { left: x.left, right: x.right })
        l.left = Math.min(l.left, x.left)
        l.right = Math.max(l.right, x.right)
      }
      return Math.max(0, ...Object.values(lines).map(l => l.right - l.left))
    }
    const fit = () => {
      sub.style.fontSize = ''
      const base = parseFloat(getComputedStyle(sub).fontSize)
      // On phones a <br> sets the two lines, so this is the longer line.
      const natural = widest(sub)
      if (!natural) return
      const size = base * (widest(h1) / natural) * 0.98
      sub.style.fontSize = Math.max(base, Math.min(base * 2.4, size)).toFixed(1) + 'px'
    }
    fit()
    document.fonts?.ready.then(fit)
    document.fonts?.addEventListener?.('loadingdone', fit)
    window.addEventListener('resize', fit)
    return () => { window.removeEventListener('resize', fit); document.fonts?.removeEventListener?.('loadingdone', fit) }
  }, [])

  return (
    <header ref={track} className={'beat beat-hero' + (on ? ' is-on' : '')} aria-hidden={!on}>
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
            <h1 className="text-[2.1rem] leading-tight sm:text-5xl lg:text-[3.6rem]">Vālmīki’s<br className="sm:hidden" /> 16 Questions</h1>
            <p className="hero-sub mt-2 text-lg italic leading-snug">The question that sets<br className="sm:hidden" /> the Rāmāyaṇa in motion</p>
          </div>
          <p className="hero-by caps mt-5 text-gold-bright">By Anupriy Kanti</p>
        </div>
        <button
          type="button"
          onClick={onNext}
          tabIndex={scrolled ? -1 : 0}
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
