const pillars = [
  {
    title: "Психология",
    text: "Снизить тревогу и понять чувства, границы и повторяющиеся сценарии.",
  },
  {
    title: "Медиация",
    text: "Вернуть разговор вместо взаимных обвинений и перейти к правилам и решениям.",
  },
  {
    title: "Юридическая психология",
    text: "Учитывать последствия решений для семьи, детей и всех участников конфликта.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="section-reveal relative scroll-mt-24 px-5 py-12 md:px-8 md:py-18">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-start lg:gap-18">
          <div className="max-w-[36rem] md:pt-3">
            <h2 className="text-3xl font-semibold leading-[1.16] text-headline md:text-[2.18rem] md:leading-[1.14] lg:text-[2.25rem]">
              <span className="block md:whitespace-nowrap">Помогаю пройти конфликт</span>
              <span className="block md:whitespace-nowrap">спокойнее и понятнее</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-text">
              Не только выговориться, но и понять, что происходит и как двигаться
              дальше.
            </p>
            <p className="mt-8 border-l border-accent/45 pl-5 text-lg font-semibold leading-8 text-headline">
              Важно не искать виноватого, а вернуть способность видеть ситуацию
              целиком.
            </p>
          </div>

          <div className="relative md:pt-2">
            <div className="relative grid gap-5 md:gap-7">
              {pillars.map((pillar, index) => (
                <article
                  key={pillar.title}
                  className={`relative rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.64)_0%,rgba(247,251,255,0.5)_100%)] px-5 py-4.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.62),0_12px_34px_rgba(9,64,103,0.03)] ring-1 ring-border/28 backdrop-blur-xl transition-all duration-300 hover:-translate-y-px hover:ring-secondary/35 md:w-[80%] ${
                    index === 0
                      ? "md:mr-auto"
                      : index === 1
                        ? "md:ml-auto md:mr-4"
                        : "md:ml-6 md:mr-auto"
                  }`}
                >
                  <h3 className="text-xl font-semibold text-headline">{pillar.title}</h3>
                  <p className="mt-2 leading-7 text-text">{pillar.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
