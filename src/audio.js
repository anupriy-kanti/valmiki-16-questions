import { useCallback, useEffect, useRef, useState } from 'react'
import { AUDIO_FILE, AUDIO_SYNC } from './content.js'
import { T } from './steps.js'

// The verse clock (MILESTONE-06 §3). While a verse is at its second
// checkpoint (`playing`), its words light in time with the recitation, from
// the quarter-verse timings (`verse.audio.wordAt`).
// - Sound on: the clock is the recitation's own time. The clip is played as
//   it is: the only things done to it are seeking, pausing and the fade.
// - Sound off: a silent clock runs at the same pace, from the same timings.
// During a lead-in (the oṃ at 1.1.1, the vulgate half-line at 1.1.13) the
// first word is lit and waits. When the clock reaches the end of the verse's
// window, `onEnd` is called.
// Returns { n, k }: `k` words of verse `n` are lit. It is only valid while
// `n` is the verse on stage.
export function useVerseClock(sound, verse, playing, onEnd) {
  const [lit, setLit] = useState({ n: null, k: 0 })
  const [vulgate, setVulgate] = useState(-1)
  // True while the recitation fades out after a verse is left or completed.
  // It is still heard then, so its credit must still show.
  const [fading, setFading] = useState(false)
  // mode: 'audio' (the clip's time), 'silent' (a timer), 'wait' (held at
  // `base` until the clip starts).
  const r = useRef({ audio: null, mode: null, base: 0, t0: 0, raf: 0, fade: 0, verse: null, k: 0, sound, onEnd })
  r.current.onEnd = onEnd
  r.current.sound = sound

  const clock = () => {
    const s = r.current
    if (s.mode === 'audio') return s.audio.currentTime
    if (s.mode === 'silent') return s.base + (performance.now() - s.t0) / 1000
    return s.base
  }
  const silentFrom = t => { const s = r.current; s.mode = 'silent'; s.base = t; s.t0 = performance.now() }

  const fadeOut = useCallback(() => {
    const s = r.current
    const a = s.audio
    if (!a || a.paused) return
    const t0 = performance.now()
    const step = now => {
      // A frame's timestamp can be a little earlier than t0, so clamp both ways.
      const x = Math.max(0, Math.min(1, (now - t0) / T.AUDIO_FADE))
      a.volume = 1 - x
      if (x < 1) s.fade = requestAnimationFrame(step)
      else { a.pause(); a.volume = 1; setFading(false) }
    }
    cancelAnimationFrame(s.fade)
    setFading(true)
    s.fade = requestAnimationFrame(step)
  }, [])

  // Hands the clock to the clip, from time `t`. Until the clip plays, the
  // clock waits at `t`, so no word that is lit goes dark again.
  const toAudio = useCallback(t => {
    const s = r.current
    const a = s.audio
    const v = s.verse
    cancelAnimationFrame(s.fade)
    setFading(false)
    s.mode = 'wait'
    s.base = t
    a.volume = 1
    a.currentTime = t
    a.play().then(() => {
      if (s.verse !== v || s.mode !== 'wait') { if (s.mode !== 'audio') a.pause(); return }
      s.mode = 'audio'
    }).catch(() => { if (s.verse === v && s.mode === 'wait') silentFrom(t) })
  }, [])

  const n = verse?.n ?? null
  useEffect(() => {
    const s = r.current
    if (!playing || !verse) return
    const v = verse
    if (!v.audio) { s.onEnd(); return }
    s.verse = v
    s.k = 1
    setLit({ n: v.n, k: 1 })
    if (s.sound && s.audio) toAudio(v.audio.start)
    else silentFrom(v.audio.start)
    const tick = () => {
      const t = clock()
      if (t >= v.audio.end || (s.mode === 'audio' && s.audio.ended)) {
        if (s.mode === 'audio') s.audio.pause()
        s.mode = null
        s.verse = null
        setVulgate(-1)
        s.onEnd()
        return
      }
      // The first word is lit from the start. A lit word stays lit.
      const k = AUDIO_SYNC ? Math.max(s.k, v.audio.wordAt.filter(x => x <= t).length) : v.total
      if (k !== s.k) { s.k = k; setLit({ n: v.n, k }) }
      setVulgate(v.audio.vulgate.findIndex(w => t >= w.start && t < w.end))
      s.raf = requestAnimationFrame(tick)
    }
    s.raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(s.raf)
      if (s.verse === v) { fadeOut(); s.mode = null; s.verse = null }
      setVulgate(-1)
      setLit({ n: null, k: 0 })
    }
  }, [playing, n]) // eslint-disable-line react-hooks/exhaustive-deps

  // Sound switched on or off while a verse is lighting: the clock goes on
  // from where it is.
  useEffect(() => {
    const s = r.current
    if (!s.verse || !s.mode) { if (!sound && s.audio) { cancelAnimationFrame(s.fade); setFading(false); s.audio.pause() } return }
    const t = clock()
    if (sound && s.audio && s.mode === 'silent') toAudio(t)
    else if (!sound && s.mode !== 'silent') { cancelAnimationFrame(s.fade); s.audio?.pause(); silentFrom(t) }
  }, [sound]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => { const s = r.current; cancelAnimationFrame(s.raf); cancelAnimationFrame(s.fade); s.audio?.pause() }, [])

  // Called inside the Sound button's click, so browsers allow later playback.
  const unlock = useCallback(() => {
    const s = r.current
    if (s.audio) return
    const a = new Audio(import.meta.env.BASE_URL + AUDIO_FILE)
    a.preload = 'auto'
    s.audio = a
    a.muted = true
    a.play().then(() => { if (s.mode !== 'audio' && s.mode !== 'wait') a.pause(); a.muted = false }).catch(() => { a.muted = false })
  }, [])

  return { lit, vulgate, unlock, fading }
}
