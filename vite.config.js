import { copyFileSync, mkdirSync, readdirSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The recitation is copied byte for byte from assets-src/audio to public/audio
// at the start of every build and dev run. It is never re-encoded or edited.
const copyAudio = () => ({
  name: 'copy-audio',
  buildStart() {
    mkdirSync('public/audio', { recursive: true })
    for (const f of readdirSync('assets-src/audio')) copyFileSync(`assets-src/audio/${f}`, `public/audio/${f}`)
  },
})

export default defineConfig({
  base: '/valmiki-16-questions/',
  plugins: [copyAudio(), react(), tailwindcss()],
})
