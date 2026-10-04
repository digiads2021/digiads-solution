// Vercel serverless entry for the single-project deployment (website + API on one domain).
// /api/*, /sitemap.xml and /robots.txt are rewritten here (see the root vercel.json);
// everything else is served from the built React app in client/dist.
export { default } from '../server/api/index.js';
