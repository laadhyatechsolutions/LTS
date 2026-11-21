"use client";

import { useSyncExternalStore } from "react";

/** Remembers the last industry the visitor looked at (in this browser only), so the homepage can speak to them. */
const KEY = "lts-industry";
const EVENT = "lts-industry-change";

const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
};

export function rememberIndustry(slug: string) {
  try {
    if (localStorage.getItem(KEY) === slug) return;
    localStorage.setItem(KEY, slug);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function forgetIndustry() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

/** null on the server and for first-time visitors */
export function useRememberedIndustry(): string | null {
  return useSyncExternalStore(
    subscribe,
    () => {
      try {
        return localStorage.getItem(KEY);
      } catch {
        return null;
      }
    },
    () => null,
  );
}
