// Loads .env and validates required variables once, at startup.
import dotenv from 'dotenv';
dotenv.config();

const required = ['MONGODB_URI', 'JWT_SECRET'];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  const message = `Missing required environment variables: ${missing.join(', ')}`;
  // On Vercel, throw so the request handler can return a clear 503 instead of crashing the function.
  if (process.env.VERCEL) throw new Error(message);
  console.error(message);
  console.error('Copy server/.env.example to server/.env and fill in the values.');
  process.exit(1);
}

// On Vercel the site and API are one project (same origin). When CLIENT_URL / SITE_URL are not
// set, fall back to the project's production domain that Vercel provides automatically.
const onVercel = Boolean(process.env.VERCEL);
const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const defaultClient = onVercel
  ? (vercelProd ? `https://${vercelProd}` : 'https://digiads-solution.vercel.app')
  : 'http://localhost:5173';

// Splits a comma-separated URL list. On Vercel, localhost entries (often copied from .env.example)
// are dropped so sitemap links and CORS fall back to the real production domain.
const urlList = (value) =>
  String(value || '')
    .split(',')
    .map((u) => u.trim().replace(/\/$/, ''))
    .filter(Boolean)
    .filter((u) => !(onVercel && /^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/i.test(u)));
const clientUrls = urlList(process.env.CLIENT_URL).length ? urlList(process.env.CLIENT_URL) : urlList(process.env.SITE_URL);
const siteUrls = urlList(process.env.SITE_URL).length ? urlList(process.env.SITE_URL) : clientUrls;

const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production' || onVercel,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  clientUrls: clientUrls.length ? clientUrls : [defaultClient],
  siteUrl: siteUrls[0] || defaultClient,
  cookieSameSite: process.env.COOKIE_SAMESITE || 'lax',
  cookieDomain: process.env.COOKIE_DOMAIN || undefined,
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    notifyEmail: process.env.ENQUIRY_NOTIFY_EMAIL,
  },
};

export default env;
