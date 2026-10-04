import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import Admin from '../models/Admin.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

export const COOKIE_NAME = 'digiads_token';

export const cookieOptions = () => ({
  httpOnly: true, // JavaScript in the browser cannot read it
  secure: env.isProd, // HTTPS only in production
  sameSite: env.cookieSameSite,
  domain: env.cookieDomain,
  path: '/',
  maxAge: 8 * 60 * 60 * 1000,
});

export const signToken = (admin) =>
  jwt.sign({ sub: admin._id.toString(), role: admin.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

// Protects admin routes: reads the HTTP-only cookie, verifies the JWT, loads the admin.
export const authenticateAdmin = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) throw ApiError.unauthorized();

  let payload;
  try {
    payload = jwt.verify(token, env.jwtSecret);
  } catch {
    throw ApiError.unauthorized('Your session has expired. Please log in again.');
  }

  const admin = await Admin.findById(payload.sub);
  if (!admin || !admin.isActive) throw ApiError.unauthorized();

  // Tokens issued before a password change are no longer valid.
  if (admin.passwordChangedAt && payload.iat * 1000 < admin.passwordChangedAt.getTime() - 1000) {
    throw ApiError.unauthorized('Password was changed. Please log in again.');
  }

  req.admin = admin;
  next();
});

// Use after authenticateAdmin, e.g. requireRole('superadmin')
export const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.admin?.role)) return next(ApiError.forbidden());
  next();
};
