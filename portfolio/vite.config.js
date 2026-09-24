import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 建置日期，顯示在頁首與頁尾
const BUILD_DATE = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Taipei' })

export default defineConfig({
  plugins: [react()],
  define: { 'import.meta.env.VITE_BUILD_DATE': JSON.stringify(BUILD_DATE) },
  base: '/',  // 重要：Cloudflare Pages 需要絕對路徑
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})
