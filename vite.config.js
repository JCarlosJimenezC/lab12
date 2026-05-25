import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  cacheDir: '../node_modules/.vite',
  build: {
    outDir: '../dist'
  },
  test: {
    environment: 'happy-dom'
  }
})
