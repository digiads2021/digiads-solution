import env from './config/env.js';
import connectDB from './config/db.js';
import app from './app.js';
import logger from './utils/logger.js';

const start = async () => {
  try {
    await connectDB();
    app.listen(env.port, () => logger.info(`DigiAds API running on http://localhost:${env.port} (${env.nodeEnv})`));
  } catch (err) {
    logger.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

process.on('unhandledRejection', (err) => logger.error('Unhandled rejection:', err));
start();
