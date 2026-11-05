// Content moved from source/Valmikis_16_Questions.jsx (artefact v6), renumbered
// from Gita Press (GP) to Critical Edition (CE) numbers via data/gp-ce-concordance.md.
// Every interpretive note below is the artefact's own, listed in REVIEW.md.
import data from './data/verses.json'

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

export const ECHO_STYLE = {
  verbatim: { bg: '#2a2642', text: '#c8c9fa', border: '#464597', sym: '↺', tag: 'verbatim', desc: 'The answer uses the very same Sanskrit word that the question used.' },
  inverted: { bg: '#442a0e', text: '#f2cfa8', border: '#8d4f0a', sym: '⇄', tag: 'inverted', desc: 'The answer reuses the question’s word, but turns its meaning around.' },
  adjacency: { bg: '#353335', text: '#dadfe6', border: '#636a75', sym: '≈', tag: 'adjacency', desc: 'The answer uses a word close in meaning — near the question, but not a real answer to it.' },
}

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
  1: { phase: 'frame', answers: [],
    debroy: 'Vālmīki puts his question to Nārada, chief of hermits, foremost of the eloquent, ever engaged in askesis and study of the Vedas.',
    gita: 'The ascetic Vālmīki put the following question direct to Nārada, the chief of hermits, foremost of those skilled in expression.' },
  2: { phase: 'questionref', answers: [] },
  3: { phase: 'questionref', answers: [] },
  4: { phase: 'questionref', answers: [] },
  5: { phase: 'frame', answers: [],
    debroy: '“I wish to hear this; my curiosity is great. You alone are capable of knowing such a man.”',
    gita: '“I wish to hear this; for there is a great curiosity in my mind about it, while you are capable of knowing such a man, O eminent seer!”' },
  6: { phase: 'frame', answers: [],
    debroy: 'Hearing the appeal, Nārada — knower of the three worlds — was delighted and said, “Listen.”',
    gita: 'Hearing this appeal, the sage Nārada, who possessed knowledge of the three worlds, said, “Listen!” and greatly delighted, addressed these words.' },
  7: { phase: 'frame', answers: [],
    debroy: '“Using my intelligence, I will tell you about such a man. I have heard about him.”',
    gita: '“I shall duly consider and tell you of such a hero. Be pleased to hear from me of the man endowed with the manifold and rare virtues.”',
    note: 'The mediation is explicit in Debroy: the omniscient sage answers a present-tense question with “I have heard about him” — reported knowledge, not direct sight.' },
  8: { phase: 'identification', answers: ['Q12', 'Q1', 'Q14'],
    echoes: [{ q: 'Q14', word: 'dyutimān', type: 'verbatim' }],
    gita: 'Descended in the line of Ikṣvāku, known by the name of Rāma. He has fully controlled his mind, is very powerful, radiant (dyutimān) and resolute, and has brought his senses under control.',
    debroy: 'He was born in the lineage of Ikṣvāku and is known to people as Rāma. He is self-controlled in his soul and immensely valorous. He is radiant, possesses fortitude and is capable of controlling.',
    note: 'Nārada gives the name and lineage first, answering a question no one asked. The word dyutimān returns here verbatim from 1.1.4.' },
  9: { phase: 'opening', answers: ['Q9', 'Q10', 'Q11'],
    gita: 'Intelligent, sagacious, eloquent, glorious, an exterminator of foes. Broad shoulders, powerful arms, a neck shaped as a conch, a stout chin.',
    debroy: 'He is intelligent and follows good policy. He is eloquent and handsome. He is a destroyer of enemies. He possesses broad shoulders and mighty arms. His neck is like a conch shell and his cheekbones stand out.' },
  10: { phase: 'physical', answers: ['Q11', 'Q10'],
    gita: 'Broad chest, a mighty bow, a collar-bone covered with flesh, capable of subduing foes. Long arms reaching his knees, a well-formed head, a shapely forehead, a charming gait.',
    debroy: 'His chest is broad and his bow is huge. He is a subjugator of enemies and his collarbones are hidden. His arms stretch down to his knees and he possesses an excellent head and a beautiful forehead. His tread is superb.' },
  11: { phase: 'physical', answers: ['Q11'],
    gita: 'Of medium stature, neither tall nor short, well-proportioned limbs, a shining complexion, mighty, a rounded chest, large eyes, full of splendour, auspicious marks on his body.',
    debroy: 'He is medium in size and his limbs are well proportioned. He is pleasant in complexion and powerful. His chest is muscled and his eyes are large. He is prosperous and possesses all the auspicious qualities.',
    note: 'Verses 1.1.9–11: the physical portrait — three whole ślokas for a single question (Q11).' },
  12: { phase: 'ethical', answers: ['Q3', 'Q5', 'Q8', 'Q9', 'Q7', 'Q12'],
    echoes: [{ q: 'Q3', word: 'dharmajña', type: 'verbatim' }],
    gita: 'He knows the secret of virtue (dharmajña), true to his promise, intent on the good of the people. Illustrious, full of wisdom, pure, self-controlled, of concentrated mind.',
    debroy: 'He knows about dharma. He is firm in adhering to the truth and is devoted to the welfare of the subjects. He is famous and full of learning. He is pure, controlled and has restrained himself.',
    note: 'धर्मज्ञः returns verbatim from 1.1.2 — the cleanest single-word answer.' },
  13: { phase: 'ethical', answers: ['Q8', 'Q3', 'Q9', 'Q10'], gpLabel: 'GP 13–14',
    gita: 'A supporter of creation like Brahmā, affluent, the slayer of his enemies, a protector of living beings, a staunch defender of faith. A vindicator of his own virtue, protector of his own people. He knows the truth of the Vedas and the six auxiliary sciences, and is a past master in archery.',
    debroy: 'He is a protector of the world of the living and is also a protector of dharma. He knows the truth about the Vedas and Vedāṅgas and is skilled in dhanurveda. He knows the truth about all the sacred texts.',
    gpOnly: [
      { gp: 'GP 13a', dev: 'प्रजापतिसमः श्रीमान् धाता रिपुनिषूदनः', iast: 'prajāpatisamaḥ śrīmān dhātā ripuniṣūdanaḥ' },
      { gp: 'GP 14a', dev: 'रक्षिता स्वस्य धर्मस्य स्वजनस्य च रक्षिता', iast: 'rakṣitā svasya dharmasya svajanasya ca rakṣitā' },
    ],
    note: 'Gita Press reading. Not in the Critical Edition’s constituted text, so absent from the CE translations.' },
  14: { phase: 'ethical', answers: ['Q9', 'Q7', 'Q15'], gpLabel: 'GP 15',
    echoes: [{ q: 'Q4', word: 'smṛtimān', type: 'adjacency' }],
    gita: 'He knows the real meaning of all the scriptures, possessed of a sharp memory (smṛtimān) and quick wit. Popular in all the worlds, pious, high-minded, shrewd.',
    debroy: 'He is resplendent and has knowledge of the smṛti texts. He is virtuous and is loved by all the people. He can discriminate and is not distressed in his soul.',
    note: 'स्मृतिमान् (memory) is the nearest the portrait comes to कृतज्ञ (Q4) — an adjacency in the same semantic field, NOT an answer to it.' },
  15: { phase: 'ethical', answers: ['Q2', 'Q8', 'Q11', 'Q15'], gpLabel: 'GP 16',
    echoes: [{ q: 'Q11', word: 'priyadarśana', type: 'verbatim' }],
    gita: 'Always sought by the righteous as the ocean is by rivers. Noble, alike to all, and always wears a pleasing countenance (priyadarśana).',
    debroy: 'Just as all rivers head towards the ocean, all virtuous people approach him. He is noble and impartial towards everyone.',
    note: 'The first simile — righteous people seeking him as rivers seek the ocean — marks the shift into the grand, cosmic comparisons. The word priyadarśana also returns here, verbatim, for the first of its two appearances.' },
  16: { phase: 'cosmic', answers: ['Q2', 'Q6', 'Q12'], gpLabel: 'GP 17',
    gita: 'Endowed with all excellences, enhancing the delight of his mother Kausalyā. He vies with the ocean in profundity and compares with the Himālaya in firmness.',
    debroy: 'He alone is the handsome one. The one who extends Kausalyā’s lineage possesses all the qualities. In his gravity, he is like the ocean. In his patience, he is like the Himalayas.',
    note: 'Himalaya-firmness (धैर्येण हिमवानिव) is the nearest answer to Q6 (firm of resolve).' },
  17: { phase: 'cosmic', answers: ['Q2', 'Q11', 'Q16', 'Q13'], gpLabel: 'GP 18', divergence: true,
    echoes: [{ q: 'Q2', word: 'vīrya', type: 'verbatim' }, { q: 'Q11', word: 'priyadarśana', type: 'verbatim' }, { q: 'Q13', word: 'krodha', type: 'inverted' }],
    gita: 'A replica of Viṣṇu in prowess (vīrya), pleasing of aspect as the moon (priyadarśana). In anger (krodha) he resembles the destructive fire at the end of creation, and is a counterpart of Mother Earth in forbearance (kṣamā).',
    debroy: 'He is like Viṣṇu in valour. He is as handsome as the moon. In his rage, he is like the fire of destruction.',
    divergenceNote: 'CE 1.1.17d kṣamayā pṛthivīsamaḥ (क्षमया पृथिवीसमः) is in the Critical Edition’s constituted text. Goldman renders it “yet he rivals the earth in forbearance.” Debroy’s English omits this fourth pāda: a translator’s prose compression, not a textual absence in the CE.' },
  18: { phase: 'cosmic', answers: ['Q5'], gpLabel: 'GP 19',
    gita: 'He equals Kubera in liberality and is another Dharma, as it were, in point of truthfulness. — That Rāma, endowed with such qualities, whose valour is truth…',
    debroy: 'In generosity, he is like the lord of riches. Yet again, he is like Dharma in truthfulness.',
    note: 'Liberality (tyāga) is not one of the sixteen qualities asked about, so Nārada adds it himself. The verse’s second half begins the run of describing words that carries grammatically into 1.1.19.' },
  19: { phase: 'closing', answers: ['Q1'], gpLabel: 'GP 20a + 21a',
    gita: '…the eldest, endowed with the best qualities, the dear son of Daśaratha, devoted to the welfare of his subjects out of a desire to please them.',
    gitaNote: 'Gita Press 20, including 20b',
    debroy: 'Rāma possesses such qualities and truth is his valour. He is the eldest and possesses the best of qualities. He is Dasharatha’s beloved son.',
    gpOnly: [
      { gp: 'GP 20b', dev: 'प्रकृतीनां हितैर्युक्तं प्रकृतिप्रियकाम्यया', iast: 'prakṛtīnāṃ hitair yuktaṃ prakṛtipriyakāmyayā' },
    ],
    note: 'This is the seam between description and story — but a join, not a stop. The describing words here are grammatically what the verb “wished” (ऐच्छत्, aicchat) in 1.1.19b acts upon: the king wished to crown this Rāma. Debroy’s English masks the join by ending a sentence at “Dasharatha’s beloved son.” The questionnaire closes and the story begins in one continuous sentence. [High confidence — a standard reading of the grammar in the verses shown.]' },
}

export const VERSES = data.verses.map(v => ({ ...v, ...META[v.n] }))

export const answersFor = id => VERSES.filter(v => v.answers.includes(id)).map(v => v.n)
export const echoesFor = id => VERSES.flatMap(v => (v.echoes || []).filter(e => e.q === id).map(e => ({ n: v.n, ...e })))

// ─── Pattern cards ──────────────────────────────────────────────────────────
// `after`: CE verse after which the card appears inline in the All view.
export const PATTERNS = [
  { id: 'divide', after: 4, title: 'How the questions and answer divide up',
    body: 'The sixteen qualities are asked in just three verses (1.1.2–4). Nārada then answers them across twelve verses of description in the Critical Edition (1.1.8–19, thirteen verses in the Gita Press numbering), and the story’s first verb arrives in 1.1.19b. An earlier count of “32 lines” came from counting the lines of Debroy’s English paragraphs rather than the verses.' },
  { id: 'verbatim', echoType: 'verbatim', title: 'Verbatim echoes ↺',
    body: 'In these verses, Nārada’s answer uses the very same Sanskrit word that the question used. The word priyadarśana (“lovely to look at”) is repeated twice, at 1.1.15 and again at 1.1.17. This exact repetition disappears in the English translations, because translators naturally vary their wording.' },
  { id: 'inverted', after: 17, echoType: 'inverted', title: 'Inverted echo ⇄',
    body: 'Question 13 asks who has conquered anger (jitakrodha). Verse 1.1.17 does use the word for anger (krodha), but it describes his anger as the fire that ends the world. The same word returns, yet its meaning is flipped from control to destruction. This is the one place where the portrait seems to answer against the quality it was asked about, and the tension is left standing.' },
  { id: 'adjacency', after: 14, echoType: 'adjacency', title: 'Adjacency ≈ (the kṛtajña gap)',
    body: 'Question 4 asks who is kṛtajña — mindful of what others have done for him. Neither translation ever answers it with the matching word. The closest is smṛtimān (“of good memory”) at 1.1.14, which sits in the same area of meaning but is not the same claim. Because both editions leave the same gap, it looks like a real feature of the opening rather than one translator’s choice.' },
  { id: 'story', after: 19, title: 'Where the description becomes the story',
    body: 'In the Sanskrit, the last describing words — “that Rāma, endowed with such qualities … the dear son of Daśaratha” (1.1.18–19a) — are grammatically the object of the verb “wished” in 1.1.19b: the king wished to crown him. So the portrait does not stop and then restart as story. Its final words are exactly what the story’s first action acts upon. Debroy’s English hides this by ending a sentence at “Dasharatha’s beloved son.” The shift in feeling is clean, but the single Sanskrit sentence runs straight across it. [High confidence — a standard reading of the grammar in the verses shown.]' },
  { id: 'divergence', title: 'Edition divergence ⚠',
    body: 'At 1.1.17, kṣamayā pṛthivīsamaḥ is in the Critical Edition’s constituted text. Goldman renders it “yet he rivals the earth in forbearance.” Debroy’s English omits this fourth pāda: a translator’s prose compression, not a textual absence in the CE. In the other direction, three Gita Press half-lines (GP 13a, 14a and 20b) are not in the Critical Edition’s constituted text, so they are absent from the CE translations. They are shown in muted “Gita Press reading” boxes at 1.1.13 and 1.1.19.' },
  { id: 'provenance', title: 'On translation provenance',
    body: 'Both Debroy and Goldman translate the Baroda CE, but they are not comparable undertakings. Debroy’s distinction is being the first single-handed English translator of the complete CE (all seven kāṇḍas, ~2017). Goldman (Princeton, 1984–2016) is CE-based and complete but a multi-scholar consortium across four decades — so “Goldman vs. Debroy” is not a like-for-like comparison of solo work, even though both are legitimately CE-sourced.' },
]

export const CITES = {
  goldman: 'Goldman 2021, pp. 51–52',
  debroy: 'Debroy 2017, vol. 1 [p. ?]',
  gp: 'Gita Press [p. ?]',
}

// ─── The scroll story (All) ─────────────────────────────────────────────────
// Each verse as word units (GRETIL IAST, Devanāgarī transliterated word by
// word in scripts/build-data.mjs). Units carry the question they ask (1.1.2–4)
// and any echo from the artefact's echo layer. Matching is by the word's stem,
// only to find the word in the line. No new reading is added.
const Q_STEM = { Q8: 'sarvabhūteṣu', Q15: 'nasūyak', Q16: 'bibhyati' }
const stem = w => w.split(' ')[0].replace(/[aāḥ]$/, '')
export const STORY = VERSES.map(v => {
  const qs = QUESTIONS.filter(q => q.v === v.n)
  let k = 0
  const lines = v.words.map(line => line.map(w => {
    const q = qs.find(x => w.i.includes(Q_STEM[x.id] || stem(x.iast)))
    const echo = (v.echoes || []).find(e => w.i.includes(stem(e.word)))
    return { ...w, k: k++, q: q?.id || null, echo: echo || null }
  }))
  return { ...v, lines, total: k }
})
