import { allIndustries } from "@/data/home";

/**
 * Industry pages (source: docs/01-services-catalogue.md §8).
 * Each industry has its own story: headline, before/after fixes, customer journey,
 * modules we can build, tools we connect and FAQs — so no two pages read the same.
 * `solutions` point at real service pages as [category slug, service name, why].
 * All wording is draft marketing copy — review before launch. No figures are claimed.
 */
export type IndustryIcon =
  | "stethoscope"
  | "graduation"
  | "building"
  | "shopping"
  | "factory"
  | "utensils"
  | "briefcase"
  | "rocket"
  | "heart"
  | "megaphone";

export type Industry = {
  slug: string;
  name: string;
  icon: IndustryIcon;
  /** Short line used on cards */
  who: string;
  /** Page headline (the industry's own promise, not a template line) */
  headline: string;
  intro: string;
  /** Alt text for the hero photo at /public/industries/{slug}.jpg */
  imageAlt: string;
  /** [the problem today, what changes with LTS] */
  painFix: [problem: string, fix: string][];
  journeyTitle: string;
  /** [stage of the customer's journey, what we add at that stage] */
  journey: [stage: string, add: string][];
  solutions: [category: string, service: string, why: string][];
  /** Features/modules we can build for this sector */
  modules: string[];
  /** Tools and platforms we commonly connect for this sector */
  worksWith: string[];
  faqs: [question: string, answer: string][];
  packageSlug: string;
};

const data: Omit<Industry, "name">[] = [
  {
    slug: "healthcare",
    icon: "stethoscope",
    who: "Hospitals, clinics, doctors, medical academies and diagnostics",
    headline: "Fewer phone calls. Fuller appointment books.",
    intro:
      "Patients want to book in seconds and get their reports on WhatsApp. We give clinics and hospitals the booking, records and reminders that make that happen — so your front desk can look after people, not phones.",
    imageAlt: "Doctor consulting a patient in a clinic",
    painFix: [
      ["Patients call again and again just to book a slot", "24/7 online booking with live doctor availability"],
      ["Reception is buried in repeat questions", "A WhatsApp assistant answers timings, fees and directions"],
      ["Records, billing and pharmacy live in different places", "One system for OPD, IPD, billing, pharmacy and lab"],
      ["A trusted clinic with only a handful of Google reviews", "Automatic review requests after every visit"],
    ],
    journeyTitle: "The patient journey, digitised",
    journey: [
      ["Finds you", "Local SEO and a fast, mobile-first clinic website"],
      ["Books", "Online slots, WhatsApp booking and instant confirmations"],
      ["Visits", "Queue tokens, digital prescriptions and quick billing"],
      ["Comes back", "Follow-up reminders, reports on WhatsApp and review requests"],
    ],
    solutions: [
      ["custom-software", "Hospital & Clinic Management", "OPD, IPD, billing, pharmacy and lab in one system."],
      ["website-development", "Booking & Appointment Systems", "Let patients book online, any time."],
      ["ai-solutions", "AI Receptionist", "Answers calls and books appointments."],
      ["digital-marketing", "Reputation Management", "More Google reviews and better replies."],
    ],
    modules: ["Doctor-wise slot booking", "OPD queue & tokens", "E-prescriptions", "Lab reports on WhatsApp", "Pharmacy & stock", "Patient history", "Billing & insurance desk", "Follow-up reminders"],
    worksWith: ["WhatsApp Business API", "Google Business Profile", "Razorpay", "Tally", "Google Calendar"],
    faqs: [
      ["Is patient data kept private?", "Yes. Access is role-based, data is encrypted in transit, and we host on secure cloud servers. We'll walk you through exactly who can see what before launch."],
      ["Can we start with just online booking?", "Absolutely. Most clinics start with a website and booking, then add WhatsApp reminders or a full clinic system later — nothing has to be rebuilt."],
      ["Will it work for more than one branch or doctor?", "Yes — each doctor and branch gets its own timings and slots, with one dashboard for the owner."],
    ],
    packageSlug: "clinic-doctor-digital-pack",
  },
  {
    slug: "education",
    icon: "graduation",
    who: "Schools, colleges, coaching centres and e-learning providers",
    headline: "From first enquiry to final exam — all in one place.",
    intro:
      "Admissions season shouldn't mean lost enquiries and late replies. We build the admissions CRM, learning platform and parent updates that let your team focus on teaching.",
    imageAlt: "Students learning together in a classroom",
    painFix: [
      ["Admission enquiries get lost or answered late", "Every enquiry lands in a CRM with an instant WhatsApp reply"],
      ["Fees, attendance and exams tracked by hand", "One portal for fees, attendance, timetables and results"],
      ["No way to teach or test online", "An LMS with video lessons, quizzes and certificates"],
      ["Parents keep calling for updates", "Automatic SMS/WhatsApp updates for fees, marks and events"],
    ],
    journeyTitle: "The student journey, digitised",
    journey: [
      ["Enquires", "Ads and SEO that bring the right students, captured in a CRM"],
      ["Enrols", "Online forms, document upload and fee payment"],
      ["Learns", "Classes, assignments and tests on any phone"],
      ["Succeeds", "Results, certificates and alumni updates — and referrals"],
    ],
    solutions: [
      ["custom-software", "LMS", "Courses, video lessons, quizzes and certificates."],
      ["custom-software", "CRM", "Track every admission enquiry to enrolment."],
      ["mobile-app-development", "E-learning Apps", "Classes and tests on students' phones."],
      ["automation", "Follow-up & Reminder Flows", "Fee and event reminders without manual work."],
    ],
    modules: ["Admissions CRM", "Online applications", "Fee collection & receipts", "Attendance", "Timetables", "Online tests & results", "Video lessons", "Parent app & notices"],
    worksWith: ["WhatsApp Business API", "Razorpay", "Zoom / Google Meet", "Google Workspace", "Tally"],
    faqs: [
      ["Can students use it on low-cost phones?", "Yes. We design for budget Android phones and patchy internet first, with lightweight pages and downloadable material."],
      ["Can we sell courses online?", "Yes — paid courses, batches and test series with online payment, access control and certificates."],
      ["We already use spreadsheets. Can you move our data?", "We import your existing student, fee and course data so you start with everything in place."],
    ],
    packageSlug: "institute-digital-pack",
  },
  {
    slug: "real-estate-coworking",
    icon: "building",
    who: "Builders, brokers and office-space aggregators",
    headline: "Turn every portal lead into a site visit.",
    intro:
      "Property buyers decide fast and expect answers on WhatsApp. We connect your ads and portals to one CRM, reply in seconds and keep every site visit and unit on track.",
    imageAlt: "Modern apartment buildings against the sky",
    painFix: [
      ["Leads from ads and portals go cold within hours", "Leads auto-flow into your CRM with an instant WhatsApp reply"],
      ["Site visits and bookings are hard to track", "A visual pipeline from enquiry to visit to booking"],
      ["Buyers want answers at 11 pm", "A WhatsApp assistant shares brochures, prices and books visits 24/7"],
      ["Unit and inventory details are scattered", "Live inventory with availability, pricing and holds"],
    ],
    journeyTitle: "The buyer journey, digitised",
    journey: [
      ["Discovers", "Project microsites and lead-generation campaigns"],
      ["Enquires", "Instant replies, brochures and floor plans on WhatsApp"],
      ["Visits", "Visit scheduling, reminders and sales-team assignment"],
      ["Books", "Booking forms, payment schedules and document tracking"],
    ],
    solutions: [
      ["automation", "Lead Automation", "Portal and ad leads into your CRM with an instant reply."],
      ["custom-software", "CRM", "Pipeline, site visits and follow-ups in one place."],
      ["ai-solutions", "WhatsApp AI Chatbots", "Answer project questions and book visits 24/7."],
      ["digital-marketing", "Meta Ads", "Lead generation campaigns for your projects."],
    ],
    modules: ["Project microsites", "Lead capture from portals", "Sales pipeline", "Site-visit scheduler", "Unit inventory & holds", "Payment schedules", "Broker/channel partner portal", "Desk & cabin booking (coworking)"],
    worksWith: ["Meta Lead Ads", "Google Ads", "99acres / MagicBricks / Housing.com leads", "WhatsApp Business API", "Google Sheets"],
    faqs: [
      ["Can you pull leads from property portals?", "Yes — wherever a portal offers email, webhook or export access, we route those leads straight into your CRM and alert your sales team."],
      ["Do you build for coworking spaces too?", "Yes: desk and cabin booking, member management, invoicing and visitor passes."],
      ["Can different sales people see only their own leads?", "Yes. Roles and permissions let managers see everything while each executive sees their own pipeline."],
    ],
    packageSlug: "business-growth-pack",
  },
  {
    slug: "retail-ecommerce",
    icon: "shopping",
    who: "Stores, D2C brands, jewellery and fashion",
    headline: "Sell everywhere your customers scroll.",
    intro:
      "Your customers shop on Instagram, WhatsApp and Google before they ever walk in. We build the online store, connect payments and shipping, and bring buyers back again and again.",
    imageAlt: "Shopper holding bags outside a fashion store",
    painFix: [
      ["Selling only in-store or by Instagram DM", "A fast online store with cart, UPI and card payments"],
      ["Orders and stock managed by hand", "One dashboard for orders, stock and returns across channels"],
      ["Abandoned carts and few repeat buyers", "Automatic cart, offer and re-order reminders on WhatsApp"],
      ["Shipping and courier hassles", "Courier integration with auto labels and tracking updates"],
    ],
    journeyTitle: "The shopper journey, digitised",
    journey: [
      ["Browses", "Product pages that load fast and look great on phones"],
      ["Buys", "One-tap UPI, cards and COD with GST invoices"],
      ["Receives", "Auto courier booking and tracking on WhatsApp"],
      ["Returns for more", "Loyalty offers, reviews and win-back campaigns"],
    ],
    solutions: [
      ["website-development", "E-commerce Stores", "Cart, payments and order management."],
      ["automation", "API & Payment Integrations", "Razorpay, couriers and accounting tools connected."],
      ["digital-marketing", "Email & WhatsApp Marketing", "Offers and reminders that bring customers back."],
      ["digital-marketing", "Meta Ads", "Sales campaigns on Facebook and Instagram."],
    ],
    modules: ["Online store", "Product variants & sizes", "UPI / card / COD checkout", "Coupons & offers", "Inventory sync", "Courier labels & tracking", "Abandoned-cart recovery", "Loyalty & reviews"],
    worksWith: ["Razorpay", "Shiprocket", "Instagram & Facebook Shop", "Google Merchant Center", "Tally"],
    faqs: [
      ["Shopify or a custom store?", "Shopify is great to start quickly; a custom store suits complex catalogues, B2B pricing or special workflows. We'll recommend honestly based on your products and budget."],
      ["Can my in-store and online stock stay in sync?", "Yes — we connect your billing/POS or inventory sheet so stock updates in both places."],
      ["Do you handle product photos and listings?", "Through our marketing partner we can shoot products, write listings and run launch campaigns."],
    ],
    packageSlug: "ecommerce-starter-pack",
  },
  {
    slug: "manufacturing-trading",
    icon: "factory",
    who: "Exporters, distributors, manufacturers and wholesalers",
    headline: "From Excel sheets to a factory you can see on one screen.",
    intro:
      "When orders, stock and dispatch live in spreadsheets, nobody sees the full picture. We build ERP and automation that show you purchase, production, stock and payments in real time.",
    imageAlt: "Workers in a modern manufacturing facility",
    painFix: [
      ["Orders and stock tracked in Excel", "Real-time inventory across godowns and branches"],
      ["Quotes to buyers take days", "Quotations generated in minutes from price lists"],
      ["No view of production or dispatch", "Work orders, production stages and dispatch tracking"],
      ["Invoices and payment reminders done by hand", "GST invoicing with automatic payment follow-ups"],
    ],
    journeyTitle: "The order journey, digitised",
    journey: [
      ["Enquiry", "B2B catalogue and fast quotations"],
      ["Order", "Sales orders that reserve stock automatically"],
      ["Production & dispatch", "Work orders, quality checks and e-way bill details"],
      ["Payment", "Invoices, ledgers and reminders until it's collected"],
    ],
    solutions: [
      ["custom-software", "ERP Solutions", "Purchase, sales, inventory and accounts together."],
      ["custom-software", "Billing, Invoicing & GST", "Accounting-ready billing."],
      ["automation", "Automated Reports", "Daily MIS to email or WhatsApp."],
      ["automation", "Follow-up & Reminder Flows", "Quote and payment follow-ups on autopilot."],
    ],
    modules: ["Purchase & vendors", "Sales orders & quotations", "Multi-godown inventory", "Production / work orders", "Dispatch & e-way bill details", "GST invoicing", "Receivables & reminders", "Daily MIS dashboard"],
    worksWith: ["Tally", "Zoho Books", "WhatsApp Business API", "Google Sheets", "Barcode / QR scanners"],
    faqs: [
      ["Do we have to stop using Tally?", "No. We can keep Tally for accounts and sync invoices and ledgers from the new system, so your accountant works as before."],
      ["Can it work on the shop floor?", "Yes — simple mobile screens and barcode/QR scanning for stock entry, issue and dispatch."],
      ["How long does an ERP take?", "We roll out in phases — usually inventory and sales first — so you see value within weeks, not months."],
    ],
    packageSlug: "business-growth-pack",
  },
  {
    slug: "restaurants-hospitality",
    icon: "utensils",
    who: "Hotels, cafes and cloud kitchens",
    headline: "More direct orders. More regulars. Fewer commissions.",
    intro:
      "Great food deserves full tables and repeat guests. We help restaurants, cafes and hotels take direct orders and bookings, shine on Google and keep guests coming back.",
    imageAlt: "Chef plating food in a busy restaurant kitchen",
    painFix: [
      ["Orders and bookings scattered across calls and DMs", "One place for table bookings and direct online orders"],
      ["Hard to bring guests back", "Birthday offers, loyalty points and WhatsApp campaigns"],
      ["Reviews decide who walks in", "Review requests and quick, professional replies"],
      ["Staff juggle too many tools", "Orders, menu and stock connected to one dashboard"],
    ],
    journeyTitle: "The guest journey, digitised",
    journey: [
      ["Discovers", "“Near me” search, mouth-watering reels and an updated menu"],
      ["Orders or books", "Direct ordering and table booking — no commission"],
      ["Enjoys", "QR menus, quick billing and feedback at the table"],
      ["Returns", "Loyalty, offers and reminders that bring them back"],
    ],
    solutions: [
      ["mobile-app-development", "Delivery & On-demand Apps", "Order and delivery apps for food businesses."],
      ["ai-solutions", "WhatsApp AI Chatbots", "Take bookings and orders on WhatsApp."],
      ["digital-marketing", "Social Media Management", "Food photos, reels and posts that fill tables."],
      ["digital-marketing", "SEO & Local SEO", "Show up for “near me” searches."],
    ],
    modules: ["Direct online ordering", "Table & room booking", "QR menu", "Kitchen order display", "Loyalty & offers", "Guest feedback", "Banquet & event enquiries", "Multi-outlet dashboard"],
    worksWith: ["Swiggy / Zomato order reports", "Razorpay", "WhatsApp Business API", "Google Business Profile", "POS systems"],
    faqs: [
      ["Will direct ordering replace delivery apps?", "Not overnight — most outlets keep the apps for discovery and use direct ordering for regulars, which saves commission on repeat orders."],
      ["Can hotels take room bookings on the website?", "Yes: room types, availability, payment and booking confirmations, plus enquiry forms for banquets and events."],
      ["Do you create the food content?", "Yes, with our marketing partner — menu shoots, reels and posts on a monthly plan."],
    ],
    packageSlug: "business-growth-pack",
  },
  {
    slug: "professional-services",
    icon: "briefcase",
    who: "CAs, lawyers, consultants and agencies",
    headline: "Look as expert online as you are in the room.",
    intro:
      "Clients check you online before they ever call. We build credible websites, client portals and automations that win trust and take the paperwork off your desk.",
    imageAlt: "Professionals reviewing documents in a meeting",
    painFix: [
      ["New clients come only by referral", "A credible website and local SEO that bring enquiries"],
      ["Client documents scattered across email and WhatsApp", "A secure client portal for documents and requests"],
      ["Hours lost on repetitive paperwork", "AI that reads forms, bills and IDs into your systems"],
      ["Missed due dates and follow-ups", "Automatic reminders for filings, renewals and meetings"],
    ],
    journeyTitle: "The client journey, digitised",
    journey: [
      ["Researches you", "A website with services, credentials and insights"],
      ["Books a consult", "Online scheduling and intake forms"],
      ["Works with you", "Client portal, document requests and status updates"],
      ["Renews", "Due-date reminders and recurring billing"],
    ],
    solutions: [
      ["website-development", "Business Websites", "A professional site that builds trust."],
      ["ai-solutions", "AI Document Processing", "Extract data from forms, bills and IDs."],
      ["automation", "Follow-up & Reminder Flows", "Due-date and appointment reminders."],
      ["digital-marketing", "SEO & Local SEO", "Be found when clients search."],
    ],
    modules: ["Practice website", "Consult booking", "Client intake forms", "Secure document portal", "Task & due-date tracker", "AI document reading", "Invoicing & retainers", "Knowledge articles / blog"],
    worksWith: ["Google Workspace", "Microsoft 365", "Zoho", "Razorpay", "Calendly / Google Calendar"],
    faqs: [
      ["Are client documents stored securely?", "Yes — access-controlled storage, encrypted connections and activity logs. You decide who sees which client's files."],
      ["Can you follow our professional advertising rules?", "Yes. We write and design within the guidelines of your professional body — informative, not promotional, where required."],
      ["We're a small firm. Is this overkill?", "Start with a sharp website and booking; add the portal and automations as you grow."],
    ],
    packageSlug: "startup-launch-kit",
  },
  {
    slug: "startups-smes",
    icon: "rocket",
    who: "Founders and growing small and mid-sized companies",
    headline: "Your tech team, from day one.",
    intro:
      "No CTO yet? No problem. We help founders turn ideas into products real users can try — and help growing companies connect their tools and put AI to work where it pays off.",
    imageAlt: "Startup team collaborating around laptops",
    painFix: [
      ["No tech co-founder or in-house team", "A full product team — design, build, launch and support"],
      ["Need an MVP fast, on a tight budget", "A focused MVP scoped to what users need first"],
      ["Tools that don't talk to each other", "CRM, payments, sheets and email connected end to end"],
      ["Unsure where to start with AI", "An AI audit that shows where it saves the most time"],
    ],
    journeyTitle: "The product journey, de-risked",
    journey: [
      ["Idea", "Workshops to shape scope, users and must-have features"],
      ["MVP", "Clickable prototype, then a working product in short sprints"],
      ["Launch", "Hosting, analytics, payments and app-store release"],
      ["Scale", "New features, automation and a dedicated team on demand"],
    ],
    solutions: [
      ["custom-software", "SaaS & MVP Development", "From idea to a product real users can try."],
      ["more-services", "IT Consulting & CTO-as-a-Service", "A tech partner for founders."],
      ["automation", "Zapier / Make / n8n Setup", "Connect your tools without code."],
      ["ai-solutions", "AI Consulting & Audit", "Find where AI saves the most."],
    ],
    modules: ["Product discovery workshop", "UI/UX prototype", "Web & mobile MVP", "Subscriptions & billing", "Admin dashboard", "Analytics & events", "Tool integrations", "AI features"],
    worksWith: ["Stripe / Razorpay", "Firebase / Supabase", "HubSpot / Zoho CRM", "Slack", "OpenAI / Claude APIs"],
    faqs: [
      ["Who owns the code?", "You do. The code, designs and accounts are yours from day one, in your own repositories."],
      ["Can you help us raise funding?", "We don't raise funds, but we help with a working product, a clear tech roadmap and investor-ready demos."],
      ["Can we hire your developers monthly?", "Yes — dedicated developers or a CTO-as-a-service plan, scaled up or down as you need."],
    ],
    packageSlug: "startup-launch-kit",
  },
  {
    slug: "ngos-associations",
    icon: "heart",
    who: "NGOs, associations, societies and clubs",
    headline: "More time for your cause, less for admin.",
    intro:
      "Every rupee and every volunteer hour counts. We give NGOs and associations simple tools for members, donors and events — affordable to run and easy for anyone to use.",
    imageAlt: "Volunteers working together at a community event",
    painFix: [
      ["Member records kept on paper or Excel", "One member database with renewals and dues"],
      ["Hard to reach members and donors", "WhatsApp and email updates to the right groups"],
      ["Small budget and no IT staff", "Low-cost hosting with a monthly care plan"],
      ["Events organised by hand", "Online registrations, passes and attendance"],
    ],
    journeyTitle: "The member & donor journey, digitised",
    journey: [
      ["Discovers your cause", "A clear website with your story and impact"],
      ["Joins or donates", "Online membership and donation forms with receipts"],
      ["Takes part", "Event registrations, volunteer sign-ups and updates"],
      ["Stays involved", "Newsletters, renewal reminders and impact reports"],
    ],
    solutions: [
      ["website-development", "Business Websites", "A clear site for your cause."],
      ["mobile-app-development", "Android & iOS Apps", "A members' app for updates and events."],
      ["digital-marketing", "Email & WhatsApp Marketing", "Reach members and supporters directly."],
      ["more-services", "Dedicated Developers", "Ongoing help on a monthly plan."],
    ],
    modules: ["Member directory", "Dues & renewals", "Online donations & receipts", "Event registration & passes", "Volunteer sign-ups", "Committee notices", "Photo gallery & news", "Impact reports"],
    worksWith: ["Razorpay", "WhatsApp Business API", "Google Workspace", "Mailchimp / Brevo", "Google Sheets"],
    faqs: [
      ["Can donors get receipts automatically?", "Yes — a receipt is emailed after each online donation, using the details and format your organisation provides."],
      ["Do you offer NGO pricing?", "We keep NGO projects lean and can phase work to fit your budget. Ask us for options."],
      ["Can our committee update the site themselves?", "Yes, with an easy editor and a short training session — no coding needed."],
    ],
    packageSlug: "monthly-care-plan",
  },
  {
    slug: "politics-public-figures",
    icon: "megaphone",
    who: "Candidates, parties and public figures",
    headline: "Reach every ward with one clear voice.",
    intro:
      "Campaigns move fast and every message counts. We give candidates and public figures the website, WhatsApp outreach and social presence to stay consistent and close to people.",
    imageAlt: "Crowd gathered at a public rally",
    painFix: [
      ["Reaching voters across many areas", "Area-wise WhatsApp groups and targeted campaigns"],
      ["Messages drift as they pass through teams", "Approved templates and one content calendar"],
      ["Social media needs constant attention", "Daily posts, reels and replies by a dedicated team"],
      ["Volunteers coordinate on scattered chats", "A volunteer app for tasks, events and reports"],
    ],
    journeyTitle: "The campaign journey, organised",
    journey: [
      ["Awareness", "Candidate website, manifesto and social presence"],
      ["Connection", "WhatsApp outreach and grievance/feedback forms"],
      ["Mobilisation", "Volunteer coordination and event management"],
      ["Trust", "Regular updates on work done, before and after the vote"],
    ],
    solutions: [
      ["digital-marketing", "Political Campaign Marketing", "Website, WhatsApp outreach, social and ads."],
      ["automation", "WhatsApp Broadcast Campaigns", "Approved templates and bulk messaging."],
      ["digital-marketing", "Social Media Management", "Daily posts, reels and replies."],
      ["digital-marketing", "Meta Ads", "Targeted awareness campaigns."],
    ],
    modules: ["Candidate website", "Manifesto & promises tracker", "Grievance & feedback forms", "Volunteer app", "Area-wise contact lists", "Event & rally manager", "WhatsApp broadcasts", "Daily social content"],
    worksWith: ["WhatsApp Business API", "Meta Ads", "YouTube", "Google Forms / Sheets", "SMS gateways"],
    faqs: [
      ["Do you follow election-period rules?", "Yes. We work within platform policies and applicable election guidelines, and keep records of ad spend and approved content for your team."],
      ["Is bulk WhatsApp messaging allowed?", "Only with opted-in contacts and approved templates through the official WhatsApp Business API — that's how we run it."],
      ["Can you support us after the election?", "Yes — many leaders keep a monthly plan for updates on work done and constituency communication."],
    ],
    packageSlug: "election-campaign-pack",
  },
];

export const industries: Industry[] = data.map((d, i) => ({ ...d, name: allIndustries[i] }));
export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
