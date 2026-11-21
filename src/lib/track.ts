/**
 * Send a conversion/interaction event to whichever analytics tools are loaded
 * (GA4 and/or Microsoft Clarity). Does nothing until the visitor accepts cookies.
 */
type Gtag = (...args: unknown[]) => void;
type Clarity = (...args: unknown[]) => void;

export function track(name: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: Gtag; clarity?: Clarity };
  w.gtag?.("event", name, params);
  w.clarity?.("event", name);
}
