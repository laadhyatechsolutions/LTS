import Link from "next/link";
import type { ReactNode } from "react";

export type Variant = "lime" | "ink" | "outline" | "outline-light" | "white";
export type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  lime: "bg-lime-400 text-ink border border-lime-500/60 hover:bg-lime-300 hover:shadow-soft",
  ink: "bg-ink text-white border border-ink hover:bg-ink/90 hover:shadow-soft",
  outline: "bg-transparent text-ink border border-ink/25 hover:border-ink hover:bg-white",
  "outline-light": "bg-transparent text-white border border-white/40 hover:border-white hover:bg-white hover:text-ink",
  white: "bg-white text-ink border border-ink/15 hover:border-ink/40 hover:shadow-soft",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-6 text-[15px]",
  lg: "min-h-[52px] px-7 text-base",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
};

/** Pill-shaped link button (all site CTAs are links) */
/** Shared button look, also used by links that aren't plain <Button>s (e.g. PageWhatsAppButton) */
export function buttonClass(variant: Variant = "lime", size: Size = "md", className = "") {
  return `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5 ${variants[variant]} ${sizes[size]} ${className}`;
}

export function Button({ href, children, variant = "lime", size = "md", className = "", external }: Props) {
  const classes = buttonClass(variant, size, className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
