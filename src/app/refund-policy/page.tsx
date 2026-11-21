import type { Metadata } from "next";
import { getLegal } from "@/data/legal";
import { LegalPage } from "@/components/legal/LegalPage";

const doc = getLegal("refund-policy");

export const metadata: Metadata = {
  title: doc.title,
  description: doc.description,
  alternates: { canonical: "/refund-policy" },
};

export default function Page() {
  return <LegalPage doc={doc} />;
}
