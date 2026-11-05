import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/valmiki-16-questions/',
  plugins: [react(), tailwindcss()],
})
