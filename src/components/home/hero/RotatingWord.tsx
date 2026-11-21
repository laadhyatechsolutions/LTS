"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRememberedIndustry } from "@/lib/industry-memory";
import { useLang } from "@/i18n/useLang";

/**
 * The last word of the hero headline, cycling through industries.
 * Screen readers and search engines get the plain word "business".
 */
export function RotatingWord({ words, interval = 2200 }: { words: { word: string; href: string }[]; interval?: number }) {
  const [i, setI] = useState(0);
  const hold = useRef(false);
  const lang = useLang();
  // A visitor who looked at an industry sees that industry's word, steady (no cycling)
  const remembered = useRememberedIndustry();
  const pinned = remembered ? words.findIndex((w) => w.href.endsWith(`/${remembered}`)) : -1;

  useEffect(() => {
    if (pinned >= 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (!hold.current && document.visibilityState === "visible") setI((n) => (n + 1) % words.length);
    }, interval);
    return () => clearInterval(t);
  }, [words.length, interval, pinned]);

  const w = words[pinned >= 0 ? pinned : i];
  // In Hindi/Telugu the translated headline is a complete sentence, so the rotating English word is dropped
  if (lang !== "en") return null;
  return (
    <span className="block">
      <span className="sr-only">business</span>
      <Link
        href={w.href}
        aria-hidden="true"
        tabIndex={-1}
        onPointerEnter={() => (hold.current = true)}
        onPointerLeave={() => (hold.current = false)}
        className="inline-block text-lime-400 underline decoration-lime-400/50 decoration-4 underline-offset-[8px] transition-colors hover:decoration-lime-400"
      >
        <span key={w.word} className="lts-anim inline-block" style={{ animation: "lts-word 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) both" }}>
          {w.word}
        </span>
      </Link>
    </span>
  );
}
