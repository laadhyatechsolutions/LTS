import type { ReactNode } from "react";

type Props = {
  eyebrow: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, lead, align = "left", className = "", id }: Props) {
  const center = align === "center";
  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${center ? "mx-auto items-center text-center" : ""} ${className}`}>
      <p className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-gray-600">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-lime-500" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-balance font-display text-[40px] font-bold leading-[1] tracking-[-0.01em] text-ink md:text-[58px]">
        {title}
      </h2>
      {lead && <p className="max-w-2xl text-pretty text-[17px] leading-[1.65] text-gray-600 md:text-[18px]">{lead}</p>}
    </div>
  );
}
