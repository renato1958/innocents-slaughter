import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
      port: 8080,
      host: '0.0.0.0',
      proxy: {
          '/api': 'https://tinkering-renato1958680805.codeanyapp.com'
      }
  },
})
