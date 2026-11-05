import { useEffect } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Reading from './Reading.jsx'
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

function Nav() {
  const { search } = useLocation()
  return (
    <nav aria-label="Main" className="sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur">
      <ul className="mx-auto flex max-w-[760px] gap-1 overflow-x-auto px-4 py-2 font-sans text-sm">
        {NAV.map(([to, label, keepQ]) => (
          <li key={to} className="shrink-0">
            <NavLink
              to={{ pathname: to, search: keepQ ? search : '' }}
              end
              className={({ isActive }) =>
                'block rounded-full px-3 py-1.5 ' +
                (isActive ? 'bg-accent text-white' : 'text-ink hover:bg-accent-soft')
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
  useEffect(() => {
    if (!new URLSearchParams(search).has('v')) window.scrollTo(0, 0)
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <button type="button" onClick={() => document.getElementById('main')?.focus()} className="sr-only focus:not-sr-only">Skip to content</button>
      <Nav />
      <main id="main" tabIndex={-1} className="mx-auto max-w-[760px] px-4">
        <Routes>
          <Route path="/" element={<Reading mode="all" />} />
          <Route path="/questions" element={<Reading mode="questions" />} />
          <Route path="/answers" element={<Reading mode="answers" />} />
          <Route path="/patterns" element={<Reading mode="patterns" />} />
          <Route path="/sources" element={<Sources />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Reading mode="all" />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
