"use client";

import { useT } from "@/i18n/useLang";

/**
 * Translatable text: <T k="hero.cta">Let's build it →</T>
 * Shows the English children by default; in Hindi/Telugu shows the matching entry from i18n/dictionaries.ts.
 */
export function T({ k, children }: { k: string; children: string }) {
  const t = useT();
  return <>{t(k, children)}</>;
}
