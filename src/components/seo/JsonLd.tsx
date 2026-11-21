import { site } from "@/config/site";

/** Structured data for Google. "<" is escaped so text can never close the script tag early. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c") }}
    />
  );
}

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();

/** Who provides every service/article — matches the business schema in the layout */
export const provider = { "@type": "ProfessionalService", name: site.name, url: site.url };

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
