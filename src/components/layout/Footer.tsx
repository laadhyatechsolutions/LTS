import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { companyLinks, legalLinks, site } from "@/config/site";
import { PageWhatsAppLink } from "@/components/ui/PageWhatsApp";
import { industries, serviceCategories } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Logo } from "./Logo";
import { CookieSettingsLink } from "./Analytics";
import { NewsletterForm } from "./NewsletterForm";
import { T } from "@/components/ui/T";

function FooterColumn({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 font-display text-2xl font-bold text-white">{title}</h2>
      <ul className="flex flex-col gap-2.5 text-sm">{children}</ul>
    </div>
  );
}

const linkClass = "text-gray-300 hover:text-white";

export function Footer() {
  return (
    <footer className="bg-ink pb-24 pt-16 text-gray-300 md:pb-10">
      <Container>
        <div className="mb-14 flex flex-col gap-5 rounded-card border border-white/10 bg-white/[0.04] p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex max-w-md flex-col gap-1">
            <h2 className="font-display text-[30px] font-bold leading-none text-white md:text-[36px]"><T k="news.title">Get practical growth tips</T></h2>
            <p className="text-[15px] text-gray-300"><T k="news.text">Websites, AI, automation and marketing ideas for growing businesses. Occasional emails, no spam.</T></p>
          </div>
          <div className="w-full md:max-w-md">
            <NewsletterForm />
          </div>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo light />
            <p className="max-w-xs text-sm leading-relaxed">{site.description}</p>
            <ul className="flex flex-col gap-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#BFD8A0]" aria-hidden="true" />
                {site.contact.address}
              </li>
              <li>
                <a href={site.contact.phoneHref} className={`inline-flex items-center gap-2 ${linkClass}`}>
                  <Phone className="size-4 text-[#BFD8A0]" aria-hidden="true" />
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <PageWhatsAppLink className={`inline-flex items-center gap-2 ${linkClass}`}>
                  <WhatsAppIcon className="size-4" />
                  WhatsApp us
                </PageWhatsAppLink>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className={`inline-flex items-center gap-2 ${linkClass}`}>
                  <Mail className="size-4 text-[#BFD8A0]" aria-hidden="true" />
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <FooterColumn title={<T k="footer.services">Services</T>}>
            {serviceCategories.map((c) => (
              <li key={c.slug}>
                <Link href={`/services/${c.slug}`} className={linkClass}>
                  {c.shortName}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title={<T k="footer.industries">Industries</T>}>
            {industries.map((name) => (
              <li key={name}>
                <Link href="/industries" className={linkClass}>
                  {name}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title={<T k="footer.company">Company</T>}>
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-[13px] md:flex-row md:items-center md:justify-between">
          <p>
            © {site.copyrightYear} {site.name} · Marketing partner: {site.marketingPartner}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {site.social.map((s) => (
              <a key={s.label} href={s.href} className={linkClass}>
                {s.label}
              </a>
            ))}
            <span aria-hidden="true" className="hidden text-white/30 md:inline">|</span>
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
            <CookieSettingsLink className={linkClass} />
          </div>
        </div>
      </Container>
    </footer>
  );
}
