import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // 重要：Cloudflare Pages 需要絕對路徑
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})