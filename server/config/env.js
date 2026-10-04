// Loads .env and validates required variables once, at startup.
import dotenv from 'dotenv';
dotenv.config();

const required = ['MONGODB_URI', 'JWT_SECRET'];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`);
  console.error('Copy server/.env.example to server/.env and fill in the values.');
  process.exit(1);
}

const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  clientUrls: (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map((u) => u.trim()).filter(Boolean),
  siteUrl: (process.env.SITE_URL || process.env.CLIENT_URL || 'http://localhost:5173').split(',')[0].trim(),
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
