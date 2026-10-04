import env from './config/env.js';
import connectDB from './config/db.js';
import app from './app.js';
import logger from './utils/logger.js';

// Atlas connections occasionally fail for a moment (network blips), so retry before giving up.
const connectWithRetry = async (attempts = 5) => {
  for (let i = 1; ; i += 1) {
    try {
      return await connectDB();
    } catch (err) {
      if (i >= attempts) throw err;
      const wait = i * 2000;
      logger.warn(`MongoDB connection failed (attempt ${i}/${attempts}): ${err.message.split('.')[0]}. Retrying in ${wait / 1000}s…`);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
};

const start = async () => {
  try {
    await connectWithRetry();
    app.listen(env.port, () => logger.info(`DigiAds API running on http://localhost:${env.port} (${env.nodeEnv})`));
  } catch (err) {
    logger.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

process.on('unhandledRejection', (err) => logger.error('Unhandled rejection:', err));
start();
