import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema({ title: String, description: String }, { _id: false });

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, trim: true },
    overview: { type: String, trim: true },
    icon: { type: String, default: 'Briefcase' },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    benefits: [stepSchema],
    process: [stepSchema],
    seo: { title: String, description: String },
  },
  { timestamps: true }
);

categorySchema.index({ status: 1, order: 1 });

export default mongoose.model('ServiceCategory', categorySchema);
