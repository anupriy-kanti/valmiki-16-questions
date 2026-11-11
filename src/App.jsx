import { useEffect, useLayoutEffect, useState } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Stage from './Stage.jsx'
import Patterns from './Patterns.jsx'
import Sources from './Sources.jsx'
import About from './About.jsx'
import { SideByline, Pager, BottomLine, Footer } from './Shell.jsx'

const NAV = [
  ['/', 'Conversation', true],
  ['/questions', 'Questions', true],
  ['/answers', 'Answers', true],
  ['/patterns', 'Patterns', false],
  ['/sources', 'Sources & method', false],
  ['/about', 'About', false],
]

// On the landing the nav floats over the hero, transparent, and turns solid
// once the reader scrolls past the first fold.
function useSolid(over) {
  const [solid, setSolid] = useState(0)
  useEffect(() => {
    if (!over) return
    const update = () => setSolid(window.scrollY > 8 ? 1 : 0)
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [over])
  return solid
}

function Nav({ over }) {
  const solid = useSolid(over)
  const cls = over
    ? 'fixed inset-x-0 border-b nav-over' + (solid === 2 ? ' is-solid backdrop-blur' : solid === 1 ? ' is-scrim backdrop-blur' : '')
    : 'sticky border-b border-line bg-paper/95 backdrop-blur'
  return (
    <nav aria-label="Main" className={'no-print top-0 z-20 ' + cls}>
      <ul className="mx-auto flex max-w-[760px] gap-4 overflow-x-auto px-4 py-2 caps text-xs lg:max-w-[1040px] lg:justify-between lg:gap-8 lg:px-8 lg:text-[13px]">
        {NAV.map(([to, label]) => (
          <li key={to} className="shrink-0">
            <NavLink
              to={to}
              end
              className={({ isActive }) =>
                'nav-tab block border-b-2 px-1 py-1.5 ' +
                (isActive ? 'border-gold text-ink' : 'border-transparent text-ink hover:border-line')
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const STAGES = { '/': 'conversation', '/questions': 'questions', '/answers': 'answers' }

export default function App() {
  const { pathname, search } = useLocation()
  useLayoutEffect(() => {
    const q = new URLSearchParams(search)
    if (!q.has('v') && !q.has('at')) window.scrollTo(0, 0)
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps
  const view = STAGES[pathname]
  return (
    <>
      <button type="button" onClick={() => document.getElementById('main')?.focus()} className="no-print sr-only focus:not-sr-only">Skip to content</button>
      <Nav over={!!view} />
      <SideByline />
      {pathname === '/' && <><Pager /><BottomLine /></>}
      <main id="main" tabIndex={-1} className={view ? '' : pathname === '/patterns' ? 'mx-auto max-w-[1120px] px-4' : 'mx-auto max-w-[760px] px-4'}>
        <div key={pathname} className="route-fade">
          <Routes>
            <Route path="/" element={<Stage view="conversation" />} />
            <Route path="/questions" element={<Stage view="questions" />} />
            <Route path="/answers" element={<Stage view="answers" />} />
            <Route path="/patterns" element={<Patterns />} />
            <Route path="/sources" element={<Sources />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Stage view="conversation" />} />
          </Routes>
        </div>
      </main>
      {!view && <Footer />}
    </>
  )
}
