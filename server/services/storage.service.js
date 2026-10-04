// Where admin image uploads are stored, in order of preference:
//   1. Cloudinary   — CLOUDINARY_URL (or CLOUDINARY_CLOUD_NAME + CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET)
//   2. Vercel Blob  — BLOB_READ_WRITE_TOKEN
//   3. Local disk   — server/uploads (development only; Vercel's filesystem is read-only)
import path from 'path';
import crypto from 'crypto';
import ApiError from '../utils/ApiError.js';

function cloudinaryConfig() {
  const { CLOUDINARY_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (CLOUDINARY_URL) {
    try {
      const u = new URL(CLOUDINARY_URL); // cloudinary://<key>:<secret>@<cloud_name>
      return { cloud_name: u.hostname, api_key: decodeURIComponent(u.username), api_secret: decodeURIComponent(u.password) };
    } catch {
      return null;
    }
  }
  if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
    return { cloud_name: CLOUDINARY_CLOUD_NAME, api_key: CLOUDINARY_API_KEY, api_secret: CLOUDINARY_API_SECRET };
  }
  return null;
}

export function storageProvider() {
  if (cloudinaryConfig()) return 'cloudinary';
  if (process.env.BLOB_READ_WRITE_TOKEN) return 'blob';
  return process.env.VERCEL ? 'none' : 'disk';
}

// Multer keeps files in memory for cloud providers and writes to disk only for local development.
export const usesMemoryStorage = () => storageProvider() !== 'disk';

const randomName = (original) => `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${path.extname(original).toLowerCase()}`;

async function uploadToCloudinary(file) {
  const { v2: cloudinary } = await import('cloudinary');
  cloudinary.config({ ...cloudinaryConfig(), secure: true });
  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: process.env.CLOUDINARY_FOLDER || 'digiads', resource_type: 'image', use_filename: false, unique_filename: true, overwrite: false },
      (err, res) => (err ? reject(err) : resolve(res))
    );
    stream.end(file.buffer);
  });
  // Serve every image in the best format and quality for the visitor's browser.
  return result.secure_url.replace('/image/upload/', '/image/upload/f_auto,q_auto/');
}

async function uploadToBlob(file) {
  const { put } = await import('@vercel/blob');
  const blob = await put(`uploads/${randomName(file.originalname)}`, file.buffer, { access: 'public', contentType: file.mimetype });
  return blob.url;
}

// Returns the public URL of the stored image.
export async function saveImage(file) {
  const provider = storageProvider();
  try {
    if (provider === 'cloudinary') return await uploadToCloudinary(file);
    if (provider === 'blob') return await uploadToBlob(file);
  } catch (err) {
    console.error(`Image upload to ${provider} failed:`, err.message);
    throw new ApiError(502, 'Image upload failed. Please try again.');
  }
  if (provider === 'disk') return `/uploads/${file.filename}`;
  throw new ApiError(503, 'Image storage is not configured on the server.');
}
