import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      // NOTE: API keys should NEVER be exposed in client-side code
      // Use a backend proxy for API calls instead
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Optimize chunk splitting for better caching
        rollupOptions: {
          output: {
            manualChunks: {
              'vendor-react': ['react', 'react-dom', 'react-router-dom'],
              'vendor-animation': ['framer-motion'],
              'vendor-ui': ['lucide-react'],
              'vendor-scroll': ['lenis'],
            },
          },
        },
        // Increase chunk size warning limit
        chunkSizeWarningLimit: 600,
        // Enable source maps for production debugging
        sourcemap: mode === 'development',
        // Minify for production
        minify: mode === 'production' ? 'esbuild' : false,
      },
    };
});
