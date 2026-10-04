// The complete DigiAds service catalogue (157 services), grouped by category > subcategory.
// Each service: [name, slug, one-line description, options]
// options: { popular, featured, kw: [search keywords], related: [slugs] }
// "group" picks the content template in content.js.

const catalogue = [
  // ---------------- 1. Business Registration ----------------
  {
    category: 'business-registration', subcategory: 'Company & Firm Registration', pillar: 'registration', group: 'entity', lifecycle: 'register', icon: 'Building2',
    services: [
      ['Private Limited Company Registration', 'private-limited-company-registration', 'Incorporate a private limited company with limited liability, separate legal identity and easy fundraising.', { popular: true, kw: ['pvt ltd', 'company registration', 'company incorporation', 'startup company'] }],
      ['Limited Liability Partnership (LLP) Registration', 'llp-registration', 'Register an LLP that combines partnership flexibility with limited liability for partners.', { popular: true, kw: ['llp', 'limited liability partnership'] }],
      ['One Person Company (OPC) Registration', 'opc-registration', 'Start a company on your own with limited liability as a One Person Company.', { kw: ['opc', 'one person company', 'single owner company'] }],
      ['Public Limited Company Registration', 'public-limited-company-registration', 'Incorporate a public limited company suited to larger businesses and public fundraising.', { kw: ['public company', 'ltd company'] }],
      ['Sole Proprietorship Registration', 'sole-proprietorship-registration', 'Set up a proprietorship with the registrations needed to open a current account and trade.', { kw: ['proprietorship', 'proprietor', 'sole trader'] }],
      ['Partnership Firm Registration', 'partnership-firm-registration', 'Register a partnership firm with a well-drafted partnership deed.', { kw: ['partnership', 'firm registration'] }],
      ['Nidhi Company Registration', 'nidhi-company-registration', 'Incorporate a Nidhi company to promote saving and lending among its members.', { kw: ['nidhi'] }],
      ['Farmer Producer Company Registration', 'farmer-producer-company-registration', 'Register a producer company owned by farmers and primary producers.', { kw: ['fpo', 'fpc', 'producer company', 'farmer'] }],
    ],
  },

  // ---------------- 2. NGO, Society & Trust ----------------
  {
    category: 'ngo-society-trust', subcategory: 'NGO Registration', pillar: 'registration', group: 'ngo', lifecycle: 'register', icon: 'HeartHandshake',
    services: [
      ['Section 8 Company / NGO / Foundation', 'section-8-company-registration', 'Register a non-profit company under Section 8 of the Companies Act for charitable objects.', { popular: true, kw: ['section 8', 'ngo', 'foundation', 'non profit'] }],
      ['Trust Registration', 'trust-registration', 'Create a public charitable trust with a properly drafted trust deed.', { kw: ['trust deed', 'charitable trust'] }],
      ['Club / Association Registration', 'club-association-registration', 'Register a club or association for members with a common purpose.', { kw: ['club', 'association'] }],
      ['Society Registration', 'society-registration', 'Register a society under the Societies Registration Act for charitable, educational or cultural work.', { kw: ['society'] }],
      ['NGO Darpan Registration', 'ngo-darpan-registration', 'Obtain a unique NGO Darpan ID from NITI Aayog to apply for government grants.', { kw: ['darpan', 'niti aayog', 'ngo id'] }],
      ['12A / 12AB Registration', '12a-12ab-registration', 'Register your NGO under Section 12A/12AB so its surplus income is exempt from income tax.', { kw: ['12a', '12ab', 'ngo tax exemption'] }],
      ['80G Registration', '80g-registration', 'Get 80G approval so your donors can claim a tax deduction on donations.', { kw: ['80g', 'donation tax benefit'] }],
      ['CSR-1 Registration', 'csr-1-registration', 'File Form CSR-1 so your organisation can receive CSR funds from companies.', { kw: ['csr', 'csr-1', 'csr funding'] }],
    ],
  },
  {
    category: 'ngo-society-trust', subcategory: 'NGO Ongoing Compliance', pillar: 'registration', group: 'ngoOngoing', lifecycle: 'comply', icon: 'FileCheck2',
    services: [
      ['Society / Trust Renewal', 'society-trust-renewal', 'Renew your society or trust registration and related approvals on time.', { kw: ['renewal', 'society renewal'] }],
      ['Society Audit Report', 'society-audit-report', 'Prepare the audited financial statements and audit report your society needs.', { kw: ['audit', 'society audit'] }],
      ['Society / Trust Activity Report', 'society-trust-activity-report', 'Document your yearly activities in a clear report for authorities and donors.', { kw: ['annual report', 'activity report'] }],
    ],
  },

  // ---------------- 3. MCA / ROC Compliance ----------------
  {
    category: 'mca-roc-compliance', subcategory: 'Annual Compliance', pillar: 'tax-compliance', group: 'annual', lifecycle: 'comply', icon: 'CalendarCheck',
    services: [
      ['Private Limited Company Annual Compliance', 'private-limited-company-annual-compliance', 'Annual ROC filings, board meetings, financial statements and statutory registers for private limited companies.', { popular: true, kw: ['aoc-4', 'mgt-7', 'roc filing', 'annual return'] }],
      ['LLP Annual Compliance', 'llp-annual-compliance', 'Form 8 and Form 11 filings and annual compliance for LLPs.', { kw: ['form 8', 'form 11', 'llp filing'] }],
      ['OPC Annual Compliance', 'opc-annual-compliance', 'Annual ROC filings and compliance for One Person Companies.', { kw: ['opc filing'] }],
      ['NGO Annual Compliance', 'ngo-annual-compliance', 'Annual filings for Section 8 companies and NGOs, including ROC and tax compliance.', { kw: ['section 8 compliance', 'ngo filing'] }],
    ],
  },
  {
    category: 'mca-roc-compliance', subcategory: 'Company Changes', pillar: 'tax-compliance', group: 'change', lifecycle: 'comply', icon: 'RefreshCw',
    services: [
      ['Director Resignation / Removal', 'director-resignation-removal', 'Record a director’s resignation or removal with the ROC correctly.', { kw: ['dir-12', 'remove director', 'add director'] }],
      ['Registered Office Change', 'registered-office-change', 'Shift your registered office within the city, state or to another state.', { kw: ['inc-22', 'address change'] }],
      ['Company Name Change', 'company-name-change', 'Change your company’s name with shareholder approval and ROC filings.', { kw: ['rename company'] }],
      ['Object Clause Change', 'object-clause-change', 'Amend the object clause of your MoA to add or change business activities.', { kw: ['moa amendment', 'business activity change'] }],
      ['Authorized Share Capital Increase', 'authorized-share-capital-increase', 'Increase the authorised capital of your company before issuing more shares.', { kw: ['sh-7', 'increase capital'] }],
      ['Share Transfer', 'share-transfer', 'Transfer shares between shareholders with the correct deed and stamp duty.', { kw: ['sh-4', 'transfer shares'] }],
    ],
  },
  {
    category: 'mca-roc-compliance', subcategory: 'Closure & Conversion', pillar: 'tax-compliance', group: 'change', lifecycle: 'comply', icon: 'Repeat',
    services: [
      ['Company Strike-Off / Closure', 'company-strike-off-closure', 'Close a company that is no longer operating through the strike-off process.', { kw: ['stk-2', 'close company', 'wind up'] }],
      ['Company Conversion', 'company-conversion', 'Convert between company types, such as private to public or OPC to private limited.', { kw: ['convert company', 'opc to private'] }],
      ['LLP Conversion', 'llp-conversion', 'Convert a partnership firm or private company into an LLP, or an LLP into a company.', { kw: ['convert to llp', 'partnership to llp'] }],
    ],
  },

  // ---------------- 4. GST & Income Tax ----------------
  {
    category: 'gst-income-tax', subcategory: 'GST Services', pillar: 'tax-compliance', group: 'gst', lifecycle: 'comply', icon: 'Receipt',
    services: [
      ['GST Registration', 'gst-registration', 'Get your GSTIN to collect GST, claim input tax credit and sell across India.', { popular: true, kw: ['gstin', 'gst number', 'goods and services tax'] }],
      ['GST Return Filing', 'gst-return-filing', 'Monthly or quarterly GSTR-1 and GSTR-3B filing based on your sales and purchases.', { popular: true, kw: ['gstr-1', 'gstr-3b', 'gst return'] }],
      ['GST Annual Return', 'gst-annual-return', 'Prepare and file the GSTR-9 annual return and reconciliation where applicable.', { kw: ['gstr-9', 'gstr-9c', 'annual return'] }],
      ['GST Amendment', 'gst-amendment', 'Update business details, address, partners or directors in your GST registration.', { kw: ['gst modification', 'change gst address'] }],
      ['GST Cancellation', 'gst-cancellation', 'Cancel your GST registration and file the final return when you close or no longer need it.', { kw: ['cancel gst', 'surrender gst'] }],
      ['GST Nil Return', 'gst-nil-return', 'File nil GST returns for periods with no sales or purchases to avoid late fees.', { kw: ['nil return', 'zero return'] }],
      ['GST Reconciliation', 'gst-reconciliation', 'Match your purchase records with GSTR-2A/2B to protect your input tax credit.', { kw: ['gstr-2b', 'itc reconciliation', 'input tax credit'] }],
    ],
  },
  {
    category: 'gst-income-tax', subcategory: 'Income Tax Services', pillar: 'tax-compliance', group: 'itr', lifecycle: 'comply', icon: 'Calculator',
    services: [
      ['Individual ITR Filing', 'individual-itr-filing', 'File your personal income tax return for salary, house property, capital gains and other income.', { popular: true, kw: ['itr', 'income tax return', 'salary itr', 'itr-1', 'itr-2'] }],
      ['Business ITR Filing', 'business-itr-filing', 'Income tax return for proprietors and professionals with business income.', { kw: ['itr-3', 'itr-4', 'proprietor itr'] }],
      ['Partnership Firm ITR Filing', 'partnership-firm-itr-filing', 'Prepare and file the income tax return of a partnership firm.', { kw: ['firm itr', 'itr-5'] }],
      ['LLP Income Tax Return', 'llp-income-tax-return', 'Prepare and file the income tax return of an LLP.', { kw: ['llp itr', 'itr-5'] }],
      ['Company ITR Filing', 'company-itr-filing', 'Prepare and file the income tax return of a company.', { kw: ['company itr', 'itr-6'] }],
      ['Income Tax Notice Reply', 'income-tax-notice-reply', 'Understand and respond to income tax notices with a professionally drafted reply.', { kw: ['tax notice', 'section 143', 'demand notice'] }],
      ['Tax Consultation', 'tax-consultation', 'Talk to a tax professional about planning, deductions and compliance.', { kw: ['tax advice', 'tax planning'] }],
    ],
  },

  // ---------------- 5. Trademark, FSSAI & Import/Export ----------------
  {
    category: 'trademark-fssai-import-export', subcategory: 'Trademark', pillar: 'legal-ip', group: 'trademark', lifecycle: 'protect', icon: 'Stamp',
    services: [
      ['Trademark Registration', 'trademark-registration', 'Protect your brand name with a registered trademark in India.', { popular: true, kw: ['tm', 'brand registration', 'brand name'] }],
      ['Logo Trademark Registration', 'logo-trademark-registration', 'Register your logo as a device mark so no one else can use it.', { kw: ['logo', 'device mark'] }],
      ['Trademark Objection Reply', 'trademark-objection-reply', 'Respond to the examiner’s objection on your trademark application.', { kw: ['objection', 'examination report'] }],
      ['Trademark Opposition', 'trademark-opposition', 'File or defend an opposition against a trademark application.', { kw: ['opposition', 'counter statement'] }],
      ['Trademark Rectification', 'trademark-rectification', 'Apply to correct or remove a wrongly registered trademark from the register.', { kw: ['rectification', 'cancel trademark'] }],
    ],
  },
  {
    category: 'trademark-fssai-import-export', subcategory: 'FSSAI', pillar: 'licences-iso', group: 'fssai', lifecycle: 'grow', icon: 'UtensilsCrossed',
    services: [
      ['FSSAI Basic Registration', 'fssai-basic-registration', 'Basic FSSAI registration for small and petty food businesses.', { popular: true, kw: ['food license', 'fssai', 'food registration'] }],
      ['FSSAI State License', 'fssai-state-license', 'State FSSAI licence for medium-sized food businesses.', { kw: ['state food license'] }],
      ['FSSAI Central License', 'fssai-central-license', 'Central FSSAI licence for large, multi-state, importing or exporting food businesses.', { kw: ['central food license', 'food import'] }],
      ['FSSAI Renewal', 'fssai-renewal', 'Renew your FSSAI registration or licence before it expires.', { kw: ['renew food license'] }],
      ['FSSAI Modification', 'fssai-modification', 'Update products, address or other details on your FSSAI licence.', { kw: ['modify food license'] }],
      ['FSSAI Compliance', 'fssai-compliance', 'Ongoing FSSAI compliance including annual returns where applicable.', { kw: ['fssai annual return', 'food compliance'] }],
    ],
  },
  {
    category: 'trademark-fssai-import-export', subcategory: 'Import & Export', pillar: 'licences-iso', group: 'iec', lifecycle: 'grow', icon: 'Ship',
    services: [
      ['Import Export Code (IEC)', 'import-export-code-iec', 'Get the 10-digit IEC from DGFT required to import or export goods and services.', { popular: true, kw: ['iec', 'import export license', 'dgft'] }],
      ['IEC Modification', 'iec-modification', 'Update business details, address or bank information on your IEC.', { kw: ['iec update', 'iec change'] }],
      ['IEC Annual Update', 'iec-annual-update', 'Complete the mandatory yearly update of your IEC details with DGFT.', { kw: ['iec renewal', 'iec annual'] }],
      ['Export Documentation', 'export-documentation', 'Prepare invoices, packing lists and other documents needed for export shipments.', { kw: ['export documents', 'shipping documents'] }],
      ['Import & Export Certificate', 'import-export-certificate', 'Obtain registrations and certificates connected with your import-export business.', { kw: ['rcmc', 'export certificate'] }],
    ],
  },

  // ---------------- 6. Startup, MSME & ISO ----------------
  {
    category: 'startup-msme-iso', subcategory: 'Startup & Business Registrations', pillar: 'registration', group: 'startup', lifecycle: 'grow', icon: 'Rocket',
    services: [
      ['Startup India / DPIIT Recognition', 'startup-india-dpiit-recognition', 'Get DPIIT recognition to access Startup India benefits and schemes.', { featured: true, popular: true, kw: ['startup india', 'dpiit', 'startup recognition'] }],
      ['Digital Signature Certificate (DSC)', 'digital-signature-certificate', 'Get a Class 3 digital signature for MCA, GST, income tax and tender filings.', { kw: ['dsc', 'digital signature', 'class 3'] }],
      ['DIN Registration / Activation', 'din-registration-activation', 'Obtain a Director Identification Number or reactivate a deactivated DIN with DIR-3 KYC.', { kw: ['din', 'dir-3 kyc', 'director id'] }],
      ['Udyam / MSME Registration', 'udyam-msme-registration', 'Register your business on the Udyam portal to be recognised as an MSME.', { popular: true, kw: ['msme', 'udyam', 'udyog aadhaar', 'small business'] }],
      ['Shop & Establishment Registration', 'shop-establishment-registration', 'Register your shop, office or commercial establishment under the state’s Shops Act.', { kw: ['shop act', 'shop license', 'gumasta'] }],
      ['Trade License – Assam', 'trade-license-assam', 'Obtain a municipal trade licence for your business in Assam.', { kw: ['trade licence', 'guwahati', 'assam', 'municipal license', 'gmc'] }],
    ],
  },
  {
    category: 'startup-msme-iso', subcategory: 'ISO Certification', pillar: 'licences-iso', group: 'iso', lifecycle: 'grow', icon: 'BadgeCheck',
    services: [
      ['ISO 9001 – Quality Management', 'iso-9001-quality-management', 'Certify your quality management system to ISO 9001.', { popular: true, kw: ['iso', 'iso 9001', 'qms', 'quality'] }],
      ['ISO 14001 – Environmental Management', 'iso-14001-environmental-management', 'Certify your environmental management system to ISO 14001.', { kw: ['iso 14001', 'ems', 'environment'] }],
      ['ISO 45001 – Occupational Health & Safety', 'iso-45001-occupational-health-safety', 'Certify your occupational health and safety system to ISO 45001.', { kw: ['iso 45001', 'ohs', 'safety'] }],
      ['ISO/IEC 27001 – Information Security', 'iso-iec-27001-information-security', 'Certify your information security management system to ISO/IEC 27001.', { kw: ['iso 27001', 'isms', 'information security'] }],
      ['ISO 22000 – Food Safety Management', 'iso-22000-food-safety-management', 'Certify your food safety management system to ISO 22000.', { kw: ['iso 22000', 'food safety'] }],
      ['ISO 13485 – Medical Devices Quality Management', 'iso-13485-medical-devices-quality-management', 'Certify your medical device quality management system to ISO 13485.', { kw: ['iso 13485', 'medical devices'] }],
      ['ISO/IEC 20000 – IT Service Management', 'iso-iec-20000-it-service-management', 'Certify your IT service management system to ISO/IEC 20000.', { kw: ['iso 20000', 'itsm'] }],
      ['ISO 50001 – Energy Management', 'iso-50001-energy-management', 'Certify your energy management system to ISO 50001.', { kw: ['iso 50001', 'energy'] }],
    ],
  },

  // ---------------- 7. Legal Documents ----------------
  {
    category: 'legal-documents', subcategory: 'Agreements & Deeds', pillar: 'legal-ip', group: 'agreement', lifecycle: 'protect', icon: 'FileSignature',
    services: [
      ['Partnership Deed', 'partnership-deed', 'Draft a partnership deed covering capital, profit sharing, roles and exit.', { kw: ['deed', 'partnership agreement'] }],
      ['LLP Agreement', 'llp-agreement', 'Draft the LLP agreement that governs partners’ rights and duties.', { kw: ['llp deed'] }],
      ['Shareholders Agreement', 'shareholders-agreement', 'Set out shareholder rights, transfers, board seats and exits in a shareholders agreement.', { kw: ['sha', 'investor agreement', 'founders agreement'] }],
      ['Employment Agreement', 'employment-agreement', 'Clear employment contracts covering role, pay, confidentiality and termination.', { kw: ['employment contract', 'offer letter', 'appointment letter'] }],
      ['Freelancer Agreement', 'freelancer-agreement', 'Contracts for freelancers covering scope, payment, IP ownership and confidentiality.', { kw: ['contractor agreement', 'freelance contract'] }],
      ['Vendor Agreement', 'vendor-agreement', 'Agreements with suppliers covering supply terms, quality, payment and liability.', { kw: ['supplier agreement', 'purchase agreement'] }],
      ['Consultancy Agreement', 'consultancy-agreement', 'Agreements for consulting engagements covering scope, fees and deliverables.', { kw: ['consulting contract', 'service agreement'] }],
      ['Franchise Agreement', 'franchise-agreement', 'Franchise agreements covering brand use, fees, territory and obligations.', { kw: ['franchise'] }],
      ['Rent / Lease Agreement', 'rent-lease-agreement', 'Residential or commercial rent and lease agreements.', { kw: ['rental agreement', 'lease deed', 'rent agreement'] }],
    ],
  },
  {
    category: 'legal-documents', subcategory: 'Notices & Affidavits', pillar: 'legal-ip', group: 'notice', lifecycle: 'protect', icon: 'Gavel',
    services: [
      ['Legal Notice', 'legal-notice', 'Send or reply to a legal notice drafted by a lawyer.', { kw: ['notice', 'cheque bounce notice', 'recovery notice'] }],
      ['Affidavit', 'affidavit', 'Draft affidavits for name change, address proof, declarations and other purposes.', { kw: ['self declaration', 'notary'] }],
    ],
  },

  // ---------------- 8. Professional Services ----------------
  {
    category: 'professional-services', subcategory: 'Business Planning', pillar: 'registration', group: 'planning', lifecycle: 'idea', icon: 'Lightbulb',
    services: [
      ['Business Plan Preparation', 'business-plan-preparation', 'A structured business plan covering market, model, operations and financial projections.', { kw: ['business plan', 'pitch', 'investor plan'] }],
      ['Project Report', 'project-report', 'Detailed project reports for bank loans, subsidies and government schemes.', { kw: ['dpr', 'cma report', 'bank loan report'] }],
      ['Startup Consultation', 'startup-consultation', 'Guidance on structure, registrations and first steps for your startup idea.', { kw: ['startup advice'] }],
      ['Business Registration Consultation', 'business-registration-consultation', 'Expert help choosing the right business structure and registrations.', { kw: ['which company type', 'registration advice'] }],
    ],
  },
  {
    category: 'professional-services', subcategory: 'Expert Consultation', pillar: 'tax-compliance', group: 'consult', lifecycle: 'comply', icon: 'MessagesSquare',
    services: [
      ['CA Consultation', 'ca-consultation', 'Talk to a Chartered Accountant about tax, accounts and financial compliance.', { kw: ['chartered accountant', 'ca advice'] }],
      ['CS Consultation', 'cs-consultation', 'Talk to a Company Secretary about company law and ROC compliance.', { kw: ['company secretary', 'cs advice'] }],
      ['Compliance Consultation', 'compliance-consultation', 'Understand all the compliance your business must follow, and when.', { kw: ['compliance calendar', 'compliance check'] }],
    ],
  },
  {
    category: 'professional-services', subcategory: 'Legal Consultation', pillar: 'legal-ip', group: 'consult', lifecycle: 'protect', icon: 'Scale',
    services: [
      ['Lawyer Consultation', 'lawyer-consultation', 'Talk to a lawyer about contracts, disputes, notices and legal rights.', { kw: ['legal advice', 'advocate'] }],
    ],
  },
  {
    category: 'professional-services', subcategory: 'Payroll Registrations', pillar: 'tax-compliance', group: 'payroll', lifecycle: 'comply', icon: 'Users',
    services: [
      ['PF Registration', 'pf-registration', 'Register your establishment with EPFO for employees’ provident fund.', { kw: ['epf', 'provident fund', 'epfo'] }],
      ['ESI Registration', 'esi-registration', 'Register with ESIC to provide health insurance benefits to employees.', { kw: ['esic', 'employee insurance'] }],
    ],
  },

  // ---------------- 9. Website & App Development ----------------
  {
    category: 'website-app-development', subcategory: 'Website Development', pillar: 'technology', group: 'website', lifecycle: 'build', icon: 'Globe',
    services: [
      ['Business Website Development', 'business-website-development', 'A fast, professional website that explains your business and brings in enquiries.', { popular: true, kw: ['website', 'web design', 'small business website'] }],
      ['Corporate Website Development', 'corporate-website-development', 'Multi-page corporate websites with strong branding and content management.', { kw: ['company website', 'corporate site'] }],
      ['Professional Portfolio Website', 'professional-portfolio-website', 'A personal website to showcase your work, services and achievements.', { kw: ['portfolio', 'personal website'] }],
      ['E-commerce Website Development', 'e-commerce-website-development', 'Online stores with product catalogue, cart, payments and order management.', { popular: true, kw: ['ecommerce', 'online store', 'shopping website'] }],
      ['Landing Page Development', 'landing-page-development', 'High-conversion landing pages for campaigns, launches and lead generation.', { kw: ['landing page', 'campaign page'] }],
      ['Service-Based Website', 'service-based-website', 'Websites for service businesses with service pages and enquiry forms.', { kw: ['service website'] }],
      ['Booking / Appointment Website', 'booking-appointment-website', 'Websites that let customers book appointments or slots online.', { kw: ['appointment booking', 'booking website'] }],
      ['Real Estate Website', 'real-estate-website', 'Property listing websites with search, filters and enquiry capture.', { kw: ['property website', 'real estate'] }],
      ['Educational Website', 'educational-website', 'Websites for schools, colleges, coaching centres and course creators.', { kw: ['school website', 'coaching website', 'education'] }],
      ['Hospital / Healthcare Website', 'hospital-healthcare-website', 'Websites for hospitals, clinics and doctors with department and doctor pages.', { kw: ['clinic website', 'doctor website', 'hospital'] }],
      ['Restaurant / Food Ordering Website', 'restaurant-food-ordering-website', 'Restaurant websites with menus and online food ordering.', { kw: ['restaurant', 'food ordering', 'menu website'] }],
      ['NGO Website', 'ngo-website', 'Websites for NGOs to share their mission, projects and accept donations.', { kw: ['ngo website', 'donation website'] }],
      ['Custom Website Development', 'custom-website-development', 'Websites built to your exact requirements and integrations.', { kw: ['custom website'] }],
      ['Website Redesign', 'website-redesign', 'Modernise an outdated website with better design, speed and conversions.', { kw: ['redesign', 'revamp website'] }],
      ['Website Maintenance & Support', 'website-maintenance-support', 'Ongoing updates, backups, security patches and content changes for your website.', { kw: ['website maintenance', 'website support', 'amc'] }],
    ],
  },
  {
    category: 'website-app-development', subcategory: 'Web Applications', pillar: 'technology', group: 'webapp', lifecycle: 'build', icon: 'LayoutDashboard',
    services: [
      ['CRM Development', 'crm-development', 'A custom CRM to manage leads, customers, follow-ups and sales pipelines.', { popular: true, kw: ['crm', 'customer relationship management'] }],
      ['Lead Management System', 'lead-management-system', 'Capture, assign and track leads from every source in one system.', { kw: ['lead tracking', 'lead software'] }],
      ['Customer Management System', 'customer-management-system', 'Keep customer records, history and communication in one place.', { kw: ['customer database'] }],
      ['Employee / HR Management System', 'employee-hr-management-system', 'Manage employees, attendance, leave and HR records online.', { kw: ['hrms', 'hr software', 'attendance'] }],
      ['Inventory Management System', 'inventory-management-system', 'Track stock, purchases, sales and warehouses in real time.', { kw: ['stock management', 'inventory software'] }],
      ['Billing & Invoice Software', 'billing-invoice-software', 'Create GST-ready invoices, track payments and manage billing.', { kw: ['billing software', 'invoice software', 'pos'] }],
      ['Business Management Software', 'business-management-software', 'An all-in-one system tailored to how your business operates.', { kw: ['erp', 'business software'] }],
      ['Booking Management System', 'booking-management-system', 'Manage bookings, schedules, resources and payments.', { kw: ['booking software', 'reservation system'] }],
      ['Custom Web Application', 'custom-web-application', 'Web applications built from scratch for your unique workflow.', { kw: ['web app', 'saas', 'portal'] }],
    ],
  },
  {
    category: 'website-app-development', subcategory: 'Mobile App Development', pillar: 'technology', group: 'mobile', lifecycle: 'build', icon: 'Smartphone',
    services: [
      ['Android App Development', 'android-app-development', 'Native-quality Android apps published on Google Play.', { kw: ['android', 'play store app'] }],
      ['iOS App Development', 'ios-app-development', 'iPhone and iPad apps published on the Apple App Store.', { kw: ['ios', 'iphone app', 'app store'] }],
      ['Android & iOS App Development', 'android-ios-app-development', 'Cross-platform apps for Android and iOS from a single codebase.', { popular: true, kw: ['mobile app', 'cross platform', 'flutter', 'react native'] }],
      ['Business Mobile App', 'business-mobile-app', 'A mobile app that puts your business, catalogue and services in customers’ pockets.', { kw: ['business app'] }],
      ['E-commerce App', 'e-commerce-app', 'Shopping apps with catalogue, cart, payments and order tracking.', { kw: ['shopping app', 'ecommerce app'] }],
      ['Booking App', 'booking-app', 'Apps that let customers book services, appointments or rentals.', { kw: ['appointment app'] }],
      ['Service Provider App', 'service-provider-app', 'Apps for service partners to receive jobs, update status and get paid.', { kw: ['partner app', 'delivery app'] }],
      ['Customer App', 'customer-app', 'A dedicated app for your customers to order, track and engage.', { kw: ['customer application'] }],
      ['Custom Mobile App', 'custom-mobile-app', 'Mobile apps built around your unique idea or workflow.', { kw: ['custom app'] }],
    ],
  },
  {
    category: 'website-app-development', subcategory: 'Additional Digital Services', pillar: 'technology', group: 'digital', lifecycle: 'build', icon: 'Plug',
    services: [
      ['UI/UX Design', 'ui-ux-design', 'User research, wireframes and interface design for websites and apps.', { kw: ['ui design', 'ux design', 'figma'] }],
      ['Domain Registration', 'domain-registration', 'Register the right domain name for your brand.', { kw: ['domain name', '.com', '.in'] }],
      ['Web Hosting', 'web-hosting', 'Reliable hosting set up and managed for your website or app.', { kw: ['hosting', 'server', 'cloud hosting'] }],
      ['SSL Certificate', 'ssl-certificate', 'Install an SSL certificate so your site loads securely over HTTPS.', { kw: ['https', 'ssl'] }],
      ['Website Security', 'website-security', 'Security hardening, malware checks and protection for your website.', { kw: ['malware removal', 'website protection'] }],
      ['App Maintenance & Support', 'app-maintenance-support', 'Updates, bug fixes and OS compatibility for your mobile app.', { kw: ['app support', 'app updates'] }],
      ['API Integration', 'api-integration', 'Connect your website or app with external systems through APIs.', { kw: ['api', 'integration'] }],
      ['Payment Gateway Integration', 'payment-gateway-integration', 'Accept online payments on your website or app.', { kw: ['razorpay', 'payment gateway', 'upi'] }],
      ['WhatsApp Integration', 'whatsapp-integration', 'Connect WhatsApp to your website, CRM or app for chats and notifications.', { kw: ['whatsapp api', 'whatsapp business'] }],
      ['Third-Party API Integration', 'third-party-api-integration', 'Integrate SMS, email, shipping, maps, accounting or other third-party services.', { kw: ['sms api', 'shipping api'] }],
    ],
  },

  // ---------------- 10. Global Business Services ----------------
  {
    category: 'global-business', subcategory: 'UAE Company Formation', pillar: 'global', group: 'uae', lifecycle: 'expand', icon: 'Landmark',
    services: [
      ['UAE Company Formation', 'uae-company-formation', 'Set up your company in the UAE on the mainland, in a free zone or offshore.', { popular: true, kw: ['dubai company', 'uae business setup', 'company in dubai'] }],
      ['UAE Mainland Company Formation', 'uae-mainland-company-formation', 'Form a mainland company to trade directly across the UAE market.', { kw: ['mainland', 'dubai mainland', 'ded license'], jurisdictions: ['UAE', 'Dubai', 'Abu Dhabi', 'Ajman', 'Sharjah'] }],
      ['UAE Free Zone Company Formation', 'uae-free-zone-company-formation', 'Form a free zone company with full foreign ownership in a UAE free zone.', { kw: ['free zone', 'ifza', 'rakez', 'freezone'], jurisdictions: ['UAE', 'Dubai', 'IFZA', 'Abu Dhabi', 'RAK', 'Sharjah', 'Ajman'] }],
      ['UAE Offshore Company Formation', 'uae-offshore-company-formation', 'Form an offshore company in the UAE for holding and international business.', { kw: ['offshore', 'jafza offshore', 'rak offshore'], jurisdictions: ['UAE', 'Dubai', 'Jebel Ali', 'RAK', 'Ajman'] }],
      ['Business Setup & Activity Consultation', 'business-setup-activity-consultation', 'Choose the right business activity and jurisdiction for your UAE company.', { kw: ['activity selection', 'uae consultation'] }],
      ['Branch Office Establishment', 'branch-office-establishment', 'Open a branch of your existing company in the UAE.', { kw: ['branch office', 'uae branch'] }],
    ],
  },
  {
    category: 'global-business', subcategory: 'Trade Licenses', pillar: 'global', group: 'uaeLicence', lifecycle: 'expand', icon: 'ScrollText',
    services: [
      ['Commercial Trade License', 'commercial-trade-license', 'A UAE licence for trading activities such as import, export and general trading.', { kw: ['trading license', 'general trading'] }],
      ['Professional Trade License', 'professional-trade-license', 'A UAE licence for service providers, consultants and professionals.', { kw: ['professional license', 'consultancy license'] }],
      ['Industrial Trade License', 'industrial-trade-license', 'A UAE licence for manufacturing and industrial activities.', { kw: ['industrial license', 'manufacturing license'] }],
    ],
  },
  {
    category: 'global-business', subcategory: 'PRO & Government Services', pillar: 'global', group: 'pro', lifecycle: 'expand', icon: 'Stamp',
    services: [
      ['PRO & Government Services', 'pro-government-services', 'Government approvals, renewals and documentation handled by a PRO in the UAE.', { kw: ['pro services', 'approvals', 'renewals', 'documentation', 'attestation'] }],
    ],
  },
];

export default catalogue;
