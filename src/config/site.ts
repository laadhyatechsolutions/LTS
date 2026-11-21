/**
 * Site-wide settings. Change company details here once and they update everywhere.
 * Values in [brackets] are placeholders — replace them with real details before launch.
 */
export const site = {
  /** Short brand shown in the logo */
  brand: "LTS",
  /** Full company name — confirm: "Laadhya Tech Solutions" or "LTS Digital Solutions" */
  name: "Laadhya Tech Solutions",
  tagline: "Software · AI · Marketing — Hyderabad",
  description:
    "Websites, mobile apps, custom software, AI bots, automation and digital marketing for growing businesses — one team in Hyderabad.",
  url: "https://example.com", // [replace with your domain]

  contact: {
    phone: "+91 80190 21898",
    phoneHref: "tel:+918019021898",
    whatsappNumber: "918019021898", // country code + number, digits only
    email: "info@example.com", // [replace]
    address: "[Office address], Hyderabad, Telangana",
    hours: "Mon–Sat, 10:00 am – 7:00 pm",
    /** Used for the live "Open now" badge (India time). Days: 0 = Sunday … 6 = Saturday. Keep in step with `hours`. */
    openHours: { days: [1, 2, 3, 4, 5, 6], open: 10, close: 19 },
  },

  social: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "YouTube", href: "#" },
  ],

  marketingPartner: "Capture Media",
  copyrightYear: 2026,
} as const;

/** Builds a WhatsApp click-to-chat link with a pre-filled message */
export function whatsappLink(message = "Hi LTS, I'd like to know more about your services.") {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const mainNav = [
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Packages", href: "/packages" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Packages", href: "/packages" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Free AI audit", href: "/free-ai-audit" },
  { label: "Free checklists", href: "/checklists" },
  { label: "Cost estimator", href: "/cost-estimator" },
  { label: "Contact", href: "/contact" },
] as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
] as const;
