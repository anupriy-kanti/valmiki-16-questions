import { useEffect, useState } from 'react'

// The frame around the page, after the Mahābhārata site.

// Left edge: vertical byline, from 1024px.
export function SideByline() {
  return (
    <p aria-hidden="true" className="side-byline caps no-print fixed left-3 top-1/2 z-10 hidden text-[10px] text-gold/80 lg:block">
      Anupriy Kanti · Mythematical
    </p>
  )
}

export const PARTS = [
  ['frame', 'The Frame'],
  ['questions', 'The Questions'],
  ['answer', 'The Answer'],
  ['story', 'The Story Begins'],
  ['overview', 'Overview'],
  ['author', 'The Author'],
]

// Where each part starts on the page. `part-story` may carry data-offset, the
// scroll distance into its section where that part begins.
// A part that starts inside a section registers a function giving its page y.
export const partAt = {}
const partTop = id => {
  if (partAt[id] && document.getElementById('part-' + id)) return partAt[id]()
  const el = document.getElementById('part-' + id)
  if (!el) return null
  return el.getBoundingClientRect().top + window.scrollY + Number(el.dataset.offset || 0)
}

export function jumpTo(id) {
  const y = partTop(id)
  if (y == null) return
  const smooth = document.documentElement.classList.contains('motion')
  window.scrollTo({ top: Math.max(0, y - (id === 'frame' ? 0 : 1)), behavior: smooth ? 'smooth' : 'auto' })
}

// Right edge: a dot pager for the parts of the All story. Labels show from
// 1280px, on hover or when active. Dots are links.
export function Pager() {
  const [active, setActive] = useState(null)
  const [present, setPresent] = useState([])
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const tops = PARTS.map(([id]) => [id, partTop(id)]).filter(([, y]) => y != null)
      setPresent(p => (p.length === tops.length ? p : tops.map(([id]) => id)))
      const line = window.scrollY + window.innerHeight * 0.5
      let cur = null
      for (const [id, y] of tops) if (y <= line) cur = id
      setActive(cur)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    const t = setTimeout(update, 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { clearTimeout(t); cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])
  return (
    <nav aria-label="Parts of the story" className="pager no-print fixed right-2 top-1/2 z-20 hidden -translate-y-1/2 md:block">
      <ol className="flex flex-col items-end gap-1">
        {PARTS.filter(([id]) => present.includes(id)).map(([id, label]) => (
          <li key={id}>
            <a
              href={`#/?at=${id}`}
              onClick={e => { e.preventDefault(); jumpTo(id) }}
              aria-current={active === id ? 'step' : undefined}
              className="pager-dot group flex items-center gap-2 p-1.5"
            >
              <span aria-hidden="true" className="pager-label caps text-[10px] text-gold">{label}</span>
              <span aria-hidden="true" className="pager-mark block h-2 w-2 rounded-full border border-gold" />
              <span className="sr-only">{label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Bottom line, on the All story only.
export function BottomLine() {
  return (
    <p className="bottom-line caps no-print pointer-events-none fixed inset-x-0 bottom-0 z-10 hidden pb-1.5 pt-4 text-center text-[9px] text-muted md:block">
      Critical Edition text from GRETIL · translations by Goldman and Debroy
    </p>
  )
}
