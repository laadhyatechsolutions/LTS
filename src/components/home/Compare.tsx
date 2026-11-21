import { Check, Minus, X } from "lucide-react";
import { comparison, type CompareMark } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { T } from "@/components/ui/T";

const markLabel: Record<CompareMark, string> = { yes: "Yes", part: "Partly", no: "No" };

function Mark({ mark, highlight }: { mark: CompareMark; highlight?: boolean }) {
  const Icon = mark === "yes" ? Check : mark === "part" ? Minus : X;
  const tone =
    mark === "yes"
      ? highlight
        ? "bg-[#BFFF00] text-ink"
        : "bg-ink/80 text-white"
      : mark === "part"
        ? "bg-mist-200 text-gray-700"
        : "bg-white text-gray-400 ring-1 ring-inset ring-ink/10";
  return (
    <span className={`grid size-6 shrink-0 place-items-center rounded-full ${tone}`}>
      <Icon className="size-3.5" strokeWidth={3} aria-hidden="true" />
      <span className="sr-only">{markLabel[mark]}:</span>
    </span>
  );
}

/** Homepage: LTS vs a freelancer vs a typical agency */
export function Compare() {
  const { columns, rows } = comparison;
  return (
    <section aria-labelledby="compare-title" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          id="compare-title"
          eyebrow={<T k="compare.eyebrow">Compare</T>}
          title={<T k="compare.title">Why businesses pick LTS</T>}
          lead={<T k="compare.lead">The speed of a freelancer, the range of an agency — with marketing and support in the same team.</T>}
        />
        <div className="mt-10 overflow-hidden rounded-card border border-line bg-white md:mt-12">
          <table className="w-full table-fixed border-collapse text-left">
            <caption className="sr-only">LTS compared with a freelancer and a typical agency</caption>
            <colgroup>
              <col className="w-[31%] md:w-[34%]" />
              <col className="bg-[#BFFF00]/[0.08]" />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="p-3 md:p-5"><span className="sr-only">What you get</span></th>
                {columns.map((c, i) => (
                  <th key={c} scope="col" className="p-3 align-bottom md:p-5">
                    {i === 0 ? (
                      <span className="inline-flex items-center rounded-full bg-ink px-3 py-1.5 font-display text-[18px] font-bold text-white md:px-4 md:text-[22px]">{c}</span>
                    ) : (
                      <span className="font-display text-[16px] font-bold leading-tight text-gray-600 md:text-[22px]">{c}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-line last:border-0">
                  <th scope="row" className="p-3 align-top text-[13px] font-semibold leading-snug text-ink md:p-5 md:text-[16px]">
                    {r.label}
                  </th>
                  {r.cells.map(([mark, note], i) => (
                    <td key={i} className="p-3 align-top md:p-5">
                      <span className="flex flex-col gap-1.5 md:flex-row md:items-center md:gap-2.5">
                        <Mark mark={mark} highlight={i === 0} />
                        <span className={`text-[12px] leading-snug md:text-[15px] ${i === 0 ? "font-semibold text-ink" : "text-gray-600"}`}>{note}</span>
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
          <Button href="/get-quote"><T k="cta.quote">Get a free quote</T></Button>
          <Button href="/cost-estimator" variant="outline"><T k="compare.estimate">Estimate your cost</T></Button>
        </div>
      </Container>
    </section>
  );
}
