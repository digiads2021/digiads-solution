import rateLimit from 'express-rate-limit';

// The visitor's real IP. On Vercel the site proxies /api to the API project, so req.ip can be the
// proxy's address (every visitor would share one limit). Vercel's edge overwrites these headers on
// incoming requests, so the first entry is the real client and cannot be spoofed there.
export const clientIp = (req) => {
  if (process.env.VERCEL) {
    const fwd = req.headers['x-vercel-forwarded-for'] || req.headers['x-real-ip'] || req.headers['x-forwarded-for'];
    const first = String(fwd || '').split(',')[0].trim();
    if (first) return first;
  }
  return req.ip;
};

const make = (windowMs, limit, message) =>
  rateLimit({
    windowMs, limit, standardHeaders: 'draft-7', legacyHeaders: false,
    keyGenerator: clientIp,
    message: { success: false, message },
  });

export const globalLimiter = make(15 * 60 * 1000, 600, 'Too many requests. Please slow down.');
export const loginLimiter = make(15 * 60 * 1000, 5, 'Too many login attempts. Try again in 15 minutes.');
export const formLimiter = make(60 * 60 * 1000, 10, 'Too many submissions. Please try again later.');
export const newsletterLimiter = make(60 * 60 * 1000, 5, 'Too many attempts. Please try again later.');
export const searchLimiter = make(60 * 1000, 60, 'Too many searches. Please wait a moment.');
