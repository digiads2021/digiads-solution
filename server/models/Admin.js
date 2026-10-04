import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 10, select: false },
    role: { type: String, enum: ['superadmin', 'editor'], default: 'editor' },
    isActive: { type: Boolean, default: true },
    lastLoginAt: Date,
    passwordChangedAt: Date,
  },
  { timestamps: true }
);

// Hash the password whenever it is created or changed.
adminSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  if (!this.isNew) this.passwordChangedAt = new Date();
  next();
});

adminSchema.methods.comparePassword = function comparePassword(plain) {
  return bcrypt.compare(plain, this.password);
};

adminSchema.methods.toSafeJSON = function toSafeJSON() {
  return { id: this._id, name: this.name, email: this.email, role: this.role, lastLoginAt: this.lastLoginAt };
};

export default mongoose.model('Admin', adminSchema);
