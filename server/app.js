import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';

import env from './config/env.js';
import corsOptions from './config/cors.js';
import apiRoutes from './routes/index.js';
import { sitemap, robots } from './controllers/sitemap.controller.js';
import sanitizeInput from './middleware/sanitizeInput.js';
import { globalLimiter } from './middleware/rateLimiters.js';
import { publicCache } from './middleware/cache.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.set('trust proxy', 1); // correct client IPs behind Render/Railway/Nginx (needed for rate limiting)
app.disable('x-powered-by');

// Security headers. crossOriginResourcePolicy lets the frontend show uploaded images.
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors(corsOptions));
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(sanitizeInput);
app.use(morgan(env.isProd ? 'combined' : 'dev'));

// Blocks cross-site form posts: state-changing API calls must send JSON (multipart only for uploads).
app.use('/api', (req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const type = req.headers['content-type'] || '';
    if (!type.includes('application/json') && !type.includes('multipart/form-data')) {
      return res.status(415).json({ success: false, message: 'Content-Type must be application/json' });
    }
  }
  next();
});

// API responses are private by default; public read routes opt in to CDN caching (middleware/cache.js).
app.use('/api', (req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });
app.use('/api', globalLimiter, apiRoutes);
app.use('/uploads', express.static('uploads', { maxAge: '7d' }));
app.get('/sitemap.xml', publicCache(3600), sitemap);
app.get('/robots.txt', publicCache(3600), robots);
app.get('/', (req, res) => res.json({ success: true, data: { name: 'DigiAds API', health: '/api/health' } }));

app.use(notFound);
app.use(errorHandler);

export default app;
