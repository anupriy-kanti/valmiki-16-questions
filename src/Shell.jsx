import { IMAGE_CREDIT } from './Hero.jsx'
import { stageInfo, useStageInfo } from './steps.js'

// The frame around the page, after the Mahābhārata site.

// Left edge: vertical byline, from 1024px. It is hidden on the beats where
// the quality rail shows (CSS, .side-byline).
export function SideByline() {
  return (
    <div aria-hidden="true" className="side-byline no-print fixed inset-y-0 left-3 z-10 hidden items-center lg:flex">
      <p className="caps text-[10px] text-gold/80">Anupriy Kanti · Mythematical</p>
    </div>
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

// Right edge: a dot pager for the parts of the Conversation. Labels show from
// 1280px, on hover or when active. Dots are links. A dot jumps to the first
// checkpoint of its part.
export function Pager() {
  const { parts, part } = useStageInfo()
  return (
    <nav aria-label="Parts of the story" className="pager no-print fixed inset-y-0 right-2 z-20 hidden items-center md:flex">
      <ol className="flex flex-col items-end gap-1">
        {PARTS.filter(([id]) => parts.includes(id)).map(([id, label]) => (
          <li key={id}>
            <a
              href={`#/?at=${id}`}
              onClick={e => { e.preventDefault(); stageInfo.jumpTo(id) }}
              aria-current={part === id ? 'step' : undefined}
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
    <p className="bottom-line caps no-print pointer-events-none fixed inset-x-0 bottom-0 z-10 hidden pb-1.5 pt-4 text-center text-[9px] text-muted xl:block">
      Critical Edition text from GRETIL · translations by Goldman and Debroy
    </p>
  )
}

export function Footer() {
  return (
    <footer className="site-foot mt-16 border-t border-line">
      <div className="mx-auto max-w-[760px] space-y-2 px-4 py-8 font-sans text-sm text-muted">
        <p>
          Translations are quoted for scholarly commentary and comparison. Copyright remains with the
          translators and publishers. To request removal, write to{' '}
          <a className="underline" href="mailto:anupriy.kanti@gmail.com">anupriy.kanti@gmail.com</a>.
        </p>
        <p>
          A non-commercial project by Anupriy Kanti for Mythematical ·{' '}
          <a className="underline" href="mailto:anupriy.kanti@gmail.com">anupriy.kanti@gmail.com</a> ·{' '}
          <a className="underline" href="https://instagram.com/mythematical">Instagram @mythematical</a>
        </p>
        <p className="print-only">{IMAGE_CREDIT}</p>
      </div>
    </footer>
  )
}
