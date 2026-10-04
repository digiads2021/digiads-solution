// The 6 customer-intent navigation groups. Services are assigned to one pillar each.
const pillars = [
  { key: 'registration', name: 'Registration', icon: 'Building2', description: 'Start your company, firm, NGO or startup the right way.' },
  { key: 'tax-compliance', name: 'Tax & Compliance', icon: 'Receipt', description: 'GST, income tax, MCA/ROC filings and payroll registrations.' },
  { key: 'legal-ip', name: 'Legal & IP', icon: 'Scale', description: 'Protect your brand and put agreements in writing.' },
  { key: 'licences-iso', name: 'Licences & ISO', icon: 'BadgeCheck', description: 'FSSAI, import/export and ISO certifications.' },
  { key: 'technology', name: 'Technology', icon: 'MonitorSmartphone', description: 'Websites, web applications, mobile apps and integrations.' },
  { key: 'global', name: 'Global', icon: 'Globe2', description: 'UAE company formation, trade licences, visas and offices.' },
];

export const pillarKeys = pillars.map((p) => p.key);
export const lifecycleStages = ['idea', 'register', 'comply', 'protect', 'build', 'grow', 'expand'];
export default pillars;
