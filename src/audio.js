import { useCallback, useEffect, useRef, useState } from 'react'
import { AUDIO_FILE, AUDIO_SYNC } from './content.js'

const SETTLE = 500 // ms without scrolling before a verse starts
const FADE = 300 // ms fade when the visitor leaves a verse

// Verse-window playback (MILESTONE-04 §6). The clip is played as it is: the
// only things done to it are seeking, pausing and the volume fade.
// `verse` is the verse on stage (or null). `yForK(k)` gives the scroll
// position at which that verse shows k lit words.
export function useVerseAudio(sound, verse, yForK) {
  const [vulgate, setVulgate] = useState(-1)
  const r = useRef({ audio: null, verse: null, started: null, driving: false, expectY: -1, timer: 0, raf: 0, fade: 0, lastK: -1, sound: false, yForK })
  r.current.verse = verse
  r.current.yForK = yForK
  r.current.sound = sound

  const stopLoop = () => { cancelAnimationFrame(r.current.raf); r.current.raf = 0; r.current.driving = false; setVulgate(-1) }

  const tick = useCallback(() => {
    const s = r.current
    const v = s.verse
    const a = s.audio
    if (!a || !v || s.started !== v.n) return stopLoop()
    const t = a.currentTime
    if (t >= v.audio.end || a.ended) { a.pause(); return stopLoop() }
    setVulgate(v.audio.vulgate.findIndex(w => t >= w.start && t < w.end))
    if (s.driving) {
      const k = v.audio.wordAt.filter(x => x <= t).length
      if (k !== s.lastK) {
        s.lastK = k
        const y = s.yForK(k)
        if (y != null) { s.expectY = y; window.scrollTo(0, y) }
      }
    }
    s.raf = requestAnimationFrame(tick)
  }, [])

  const tryStart = useCallback(() => {
    const s = r.current
    const v = s.verse
    if (!s.sound || !s.audio || !v?.audio || s.started === v.n) return
    cancelAnimationFrame(s.fade)
    s.started = v.n
    s.lastK = -1
    s.driving = AUDIO_SYNC
    const a = s.audio
    a.volume = 1
    a.currentTime = v.audio.start
    a.play().then(() => { cancelAnimationFrame(s.raf); s.raf = requestAnimationFrame(tick) }).catch(() => { s.started = null })
  }, [tick])

  const fadeOut = useCallback(() => {
    const s = r.current
    const a = s.audio
    stopLoop()
    s.started = null
    if (!a || a.paused) return
    const t0 = performance.now()
    const step = now => {
      // A frame's timestamp can be a little earlier than t0, so clamp both ways.
      const x = Math.max(0, Math.min(1, (now - t0) / FADE))
      a.volume = 1 - x
      if (x < 1) s.fade = requestAnimationFrame(step)
      else { a.pause(); a.volume = 1 }
    }
    cancelAnimationFrame(s.fade)
    s.fade = requestAnimationFrame(step)
  }, [])

  // Scrolling: the visitor's scroll takes over the highlight and re-arms the
  // settle timer. Scrolls made by the sync itself are ignored.
  useEffect(() => {
    if (!sound) return
    const s = r.current
    const arm = () => { clearTimeout(s.timer); s.timer = setTimeout(tryStart, SETTLE) }
    const onScroll = () => {
      if (Math.abs(window.scrollY - s.expectY) <= 2) return
      s.driving = false
      arm()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    arm()
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(s.timer) }
  }, [sound, tryStart])

  // Leaving a verse fades its audio out. Coming back plays it from its start.
  const n = verse?.n ?? null
  useEffect(() => {
    const s = r.current
    if (s.started != null && s.started !== n) fadeOut()
    if (sound && n != null) { clearTimeout(s.timer); s.timer = setTimeout(tryStart, SETTLE) }
  }, [n, sound, fadeOut, tryStart])

  useEffect(() => {
    const s = r.current
    if (!sound && s.audio) { cancelAnimationFrame(s.fade); s.audio.pause(); s.started = null; stopLoop() }
  }, [sound])

  useEffect(() => () => { const s = r.current; clearTimeout(s.timer); cancelAnimationFrame(s.raf); cancelAnimationFrame(s.fade); s.audio?.pause() }, [])

  // Called inside the Sound button's click, so browsers allow later playback.
  const unlock = useCallback(() => {
    const s = r.current
    if (s.audio) return
    const a = new Audio(import.meta.env.BASE_URL + AUDIO_FILE)
    a.preload = 'auto'
    s.audio = a
    a.muted = true
    a.play().then(() => { if (s.started == null) a.pause(); a.muted = false }).catch(() => { a.muted = false })
  }, [])

  return { vulgate, unlock }
}
