import ApiError from '../utils/ApiError.js';
import { ok } from '../utils/respond.js';
import { saveImage } from '../services/storage.service.js';

// POST /api/uploads/image (admin).
// Stored in Cloudinary or Vercel Blob in production, or server/uploads in development (see storage.service.js).
export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) throw ApiError.badRequest('Please choose an image (JPG, PNG or WebP, up to 2 MB)');
    const url = await saveImage(req.file);
    ok(res, { url }, undefined, 201);
  } catch (err) {
    next(err);
  }
};
