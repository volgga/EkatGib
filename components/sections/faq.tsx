"use client";

import { SectionHeading } from "@/components/sections/section-heading";
import { faq } from "@/lib/site-data";
import { useState } from "react";

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-reveal relative scroll-mt-24 overflow-hidden px-5 pb-12 pt-4 md:px-8 md:pb-16 md:pt-6">
      <div className="absolute left-[-16rem] bottom-[-18rem] h-[30rem] w-[30rem] rounded-full bg-secondary/10 blur-3xl" />
      <div className="relative mx-auto max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Частые вопросы перед первой встречей" />
        <div className="mt-7 grid gap-3 md:mt-8">
          {faq.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className={`group rounded-xl border border-border/58 bg-white/74 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.66),0_12px_34px_rgba(9,64,103,0.022)] backdrop-blur transition-[border-color,box-shadow,background-color,transform] duration-[260ms] ease-out hover:-translate-y-px hover:border-secondary/42 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.76),0_16px_42px_rgba(9,64,103,0.04)] motion-reduce:transition-none md:p-6 ${
                  isOpen
                    ? "border-secondary/42 bg-[linear-gradient(145deg,rgba(255,255,255,0.72)_0%,rgba(247,251,255,0.58)_100%)]"
                    : ""
                }`}
              >
                <button
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="flex w-full cursor-pointer items-start justify-between gap-5 text-left text-lg font-semibold leading-7 text-headline"
                  type="button"
                  onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
                >
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className={`relative mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-secondary/35 bg-surface text-secondary transition-[transform,border-color,color] duration-[260ms] ease-out motion-reduce:transition-none ${
                      isOpen ? "rotate-90 border-secondary/60 text-headline" : ""
                    }`}
                  >
                    <span className="absolute h-px w-3 bg-current" />
                    <span
                      className={`absolute h-3 w-px bg-current transition-transform duration-[260ms] ease-out motion-reduce:transition-none ${
                        isOpen ? "rotate-90 scale-y-0" : ""
                      }`}
                    />
                  </span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`grid transition-[grid-template-rows] duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p
                      className={`max-w-[39rem] pt-3 leading-7 text-text transition-[opacity,transform] duration-[260ms] ease-out will-change-[opacity,transform] motion-reduce:transition-none ${
                        isOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                      }`}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mx-auto mt-7 max-w-xl text-center text-base font-medium leading-7 text-text/82">
          Если остались сомнения, можно начать с короткого сообщения.
        </p>
      </div>
    </section>
  );
}
