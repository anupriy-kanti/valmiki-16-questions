import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  VERSES, GOLDMAN, QUESTIONS, QUESTION_LINES, PATTERNS, CITES, CATS, ECHO_STYLE, PHASE_LABELS,
  catOf, answersFor, echoesFor,
} from './content.js'

const BASE = import.meta.env.BASE_URL

const LAYERS = [
  ['goldman', 'Goldman (CE)'],
  ['debroy', 'Debroy (CE)'],
  ['gp', 'Gita Press (vulgate)'],
]

const Label = ({ children, className = '' }) => (
  <p className={'font-sans text-xs font-semibold uppercase tracking-wide ' + className}>{children}</p>
)

function Cite({ id }) {
  return (
    <Link to={`/sources?ref=${id}`} className="font-sans text-xs text-accent underline">
      {CITES[id]}
    </Link>
  )
}

function QBadge({ id, active, onClick }) {
  const c = catOf(id)
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      title={QUESTIONS.find(q => q.id === id)?.label}
      style={{
        background: active ? c.text : c.bg,
        color: active ? '#fff' : c.text,
        borderColor: c.border,
      }}
      className="rounded-full border px-2 py-0.5 font-sans text-xs font-semibold"
    >
      {id}
    </button>
  )
}

function EchoPill({ echo, withVerse }) {
  const s = ECHO_STYLE[echo.type]
  return (
    <span
      style={{ background: s.bg, color: s.text, borderColor: s.border }}
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-sans text-xs"
    >
      <b aria-hidden="true">{s.sym}</b>
      <span>{echo.q} · <i>{echo.word}</i> · {s.tag}{withVerse && ` · 1.1.${echo.n}`}</span>
    </span>
  )
}

function GoldmanBlock({ start }) {
  const b = GOLDMAN.blocks.find(x => x.start === start)
  if (!b) return null
  return (
    <aside className="my-4 rounded-lg border-l-4 border-gold bg-card p-4">
      <Label className="mb-1 text-gold">
        Goldman, {b.range}
        {b.range !== b.label && <span className="normal-case"> (paragraph {b.label}, cut at 1.1.19)</span>}
      </Label>
      <p>{b.text}</p>
      <Cite id="goldman" />
    </aside>
  )
}

function Translation({ v, kind }) {
  const text = kind === 'debroy' ? v.debroy : v.gita
  if (!text) return null
  const name = kind === 'debroy' ? 'Debroy (CE)' : 'Gita Press (vulgate)'
  const gpNote = kind === 'gp' && (v.gitaNote || (v.gpLabel && `Gita Press ${v.gpLabel.replace('GP ', '')}`))
  return (
    <div className="mt-3 border-t border-line pt-2">
      <Label className="text-muted">
        {name}
        {gpNote && <span className="font-normal normal-case"> · {gpNote}</span>}
      </Label>
      <p>{text}</p>
      <Cite id={kind} />
    </div>
  )
}

function Verse({ v, layers, q, setQ, spotlight }) {
  const lit = q && v.answers.includes(q)
  const dim = spotlight && q && !lit
  const lines = QUESTION_LINES[v.n]
  return (
    <article
      id={`v${v.n}`}
      className={
        'my-4 rounded-lg border bg-card p-4 transition-opacity ' +
        (lit ? 'border-accent shadow-md' : 'border-line') +
        (dim ? ' opacity-45' : '')
      }
    >
      <header className="mb-2 flex flex-wrap items-baseline gap-2 font-sans">
        <span className="text-sm font-semibold">{v.ce}</span>
        {v.gpLabel && <span className="text-xs text-muted">{v.gpLabel}</span>}
        {lines && <span className="text-xs text-muted">{lines.range}</span>}
        <span className="ml-auto flex flex-wrap gap-1">
          {v.answers.map(id => (
            <QBadge key={id} id={id} active={q === id} onClick={() => setQ(q === id ? null : id)} />
          ))}
        </span>
      </header>

      {[0, 1].map(i => (
        <div key={i} className="mb-1">
          <p lang="sa-Deva" className="deva text-xl">{v.dev[i]}</p>
          <p lang="sa-Latn" className="italic text-muted">{v.iast[i]}</p>
          {lines && (
            <p className="mt-1 flex flex-wrap gap-1">
              {lines.lines[i].map(id => (
                <QBadge key={id} id={id} active={q === id} onClick={() => setQ(q === id ? null : id)} />
              ))}
            </p>
          )}
        </div>
      ))}

      {v.echoes && (
        <p className="mt-2 flex flex-wrap gap-1">
          {v.echoes.map(e => <EchoPill key={e.q + e.word} echo={e} />)}
        </p>
      )}

      {v.gpOnly && (
        <div className="mt-3 rounded bg-gp p-3 text-muted">
          <Label className="mb-1">Gita Press reading, not in the CE constituted text</Label>
          {v.gpOnly.map(r => (
            <div key={r.gp} className="mb-1">
              <span className="font-sans text-xs font-semibold">{r.gp}</span>{' '}
              <span lang="sa-Deva" className="deva">{r.dev}</span>
              <br />
              <i lang="sa-Latn">{r.iast}</i>
            </div>
          ))}
        </div>
      )}

      {layers.debroy && <Translation v={v} kind="debroy" />}
      {layers.gp && <Translation v={v} kind="gp" />}

      {lines?.note && <p className="mt-3 font-sans text-sm text-muted">{lines.note}</p>}
      {v.note && <p className="mt-3 border-l-2 border-line pl-3 font-sans text-sm text-muted">{v.note}</p>}
      {v.divergenceNote && (
        <div className="mt-3 rounded border border-[#fca5a5] bg-[#fee2e2] p-3 font-sans text-sm text-[#7f1d1d]">
          <Label className="mb-1">Edition divergence ⚠</Label>
          {v.divergenceNote}
        </div>
      )}
    </article>
  )
}

function PatternCard({ p }) {
  const rows = p.echoType
    ? VERSES.flatMap(v => (v.echoes || []).filter(e => e.type === p.echoType).map(e => ({ n: v.n, ...e })))
    : []
  return (
    <aside className="my-4 rounded-lg border border-dashed border-gold bg-paper p-4">
      <Label className="text-gold">Pattern</Label>
      <h3 className="text-lg font-semibold">{p.title}</h3>
      {rows.length > 0 && (
        <p className="my-2 flex flex-wrap gap-1">
          {rows.map(e => <EchoPill key={e.n + e.word} echo={e} withVerse />)}
        </p>
      )}
      <p>{p.body}</p>
    </aside>
  )
}

function QuestionCards({ q, setQ }) {
  return (
    <section aria-labelledby="sixteen" className="my-8">
      <h2 id="sixteen" className="text-2xl font-semibold">The sixteen questions</h2>
      <p className="font-sans text-sm text-muted">
        Sixteen qualities asked across three ślokas, 1.1.2–4, spread 6 + 5 + 5. Tap a card to select it,
        then open Answers to see every verse that answers it.
      </p>
      <ol className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {QUESTIONS.map(x => {
          const c = catOf(x.id)
          const hits = answersFor(x.id)
          const sel = q === x.id
          return (
            <li key={x.id}>
              <div
                style={{ background: c.bg, borderColor: sel ? c.text : c.border }}
                className={'h-full rounded-lg border p-3 ' + (sel ? 'ring-2 ring-offset-1' : '')}
              >
                <button
                  type="button"
                  onClick={() => setQ(sel ? null : x.id)}
                  aria-pressed={sel}
                  className="w-full text-left"
                >
                  <span className="flex items-baseline justify-between font-sans text-xs" style={{ color: c.text }}>
                    <span className="font-bold">{x.id} · {x.label}</span>
                    <span>1.1.{x.v}</span>
                  </span>
                  <span lang="sa-Deva" className="deva block text-xl">{x.dev}</span>
                  <span lang="sa-Latn" className="block italic">{x.iast}</span>
                  <span className="block text-base">{x.text}</span>
                </button>
                <p className="mt-2 flex flex-wrap gap-1 font-sans text-xs">
                  {hits.length ? (
                    hits.map(n => (
                      <Link
                        key={n}
                        to={`/answers?q=${x.id}`}
                        style={{ color: c.text, borderColor: c.border }}
                        className="rounded border bg-white/60 px-2 py-0.5 font-semibold"
                      >
                        1.1.{n}
                      </Link>
                    ))
                  ) : (
                    <span className="italic" style={{ color: c.text }}>Not directly answered</span>
                  )}
                </p>
                {echoesFor(x.id).length > 0 && (
                  <p className="mt-1 flex flex-wrap gap-1">
                    {echoesFor(x.id).map(e => <EchoPill key={e.n + e.word} echo={e} withVerse />)}
                  </p>
                )}
                {x.alert && <p className="mt-2 font-sans text-xs italic" style={{ color: c.text }}>↳ {x.alert}</p>}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function Coverage() {
  return (
    <section aria-labelledby="coverage" className="my-8">
      <h2 id="coverage" className="text-2xl font-semibold">Coverage checklist</h2>
      <p className="font-sans text-sm text-muted">
        For each of the sixteen questions, the verses that answer it, and any place where the answer repeats
        the question’s exact word. Where a question has no verse listed, it is never answered directly.
      </p>
      <ul className="mt-3 space-y-2">
        {QUESTIONS.map(x => {
          const c = catOf(x.id)
          const hits = answersFor(x.id)
          return (
            <li key={x.id} style={{ background: c.bg, borderColor: c.border }} className="rounded-lg border p-3">
              <p className="flex flex-wrap items-baseline gap-2">
                <span className="font-sans text-xs font-bold" style={{ color: c.text }}>{x.id}</span>
                <span lang="sa-Deva" className="deva text-lg">{x.dev}</span>
                <i>{x.iast}</i>
              </p>
              <p className="font-sans text-xs" style={{ color: c.text }}>
                {hits.length ? hits.map(n => `1.1.${n}`).join(' · ') : <i>Not directly answered</i>}
              </p>
              {echoesFor(x.id).length > 0 && (
                <p className="mt-1 flex flex-wrap gap-1">
                  {echoesFor(x.id).map(e => <EchoPill key={e.n + e.word} echo={e} withVerse />)}
                </p>
              )}
              {x.alert && <p className="mt-1 font-sans text-xs italic" style={{ color: c.text }}>↳ {x.alert}</p>}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function Legend() {
  const [open, setOpen] = useState(null)
  const toggle = k => setOpen(open === k ? null : k)
  const active = open && (CATS[open]
    ? { name: CATS[open].label, ...CATS[open] }
    : { name: `${ECHO_STYLE[open].sym} ${ECHO_STYLE[open].tag} echo`, ...ECHO_STYLE[open] })
  return (
    <section aria-labelledby="key" className="my-6 space-y-2 rounded-lg border border-line bg-card p-4">
      <h2 id="key" className="text-lg font-semibold">Key</h2>
      <p className="font-sans text-xs text-muted">Tap any chip to see what it means.</p>
      <div className="flex flex-wrap gap-1.5">
        {Object.entries(CATS).map(([k, c]) => (
          <button key={k} type="button" onClick={() => toggle(k)} aria-pressed={open === k}
            style={{ background: c.bg, color: c.text, borderColor: open === k ? c.text : c.border }}
            className="rounded-full border px-2 py-0.5 font-sans text-xs">{c.label}</button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {Object.entries(ECHO_STYLE).map(([k, s]) => (
          <button key={k} type="button" onClick={() => toggle(k)} aria-pressed={open === k}
            style={{ background: s.bg, color: s.text, borderColor: open === k ? s.text : s.border }}
            className="rounded-full border px-2 py-0.5 font-sans text-xs"><b aria-hidden="true">{s.sym}</b> {s.tag} echo</button>
        ))}
      </div>
      {active && (
        <div role="status" style={{ background: active.bg, color: active.text, borderColor: active.border }} className="rounded-lg border px-3 py-2">
          <p className="font-sans text-xs font-semibold">{active.name}</p>
          <p className="text-sm">{active.desc}</p>
        </div>
      )}
      <ul className="space-y-1 pt-2 font-sans text-xs text-muted">
        <li><b className="text-ink">1.1.8</b> Critical Edition verse number. <b>GP 15</b> marks the Gita Press number where it differs.</li>
        <li><span className="rounded bg-gp px-1">Gita Press reading</span> A vulgate half-line not in the CE constituted text.</li>
        <li><span className="border-l-4 border-gold pl-1">Goldman</span> One paragraph per verse group, shown at the head of the group.</li>
      </ul>
      <p className="font-sans text-xs italic text-muted">
        The nine themes are one way of grouping the questions for this experience, not a classification from the text itself.
      </p>
    </section>
  )
}

function Hero() {
  return (
    <header className="mb-6">
      <img
        src={`${BASE}hero.jpg`}
        width="1024"
        height="572"
        alt="At dusk in a forest hermitage, the sage Vālmīki sits with a vīṇā and speaks with the elder sage Nārada, who listens with folded hands."
        className="-mx-4 block h-auto w-[calc(100%+2rem)] max-w-none sm:mx-0 sm:mt-6 sm:w-full sm:rounded-xl"
      />
      <p className="mt-6 font-sans text-sm uppercase tracking-widest text-gold">Rāmāyaṇa · Bālakāṇḍa · sarga 1</p>
      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Vālmīki’s 16 Questions</h1>
      <p className="text-lg italic text-muted">Beginning of the Bālakāṇḍa</p>
      <p className="mt-1 font-sans text-xs uppercase tracking-wider text-muted">By Anupriy Kanti · Mythematical</p>
      <div className="mt-5 space-y-3">
        <p>
          The Rāmāyaṇa opens with a question. Before the story begins, the sage Vālmīki asks the sage Nārada
          whether any truly complete person is alive in the world right now, and lists sixteen qualities such
          a person would have. Nārada answers yes: a prince named Rāma, whom he then describes at length. This
          site places those sixteen questions beside Nārada’s answer, so you can see which quality is answered where.
        </p>
        <p>
          Reading the opening this way turns it into a piece of design you can inspect. Some qualities are
          answered many times over, one is never answered directly, and in the Sanskrit the answer sometimes
          repeats the exact word of the question. These patterns show how carefully the epic’s first lines are built.
        </p>
        <p className="font-sans text-sm text-muted">
          Each verse appears in the Sanskrit of the Critical Edition (CE), in Devanāgarī and in Roman letters
          (IAST), with three English translations to compare: Robert P. Goldman’s and Bibek Debroy’s (both of the
          CE) and the Gita Press edition’s. A <i>śloka</i> is a verse, and “1.1.8” means Bālakāṇḍa, sarga 1,
          verse 8 in the Critical Edition. Use the menu above to read only the Questions, only the Answers, or
          the Patterns.
        </p>
      </div>
    </header>
  )
}

const TITLES = {
  questions: ['Questions', 'The sixteen qualities, grouped by the three verses they come from, with the frame verses around them.'],
  answers: ['Answers', 'Nārada’s reply, read verse by verse. The coloured tags mark which of the sixteen questions each verse answers. Tap a tag to spotlight it.'],
  patterns: ['Patterns', 'The notable findings from mapping the questions to the answer, and a checklist of where each question is answered.'],
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

  const nums = mode === 'questions' ? [1, 2, 3, 4, 5] : mode === 'answers' ? VERSES.filter(v => v.n >= 6).map(v => v.n) : VERSES.map(v => v.n)
  let lastPhase = null

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

      <fieldset className="z-10 -mx-4 sm:sticky sm:top-[49px] my-4 flex flex-wrap items-center gap-2 bg-paper/95 px-4 py-2 font-sans text-sm backdrop-blur">
        <legend className="sr-only">English translations to show</legend>
        <span className="text-muted" aria-hidden="true">English:</span>
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
        {q && (
          <span className="flex items-center gap-1">
            <QBadge id={q} active onClick={() => setQ(null)} />
            <i>{QUESTIONS.find(x => x.id === q)?.iast}</i>
            <button type="button" className="underline" onClick={() => setQ(null)}>Clear</button>
          </span>
        )}
      </fieldset>

      {nums.map(n => {
        const v = VERSES.find(x => x.n === n)
        const phaseHead = v.phase !== lastPhase && PHASE_LABELS[v.phase]
        lastPhase = v.phase
        return (
          <div key={n}>
            {n === 1 && <h2 className="mt-8 text-3xl font-semibold">Vālmīki asks</h2>}
            {n === 6 && <h2 className="mt-10 text-3xl font-semibold">Nārada answers</h2>}
            {phaseHead && <Label className="mt-6 text-gold">{phaseHead}</Label>}
            {layers.goldman && <GoldmanBlock start={n} />}
            <Verse v={v} layers={layers} q={q} setQ={setQ} spotlight={mode !== 'questions'} />
            {mode === 'all' && PATTERNS.filter(p => p.after === n).map(p => <PatternCard key={p.id} p={p} />)}
            {n === 5 && mode !== 'answers' && <QuestionCards q={q} setQ={setQ} />}
          </div>
        )
      })}
    </div>
  )
}
