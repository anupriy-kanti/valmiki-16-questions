// Builds src/data/verses.json from data/*.json.
// Devanagari lines in data/ce-sanskrit-1.1.1-21.json are complete (extraction fixed in mytwiki-C21).
import fs from 'node:fs'

const ce = JSON.parse(fs.readFileSync('data/ce-sanskrit-1.1.1-21.json', 'utf8'))
const goldman = JSON.parse(fs.readFileSync('data/goldman-1.1.1-24.json', 'utf8'))

const CONS = [
  ['kh','ख'],['gh','घ'],['ch','छ'],['jh','झ'],['ṭh','ठ'],['ḍh','ढ'],['th','थ'],['dh','ध'],['ph','फ'],['bh','भ'],
  ['k','क'],['g','ग'],['c','च'],['j','ज'],['ṭ','ट'],['ḍ','ड'],['t','त'],['d','द'],['p','प'],['b','ब'],
  ['n','न'],['m','म'],['y','य'],['r','र'],['l','ल'],['v','व'],['ś','श'],['ṣ','ष'],['s','स'],['h','ह'],
]
const VOW = [['ai','ऐ'],['au','औ'],['ā','आ'],['a','अ'],['ī','ई'],['i','इ'],['ū','ऊ'],['u','उ'],['ṛ','ऋ'],['e','ए'],['o','ओ']]

function firstChar(iastLine) {
  for (const [k, v] of [...CONS, ...VOW]) if (iastLine.startsWith(k)) return v
  throw new Error('No match: ' + iastLine)
}

const verses = ce
  .filter(v => Number(v.ce.split('.')[2]) <= 19)
  .map(v => {
    const iast = v.iast.split('\n').map(l => l.replace(/\s*\/+\s*$/, '').trim())
    const dev = v.dev.split('\n')
    return { ce: v.ce, n: Number(v.ce.split('.')[2]), iast, dev }
  })

// Goldman [16–24] is cut at the end of the CE 1.1.19 sentence (site range ends at 1.1.19).
const cut = 'and was gifted with other excellent virtues.'
const blocks = goldman.blocks.map(b => {
  let text = b.text
  let range = b.ce_range
  if (range === '1.1.16–24') {
    text = text.slice(0, text.indexOf(cut) + cut.length) + '”'
    range = '1.1.16–19'
  }
  const start = Number(range.split('.')[2].split('–')[0])
  return { range, start, label: b.ce_range, text }
})

fs.writeFileSync('src/data/verses.json', JSON.stringify({ verses, goldman: { source: goldman.source, pages: goldman.pages, blocks } }, null, 1))
console.log('ok', verses.length, blocks.map(b => b.range))
