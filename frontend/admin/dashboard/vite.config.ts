import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
  ],
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@barber': path.resolve(__dirname, './src'),
      '@auth': path.resolve(__dirname, '../auth'),
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react-router-dom': path.resolve(__dirname, 'node_modules/react-router-dom'),
    },
  },
  server: {
    port: 5175,
    open: true,
    fs: {
      allow: [
        // Permite servir arquivos da pasta barber
        path.resolve(__dirname),
        // Permite servir arquivos da pasta auth (um nível acima)
        path.resolve(__dirname, '../auth'),
        // Permite servir arquivos da raiz do frontend
        path.resolve(__dirname, '..')
      ]
    }
  },
  build: {
    outDir: 'dist',
  },
})
