"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, CornerDownLeft, Search, X } from "lucide-react";
import type { SearchItem } from "@/lib/search-index";
import { whatsappLink } from "@/config/site";

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const POPULAR = ["/get-quote", "/cost-estimator", "/services/website-development", "/services/ai-solutions", "/free-ai-audit", "/industries"];

type Indexed = SearchItem & { _title: string; _all: string };

function score(item: Indexed, q: string, tokens: string[]) {
  if (!tokens.every((t) => item._all.includes(t))) return 0;
  let s = 1;
  if (item._title === q) s += 200;
  if (item._title.startsWith(q)) s += 100;
  else if (item._title.includes(q)) s += 60;
  for (const t of tokens) {
    if (item._title.split(" ").some((w) => w.startsWith(t))) s += 15;
    else if (item._title.includes(t)) s += 8;
    else s += 3;
  }
  if (item.group === "Services" || item.group === "Industries") s += 3;
  return s;
}

/**
 * Site-wide search: a header button plus Ctrl/⌘ K or "/" from anywhere.
 * Accessible combobox — arrow keys move, Enter opens, Esc closes.
 */
export function SiteSearch({ index = [] }: { index?: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const listId = useId();

  const indexed = useMemo<Indexed[]>(
    () => index.map((i) => ({ ...i, _title: norm(i.title), _all: norm(`${i.title} ${i.hint} ${i.keywords} ${i.group}`) })),
    [index],
  );

  const results = useMemo(() => {
    const q = norm(query);
    if (!q) return POPULAR.map((h) => indexed.find((i) => i.href === h)).filter(Boolean) as Indexed[];
    const tokens = q.split(" ");
    return indexed
      .map((i) => [i, score(i, q, tokens)] as const)
      .filter(([, s]) => s > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 24)
      .map(([i]) => i);
  }, [query, indexed]);

  // Group results, keeping the order of each group's best match
  const groups = useMemo(() => {
    const map = new Map<string, Indexed[]>();
    for (const r of results) map.set(r.group, [...(map.get(r.group) ?? []), r]);
    return [...map.entries()];
  }, [results]);
  const flat = useMemo(() => groups.flatMap(([, items]) => items), [groups]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    triggerRef.current?.focus();
  }, []);

  // Global shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target as HTMLElement)?.tagName) || (e.target as HTMLElement)?.isContentEditable;
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "/" && !typing && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close when the page changes
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) {
      setOpen(false);
      setQuery("");
    }
  }

  // Focus the input and lock page scroll while open
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Keep the highlighted option visible
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (href: string) => {
    close();
    router.push(href);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && flat[active]) {
      e.preventDefault();
      go(flat[active].href);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  let i = -1;
  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        aria-keyshortcuts="Control+K Meta+K"
        className="grid size-12 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink"
      >
        <Search className="size-5" aria-hidden="true" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/40 px-3 pt-[8vh] backdrop-blur-sm md:pt-[12vh]" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div role="dialog" aria-modal="true" aria-label="Search the site" className="flex max-h-[80vh] w-full max-w-[640px] flex-col overflow-hidden rounded-card border border-line bg-white shadow-lift">
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="size-5 shrink-0 text-gray-500" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKey}
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={flat[active] ? `${listId}-${active}` : undefined}
                aria-autocomplete="list"
                placeholder="Search services, industries, articles…"
                className="min-h-14 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-gray-500"
              />
              <button type="button" onClick={close} aria-label="Close search" className="grid size-9 place-items-center rounded-full text-gray-500 hover:bg-mist-100 hover:text-ink">
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain p-2">
              {flat.length === 0 ? (
                <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
                  <p className="font-semibold text-ink">No results for “{query}”</p>
                  <p className="text-[14px] text-gray-600">Tell us what you’re looking for — we’ll point you to it.</p>
                  <a
                    href={whatsappLink(`Hi LTS, I was searching your site for "${query}".`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-lime-800 hover:gap-2.5"
                  >
                    Ask us on WhatsApp <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              ) : (
                <ul ref={listRef} id={listId} role="listbox" aria-label="Search results">
                  {!query && <li role="presentation" className="px-3 pb-1 pt-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-gray-500">Popular</li>}
                  {groups.map(([group, items]) => (
                    <li key={group} role="presentation">
                      {query && <p className="px-3 pb-1 pt-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-gray-500">{group}</p>}
                      <ul role="presentation">
                        {items.map((item) => {
                          i += 1;
                          const idx = i;
                          const on = idx === active;
                          return (
                            <li key={`${item.href}-${item.title}`} id={`${listId}-${idx}`} role="option" aria-selected={on} data-index={idx}>
                              <Link
                                href={item.href}
                                tabIndex={-1}
                                onClick={close}
                                onMouseMove={() => setActive(idx)}
                                className={`flex items-center gap-3 rounded-[12px] px-3 py-2.5 ${on ? "bg-mist-100" : ""}`}
                              >
                                <span className="flex min-w-0 flex-1 flex-col">
                                  <span className="truncate font-semibold text-ink">{item.title}</span>
                                  <span className="truncate text-[13px] text-gray-600">{item.hint}</span>
                                </span>
                                {on && <CornerDownLeft className="size-4 shrink-0 text-gray-500" aria-hidden="true" />}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="hidden items-center gap-4 border-t border-line px-4 py-2.5 text-[12px] text-gray-500 md:flex">
              <span><kbd className="rounded border border-line bg-mist-50 px-1.5 py-0.5 font-sans">↑</kbd> <kbd className="rounded border border-line bg-mist-50 px-1.5 py-0.5 font-sans">↓</kbd> to move</span>
              <span><kbd className="rounded border border-line bg-mist-50 px-1.5 py-0.5 font-sans">Enter</kbd> to open</span>
              <span><kbd className="rounded border border-line bg-mist-50 px-1.5 py-0.5 font-sans">Esc</kbd> to close</span>
              <span className="ml-auto">Tip: press <kbd className="rounded border border-line bg-mist-50 px-1.5 py-0.5 font-sans">/</kbd> anywhere</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
