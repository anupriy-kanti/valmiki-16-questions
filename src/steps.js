import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'

// ─── The checkpoint engine (MILESTONE-06 §2 and §3) ─────────────────────────
// The stage does not scroll. It holds a flat list of checkpoints, and one
// gesture (wheel, trackpad, swipe or key) moves one checkpoint.
//
// Every duration, in ms. Tune them here.
export const T = {
  FOLD_SWAP: 900, // one beat leaves and the next arrives
  VERSE_START: 600, // verse checkpoint 1 to 2: the first word, the English
  VERSE_COMPLETE: 400, // verse checkpoint 2 to 3: all the words light
  NOTE: 600, // verse checkpoint 3 to 4: the note
  COOLDOWN: 350, // after a step's transition, input is still ignored
  SCATTER: 1500, // the sixteen qualities appear, in all
  SCATTER_ITEM: 600, // one quality's own fade inside that stagger
  HERO_HOLD: 1600, // the hero image alone, before its title
  HERO_TITLE: 1200, // the hero's overlay and title fade in
  AUDIO_FADE: 300, // the recitation fades out when a verse is left or completed
  WHEEL_GAP: 200, // wheel events closer together than this are one gesture
  SWIPE: 40, // px a touch must travel to count as a swipe
}

export const motionOn = () => document.documentElement.classList.contains('motion')

// How many checkpoints a beat has. A verse: grey, words lighting, all lit,
// and its note if it has one. Everything else: one.
export function checkpoints(beats, hasNote) {
  const cps = []
  beats.forEach((b, i) => {
    const n = b.type === 'verse' ? (hasNote(b.v) ? 4 : 3) : 1
    for (let c = 0; c < n; c++) cps.push({ i, c })
  })
  return cps
}

// How long the transition between two checkpoints takes.
function span(from, to, beats) {
  if (!motionOn()) return 0
  if (from.i !== to.i) return T.FOLD_SWAP + (beats[to.i].type === 'scatter' && to.i > from.i ? T.SCATTER : 0)
  const lo = Math.min(from.c, to.c)
  return lo === 0 ? T.VERSE_START : lo === 1 ? T.VERSE_COMPLETE : T.NOTE
}

const INTERACTIVE = 'a, button, input, select, textarea, [role="button"]'

// `idx` is the checkpoint on stage. `dir` is 1 after a step forward, -1 after
// a step back, 0 after a jump.
export function useSteps(cps, beats, initial) {
  const [st, setSt] = useState(() => ({ idx: initial(), dir: 0 }))
  const r = useRef({ idx: st.idx, until: 0, lastWheel: -1e9, touch: null })
  r.current.idx = st.idx

  const move = useCallback((to, dir, lock) => {
    const s = r.current
    const now = performance.now()
    s.until = Math.max(s.until, now + lock)
    s.idx = to
    setSt({ idx: to, dir })
  }, [])

  // One step, forward (1) or back (-1). Ignored while a step's transition
  // runs and during the cooldown after it.
  const go = useCallback(d => {
    const s = r.current
    if (performance.now() < s.until) return false
    const to = Math.max(0, Math.min(cps.length - 1, s.idx + d))
    if (to === s.idx) return false
    move(to, d, span(cps[s.idx], cps[to], beats) + T.COOLDOWN)
    return true
  }, [cps, beats, move])

  // A jump (pager dots, Home, End, links).
  const jump = useCallback(to => {
    const s = r.current
    if (to == null || to < 0 || to === s.idx) return
    move(to, 0, (motionOn() ? T.FOLD_SWAP : 0) + T.COOLDOWN)
  }, [move])

  // The stage moves itself one checkpoint on (a verse's recitation ended).
  const arrive = useCallback(from => {
    if (r.current.idx !== from || from >= cps.length - 1) return
    move(from + 1, 1, T.COOLDOWN)
  }, [cps, move])

  useEffect(() => {
    const s = r.current
    const onWheel = e => {
      if (e.ctrlKey) return // pinch zoom
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      e.preventDefault()
      const now = performance.now()
      const fresh = now - s.lastWheel > T.WHEEL_GAP
      s.lastWheel = now
      // A stream of wheel events is one gesture: only its first event steps.
      if (fresh && e.deltaY) go(e.deltaY > 0 ? 1 : -1)
    }
    const onStart = e => { s.touch = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null }
    const onEnd = e => {
      const t0 = s.touch
      s.touch = null
      if (!t0 || !e.changedTouches.length) return
      const dx = e.changedTouches[0].clientX - t0.x
      const dy = e.changedTouches[0].clientY - t0.y
      if (Math.abs(dy) >= T.SWIPE && Math.abs(dy) > Math.abs(dx) * 1.2) go(dy < 0 ? 1 : -1)
    }
    const onKey = e => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.defaultPrevented) return
      const k = e.key
      const typing = e.target.closest?.('input, select, textarea')
      if (typing) return
      let d = 0
      if (k === 'ArrowDown' || k === 'PageDown') d = 1
      else if (k === 'ArrowUp' || k === 'PageUp') d = -1
      else if (k === ' ' || k === 'Spacebar') {
        // Space on a button or link belongs to that control.
        if (e.target.closest?.(INTERACTIVE)) return
        d = e.shiftKey ? -1 : 1
      } else if (k === 'Home') { e.preventDefault(); return jump(0) }
      else if (k === 'End') { e.preventDefault(); return jump(cps.length - 1) }
      if (!d) return
      e.preventDefault()
      go(d)
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
      window.removeEventListener('keydown', onKey)
    }
  }, [cps, go, jump])

  return { idx: st.idx, dir: st.dir, go, jump, arrive }
}

// ─── What the frame around the stage needs to know ──────────────────────────
// The nav (its scrim) and the pager (its parts) read this. The Conversation
// stage writes it.
let snap = { scrim: false, parts: [], part: null }
const subs = new Set()
export const stageInfo = {
  get: () => snap,
  set(next) {
    if (Object.keys(next).every(k => snap[k] === next[k])) return
    snap = { ...snap, ...next }
    subs.forEach(f => f())
  },
  subscribe(f) { subs.add(f); return () => subs.delete(f) },
  // Set by the stage: jumps to the first checkpoint of a part.
  jumpTo: () => {},
}
export const useStageInfo = () => useSyncExternalStore(stageInfo.subscribe, stageInfo.get)
