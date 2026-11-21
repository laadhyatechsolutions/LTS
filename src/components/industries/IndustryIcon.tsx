import {
  Briefcase,
  Building2,
  Factory,
  GraduationCap,
  HeartHandshake,
  Megaphone,
  Rocket,
  ShoppingBag,
  Stethoscope,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { IndustryIcon as IconName } from "@/data/industries";

const icons: Record<IconName, LucideIcon> = {
  stethoscope: Stethoscope,
  graduation: GraduationCap,
  building: Building2,
  shopping: ShoppingBag,
  factory: Factory,
  utensils: UtensilsCrossed,
  briefcase: Briefcase,
  rocket: Rocket,
  heart: HeartHandshake,
  megaphone: Megaphone,
};

/** The line icon that represents an industry (decorative) */
export function IndustryIcon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden="true" />;
}
