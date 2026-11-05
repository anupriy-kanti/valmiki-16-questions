import { useEffect, useState } from 'react'

const BASE = import.meta.env.BASE_URL
export const HERO_ALT = 'At a forest hermitage at dusk, the sage Nārada, holding a vīṇā, speaks, while the elder sage Vālmīki listens with folded hands.'
export const IMAGE_CREDIT = 'Nārada answering Vālmīki’s question. An AI-generated image (Google Gemini), directed by Anupriy Kanti.'

// First fold: the whole image at its own aspect ratio, scaled to fit, never
// cropped, never stretched, never upscaled past 2300px. Its edges melt into
// the page on all four sides (CSS mask). The title band sits over the calm sky
// in the top fifth from 768px, and above the image on narrower screens.
export default function Hero({ onNext }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <header className="hero relative flex flex-col items-center justify-center px-0 pb-14 pt-14">
      <div className="hero-frame relative">
        <div className="hero-title px-4 text-center">
          <p className="caps text-[11px] text-gold sm:text-xs">Rāmāyaṇa · Bālakāṇḍa · Sarga 1</p>
          <h1 className="mt-2 text-[2rem] leading-tight text-ink sm:text-[2.6rem] xl:text-[3rem]">Vālmīki’s 16 Questions</h1>
          <p className="mt-0.5 text-lg italic text-ink/90 sm:text-xl">The question that sets the Rāmāyaṇa in motion</p>
          <p className="caps mt-1 text-[11px] text-gold-bright sm:text-xs">By Anupriy Kanti</p>
        </div>
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
        <p className="hero-credit px-4 text-center italic text-muted">{IMAGE_CREDIT}</p>
      </div>
      <button
        type="button"
        onClick={onNext}
        aria-label="Scroll to the introduction"
        className={'hero-cue caps no-print absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-col items-center rounded px-3 py-1 text-[11px] text-gold' + (scrolled ? ' is-hidden' : '')}
      >
        Scroll
        <svg aria-hidden="true" className="hero-chevron mt-0.5" width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 1l10 10L21 1" />
        </svg>
      </button>
    </header>
  )
}
