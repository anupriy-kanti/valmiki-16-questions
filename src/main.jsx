import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Motion classes apply only when the reader has not asked for reduced motion.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('motion')
}

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>
)
