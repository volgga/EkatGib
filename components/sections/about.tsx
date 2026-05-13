"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/sections/section-heading";

const aboutAreas = [
  "Семейные кризисы",
  "Разводы и расставания",
  "Детско-родительские отношения",
  "Трудные подростки",
  "Девиантное поведение",
  "Школьные конфликты",
  "Тревожные состояния",
  "Суицидальные мысли",
  "Семейная медиация",
  "Юридические конфликты",
];

const workResults = [
  "300+ семейных и партнёрских кризисов, пройденных без разрушительных конфликтов",
  "Помощь подросткам и взрослым в тяжёлых эмоциональных состояниях и кризисах",
  "Поддержка людей с тревожными и суицидальными мыслями",
  "Более 500 клиентов, прошедших через сложные жизненные периоды с опорой и поддержкой",
];

const educationChips = [
  "Семейная психология",
  "Социальная психология",
  "Юридическая психология",
  "Медиация",
  "Педагогическая психология",
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const [imageOffset, setImageOffset] = useState<number | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
    let frameId: number | null = null;
    let latestOffset: number | null = null;

    function updateImageMotion() {
      frameId = null;
      const section = sectionRef.current;

      if (!section || reduceMotion.matches || !desktop.matches) {
        latestOffset = null;
        setImageOffset(null);

        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.52;
      const elementCenter = rect.top + rect.height / 2;
      const range = rect.height / 2 + viewportCenter;
      const distance = range > 0 ? (elementCenter - viewportCenter) / range : 0;
      const nextOffset = Math.round(Math.max(Math.min(distance, 1), -1) * -14);

      if (latestOffset !== nextOffset) {
        latestOffset = nextOffset;
        setImageOffset(nextOffset);
      }
    }

    function scheduleImageMotion() {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(updateImageMotion);
    }

    updateImageMotion();
    window.addEventListener("scroll", scheduleImageMotion, { passive: true });
    window.addEventListener("resize", scheduleImageMotion);
    reduceMotion.addEventListener("change", scheduleImageMotion);
    desktop.addEventListener("change", scheduleImageMotion);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", scheduleImageMotion);
      window.removeEventListener("resize", scheduleImageMotion);
      reduceMotion.removeEventListener("change", scheduleImageMotion);
      desktop.removeEventListener("change", scheduleImageMotion);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-reveal relative scroll-mt-24 px-5 py-12 md:px-8 md:pb-24 md:pt-20"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Обо мне" title="Профессиональная помощь в период, когда семье трудно говорить спокойно" />
        <div className="mt-10 grid gap-10 md:grid-cols-[0.82fr_1.18fr] md:items-start lg:gap-14">
          <div className="md:sticky md:top-28">
            <div
              ref={imageFrameRef}
              className="group relative aspect-[4/5] min-h-[280px] overflow-hidden rounded-2xl bg-surface shadow-[0_22px_72px_rgba(9,64,103,0.09)] ring-1 ring-white/70 transition-transform duration-700 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.006] md:min-h-[400px]"
            >
              <Image
                src="/images/ekaterina-hero.webp"
                alt="Гибадуллина Екатерина Вахитовна, семейный психолог"
                fill
                sizes="(min-width: 768px) 22rem, calc(100vw - 2.5rem)"
                className="object-cover object-[50%_28%] transition-transform duration-300 ease-out will-change-transform max-md:!transform-none motion-reduce:!transform-none md:scale-[1.035]"
                style={
                  imageOffset === null
                    ? undefined
                    : { transform: `translate3d(0, ${imageOffset}px, 0) scale(1.035)` }
                }
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_54%,rgba(9,64,103,0.08)_100%),linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_48%,rgba(255,255,255,0.42)_100%)]" />
              <div className="absolute bottom-5 left-5 rounded-full border border-white/75 bg-white/72 px-4 py-2 shadow-sm backdrop-blur-md">
                <p className="text-xs font-semibold text-headline">
                  Гибадуллина Екатерина Вахитовна
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-10 lg:space-y-11">
            <div className="max-w-[42rem]">
              <p className="text-xl leading-9 text-headline">
                Я — Гибадуллина Екатерина Вахитовна, семейный психолог, медиатор и
                юридический психолог со стажем практической работы более 15 лет.
              </p>
              <p className="mt-5 leading-8 text-text">
                С 2011 года я помогаю семьям, парам, подросткам и взрослым проходить
                сложные жизненные периоды без разрушительных решений и находить
                понятный путь дальше.
              </p>
              <p className="mt-5 leading-8 text-text">
                В своей работе я соединяю психологию, медиацию и юридический подход
                — особенно там, где конфликт уже влияет на отношения, детей и
                эмоциональное состояние семьи.
              </p>
              <div className="mt-5 rounded-xl border border-secondary/25 bg-white/62 px-4 py-4 text-sm leading-6 text-text shadow-[0_12px_32px_rgba(9,64,103,0.03)] backdrop-blur">
                <p className="font-semibold text-headline">Образование и квалификация</p>
                <p className="mt-2">
                  Высшее психологическое образование, специалитет по направлению
                  «Психология». Дополнительная профессиональная подготовка: семейная
                  психология, социальная психология, юридическая/криминальная
                  психология и медиация.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {educationChips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-secondary/20 bg-white/58 px-3 py-1 text-xs font-semibold leading-5 text-headline/82"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-headline">
                Направления моей работы
              </h3>
              <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {aboutAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-lg border border-border/70 bg-white px-4 py-3 text-sm font-semibold leading-6 text-headline"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border/60 bg-[radial-gradient(circle_at_12%_10%,rgba(144,180,206,0.14),transparent_34%),linear-gradient(145deg,rgba(247,251,255,0.88)_0%,rgba(255,255,255,0.92)_100%)] p-6 shadow-[0_20px_64px_rgba(9,64,103,0.045)] md:p-8">
              <h3 className="text-2xl font-semibold text-headline">
                Результаты работы
              </h3>
              <div className="mt-7 grid gap-5">
                {workResults.map((item) => (
                  <p
                    key={item}
                    className="max-w-[43rem] border-l border-accent/45 bg-white/45 py-1 pl-5 leading-8 text-headline"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
