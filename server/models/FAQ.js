import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    scope: { type: String, enum: ['home', 'general', 'category', 'service'], default: 'general' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceCategory' },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
  },
  { timestamps: true }
);

faqSchema.index({ scope: 1, service: 1, status: 1, order: 1 });
faqSchema.index({ scope: 1, category: 1, status: 1, order: 1 });

export default mongoose.model('FAQ', faqSchema);
