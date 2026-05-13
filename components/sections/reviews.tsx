"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";

const testimonials = [
  {
    name: "Ирина",
    text: "К Екатерине Вахитовне обращаюсь не первый раз. Несколько лет назад она помогла мне разобраться в тяжёлом решении о разводе и сохранить внутреннюю опору.\n\nПозже, когда расставание всё же произошло, начались конфликты, давление и манипуляции детьми. Казалось, что из этого невозможно выбраться.\n\nНа консультации мы спокойно разобрали ситуацию, выстроили чёткий план действий и границы. После одного разговора с бывшим мужем напряжение резко снизилось, а у нас с детьми наконец появилась спокойная жизнь.\n\nОгромная благодарность — самой справиться было бы очень тяжело.",
    featured: true,
  },
  {
    name: "Мама подростка",
    text: "Мы живём в Испании и долго не могли найти специалиста, с которым сын вообще захочет разговаривать. До этого прошли нескольких психологов без результата.\n\nС Екатериной Вахитовной контакт появился постепенно. Через несколько месяцев стало меньше агрессии, больше разговора и понимания, как нам быть рядом.",
  },
  {
    name: "Алина",
    text: "Я пришла в очень тяжёлом состоянии, когда не видела выхода и почти не верила, что станет легче. За несколько месяцев работы появилось ощущение опоры, силы и желания жить дальше. Сейчас я живу по-другому, занимаюсь творчеством и снова строю планы.",
  },
  {
    name: "Ирина, мама",
    text: "Я пришла с запросом о ребёнке, но постепенно поняла, что многое начинается с моего состояния. Когда я стала спокойнее и понятнее в общении, отношения дома тоже начали меняться.",
  },
  {
    name: "Марина",
    text: "Было ощущение, что любой разговор заканчивается обвинениями. На консультациях стало понятно, где мои границы, где ответственность другого человека и как говорить спокойнее.",
  },
  {
    name: "Ольга",
    text: "Для меня было важно, что меня не подталкивали к решениям и не говорили, как “правильно”. Появилось ощущение спокойствия и ясности.",
  },
  {
    name: "Дмитрий",
    text: "Я пришёл с ощущением полного тупика. Постепенно стало понятно, что конфликт — это не конец отношений, а то, с чем можно работать.",
  },
  {
    name: "Наталья",
    text: "Стало меньше тревоги и больше понимания, что делать дальше.",
  },
  {
    name: "Алексей и Марина",
    text: "Мы впервые за долгое время смогли спокойно обсудить тему развода без взаимных обвинений.",
  },
  {
    name: "Виктория",
    text: "После консультации стало понятнее, где мои границы и что я могу сделать уже сейчас.",
  },
];

const trustStats = ["1000+ клиентов", "5.0 оценка", "15 лет практики"];

export function Reviews() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlideHeight, setActiveSlideHeight] = useState<number | null>(null);
  const [isHeightReady, setIsHeightReady] = useState(false);
  const mobileSlideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const featuredReview = testimonials.find((review) => review.featured);
  const regularReviews = testimonials.filter((review) => !review.featured);
  const mobileSlides = [
    ...(featuredReview ? [{ kind: "featured" as const, review: featuredReview }] : []),
    ...regularReviews.slice(0, 2).map((review) => ({ kind: "review" as const, review })),
    ...regularReviews.slice(2).map((review) => ({ kind: "review" as const, review })),
  ];
  const alexeyReview = regularReviews.find((review) => review.name === "Алексей и Марина");
  const desktopColumns = [
    [
      regularReviews[8],
      regularReviews[6],
    ],
    [
      regularReviews[0],
      regularReviews[3],
      regularReviews[5],
    ],
    [
      regularReviews[1],
      regularReviews[2],
      regularReviews[4],
    ],
  ];
  const lastMobileSlideIndex = mobileSlides.length - 1;

  useEffect(() => {
    const activeElement = mobileSlideRefs.current[activeSlide];

    if (!activeElement) {
      return;
    }

    const updateHeight = () => {
      setActiveSlideHeight(activeElement.offsetHeight);
      setIsHeightReady(true);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(activeElement);
    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [activeSlide]);

  function goToMobileSlide(index: number) {
    const nextSlide = Math.min(Math.max(index, 0), lastMobileSlideIndex);
    const nextElement = mobileSlideRefs.current[nextSlide];

    if (nextElement) {
      setActiveSlideHeight(nextElement.offsetHeight);
      setIsHeightReady(true);
    }

    setActiveSlide(nextSlide);
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];

    if (!touch) {
      return;
    }

    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];

    touchStartRef.current = null;

    if (!start || !touch) {
      return;
    }

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) < 46 || Math.abs(deltaX) < Math.abs(deltaY) * 1.15) {
      return;
    }

    goToMobileSlide(activeSlide + (deltaX < 0 ? 1 : -1));
  }

  return (
    <section id="reviews" className="section-reveal relative scroll-mt-24 overflow-hidden px-5 py-11 md:px-8 md:py-16">
      <div className="absolute left-[-14rem] top-32 h-[28rem] w-[28rem] rounded-full bg-secondary/12 blur-3xl" />
      <div className="absolute bottom-[-12rem] right-[-16rem] h-[30rem] w-[30rem] rounded-full bg-button/5 blur-3xl" />
      <div className="mx-auto max-w-6xl">
        <div className="max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
            Отзывы
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-headline md:text-[2.25rem] lg:whitespace-nowrap">
            Живые фрагменты того, что меняется в работе
          </h2>
        </div>

        <div className="relative mt-5 lg:hidden">
          <div
            aria-label="Отзывы"
            className={`-mx-5 overflow-hidden px-5 [touch-action:pan-y] ${
              isHeightReady
                ? "transition-[height] duration-300 ease-out motion-reduce:transition-none"
                : ""
            }`}
            role="region"
            style={{ height: activeSlideHeight ? `${activeSlideHeight}px` : undefined }}
            onTouchEnd={handleTouchEnd}
            onTouchStart={handleTouchStart}
          >
            <div
              className="flex items-start transition-transform duration-300 ease-out will-change-transform motion-reduce:transition-none"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {mobileSlides.map((slide, index) => (
                <div
                  key={slide.review.name}
                  ref={(element) => {
                    mobileSlideRefs.current[index] = element;
                  }}
                  aria-hidden={activeSlide !== index}
                  className={`min-w-full transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                    activeSlide === index ? "opacity-100" : "opacity-70"
                  }`}
                >
                  {slide.kind === "featured" ? (
                    <FeaturedReview name={slide.review.name} text={slide.review.text} />
                  ) : (
                    <ReviewCard
                      name={slide.review.name}
                      text={slide.review.text}
                      compact={index > 3}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-center gap-3">
            <button
              aria-label="Предыдущий отзыв"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-secondary/28 bg-white/72 text-xl leading-none text-headline shadow-[0_8px_22px_rgba(9,64,103,0.035)] transition-all duration-200 hover:border-secondary/55 hover:bg-surface disabled:cursor-not-allowed disabled:opacity-35"
              disabled={activeSlide === 0}
              type="button"
              onClick={() => goToMobileSlide(activeSlide - 1)}
            >
              ‹
            </button>
            <div className="flex h-9 items-center justify-center gap-1.5">
              {mobileSlides.map((slide, index) => (
                <button
                  key={`${slide.review.name}-dot`}
                  aria-label={`Показать отзыв ${index + 1}`}
                  className="flex h-6 w-6 items-center justify-center rounded-full"
                  type="button"
                  onClick={() => goToMobileSlide(index)}
                >
                  <span
                    className={`h-2 rounded-full transition-all duration-300 ease-out ${
                      activeSlide === index
                        ? "w-6 bg-secondary shadow-[0_0_0_4px_rgba(144,180,206,0.10)]"
                        : "w-2 bg-secondary/30"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              aria-label="Следующий отзыв"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-secondary/28 bg-white/72 text-xl leading-none text-headline shadow-[0_8px_22px_rgba(9,64,103,0.035)] transition-all duration-200 hover:border-secondary/55 hover:bg-surface disabled:cursor-not-allowed disabled:opacity-35"
              disabled={activeSlide === lastMobileSlideIndex}
              type="button"
              onClick={() => goToMobileSlide(activeSlide + 1)}
            >
              ›
            </button>
          </div>
          <div className="mt-3">
            <TrustBar />
          </div>
        </div>

        <div className="relative mt-7 hidden gap-3 lg:grid lg:grid-cols-[1.14fr_1.9fr] lg:items-start">
          <div className="grid gap-3">
            {featuredReview ? (
              <FeaturedReview name={featuredReview.name} text={featuredReview.text} />
            ) : null}
            {desktopColumns[0].filter(Boolean).map((review) => (
              <ReviewCard key={review.name} name={review.name} text={review.text} compact />
            ))}
          </div>

          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-3">
                {desktopColumns[1].filter(Boolean).map((review) => (
                  <ReviewCard key={review.name} name={review.name} text={review.text} compact />
                ))}
              </div>

              <div className="grid gap-3">
                {desktopColumns[2].filter(Boolean).map((review, index) => (
                  <ReviewCard
                    key={review.name}
                    name={review.name}
                    text={review.text}
                    compact={index > 0}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <TrustCard />
              {alexeyReview ? (
                <ReviewCard
                  name={alexeyReview.name}
                  text={alexeyReview.text}
                  compact
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedReview({ name, text }: { name: string; text: string }) {
  return (
    <figure className="premium-card rounded-2xl border border-secondary/30 bg-[radial-gradient(circle_at_18%_10%,rgba(144,180,206,0.13),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.64)_0%,rgba(247,251,255,0.5)_100%)] p-4 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-secondary/55 md:p-5">
      <blockquote className="space-y-2 text-[0.98rem] leading-[1.62] text-text md:text-base">
        {text.split("\n\n").map((paragraph, index, paragraphs) => (
          <p
            key={paragraph}
            className={index === 0 ? "text-[1.05rem] font-semibold leading-7 text-headline" : ""}
          >
            {index === 0 ? "«" : ""}
            {paragraph}
            {index === paragraphs.length - 1 ? "»" : ""}
          </p>
        ))}
      </blockquote>
      <figcaption className="mt-4 border-t border-secondary/25 pt-3 text-lg font-semibold text-headline">
        {name}
      </figcaption>
    </figure>
  );
}

function ReviewCard({
  name,
  text,
  compact = false,
}: {
  name: string;
  text: string;
  compact?: boolean;
}) {
  return (
    <figure className="premium-card break-inside-avoid rounded-2xl border border-border/48 bg-[radial-gradient(circle_at_18%_8%,rgba(144,180,206,0.08),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.58)_0%,rgba(247,251,255,0.46)_100%)] p-4 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-secondary/48 md:p-5">
      <blockquote className={`${compact ? "space-y-2 text-[0.96rem] leading-6" : "space-y-2.5 text-base leading-7"} text-text`}>
        {text.split("\n\n").map((paragraph, index, paragraphs) => (
          <p key={paragraph}>
            {index === 0 ? "«" : ""}
            {paragraph}
            {index === paragraphs.length - 1 ? "»" : ""}
          </p>
        ))}
      </blockquote>
      <figcaption className={`${compact ? "mt-3" : "mt-4"} font-semibold text-headline`}>
        {name}
      </figcaption>
    </figure>
  );
}

function TrustCard() {
  return (
    <div className="rounded-2xl border border-secondary/22 bg-[radial-gradient(circle_at_16%_12%,rgba(144,180,206,0.15),transparent_34%),linear-gradient(145deg,rgba(247,251,255,0.56)_0%,rgba(255,255,255,0.48)_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.68),0_12px_34px_rgba(9,64,103,0.034)] backdrop-blur transition-all duration-500 ease-out hover:-translate-y-1 hover:border-secondary/42 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_18px_46px_rgba(9,64,103,0.055)] md:p-5">
      <dl className="grid grid-cols-3 gap-3">
        {trustStats.map((stat) => {
          const [value, ...label] = stat.split(" ");

          return (
            <div key={stat} className="text-center">
              <dt className="text-base font-semibold leading-none text-headline">
                {value}
              </dt>
              <dd className="mt-1 text-xs font-medium leading-4 text-text">
                {label.join(" ")}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

function TrustBar() {
  return (
    <div className="rounded-2xl border border-secondary/22 bg-[radial-gradient(circle_at_16%_10%,rgba(144,180,206,0.11),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.82)_0%,rgba(247,251,255,0.72)_100%)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_10px_28px_rgba(9,64,103,0.03)] backdrop-blur">
      <dl className="grid grid-cols-3 gap-2">
        {trustStats.map((stat) => {
          const [value, ...label] = stat.split(" ");

          return (
            <div key={stat} className="text-center">
              <dt className="text-sm font-semibold leading-none text-headline">{value}</dt>
              <dd className="mt-1 text-[0.68rem] font-medium leading-3 text-text">
                {label.join(" ")}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
