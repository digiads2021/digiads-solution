// Detailed page content for every service, built from templates per service group,
// plus hand-written overrides for the most requested services.
//
// IMPORTANT: Government fees, statutory timelines and penalty amounts change often.
// This seed deliberately leaves them OUT (pricing.show = false, timeline.show = false).
// A DigiAds CA/CS should review each page in the admin panel, add verified fees/timelines
// and tick "Content reviewed".

const p = (...paras) => paras.map((t) => `<p>${t}</p>`).join('');
const t = (title, description) => ({ title, description });

const idDocs = (who = 'each director / partner') => ({
  title: `Identity and address proof (${who})`,
  items: ['PAN card', 'Aadhaar card, passport, voter ID or driving licence', 'Recent passport-size photograph', 'Bank statement, utility bill or mobile bill (recent) as address proof', 'Email ID and mobile number'],
});
const officeDocs = {
  title: 'Registered office proof',
  items: ['Electricity, water or gas bill of the premises (recent)', 'Rent agreement, if the premises are rented', 'No Objection Certificate (NOC) from the property owner'],
};

// ---------------------------------------------------------------- templates
const templates = {
  entity: (s) => ({
    highlights: ['Name approval and incorporation filing', 'Drafting of constitutional documents', 'Professional review before submission', 'Guidance on post-registration compliance'],
    overview: p(
      `${s.desc}`,
      `${s.name} is handled online with the Ministry of Corporate Affairs (MCA) or the relevant registrar, depending on the structure. The application needs correctly drafted documents, digital signatures and identity and address proof for the people involved. Small mistakes, such as a name that resembles an existing brand or an incomplete office proof, are the most common reasons applications are sent back.`,
      `DigiAds checks your details, prepares the documents and files the application, keeping you updated at each stage until registration is complete.`
    ),
    eligibility: ['Entrepreneurs starting a new business', 'Existing businesses that want to formalise or change their structure', 'Founders planning to raise investment or open a business bank account', 'Indian residents and, where the law allows, foreign nationals as members or partners'],
    requirements: ['A proposed business name that is unique and not similar to an existing company, LLP or trademark', 'A registered office address in India', 'Identity and address proof of all proposed directors, partners or members', 'Digital Signature Certificates for those who will sign the forms'],
    benefits: [
      t('Separate legal recognition', 'The business is recognised in its own name, which builds credibility with customers, banks and vendors.'),
      t('Easier banking', 'A registered entity can open a current account and receive payments in the business name.'),
      t('Defined ownership', 'Ownership, roles and profit sharing are recorded clearly from the start.'),
      t('Access to schemes', 'Registration is often the first step for Startup India, Udyam and other government schemes.'),
      t('Growth ready', 'A formal structure makes it easier to add partners, raise funds or take loans.'),
      t('Continuity', 'Formal entities can continue even when members change, depending on the structure.'),
    ],
    documentGroups: [idDocs(), officeDocs, { title: 'Business details', items: ['Proposed names (preferably 2–3 options)', 'Main business activities', 'Capital contribution and ownership split'] }],
    process: [
      t('Consultation and structure check', 'We confirm that this structure suits your goals, number of owners and plans.'),
      t('Name check and approval', 'We search existing companies, LLPs and trademarks and apply for name approval.'),
      t('Digital signatures', 'Digital Signature Certificates are obtained for the people who must sign.'),
      t('Document drafting', 'We draft the constitutional documents and declarations.'),
      t('Filing with the authority', 'The incorporation application is filed online with all attachments.'),
      t('Registration and handover', 'Once approved, you receive the certificate and registration documents with next-step guidance.'),
    ],
    deliverables: ['Certificate of registration / incorporation', 'Constitutional documents (as applicable to the structure)', 'PAN and TAN of the entity (where issued with registration)', 'Digital Signature Certificates', 'Post-registration compliance checklist'],
    afterService: ['Open a current bank account in the business name', 'Apply for GST registration if your turnover or business type requires it', 'Plan annual MCA/ROC compliance and income tax filing', 'Protect your brand name with trademark registration'],
    pitfalls: ['Choosing a name that is too close to an existing company or trademark', 'Using an office address without a proper NOC from the owner', 'Mismatch between names on PAN, Aadhaar and other documents', 'Not planning ownership and roles before registration'],
    faqs: [
      [`Can I register a ${s.short} online?`, 'Yes. The application is filed online. You share scanned documents, and signatures are done digitally, so you usually do not need to visit any office.'],
      ['Do I need an office to register?', 'You need an address in India that can be used as the registered office. It can be rented or owned, and in many cases a residential address is acceptable with the right proof and owner’s NOC.'],
      ['Which documents are needed?', 'Typically PAN, Aadhaar or another ID, address proof and photographs of the people involved, plus proof of the registered office. We share the exact checklist after a short consultation.'],
      ['How long does registration take?', 'It depends on name approval and the processing time at the government portal. We will give you a realistic estimate for your case after reviewing your documents.'],
      ['What happens after registration?', 'You can open a bank account and start operating. You will also need to plan for compliance such as tax registrations and annual filings, which we can help with.'],
      ['Can DigiAds help me choose the right structure?', 'Yes. Talk to an expert and we will compare the options based on your number of owners, liability, tax and fundraising plans.'],
    ],
    related: ['gst-registration', 'private-limited-company-annual-compliance', 'trademark-registration', 'udyam-msme-registration', 'business-website-development', 'business-registration-consultation'],
  }),

  ngo: (s) => ({
    highlights: ['Guidance on the right non-profit form', 'Drafting of deed, bye-laws or MoA', 'Filing and follow-up with the authority', 'Planning for 12A, 80G and CSR-1'],
    overview: p(
      `${s.desc}`,
      `Non-profit organisations are registered or approved by different authorities depending on their form and the approval sought. Each application needs clearly written objects, details of trustees, members or directors, and supporting documents. Well-drafted objects matter: they affect later approvals such as 12A/12AB, 80G and CSR eligibility.`,
      `DigiAds helps you plan the registration and approvals together, drafts the documents and handles the filing.`
    ),
    eligibility: ['Founders starting a charitable, educational, social or cultural organisation', 'Existing NGOs, trusts and societies seeking tax approvals or CSR eligibility', 'Associations and clubs formalising their activities'],
    requirements: ['Clearly defined charitable or non-profit objects', 'Minimum number of founding members, trustees or directors as required for the form', 'Registered office address with proof', 'Identity and address proof of all founders'],
    benefits: [
      t('Legal recognition', 'A registered organisation can open a bank account and enter agreements in its own name.'),
      t('Donor confidence', 'Registration and approvals show donors and partners that the organisation is properly constituted.'),
      t('Tax benefits', 'With the right approvals, income can be exempt and donors may claim deductions.'),
      t('Grant and CSR eligibility', 'Many grants and CSR programmes require registration, NGO Darpan and CSR-1.'),
      t('Clear governance', 'Roles of trustees, members or directors are defined in writing.'),
      t('Continuity', 'The organisation continues beyond changes in its founders.'),
    ],
    documentGroups: [idDocs('each founder / trustee / member'), officeDocs, { title: 'Organisation documents', items: ['Proposed name and objects', 'Draft trust deed, bye-laws or MoA/AoA (we prepare these)', 'Existing registration certificate and PAN (for approvals such as 12A, 80G, CSR-1)', 'Financial statements and activity details (for approvals, where applicable)'] }],
    process: [
      t('Consultation', 'We understand your objectives and recommend the right form or approval.'),
      t('Document checklist', 'We share the list of documents and information needed.'),
      t('Drafting', 'We draft the deed, bye-laws, MoA or application with suitable objects and clauses.'),
      t('Filing', 'The application is filed with the relevant authority or portal.'),
      t('Follow-up', 'We respond to queries or clarifications raised by the authority.'),
      t('Certificate and next steps', 'You receive the registration or approval and guidance on ongoing compliance.'),
    ],
    deliverables: ['Registration certificate or approval order (as applicable)', 'Drafted deed, bye-laws or MoA/AoA', 'Copies of filed applications', 'Compliance checklist for the year ahead'],
    afterService: ['Apply for 12A/12AB and 80G approvals', 'Register on NGO Darpan', 'File CSR-1 to receive CSR funds', 'Plan yearly audit, returns and activity reports'],
    pitfalls: ['Objects that are too vague or include commercial activities', 'Missing consent or ID documents from trustees or members', 'Delaying 12A/80G applications after registration', 'Not maintaining proper books and activity records'],
    faqs: [
      ['Which is better: trust, society or Section 8 company?', 'Each form has different governance, compliance and credibility. A Section 8 company is regulated by the MCA, while trusts and societies are registered under state laws. We help you choose based on your goals and funding plans.'],
      [`Who can apply for ${s.short}?`, 'Organisations and founders working for charitable, social, educational, religious or similar purposes, subject to the specific requirements of the registration or approval.'],
      ['Is 80G different from 12A/12AB?', 'Yes. 12A/12AB relates to the organisation’s own income tax exemption, while 80G allows donors to claim a deduction for their donations.'],
      ['Can a new NGO apply for CSR funds?', 'An organisation needs to be registered and file Form CSR-1, and CSR rules also set eligibility conditions. We review your case and guide you.'],
      ['Do NGOs need to file returns every year?', 'Yes. Depending on the form, NGOs need to maintain accounts, get audits done and file income tax and other returns every year.'],
    ],
    related: ['12a-12ab-registration', '80g-registration', 'csr-1-registration', 'ngo-darpan-registration', 'ngo-annual-compliance', 'ngo-website'],
  }),

  ngoOngoing: (s) => ({
    highlights: ['Yearly compliance support', 'Preparation of required reports', 'Review by professionals', 'Reminders before due dates'],
    overview: p(
      `${s.desc}`,
      'Registered societies and trusts must keep their registration, accounts and reporting up to date. Requirements differ by state and by the type of organisation, and donors, banks and authorities often ask for current reports before they work with you.',
      'DigiAds prepares the documents, coordinates with your auditor or provides one where needed, and files or submits them on time.'
    ),
    eligibility: ['Registered societies and trusts', 'NGOs that receive grants, donations or CSR funds', 'Organisations asked by donors or authorities for updated reports'],
    requirements: ['Existing registration certificate', 'Books of accounts and bank statements for the period', 'Details of activities, projects and beneficiaries', 'List of current members, trustees or office bearers'],
    benefits: [
      t('Stay in good standing', 'Avoid lapses that can affect your registration and approvals.'),
      t('Donor-ready records', 'Have audited accounts and reports ready when donors ask.'),
      t('Transparent governance', 'Show members and authorities how funds were used.'),
      t('Less admin work', 'We handle drafting and filing so your team can focus on programmes.'),
    ],
    documentGroups: [{ title: 'Organisation records', items: ['Registration certificate and PAN', 'Books of accounts, vouchers and bank statements', 'Minutes of meetings and resolutions', 'Details of activities, photos and beneficiary records (for activity reports)', 'List of governing body members'] }],
    process: [
      t('Review', 'We review your registration, previous filings and records.'),
      t('Data collection', 'We collect accounts, activity details and member information.'),
      t('Preparation', 'Reports, audit documents or renewal applications are prepared.'),
      t('Approval', 'You review and approve the documents.'),
      t('Submission', 'We submit or file with the relevant authority and share copies.'),
    ],
    deliverables: ['Prepared report, audit documents or renewal application', 'Acknowledgement of submission where applicable', 'Reminder calendar for the next cycle'],
    afterService: ['File income tax return of the organisation', 'Keep 12A/12AB and 80G approvals valid', 'Update NGO Darpan profile'],
    pitfalls: ['Waiting until the deadline to collect records', 'Cash transactions without proper vouchers', 'Outdated list of governing body members'],
    faqs: [
      [`Who needs ${s.short}?`, 'Registered societies and trusts whose state rules, donors or authorities require it. We confirm what applies to your organisation.'],
      ['Can you work with our existing auditor?', 'Yes. We can coordinate with your auditor or arrange professional support if you do not have one.'],
      ['What if we missed previous years?', 'Talk to us. We review what is pending and help you bring records up to date.'],
      ['Do you send reminders?', 'Yes, we share a compliance calendar so you know what is due and when.'],
    ],
    related: ['ngo-annual-compliance', '12a-12ab-registration', '80g-registration', 'ngo-darpan-registration', 'ca-consultation'],
  }),

  annual: (s) => ({
    highlights: ['Compliance calendar for the year', 'Preparation of annual forms', 'Board and member resolutions', 'Filing and acknowledgements'],
    overview: p(
      `${s.desc}`,
      'Annual compliance is required every year whether or not the business had any activity. It typically includes preparing financial statements, holding the required meetings, filing annual returns with the Registrar of Companies (ROC) and keeping statutory records and director KYC up to date. Late filing attracts additional fees, and continued non-filing can lead to the entity and its directors being treated as defaulters.',
      'DigiAds keeps track of your deadlines, prepares the forms and resolutions and files them for you.'
    ),
    eligibility: ['Every registered entity of this type, including those with no business activity during the year'],
    requirements: ['Financial statements for the year (audited where required)', 'Details of directors, partners and shareholding', 'Minutes of meetings held during the year', 'Valid Digital Signature Certificates of signatories'],
    benefits: [
      t('Avoid additional fees', 'Filing on time avoids late fees that grow every day.'),
      t('Protect directors', 'Prevents directors and partners from being marked as defaulters.'),
      t('Clean record', 'Up-to-date filings are checked by banks, investors and customers.'),
      t('Peace of mind', 'One calendar for all your MCA due dates.'),
      t('Correct records', 'Registers, minutes and resolutions maintained consistently.'),
      t('Ready for changes', 'An up-to-date record makes later changes and fundraising easier.'),
    ],
    documentGroups: [{ title: 'Financial records', items: ['Balance sheet, profit and loss account and notes', 'Auditor’s report (where audit is required)', 'Bank statements for the year'] }, { title: 'Corporate records', items: ['Certificate of incorporation, PAN and constitutional documents', 'Details of directors/partners and their DSCs', 'Shareholding or contribution details', 'Minutes and resolutions passed during the year'] }],
    process: [
      t('Compliance review', 'We check your past filings and identify what is due.'),
      t('Data collection', 'We collect financial statements and corporate details.'),
      t('Preparation', 'We prepare annual forms, resolutions and required reports.'),
      t('Review and signing', 'You review the drafts; signatories sign digitally.'),
      t('Filing', 'Forms are filed with the ROC and acknowledgements shared.'),
      t('Calendar for next year', 'We set reminders for the next cycle.'),
    ],
    deliverables: ['Filed annual forms with acknowledgements', 'Drafted resolutions and minutes', 'Director/partner KYC support', 'Compliance calendar'],
    afterService: ['File the income tax return of the entity', 'Keep GST returns up to date', 'Plan event-based filings when anything changes'],
    pitfalls: ['Assuming no filing is needed when there was no business', 'Missing director KYC, which deactivates DIN', 'Not appointing or ratifying the auditor on time', 'Mismatch between financial statements and tax returns'],
    faqs: [
      ['Is annual compliance needed if there was no business?', 'Yes. Annual filings are required every year even if the entity had no transactions.'],
      ['What happens if filings are missed?', 'Additional fees apply for late filing, and continued non-compliance can lead to penalties and directors or partners being marked as defaulters.'],
      ['Do you prepare financial statements too?', 'Yes. We can prepare accounts and coordinate the audit where required, or work with your accountant.'],
      ['Can you file pending forms for previous years?', 'Yes. We review what is pending and help you complete past filings.'],
      ['What is director KYC?', 'Directors with a DIN must complete KYC with the MCA. If it is not completed, the DIN can be deactivated until KYC is filed.'],
    ],
    related: ['company-itr-filing', 'gst-return-filing', 'din-registration-activation', 'cs-consultation', 'director-resignation-removal'],
  }),

  change: (s) => ({
    highlights: ['Review of what the change requires', 'Drafting of resolutions and documents', 'Filing of forms with the ROC', 'Updated records and certificates'],
    overview: p(
      `${s.desc}`,
      'Changes to a company or LLP must be approved internally (by the board, members or partners, as required) and reported to the Registrar within the time limits set by law. Each change has its own forms, resolutions and supporting documents, and some also require updates to PAN, GST, bank accounts and other registrations.',
      'DigiAds explains what your change requires, drafts the documents and handles the filings.'
    ),
    eligibility: ['Companies and LLPs making this change', 'Businesses closing, restructuring or converting their entity'],
    requirements: ['Approval of the board, members or partners as applicable', 'Supporting documents specific to the change', 'Valid Digital Signature Certificates of signatories', 'Up-to-date annual filings (required for several changes)'],
    benefits: [
      t('Legally valid change', 'The change is recorded correctly with the Registrar.'),
      t('Avoid late fees', 'Filing within the time limit avoids additional fees.'),
      t('Consistent records', 'Your public record matches your actual business.'),
      t('Complete follow-through', 'We remind you of related updates such as GST, PAN and bank records.'),
    ],
    documentGroups: [{ title: 'Company documents', items: ['Certificate of incorporation and constitutional documents', 'Latest shareholding / partner details', 'DSC of the signing director or partner'] }, { title: 'Change-specific documents', items: ['Resignation letter, consent or ID proof (for director changes)', 'New office proof and owner NOC (for office changes)', 'Proposed name options (for name changes)', 'Share transfer deed details (for share transfers)', 'Statement of accounts and affidavits (for strike-off)'] }],
    process: [
      t('Assessment', 'We confirm what approvals and forms your change requires.'),
      t('Documents', 'We share a checklist and collect your documents.'),
      t('Drafting', 'Notices, resolutions and forms are drafted.'),
      t('Approvals', 'Board, member or partner approvals are passed.'),
      t('Filing', 'Forms are filed with the ROC.'),
      t('Completion', 'You receive acknowledgements or approvals and a list of related updates.'),
    ],
    deliverables: ['Drafted resolutions and notices', 'Filed forms and acknowledgements', 'Updated certificate where issued', 'List of related registrations to update'],
    afterService: ['Update GST, PAN, bank and other registrations if needed', 'Keep annual compliance up to date'],
    pitfalls: ['Missing the time limit for reporting the change', 'Incomplete supporting documents', 'Forgetting to update GST, bank and other records after the change'],
    faqs: [
      [`Is there a time limit for ${s.short}?`, 'Most changes must be reported to the Registrar within a specified period after approval. Delays attract additional fees. We tell you the applicable time limit when we review your case.'],
      ['Do all directors need to sign?', 'Not always. Usually an authorised director signs the forms digitally, while approvals are passed through resolutions.'],
      ['Will my GST and bank records change automatically?', 'No. They must be updated separately. We provide a checklist of what to update.'],
      ['Can you help if annual filings are pending?', 'Yes. Some changes require filings to be up to date; we can complete pending filings first.'],
    ],
    related: ['private-limited-company-annual-compliance', 'gst-amendment', 'cs-consultation', 'llp-annual-compliance'],
  }),

  gst: (s) => ({
    highlights: ['Review of your GST position', 'Preparation from your sales and purchase data', 'Filing on the GST portal', 'Reminders before due dates'],
    overview: p(
      `${s.desc}`,
      'Goods and Services Tax (GST) applies to the supply of goods and services in India. Businesses above the turnover threshold that applies to them, and certain businesses regardless of turnover (such as inter-state suppliers of goods and many e-commerce sellers), must register and then file returns regularly. Accurate filing protects your input tax credit and avoids late fees and interest.',
      'DigiAds manages your GST work end to end so that filings are accurate and on time.'
    ),
    eligibility: ['Businesses whose turnover crosses the GST threshold that applies to their state and type of supply', 'Inter-state suppliers of goods, e-commerce sellers and others required to register by law', 'Registered taxpayers who need returns, amendments, reconciliation or cancellation'],
    requirements: ['PAN of the business or proprietor', 'Proof of principal place of business', 'Bank account details', 'Sales and purchase invoices for returns'],
    benefits: [
      t('Claim input tax credit', 'Recover GST paid on purchases against your output tax.'),
      t('Sell without limits', 'Registration lets you sell across states and on marketplaces.'),
      t('Avoid late fees and interest', 'Timely filing keeps costs and notices away.'),
      t('Credibility', 'Larger clients often work only with GST-registered vendors.'),
      t('Clean compliance rating', 'Regular filing keeps your GST profile in good standing.'),
      t('Expert handling', 'Professionals check classification, rates and data before filing.'),
    ],
    documentGroups: [idDocs('proprietor / partners / directors'), { title: 'Business documents', items: ['PAN of the business', 'Certificate of incorporation or partnership deed (if applicable)', 'Proof of place of business with owner NOC or rent agreement', 'Cancelled cheque or bank statement'] }, { title: 'For returns and reconciliation', items: ['Sales invoices / sales register', 'Purchase invoices / purchase register', 'Credit and debit notes', 'Login credentials or authorisation for the GST portal'] }],
    process: [
      t('Consultation', 'We understand your business and GST requirement.'),
      t('Document and data collection', 'We collect documents or your sales and purchase data.'),
      t('Preparation', 'Applications or returns are prepared and cross-checked.'),
      t('Your approval', 'You review a summary before submission.'),
      t('Filing', 'We file on the GST portal and share acknowledgements.'),
      t('Ongoing reminders', 'We remind you before the next due date.'),
    ],
    deliverables: ['GST registration certificate / filed return acknowledgement (as applicable)', 'Summary of tax liability and input tax credit', 'Reconciliation report (for reconciliation service)', 'Filing calendar'],
    afterService: ['Set up GST-compliant invoicing', 'File GST returns every period', 'File the GST annual return where applicable', 'Reconcile input tax credit regularly'],
    pitfalls: ['Missing return due dates, which leads to late fees and interest', 'Claiming credit not reflected in GSTR-2B', 'Wrong HSN/SAC codes or tax rates', 'Not updating registration after changes in business details'],
    faqs: [
      ['Who must register for GST?', 'Businesses whose turnover exceeds the threshold applicable to them, and certain categories such as inter-state suppliers of goods and many e-commerce sellers, must register regardless of turnover. We check your case.'],
      ['Can I register voluntarily?', 'Yes. Voluntary registration lets you claim input tax credit and work with clients who require a GSTIN, but you must then file returns regularly.'],
      ['What if I have no sales in a period?', 'You still need to file a return. A nil return can be filed for periods with no transactions.'],
      ['What happens if I file late?', 'Late fees and interest may apply, and continued non-filing can lead to notices or cancellation of registration.'],
      ['Can you file returns every month for me?', 'Yes. We can manage your GST returns on an ongoing basis with reminders and data checks.'],
    ],
    related: ['gst-return-filing', 'gst-registration', 'gst-reconciliation', 'business-itr-filing', 'billing-invoice-software', 'ca-consultation'],
  }),

  itr: (s) => ({
    highlights: ['Review of income and deductions', 'Selection of the correct ITR form', 'Preparation and e-filing', 'Help with verification and refunds'],
    overview: p(
      `${s.desc}`,
      'Income tax returns are filed online with the Income Tax Department every year. The right form depends on who is filing and the kind of income, and the return must match information already reported to the department, such as Form 26AS and the Annual Information Statement (AIS). Mismatches are a common reason for notices.',
      'DigiAds reviews your income and documents, prepares the return and files it, and helps if the department raises any query.'
    ),
    eligibility: ['Individuals, professionals, firms, LLPs and companies required to file an income tax return', 'Taxpayers who want to claim refunds or carry forward losses', 'Taxpayers who have received an income tax notice'],
    requirements: ['PAN and login access to the income tax portal (or we help create it)', 'Income details for the financial year', 'Investment and deduction proofs where applicable', 'Bank account details for refunds'],
    benefits: [
      t('Correct form, correct figures', 'Returns prepared and checked by professionals.'),
      t('Claim your refunds', 'Deductions and tax already paid are accounted for.'),
      t('Avoid notices', 'Data matched with AIS and Form 26AS before filing.'),
      t('Proof of income', 'Filed returns are used for loans, visas and tenders.'),
      t('Carry forward losses', 'Timely filing preserves eligible losses for future years.'),
      t('Help after filing', 'Support for verification, refunds and department queries.'),
    ],
    documentGroups: [{ title: 'Basic details', items: ['PAN and Aadhaar', 'Bank account details', 'Login credentials for the income tax portal'] }, { title: 'Income documents', items: ['Form 16 / salary slips (salaried)', 'Profit and loss account and balance sheet (business)', 'Capital gains statements', 'Interest certificates and rent details', 'Form 26AS / AIS'] }, { title: 'Deduction proofs', items: ['Investment proofs, insurance premiums, home loan certificates', 'Donation receipts (where eligible)'] }],
    process: [
      t('Information gathering', 'We collect your income and tax documents.'),
      t('Review', 'We match your data with Form 26AS and AIS.'),
      t('Computation', 'Tax is computed and the right form selected.'),
      t('Your approval', 'You review the computation before filing.'),
      t('E-filing and verification', 'The return is filed and verified.'),
      t('Post-filing support', 'We track processing and help with refunds or queries.'),
    ],
    deliverables: ['Tax computation', 'Filed ITR acknowledgement (ITR-V)', 'Guidance on verification and refund status', 'Draft reply and submission (for notice replies)'],
    afterService: ['Plan advance tax for the next year if applicable', 'Keep GST and TDS compliance aligned with your return', 'Book a tax consultation for planning'],
    pitfalls: ['Ignoring income shown in AIS', 'Choosing the wrong ITR form', 'Not verifying the return after filing', 'Missing the due date and losing the ability to carry forward certain losses'],
    faqs: [
      ['Which ITR form should I use?', 'It depends on who is filing and the type of income — salary, business, capital gains and so on. We select the correct form after reviewing your details.'],
      ['What if I miss the due date?', 'A belated return can usually be filed within the permitted period, but late fees and interest may apply and some benefits can be lost.'],
      ['I received a notice. What should I do?', 'Do not ignore it. Share the notice with us; we explain what it means and prepare a suitable response within the time allowed.'],
      ['Do I need to file if my income is below the taxable limit?', 'It may still be required in certain cases, and filing is useful for refunds, loans and visas. We advise based on your situation.'],
      ['Is my data safe?', 'Your documents are used only to prepare your return and are handled confidentially.'],
    ],
    related: ['tax-consultation', 'income-tax-notice-reply', 'gst-return-filing', 'ca-consultation', 'private-limited-company-annual-compliance'],
  }),

  trademark: (s) => ({
    highlights: ['Trademark search before filing', 'Correct class and description', 'Filing with the Trade Marks Registry', 'Tracking and replies until a decision'],
    overview: p(
      `${s.desc}`,
      'Trademarks in India are handled by the Trade Marks Registry. An application goes through examination, may receive an objection, is published in the Trade Marks Journal where others can oppose it, and is then registered if there is no successful opposition. Once registered, a trademark is valid for ten years and can be renewed.',
      'DigiAds searches for conflicting marks, files with the correct classes and descriptions, and supports you through objections, oppositions and rectification.'
    ),
    eligibility: ['Individuals, startups, companies, LLPs, firms, trusts and societies', 'Businesses protecting a brand name, logo or tagline', 'Applicants who have received an objection or opposition'],
    requirements: ['The brand name, logo or tagline to be protected', 'The goods or services it is used for', 'Applicant details and, if already in use, the date of first use', 'A signed authorisation for filing'],
    benefits: [
      t('Exclusive rights', 'A registered mark gives you exclusive rights to use it for the registered goods or services.'),
      t('Legal protection', 'Take action against copycats and misuse.'),
      t('Use of ™ and ®', '™ can be used after filing; ® after registration.'),
      t('A business asset', 'Trademarks can be licensed, assigned or franchised.'),
      t('Customer trust', 'A protected brand builds recognition and loyalty.'),
      t('Long validity', 'Registration lasts ten years and can be renewed.'),
    ],
    documentGroups: [{ title: 'Applicant details', items: ['Name and address of the applicant', 'PAN and ID of the individual or authorised signatory', 'Incorporation certificate or registration (for businesses)', 'Udyam/MSME or startup certificate (if available)'] }, { title: 'Mark details', items: ['Brand name and/or logo (JPG/PNG)', 'List of goods or services', 'Date of first use (if already in use) with supporting evidence', 'Signed Power of Attorney / authorisation'] }],
    process: [
      t('Trademark search', 'We check the register for identical or similar marks.'),
      t('Class selection', 'We identify the right class(es) and draft the description.'),
      t('Filing', 'The application is filed and you receive the application number.'),
      t('Examination', 'The Registry examines the application and may raise objections.'),
      t('Replies and hearings', 'We draft replies and support you at hearings if required.'),
      t('Publication and registration', 'After journal publication and the opposition period, the mark proceeds to registration.'),
    ],
    deliverables: ['Trademark search report', 'Filed application with acknowledgement', 'Drafted replies or pleadings (for objection, opposition, rectification)', 'Status updates until a decision'],
    afterService: ['Monitor the journal for similar marks', 'Renew before the ten-year validity ends', 'Use proper ™/® symbols on your branding', 'Put brand licensing or franchise agreements in writing'],
    pitfalls: ['Choosing descriptive or generic names', 'Filing in the wrong class', 'Missing reply deadlines after an objection', 'Not searching before investing in branding'],
    faqs: [
      ['Can I use ™ after filing?', 'Yes, ™ can be used once the application is filed. The ® symbol can be used only after registration.'],
      ['How long is a trademark valid?', 'A registered trademark is valid for ten years from the date of application and can be renewed for further periods of ten years.'],
      ['What is a trademark class?', 'Goods and services are grouped into 45 classes. Your application must cover the classes in which you use or plan to use the mark.'],
      ['What if my application gets an objection?', 'You can file a reply within the time allowed, explaining why the mark should be accepted. We draft the reply and represent you at a hearing if required.'],
      ['Can I register a logo and a name separately?', 'Yes. Many businesses file both a word mark and a logo (device mark) for broader protection.'],
    ],
    related: ['logo-trademark-registration', 'trademark-objection-reply', 'private-limited-company-registration', 'franchise-agreement', 'lawyer-consultation'],
  }),

  fssai: (s) => ({
    highlights: ['Identify registration or licence type', 'Application preparation and filing', 'Responding to queries', 'Renewal and compliance reminders'],
    overview: p(
      `${s.desc}`,
      'Food businesses in India must hold an FSSAI registration or licence issued under the Food Safety and Standards Act. The type — Basic registration, State licence or Central licence — depends mainly on the size and nature of the business, such as turnover, production capacity, multiple-state operations and import or export. The FSSAI number must be displayed on food packaging and premises.',
      'DigiAds identifies the right category, prepares and files the application, and keeps your licence up to date.'
    ),
    eligibility: ['Manufacturers, processors, packers and repackers of food', 'Restaurants, cloud kitchens, caterers and home-based food businesses', 'Food traders, distributors, retailers, e-commerce sellers', 'Importers and exporters of food'],
    requirements: ['Details of food products and business activities', 'Address of the premises', 'Identity and address proof of the owner or authorised person', 'Additional documents (such as layout plan and equipment list) for licences'],
    benefits: [
      t('Legal operation', 'Operate your food business in line with FSSAI requirements.'),
      t('Customer trust', 'The FSSAI number on packaging reassures customers.'),
      t('Marketplace ready', 'Food delivery and e-commerce platforms require an FSSAI number.'),
      t('Expansion ready', 'The right licence supports growth to new states or exports.'),
    ],
    comparisonTable: {
      columns: ['Type', 'Generally for', 'Issued by'],
      rows: [
        ['Basic Registration', 'Petty and small food businesses below the turnover limit for registration', 'State food safety department'],
        ['State Licence', 'Medium food businesses within one state above the basic limit', 'State food safety department'],
        ['Central Licence', 'Large businesses, importers/exporters and certain multi-state operations', 'FSSAI (central)'],
      ],
    },
    documentGroups: [idDocs('owner / partners / directors'), { title: 'Business documents', items: ['Proof of possession of premises (rent agreement, ownership proof or NOC)', 'List of food products', 'Business registration proof (if any)'] }, { title: 'Additional for State / Central licence', items: ['Layout plan of the processing unit', 'List of equipment and machinery', 'Water test report (where applicable)', 'Food safety management plan', 'IEC (for import/export)'] }],
    process: [
      t('Category check', 'We assess whether you need Basic registration, a State or Central licence.'),
      t('Documents', 'We share the checklist and collect documents.'),
      t('Application', 'The application is prepared and filed on the FSSAI portal.'),
      t('Queries and inspection', 'We help respond to queries; inspection may happen for licences.'),
      t('Registration / licence issued', 'You receive the certificate and display guidance.'),
    ],
    deliverables: ['FSSAI registration or licence certificate', 'Copy of the filed application', 'Renewal and compliance reminders'],
    afterService: ['Display the FSSAI number on packaging and premises', 'Renew before expiry', 'File annual returns where applicable', 'Protect your food brand with a trademark'],
    pitfalls: ['Applying for the wrong category', 'Letting the licence expire', 'Not updating the licence when adding products or premises'],
    faqs: [
      ['Which FSSAI registration do I need?', 'It depends on your turnover, production capacity, type of food business and whether you operate in multiple states or import/export. We confirm the right category before applying.'],
      ['Do home-based food businesses need FSSAI?', 'Yes. Home-based and small food businesses generally need at least a Basic FSSAI registration.'],
      ['Do I need a separate licence for each location?', 'Usually each premises needs its own registration or licence. Certain cases, like head offices of multi-state businesses, need a Central licence.'],
      ['How do I renew my FSSAI licence?', 'Apply for renewal before expiry. We send reminders and handle the renewal application.'],
    ],
    related: ['fssai-renewal', 'fssai-state-license', 'trademark-registration', 'restaurant-food-ordering-website', 'iso-22000-food-safety-management'],
  }),

  iec: (s) => ({
    highlights: ['DGFT application preparation', 'Correct business and bank details', 'Annual update reminders', 'Export documentation support'],
    overview: p(
      `${s.desc}`,
      'The Import Export Code (IEC) is a 10-digit code issued by the Directorate General of Foreign Trade (DGFT). It is linked to the business PAN and is required for most import and export of goods, and for availing export benefits. IEC holders must update their IEC details every year, even if nothing has changed, to keep the code active.',
      'DigiAds handles IEC applications, modifications and annual updates, and helps prepare export documents.'
    ),
    eligibility: ['Proprietors, partnerships, LLPs, companies, trusts and societies planning to import or export', 'Service exporters who want to claim export benefits', 'Existing IEC holders needing changes or the annual update'],
    requirements: ['PAN of the business or proprietor', 'Address proof of the business', 'Bank account details (cancelled cheque or bank certificate)', 'Digital signature or Aadhaar-based authentication'],
    benefits: [
      t('Trade internationally', 'Clear customs and ship goods across borders.'),
      t('Export benefits', 'IEC is needed to claim many export incentives.'),
      t('Single code', 'One IEC for your business, linked to its PAN.'),
      t('Active status', 'Annual updates keep your IEC from being deactivated.'),
    ],
    documentGroups: [{ title: 'Documents', items: ['PAN of the business / proprietor', 'Aadhaar or other ID of the proprietor / authorised signatory', 'Business address proof (rent agreement, utility bill or ownership proof)', 'Cancelled cheque or bank certificate', 'Incorporation certificate or partnership deed (for entities)'] }],
    process: [
      t('Eligibility check', 'We confirm what you need: new IEC, modification or annual update.'),
      t('Documents', 'We collect your documents and bank details.'),
      t('Application on DGFT', 'We prepare and submit the application on the DGFT portal.'),
      t('IEC issued / updated', 'You receive the IEC certificate or update confirmation.'),
      t('Export documents', 'Optionally, we help prepare documents for your first shipments.'),
    ],
    deliverables: ['IEC certificate or update confirmation', 'Guidance on annual update', 'Prepared export documents (for documentation service)'],
    afterService: ['Complete the IEC annual update every year', 'Register for GST if not already registered', 'Prepare export documentation for shipments', 'Consider UAE company formation for global trade'],
    pitfalls: ['Missing the annual update, which can deactivate the IEC', 'Bank details that do not match the business name', 'Not updating IEC after changing address or partners'],
    faqs: [
      ['Who needs an IEC?', 'Most businesses importing or exporting goods need an IEC. Service exporters need it to claim export benefits. Some categories are exempt; we confirm your case.'],
      ['Does IEC need renewal?', 'IEC does not expire, but its details must be updated online every year, even if nothing has changed.'],
      ['Can an individual get an IEC?', 'Yes, a proprietor can obtain an IEC using their PAN.'],
      ['Is GST registration required for IEC?', 'IEC is issued against PAN. GST registration depends on your business and is usually needed for regular trade.'],
    ],
    related: ['iec-annual-update', 'export-documentation', 'gst-registration', 'uae-company-formation', 'fssai-central-license'],
  }),

  startup: (s) => ({
    highlights: ['Eligibility and document review', 'Application preparation', 'Filing on the official portal', 'Certificate and next steps'],
    overview: p(
      `${s.desc}`,
      'These registrations are building blocks for running a business in India. Some unlock government schemes and benefits, some are needed before you can sign forms electronically or become a director, and some are local licences required to operate your premises. Requirements vary by state and by type of business.',
      'DigiAds checks your eligibility, prepares the application and files it for you.'
    ),
    eligibility: ['New and existing businesses, startups and professionals', 'Directors and authorised signatories (for DSC and DIN)', 'Shops, offices and commercial establishments (for local registrations and licences)'],
    requirements: ['Identity and address proof of the applicant', 'Business details and registration documents where applicable', 'Premises details for local licences'],
    benefits: [
      t('Access to benefits', 'Recognitions can make you eligible for government schemes and support.'),
      t('Legal operation', 'Local registrations let you run your premises legally.'),
      t('Digital filings', 'DSC enables secure electronic filing with government portals.'),
      t('Credibility', 'Registrations build trust with banks, customers and partners.'),
    ],
    documentGroups: [idDocs('applicant / partners / directors'), { title: 'Business documents', items: ['Incorporation certificate or registration (if any)', 'PAN of the business', 'Business address proof', 'Brief description of business activities', 'Additional documents specific to the registration (we share the exact list)'] }],
    process: [
      t('Eligibility check', 'We confirm the registration fits your business.'),
      t('Documents', 'We collect the required documents.'),
      t('Application', 'We prepare and file the application on the official portal.'),
      t('Follow-up', 'We respond to clarifications if raised.'),
      t('Certificate', 'You receive the certificate or approval.'),
    ],
    deliverables: ['Registration certificate, DSC or approval (as applicable)', 'Copy of the application', 'Guidance on renewals or related registrations'],
    afterService: ['Register for GST if required', 'Plan income tax and annual compliance', 'Protect your brand with a trademark'],
    pitfalls: ['Incorrect business activity classification', 'Mismatch in name or address across documents', 'Missing renewal dates for local licences'],
    faqs: [
      [`Who should apply for ${s.short}?`, 'Businesses or individuals who meet the eligibility requirements for this registration. We review your details and confirm before applying.'],
      ['Can this be done online?', 'Most of these registrations are applied for online. Some local licences may also need an inspection or physical verification.'],
      ['Is there any renewal?', 'Some registrations need renewal or periodic updates, while others are valid without renewal. We tell you what applies.'],
      ['What documents are needed?', 'Usually ID and address proof, business registration details and premises proof. We share an exact checklist.'],
    ],
    related: ['private-limited-company-registration', 'udyam-msme-registration', 'gst-registration', 'startup-india-dpiit-recognition', 'trademark-registration'],
  }),

  iso: (s) => ({
    highlights: ['Gap analysis against the standard', 'Documentation support', 'Internal audit preparation', 'Coordination with a certification body'],
    overview: p(
      `${s.desc}`,
      'ISO standards set out internationally recognised requirements for management systems. Certification is granted by an independent certification body after an audit confirms that your system meets the standard. Certified organisations go through surveillance audits during the certificate cycle and recertification at the end of it.',
      'DigiAds helps you understand the standard, prepare documentation and processes, and coordinate the certification audit.'
    ),
    eligibility: ['Manufacturers, service providers, IT companies, traders and institutions of any size', 'Businesses bidding for tenders or supplying large clients', 'Organisations wanting to improve processes and consistency'],
    requirements: ['Defined scope of your business activities', 'Commitment from management', 'Documented processes and records as required by the standard', 'Availability for internal and external audits'],
    benefits: [
      t('Tender and client eligibility', 'Many tenders and large clients prefer or require ISO certification.'),
      t('Better processes', 'Clear procedures reduce errors and waste.'),
      t('Customer confidence', 'Shows commitment to internationally recognised standards.'),
      t('Continuous improvement', 'Audits help you identify and fix issues regularly.'),
      t('Risk management', 'Structured approach to quality, safety, security or environmental risks.'),
      t('Global recognition', 'ISO standards are recognised across countries.'),
    ],
    documentGroups: [{ title: 'Business documents', items: ['Business registration certificate', 'Scope of activities and locations', 'Organisation chart and key responsibilities', 'Existing process documents, policies and records (if any)'] }],
    process: [
      t('Gap analysis', 'We compare your current practices with the standard.'),
      t('Documentation', 'Policies, procedures and records are prepared or improved.'),
      t('Implementation', 'Your team applies the processes in daily work.'),
      t('Internal audit', 'An internal audit and management review check readiness.'),
      t('Certification audit', 'An accredited certification body audits your system.'),
      t('Certificate and surveillance', 'You receive the certificate and plan for surveillance audits.'),
    ],
    deliverables: ['Gap analysis report', 'Documentation set as required by the standard', 'Internal audit support', 'Certification audit coordination'],
    afterService: ['Prepare for surveillance audits', 'Keep records and improvements up to date', 'Consider related standards as you grow'],
    pitfalls: ['Treating certification as paperwork only', 'Choosing a certification body that is not accredited', 'Not preparing staff for the audit'],
    faqs: [
      ['Who issues the ISO certificate?', 'An independent certification body issues the certificate after auditing your management system. ISO itself does not issue certificates.'],
      ['How long is the certificate valid?', 'ISO management system certificates are typically issued for a three-year cycle with surveillance audits during that period.'],
      ['Is ISO certification mandatory?', 'Generally it is voluntary, but customers, tenders or regulations in some sectors may require it.'],
      ['Can a small business get ISO certified?', 'Yes. The standards apply to organisations of any size.'],
    ],
    related: ['iso-9001-quality-management', 'iso-iec-27001-information-security', 'udyam-msme-registration', 'import-export-code-iec', 'compliance-consultation'],
  }),

  agreement: (s) => ({
    highlights: ['Understanding your arrangement', 'Drafting by professionals', 'Revisions until you are satisfied', 'Guidance on stamp duty and signing'],
    overview: p(
      `${s.desc}`,
      'A well-drafted agreement records what each party has agreed to and what happens if things change or go wrong. Templates downloaded online often miss clauses that matter for your situation, such as payment terms, confidentiality, ownership of work, termination and dispute resolution.',
      'DigiAds drafts the document around your actual arrangement, revises it with your feedback, and guides you on stamp duty, signing and notarisation where required.'
    ),
    eligibility: ['Businesses, startups, professionals and individuals entering this arrangement'],
    requirements: ['Names and addresses of the parties', 'Key commercial terms (amounts, duration, scope, responsibilities)', 'Any specific conditions you want included'],
    benefits: [
      t('Clarity', 'Everyone knows their rights and obligations.'),
      t('Fewer disputes', 'Clear terms reduce misunderstandings.'),
      t('Protection', 'Clauses on confidentiality, liability and termination protect your interests.'),
      t('Enforceability', 'Properly stamped and signed documents carry legal weight.'),
    ],
    documentGroups: [{ title: 'Information needed', items: ['Full names, addresses and IDs of all parties', 'Key terms: amount, payment schedule, duration, scope of work', 'Existing drafts or earlier agreements (if any)', 'Specific concerns or clauses you want'] }],
    process: [
      t('Requirement call', 'We understand the arrangement and your concerns.'),
      t('First draft', 'We prepare a draft tailored to your situation.'),
      t('Revisions', 'We revise the draft based on your feedback.'),
      t('Final document', 'You receive the final, ready-to-sign document.'),
      t('Execution guidance', 'We advise on stamp duty, signing, witnesses and notarisation.'),
    ],
    deliverables: ['Drafted agreement in editable format', 'Revisions as agreed', 'Execution and stamping guidance'],
    afterService: ['Keep signed copies safely', 'Review and renew before the term ends', 'Talk to a lawyer if a dispute arises'],
    pitfalls: ['Using generic templates without changes', 'Not paying the correct stamp duty', 'Unclear payment, termination or IP clauses'],
    faqs: [
      ['Do agreements need stamp paper?', 'Many agreements must be stamped as per the applicable state stamp law. The amount depends on the type of document and state. We guide you on this.'],
      ['Is notarisation mandatory?', 'Not always. Some documents need registration or notarisation; others are valid when properly signed and stamped. We tell you what applies.'],
      ['Can you review an agreement I already have?', 'Yes. We can review an existing draft and suggest changes.'],
      ['Can the agreement be signed digitally?', 'Many agreements can be executed electronically, but some documents require physical stamping or registration.'],
    ],
    related: ['lawyer-consultation', 'legal-notice', 'partnership-firm-registration', 'trademark-registration', 'llp-registration'],
  }),

  notice: (s) => ({
    highlights: ['Review of facts and documents', 'Drafted by a legal professional', 'Clear demands and timelines', 'Guidance on next steps'],
    overview: p(
      `${s.desc}`,
      'A legal notice or affidavit must be precise: the facts, dates, legal basis and the demand or declaration should be stated clearly. A carefully drafted document often resolves issues without going to court, and it forms the base for any later proceedings.',
      'DigiAds reviews your facts and documents and prepares the document with a legal professional.'
    ),
    eligibility: ['Individuals and businesses who need to send or reply to a notice', 'Anyone needing a sworn declaration for official purposes'],
    requirements: ['Facts of the matter with dates', 'Supporting documents (agreements, invoices, correspondence)', 'Details of the other party'],
    benefits: [
      t('Formal communication', 'Puts the other party on record about your claim or position.'),
      t('Chance to settle', 'Often prompts a response or settlement without litigation.'),
      t('Correct format', 'Drafted in proper legal language and format.'),
      t('Evidence', 'Creates a record that can be used later if needed.'),
    ],
    documentGroups: [{ title: 'Information needed', items: ['Your name, address and ID', 'Details of the other party', 'Summary of facts with dates', 'Copies of agreements, invoices, cheques or correspondence'] }],
    process: [
      t('Case review', 'We understand the facts and review documents.'),
      t('Drafting', 'A legal professional drafts the notice or affidavit.'),
      t('Your approval', 'You review and approve the draft.'),
      t('Dispatch / execution', 'The notice is sent, or the affidavit is executed and notarised.'),
    ],
    deliverables: ['Drafted notice, reply or affidavit', 'Dispatch proof (for notices sent by us)', 'Guidance on the next steps'],
    afterService: ['Book a lawyer consultation if the matter continues', 'Put future arrangements in a written agreement'],
    pitfalls: ['Missing important dates or facts', 'Using threatening or inaccurate language', 'Ignoring a notice you have received'],
    faqs: [
      ['Is a legal notice mandatory before filing a case?', 'For some matters it is required by law; for others it is optional but useful. We advise based on your case.'],
      ['How is a legal notice sent?', 'It is usually sent by registered post or courier, and often by email as well, so there is proof of delivery.'],
      ['What should I do if I receive a notice?', 'Do not ignore it. Share it with us so we can help you understand it and prepare a reply.'],
      ['Does an affidavit need notarisation?', 'Most affidavits are signed before a notary or oath commissioner and printed on stamp paper as required.'],
    ],
    related: ['lawyer-consultation', 'rent-lease-agreement', 'vendor-agreement', 'employment-agreement'],
  }),

  planning: (s) => ({
    highlights: ['Understanding your idea or project', 'Structured, professional document or advice', 'Financial view where needed', 'Clear next steps'],
    overview: p(
      `${s.desc}`,
      'A clear plan helps you take better decisions and explain your business to banks, investors, partners and government schemes. It brings together your market, offering, operations, team and finances in one place.',
      'DigiAds works with you to understand your idea, and prepares the plan, report or advice you need.'
    ),
    eligibility: ['Founders planning a new business', 'Businesses applying for loans, subsidies or investment', 'Entrepreneurs unsure which structure or registrations they need'],
    requirements: ['Description of your idea or project', 'Expected costs, funding needs and revenue assumptions (for plans and reports)', 'Your goals and timelines'],
    benefits: [
      t('Clarity', 'Turn ideas into a structured plan.'),
      t('Funding support', 'Documents that banks and investors expect.'),
      t('Fewer mistakes', 'Start with the right structure and registrations.'),
      t('Expert perspective', 'Advice from professionals who handle these matters daily.'),
    ],
    documentGroups: [{ title: 'Information needed', items: ['Business idea and products/services', 'Target customers and location', 'Estimated project cost and funding sources', 'KYC of promoters (for bank project reports)', 'Quotations for machinery or equipment (for project reports)'] }],
    process: [
      t('Discovery call', 'We understand your idea, goals and audience.'),
      t('Information gathering', 'We collect data and assumptions.'),
      t('Preparation', 'We prepare the plan, report or advice.'),
      t('Review', 'You review and we refine.'),
      t('Delivery', 'Final document or recommendations with next steps.'),
    ],
    deliverables: ['Business plan, project report or consultation summary (as applicable)', 'Financial projections where applicable', 'Recommended next steps'],
    afterService: ['Register your business', 'Apply for Startup India or Udyam', 'Build your website or app'],
    pitfalls: ['Unrealistic revenue assumptions', 'Ignoring compliance costs in planning', 'Choosing a structure that does not fit future plans'],
    faqs: [
      ['What is the difference between a business plan and a project report?', 'A business plan explains the overall business and strategy. A project report focuses on a specific project, its costs and financial viability, often for bank loans or subsidies.'],
      ['Can you help choose between company, LLP and proprietorship?', 'Yes. We compare the options based on liability, tax, compliance and funding plans.'],
      ['Will a project report guarantee a loan?', 'No. Loan approval is the lender’s decision. A clear, realistic report helps your application.'],
      ['Is the consultation online?', 'Yes, consultations can be done by phone or video call.'],
    ],
    related: ['private-limited-company-registration', 'startup-india-dpiit-recognition', 'udyam-msme-registration', 'business-website-development', 'startup-consultation'],
  }),

  consult: (s) => ({
    highlights: ['Talk to a qualified professional', 'Advice specific to your situation', 'Clear summary of next steps', 'Follow-up services if needed'],
    overview: p(
      `${s.desc}`,
      'Good advice at the right time prevents costly mistakes. Whether you have a question about tax, company law, contracts or compliance, speaking with a professional helps you understand your options and obligations.',
      'DigiAds connects you with the right professional, who reviews your situation and explains what to do next.'
    ),
    eligibility: ['Individuals, startups and businesses with specific questions', 'Anyone facing a notice, deadline or important decision'],
    requirements: ['A short description of your question', 'Relevant documents (notices, agreements, financials)'],
    benefits: [
      t('Professional guidance', 'Advice from qualified professionals.'),
      t('Save time', 'Get clear answers instead of searching online.'),
      t('Avoid mistakes', 'Understand risks before you act.'),
      t('Action plan', 'Know exactly what to do next.'),
    ],
    documentGroups: [{ title: 'Helpful to share', items: ['A summary of your question', 'Relevant notices, agreements, returns or financial statements'] }],
    process: [
      t('Tell us your question', 'Share a summary and any documents.'),
      t('Matched to a professional', 'We connect you with the right expert.'),
      t('Consultation', 'Discuss your situation by phone or video call.'),
      t('Summary and next steps', 'You receive clear next steps and, if needed, a proposal for further work.'),
    ],
    deliverables: ['Consultation session', 'Summary of advice and next steps'],
    afterService: ['Engage DigiAds for the filing or drafting work identified'],
    pitfalls: ['Waiting until a deadline is close', 'Not sharing complete documents'],
    faqs: [
      ['How does the consultation work?', 'You share your question and documents, and we schedule a call with the right professional.'],
      ['Is the consultation confidential?', 'Yes, information you share is kept confidential.'],
      ['Can you also do the work after the consultation?', 'Yes. If you need a filing, document or registration, we can take it forward.'],
      ['Is this consultation online?', 'Yes, by phone or video call.'],
    ],
    related: ['tax-consultation', 'compliance-consultation', 'lawyer-consultation', 'business-registration-consultation'],
  }),

  payroll: (s) => ({
    highlights: ['Applicability check', 'Registration on the official portal', 'Employer code and login setup', 'Guidance on monthly compliance'],
    overview: p(
      `${s.desc}`,
      'Employee benefit laws require establishments to register once they cross the employee thresholds that apply to them, and then deposit contributions and file returns every month. Registration is done online, and some establishments choose to register voluntarily below the threshold.',
      'DigiAds checks applicability, completes the registration and explains your ongoing obligations.'
    ),
    eligibility: ['Establishments that have reached the employee threshold applicable under the law', 'Employers choosing voluntary registration'],
    requirements: ['Business registration and PAN', 'Details of employees and wages', 'Bank account details', 'Digital signature of the employer / authorised signatory'],
    benefits: [
      t('Legal compliance', 'Meet your obligations as an employer.'),
      t('Employee benefits', 'Employees receive social security and health benefits.'),
      t('Attract talent', 'Statutory benefits make you a more attractive employer.'),
      t('Avoid penalties', 'Timely registration and deposits avoid interest and penalties.'),
    ],
    documentGroups: [{ title: 'Documents', items: ['Business registration certificate and PAN', 'Address proof of the establishment', 'Cancelled cheque / bank details', 'ID and address proof of the employer / directors', 'Employee list with wages and joining dates', 'DSC of the authorised signatory'] }],
    process: [
      t('Applicability check', 'We confirm whether registration is required.'),
      t('Documents', 'We collect business and employee details.'),
      t('Registration', 'Application filed on the official portal.'),
      t('Code allotted', 'You receive your employer code and login.'),
      t('Monthly compliance guidance', 'We explain contributions and returns.'),
    ],
    deliverables: ['Employer registration code / certificate', 'Portal login setup', 'Monthly compliance checklist'],
    afterService: ['Deposit contributions and file returns monthly', 'Register both PF and ESI where applicable', 'Use HR software to manage payroll'],
    pitfalls: ['Delaying registration after crossing the threshold', 'Late deposit of contributions', 'Incorrect wage details'],
    faqs: [
      [`When is ${s.short} mandatory?`, 'When your establishment reaches the employee threshold and meets other conditions set by the law. We check your case.'],
      ['Can I register voluntarily?', 'In many cases, yes. Voluntary registration lets you offer the benefits to employees earlier.'],
      ['What happens after registration?', 'You need to deduct and deposit contributions and file returns every month.'],
      ['Can you manage monthly filings?', 'Yes, we can help with ongoing compliance.'],
    ],
    related: ['pf-registration', 'esi-registration', 'employee-hr-management-system', 'employment-agreement', 'compliance-consultation'],
  }),

  website: (s) => ({
    highlights: ['Mobile-first, responsive design', 'SEO-friendly structure', 'Fast loading and secure', 'Enquiry forms and WhatsApp/call buttons'],
    overview: p(
      `${s.desc}`,
      'Your website is often the first place customers check before contacting you. A good business website loads fast, works on every phone, explains what you do in simple words, and makes it easy to call, message or send an enquiry. It should also be structured so search engines can understand and rank your pages.',
      'DigiAds plans, designs and develops your website around your goals, and supports you after launch with hosting, security and updates.'
    ),
    eligibility: ['Small businesses, startups, professionals, institutions and NGOs', 'Businesses with outdated or slow websites'],
    requirements: ['Your logo and brand colours (or we can help create them)', 'Content: services, about, contact details (we can help write it)', 'Domain name and hosting (we can provide or set up)', 'Photos or product details where relevant'],
    benefits: [
      t('Credibility', 'A professional website builds trust with customers.'),
      t('More enquiries', 'Clear calls-to-action and forms turn visitors into leads.'),
      t('Found on Google', 'SEO-friendly structure helps people find you.'),
      t('Works on every device', 'Responsive design for phones, tablets and desktops.'),
      t('Easy updates', 'Manage content without technical knowledge (where a CMS is included).'),
      t('Secure and fast', 'SSL, performance optimisation and security best practices.'),
    ],
    documentGroups: [{ title: 'What to share', items: ['Logo and brand guidelines (if any)', 'List of pages and content', 'Reference websites you like', 'Photos, product details, pricing (if to be shown)', 'Domain and hosting access (if you already have them)'] }],
    process: [
      t('Requirement discussion', 'We understand your goals, audience and features.'),
      t('Sitemap and design', 'We plan pages and create designs for approval.'),
      t('Development', 'The website is built, responsive and optimised.'),
      t('Content and testing', 'Content is added and tested across devices and browsers.'),
      t('Launch', 'We deploy on your domain with SSL and basic SEO setup.'),
      t('Support', 'Training, maintenance and updates after launch.'),
    ],
    deliverables: ['Designed and developed website', 'Responsive layouts for mobile, tablet and desktop', 'Basic on-page SEO setup', 'Contact/enquiry forms', 'Handover and training'],
    afterService: ['Website maintenance and support', 'Connect WhatsApp and payment gateway', 'Add a CRM to manage leads', 'Register your brand as a trademark'],
    pitfalls: ['Too much text and no clear call-to-action', 'Slow loading images', 'Not owning your domain in your own name', 'No plan for updates and security'],
    faqs: [
      ['How long does it take to build a website?', 'It depends on the number of pages, features and how quickly content is ready. We share a timeline after the requirement discussion.'],
      ['Will my website work on mobile?', 'Yes. Every website we build is responsive and tested on mobile devices.'],
      ['Can I update the website myself?', 'Yes, if a content management system is included. We also offer maintenance plans.'],
      ['Do you provide domain and hosting?', 'Yes, we can register your domain and set up hosting, or work with what you already have.'],
      ['Will the website be SEO-friendly?', 'Yes. We follow on-page SEO best practices like proper headings, meta tags, speed and mobile-friendliness.'],
    ],
    related: ['domain-registration', 'web-hosting', 'website-maintenance-support', 'whatsapp-integration', 'payment-gateway-integration', 'ui-ux-design'],
  }),

  webapp: (s) => ({
    highlights: ['Built around your workflow', 'Role-based access and security', 'Dashboards and reports', 'Cloud deployment and support'],
    overview: p(
      `${s.desc}`,
      'Spreadsheets and messaging apps work until the business grows. A web application brings your data and processes into one secure system that your team can access from anywhere, with the right permissions for each user and reports that show what is happening.',
      'DigiAds builds custom web applications using modern technologies, starting from your actual workflow and growing with your business.'
    ),
    eligibility: ['Growing businesses managing data in spreadsheets or paper', 'Teams needing shared access with permissions', 'Businesses with processes that off-the-shelf software does not fit'],
    requirements: ['Description of your current process', 'List of users and their roles', 'Required features and reports', 'Integrations needed (payments, SMS, WhatsApp, accounting)'],
    benefits: [
      t('One source of truth', 'All your data in one secure place.'),
      t('Automation', 'Reduce manual work and errors.'),
      t('Access anywhere', 'Use from any browser, on any device.'),
      t('Role-based security', 'Each user sees only what they should.'),
      t('Reports and insights', 'Dashboards that help you decide faster.'),
      t('Scales with you', 'Add features and users as you grow.'),
    ],
    documentGroups: [{ title: 'What to share', items: ['Current process (flowchart, spreadsheet or description)', 'User roles and permissions', 'Required features, forms and reports', 'Integration details and API access', 'Branding and design preferences'] }],
    process: [
      t('Discovery', 'We map your workflow, users and requirements.'),
      t('Scope and plan', 'We define features, milestones and timeline.'),
      t('UI/UX design', 'Screens are designed for your approval.'),
      t('Development', 'Built in milestones with regular demos.'),
      t('Testing and deployment', 'Tested thoroughly and deployed to the cloud.'),
      t('Training and support', 'Team training, maintenance and enhancements.'),
    ],
    deliverables: ['Custom web application', 'Admin dashboard and user roles', 'Deployment on cloud hosting', 'Documentation and training'],
    afterService: ['App maintenance and support', 'Add a mobile app for field teams', 'Integrate WhatsApp, payments and third-party APIs'],
    pitfalls: ['Starting without clear requirements', 'Building every feature at once instead of in phases', 'Ignoring data backup and security'],
    faqs: [
      ['Why not use ready-made software?', 'Ready-made software works for standard processes. If your workflow is unique or you need specific integrations, a custom application fits better.'],
      ['Who owns the code?', 'Ownership terms are agreed in the project contract. We discuss this upfront.'],
      ['Can it work on mobile?', 'Yes. Web applications are built to be responsive, and a mobile app can be added later.'],
      ['Do you provide hosting and maintenance?', 'Yes, we can deploy, host and maintain the application.'],
    ],
    related: ['crm-development', 'custom-web-application', 'android-ios-app-development', 'api-integration', 'whatsapp-integration'],
  }),

  mobile: (s) => ({
    highlights: ['Android and/or iOS', 'Modern, intuitive design', 'Admin panel and APIs', 'App store publishing support'],
    overview: p(
      `${s.desc}`,
      'A mobile app keeps your business one tap away from customers or your team. Successful apps are simple to use, fast, reliable and supported by a solid backend that manages data, users and notifications.',
      'DigiAds designs and develops mobile apps along with the admin panel and APIs behind them, and helps you publish on Google Play and the App Store.'
    ),
    eligibility: ['Businesses wanting to engage customers through an app', 'Startups building an app-based product', 'Companies digitising field operations'],
    requirements: ['App idea and key features', 'Target platforms (Android, iOS or both)', 'Branding assets', 'Developer accounts on Google Play / Apple (we can guide you)'],
    benefits: [
      t('Direct customer channel', 'Push notifications and in-app engagement.'),
      t('Better experience', 'Faster and more convenient than a mobile website for repeat users.'),
      t('Brand presence', 'Your brand on customers’ home screens.'),
      t('Operational efficiency', 'Apps for staff and partners streamline work.'),
      t('Integrated backend', 'Admin panel to manage content, users and orders.'),
      t('Room to grow', 'Add features in future releases.'),
    ],
    documentGroups: [{ title: 'What to share', items: ['Feature list and user flows', 'Reference apps you like', 'Logo and brand colours', 'Content and product data', 'Store developer account access (at publishing stage)'] }],
    process: [
      t('Discovery', 'We define users, features and platforms.'),
      t('Design', 'Wireframes and UI designs for approval.'),
      t('Development', 'App, admin panel and APIs built in milestones.'),
      t('Testing', 'Testing on real devices and screen sizes.'),
      t('Publishing', 'Submission to Google Play and/or App Store.'),
      t('Support', 'Updates, bug fixes and new features.'),
    ],
    deliverables: ['Mobile app (Android and/or iOS)', 'Admin panel and backend APIs', 'Store listing support', 'Documentation and handover'],
    afterService: ['App maintenance and support', 'Payment gateway and WhatsApp integration', 'Marketing website or landing page for your app'],
    pitfalls: ['Too many features in version one', 'Ignoring backend scalability', 'Not planning for OS updates and maintenance'],
    faqs: [
      ['Should I build for Android, iOS or both?', 'It depends on your audience. Cross-platform development can serve both from one codebase. We recommend based on your users and budget.'],
      ['Do you publish the app on the stores?', 'Yes, we help prepare listings and submit the app. Store approval is decided by Google and Apple.'],
      ['Will I get an admin panel?', 'Yes, most apps include an admin panel to manage content, users and orders.'],
      ['Do you maintain the app after launch?', 'Yes, we offer maintenance for updates, fixes and compatibility.'],
    ],
    related: ['android-ios-app-development', 'app-maintenance-support', 'payment-gateway-integration', 'ui-ux-design', 'custom-web-application'],
  }),

  digital: (s) => ({
    highlights: ['Set up by professionals', 'Secure configuration', 'Works with your existing site or app', 'Ongoing support available'],
    overview: p(
      `${s.desc}`,
      'Websites and apps rely on many building blocks — domains, hosting, security certificates, integrations and good design. Getting these right keeps your digital presence secure, fast and connected to the tools you use every day.',
      'DigiAds sets up and manages these services for you, whether we built your site or not.'
    ),
    eligibility: ['Businesses with an existing website or app', 'Businesses starting their digital presence'],
    requirements: ['Access to your website, hosting or app (where applicable)', 'Accounts with third-party providers (where applicable)', 'Your requirements and preferences'],
    benefits: [
      t('Done right', 'Professionally configured and tested.'),
      t('Security', 'Best practices to protect your data and customers.'),
      t('Time saved', 'We handle the technical details.'),
      t('Support', 'Help when something needs changing or fixing.'),
    ],
    documentGroups: [{ title: 'What to share', items: ['Website/app details and access', 'Third-party account details or API keys (shared securely)', 'Brand and design assets (for UI/UX)'] }],
    process: [
      t('Requirement', 'We understand what you need and your current setup.'),
      t('Plan', 'We recommend the right option and configuration.'),
      t('Setup / build', 'We implement, configure or design.'),
      t('Testing', 'Everything is tested before going live.'),
      t('Handover and support', 'Documentation and ongoing support.'),
    ],
    deliverables: ['Configured service, integration or design files', 'Documentation of the setup', 'Support as agreed'],
    afterService: ['Website maintenance and support', 'Website security monitoring'],
    pitfalls: ['Domains registered in an employee’s or agency’s name instead of the business', 'Expired SSL certificates', 'API keys exposed in public code'],
    faqs: [
      ['Can you work on a website you did not build?', 'Yes, we can work with existing websites and apps after reviewing them.'],
      ['Who owns the accounts?', 'We recommend that domains, hosting and third-party accounts are registered in your business name.'],
      ['Do you offer ongoing support?', 'Yes, support and maintenance plans are available.'],
    ],
    related: ['business-website-development', 'website-maintenance-support', 'web-hosting', 'ssl-certificate', 'api-integration'],
  }),

  uae: (s) => ({
    highlights: ['Activity and jurisdiction guidance', 'Licence application and approvals', 'Visa and office coordination', 'Support for Indian founders'],
    overview: p(
      `${s.desc}`,
      'The UAE offers three main routes for setting up a business: mainland companies licensed by the emirate’s economic department, free zone companies licensed by a free zone authority, and offshore companies used mainly for holding and international business. Each route differs in where you can trade, ownership rules for certain activities, office requirements and visa eligibility.',
      'DigiAds helps you choose the right activity and jurisdiction, prepares the documents and coordinates licensing, visas and office solutions.'
    ),
    eligibility: ['Indian and international entrepreneurs expanding to the UAE', 'Existing companies opening a UAE presence', 'Freelancers, consultants, traders and service providers'],
    requirements: ['Selected business activity', 'Chosen jurisdiction (mainland, free zone or offshore)', 'Passport copies and photographs of shareholders and managers', 'Office solution as required by the licence'],
    benefits: [
      t('Access to the UAE market', 'Trade within the UAE and the wider region.'),
      t('Ownership options', 'Free zones allow full foreign ownership; mainland rules depend on activity.'),
      t('Residence visas', 'Licences can make owners and staff eligible for visas.'),
      t('Global hub', 'Strategic location for trade with Asia, Africa and Europe.'),
      t('Banking and credibility', 'A UAE entity can open corporate bank accounts (subject to bank approval).'),
      t('One coordinator', 'Licence, visas and office handled together.'),
    ],
    comparisonTable: {
      columns: ['Route', 'Best for', 'Typical notes'],
      rows: [
        ['Mainland', 'Trading and services directly in the UAE market', 'Licensed by the emirate; office space usually required'],
        ['Free Zone', 'International trade, services, startups', 'Licensed by the free zone; flexible office options'],
        ['Offshore', 'Holding assets and international business', 'Cannot trade within the UAE; no visa eligibility in most cases'],
      ],
    },
    documentGroups: [{ title: 'Shareholders and managers', items: ['Passport copy', 'Passport-size photograph', 'UAE visa / entry stamp (if available)', 'Proof of address'] }, { title: 'For corporate shareholders / branches', items: ['Certificate of incorporation of the parent company', 'MoA/AoA of the parent company', 'Board resolution', 'Documents attested as required by UAE authorities'] }],
    process: [
      t('Consultation', 'We understand your business and recommend activity and jurisdiction.'),
      t('Name and initial approval', 'Trade name reservation and initial approval.'),
      t('Documents', 'Preparation and, where needed, attestation of documents.'),
      t('Licence issuance', 'Application filed and licence issued.'),
      t('Visas and office', 'Establishment card, visas and office solution arranged.'),
      t('Banking support', 'Guidance on opening a corporate bank account.'),
    ],
    deliverables: ['Trade licence', 'Company documents (MoA/registration certificate as applicable)', 'Coordination of visas and office solution'],
    afterService: ['Apply for investor and employee visas', 'Set up a virtual office or flexi desk', 'PRO services for approvals and renewals', 'Keep your Indian compliance up to date'],
    pitfalls: ['Choosing an activity that does not match your actual business', 'Picking a jurisdiction that restricts where you can trade', 'Not planning for licence renewal and visa costs'],
    faqs: [
      ['Can an Indian citizen own a company in the UAE?', 'Yes. Foreign nationals, including Indians, can own companies in UAE free zones and, for many activities, on the mainland.'],
      ['Mainland or free zone — which is better?', 'Mainland companies can trade directly across the UAE. Free zone companies are suited to international business and services. We recommend based on your activity and customers.'],
      ['Do I need to visit the UAE?', 'Many steps can be done remotely, but some processes, such as visa medicals and biometrics, require presence in the UAE.'],
      ['Can my UAE company sponsor visas?', 'Mainland and free zone companies can usually sponsor visas based on their licence and office. Offshore companies generally cannot.'],
      ['Which emirates and free zones do you cover?', s.jurisdictions?.length ? `We support setup in ${s.jurisdictions.join(', ')}.` : 'We cover mainland, free zone and offshore setups across major emirates. Talk to an expert for options.'],
    ],
    related: ['uae-free-zone-company-formation', 'uae-mainland-company-formation', 'investor-visa', 'virtual-office', 'pro-government-services', 'commercial-trade-license'],
  }),

  uaeLicence: (s) => ({
    highlights: ['Activity selection', 'Licence application', 'Approvals coordination', 'Renewal reminders'],
    overview: p(
      `${s.desc}`,
      'In the UAE, the licence type depends on the activity you carry out: commercial licences for trading, professional licences for services and consultancy, and industrial licences for manufacturing. The activity you choose determines where you can operate, what approvals you need and your visa options.',
      'DigiAds helps you select the right activities and coordinates the licence application and approvals.'
    ),
    eligibility: ['Entrepreneurs and companies setting up in the UAE', 'Existing UAE companies adding activities'],
    requirements: ['Business activities', 'Jurisdiction (mainland or free zone)', 'Shareholder passport copies and photographs', 'Office or premises as required'],
    benefits: [
      t('Operate legally', 'Carry out your activity with the right licence.'),
      t('Visa eligibility', 'Licences can support residence visas.'),
      t('Banking', 'A valid licence is needed for corporate banking.'),
      t('Room to expand', 'Add activities as your business grows.'),
    ],
    documentGroups: [{ title: 'Documents', items: ['Passport copies of shareholders and managers', 'Photographs', 'Activity details', 'Tenancy contract or office solution (as required)', 'Approvals from relevant authorities for regulated activities'] }],
    process: [
      t('Activity selection', 'We match your business with the correct activities.'),
      t('Name reservation and initial approval', 'Trade name and initial approval obtained.'),
      t('Office solution', 'Office or flexi desk arranged as required.'),
      t('Licence issuance', 'Application submitted and licence issued.'),
      t('Renewals', 'Reminders before annual renewal.'),
    ],
    deliverables: ['Trade licence', 'Approvals as applicable', 'Renewal reminders'],
    afterService: ['Visa applications', 'PRO services', 'Corporate bank account guidance'],
    pitfalls: ['Selecting the wrong activity group', 'Missing approvals for regulated activities', 'Late renewal'],
    faqs: [
      ['Can one licence cover multiple activities?', 'Often yes, within permitted combinations. We check which activities can be combined.'],
      ['Is the licence renewed every year?', 'UAE trade licences are generally renewed annually.'],
      ['Do I need an office?', 'Most licences require an office solution, which can range from a flexi desk to a full office depending on jurisdiction.'],
    ],
    related: ['uae-company-formation', 'pro-government-services', 'investor-visa', 'flexi-desk'],
  }),

  pro: (s) => ({
    highlights: ['Government approvals', 'Licence and visa renewals', 'Document processing and attestation', 'Single point of contact'],
    overview: p(
      `${s.desc}`,
      'Running a company in the UAE involves regular interaction with government departments — approvals, renewals, labour and immigration formalities and document processing. A PRO (Public Relations Officer) handles these on your behalf so you can focus on your business.',
      'DigiAds provides PRO support for approvals, renewals and documentation.'
    ),
    eligibility: ['UAE mainland and free zone companies', 'Entrepreneurs setting up in the UAE'],
    requirements: ['Company licence details', 'Documents relevant to the specific approval or renewal'],
    benefits: [
      t('Save time', 'No queues or repeated visits.'),
      t('Fewer errors', 'Applications prepared correctly the first time.'),
      t('Stay compliant', 'Renewals tracked before expiry.'),
      t('Single contact', 'One team for all government formalities.'),
    ],
    documentGroups: [{ title: 'Documents', items: ['Trade licence and establishment card', 'Passport and visa copies', 'Documents relevant to the approval or renewal'] }],
    process: [
      t('Requirement', 'You tell us the approval, renewal or document needed.'),
      t('Checklist', 'We share the document checklist.'),
      t('Processing', 'Our PRO submits and follows up with authorities.'),
      t('Completion', 'You receive the approval or renewed document.'),
    ],
    deliverables: ['Completed approval, renewal or processed document'],
    afterService: ['Visa services', 'Licence renewal reminders'],
    pitfalls: ['Missing renewal dates', 'Incomplete documents'],
    faqs: [
      ['What does a PRO do?', 'A PRO handles government formalities such as approvals, renewals, labour and immigration paperwork and document processing.'],
      ['Do you handle document attestation?', 'Yes, we assist with documentation and attestation requirements.'],
      ['Can you manage renewals for me?', 'Yes, we track due dates and handle renewals.'],
    ],
    related: ['uae-company-formation', 'employment-visa', 'investor-visa', 'commercial-trade-license'],
  }),

  visa: (s) => ({
    highlights: ['Eligibility check', 'Application preparation', 'Medical and biometrics coordination', 'Emirates ID guidance'],
    overview: p(
      `${s.desc}`,
      'UAE residence visas are issued based on eligibility criteria set by the authorities, such as ownership of a company, employment, family sponsorship or, for long-term visas, investment, talent or professional criteria. The process typically involves entry permit, medical fitness test, biometrics and Emirates ID.',
      'DigiAds checks eligibility, prepares the application and coordinates each step.'
    ),
    eligibility: ['Owners and investors of UAE companies', 'Employees of UAE companies', 'UAE residents sponsoring family members', 'Applicants meeting long-term visa criteria'],
    requirements: ['Passport copy (valid as required)', 'Photographs', 'Sponsor documents (licence, employment or residency as applicable)', 'Supporting documents specific to the visa type'],
    benefits: [
      t('Live and work in the UAE', 'Legal residence for you, your staff or family.'),
      t('Banking and services', 'Residence enables bank accounts, leases and utilities.'),
      t('Guided process', 'Each step coordinated for you.'),
      t('Avoid delays', 'Correct documents reduce rejections and rework.'),
    ],
    documentGroups: [{ title: 'Documents', items: ['Passport copy and photograph', 'Company licence (for investor / employment visas)', 'Proof of relationship, attested as required (family visa)', 'Salary or income proof (family visa)', 'Supporting documents for long-term visa eligibility (golden visa)'] }],
    process: [
      t('Eligibility check', 'We confirm the visa type and requirements.'),
      t('Documents', 'We collect and review documents.'),
      t('Entry permit / application', 'Application submitted to the authority.'),
      t('Medical and biometrics', 'Medical test and biometrics scheduled.'),
      t('Visa and Emirates ID', 'Residence visa stamped or issued and Emirates ID processed.'),
    ],
    deliverables: ['Residence visa (as approved by the authority)', 'Emirates ID application support'],
    afterService: ['Visa renewal reminders', 'PRO services'],
    pitfalls: ['Passport validity too short', 'Unattested documents', 'Missing medical or biometrics appointments'],
    faqs: [
      [`Who is eligible for the ${s.short}?`, 'Eligibility depends on the criteria set by UAE authorities for this visa category. We check your case before applying.'],
      ['Is approval guaranteed?', 'No. Visa decisions are made by the UAE authorities. We help you submit a complete and correct application.'],
      ['Do I need to be in the UAE?', 'Some steps, such as medical tests and biometrics, require presence in the UAE.'],
    ],
    related: ['uae-company-formation', 'golden-visa', 'pro-government-services', 'virtual-office'],
  }),

  office: (s) => ({
    highlights: ['Suitable for licence requirements', 'Flexible terms', 'Business address in the UAE', 'Coordinated with your setup'],
    overview: p(
      `${s.desc}`,
      'Most UAE licences need an office solution, and the right choice depends on your jurisdiction, activity and visa needs. Options range from virtual offices and flexi desks to serviced offices in business centres.',
      'DigiAds helps you choose an office solution that meets your licence requirements and budget.'
    ),
    eligibility: ['New UAE companies', 'Existing companies changing or upgrading their office'],
    requirements: ['Licence jurisdiction and activity', 'Number of visas planned', 'Preferred location'],
    benefits: [
      t('Meets licence needs', 'An office solution accepted for your licence.'),
      t('Cost-effective', 'Pay only for the space you need.'),
      t('Professional address', 'A UAE business address for your company.'),
      t('Scale up easily', 'Move to larger space as you grow.'),
    ],
    documentGroups: [{ title: 'Documents', items: ['Trade licence or initial approval', 'Passport copies of shareholders / manager'] }],
    process: [
      t('Requirement', 'We understand your licence, visas and location needs.'),
      t('Options', 'We share suitable options.'),
      t('Agreement', 'Office agreement / tenancy arranged.'),
      t('Licence linkage', 'Office details used for licence and visa processes.'),
    ],
    deliverables: ['Office agreement / tenancy documents', 'Business address details'],
    afterService: ['Licence and visa processing', 'PRO services'],
    pitfalls: ['Choosing an option that does not support the number of visas you need', 'Not checking whether the address is accepted for your licence'],
    faqs: [
      ['What is the difference between a virtual office and a flexi desk?', 'A virtual office provides a business address and services without a dedicated workspace. A flexi desk gives shared desk access and may meet licence requirements for some jurisdictions.'],
      ['Does an office affect visa eligibility?', 'Yes. Visa quotas can depend on office type and size. We advise you based on your plans.'],
      ['Can I upgrade later?', 'Yes, you can move to a larger office as your business grows.'],
    ],
    related: ['uae-company-formation', 'uae-free-zone-company-formation', 'investor-visa', 'pro-government-services'],
  }),
};

// ---------------------------------------------------------------- overrides
// Hand-written, more specific content for the most requested services.
const overrides = {
  'private-limited-company-registration': {
    overview: p(
      'A private limited company is the most popular structure for startups and growing businesses in India. It is a separate legal entity, so the company — not its shareholders — owns assets and is responsible for its debts. Shareholders’ liability is limited to the amount unpaid on their shares.',
      'Companies are incorporated with the Ministry of Corporate Affairs (MCA) through the SPICe+ integrated web form, which covers name reservation, incorporation, DIN for directors, PAN and TAN of the company, and certain other registrations in a single process. The company’s Memorandum of Association (MoA) and Articles of Association (AoA) are filed electronically along with the application.',
      'DigiAds helps you choose a name, obtains digital signatures, drafts the MoA and AoA, and files the incorporation application, guiding you on the compliance that follows.'
    ),
    requirements: ['Minimum two directors and two shareholders (the same persons can be both)', 'At least one director must be resident in India', 'A maximum of 200 members', 'A registered office address in India', 'No minimum paid-up capital is prescribed by law; you choose the capital that suits your plans'],
    comparisonTable: {
      columns: ['Feature', 'Private Limited', 'LLP', 'OPC'],
      rows: [
        ['Minimum owners', '2 shareholders', '2 partners', '1 member'],
        ['Liability', 'Limited', 'Limited', 'Limited'],
        ['Raising equity investment', 'Easiest', 'Limited', 'Limited'],
        ['Compliance', 'Higher', 'Moderate', 'Moderate'],
        ['Governing law', 'Companies Act, 2013', 'LLP Act, 2008', 'Companies Act, 2013'],
      ],
    },
    deliverables: ['Certificate of Incorporation with Corporate Identification Number (CIN)', 'MoA and AoA', 'PAN and TAN of the company', 'DIN for directors', 'Digital Signature Certificates', 'Post-incorporation checklist (bank account, auditor appointment, commencement of business filing)'],
    afterService: ['Open a current account in the company’s name', 'Appoint the first auditor within the time required', 'File the declaration for commencement of business (INC-20A) where applicable', 'Register for GST if required', 'Plan annual ROC compliance'],
    extraFaqs: [
      ['Is there a minimum capital requirement?', 'No minimum paid-up capital is prescribed under the Companies Act for private limited companies. You can start with a capital amount that suits your needs.'],
      ['Can a foreign national be a director?', 'Yes, foreign nationals can be directors and shareholders, but at least one director must be resident in India. Additional documents and FEMA compliance apply.'],
    ],
    related: ['gst-registration', 'private-limited-company-annual-compliance', 'trademark-registration', 'startup-india-dpiit-recognition', 'business-website-development', 'shareholders-agreement'],
  },
  'llp-registration': {
    overview: p(
      'A Limited Liability Partnership (LLP) combines the flexibility of a partnership with the protection of limited liability. The LLP is a separate legal entity, and partners are not personally liable for the LLP’s debts beyond their agreed contribution, except in cases such as fraud.',
      'LLPs are registered with the Ministry of Corporate Affairs under the LLP Act, 2008 through the FiLLiP form after name reservation. After incorporation, the LLP agreement must be filed with the Registrar within the time allowed.',
      'DigiAds handles name reservation, digital signatures, the incorporation filing and drafting of the LLP agreement.'
    ),
    requirements: ['Minimum two designated partners, at least one of whom is resident in India', 'No maximum limit on the number of partners', 'A registered office address in India', 'Agreed capital contribution of each partner'],
    afterService: ['File the LLP agreement with the Registrar within the time allowed', 'Open a current account', 'Register for GST if required', 'Plan annual filings (Form 8 and Form 11) and income tax return'],
    related: ['llp-agreement', 'llp-annual-compliance', 'gst-registration', 'llp-income-tax-return', 'trademark-registration'],
  },
  'opc-registration': {
    requirements: ['One member who is a natural person, an Indian citizen and resident in India', 'A nominee who will take over in case of the member’s death or incapacity', 'At least one director (the member can be the director)', 'A registered office address in India'],
  },
  'gst-registration': {
    overview: p(
      'GST registration gives your business a 15-digit GST Identification Number (GSTIN). With it you can legally collect GST from customers, claim input tax credit on purchases and supply across states and through e-commerce platforms.',
      'Registration is mandatory for businesses whose aggregate turnover exceeds the threshold applicable to them (thresholds differ for goods and services and for certain states), and for specified categories regardless of turnover — for example, inter-state suppliers of goods, persons required to pay tax under reverse charge, many e-commerce sellers and casual taxable persons. Others can register voluntarily.',
      'The application is made online on the GST portal, verified using Aadhaar authentication or physical verification, and the certificate is issued in Form GST REG-06 once approved. DigiAds prepares and files your application and responds to any query from the officer.'
    ),
    deliverables: ['GSTIN and GST registration certificate (REG-06)', 'GST portal login credentials', 'Guidance on invoicing and return filing'],
  },
  'trademark-registration': {
    comparisonTable: {
      columns: ['Stage', 'What happens'],
      rows: [
        ['Search', 'We check the register for identical or similar marks'],
        ['Filing (Form TM-A)', 'Application filed; ™ symbol can be used'],
        ['Examination', 'Registry examines and may issue an objection'],
        ['Publication', 'Accepted marks are advertised in the Trade Marks Journal for opposition'],
        ['Registration', 'If unopposed (or opposition fails), the mark is registered; ® can be used'],
      ],
    },
  },
  'udyam-msme-registration': {
    overview: p(
      'Udyam Registration is the official registration for Micro, Small and Medium Enterprises (MSMEs) in India, done on the government’s Udyam Registration portal. Once registered, the enterprise receives a Udyam Registration Number and an e-certificate.',
      'Enterprises are classified as micro, small or medium based on their investment in plant and machinery or equipment and their turnover, as notified by the Ministry of MSME. The registration is based on Aadhaar, and PAN and GST details are linked from government databases.',
      'Registration can make your enterprise eligible for MSME schemes and benefits, such as priority sector lending and protection against delayed payments. DigiAds helps you register correctly with the right activity codes.'
    ),
  },
  'fssai-basic-registration': {
    overview: p(
      'FSSAI Basic Registration is meant for petty and small food business operators whose annual turnover is within the limit prescribed for basic registration, including small manufacturers, retailers, home-based businesses, hawkers and temporary stall holders.',
      'Applications are made on the FSSAI online portal (FoSCoS) and the registration certificate shows a 14-digit FSSAI number, which must be displayed at the premises and on food packaging.',
      'DigiAds confirms whether basic registration is right for your business, prepares the application and handles renewals.'
    ),
  },
  'import-export-code-iec': {
    deliverables: ['10-digit IEC issued by DGFT', 'IEC certificate (e-IEC)', 'Reminder for the annual update'],
  },
  'startup-india-dpiit-recognition': {
    overview: p(
      'DPIIT recognition is the Government of India’s recognition for startups under the Startup India initiative, issued by the Department for Promotion of Industry and Internal Trade.',
      'To be recognised, an entity generally needs to be a private limited company, LLP or registered partnership firm, within the age and turnover limits set by DPIIT, and working towards innovation, development or improvement of products, processes or services, or a scalable business model with potential for employment or wealth creation.',
      'Recognised startups can access benefits such as self-certification under certain labour and environmental laws, support for intellectual property filings and eligibility to apply for certain tax exemptions. DigiAds prepares your application, including the description of your innovation.'
    ),
    eligibility: ['Private limited companies, LLPs and registered partnership firms', 'Entities within the age and turnover limits set by DPIIT', 'Businesses working on innovation or a scalable model'],
  },
};

// ---------------------------------------------------------------- builder
export function buildContent(entry, group) {
  const base = templates[group](entry);
  const o = overrides[entry.slug] || {};
  const merged = { ...base, ...o };
  const faqs = [...(o.extraFaqs || []), ...base.faqs];
  delete merged.extraFaqs;
  return { ...merged, faqs };
}
