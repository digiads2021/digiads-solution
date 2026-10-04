import mongoose from 'mongoose';

// A single settings document. Contact fields stay empty until DigiAds verifies them.
const settingSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'site', unique: true },
    siteName: { type: String, default: 'DigiAds Business Solutions' },
    tagline: { type: String, default: 'Start. Comply. Protect. Build. Go Global.' },
    contact: {
      phone: { type: String, default: '' },
      email: { type: String, default: '' },
      whatsapp: { type: String, default: '' },
      addressIndia: { type: String, default: '' },
      addressUAE: { type: String, default: '' },
      hours: { type: String, default: '' },
    },
    social: { facebook: String, instagram: String, linkedin: String, youtube: String, x: String },
    seoDefaults: {
      title: { type: String, default: 'DigiAds Business Solutions – Registration, Compliance, Legal, Technology & UAE Setup' },
      description: {
        type: String,
        default: 'Business registration, GST and income tax, MCA compliance, trademark, licences, ISO, legal documents, website and app development, and UAE company formation — in one place.',
      },
      ogImage: String,
    },
  },
  { timestamps: true }
);

settingSchema.statics.getSingleton = async function getSingleton() {
  let doc = await this.findOne({ key: 'site' });
  if (!doc) doc = await this.create({ key: 'site' });
  return doc;
};

export default mongoose.model('WebsiteSetting', settingSchema);
