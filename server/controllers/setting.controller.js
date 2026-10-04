import WebsiteSetting from '../models/WebsiteSetting.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ok } from '../utils/respond.js';

// GET /api/settings (public, safe fields only)
export const getSettings = asyncHandler(async (req, res) => {
  const s = await WebsiteSetting.getSingleton();
  ok(res, { siteName: s.siteName, tagline: s.tagline, contact: s.contact, social: s.social, seoDefaults: s.seoDefaults });
});

// PUT /api/settings (superadmin)
export const updateSettings = asyncHandler(async (req, res) => {
  const s = await WebsiteSetting.getSingleton();
  s.set(req.body);
  await s.save();
  ok(res, s);
});

// GET /api/admin/settings (admin) - full, uncached settings for the admin form.
export const adminGetSettings = asyncHandler(async (req, res) => {
  ok(res, await WebsiteSetting.getSingleton());
});
