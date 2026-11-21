import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Inter, Noto_Sans_Devanagari, Noto_Sans_Telugu, Yanone_Kaffeesatz } from "next/font/google";
import { site } from "@/config/site";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { WhatsAppNudge } from "@/components/layout/WhatsAppNudge";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Analytics } from "@/components/layout/Analytics";
import { BusinessSchema } from "@/components/layout/BusinessSchema";
import { buildSearchIndex } from "@/lib/search-index";
import { WhatsAppMessagesProvider } from "@/components/ui/PageWhatsApp";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappMessagesByPath } from "@/lib/whatsapp-messages";
import { LangEffect } from "@/components/layout/LanguageSwitcher";
import "./globals.css";

const display = Yanone_Kaffeesatz({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-yanone",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

// Hindi and Telugu scripts: the browser only downloads these when a visitor picks that language
const hindi = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: ["400", "600", "700"], display: "swap", preload: false, variable: "--font-noto-deva" });
const telugu = Noto_Sans_Telugu({ subsets: ["telugu"], weight: ["400", "600", "700"], display: "swap", preload: false, variable: "--font-noto-telugu" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Websites, Apps, Software, AI & Marketing in Hyderabad`,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${inter.variable} ${hindi.variable} ${telugu.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <WhatsAppMessagesProvider byPath={whatsappMessagesByPath()} fallback={DEFAULT_WHATSAPP_MESSAGE}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-lime-400 focus:px-5 focus:py-3 focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <LangEffect />
        <TopBar />
        <Header searchIndex={buildSearchIndex()} />
        <main id="main" className="flex-1">
          {/* Soft crossfade between pages (see globals.css "Page transitions") */}
          <ViewTransition default="page">{children}</ViewTransition>
        </main>
        <Footer />
        <WhatsAppButton />
        <WhatsAppNudge />
        <MobileActionBar />
        <Analytics />
        <BusinessSchema />
        </WhatsAppMessagesProvider>
      </body>
    </html>
  );
}
