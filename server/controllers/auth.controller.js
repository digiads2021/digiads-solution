import Admin from '../models/Admin.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ok } from '../utils/respond.js';
import { COOKIE_NAME, cookieOptions, signToken } from '../middleware/auth.js';

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email }).select('+password');
  // Same message for unknown email and wrong password, so attackers cannot probe accounts.
  if (!admin || !admin.isActive || !(await admin.comparePassword(password))) {
    throw ApiError.unauthorized('Invalid email or password');
  }
  admin.lastLoginAt = new Date();
  await admin.save();

  res.cookie(COOKIE_NAME, signToken(admin), cookieOptions());
  ok(res, { admin: admin.toSafeJSON() });
});

// POST /api/auth/logout
export const logout = (req, res) => {
  const { maxAge, ...opts } = cookieOptions();
  res.clearCookie(COOKIE_NAME, opts);
  ok(res, { message: 'Logged out' });
};

// GET /api/auth/me
export const me = (req, res) => ok(res, { admin: req.admin.toSafeJSON() });

// POST /api/auth/change-password
export const changePassword = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id).select('+password');
  if (!(await admin.comparePassword(req.body.currentPassword))) {
    throw ApiError.badRequest('Current password is incorrect', { currentPassword: 'Current password is incorrect' });
  }
  admin.password = req.body.newPassword;
  await admin.save(); // pre-save hook hashes it and sets passwordChangedAt
  res.cookie(COOKIE_NAME, signToken(admin), cookieOptions()); // keep this session logged in
  ok(res, { message: 'Password updated' });
});
