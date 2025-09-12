import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '~': '/src', // Hoặc bất kỳ thư mục gốc nào bạn muốn
    },
  },
  envPrefix: 'VITE_',
})
