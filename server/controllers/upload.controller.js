import ApiError from '../utils/ApiError.js';
import { ok } from '../utils/respond.js';

// POST /api/uploads/image (admin). Stored in server/uploads in development.
// For production on Render/Railway use cloud storage (e.g. Cloudinary) because their disks are temporary.
export const uploadImage = (req, res) => {
  if (!req.file) throw ApiError.badRequest('Please choose an image (JPG, PNG or WebP, up to 2 MB)');
  ok(res, { url: `/uploads/${req.file.filename}` }, undefined, 201);
};
