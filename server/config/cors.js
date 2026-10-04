// Only the real frontend origin(s) may call the API with cookies. Never "*".
// On Vercel the site and API share one project, so same-origin requests (including preview
// deployments, which get their own *.vercel.app host) are always allowed.
import env from './env.js';

const vercelHosts = [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL]
  .filter(Boolean)
  .map((h) => `https://${h}`);
const allowed = new Set([...env.clientUrls, ...vercelHosts]);

const hostOf = (value) => {
  try {
    return new URL(value).host;
  } catch {
    return '';
  }
};

export default function corsOptions(req, callback) {
  const origin = req.headers.origin;
  const base = { credentials: true, methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] };
  // No Origin header: server-to-server tools such as curl or health checks.
  if (!origin) return callback(null, { ...base, origin: true });
  const sameOrigin = hostOf(origin) === (req.headers['x-forwarded-host'] || req.headers.host);
  if (sameOrigin || allowed.has(origin)) return callback(null, { ...base, origin: true });
  return callback(new Error('Not allowed by CORS'));
}
