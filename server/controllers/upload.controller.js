import path from 'path';
import crypto from 'crypto';
import ApiError from '../utils/ApiError.js';
import { ok } from '../utils/respond.js';

// POST /api/uploads/image (admin).
// Production (Vercel): stored in Vercel Blob when BLOB_READ_WRITE_TOKEN is set.
// Development: stored in server/uploads.
export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) throw ApiError.badRequest('Please choose an image (JPG, PNG or WebP, up to 2 MB)');
    if (req.file.buffer) {
      const { put } = await import('@vercel/blob');
      const name = `uploads/${Date.now()}-${crypto.randomBytes(6).toString('hex')}${path.extname(req.file.originalname).toLowerCase()}`;
      const blob = await put(name, req.file.buffer, { access: 'public', contentType: req.file.mimetype });
      return ok(res, { url: blob.url }, undefined, 201);
    }
    ok(res, { url: `/uploads/${req.file.filename}` }, undefined, 201);
  } catch (err) {
    next(err);
  }
};
