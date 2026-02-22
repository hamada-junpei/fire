import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages deployment: set VITE_BASE_URL env var to '/<repo-name>/'
const base = process.env.VITE_BASE_URL ?? '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'ジユウノコンパス - FIRE Lifetime Simulator',
        short_name: 'ジユウノコンパス',
        description: 'あなたの人生設計とFIRE実現をサポートするシミュレーター',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'chart-vendor': ['recharts'],
          'icons-vendor': ['lucide-react'],

          // Feature chunks
          'dashboard': [
            './src/components/dashboard/AnalysisTab.tsx',
            './src/components/dashboard/SimulationTab.tsx',
            './src/components/dashboard/InputSection.tsx'
          ],
          'tools': [
            './src/components/LatteFactor.tsx',
            './src/components/WorkStyleSimulator.tsx'
          ],
          'learning': [
            './src/components/dashboard/LearningTab.tsx',
            './src/data/learningContent.ts'
          ],
          'calculations': [
            './src/utils/calculations.ts',
            './src/utils/tax.ts'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: 'terser'
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'recharts', 'lucide-react']
  }
})
