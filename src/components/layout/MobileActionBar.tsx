import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/config/site";
import { PageWhatsAppLink } from "@/components/ui/PageWhatsApp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { T } from "@/components/ui/T";

/** Phones only: always-visible Call, WhatsApp and Get a Quote actions at the bottom of the screen */
export function MobileActionBar() {
  const item = "flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full text-[14px] font-semibold";
  return (
    <nav
      style={{ viewTransitionName: "quick-bar" }}
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.625rem)] pt-2.5 backdrop-blur md:hidden"
    >
      <div className="flex gap-2">
        <a href={site.contact.phoneHref} className={`${item} border border-ink/15 text-ink`}>
          <Phone className="size-4" aria-hidden="true" />
          <T k="mobile.call">Call</T>
        </a>
        <PageWhatsAppLink className={`${item} border border-ink/15 text-ink`}>
          <WhatsAppIcon className="size-4" />
          <T k="topbar.whatsapp">WhatsApp</T>
        </PageWhatsAppLink>
        <Link href="/get-quote" className={`${item} bg-lime-400 text-ink`}>
          <T k="mobile.quote">Get a Quote</T>
        </Link>
      </div>
    </nav>
  );
}
