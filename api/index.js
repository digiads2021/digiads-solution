// Vercel serverless entry for the single-project deployment (client + API together).
// vercel.json rewrites /api/*, /sitemap.xml and /uploads/* here; everything else is the React app.
export { default } from '../server/api/index.js';
