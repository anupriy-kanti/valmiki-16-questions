import { useEffect, useRef, useState } from 'react'
import { AUDIO_ENABLED } from './content.js'

export const TRANS = [['goldman', 'Goldman'], ['debroy', 'Debroy']]
export const ARCHIVE_URL = 'https://archive.org/details/Valmiki-Ramayana-Sanskrit-Samhita/VR-Balkanda-01.mp3'
export const LICENCE_URL = 'https://creativecommons.org/licenses/by-nc-nd/4.0/'

export const AudioCredit = ({ className = '' }) => (
  <p className={className}>
    Recitation by Vishwas Bhide (2018), from the <a className="underline" href={ARCHIVE_URL}>Internet Archive</a> · <a className="underline whitespace-nowrap" href={LICENCE_URL}>CC BY-NC-ND 4.0</a>
  </p>
)

const Speaker = ({ on }) => (
  <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7.5h3l4-3.5v12l-4-3.5H3z" />
    {on ? <path d="M13 7.2a4 4 0 0 1 0 5.6M15.2 5a7 7 0 0 1 0 10" /> : <path d="M13.5 7.5l4 5m0-5l-4 5" />}
  </svg>
)

// Bottom right, always on the stage: Goldman · Debroy · Sound. The recitation
// credit shows in the bottom left corner while sound is on.
// On phones: two small icons (translation and sound).
// `credit` is false on the hero, where no verse is heard and the credit would
// lie over the Scroll button on phones.
export default function Controls({ which, setWhich, sound, setSound, credit = true }) {
  const [open, setOpen] = useState(false)
  const box = useRef(null)
  useEffect(() => {
    if (!open) return
    const close = e => { if (e.type === 'keydown' ? e.key === 'Escape' : !box.current?.contains(e.target)) setOpen(false) }
    window.addEventListener('keydown', close)
    window.addEventListener('click', close)
    return () => { window.removeEventListener('keydown', close); window.removeEventListener('click', close) }
  }, [open])
  return (
    <>
    {AUDIO_ENABLED && <AudioCredit className={'ctl-credit no-print' + (sound && credit ? ' is-on' : '')} />}
    <div className="ctl no-print">
      <div className="ctl-wide caps">
        <span role="group" aria-label="Translation">
          {TRANS.map(([key, label], j) => (
            <span key={key}>
              {j > 0 && <span aria-hidden="true" className="ctl-sep">·</span>}
              <button type="button" aria-pressed={which === key} onClick={() => setWhich(key)}>{label}</button>
            </span>
          ))}
        </span>
        {AUDIO_ENABLED && (
          <>
            <span aria-hidden="true" className="ctl-sep">·</span>
            <button type="button" aria-pressed={sound} onClick={() => setSound(!sound)}>Sound</button>
          </>
        )}
      </div>
      <div className="ctl-phone" ref={box}>
        {open && (
          <div role="group" aria-label="Translation" className="ctl-menu caps">
            {TRANS.map(([key, label]) => (
              <button key={key} type="button" aria-pressed={which === key} onClick={() => { setWhich(key); setOpen(false) }}>{label}</button>
            ))}
          </div>
        )}
        <button type="button" className="ctl-icon caps" aria-label="Choose translation" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span aria-hidden="true">{which === 'debroy' ? 'D' : 'G'}</span>
        </button>
        {AUDIO_ENABLED && (
          <button type="button" className={'ctl-icon' + (sound ? ' is-on' : '')} aria-label={sound ? 'Sound on' : 'Sound off'} onClick={() => setSound(!sound)}>
            <Speaker on={sound} />
          </button>
        )}
      </div>
    </div>
    </>
  )
}
