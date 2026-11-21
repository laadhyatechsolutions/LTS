"use client";

import { createContext, useContext, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { whatsappLink } from "@/config/site";
import { buttonClass, type Size, type Variant } from "@/components/ui/Button";

const Messages = createContext<{ byPath: Record<string, string>; fallback: string }>({ byPath: {}, fallback: "" });

/** Holds the per-page WhatsApp messages (built on the server) for the links below */
export function WhatsAppMessagesProvider({
  byPath,
  fallback,
  children,
}: {
  byPath: Record<string, string>;
  fallback: string;
  children: ReactNode;
}) {
  return <Messages.Provider value={{ byPath, fallback }}>{children}</Messages.Provider>;
}

/** WhatsApp link whose pre-filled message matches the page the visitor is on */
export function PageWhatsAppLink({
  className,
  children,
  ...rest
}: {
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const { byPath, fallback } = useContext(Messages);
  const message = byPath[pathname] ?? fallback;
  return (
    <a href={whatsappLink(message || undefined)} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
    </a>
  );
}

/** A <Button>-styled WhatsApp link with the page's own message */
export function PageWhatsAppButton({
  variant = "white",
  size = "md",
  className = "",
  children,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}) {
  return <PageWhatsAppLink className={buttonClass(variant, size, className)}>{children}</PageWhatsAppLink>;
}
