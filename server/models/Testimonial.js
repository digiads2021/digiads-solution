import mongoose from 'mongoose';

// Only real client testimonials with consent. Rating is optional and must be genuine.
const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    serviceName: { type: String, trim: true },
    text: { type: String, required: true, trim: true, maxlength: 1000 },
    photo: String,
    rating: { type: Number, min: 1, max: 5 },
    consentGiven: { type: Boolean, default: false },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

testimonialSchema.pre('save', function requireConsent(next) {
  if (this.status === 'published' && !this.consentGiven) {
    return next(new Error('A testimonial can be published only after the client has given consent.'));
  }
  next();
});

testimonialSchema.index({ status: 1, featured: 1, order: 1 });

export default mongoose.model('Testimonial', testimonialSchema);
