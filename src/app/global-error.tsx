"use client";

import { useEffect } from "react";

/** Last-resort error screen if the whole layout fails. Plain inline styles: global CSS may not be loaded here. */
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#111", color: "#fff", fontFamily: "system-ui, sans-serif", padding: 24 }}>
        <main style={{ maxWidth: 520, textAlign: "center" }}>
          <p style={{ color: "#BFD8A0", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>Laadhya Tech Solutions</p>
          <h1 style={{ fontSize: 36, lineHeight: 1.1, margin: "12px 0" }}>Sorry — the site hit a problem</h1>
          <p style={{ color: "#bbb", lineHeight: 1.6 }}>Please try again in a moment. You can also reach us on WhatsApp or by phone.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
            <button type="button" onClick={() => retry()} style={{ minHeight: 48, padding: "0 24px", borderRadius: 999, border: 0, background: "#BFFF00", color: "#111", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
              Try again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- the router may be broken here, so use a full page load */}
            <a href="/" style={{ minHeight: 48, padding: "0 24px", borderRadius: 999, border: "1px solid rgba(255,255,255,.4)", color: "#fff", fontWeight: 700, display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
              Homepage
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
