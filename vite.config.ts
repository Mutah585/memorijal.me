import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'lucide-react'],
          seoData: [
            './src/data/seo-routes.ts',
            './src/data/seo-corridors.ts',
            './src/data/seo-locations-resources.ts',
          ],
        },
      },
    },
  },
});
