// Only the real frontend origin(s) may call the API with cookies. Never "*".
import env from './env.js';

const corsOptions = {
  origin(origin, callback) {
    // Allow server-to-server tools (no Origin header) such as curl or health checks.
    if (!origin || env.clientUrls.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
};

export default corsOptions;
