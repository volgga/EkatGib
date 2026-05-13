const processSteps = [
  {
    title: "Написать и договориться",
    text: "Вы коротко описываете, что происходит, и выбираете удобное время для видеосвязи.",
  },
  {
    title: "Спокойно обсудить ситуацию",
    text: "На первой встрече мы не спешим: отделяем факты от тревоги и постепенно проясняем, что сейчас важнее всего.",
  },
  {
    title: "Понять следующий безопасный шаг",
    text: "После разговора появляется больше ясности: что можно сделать дальше и где сейчас ваша опора.",
  },
];

export function Process() {
  return (
    <section className="section-reveal relative px-5 py-12 md:px-8 md:py-24">
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-start lg:gap-16">
          <div className="max-w-xl md:pt-4">
            <h2 className="max-w-lg text-3xl font-semibold leading-[1.12] text-headline md:text-4xl md:leading-[1.1]">
              Спокойный сценарий первого обращения
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-text/95">
              Большинство людей приходят не с чётким запросом, а с ощущением, что
              стало слишком тяжело. Не нужно готовиться заранее.
            </p>
            <div className="mt-8 max-w-md bg-[radial-gradient(circle_at_12%_50%,rgba(144,180,206,0.18),transparent_56%)] py-3 pl-1 pr-4">
              <p className="border-l border-accent/45 pl-5 text-lg font-semibold leading-8 text-headline">
                Этого уже достаточно для начала разговора.
              </p>
            </div>
          </div>

          <div className="relative max-w-2xl md:ml-auto md:w-[92%]">
            <div className="absolute bottom-12 left-[0.375rem] top-5 w-px -translate-x-1/2 bg-gradient-to-b from-secondary/10 via-secondary/34 to-secondary/10" />
            <ol className="relative grid gap-9 md:gap-11">
              {processSteps.map((step, index) => (
                <li key={step.title} className="group relative grid grid-cols-[0.85rem_1fr] gap-5">
                  <span
                    className={`relative mt-2 h-3 w-3 rounded-full border bg-white shadow-[0_0_0_5px_rgba(144,180,206,0.09)] transition-all duration-300 ease-out motion-safe:group-hover:scale-110 motion-safe:group-hover:shadow-[0_0_0_6px_rgba(144,180,206,0.14)] ${
                      index === 0
                        ? "border-secondary/65 motion-safe:group-hover:border-secondary"
                        : index === 1
                          ? "border-secondary/50 motion-safe:group-hover:border-secondary/80"
                          : "border-secondary/38 motion-safe:group-hover:border-secondary/70"
                    }`}
                  />
                  <div className="max-w-2xl rounded-2xl px-1 py-0.5 transition-all duration-300 ease-out motion-safe:group-hover:bg-white/38 motion-safe:group-hover:opacity-95">
                    <h3 className="text-xl font-semibold leading-tight text-headline">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 leading-8 text-text/95">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
