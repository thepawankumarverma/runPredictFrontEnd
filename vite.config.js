import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',   // यह सभी IPs को access की इजाजत देगा
    port: 5173
  },
  plugins: [react(),  tailwindcss()],
})
