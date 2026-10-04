import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Preloads the self-hosted Latin font so text renders in the brand font without waiting for the CSS.
const preloadFont = () => ({
  name: 'preload-latin-font',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler(html, ctx) {
      const font = Object.keys(ctx.bundle || {}).find((f) => /plus-jakarta-sans-latin-wght-normal-.*\.woff2$/.test(f));
      if (!font) return html;
      return html.replace('</head>', `    <link rel="preload" href="/${font}" as="font" type="font/woff2" crossorigin />\n  </head>`);
    },
  },
});

// In development, /api and /uploads are proxied to the Express server on port 5000,
// so the auth cookie works without any cross-site setup.
export default defineConfig(({ command }) => {
  // Production builds must always be real production builds. If NODE_ENV=development leaks into the
  // build environment (e.g. a Vercel env var copied from server/.env), Vite would otherwise ship
  // development React — ~2x larger, much slower, every effect running twice — and compile JSX for it.
  // Setting it here (before Vite resolves the config) keeps React and the JSX transform in agreement.
  if (command === 'build') process.env.NODE_ENV = 'production';
  return config;
});

const config = {
  plugins: [react(), preloadFont()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
      '/sitemap.xml': 'http://localhost:5000',
      '/robots.txt': 'http://localhost:5000',
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: { react: ['react', 'react-dom', 'react-router-dom'] },
      },
    },
  },
};
