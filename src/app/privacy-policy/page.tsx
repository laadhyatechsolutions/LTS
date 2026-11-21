import type { Metadata } from "next";
import { getLegal } from "@/data/legal";
import { LegalPage } from "@/components/legal/LegalPage";

const doc = getLegal("privacy-policy");

export const metadata: Metadata = {
  title: doc.title,
  description: doc.description,
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  return <LegalPage doc={doc} />;
}
