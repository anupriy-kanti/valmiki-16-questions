import { useState } from 'react'

const BASE = import.meta.env.BASE_URL

// The author, laid out like the Mahābhārata site. On the Conversation stage
// the two halves are two beats. About shows them one after the other.
// Bio verbatim from the Mahābhārata site.
export function AuthorHead({ level = 2 }) {
  const H = `h${level}`
  return (
    <div className="author mx-auto max-w-[720px] text-center">
      <p className="caps text-[11px] text-gold">The Author</p>
      <H id="author-name" className="mt-2 text-3xl sm:text-4xl">Anupriy Kanti</H>
      <div className="author-frame mx-auto mt-5">
        <img src={`${BASE}author.jpg`} width="800" height="800" loading="lazy" alt="Anupriy Kanti" className="block h-full w-full object-cover" />
      </div>
      <p className="author-lede mx-auto mt-5 max-w-[600px] text-lg italic">
        Anupriy Kanti is a storyteller and UX leader who loves building experiences and finding stories that
        explore, explain, and express Life as we{' '}know{' '}it.
      </p>
      <p className="author-bio mx-auto mt-3 max-w-[600px]">
        His research and practice are fuelled by a fascination with all things Too Fantastical — which turned
        into the platform <i>Mythematical</i>, where he explores global mythic traditions through structured
        analysis of narrative motifs and symbolic{' '}frameworks.
      </p>
    </div>
  )
}

export function AuthorPart() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    const url = window.location.href
    try { await navigator.clipboard.writeText(url) } catch { window.prompt('Copy this link', url) }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <div className="author mx-auto max-w-[720px] text-center">
      <p className="caps text-[10px] text-gold">Part of</p>
      <p className="author-part mx-auto mt-2 max-w-[600px] text-base">
        This site supplements the paper <i>Vālmīki’s Unanswered Question: Kṛtajña/<span lang="sa-Deva" className="deva not-italic">कृतज्ञ</span> as
        Described, Debated, &amp; Demonstrated through the Rāmāyaṇa</i>, for <i>Śabda, Artha, and
        Itihāsa: An Etymological Approach to Indian Storytelling</i> (Sindhu Veda Research Foundation
        with the Department of Sanskrit, University of Mumbai. Principal partner Mythouse.org), 2–3{' '}January{' '}2027.
      </p>
      <button type="button" onClick={copy} className="caps no-print mt-6 rounded border border-gold px-4 py-2 text-[11px] text-gold-bright hover:bg-accent-soft">
        Copy link to this page
      </button>
      <p role="status" className="mt-2 h-5 text-sm text-muted">{copied ? 'Link copied' : ''}</p>
    </div>
  )
}

export default function Author({ level = 2 }) {
  return (
    <section aria-labelledby="author-name" className="py-10">
      <AuthorHead level={level} />
      <div className="mt-8"><AuthorPart /></div>
    </section>
  )
}
