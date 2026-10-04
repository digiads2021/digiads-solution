import mongoose from 'mongoose';
import env from './env.js';
import logger from '../utils/logger.js';

// Reuse one connection across serverless invocations (Vercel) and hot reloads.
const cache = globalThis.__mongoose || (globalThis.__mongoose = { conn: null, promise: null });

export default async function connectDB() {
  if (cache.conn && mongoose.connection.readyState === 1) return cache.conn;
  if (!cache.promise) {
    mongoose.set('strictQuery', true);
    cache.promise = mongoose
      .connect(env.mongoUri, { serverSelectionTimeoutMS: 10000, maxPoolSize: 10 })
      .then((m) => {
        logger.info(`MongoDB connected: ${m.connection.host}`);
        return m;
      })
      .catch((err) => {
        cache.promise = null; // allow a retry on the next request
        throw err;
      });
  }
  cache.conn = await cache.promise;
  return cache.conn;
}
