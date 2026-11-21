"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/config/site";

const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const fmtHour = (h: number) => `${h % 12 || 12} ${h < 12 ? "am" : "pm"}`;

/** Current day + hour in India, whatever the visitor's own time zone */
function indiaNow() {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return { day: DAY.indexOf(get("weekday")), hour: Number(get("hour")) + Number(get("minute")) / 60 };
}

function status() {
  const { open, close } = site.contact.openHours;
  const days: readonly number[] = site.contact.openHours.days;
  const { day, hour } = indiaNow();
  if (days.includes(day) && hour >= open && hour < close) return "open";
  // Next opening: later today, or the next working day
  if (days.includes(day) && hour < open) return `today ${fmtHour(open)}`;
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    if (days.includes(d)) return `${i === 1 ? "tomorrow" : DAY[d]} ${fmtHour(open)}`;
  }
  return "soon";
}

const subscribe = (cb: () => void) => {
  const t = setInterval(cb, 60_000);
  return () => clearInterval(t);
};

/**
 * "● Open now" / "● Closed · opens tomorrow 10 am" based on office hours in India time.
 * Renders nothing on the server (the time is only known in the browser), so there is no hydration mismatch.
 */
export function OpenStatus({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const s = useSyncExternalStore(subscribe, status, () => null);
  if (!s) return null;
  const open = s === "open";
  const muted = tone === "dark" ? "text-gray-400" : "text-gray-600";
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="relative flex size-2">
        {open && <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp/60 motion-reduce:hidden" />}
        <span className={`relative size-2 rounded-full ${open ? "bg-whatsapp" : "bg-gray-400"}`} />
      </span>
      {open ? (
        <span>
          Open now <span className={muted}>· replies in minutes</span>
        </span>
      ) : (
        <span>
          Closed <span className={muted}>· opens {s} · WhatsApp anytime</span>
        </span>
      )}
    </span>
  );
}
