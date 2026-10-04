// Vercel serverless entry: every request is rewritten here (see vercel.json).
// The MongoDB connection is cached between invocations by config/db.js.
import app from '../app.js';
import connectDB from '../config/db.js';

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ success: false, message: 'Service temporarily unavailable' }));
  }
  return app(req, res);
}
