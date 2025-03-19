import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["8a6c-2a02-3037-304-59ef-f0af-a9b7-cd79-c12e.ngrok-free.app"]
  }
})
