import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// base съвпада с името на репото за GitHub Pages (https://<user>.github.io/vatko/)
export default defineConfig({
  base: '/vatko/',
  plugins: [react(), tailwindcss()],
})
