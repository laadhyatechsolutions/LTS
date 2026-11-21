import Image from "next/image";
import { ViewTransition } from "react";

/**
 * Photo for a service category (public/services/<slug>.jpg, 3:2). Credits: public/services/CREDITS.md.
 * Decorative: the card heading already names the service.
 * `morph`: the photo glides into the category page when that page opens (use once per category per page).
 */
export function ServiceImage({
  slug,
  className = "",
  sizes = "(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw",
  morph = false,
}: {
  slug: string;
  className?: string;
  sizes?: string;
  morph?: boolean;
}) {
  const img = (
    <Image
      src={`/services/${slug}.jpg`}
      alt=""
      width={900}
      height={600}
      sizes={sizes}
      className={`aspect-[3/2] rounded-[14px] object-cover ${className}`}
    />
  );
  if (!morph) return img;
  return (
    <ViewTransition name={`service-${slug}`} share="morph" default="none">
      {img}
    </ViewTransition>
  );
}
