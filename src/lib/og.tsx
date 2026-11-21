import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

/** Link-preview card (WhatsApp, LinkedIn, X…) shared by every page type. 1200×630. */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

let logo: Promise<string> | null = null;
const logoDataUrl = () =>
  (logo ??= readFile(join(process.cwd(), "public/logo.png")).then((b) => `data:image/png;base64,${b.toString("base64")}`));

export async function ogImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  const src = await logoDataUrl();
  const size = title.length > 48 ? 62 : title.length > 30 ? 74 : 88;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: "#111111",
          backgroundImage:
            "radial-gradient(circle at 92% 8%, rgba(167,139,250,0.38), transparent 42%), radial-gradient(circle at 0% 100%, rgba(191,216,160,0.14), transparent 40%)",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", background: "#fff", borderRadius: 18, padding: "10px 18px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain <img> */}
            <img src={src} alt="" height={56} style={{ height: 56 }} />
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#BFD8A0", letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>
            Hyderabad
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 24, color: "#BFD8A0", letterSpacing: 4, textTransform: "uppercase", fontWeight: 600 }}>{eyebrow}</div>
          <div style={{ display: "flex", fontSize: size, lineHeight: 1.04, fontWeight: 800, letterSpacing: -1.5, maxWidth: 1000 }}>{title}</div>
          {subtitle && (
            <div style={{ display: "flex", fontSize: 28, lineHeight: 1.4, color: "#c9c9c9", maxWidth: 940 }}>
              {subtitle.length > 120 ? `${subtitle.slice(0, 117)}…` : subtitle}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 24, color: "#9a9a9a" }}>{site.name} · Software · AI · Marketing</div>
          <div style={{ display: "flex", background: "#BFFF00", color: "#111", fontSize: 24, fontWeight: 700, borderRadius: 999, padding: "14px 28px" }}>
            Get a free quote →
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
