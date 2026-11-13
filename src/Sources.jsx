import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { IMAGE_CREDIT } from './Hero.jsx'
import { EDITORIAL, COPY, AUDIO_ENABLED } from './content.js'
import { AudioCredit } from './Controls.jsx'
import Lines from './Lines.jsx'

const A = ({ href, children }) => (
  <a className="text-accent underline" href={href}>{children}</a>
)

const ROWS = [
  ['GP 1–12', 'CE 1.1.1–12', 'Same numbers'],
  ['GP 13a', '—', 'Not in the CE constituted text'],
  ['GP 13b', 'CE 1.1.13a', ''],
  ['GP 14a', '—', 'Not in the CE constituted text'],
  ['GP 14b', 'CE 1.1.13b', ''],
  ['GP 15–19', 'CE 1.1.14–18', 'Shifted by one'],
  ['GP 20a', 'CE 1.1.19a', 'CE reads śreṣṭhaguṇair for jyeṣṭhaguṇair'],
  ['GP 20b', '—', 'Not in the CE constituted text'],
  ['GP 21a', 'CE 1.1.19b', ''],
]

export default function Sources() {
  const [params] = useSearchParams()
  const ref = params.get('ref')
  useEffect(() => {
    if (ref) document.getElementById(ref)?.scrollIntoView({ block: 'center' })
  }, [ref])

  const item = (id, children) => (
    <li id={id} className={'rounded p-2 ' + (ref === id ? 'bg-accent-soft' : '')}>{children}</li>
  )

  return (
    <div className="space-y-8 py-6">
      <h1 className="text-4xl font-semibold">Sources &amp; method</h1>
      <p role="note" className="rounded-lg border border-gold bg-accent-soft/50 p-3 font-sans text-sm">
        <b>Draft.</b> The verse-by-verse split of Goldman’s paragraphs is a draft by <Link to="/about" className="underline">Mythematical</Link>, under{' '}review.
      </p>

      <section>
        <h2 className="text-2xl font-semibold">Bibliography</h2>
        <h3 className="mt-4 caps text-xs font-semibold text-gold-ink">Sanskrit</h3>
        <p className="my-2">
          The primary Sanskrit on every verse is the Baroda Critical Edition (constituted text), in IAST from
          GRETIL and in Devanāgarī from John Smith’s Unicode file. The Gita Press Sanskrit is the vulgate
          recension. It appears only in the three half-lines heard in the recitation that the Critical Edition
          does not have.
        </p>
        <p className="my-2">
          In the Conversation, the Devanāgarī is transliterated from the GRETIL IAST word by word, so each word
          lines up with its romanisation. The Critical Edition Sanskrit is shown with the two English
          translations made from it, Goldman’s and Debroy’s.
        </p>
        <ul className="space-y-2">
          {item('ce', <>G. H. Bhatt et al., eds., <i>The Vālmīki-Rāmāyaṇa: Critical Edition</i>, 7 vols. (Baroda: Oriental Institute,{'\u00a0'}1960–75).</>)}
          {item('gretil', <>“Rāmāyaṇa (Critical Edition),” data entry Muneo Tokunaga, contribution John Smith, GRETIL version 2020-04-16, <A href="https://gretil.sub.uni-goettingen.de/">gretil.sub.uni-goettingen.de</A>. Licence <A href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</A>. Source of the IAST text.</>)}
          {item('deva', <>John Smith, <i>Vālmīki Rāmāyaṇa</i>, Devanāgarī e-text, <A href="https://bombay.indology.info/ramayana/">bombay.indology.info/ramayana</A> (Bālakāṇḍa file dated 21 Oct 2021). Source of the Devanāgarī text.</>)}
          {AUDIO_ENABLED && item('audio', <AudioCredit />)}
        </ul>
        <h3 className="mt-4 caps text-xs font-semibold text-gold-ink">Translations</h3>
        <ul className="space-y-2">
          {item('goldman', <>Robert P. Goldman et al., trans., <i>The Rāmāyaṇa of Vālmīki: The Complete English Translation</i>, revised and edited by Robert P. Goldman and Sally J. Sutherland Goldman (Princeton: Princeton University Press, 2021), 51–52. Bālakāṇḍa translated by Robert P. Goldman. <A href="https://press.princeton.edu/">Publisher’s page</A>.</>)}
          {item('debroy', <>Bibek Debroy, trans., <i>The Valmiki Ramayana</i>, vol. 1 (Gurgaon: Penguin Random House India, 2017). <A href="https://www.penguin.co.in/">Publisher’s page</A>.</>)}
          {item('gp', <><i>Śrīmad Vālmīki Rāmāyaṇa</i>, with Sanskrit text and English translation (Gorakhpur: Gita Press), [p. ?]. <A href="https://www.gitapress.org/">gitapress.org</A>. The Devanāgarī of the three vulgate half-lines is transcribed verbatim from the Gita Press pages. Minor transcription slips are possible.</>)}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Image</h2>
        <p className="italic">{IMAGE_CREDIT}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Rights</h2>
        <p>
          Translations are quoted for scholarly commentary and comparison. Copyright remains with the
          translators and publishers. To request removal, write to{' '}
          <A href="mailto:anupriy.kanti@gmail.com">anupriy.kanti@gmail.com</A>.
        </p>
        <p className="mt-2">
          The Sanskrit e-texts are credited above under their own licences. This site is non-commercial,
          as the CC BY-NC-SA 4.0 licence of the GRETIL text requires.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Gita Press to Critical Edition</h2>
        <p>
          The original version of this mapping was keyed to Gita Press verse numbers. This site uses the
          Critical Edition numbers (1.1.n) as primary. The concordance for the verses shown here:
        </p>
        <div className="overflow-x-auto">
          <table className="mt-3 w-full border-collapse font-sans text-sm">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="py-1 pr-2">Gita Press</th>
                <th className="py-1 pr-2">Critical Edition</th>
                <th className="py-1">Note</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(r => (
                <tr key={r[0]} className="border-b border-line/60">
                  <td className="py-1 pr-2">{r[0]}</td>
                  <td className="py-1 pr-2">{r[1]}</td>
                  <td className="py-1">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted">
          “Not in the CE” here means not in the constituted text. Whether these half-lines appear in the
          Critical Edition’s apparatus or appendix has not been checked.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">How the mapping was made</h2>
        <Lines lines={COPY.count} className="my-3" />
        <ul className="list-disc space-y-2 pl-5">
          <li>The sixteen questions are the qualities Vālmīki names in CE 1.1.2–4, numbered Q1 to Q16 in the order the verses give them.</li>
          <li>Each mark in the matrix is Anupriy Kanti’s reading of where a verse of Nārada’s answer meets one of the sixteen qualities. The readings are still being checked against the printed Critical Edition.</li>
          <li>A mark is graded by how closely Nārada’s words meet Vālmīki’s: the same word, other words with the same sense, in part, or turned around. A quality with no mark is not answered in these verses.</li>
          <li>The nine colour themes are one way of grouping the questions for this site, not a classification from the text itself.</li>
          <li>Goldman translates in paragraphs that cover groups of verses (1.1.1–5, 6–11, 12–15, 16–24). This site splits each paragraph into one piece per verse, verbatim and in Goldman’s order. The split is <Link to="/about" className="underline">Mythematical</Link>’s, not Goldman’s, and each piece links to the whole paragraph. Goldman carries 1.1.18b into the sentence shown under 1.1.19. The last paragraph is shown only to the end of 1.1.19, where this site ends.</li>
          <li>Debroy also translates the Critical Edition. His English is shown at the verse it renders.</li>
          <li>Mapped by Anupriy Kanti with Claude (Anthropic) as research assistant. Readings are Anupriy’s.</li>
        </ul>
      </section>
      {EDITORIAL.map(p => (
        <aside key={p.id} className="rounded-lg border border-line bg-card p-4">
          <h2 className="text-xl font-semibold">{p.title}</h2>
          <p className="mt-2">{p.body}</p>
        </aside>
      ))}
    </div>
  )
}
