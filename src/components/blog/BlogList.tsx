"use client";

import Link from "next/link";
import { useState } from "react";
import { blogCategories, formatDate, posts } from "@/data/blog";
import { SlotImage } from "@/components/ui/Placeholder";

/** covers: slug → image URL (or null), found on the server from public/blog/<slug>.jpg */
export function BlogList({ covers = {} }: { covers?: Record<string, string | null> }) {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const shown = posts.filter(
    (p) => (cat === "All" || p.category === cat) && (!term || `${p.title} ${p.excerpt}`.toLowerCase().includes(term)),
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Category" className="flex flex-wrap gap-2">
          {["All", ...blogCategories].map((c) => (
            <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
              className={`min-h-10 rounded-full border px-4 text-[14px] font-semibold ${cat === c ? "border-ink bg-ink text-white" : "border-ink/15 bg-white text-ink hover:border-ink/40"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="md:w-72">
          <label htmlFor="blog-search" className="sr-only">Search articles</label>
          <input id="blog-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles"
            className="min-h-11 w-full rounded-full border border-ink/20 bg-white px-5 text-[15px] text-ink focus:border-ink placeholder:text-gray-500" />
        </div>
      </div>
      <p aria-live="polite" className="text-[14px] text-gray-600">{shown.length} {shown.length === 1 ? "article" : "articles"}</p>
      {shown.length === 0 ? (
        <p className="rounded-card border border-dashed border-ink/20 p-8 text-center text-gray-700">No articles match your search.</p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-card bg-white transition-all hover:-translate-y-1 hover:bg-mist-100 hover:shadow-soft">
                <SlotImage src={covers[p.slug]} file={`blog/${p.slug}`} label="Cover image" sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw" className="h-[170px] rounded-none border-0 border-b border-line" />
                <div className="flex flex-col gap-2 p-5">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-gray-600">{p.category} · {p.readMinutes} min read</p>
                  <h2 className="font-display text-[26px] font-bold leading-[1.1] text-ink">{p.title}</h2>
                  <p className="text-[15px] text-gray-600">{p.excerpt}</p>
                  <p className="text-[13px] text-gray-600">{formatDate(p.date)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
