import mongoose from 'mongoose';

// A single settings document, pre-filled with the official DigiAds contact details and social profiles.
const settingSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'site', unique: true },
    siteName: { type: String, default: 'DigiAds Business Solutions' },
    tagline: { type: String, default: 'One stop solutions, for your business' },
    contact: {
      phone: { type: String, default: '+91 69011 17313' },
      email: { type: String, default: 'info@digiadssolution.in' },
      whatsapp: { type: String, default: '+91 69011 17313' },
      addressIndia: { type: String, default: 'G-1, Bhuyan Bunglow, Kalbari, Abhayapuri, Bongaigaon, Assam 783384' },
      addressUAE: { type: String, default: '' },
      hours: { type: String, default: '' },
    },
    social: {
      facebook: { type: String, default: 'https://short.do/1-ITUd' },
      instagram: { type: String, default: 'https://short.do/sEmEsh' },
      youtube: { type: String, default: 'https://short.do/Mt7BeE' },
      linkedin: { type: String, default: 'https://in.linkedin.com/company/digiadssolution' },
      x: { type: String, default: 'https://x.com/DigiAdsBusiness' },
      threads: { type: String, default: 'https://www.threads.com/@digiads.official' },
    },
    seoDefaults: {
      title: { type: String, default: 'DigiAds Business Solutions – One Stop Solutions for Your Business' },
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
