"use client";

import { useEffect } from "react";
import { LANGS } from "@/i18n/dictionaries";
import { setLang, useLang } from "@/i18n/useLang";

/** Keeps <html lang> in step with the choice, and honours a shared link like /?lang=te */
export function LangEffect() {
  const lang = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q === "en" || q === "hi" || q === "te") setLang(q);
  }, []);
  return null;
}

/** EN | తెలుగు | हिन्दी */
export function LanguageSwitcher({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const lang = useLang();
  const on = tone === "dark" ? "bg-white text-ink" : "bg-ink text-white";
  const off = tone === "dark" ? "text-[#BFD8A0] hover:text-white" : "text-gray-600 hover:text-ink";
  return (
    <div role="group" aria-label="Language" className={`inline-flex items-center gap-0.5 rounded-full border p-0.5 ${tone === "dark" ? "border-white/20" : "border-ink/15"} ${className}`}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          aria-pressed={lang === l.code}
          aria-label={l.name}
          onClick={() => setLang(l.code)}
          className={`min-h-7 rounded-full px-2.5 text-[12px] font-semibold transition-colors ${lang === l.code ? on : off}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
