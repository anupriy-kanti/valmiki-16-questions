const A = ({ href, children }) => (
  <a className="text-accent underline" href={href}>{children}</a>
)

export default function About() {
  return (
    <div className="space-y-8 py-6">
      <h1 className="text-4xl font-semibold">About</h1>

      <section>
        <h2 className="text-2xl font-semibold">Anupriy Kanti</h2>
        <p>
          UX strategist and content designer, and founder of <b>Mythematical</b>: “Comparing mythologies
          from different cultures and all things too fantastical.” Mythematical is part of Before &amp;
          Beyond History, with Prihistorica and Cosmonomic.
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-sans text-sm">
          <li><A href="https://instagram.com/mythematical">Instagram</A></li>
          <li><A href="https://youtube.com/@mythematical">YouTube</A></li>
          <li><A href="https://linkedin.com/company/mythematical">LinkedIn</A></li>
          <li><A href="mailto:anupriy.kanti@gmail.com">anupriy.kanti@gmail.com</A></li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">SAI27</h2>
        <p>
          This site supplements the paper <i>Vālmīki’s Unanswered Question: Kṛtajña/<span lang="sa-Deva" className="deva not-italic">कृतज्ञ</span> as
          Described, Debated, &amp; Demonstrated through the Rāmāyaṇa</i>, for <i>Śabda, Artha, and
          Itihāsa: An Etymological Approach to Indian Storytelling</i> (Sindhu Veda Research Foundation
          with the Department of Sanskrit, University of Mumbai. Principal partner Mythouse.org), 2–3 January 2027.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Method</h2>
        <p>Mapped by Anupriy Kanti with Claude (Anthropic) as research assistant. Readings are Anupriy’s.</p>
      </section>
    </div>
  )
}
