import { Mail, Phone } from "lucide-react";
import { site } from "@/config/site";
import { PageWhatsAppLink } from "@/components/ui/PageWhatsApp";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { T } from "@/components/ui/T";

export function TopBar() {
  return (
    <div className="bg-ink text-[13px] text-[#BFD8A0]">
      <Container className="flex min-h-10 flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2 md:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <a href={site.contact.phoneHref} className="inline-flex items-center gap-1.5 hover:text-white">
            <Phone className="size-3.5 text-white" aria-hidden="true" />
            {site.contact.phone}
          </a>
          <a href={`mailto:${site.contact.email}`} className="hidden items-center gap-1.5 hover:text-white sm:inline-flex">
            <Mail className="size-3.5 text-white" aria-hidden="true" />
            {site.contact.email}
          </a>
          <PageWhatsAppLink className="inline-flex items-center gap-1.5 hover:text-white">
            <WhatsAppIcon className="size-4" />
            <T k="topbar.whatsapp">WhatsApp</T>
          </PageWhatsAppLink>
        </div>
        <LanguageSwitcher className="md:order-last md:ml-3" />
        <div className="hidden items-center gap-5 md:flex">
          <OpenStatus className="text-white" />
          <span aria-hidden="true" className="h-3.5 w-px bg-white/20" />
        <nav aria-label="Social media" className="flex items-center gap-4">
          {site.social.map((s) => (
            <a key={s.label} href={s.href} className="hover:text-white">
              {s.label}
            </a>
          ))}
        </nav>
        </div>
      </Container>
    </div>
  );
}
