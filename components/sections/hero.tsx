import Image from "next/image";

export function Hero() {
  return (
    <section id="top" className="section-reveal premium-section-bleed relative overflow-hidden">
      <div className="absolute right-[-12rem] top-10 h-[34rem] w-[34rem] rounded-full bg-secondary/24 blur-3xl" />
      <div className="absolute right-[2rem] top-24 h-[26rem] w-[26rem] rounded-full bg-button/9 blur-3xl" />
      <div className="absolute left-[-18rem] top-44 h-[24rem] w-[24rem] rounded-full bg-button/8 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[#f7fbff]/26 to-[#f7fbff]/58" />
      <div className="relative mx-auto grid max-w-6xl gap-7 px-5 py-9 md:grid-cols-[0.94fr_0.86fr] md:items-center md:gap-12 md:px-8 md:py-20 lg:gap-20">
        <div className="max-w-[43rem]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            Семейный психолог · медиатор · юридический психолог
          </p>
          <h1 className="mt-5 max-w-[42rem] text-[2.38rem] font-semibold leading-[1.04] text-headline md:text-[4rem] md:leading-[1.01]">
            «Не знаю, как жить дальше и что делать»
          </h1>
          <p className="mt-5 max-w-[39rem] text-lg leading-8 text-text/88 md:text-xl">
            Если эта мысль стала постоянной, я помогу остановиться, выдохнуть и
            вернуть ощущение опоры под ногами.
          </p>
          <p className="mt-4 max-w-[36rem] text-base leading-8 text-text/86">
            Я работаю с семьями, парами, родителями и подростками с 2011 года:
            спокойно, бережно и с вниманием к юридическому контексту конфликта.
          </p>
          <div className="mt-8 hidden flex-col gap-3 md:flex md:flex-row">
            <a
              className="cta-breathe inline-flex min-h-12 items-center justify-center rounded-lg bg-[#2f9ff0] px-6 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(61,169,252,0.24)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#1f94ea] hover:shadow-[0_18px_44px_rgba(61,169,252,0.32)]"
              href="#contact"
            >
              Записаться на консультацию
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border/80 bg-white/82 px-6 text-sm font-semibold text-headline shadow-[0_8px_24px_rgba(9,64,103,0.025)] backdrop-blur transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-secondary hover:bg-surface hover:shadow-[0_12px_30px_rgba(9,64,103,0.045)]"
              href="#areas"
            >
              С чем я работаю
            </a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[25rem] pt-2 md:mr-0 md:max-w-[27rem] md:pt-6">
          <div className="hero-badge-float absolute -left-3 top-16 z-10 rounded-xl border border-white/75 bg-white/72 px-4 py-3 text-sm font-semibold text-headline shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_14px_36px_rgba(9,64,103,0.08)] backdrop-blur-xl transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_18px_44px_rgba(9,64,103,0.11)] md:-left-10">
            Онлайн по всей России
          </div>
          <div className="hero-badge-float animation-delay-2 absolute -right-1 top-40 z-10 rounded-xl border border-white/75 bg-white/72 px-4 py-3 text-sm font-semibold text-headline shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_14px_36px_rgba(9,64,103,0.08)] backdrop-blur-xl transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_18px_44px_rgba(9,64,103,0.11)] md:-right-8">
            15 лет практики
          </div>
          <div className="hero-badge-float animation-delay-3 absolute -bottom-3 left-8 z-10 rounded-xl border border-white/75 bg-white/72 px-4 py-3 text-sm font-semibold text-headline shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_14px_36px_rgba(9,64,103,0.08)] backdrop-blur-xl transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_18px_44px_rgba(9,64,103,0.11)]">
            1000+ клиентов
          </div>
          <div className="absolute -inset-7 rounded-[2.4rem] bg-[radial-gradient(circle_at_54%_34%,rgba(144,180,206,0.34),transparent_54%),radial-gradient(circle_at_76%_70%,rgba(61,169,252,0.12),transparent_38%)] blur-2xl" />
          <div className="image-float relative aspect-[4/5] min-h-[24rem] overflow-hidden rounded-2xl bg-[#f7fbff] shadow-[0_28px_92px_rgba(9,64,103,0.14),inset_0_2px_0_rgba(255,255,255,0.86)] ring-1 ring-white/75 md:min-h-[32rem]">
            <Image
              src="/images/ekaterina-beach.webp"
              alt="Екатерина на прогулке у моря"
              fill
              priority
              sizes="(min-width: 768px) 27rem, calc(100vw - 2.5rem)"
              className="object-cover object-[52%_34%]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_48%,rgba(9,64,103,0.08)_100%),linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_42%,rgba(255,255,255,0.10)_100%)]" />
          </div>
        </div>
        <div className="flex flex-col gap-3 md:hidden">
          <a
            className="cta-breathe inline-flex min-h-12 items-center justify-center rounded-xl bg-[#2f9ff0] px-6 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(61,169,252,0.24)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#1f94ea]"
            href="#contact"
          >
            Записаться на консультацию
          </a>
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border/80 bg-white/82 px-6 text-sm font-semibold text-headline shadow-[0_8px_24px_rgba(9,64,103,0.025)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-secondary hover:bg-surface"
            href="#areas"
          >
            С чем я работаю
          </a>
        </div>
      </div>
    </section>
  );
}
