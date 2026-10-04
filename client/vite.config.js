import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// In development, /api and /uploads are proxied to the Express server on port 5000,
// so the auth cookie works without any cross-site setup.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
      '/sitemap.xml': 'http://localhost:5000',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: { react: ['react', 'react-dom', 'react-router-dom'] },
      },
    },
  },
});
