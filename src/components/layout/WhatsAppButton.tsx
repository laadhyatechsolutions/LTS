import { PageWhatsAppLink } from "@/components/ui/PageWhatsApp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/** Floating WhatsApp button (tablet and desktop; phones use the bottom action bar instead) */
export function WhatsAppButton() {
  return (
    <PageWhatsAppLink
      aria-label="Chat with LTS on WhatsApp"
      className="fixed bottom-6 right-6 z-50 hidden size-14 [view-transition-name:wa-float] place-items-center rounded-full bg-whatsapp shadow-[0_12px_32px_-8px_rgba(37,211,102,0.55)] transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105 md:grid"
    >
      <WhatsAppIcon className="size-7" color="#ffffff" />
    </PageWhatsAppLink>
  );
}
