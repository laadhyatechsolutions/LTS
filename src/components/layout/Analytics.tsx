"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { Cookie } from "lucide-react";
import { track } from "@/lib/track";

// IDs are inserted into inline scripts, so keep only safe characters
const GA_ID = (process.env.NEXT_PUBLIC_GA4_ID ?? "").replace(/[^A-Za-z0-9-]/g, "");
const CLARITY_ID = (process.env.NEXT_PUBLIC_CLARITY_ID ?? "").replace(/[^A-Za-z0-9]/g, "");
const KEY = "lts-cookie-consent";
type Consent = "granted" | "denied" | null;

/** Footer link "Cookie settings" calls this to show the banner again */
export const OPEN_CONSENT_EVENT = "lts:open-cookie-settings";

function readConsent(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Cookie banner + analytics (GA4, Microsoft Clarity).
 * - Renders nothing at all until NEXT_PUBLIC_GA4_ID or NEXT_PUBLIC_CLARITY_ID is set.
 * - Analytics scripts load only after the visitor clicks "Accept".
 * - Tracks WhatsApp, call and email clicks as events; forms call track("generate_lead").
 */
export function Analytics() {
  const enabled = Boolean(GA_ID || CLARITY_ID);
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>(null);
  const [open, setOpen] = useState(false);

  // Read the saved choice after mount (localStorage isn't available on the server)
  useEffect(() => {
    if (!enabled) return;
    const saved = readConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(saved);
    setOpen(saved === null);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, [enabled]);

  // Count client-side page changes in GA4
  useEffect(() => {
    if (consent !== "granted" || !GA_ID) return;
    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    w.gtag?.("event", "page_view", { page_path: pathname });
  }, [pathname, consent]);

  // Conversion clicks: WhatsApp, phone, email
  useEffect(() => {
    if (consent !== "granted") return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href") ?? "";
      if (href.startsWith("https://wa.me/")) track("whatsapp_click", { page: location.pathname });
      else if (href.startsWith("tel:")) track("call_click", { page: location.pathname });
      else if (href.startsWith("mailto:")) track("email_click", { page: location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [consent]);

  if (!enabled) return null;

  const choose = (value: "granted" | "denied") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    setConsent(value);
    setOpen(false);
    // Declining after accepting: reload so already-loaded scripts are gone
    if (value === "denied" && consent === "granted") location.reload();
  };

  return (
    <>
      {consent === "granted" && GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {consent === "granted" && CLARITY_ID && (
        <Script id="clarity-init" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      )}

      {open && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie preferences"
          className="fixed inset-x-3 bottom-[88px] z-[60] mx-auto max-w-md rounded-card border border-line bg-white p-5 shadow-lift md:bottom-6 md:left-6 md:right-auto md:mx-0"
        >
          <p className="flex items-center gap-2 font-semibold text-ink">
            <Cookie className="size-5 text-lime-700" aria-hidden="true" />
            Cookies, briefly
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-gray-600">
            We’d like to use analytics cookies to see which pages help visitors most. No ads, and you can change your mind any time.{" "}
            <Link href="/privacy-policy" className="font-semibold text-ink underline underline-offset-2">Privacy policy</Link>
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => choose("granted")} className="min-h-11 flex-1 rounded-full bg-ink px-5 text-[14px] font-semibold text-white hover:bg-ink/90">
              Accept
            </button>
            <button type="button" onClick={() => choose("denied")} className="min-h-11 flex-1 rounded-full border border-ink/20 px-5 text-[14px] font-semibold text-ink hover:border-ink">
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/** "Cookie settings" link for the footer (only shown when analytics is configured) */
export function CookieSettingsLink({ className }: { className?: string }) {
  if (!GA_ID && !CLARITY_ID) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))} className={className}>
      Cookie settings
    </button>
  );
}
