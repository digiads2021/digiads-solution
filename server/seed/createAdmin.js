/**
 * Creates the first superadmin from ADMIN_NAME / ADMIN_EMAIL / ADMIN_PASSWORD in .env.
 * Usage: npm run create-admin
 * There is no public sign-up route; more admins can be added the same way.
 */
import mongoose from 'mongoose';
import env from '../config/env.js';
import Admin from '../models/Admin.js';

async function run() {
  const { ADMIN_NAME = 'DigiAds Admin', ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in server/.env');
  if (ADMIN_PASSWORD.length < 10) throw new Error('ADMIN_PASSWORD must be at least 10 characters');

  await mongoose.connect(env.mongoUri);
  const existing = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() });
  if (existing) {
    console.log(`Admin ${ADMIN_EMAIL} already exists. Nothing changed.`);
  } else {
    await Admin.create({ name: ADMIN_NAME, email: ADMIN_EMAIL, password: ADMIN_PASSWORD, role: 'superadmin' });
    console.log(`Superadmin created: ${ADMIN_EMAIL}. Log in at /admin/login and change the password.`);
  }
  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error(err.message);
  await mongoose.disconnect();
  process.exit(1);
});
