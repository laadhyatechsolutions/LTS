import { site } from "@/config/site";
import { hubCategories } from "@/data/services-hub";

const isPlaceholder = (v: string) => !v || v.includes("[") || v.includes("example.com") || /0000/.test(v);

/**
 * Structured data that tells Google who LTS is (name, logo, contact, area, services).
 * Placeholder values (in [brackets], example.com, 00000) are left out automatically,
 * so fill in src/config/site.ts and they'll appear here.
 */
export function BusinessSchema() {
  const { contact } = site;
  const sameAs = site.social.map((s) => s.href).filter((h) => h.startsWith("http"));
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": new URL("/#business", site.url).toString(),
    name: site.name,
    alternateName: site.brand,
    description: site.description,
    url: site.url,
    logo: new URL("/logo.png", site.url).toString(),
    image: new URL("/opengraph-image.png", site.url).toString(),
    ...(isPlaceholder(contact.phone) ? {} : { telephone: contact.phone }),
    ...(isPlaceholder(contact.email) ? {} : { email: contact.email }),
    address: {
      "@type": "PostalAddress",
      ...(isPlaceholder(contact.address) ? {} : { streetAddress: contact.address }),
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    areaServed: ["Hyderabad", "Telangana", "India"],
    openingHours: "Mo-Sa 10:00-19:00",
    ...(sameAs.length ? { sameAs } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: hubCategories.map((c) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: c.name, url: new URL(c.href, site.url).toString() },
      })),
    },
  };
  return (
    <script
      type="application/ld+json"
      // Escape "<" so text can never close the script tag early
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
