/**
 * DRAFT legal text. This is a starting template written from what the site actually does
 * (enquiry forms, WhatsApp contact). It is NOT legal advice — have a lawyer review and complete
 * every [bracketed] item before launch. Payment gateways and Meta/WhatsApp approval check these pages.
 */
export type LegalDoc = {
  slug: "privacy-policy" | "terms" | "refund-policy";
  title: string;
  description: string;
  updated: string;
  sections: { heading: string; paragraphs?: string[]; bullets?: string[] }[];
};

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "How Laadhya Tech Solutions collects, uses and protects your personal information.",
    updated: "[Date]",
    sections: [
      { heading: "Who we are", paragraphs: ["This website is run by [Legal company name], Hyderabad, Telangana, India (\"LTS\", \"we\", \"us\"). Contact: [email address]."] },
      {
        heading: "What we collect",
        paragraphs: ["We collect only what you choose to send us through our contact and quote forms, or by WhatsApp, phone or email:"],
        bullets: ["Your name, phone number and email address", "The service you are interested in and your business type", "Your budget, timeline and any message you write"],
      },
      {
        heading: "How we use it",
        bullets: ["To reply to your enquiry and prepare a quote", "To provide and support the services you buy", "To send updates you have asked for. You can opt out at any time", "To improve our website and services"],
      },
      { heading: "Sharing", paragraphs: ["We do not sell your personal information. We share it only with service providers who help us run the business (for example hosting, email and CRM tools: [list providers]) or when the law requires it."] },
      { heading: "Cookies and analytics", paragraphs: ["[Describe cookies and analytics tools used, e.g. Google Analytics, Meta Pixel — and how visitors can opt out. Update this once tracking is added.]"] },
      { heading: "How long we keep data", paragraphs: ["[Retention period, e.g. enquiries kept for 24 months unless you become a client.]"] },
      { heading: "Security", paragraphs: ["We use reasonable technical and organisational measures to protect your information. No online service is completely secure, so we cannot guarantee absolute security."] },
      { heading: "Your rights", paragraphs: ["You may ask us to access, correct or delete your personal information, or withdraw consent, by writing to [email address]. We handle requests in line with applicable Indian law, including the Digital Personal Data Protection Act, 2023. [Lawyer to confirm.]"] },
      { heading: "Changes and contact", paragraphs: ["We may update this policy and will change the date above when we do. Questions? Write to [email address] or [office address]."] },
    ],
  },
  {
    slug: "terms",
    title: "Terms & Conditions",
    description: "The terms for using the Laadhya Tech Solutions website and services.",
    updated: "[Date]",
    sections: [
      { heading: "About these terms", paragraphs: ["By using this website or engaging [Legal company name] (\"LTS\"), you agree to these terms. If you do not agree, please do not use the site."] },
      { heading: "Our services", paragraphs: ["We provide websites, apps, custom software, AI and automation solutions and digital marketing. The scope, timeline and price of each project are set out in a written quote or agreement that you approve before work starts."] },
      { heading: "Quotes and payments", bullets: ["Quotes are valid for [0] days", "Payments follow the milestones in your agreement: [e.g. advance, design approval, launch]", "Prices are [before / including] GST", "Third-party costs (domains, hosting, ad spend, licences) are paid by the client unless the quote says otherwise"] },
      { heading: "Client responsibilities", paragraphs: ["You agree to give us the content, access and feedback we need, within the times we agree. Delays on your side may move the delivery date."] },
      { heading: "Ownership", paragraphs: ["[Once all payments are made, the final deliverables — code, design files and accounts made for you — belong to you. LTS keeps ownership of its pre-existing tools, libraries and products, including LTS BizOS and WhatsApp CRM. Lawyer to confirm.]"] },
      { heading: "Support and maintenance", paragraphs: ["[Free support period after launch and what it covers. Ongoing support is available under an AMC or Monthly Care Plan.]"] },
      { heading: "Confidentiality", paragraphs: ["Each side will keep the other's confidential business information private and use it only for the project."] },
      { heading: "Limits of liability", paragraphs: ["To the extent the law allows, LTS is not liable for indirect or consequential losses, and our total liability for a project is limited to the fees paid for it. [Lawyer to confirm.]"] },
      { heading: "Governing law", paragraphs: ["These terms are governed by the laws of India. Disputes fall under the courts at Hyderabad, Telangana. [Lawyer to confirm.]"] },
      { heading: "Contact", paragraphs: ["Questions about these terms? Write to [email address]."] },
    ],
  },
  {
    slug: "refund-policy",
    title: "Refund & Cancellation Policy",
    description: "When and how refunds and cancellations work for Laadhya Tech Solutions services.",
    updated: "[Date]",
    sections: [
      { heading: "Overview", paragraphs: ["We want you to be happy with our work. This policy explains how cancellations and refunds work. Your signed quote or agreement may add to it."] },
      { heading: "Cancelling a project", bullets: ["Before work starts: [full refund of the advance, minus any payment-gateway fees]", "After work has started: you pay for the work completed up to the date of cancellation", "After delivery or launch: [no refund, because the work has been delivered — confirm]"] },
      { heading: "Refund eligibility", paragraphs: ["[Describe when a refund is possible, e.g. we cannot deliver the agreed scope, or a deliverable repeatedly fails to meet the agreed specification after fixes.]"] },
      { heading: "What is not refundable", bullets: ["Third-party costs already paid on your behalf (domains, hosting, licences, ad spend)", "Completed milestones you have approved", "[Other non-refundable items — confirm]"] },
      { heading: "Subscriptions and monthly plans", paragraphs: ["[Monthly Care Plans and product subscriptions (LTS BizOS, WhatsApp CRM) can be cancelled with [0] days' notice. No refund for the current billing period — confirm.]"] },
      { heading: "How to request a refund", paragraphs: ["Write to [email address] with your name, project and reason. We reply within [0] working days. Approved refunds are paid to the original payment method within [0–0] working days."] },
    ],
  },
];

export const getLegal = (slug: LegalDoc["slug"]) => legalDocs.find((d) => d.slug === slug)!;
