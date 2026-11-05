import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { VERSES, GOLDMAN, GP_NUM, GP_READINGS, QUESTIONS, PATTERNS, CITES, badgesFor } from './content.js'

const LAYERS = [
  ['goldman', 'Goldman (CE)'],
  ['debroy', 'Debroy (CE)'],
  ['gp', 'Gita Press (vulgate)'],
]

function Cite({ id }) {
  return (
    <Link to={`/sources?ref=${id}`} className="font-sans text-xs text-accent underline">
      {CITES[id]}
    </Link>
  )
}

function Badge({ id, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        'rounded-full border px-2 py-0.5 font-sans text-xs font-medium ' +
        (active ? 'border-accent bg-accent text-white' : 'border-accent/40 bg-accent-soft text-accent')
      }
    >
      {id}
    </button>
  )
}

function GoldmanBlock({ start, show }) {
  const b = GOLDMAN.blocks.find(x => x.start === start)
  if (!b || !show) return null
  return (
    <aside className="my-4 rounded-lg border-l-4 border-gold bg-card p-4">
      <p className="mb-1 font-sans text-xs font-semibold uppercase tracking-wide text-gold">
        Goldman, {b.range}
        {b.range !== b.label && <span className="normal-case"> (paragraph {b.label}, cut at 1.1.19)</span>}
      </p>
      <p>{b.text}</p>
      <Cite id="goldman" />
    </aside>
  )
}

function Verse({ v, layers, q, setQ, showBadges }) {
  const badges = showBadges ? badgesFor(v.n) : []
  const lit = q && badges.includes(q)
  const dim = q && showBadges && !lit
  return (
    <article
      id={`v${v.n}`}
      className={
        'my-4 rounded-lg border bg-card p-4 transition-opacity ' +
        (lit ? 'border-accent shadow-md' : 'border-line') +
        (dim ? ' opacity-50' : '')
      }
    >
      <header className="mb-2 flex flex-wrap items-baseline gap-2 font-sans">
        <span className="text-sm font-semibold">{v.ce}</span>
        {GP_NUM[v.n] && <span className="text-xs text-muted">{GP_NUM[v.n]}</span>}
        <span className="ml-auto flex flex-wrap gap-1">
          {badges.map(id => (
            <Badge key={id} id={id} active={q === id} onClick={() => setQ(q === id ? null : id)} />
          ))}
        </span>
      </header>
      <p lang="sa-Deva" className="deva text-xl">
        {v.dev[0]}<br />{v.dev[1]}
      </p>
      <p lang="sa-Latn" className="mt-1 italic text-muted">
        {v.iast[0]}<br />{v.iast[1]}
      </p>
      {GP_READINGS[v.n] && (
        <div className="mt-3 rounded bg-gp p-3 font-sans text-sm text-muted">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide">
            Gita Press reading, not in the CE constituted text
          </p>
          {GP_READINGS[v.n].map(r => (
            <p key={r.gp}>
              <span className="font-semibold">{r.gp}</span> <i lang="sa-Latn" className="font-serif text-base">{r.iast}</i>
            </p>
          ))}
        </div>
      )}
      {layers.debroy && (
        <div className="mt-3 border-t border-line pt-2">
          <p className="font-sans text-xs font-semibold uppercase tracking-wide text-muted">Debroy (CE)</p>
          <p className="text-muted italic">Text to be added.</p>
          <Cite id="debroy" />
        </div>
      )}
      {layers.gp && (
        <div className="mt-3 border-t border-line pt-2">
          <p className="font-sans text-xs font-semibold uppercase tracking-wide text-muted">Gita Press (vulgate)</p>
          <p className="text-muted italic">Text to be added.</p>
          <Cite id="gp" />
        </div>
      )}
    </article>
  )
}

function PatternCard({ p }) {
  return (
    <aside className="my-4 rounded-lg border border-dashed border-gold bg-paper p-4">
      <p className="font-sans text-xs font-semibold uppercase tracking-wide text-gold">Pattern</p>
      <h3 className="text-lg font-semibold">{p.title}</h3>
      <p>{p.body}</p>
    </aside>
  )
}

function QuestionCards({ q, setQ }) {
  return (
    <section aria-labelledby="sixteen" className="my-8">
      <h2 id="sixteen" className="text-2xl font-semibold">The sixteen questions</h2>
      <p className="font-sans text-sm text-muted">
        Tap a card to select it. Its echoes light up under Answers.
      </p>
      <ol className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {QUESTIONS.map(x => (
          <li key={x.id}>
            <button
              type="button"
              onClick={() => setQ(q === x.id ? null : x.id)}
              aria-pressed={q === x.id}
              className={
                'w-full rounded-lg border bg-card p-3 text-left ' +
                (q === x.id ? 'border-accent shadow-md' : 'border-line hover:border-accent/50')
              }
            >
              <span className="flex items-baseline justify-between font-sans text-xs text-muted">
                <span className="font-semibold text-accent">{x.id}</span>
                <span>CE 1.1.{x.v}</span>
              </span>
              <span lang="sa-Deva" className="deva block text-xl">{x.dev}</span>
              <span lang="sa-Latn" className="block italic">{x.iast}</span>
            </button>
            <p className="mt-1 flex flex-wrap gap-1 font-sans text-xs">
              {x.echo.length ? (
                x.echo.map(n => (
                  <Link
                    key={n}
                    to={`/answers?q=${x.id}`}
                    className="rounded-full bg-accent-soft px-2 py-0.5 text-accent"
                  >
                    1.1.{n}
                  </Link>
                ))
              ) : (
                <span className="rounded-full bg-gp px-2 py-0.5 text-muted">No word echo in 1.1.6–19</span>
              )}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Coverage() {
  return (
    <section aria-labelledby="coverage" className="my-8">
      <h2 id="coverage" className="text-2xl font-semibold">Coverage checklist</h2>
      <p className="font-sans text-sm text-muted">
        Which questions have a word echoed in Nārada’s answer, CE 1.1.6–19. This is a string match. A question with no word echo may still be answered in other words.
      </p>
      <table className="mt-3 w-full border-collapse font-sans text-sm">
        <thead>
          <tr className="border-b border-line text-left">
            <th className="py-1 pr-2">Q</th>
            <th className="py-1 pr-2">Quality</th>
            <th className="py-1">Echoed at</th>
          </tr>
        </thead>
        <tbody>
          {QUESTIONS.map(x => (
            <tr key={x.id} className="border-b border-line/60">
              <td className="py-1 pr-2 font-semibold text-accent">{x.id}</td>
              <td className="py-1 pr-2 font-serif italic">{x.iast}</td>
              <td className="py-1">{x.echo.length ? x.echo.map(n => `1.1.${n}`).join(', ') : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

function Legend() {
  return (
    <section aria-label="Key" className="my-6 rounded-lg border border-line bg-card p-4 font-sans text-sm">
      <h2 className="mb-2 font-serif text-lg font-semibold">Key</h2>
      <ul className="space-y-1">
        <li><span className="font-semibold">1.1.8</span> Critical Edition verse number. <span className="text-muted">GP 15</span> marks the Gita Press number where it differs.</li>
        <li><span className="rounded-full bg-accent-soft px-2 text-accent">Q2</span> A question whose word recurs in this verse. Tap to spotlight. Badges mark word echoes only. Answers in other words are not yet marked.</li>
        <li><span className="rounded bg-gp px-2">Gita Press reading</span> A vulgate half-line not in the CE constituted text.</li>
        <li><span className="border-l-4 border-gold pl-2">Goldman</span> One paragraph per verse group, shown at the head of the group.</li>
      </ul>
    </section>
  )
}

function Hero() {
  return (
    <header className="my-8">
      <div
        role="img"
        aria-label="Hero image to be added"
        className="mb-6 aspect-[16/7] w-full rounded-xl bg-gradient-to-br from-accent-soft via-paper to-gold/30"
      />
      <p className="font-sans text-sm uppercase tracking-widest text-gold">Rāmāyaṇa · Bālakāṇḍa · sarga 1</p>
      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Vālmīki’s 16 Questions</h1>
      <p className="mt-4">
        Vālmīki asks Nārada whether there is a man in the world today who has sixteen qualities. Nārada
        answers with Rāma. This site sets the questions beside the answer, verse by verse, in the
        Critical Edition Sanskrit with three English translations.
      </p>
      <p className="mt-3">
        One quality, kṛtajña, is the starting point of the SAI27 paper this site accompanies. No word in
        Nārada’s answer repeats it.
      </p>
    </header>
  )
}

const TITLES = {
  questions: ['Questions', 'The frame and the three question verses, CE 1.1.1–5.'],
  answers: ['Answers', 'Nārada’s answer, CE 1.1.6–19. Tap a badge to spotlight every verse that echoes that question.'],
  patterns: ['Patterns', 'Notes on what the alignment shows, and the coverage of all sixteen questions.'],
}

export default function Reading({ mode }) {
  const [params, setParams] = useSearchParams()
  const q = params.get('q')
  const setQ = id => {
    const next = new URLSearchParams(params)
    if (id) next.set('q', id)
    else next.delete('q')
    setParams(next, { replace: true })
  }
  const [layers, setLayers] = useState({ goldman: true, debroy: true, gp: true })

  const showQ = mode === 'all' || mode === 'questions'
  const showA = mode === 'all' || mode === 'answers'

  if (mode === 'patterns') {
    return (
      <div className="py-6">
        <h1 className="text-4xl font-semibold">{TITLES.patterns[0]}</h1>
        <p className="mt-2 text-muted">{TITLES.patterns[1]}</p>
        {PATTERNS.map(p => <PatternCard key={p.id} p={p} />)}
        <Coverage />
      </div>
    )
  }

  const verse = n => VERSES.find(v => v.n === n)
  const renderVerse = (n, showBadges) => (
    <div key={n}>
      <GoldmanBlock start={n} show={layers.goldman} />
      <Verse v={verse(n)} layers={layers} q={q} setQ={setQ} showBadges={showBadges} />
      {mode === 'all' && PATTERNS.filter(p => p.after === n).map(p => <PatternCard key={p.id} p={p} />)}
    </div>
  )

  return (
    <div className="py-2">
      {mode === 'all' ? (
        <>
          <Hero />
          <Legend />
        </>
      ) : (
        <div className="py-6">
          <h1 className="text-4xl font-semibold">{TITLES[mode][0]}</h1>
          <p className="mt-2 text-muted">{TITLES[mode][1]}</p>
        </div>
      )}

      <fieldset className="my-4 flex flex-wrap items-center gap-2 font-sans text-sm">
        <legend className="sr-only">English translations to show</legend>
        <span className="text-muted">English:</span>
        {LAYERS.map(([k, label]) => (
          <label key={k} className="flex cursor-pointer items-center gap-1 rounded-full border border-line bg-card px-3 py-1">
            <input
              type="checkbox"
              checked={layers[k]}
              onChange={() => setLayers({ ...layers, [k]: !layers[k] })}
              className="accent-[#9a3f1c]"
            />
            {label}
          </label>
        ))}
      </fieldset>

      {q && (
        <p className="my-2 font-sans text-sm">
          Selected: <span className="font-semibold text-accent">{q}</span>{' '}
          <i>{QUESTIONS.find(x => x.id === q)?.iast}</i>{' '}
          <button type="button" className="underline" onClick={() => setQ(null)}>Clear</button>
        </p>
      )}

      {showQ && (
        <section aria-labelledby="asks">
          <h2 id="asks" className="mt-8 text-3xl font-semibold">Vālmīki asks</h2>
          {[1, 2, 3, 4, 5].map(n => renderVerse(n, false))}
          <QuestionCards q={q} setQ={setQ} />
        </section>
      )}

      {showA && (
        <section aria-labelledby="answers">
          <h2 id="answers" className="mt-8 text-3xl font-semibold">Nārada answers</h2>
          {VERSES.filter(v => v.n >= 6).map(v => renderVerse(v.n, true))}
        </section>
      )}
    </div>
  )
}
