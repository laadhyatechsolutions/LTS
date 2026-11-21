"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/** Thin lime bar at the top of the screen showing how far through the article you are */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const el = document.getElementById(targetId);
      if (!el || !bar.current) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const done = Math.min(1, Math.max(0, -r.top / Math.max(total, 1)));
      bar.current.style.transform = `scaleX(${done})`;
    };
    // Only a few cheap position reads per scroll event, so no throttling needed
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetId]);
  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[45] h-[3px]">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-lime-500" />
    </div>
  );
}

/** Contents list that highlights the section you're reading */
export function ArticleToc({ sections }: { sections: { id: string; heading: string }[] }) {
  const [current, setCurrent] = useState(sections[0]?.id);
  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.3;
      let id = sections[0]?.id;
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el && el.getBoundingClientRect().top <= line) id = sec.id;
      }
      // At the very bottom, the last section is the one being read
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) id = sections[sections.length - 1]?.id;
      setCurrent(id);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [sections]);

  return (
    <nav aria-label="Table of contents" className="self-start rounded-card border border-line bg-white p-5 lg:sticky lg:top-28">
      <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-gray-500">In this article</p>
      <ol className="flex flex-col gap-1 border-l border-line text-[15px]">
        {sections.map((s) => {
          const on = s.id === current;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={on ? "location" : undefined}
                className={`-ml-px block border-l-2 py-1 pl-3 transition-colors ${on ? "border-lime-500 font-semibold text-ink" : "border-transparent text-gray-600 hover:text-ink"}`}
              >
                {s.heading}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Share on WhatsApp / LinkedIn, or copy the link */
export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = () => (typeof window === "undefined" ? "" : window.location.href.split("#")[0]);
  const btn = "inline-flex min-h-10 items-center gap-2 rounded-full border border-ink/15 bg-white px-4 text-[14px] font-semibold text-ink transition-colors hover:border-ink";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[14px] text-gray-600">Share:</span>
      <button type="button" className={btn} onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url()}`)}`, "_blank", "noopener")}>
        <WhatsAppIcon className="size-4" /> WhatsApp
      </button>
      <button type="button" className={btn} onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url())}`, "_blank", "noopener")}>
        <Share2 className="size-4" aria-hidden="true" /> LinkedIn
      </button>
      <button
        type="button"
        className={btn}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {}
        }}
      >
        {copied ? <Check className="size-4 text-lime-700" aria-hidden="true" /> : <Link2 className="size-4" aria-hidden="true" />}
        <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
      </button>
    </div>
  );
}
