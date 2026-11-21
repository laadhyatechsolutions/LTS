"use client";

import { useCallback, useSyncExternalStore } from "react";
import { dictionaries, type Lang } from "./dictionaries";

const KEY = "lts-lang";
const EVENT = "lts-lang-change";
const isLang = (v: unknown): v is Lang => v === "en" || v === "hi" || v === "te";

const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
};

function read(): Lang {
  try {
    const v = localStorage.getItem(KEY);
    return isLang(v) ? v : "en";
  } catch {
    return "en";
  }
}

export function setLang(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

/** Current language. Always "en" on the server and on first paint, so there is no hydration mismatch. */
export function useLang(): Lang {
  return useSyncExternalStore(subscribe, read, () => "en");
}

/** t("hero.cta", "Let's build it →") — returns the translation, or the English fallback */
export function useT() {
  const lang = useLang();
  return useCallback((key: string, fallback: string) => (lang === "en" ? fallback : dictionaries[lang][key] ?? fallback), [lang]);
}
