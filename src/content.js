// Content moved from source/Valmikis_16_Questions.jsx (artefact v6), renumbered
// from Gita Press (GP) to Critical Edition (CE) numbers via data/gp-ce-concordance.md.
// Every interpretive note below is the artefact's own, listed in REVIEW.md.
import data from './data/verses.json'
import answerMap from '../data/answer-map.json'
import timings from '../data/audio-timings.json'

// ─── Audio settings (MILESTONE-04 §6) ───────────────────────────────────────
// AUDIO_ENABLED false: no Sound control, no credit, no audio is loaded.
// AUDIO_SYNC false: verse-window playback stays, the highlight does not follow.
export const AUDIO_ENABLED = true
export const AUDIO_SYNC = true
export const AUDIO_FILE = 'audio/vr-1-1-1-to-19-bhide.mp3'

export const GOLDMAN = data.goldman

// ─── Nine themes (artefact categories) ──────────────────────────────────────
export const Q_CAT = {
  Q1: 'excellence', Q2: 'excellence', Q3: 'dharmic', Q4: 'dharmic',
  Q5: 'commitment', Q6: 'commitment', Q7: 'social', Q8: 'social',
  Q9: 'intellectual', Q10: 'intellectual', Q11: 'aesthetic',
  Q12: 'inner', Q13: 'inner', Q14: 'radiance', Q15: 'radiance', Q16: 'cosmic',
}
// Dark-page versions of the artefact's nine colours: same hue, deep tinted fill,
// light text (all at least 8.5:1 on their fill), brighter dot.
export const CATS = {
  excellence: { label: 'Excellence', dot: '#e19238', bg: '#442a0e', text: '#f2cfa8', border: '#8d4f0a', desc: 'The big summary qualities: being brave, and being complete in every virtue. The other themes are pieces of these two.' },
  dharmic: { label: 'Dharmic Knowledge', dot: '#5182ef', bg: '#1c2540', text: '#b3c8f8', border: '#214393', desc: 'Knowing what is right (dharma), and being mindful of what others have done for you.' },
  commitment: { label: 'Word & Vow', dot: '#45b56e', bg: '#19331d', text: '#addfc0', border: '#186a33', desc: 'Speaking the truth, and keeping firmly to one’s promises.' },
  social: { label: 'Social Conduct', dot: '#3da9a0', bg: '#17302a', text: '#aadad5', border: '#126158', desc: 'Behaving well, and caring for the welfare of every living being.' },
  intellectual: { label: 'Learning & Skill', dot: '#9661f1', bg: '#301c41', text: '#d1baf9', border: '#552b95', desc: 'Being learned, and being capable or powerful.' },
  aesthetic: { label: 'Beauty', dot: '#e25292', bg: '#441827', text: '#f2b3cf', border: '#8e1f4e', desc: 'Having a pleasing, lovable appearance.' },
  inner: { label: 'Inner Mastery', dot: '#ee793d', bg: '#48230f', text: '#f8c5aa', border: '#973d0e', desc: 'Being in control of oneself, and having mastered anger.' },
  radiance: { label: 'Radiance & Purity', dot: '#d5a136', bg: '#412e0d', text: '#ecd6a7', border: '#845b09', desc: 'Shining with splendour, and being free of jealousy or fault-finding.' },
  cosmic: { label: 'Cosmic Power', dot: '#e35151', bg: '#451815', text: '#f3b3b3', border: '#8e1f1d', desc: 'The battle-power so great that even the gods fear it when his anger rises.' },
}
export const catOf = id => CATS[Q_CAT[id]]

export const PHASE_LABELS = {
  frame: 'Frame', questionref: 'The Questions (1.1.2–4)', identification: 'Identification',
  opening: 'Opening Portrait', physical: 'Physical Portrait', ethical: 'Ethical Portrait',
  cosmic: 'Cosmic Comparisons', closing: 'Closing Anchor and Narrative Begins',
}

// ─── Questions ──────────────────────────────────────────────────────────────
export const QUESTIONS = [
  { id: 'Q1', v: 2, dev: 'गुणवान्', iast: 'guṇavān', label: 'All Virtues', text: 'Who is full of virtues?' },
  { id: 'Q2', v: 2, dev: 'वीर्यवान्', iast: 'vīryavān', label: 'Prowess', text: 'Who is possessed of prowess?' },
  { id: 'Q3', v: 2, dev: 'धर्मज्ञ', iast: 'dharmajña', label: 'Knows Dharma', text: 'Who knows what is right?' },
  { id: 'Q4', v: 2, dev: 'कृतज्ञ', iast: 'kṛtajña', label: 'Kṛtajña', text: 'Who is conscious of services done?',
    alert: 'No verbatim answer in EITHER edition. Nearest is smṛtimān (स्मृतिमान्, memory) at 1.1.14 — a semantic neighbour, not an answer.' },
  { id: 'Q5', v: 2, dev: 'सत्यवाक्य', iast: 'satyavākya', label: 'Truthful', text: 'Who is truthful of speech?' },
  { id: 'Q6', v: 2, dev: 'दृढव्रत', iast: 'dṛḍhavrata', label: 'Firm of Resolve', text: 'Who is firm of resolve?',
    alert: 'Nearest answer: the Himalaya-firmness simile at 1.1.16.' },
  { id: 'Q7', v: 3, dev: 'चारित्र', iast: 'cāritra', label: 'Right Conduct', text: 'Who is of right conduct?' },
  { id: 'Q8', v: 3, dev: 'सर्वभूतेषु हितः', iast: 'sarvabhūteṣu hitaḥ', label: 'Friend to All', text: 'Who is friendly to all living beings?' },
  { id: 'Q9', v: 3, dev: 'विद्वान्', iast: 'vidvān', label: 'Man of Knowledge', text: 'Who is a man of knowledge?' },
  { id: 'Q10', v: 3, dev: 'समर्थ', iast: 'samartha', label: 'Powerful', text: 'Who is powerful?' },
  { id: 'Q11', v: 3, dev: 'प्रियदर्शन', iast: 'priyadarśana', label: 'Lovable Appearance', text: 'Who has a singularly lovable appearance?',
    alert: 'Most expanded (whole physical portrait) AND echoed verbatim twice — 1.1.15 and 1.1.17.' },
  { id: 'Q12', v: 4, dev: 'आत्मवान्', iast: 'ātmavān', label: 'Subdued Self', text: 'Who has subdued his self?' },
  { id: 'Q13', v: 4, dev: 'जितक्रोध', iast: 'jitakrodha', label: 'Conquered Anger', text: 'Who has conquered anger?',
    alert: 'The word krodha (क्रोध) returns at 1.1.17 — but inverted: his anger IS the doomsday fire. Answered by its power, not its conquest.' },
  { id: 'Q14', v: 4, dev: 'द्युतिमान्', iast: 'dyutimān', label: 'Splendour', text: 'Who is possessed of splendour?' },
  { id: 'Q15', v: 4, dev: 'अनसूयक', iast: 'anasūyaka', label: 'Above Fault-finding', text: 'Who is above fault-finding?',
    alert: 'Answered through equanimity — adīnātmā (अदीनात्मा, 1.1.14), sarvasama (सर्वसम, 1.1.15).' },
  { id: 'Q16', v: 4, dev: 'बिभ्यति देवाः', iast: 'bibhyati devāḥ', label: 'Whom Gods Dread', text: 'Whom do the very gods dread when his wrath is provoked in battle?',
    alert: 'Answered only in the fire-of-dissolution simile at 1.1.17.' },
]

// How the 16 sit on the two lines of each question verse (6 + 5 + 5).
export const QUESTION_LINES = {
  2: { range: 'Q1–Q6', lines: [['Q1', 'Q2'], ['Q3', 'Q4', 'Q5', 'Q6']],
    note: 'The opening pair (guṇavān, vīryavān) frames everything after — line 2 packs four more.' },
  3: { range: 'Q7–Q11', lines: [['Q7', 'Q8'], ['Q9', 'Q10', 'Q11']] },
  4: { range: 'Q12–Q16', lines: [['Q12', 'Q13', 'Q14', 'Q15'], ['Q16']],
    note: 'Q16 stands alone in the final line — the only question carrying a condition (jātaroṣasya saṃyuge, “when his wrath is provoked in battle”).' },
}

// ─── Per-verse layer, keyed by CE verse number ──────────────────────────────
// gpLabel: the Gita Press verse(s) the English strings come from.
const META = {
  1: { phase: 'frame',
    debroy: 'Vālmīki puts his question to Nārada, chief of hermits, foremost of the eloquent, ever engaged in askesis and study of the Vedas.',
    gita: 'The ascetic Vālmīki put the following question direct to Nārada, the chief of hermits, foremost of those skilled in expression.' },
  2: { phase: 'questionref' },
  3: { phase: 'questionref' },
  4: { phase: 'questionref' },
  5: { phase: 'frame',
    debroy: '“I wish to hear this; my curiosity is great. You alone are capable of knowing such a man.”',
    gita: '“I wish to hear this; for there is a great curiosity in my mind about it, while you are capable of knowing such a man, O eminent seer!”' },
  6: { phase: 'frame',
    debroy: 'Hearing the appeal, Nārada — knower of the three worlds — was delighted and said, “Listen.”',
    gita: 'Hearing this appeal, the sage Nārada, who possessed knowledge of the three worlds, said, “Listen!” and greatly delighted, addressed these words.' },
  7: { phase: 'frame',
    debroy: '“Using my intelligence, I will tell you about such a man. I have heard about him.”',
    gita: '“I shall duly consider and tell you of such a hero. Be pleased to hear from me of the man endowed with the manifold and rare virtues.”',
    note: 'The mediation is explicit in Debroy: the omniscient sage answers a present-tense question with “I have heard about him” — reported knowledge, not direct sight.' },
  8: { phase: 'identification',
    gita: 'Descended in the line of Ikṣvāku, known by the name of Rāma. He has fully controlled his mind, is very powerful, radiant (dyutimān) and resolute, and has brought his senses under control.',
    debroy: 'He was born in the lineage of Ikṣvāku and is known to people as Rāma. He is self-controlled in his soul and immensely valorous. He is radiant, possesses fortitude and is capable of controlling.',
    note: 'Nārada gives the name and lineage first, answering a question no one asked. The word dyutimān returns here verbatim from 1.1.4.' },
  9: { phase: 'opening',
    gita: 'Intelligent, sagacious, eloquent, glorious, an exterminator of foes. Broad shoulders, powerful arms, a neck shaped as a conch, a stout chin.',
    debroy: 'He is intelligent and follows good policy. He is eloquent and handsome. He is a destroyer of enemies. He possesses broad shoulders and mighty arms. His neck is like a conch shell and his cheekbones stand out.' },
  10: { phase: 'physical',
    gita: 'Broad chest, a mighty bow, a collar-bone covered with flesh, capable of subduing foes. Long arms reaching his knees, a well-formed head, a shapely forehead, a charming gait.',
    debroy: 'His chest is broad and his bow is huge. He is a subjugator of enemies and his collarbones are hidden. His arms stretch down to his knees and he possesses an excellent head and a beautiful forehead. His tread is superb.' },
  11: { phase: 'physical',
    gita: 'Of medium stature, neither tall nor short, well-proportioned limbs, a shining complexion, mighty, a rounded chest, large eyes, full of splendour, auspicious marks on his body.',
    debroy: 'He is medium in size and his limbs are well proportioned. He is pleasant in complexion and powerful. His chest is muscled and his eyes are large. He is prosperous and possesses all the auspicious qualities.',
    note: 'Verses 1.1.9–11: the physical portrait — three whole ślokas for a single question (Q11).' },
  12: { phase: 'ethical',
    gita: 'He knows the secret of virtue (dharmajña), true to his promise, intent on the good of the people. Illustrious, full of wisdom, pure, self-controlled, of concentrated mind.',
    debroy: 'He knows about dharma. He is firm in adhering to the truth and is devoted to the welfare of the subjects. He is famous and full of learning. He is pure, controlled and has restrained himself.',
    note: 'धर्मज्ञः returns verbatim from 1.1.2 — the cleanest single-word answer.' },
  13: { phase: 'ethical', gpLabel: 'GP 13–14',
    gita: 'A supporter of creation like Brahmā, affluent, the slayer of his enemies, a protector of living beings, a staunch defender of faith. A vindicator of his own virtue, protector of his own people. He knows the truth of the Vedas and the six auxiliary sciences, and is a past master in archery.',
    debroy: 'He is a protector of the world of the living and is also a protector of dharma. He knows the truth about the Vedas and Vedāṅgas and is skilled in dhanurveda. He knows the truth about all the sacred texts.',
    gpOnly: [
      { gp: 'GP 13a', dev: 'प्रजापतिसमः श्रीमान् धाता रिपुनिषूदनः', iast: 'prajāpatisamaḥ śrīmān dhātā ripuniṣūdanaḥ' },
      { gp: 'GP 14a', dev: 'रक्षिता स्वस्य धर्मस्य स्वजनस्य च रक्षिता', iast: 'rakṣitā svasya dharmasya svajanasya ca rakṣitā' },
    ],
    note: 'Gita Press reading. Not in the Critical Edition’s constituted text, so absent from the CE translations.' },
  14: { phase: 'ethical', gpLabel: 'GP 15',
    gita: 'He knows the real meaning of all the scriptures, possessed of a sharp memory (smṛtimān) and quick wit. Popular in all the worlds, pious, high-minded, shrewd.',
    debroy: 'He is resplendent and has knowledge of the smṛti texts. He is virtuous and is loved by all the people. He can discriminate and is not distressed in his soul.',
    note: 'स्मृतिमान् (memory) is the nearest the portrait comes to कृतज्ञ (Q4) — an adjacency in the same semantic field, NOT an answer to it.' },
  15: { phase: 'ethical', gpLabel: 'GP 16',
    gita: 'Always sought by the righteous as the ocean is by rivers. Noble, alike to all, and always wears a pleasing countenance (priyadarśana).',
    debroy: 'Just as all rivers head towards the ocean, all virtuous people approach him. He is noble and impartial towards everyone.',
    note: 'The first simile — righteous people seeking him as rivers seek the ocean — marks the shift into the grand, cosmic comparisons. The word priyadarśana also returns here, verbatim, for the first of its two appearances.' },
  16: { phase: 'cosmic', gpLabel: 'GP 17',
    gita: 'Endowed with all excellences, enhancing the delight of his mother Kausalyā. He vies with the ocean in profundity and compares with the Himālaya in firmness.',
    debroy: 'He alone is the handsome one. The one who extends Kausalyā’s lineage possesses all the qualities. In his gravity, he is like the ocean. In his patience, he is like the Himalayas.',
    note: 'Himalaya-firmness (धैर्येण हिमवानिव) is the nearest answer to Q6 (firm of resolve).' },
  17: { phase: 'cosmic', gpLabel: 'GP 18', divergence: true,
    gita: 'A replica of Viṣṇu in prowess (vīrya), pleasing of aspect as the moon (priyadarśana). In anger (krodha) he resembles the destructive fire at the end of creation, and is a counterpart of Mother Earth in forbearance (kṣamā).',
    debroy: 'He is like Viṣṇu in valour. He is as handsome as the moon. In his rage, he is like the fire of destruction.',
    divergenceNote: 'CE 1.1.17d kṣamayā pṛthivīsamaḥ (क्षमया पृथिवीसमः) is in the Critical Edition’s constituted text. Goldman renders it “yet he rivals the earth in forbearance.” Debroy’s English omits this fourth pāda: a translator’s prose compression, not a textual absence in the CE.' },
  18: { phase: 'cosmic', gpLabel: 'GP 19',
    gita: 'He equals Kubera in liberality and is another Dharma, as it were, in point of truthfulness. — That Rāma, endowed with such qualities, whose valour is truth…',
    debroy: 'In generosity, he is like the lord of riches. Yet again, he is like Dharma in truthfulness.',
    note: 'Liberality (tyāga) is not one of the sixteen qualities asked about, so Nārada adds it himself. The verse’s second half begins the run of describing words that carries grammatically into 1.1.19.' },
  19: { phase: 'closing', gpLabel: 'GP 20a + 21a',
    gita: '…the eldest, endowed with the best qualities, the dear son of Daśaratha, devoted to the welfare of his subjects out of a desire to please them.',
    gitaNote: 'Gita Press 20, including 20b',
    debroy: 'Rāma possesses such qualities and truth is his valour. He is the eldest and possesses the best of qualities. He is Dasharatha’s beloved son.',
    gpOnly: [
      { gp: 'GP 20b', dev: 'प्रकृतीनां हितैर्युक्तं प्रकृतिप्रियकाम्यया', iast: 'prakṛtīnāṃ hitair yuktaṃ prakṛtipriyakāmyayā' },
    ],
    note: 'This is the seam between description and story — but a join, not a stop. The describing words here are grammatically what the verb “wished” (ऐच्छत्, aicchat) in 1.1.19b acts upon: the king wished to crown this Rāma. Debroy’s English masks the join by ending a sentence at “Dasharatha’s beloved son.” The questionnaire closes and the story begins in one continuous sentence. [High confidence — a standard reading of the grammar in the verses shown.]' },
}

export const VERSES = data.verses.map(v => ({ ...v, ...META[v.n] }))

// ─── Editorial cards (Sources & method) ─────────────────────────────────────
export const EDITORIAL = [
  { id: 'divergence', title: 'Edition divergence ⚠',
    body: 'At 1.1.17, kṣamayā pṛthivīsamaḥ is in the Critical Edition’s constituted text. Goldman renders it “yet he rivals the earth in forbearance.” Debroy’s English omits this fourth pāda: a translator’s prose compression, not a textual absence in the CE. In the other direction, three Gita Press half-lines (GP 13a, 14a and 20b) are not in the Critical Edition’s constituted text, so they are absent from the CE translations. They are heard in the recitation, and shown under 1.1.13 and 1.1.19 while they play.' },
  { id: 'provenance', title: 'On translation provenance',
    body: 'Both Debroy and Goldman translate the Baroda CE, but they are not comparable undertakings. Debroy’s distinction is being the first single-handed English translator of the complete CE (all seven kāṇḍas, ~2017). Goldman (Princeton, 1984–2016) is CE-based and complete but a multi-scholar consortium across four decades — so “Goldman vs. Debroy” is not a like-for-like comparison of solo work, even though both are legitimately CE-sourced.' },
]

export const CITES = {
  goldman: 'Goldman 2021, pp. 51–52',
  debroy: 'Debroy 2017, vol. 1 [p. ?]',
  gp: 'Gita Press [p. ?]',
}


// ─── The 16 qualities and Nārada's answering words (MILESTONE-04) ───────────
// Read from data/answer-map.json (the vault's Scaffold A). Nothing is regraded
// here. `short` is the board and matrix form, `full` the form in the detail.
const FULL_DEV = { Q7: 'चारित्रेण युक्तः', Q11: 'एकप्रियदर्शन', Q16: 'कस्य बिभ्यति देवाः … संयुगे' }
const Q_STEM = { Q8: 'sarvabhūteṣu', Q15: 'nasūyak', Q16: 'bibhyati' }
const stem = w => w.split(' ')[0].replace(/[aāḥ]$/, '')
const unitOf = (ce, word) => {
  const v = data.verses.find(x => x.ce === ce)
  const flat = v.words.flat()
  const k = flat.findIndex(w => w.i === word)
  return { n: v.n, ce, word, dev: flat[k].d, k }
}
export const QUALITIES = answerMap.qualities.map(a => {
  const q = QUESTIONS.find(x => x.id === a.q)
  return {
    id: a.q, v: q.v, short: q.iast, dev: q.dev, full: a.iast, fullDev: FULL_DEV[a.q] || q.dev,
    gloss: a.gloss, grade: a.grade, cat: Q_CAT[a.q],
    answers: a.answers.map(x => unitOf(x.ce, x.word)),
    lens: a.lens ? { ...a.lens, answers: a.lens.answers.map(x => unitOf(x.ce, x.word)) } : null,
  }
})
export const qualityOf = id => QUALITIES.find(q => q.id === id)
export const GRADE_NAME = { exact: 'Same word', clear: 'Other words', partial: 'In part', turned: 'Turned', none: 'Not answered here' }

// ─── Audio windows per verse (data/audio-timings.json) ──────────────────────
// Each half-line has two quarter-verses (`padas`), measured where the voice
// is. The half-line's syllables (the vowels of each IAST word) are split at
// half their total. The first half is spread across the first quarter, the
// second across the second, by syllable count. Lead-in silence, the oṃ at
// 1.1.1 and the pause between quarters belong to no word, so the highlight
// holds there. Vulgate windows carry no words.
// A unit with no vowel (nv at 1.1.2a) counts 0, so every half-line counts 16.
const syllables = w => (w.match(/ai|au|[aāiīuūṛṝḷeo]/g) || []).length
const audioFor = v => {
  const wins = timings.halfLines.filter(h => h.ce === v.ce)
  if (!wins.length) return null
  const wordAt = []
  for (const h of wins) {
    if (h.vulgate) continue
    const line = v.words[h.part === 'a' ? 0 : 1]
    const total = line.reduce((s, w) => s + syllables(w.i), 0)
    const half = total / 2
    let acc = 0
    for (const w of line) {
      const [from, to] = h.padas[acc < half ? 0 : 1]
      const x = acc < half ? acc / half : (acc - half) / (total - half)
      wordAt.push(from + x * (to - from))
      acc += syllables(w.i)
    }
  }
  return {
    start: wins[0].start, end: wins[wins.length - 1].end, wordAt,
    vulgate: wins.filter(h => h.vulgate).map(h => ({ start: h.start, end: h.end, iast: h.vulgate })),
  }
}

// ─── The scroll story ───────────────────────────────────────────────────────
// Each verse as word units (GRETIL IAST, Devanāgarī transliterated word by
// word in scripts/build-data.mjs). A unit carries the quality it asks for
// (1.1.2–4, `q`) and the qualities it answers (1.1.8–19, `a`).
export const STORY = VERSES.map(v => {
  const qs = QUESTIONS.filter(q => q.v === v.n)
  let k = 0
  const lines = v.words.map(line => line.map(w => {
    const q = qs.find(x => w.i.includes(Q_STEM[x.id] || stem(x.iast)))
    const a = QUALITIES.filter(x => x.answers.some(y => y.n === v.n && y.k === k)).map(x => x.id)
    return { ...w, k: k++, q: q?.id || null, a }
  }))
  return { ...v, lines, total: k, audio: audioFor(v) }
})
// Where each quality's asking word sits in its verse (1.1.2–4).
for (const q of QUALITIES) q.askK = STORY[q.v - 1].lines.flat().find(u => u.q === q.id).k

// ─── Fixed copy (MILESTONE-04 §9, MILESTONE-05 §2 and §5), breaks as given ──
export const COPY = {
  // The second fold (MILESTONE-05 §2). The scatter sits after the third entry.
  fold: [
    ['Before it tells a story,', 'the Rāmāyaṇa asks a question.'],
    ['The poet Vālmīki asks', 'the sage Nārada'],
    ['whether anyone alive today', 'holds sixteen qualities.'],
    ['Nārada takes a moment to think.', 'Such qualities are hard to find together.'],
    ['But one man', 'comes to his mind.'],
    ['His name is Rāma,', 'and he has them all.'],
    ['Nārada’s answer', 'to Vālmīki’s questions'],
    ['is where the whole story', 'of the epic begins.'],
  ],
  foldScatterAfter: 3,
  board: ['Each quality appears as Vālmīki asks for it,', 'and takes its colour when Nārada’s answer reaches it.'],
  matrixTitle: 'What Vālmīki asked, and where Nārada answers',
  matrixCaption: ['Rows are the qualities Vālmīki asks about,', 'columns the verses of Nārada’s answer.', 'A dot marks where a verse answers a quality.'],
  review: 'This mapping is still being checked against the printed text.',
  vulgate: 'Heard in the recitation, not in the Critical Edition text',
  debroy: 'Debroy’s English for this verse isn’t on the site yet. Goldman’s is shown.',
  count: ['Sixteen is the count tradition gives. Some readers divide the questions', 'differently, for instance by taking guṇavān as a heading for the rest.'],
  questionsFold: 'Sixteen qualities, asked in three verses.',
  patternsLink: 'See it in Patterns',
  // Patterns framing (MILESTONE-05 §5).
  patternsFrame: [
    ['Before the Rāmāyaṇa tells Rāma’s story,', 'it describes him, quality by quality,', 'in answer to Vālmīki’s sixteen questions.'],
    ['This table shows where the answer meets each question,', 'and where it leaves a question open.'],
  ],
  patternsBack: 'See where the description becomes the story',
}
export const NOTES = {
  asked: ['Vālmīki asks in three verses.', 'Nārada answers in twelve, from 1.1.8 to 1.1.19.'],
  turned: ['Vālmīki asks who has conquered anger.', 'Here Nārada gives Rāma anger like the fire at the end of time,', 'and in the same line, the patience of the earth.'],
  story: ['The portrait runs straight into the story.', 'The Rāma Nārada has been describing is the son', 'the king now wishes to make his heir.'],
  none: ['Three qualities get no answer in these verses:', 'kṛtajña, samartha and anasūyaka.', 'Nārada has already said, at 1.1.7, that Rāma has every quality named,', 'so these three are covered by that claim but never named one by one.'],
  exact: ['Three times Nārada answers with Vālmīki’s own word:', 'dyutimān at 1.1.8, dharmajña at 1.1.12,', 'and priyadarśana at 1.1.15 and again at 1.1.17.'],
  clear: ['Six qualities are answered in Nārada’s own terms.', 'Vālmīki asks for someone truthful in speech,', 'and Nārada says Rāma keeps his word.'],
  partial: ['Four answers overlap with the question without matching it.', 'Asked for good conduct, Nārada offers pure, good and noble,', 'spread across 1.1.12 to 1.1.15.'],
  senses: ['Translators read kṛtajña two ways:', 'grateful, or knowing what is to be done.', 'Read the second way, nītimān (1.1.9) and vicakṣaṇa (1.1.14)', 'come close to an answer. Read the first way, nothing does.'],
}
// Verse notes on the stage: CE verse number → note key and Patterns lens.
export const VERSE_NOTE = { 4: { note: 'asked', lens: null }, 17: { note: 'turned', lens: 'turned' }, 19: { note: 'story', lens: 'story' } }
export const LENSES = [
  ['exact', 'Same word'], ['clear', 'Other words'], ['partial', 'In part'], ['turned', 'Turned'],
  ['none', 'Not answered here'], ['senses', 'Two senses'], ['story', 'Where description becomes story'],
]
