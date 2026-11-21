import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { whatsappLink } from "@/config/site";
import { founderStory } from "@/data/about";
import { heroNeeds, heroStats, heroTrust, heroWords } from "@/data/home";
import { findImage } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { HeroStory } from "@/components/home/hero/HeroStory";
import { RotatingWord } from "@/components/home/hero/RotatingWord";
import { T } from "@/components/ui/T";
import { HeroIndustryPill, HeroSubline } from "@/components/home/hero/HeroPersonal";

/** "Talk directly to the founder" chip — shows public/team/founder.jpg once it exists */
function FounderChip() {
  const photo = findImage("team/founder");
  const name = founderStory.name.startsWith("[") ? "our founder" : founderStory.name;
  return (
    <a
      href={whatsappLink(`Hi ${founderStory.name.startsWith("[") ? "LTS" : founderStory.name}, I'd like to talk about a project.`)}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2.5 rounded-full border border-white/70 bg-white py-1.5 pl-1.5 pr-4 shadow-lift transition-transform hover:-translate-y-0.5"
    >
      {photo ? (
        <Image src={photo} alt="" width={80} height={80} className="size-10 rounded-full object-cover" />
      ) : (
        <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-violet-200 font-display text-[20px] font-bold text-ink">
          {name.charAt(0).toUpperCase()}
        </span>
      )}
      <span className="flex flex-col leading-tight">
        <span className="text-[13px] font-semibold text-ink">Talk directly to {name}</span>
        <span className="flex items-center gap-1 text-[11px] text-gray-500">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-whatsapp" /> Founder · usually replies fast
        </span>
      </span>
    </a>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ink pb-14 pt-10 md:pb-24 md:pt-20">
      {/* Depth: soft violet glow behind the visual + a faint dot grid that fades out */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 size-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(167,139,250,0.26),transparent)] lg:-right-20" />
        <div className="absolute -bottom-60 -left-40 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(191,216,160,0.10),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_60%_40%,black,transparent)]" />
      </div>

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_1fr] lg:gap-12">
          <div className="flex flex-col gap-5 md:gap-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#BFD8A0] md:text-[13px]">
              <T k="hero.eyebrow">Software · AI · Marketing — Hyderabad</T>
            </p>
            <h1 id="hero-title" className="font-display text-[46px] font-bold leading-[0.98] text-white sm:text-[56px] md:text-[76px]">
              <T k="hero.title">We build, automate &amp; grow your</T> <RotatingWord words={heroWords} />
            </h1>
            <HeroIndustryPill prefix="Showing ideas for" />
            <p className="max-w-xl text-[17px] leading-relaxed text-gray-300 md:text-[19px]">
              <HeroSubline fallback={<T k="hero.sub">Websites, apps, custom software, AI bots and marketing — one team, zero chaos.</T>} />
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/get-quote" variant="lime" size="lg">
                <T k="hero.cta">Let&apos;s build it →</T>
              </Button>
              <Button href={whatsappLink()} variant="outline-light" size="lg" external>
                <T k="cta.whatsapp">Chat on WhatsApp</T>
              </Button>
            </div>

            <div className="flex flex-col gap-2.5">
              <p className="text-[13px] font-semibold text-gray-400"><T k="hero.quoteFor">Or get a quote for:</T></p>
              <ul className="flex flex-wrap gap-2">
                {heroNeeds.map((n) => (
                  <li key={n.slug}>
                    <Link
                      href={`/get-quote?service=${n.slug}`}
                      className="inline-flex min-h-9 items-center rounded-full border border-white/15 bg-white/[0.04] px-3.5 text-[13px] font-semibold text-white/85 transition-colors hover:border-[#BFFF00]/60 hover:bg-[#BFFF00]/10 hover:text-white"
                    >
                      <T k={n.key}>{n.label}</T>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-gray-300">
              {heroTrust.map((t) => (
                <li key={t.key} className="flex items-center gap-1.5">
                  <Check className="size-4 text-[#BFD8A0]" strokeWidth={2.5} aria-hidden="true" />
                  <T k={t.key}>{t.label}</T>
                </li>
              ))}
            </ul>
          </div>

          <HeroStory founder={<FounderChip />} />
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-4 md:gap-5">
          {heroStats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-2 rounded-card border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] md:p-6"
            >
              <span aria-hidden="true" className="order-0 h-1 w-8 rounded-full bg-[#BFD8A0]" />
              <dt className="order-2 text-sm font-semibold text-gray-400"><T k={s.key}>{s.label}</T></dt>
              <dd className="order-1 font-display text-[40px] font-bold leading-none text-white md:text-[50px]">
                <CountUp value={s.value} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
