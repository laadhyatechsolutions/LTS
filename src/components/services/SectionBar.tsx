"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * Sticky "jump to" bar under the header on long service pages.
 * Highlights the section on screen and keeps the active chip scrolled into view on phones.
 */
export function SectionBar({ sections, ctaHref = "/get-quote" }: { sections: { id: string; label: string }[]; ctaHref?: string }) {
  const [current, setCurrent] = useState<string | null>(null);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const update = () => {
      const line = 160; // just below the header + this bar
      let id: string | null = null;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) id = s.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) id = sections[sections.length - 1]?.id ?? id;
      setCurrent(id);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sections]);

  // Keep the active chip visible inside the horizontal list (without moving the page)
  useEffect(() => {
    const ul = list.current;
    const chip = current ? ul?.querySelector<HTMLElement>(`[data-id="${current}"]`) : null;
    if (!ul || !chip) return;
    const left = chip.offsetLeft - ul.clientWidth / 2 + chip.clientWidth / 2;
    ul.scrollTo({ left, behavior: "smooth" });
  }, [current]);

  return (
    <nav aria-label="On this page" className="sticky top-[76px] [html[data-header-hidden=true]_&]:max-md:top-0 max-md:transition-[top] max-md:duration-300 z-30 border-b border-line bg-white/90 backdrop-blur-md supports-[not(backdrop-filter:blur(1px))]:bg-white">
      <div className="mx-auto flex w-full max-w-[1240px] items-center gap-4 px-5 md:px-8">
        <ul ref={list} className="flex flex-1 gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((s) => {
            const on = s.id === current;
            return (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  data-id={s.id}
                  aria-current={on ? "location" : undefined}
                  className={`inline-flex min-h-9 items-center rounded-full px-3.5 text-[14px] font-semibold text-ink transition-colors hover:bg-[#BFFF00]/35 ${on ? "bg-[#BFFF00]/35" : ""}`}
                >
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
        <Link
          href={ctaHref}
          className="hidden min-h-9 shrink-0 items-center rounded-full bg-ink px-4 text-[14px] font-semibold text-white transition-colors hover:bg-ink-deep md:inline-flex"
        >
          Get a free quote
        </Link>
      </div>
    </nav>
  );
}
