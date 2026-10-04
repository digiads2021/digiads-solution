import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    status: { type: String, enum: ['subscribed', 'unsubscribed'], default: 'subscribed' },
    source: { type: String, default: 'website' },
  },
  { timestamps: true }
);

export default mongoose.model('NewsletterSubscriber', subscriberSchema);
