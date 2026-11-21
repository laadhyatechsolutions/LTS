"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

/**
 * Cloudflare Turnstile — invisible-ish bot check. Adds a hidden "cf-turnstile-response"
 * field to the surrounding form; the server action verifies it.
 * Renders nothing until NEXT_PUBLIC_TURNSTILE_SITE_KEY is set.
 */
export function Turnstile() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!SITE_KEY) return;
    let id: string | undefined;
    let timer: ReturnType<typeof setInterval> | undefined;
    const mount = () => {
      if (!ref.current || !window.turnstile || id) return false;
      id = window.turnstile.render(ref.current, { sitekey: SITE_KEY, theme: "light", size: "flexible" });
      return true;
    };
    if (!mount()) timer = setInterval(() => mount() && clearInterval(timer), 200);
    return () => {
      clearInterval(timer);
      if (id) window.turnstile?.remove(id);
    };
  }, []);

  if (!SITE_KEY) return null;
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" />
      <div ref={ref} className="min-h-[65px]" />
    </>
  );
}
