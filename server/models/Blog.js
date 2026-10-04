import mongoose from 'mongoose';

export const BLOG_CATEGORIES = ['Business', 'Startup', 'GST', 'Income Tax', 'MCA', 'Trademark', 'Legal', 'Compliance', 'Technology', 'UAE / Global Business'];

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, trim: true, maxlength: 400 },
    content: { type: String, default: '' },
    featuredImage: { url: String, alt: String },
    category: { type: String, enum: BLOG_CATEGORIES, default: 'Business' },
    tags: [String],
    author: { type: String, default: 'DigiAds Team' },
    relatedServices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    seo: { title: String, description: String, canonical: String },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: Date,
  },
  { timestamps: true }
);

blogSchema.pre('save', function setPublishedAt(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) this.publishedAt = new Date();
  next();
});

blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ category: 1, status: 1, publishedAt: -1 });
blogSchema.index({ title: 'text', excerpt: 'text' });

export default mongoose.model('Blog', blogSchema);
