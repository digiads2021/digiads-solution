import rateLimit from 'express-rate-limit';

const make = (windowMs, limit, message) =>
  rateLimit({ windowMs, limit, standardHeaders: 'draft-7', legacyHeaders: false, message: { success: false, message } });

export const globalLimiter = make(15 * 60 * 1000, 600, 'Too many requests. Please slow down.');
export const loginLimiter = make(15 * 60 * 1000, 5, 'Too many login attempts. Try again in 15 minutes.');
export const formLimiter = make(60 * 60 * 1000, 10, 'Too many submissions. Please try again later.');
export const newsletterLimiter = make(60 * 60 * 1000, 5, 'Too many attempts. Please try again later.');
export const searchLimiter = make(60 * 1000, 60, 'Too many searches. Please wait a moment.');
