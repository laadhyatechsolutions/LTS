"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { PageWhatsAppLink } from "@/components/ui/PageWhatsApp";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { heroByIndustry } from "@/data/home";
import { useRememberedIndustry } from "@/lib/industry-memory";
import { useLang } from "@/i18n/useLang";
import { T } from "@/components/ui/T";

const KEY = "lts-wa-nudge";
const DELAY_MS = 12_000;
// Pages where the visitor is already in touch with us
const SKIP = ["/contact", "/get-quote", "/free-ai-audit", "/careers"];

/**
 * A small greeting next to the floating WhatsApp button, after 12 seconds on a page.
 * Shown once per visit (closing it, or clicking through, hides it for the rest of the session). Tablet/desktop only.
 */
export function WhatsAppNudge() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const industry = useRememberedIndustry();
  const lang = useLang();
  const custom = industry && lang === "en" ? heroByIndustry[industry]?.nudge : undefined;

  useEffect(() => {
    if (SKIP.some((p) => pathname.startsWith(p))) return;
    try {
      if (sessionStorage.getItem(KEY)) return;
    } catch {}
    const t = setTimeout(() => setShow(true), DELAY_MS);
    return () => clearTimeout(t);
  }, [pathname]);

  const dismiss = () => {
    setShow(false);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
  };

  if (!show || SKIP.some((p) => pathname.startsWith(p))) return null;
  return (
    <div
      role="status"
      className="lts-anim fixed bottom-[92px] right-6 z-50 hidden w-[300px] rounded-[20px] rounded-br-md border border-line bg-white p-4 pr-10 shadow-lift md:block"
      style={{ animation: "lts-pop 0.4s cubic-bezier(0.2, 0.7, 0.2, 1) both" }}
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Close message"
        className="absolute right-2 top-2 grid size-8 place-items-center rounded-full text-gray-500 hover:bg-mist-100 hover:text-ink"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
      <p className="text-[15px] font-semibold text-ink"><T k="nudge.hi">Hi there 👋</T></p>
      <p className="mt-1 text-[14px] leading-snug text-gray-600">{custom ?? <T k="nudge.text">Planning a website, app or AI bot? Ask us anything on WhatsApp — no forms.</T>}</p>
      <OpenStatus tone="light" className="mt-2 text-[12px] font-semibold text-ink" />
      <PageWhatsAppLink onClick={dismiss} className="mt-3 inline-flex min-h-10 items-center rounded-full bg-whatsapp px-4 text-[14px] font-semibold text-white hover:brightness-95">
        <T k="nudge.start">Start a chat</T>
      </PageWhatsAppLink>
    </div>
  );
}
