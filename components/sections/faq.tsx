import { SectionHeading } from "@/components/sections/section-heading";
import { faq } from "@/lib/site-data";

export function Faq() {
  return (
    <section id="faq" className="section-reveal premium-section-bleed relative scroll-mt-24 overflow-hidden px-5 py-11 md:px-8 md:py-20">
      <div className="absolute left-[-16rem] bottom-[-18rem] h-[30rem] w-[30rem] rounded-full bg-secondary/10 blur-3xl" />
      <div className="relative mx-auto max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Частые вопросы перед первой встречей" />
        <div className="mt-7 grid gap-3 md:mt-8">
          {faq.map((item, index) => (
            <details
              key={item.question}
              open={index === 0}
              className="group rounded-xl border border-border/70 bg-white/86 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.76),0_12px_34px_rgba(9,64,103,0.025)] backdrop-blur transition-all duration-500 ease-out open:border-secondary/45 open:bg-[linear-gradient(145deg,#ffffff_0%,#f7fbff_100%)] hover:-translate-y-px hover:border-secondary/45 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.84),0_16px_42px_rgba(9,64,103,0.045)] md:p-6"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-left text-lg font-semibold leading-7 text-headline marker:hidden [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="relative mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-secondary/35 bg-surface text-secondary transition-all duration-300 group-open:rotate-90 group-open:border-secondary/60 group-open:text-headline"
                >
                  <span className="absolute h-px w-3 bg-current" />
                  <span className="absolute h-3 w-px bg-current transition-transform duration-300 group-open:rotate-90 group-open:scale-y-0" />
                </span>
              </summary>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="mt-3 max-w-[39rem] leading-7 text-text">{item.answer}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
        <p className="mx-auto mt-7 max-w-xl text-center text-base font-medium leading-7 text-text/82">
          Если остались сомнения, можно начать с короткого сообщения.
        </p>
      </div>
    </section>
  );
}
