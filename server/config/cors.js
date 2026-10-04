// Only the real frontend origin(s) may call the API with cookies. Never "*".
// Browsers send an Origin header even on same-origin POST/PUT/DELETE requests, so the
// API's own host is always allowed (website and API are served from one domain on Vercel).
import env from './env.js';

const corsOptionsDelegate = (req, callback) => {
  const origin = req.headers.origin;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const sameOrigin = origin && host && (origin === `https://${host}` || origin === `http://${host}`);
  const allowed = !origin || sameOrigin || env.clientUrls.includes(origin);
  if (!allowed) return callback(new Error('Not allowed by CORS'));
  callback(null, { origin: Boolean(origin), credentials: true, methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] });
};

export default corsOptionsDelegate;
