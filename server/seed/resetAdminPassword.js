/**
 * Resets (or creates) the admin from ADMIN_NAME / ADMIN_EMAIL / ADMIN_PASSWORD in .env.
 * Use this when the admin password is lost or the account cannot log in.
 * Usage: npm run reset-admin
 */
import mongoose from 'mongoose';
import env from '../config/env.js';
import Admin from '../models/Admin.js';

async function run() {
  const { ADMIN_NAME = 'DigiAds Admin', ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in server/.env');
  if (ADMIN_PASSWORD.length < 10) throw new Error('ADMIN_PASSWORD must be at least 10 characters');

  await mongoose.connect(env.mongoUri);
  const email = ADMIN_EMAIL.toLowerCase().trim();
  const admin = await Admin.findOne({ email });
  if (admin) {
    admin.password = ADMIN_PASSWORD; // pre-save hook hashes it
    admin.isActive = true;
    await admin.save();
    console.log(`Password reset for ${email}.`);
  } else {
    await Admin.create({ name: ADMIN_NAME, email, password: ADMIN_PASSWORD, role: 'superadmin' });
    console.log(`Superadmin created: ${email}.`);
  }
  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error(err.message);
  await mongoose.disconnect();
  process.exit(1);
});
