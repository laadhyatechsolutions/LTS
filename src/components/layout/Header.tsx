"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { mainNav } from "@/config/site";
import { serviceCategories } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { T } from "@/components/ui/T";
import { SiteSearch } from "./SiteSearch";
import type { SearchItem } from "@/lib/search-index";

/** One item inside the capsule: pill-shaped, lifts on hover, Bitter Lime when active */
const navItem =
  "rounded-full border border-transparent px-3 py-2 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#BFFF00]/35 data-[active=true]:bg-[#BFFF00]/35";

export function Header({ searchIndex = [] }: { searchIndex?: SearchItem[] }) {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);

  // Close menus when the page changes
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setServicesOpen(false);
    setMobileOpen(false);
  }

  // Close the services menu on Escape or a click outside it
  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setServicesOpen(false);
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [servicesOpen]);

  // Phones: slide the header away while reading down, bring it back on any scroll up.
  // Stays put when a menu is open, when focus is inside it, or near the top of the page.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last;
      if (Math.abs(delta) < 8) return;
      last = y;
      const phone = window.matchMedia("(max-width: 767px)").matches;
      const busy = mobileOpen || servicesOpen || headerRef.current?.contains(document.activeElement);
      setHidden(phone && !busy && delta > 0 && y > 160);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen, servicesOpen]);

  // Tell sticky bars below the header (service pages) to move up into the freed space
  useEffect(() => {
    document.documentElement.dataset.headerHidden = String(hidden);
    return () => {
      delete document.documentElement.dataset.headerHidden;
    };
  }, [hidden]);

  // Stop the page scrolling behind the open mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header ref={headerRef} style={{ viewTransitionName: "site-header" }} className={`sticky top-0 z-40 transition-transform duration-300 ease-out max-md:data-[hidden=true]:-translate-y-full border-b border-line bg-white/85 backdrop-blur-md backdrop-saturate-150 supports-[not(backdrop-filter:blur(1px))]:bg-white`} data-hidden={hidden}>
      <Container className="flex min-h-[76px] items-center justify-between gap-6">
        <Logo />

        {/* Desktop navigation */}
        <nav
          aria-label="Main"
          className="hidden items-center gap-1 rounded-full border border-gray-400 bg-white p-1.5 text-[14px] font-semibold text-ink xl:flex"
        >
          <div ref={servicesRef} className="relative">
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-controls="services-menu"
              onClick={() => setServicesOpen((o) => !o)}
              data-active={servicesOpen || pathname.startsWith("/services")}
              className={`${navItem} inline-flex items-center gap-1`}
            >
              <T k="nav.services">Services</T>
              <ChevronDown className={`size-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            {servicesOpen && (
              <div
                id="services-menu"
                className="absolute left-1/2 top-full mt-4 w-[760px] -translate-x-1/2 rounded-[8px] border border-line bg-white p-4 shadow-lift"
              >
                <ul className="grid grid-cols-2 gap-2">
                  {serviceCategories.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/services/${c.slug}`}
                        className="flex gap-3 rounded-[12px] p-3 hover:bg-mist-50"
                      >
                        <span className="grid size-10 shrink-0 place-items-center rounded-[12px] border border-ink/10 bg-[#BFFF00]/20">
                          <c.icon className="size-5 text-ink" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block font-semibold text-ink">{c.name}</span>
                          <span className="block text-sm font-normal text-gray-600">{c.line}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services"
                  className="mt-3 flex items-center justify-between rounded-[12px] bg-mist-100 px-4 py-3 text-sm font-semibold text-ink hover:bg-mist-200"
                >
                  View all services
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href || pathname.startsWith(item.href + "/") ? "page" : undefined}
              data-active={pathname === item.href || pathname.startsWith(item.href + "/")}
              className={navItem}
            >
              <T k={`nav.${item.label.toLowerCase()}`}>{item.label}</T>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <SiteSearch index={searchIndex} />
          <div className="hidden sm:block">
            <Button href="/get-quote" variant="ink">
              <T k="cta.quote">Get a Free Quote</T>
            </Button>
          </div>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="grid size-12 place-items-center rounded-full border border-ink/20 transition-colors hover:border-ink xl:hidden"
          >
            {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {/* Mobile navigation */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full h-[calc(100dvh-76px)] overflow-y-auto border-b border-line bg-white xl:hidden"
        >
          <Container className="flex flex-col gap-6 pb-28 pt-6">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-gray-600"><T k="nav.services">Services</T></p>
              <ul className="flex flex-col">
                {serviceCategories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/services/${c.slug}`} className="flex items-center gap-3 py-2.5 font-semibold text-ink">
                      <span className="grid size-9 place-items-center rounded-[10px] border border-ink/10 bg-[#BFFF00]/20">
                        <c.icon className="size-4" aria-hidden="true" />
                      </span>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="flex flex-col gap-3 border-t-2 border-mist-100 pt-4">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-active={pathname === item.href || pathname.startsWith(item.href + "/")}
                    className="block rounded-full border border-ink/15 px-5 py-3 text-lg font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-[#BFFF00]/35 data-[active=true]:bg-[#BFFF00]/35"
                  >
                    <T k={`nav.${item.label.toLowerCase()}`}>{item.label}</T>
                  </Link>
                </li>
              ))}
            </ul>
            <Button href="/get-quote" variant="lime" size="lg">
              <T k="cta.quote">Get a Free Quote</T>
            </Button>
          </Container>
        </nav>
      )}
    </header>
  );
}
