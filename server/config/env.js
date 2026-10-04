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
if (process.env.JWT_SECRET.length < 32) {
  console.warn('WARN JWT_SECRET is shorter than 32 characters. Use a long random value in production.');
}

const list = (value) => (value || '').split(',').map((u) => u.trim().replace(/\/$/, '')).filter(Boolean);
const https = (host) => (host ? `https://${host}` : null);

// On Vercel the site and API share one domain, so the deployment's own URLs are always trusted.
const vercelUrls = [
  https(process.env.VERCEL_PROJECT_PRODUCTION_URL),
  https(process.env.VERCEL_BRANCH_URL),
  https(process.env.VERCEL_URL),
].filter(Boolean);

const clientUrls = [...new Set([...list(process.env.CLIENT_URL), ...vercelUrls])];
if (!clientUrls.length) clientUrls.push('http://localhost:5173');

const isProd = process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL);

const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || (isProd ? 'production' : 'development'),
  isProd,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  clientUrls,
  siteUrl: list(process.env.SITE_URL)[0] || clientUrls[0],
  // "lax" is correct when the site and API share a domain (the default single-project setup).
  cookieSameSite: (process.env.COOKIE_SAMESITE || 'lax').toLowerCase(),
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
