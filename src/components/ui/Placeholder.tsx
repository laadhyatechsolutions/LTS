import Image from "next/image";
import { ImageIcon } from "lucide-react";

/**
 * Dashed box marking where a real image goes later.
 * In development it also shows the file name to save the photo as (`file`).
 */
export function Placeholder({ label, file, className = "" }: { label: string; file?: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${label} (placeholder)`}
      className={`flex flex-col items-center justify-center gap-2 rounded-[14px] border border-dashed border-ink/15 bg-mist-50 p-3 text-center text-sm font-medium text-gray-600 ${className}`}
    >
      <ImageIcon className="size-5 text-mist-400" aria-hidden="true" />
      {label}
      {file && process.env.NODE_ENV !== "production" && (
        <code className="rounded bg-white/80 px-1.5 py-0.5 text-[11px] font-normal text-gray-500">{`public/${file}.jpg`}</code>
      )}
    </div>
  );
}

/**
 * A photo slot: shows the image when `src` is set, otherwise the dashed placeholder.
 * `className` must give the box a size (e.g. h-[220px] or aspect-[4/3] w-full) — the photo fills it.
 * Safe in client components; get `src` on the server with findImage().
 */
export function SlotImage({
  src,
  label,
  file,
  alt = "",
  sizes = "(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw",
  fit = "cover",
  priority = false,
  className = "",
}: {
  src: string | null | undefined;
  label: string;
  file?: string;
  alt?: string;
  sizes?: string;
  fit?: "cover" | "contain";
  priority?: boolean;
  className?: string;
}) {
  if (!src) return <Placeholder label={label} file={file} className={className} />;
  return (
    <div className={`relative overflow-hidden rounded-[14px] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={fit === "cover" ? "object-cover" : "object-contain"}
      />
    </div>
  );
}
