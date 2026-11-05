import { useEffect, useLayoutEffect, useState } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Reading from './Reading.jsx'
import Hero from './Hero.jsx'
import Sources from './Sources.jsx'
import About from './About.jsx'

const NAV = [
  ['/', 'All', true],
  ['/questions', 'Questions', true],
  ['/answers', 'Answers', true],
  ['/patterns', 'Patterns', false],
  ['/sources', 'Sources & method', false],
  ['/about', 'About', false],
]

// The verse at the top of the screen when a reading tab is clicked, so the
// next tab can open at the same verse if it shows it.
const anchor = { id: null, top: 0 }
function rememberVerse() {
  const nav = document.querySelector('nav')?.getBoundingClientRect().bottom || 0
  const el = [...document.querySelectorAll('article[id^="v"]')].find(a => a.getBoundingClientRect().bottom > nav + 8)
  anchor.id = el && window.scrollY > 200 ? el.id : null
  anchor.top = el ? el.getBoundingClientRect().top : 0
}

// On the landing the nav floats over the hero, transparent, and turns solid
// once the reader scrolls past the first fold.
function useSolid(over) {
  const [solid, setSolid] = useState(0)
  useEffect(() => {
    if (!over) return
    const update = () => setSolid(window.scrollY > window.innerHeight * 1.45 ? 2 : window.scrollY > 8 ? 1 : 0)
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [over])
  return solid
}

function Nav({ over }) {
  const { search } = useLocation()
  const solid = useSolid(over)
  const cls = over
    ? 'fixed inset-x-0 border-b nav-over' + (solid === 2 ? ' is-solid backdrop-blur' : solid === 1 ? ' is-scrim backdrop-blur' : '')
    : 'sticky border-b border-line bg-paper/95 backdrop-blur'
  return (
    <nav aria-label="Main" className={'no-print top-0 z-20 ' + cls}>
      <ul className="mx-auto flex max-w-[760px] gap-4 overflow-x-auto px-4 py-2 caps text-xs lg:max-w-[1040px] lg:justify-between lg:gap-8 lg:px-8 lg:text-[13px]">
        {NAV.map(([to, label, keepQ]) => (
          <li key={to} className="shrink-0">
            <NavLink
              to={{ pathname: to, search: keepQ ? search.replace(/([?&])v=[^&]*&?/, '$1').replace(/[?&]$/, '') : '' }}
              onClick={keepQ ? rememberVerse : () => { anchor.id = null }}
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

function Footer() {
  return (
    <footer className="mt-16 border-t border-line">
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
      </div>
    </footer>
  )
}

export default function App() {
  const { pathname, search } = useLocation()
  useLayoutEffect(() => {
    if (new URLSearchParams(search).has('v')) return
    const el = anchor.id && document.getElementById(anchor.id)
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - anchor.top)
    else window.scrollTo(0, 0)
    anchor.id = null
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <button type="button" onClick={() => document.getElementById('main')?.focus()} className="no-print sr-only focus:not-sr-only">Skip to content</button>
      <Nav over={pathname === '/'} />
      {pathname === '/' && <Hero />}
      <main id="main" tabIndex={-1} className="mx-auto max-w-[760px] px-4">
        <div key={pathname} className="route-fade">
        <Routes>
          <Route path="/" element={<Reading mode="all" />} />
          <Route path="/questions" element={<Reading mode="questions" />} />
          <Route path="/answers" element={<Reading mode="answers" />} />
          <Route path="/patterns" element={<Reading mode="patterns" />} />
          <Route path="/sources" element={<Sources />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Reading mode="all" />} />
        </Routes>
        </div>
      </main>
      <Footer />
    </>
  )
}
