import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'lucide-react'],
          seoCore: [
            './src/data/seo-routes.ts',
            './src/data/seo-corridors.ts',
            './src/data/seo-locations-resources.ts',
          ],
          seoClustersAB: ['./src/data/seo-clusters.ts'],
          seoClustersCE: ['./src/data/seo-clusters-c.ts'],
          seoClustersD: ['./src/data/seo-clusters-d.ts'],
        },
      },
    },
  },
});
