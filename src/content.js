import data from './data/verses.json'

export const VERSES = data.verses
export const GOLDMAN = data.goldman

// Gita Press numbers where they differ from the CE (see data/gp-ce-concordance.md).
export const GP_NUM = {
  13: 'GP 13b + 14b',
  14: 'GP 15',
  15: 'GP 16',
  16: 'GP 17',
  17: 'GP 18',
  18: 'GP 19',
  19: 'GP 20a + 21a',
}

// Vulgate-only half-lines. Devanāgarī to be restored from the artefact (see REVIEW.md).
export const GP_READINGS = {
  13: [
    { gp: 'GP 13a', iast: 'prajāpatisamaḥ śrīmān dhātā ripuniṣūdanaḥ' },
    { gp: 'GP 14a', iast: 'rakṣitā svasya dharmasya svajanasya ca rakṣitā' },
  ],
  19: [{ gp: 'GP 20b', iast: 'prakṛtīnāṃ hitair yuktaṃ prakṛtipriyakāmyayā' }],
}

// The sixteen qualities in CE 1.1.2–4, in the order the verses give them.
// `echo` lists the answer verses (CE 1.1.6–19) that repeat the question's word
// or a member of its compound. This is a provisional string match (see REVIEW.md).
export const QUESTIONS = [
  { id: 'Q1', v: 2, iast: 'guṇavān', dev: 'गुणवान्', echo: [7, 16, 18, 19] },
  { id: 'Q2', v: 2, iast: 'vīryavān', dev: 'वीर्यवान्', echo: [8, 17] },
  { id: 'Q3', v: 2, iast: 'dharmajña', dev: 'धर्मज्ञ', echo: [12] },
  { id: 'Q4', v: 2, iast: 'kṛtajña', dev: 'कृतज्ञ', echo: [] },
  { id: 'Q5', v: 2, iast: 'satyavākya', dev: 'सत्यवाक्य', echo: [12, 18] },
  { id: 'Q6', v: 2, iast: 'dṛḍhavrata', dev: 'दृढव्रत', echo: [] },
  { id: 'Q7', v: 3, iast: 'cāritreṇa yukta', dev: 'चारित्रेण युक्त', echo: [] },
  { id: 'Q8', v: 3, iast: 'sarvabhūteṣu hita', dev: 'सर्वभूतेषु हित', echo: [12] },
  { id: 'Q9', v: 3, iast: 'vidvān', dev: 'विद्वान्', echo: [] },
  { id: 'Q10', v: 3, iast: 'samartha', dev: 'समर्थ', echo: [] },
  { id: 'Q11', v: 3, iast: 'ekapriyadarśana', dev: 'एकप्रियदर्शन', echo: [15, 17] },
  { id: 'Q12', v: 4, iast: 'ātmavān', dev: 'आत्मवान्', echo: [8, 14] },
  { id: 'Q13', v: 4, iast: 'jitakrodha', dev: 'जितक्रोध', echo: [17] },
  { id: 'Q14', v: 4, iast: 'dyutimān', dev: 'द्युतिमान्', echo: [8] },
  { id: 'Q15', v: 4, iast: 'anasūyaka', dev: 'अनसूयक', echo: [] },
  { id: 'Q16', v: 4, iast: 'kasya bibhyati devāḥ', dev: 'कस्य बिभ्यति देवाः', echo: [] },
]

export const badgesFor = n => QUESTIONS.filter(q => q.echo.includes(n)).map(q => q.id)

// Pattern notes. `after` places the card inline after that CE verse in the reading view.
export const PATTERNS = [
  {
    id: 'unanswered',
    after: 19,
    title: 'Kṛtajña (Q4)',
    body: 'No word in Nārada’s answer (CE 1.1.6–19) repeats kṛtajña (Q4). This quality is the subject of the SAI27 paper this site accompanies.',
  },
  {
    id: 'divergence',
    after: 13,
    title: 'Edition divergence',
    body: 'Three half-lines in the Gita Press text (GP 13a, 14a and 20b) are not in the Critical Edition’s constituted text, so they are absent from the CE translations of Goldman and Debroy. They appear here in muted “Gita Press reading” boxes. In the other direction, CE 1.1.17d kṣamayā pṛthivīsamaḥ is in the CE but Debroy’s English omits it. Goldman renders it as “yet he rivals the earth in forbearance”.',
  },
  {
    id: 'ends',
    after: 19,
    title: 'Where the description ends',
    body: 'The description of Rāma runs to CE 1.1.19. The story’s verb aicchat arrives in CE 1.1.19b, and the narrative of the consecration begins.',
  },
]

export const CITES = {
  goldman: 'Goldman 2021, pp. 51–52',
  debroy: 'Debroy 2017',
  gp: 'Gita Press [p. ?]',
}
