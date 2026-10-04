import env from '../config/env.js';
import logger from '../utils/logger.js';

export const notFound = (req, res) => {
  res.removeHeader('Vercel-CDN-Cache-Control');
  res.set('Cache-Control', 'no-store');
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
};

// Central error handler: one response shape, no stack traces in production.
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  let errors = err.errors;

  if (err.name === 'CastError') { status = 400; message = 'Invalid ID'; }
  if (err.code === 11000) {
    status = 409;
    const field = Object.keys(err.keyValue || {})[0];
    message = `A record with this ${field || 'value'} already exists`;
  }
  if (err.name === 'ValidationError') {
    status = 400;
    message = 'Please check the highlighted fields';
    errors = Object.fromEntries(Object.entries(err.errors).map(([k, v]) => [k, v.message]));
  }
  if (err.message === 'Not allowed by CORS') status = 403;
  if (err.name === 'MulterError') { status = 400; message = err.code === 'LIMIT_FILE_SIZE' ? 'Image must be 2 MB or smaller' : err.message; }
  if (err.type === 'entity.too.large') { status = 413; message = 'Request is too large'; }

  if (status >= 500) logger.error(`${req.method} ${req.originalUrl} ->`, err.stack || err);

  // Never let the CDN keep an error that a public route had marked as cacheable.
  res.removeHeader('Vercel-CDN-Cache-Control');
  res.set('Cache-Control', 'no-store');

  res.status(status).json({
    success: false,
    message: status >= 500 && env.isProd ? 'Something went wrong. Please try again.' : message,
    ...(errors ? { errors } : {}),
    ...(!env.isProd && status >= 500 ? { stack: err.stack } : {}),
  });
};
