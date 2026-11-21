import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Building2, LayoutGrid, Mail } from "lucide-react";
import { whatsappLink } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

const shortcuts = [
  { href: "/services", label: "Our services", text: "Websites, apps, software, AI and marketing", icon: LayoutGrid },
  { href: "/industries", label: "Industries", text: "Solutions for your sector", icon: Building2 },
  { href: "/portfolio", label: "Our work", text: "Projects and case studies", icon: Briefcase },
  { href: "/contact", label: "Contact us", text: "Call, WhatsApp or send a message", icon: Mail },
];

/** Shown for any URL that doesn't exist (and for notFound() calls). Returns a real 404 status. */
export default function NotFound() {
  return (
    <section className="bg-mist-50 py-20 md:py-28">
      <Container className="flex flex-col items-center gap-6 text-center">
        <p className="font-display text-[120px] font-bold leading-none text-ink md:text-[180px]">
          4<span className="text-lime-500">0</span>4
        </p>
        <h1 className="text-balance font-display text-[40px] font-bold leading-[1] text-ink md:text-[56px]">
          This page took a wrong turn
        </h1>
        <p className="max-w-xl text-[17px] leading-[1.65] text-gray-600">
          The link may be old or mistyped. Try one of these — or tell us what you were looking for and we’ll point you to it.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="lg">Back to home</Button>
          <Button href={whatsappLink("Hi LTS, I couldn't find a page on your website. I was looking for…")} variant="white" size="lg" external>
            Ask us on WhatsApp
          </Button>
        </div>
        <ul className="mt-6 grid w-full max-w-4xl gap-4 text-left sm:grid-cols-2">
          {shortcuts.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="group flex h-full items-center gap-4 rounded-card border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-soft">
                <span className="grid size-11 shrink-0 place-items-center rounded-[12px] border border-ink/10 bg-[#BFFF00]/20">
                  <s.icon className="size-5 text-ink" aria-hidden="true" />
                </span>
                <span className="flex flex-1 flex-col">
                  <span className="font-semibold text-ink">{s.label}</span>
                  <span className="text-[14px] text-gray-600">{s.text}</span>
                </span>
                <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
