const pricingOptions = [
  {
    title: "Индивидуальная консультация",
    price: "3000",
    description:
      "Подходит, если вы хотите спокойно разобраться в ситуации, тревоге, отношениях или сложном решении.",
  },
  {
    title: "Консультация пары",
    price: "5000",
    description:
      "Для пар и семейных ситуаций, где важно услышать друг друга и вернуть разговор без обвинений.",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="section-reveal premium-section-bleed relative scroll-mt-24 overflow-hidden px-5 py-11 md:px-8 md:py-22">
      <div className="absolute right-[-16rem] top-24 h-[32rem] w-[32rem] rounded-full bg-secondary/14 blur-3xl" />
      <div className="mx-auto max-w-6xl">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold leading-tight text-headline md:text-4xl">
          Форматы консультаций
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg leading-8 text-text">
          Выберите формат, который подходит вашей ситуации. Если понадобится
          несколько встреч, обсудим удобные условия заранее.
        </p>
        <div className="relative mt-8 grid items-stretch gap-4 md:mt-10 md:grid-cols-2 md:gap-5">
          {pricingOptions.map((item, index) => (
            <article
              key={item.title}
              className={`premium-card h-full rounded-2xl border p-5 transition-all duration-500 ease-out hover:-translate-y-1 md:p-9 ${
                index === 1
                  ? "border-secondary/34 bg-[radial-gradient(circle_at_18%_12%,rgba(144,180,206,0.15),transparent_34%),linear-gradient(145deg,#ffffff_0%,#eef6fb_100%)]"
                  : "border-border/55 bg-[linear-gradient(145deg,#ffffff_0%,#f7fbff_100%)]"
              }`}
            >
              <div className="flex min-h-full flex-col">
                <h3 className="text-xl font-semibold text-headline">{item.title}</h3>
                <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-2 border-y border-secondary/16 py-5 md:mt-6 md:gap-x-5 md:py-6">
                  <p className="leading-none text-headline">
                    <span className="mr-2 align-baseline text-sm font-semibold uppercase tracking-[0.12em] text-headline/48">
                      от
                    </span>
                    <span className="text-[2.7rem] font-semibold tracking-tight md:text-[3.3rem]">
                      {item.price}
                    </span>
                    <span className="ml-2 align-baseline text-lg font-semibold text-headline/72 md:text-xl">
                      руб.
                    </span>
                  </p>
                  <p className="pb-1 text-sm font-medium text-text/62">40 минут</p>
                </div>
                <p className="mt-5 leading-7 text-text">{item.description}</p>
                <div className="flex-1" />
                <a
                  className={`mt-7 inline-flex min-h-11 w-full items-center justify-center rounded-xl px-5 text-sm font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 sm:w-auto ${
                    index === 1
                      ? "bg-[#2f9ff0] text-white shadow-[0_12px_30px_rgba(61,169,252,0.22)] hover:bg-[#238fdd] hover:shadow-[0_16px_36px_rgba(61,169,252,0.28)]"
                      : "border border-secondary/28 bg-white/72 text-headline shadow-[0_10px_26px_rgba(9,64,103,0.035)] hover:border-secondary/48 hover:bg-white"
                  }`}
                  href="#contact"
                >
                  Записаться
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="relative mx-auto mt-7 max-w-5xl overflow-hidden rounded-2xl border border-secondary/20 bg-[radial-gradient(circle_at_14%_8%,rgba(255,255,255,0.74),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.78)_0%,rgba(247,251,255,0.84)_58%,rgba(234,243,248,0.78)_100%)] px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_16px_48px_rgba(9,64,103,0.045)] md:px-8 md:py-6">
          <div className="absolute -right-20 -top-24 h-52 w-52 rounded-full bg-secondary/12 blur-3xl" />
          <div className="relative max-w-3xl">
            <p className="text-sm font-semibold text-accent">Гибкие условия</p>
            <p className="mt-3 leading-8 text-text">
              Иногда ситуацию невозможно спокойно разобрать за одну консультацию. В
              таких случаях можно обсудить специальные условия:{" "}
              <span className="font-semibold text-headline">скидку на пакет встреч</span>{" "}
              или{" "}
              <span className="font-semibold text-headline">
                бонусную сессию поддержки
              </span>
              .
            </p>
          </div>
        </div>
        <p className="mx-auto mt-5 w-fit max-w-full rounded-full border border-secondary/18 bg-white/48 px-4 py-1.5 text-center text-sm font-medium text-text/75 shadow-[0_8px_22px_rgba(9,64,103,0.018)] backdrop-blur">
          Онлайн · ежедневно 09:00 – 21:00 · время согласовываем индивидуально
        </p>
      </div>
    </section>
  );
}
