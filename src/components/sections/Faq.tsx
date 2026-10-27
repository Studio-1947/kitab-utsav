import { FAQS } from "@/data/event";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 bg-page-warm py-12 md:py-18">
      <div className="wrap">
        <SectionHead id="faq-title" eyebrow="FAQ" title="Frequently Asked Questions" />
        <div className="grid items-start gap-2.5 lg:grid-cols-2">
          {FAQS.map((f, i) => (
            <details
              key={f.q}
              open={i === 0}
              className="group rounded-panel border border-border-content bg-surface-content text-ink-content transition-[border-color,box-shadow] duration-200 hover:border-accent hover:shadow-card-hover open:border-accent"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-semibold md:px-6 [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid size-7 flex-none place-items-center rounded-full bg-accent-fill text-on-accent">
                  <Icon name="chevron" className="size-4 transition-transform duration-200 group-open:rotate-180" />
                </span>
              </summary>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr]">
                <p className="min-h-0 overflow-hidden px-5 pb-4.5 text-[0.92rem] leading-[1.6] text-ink-muted md:px-6">{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
