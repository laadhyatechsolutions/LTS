/**
 * LTS own products. The catalogue only gives one line for each, so the module lists below are
 * DRAFT, derived from the matching services in docs/01-services-catalogue.md (CRM, HRMS, billing,
 * inventory). Confirm what each product really includes, and add pricing, before launch.
 */
export type Product = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  modules: { title: string; text: string }[];
  whoFor: string[];
  price: string;
};

export const productList: Product[] = [
  {
    slug: "bizos",
    name: "LTS BizOS",
    tagline: "One software to run your entire company.",
    intro: "CRM, HR, accounts and operations in one system, so your team stops switching between Excel, WhatsApp and separate tools.",
    modules: [
      { title: "CRM", text: "Leads, follow-ups, sales pipeline and reports." },
      { title: "HR & Payroll", text: "Attendance, leave, payroll and employee self-service." },
      { title: "Accounts & Billing", text: "Invoices, GST billing and expense tracking." },
      { title: "Operations", text: "Inventory, tasks and approvals in one place." },
    ],
    whoFor: ["Growing SMEs running on Excel and WhatsApp", "Multi-branch businesses needing one view", "Owners who want reports without chasing the team"],
    price: "₹[PRICE] / month",
  },
  {
    slug: "whatsapp-crm",
    name: "WhatsApp CRM",
    tagline: "Manage leads and customers directly from WhatsApp.",
    intro: "Turn WhatsApp chats into a sales pipeline. Capture every lead, follow up on time and keep your whole team on one number.",
    modules: [
      { title: "Shared team inbox", text: "Your team replies from one WhatsApp number." },
      { title: "Lead pipeline", text: "Every chat becomes a lead with a stage and owner." },
      { title: "Follow-up reminders", text: "Never miss a callback or quote follow-up." },
      { title: "Broadcasts", text: "Send approved template messages to your customers." },
    ],
    whoFor: ["Businesses that sell through WhatsApp", "Sales teams losing leads in personal phones", "Clinics, institutes and real estate teams"],
    price: "₹[PRICE] / month",
  },
];

export const productFaqs = [
  { q: "Can I try it before buying?", a: "Yes. Book a demo and we'll walk you through the product with your own use case. [confirm free trial]" },
  { q: "Can the product be customised for us?", a: "Yes. We can add modules, change workflows and connect your existing tools." },
  { q: "Where is my data stored?", a: "[Hosting location and backup policy — confirm.]" },
  { q: "Do you provide training and support?", a: "Yes. We train your team at launch and offer support plans after." },
];
