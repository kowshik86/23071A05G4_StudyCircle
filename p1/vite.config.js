import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  cacheDir: resolve('./temp_vite_cache'),
  server: {
    port: 5173,
    strictPort: false,
    open: true
  }
})
