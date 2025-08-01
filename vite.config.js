import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Postify-Frontend-Social-Media-Web-App-React-Vite-MockAPI-/',
  plugins: [react()],
})
