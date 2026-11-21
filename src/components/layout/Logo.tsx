import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";

/** Official LTS logo (public/logo.png). On dark backgrounds it sits on a white plate so the dark lettering stays readable. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={`inline-flex items-center ${light ? "rounded-[12px] bg-white px-3 py-2" : ""}`}
    >
      <Image
        src="/logo.png"
        alt={site.name}
        width={895}
        height={272}
        priority
        className={light ? "h-11 w-auto" : "h-12 w-auto md:h-[52px]"}
      />
    </Link>
  );
}
