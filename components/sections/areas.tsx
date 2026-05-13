const primaryRequests = [
  {
    title: "Семейные кризисы",
    text: "Когда разговоры заканчиваются напряжением и молчанием.",
  },
  {
    title: "Разводы и расставания",
    text: "Если решение принять страшно, а оставаться как раньше уже невозможно.",
  },
  {
    title: "Детско-родительские отношения",
    text: "Когда контакт с ребёнком становится всё слабее.",
  },
];

const secondaryRequests = [
  "Трудные подростки",
  "Девиантное поведение",
  "Тревожные состояния",
  "Суицидальные мысли",
  "Школьные конфликты",
  "Семейная медиация",
  "Юридические конфликты",
  "Споры о детях",
];

export function Areas() {
  return (
    <section id="areas" className="section-reveal premium-section-bleed relative -mt-3 scroll-mt-24 overflow-hidden px-5 py-11 md:-mt-6 md:px-8 md:py-22">
      <div className="absolute right-[-14rem] top-28 h-[30rem] w-[30rem] rounded-full bg-secondary/14 blur-3xl" />
      <div className="absolute left-[-18rem] bottom-[-14rem] h-[34rem] w-[34rem] rounded-full bg-button/6 blur-3xl" />
      <div className="mx-auto max-w-6xl">
        <div className="relative max-w-4xl">
          <h2 className="text-2xl font-semibold leading-snug text-headline md:text-[2.45rem] md:leading-tight">
            Я работаю с ситуациями, где эмоции, отношения и ответственность
            переплетены. Здесь важно не давить, а постепенно возвращать ясность.
          </h2>
        </div>

        <div className="relative mt-8 grid gap-4 md:mt-10 lg:grid-cols-[1.03fr_0.94fr_1.03fr] lg:items-start">
          {primaryRequests.map((request, index) => (
            <article
              key={request.title}
              className={`premium-card rounded-2xl border bg-[linear-gradient(145deg,rgba(255,255,255,0.68)_0%,rgba(247,251,255,0.52)_100%)] px-5 py-5 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-secondary/38 md:px-6 md:py-6 ${
                index === 0
                  ? "border-secondary/22 bg-[linear-gradient(145deg,rgba(255,255,255,0.62)_0%,rgba(249,252,255,0.46)_100%)] lg:mt-7"
                  : index === 1
                    ? "border-secondary/28 bg-[radial-gradient(circle_at_18%_8%,rgba(144,180,206,0.14),transparent_32%),linear-gradient(145deg,rgba(255,255,255,0.64)_0%,rgba(238,246,251,0.62)_100%)] shadow-[0_24px_72px_rgba(9,64,103,0.055)]"
                    : "border-border/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.6)_0%,rgba(246,251,255,0.48)_100%)] lg:mt-4"
              }`}
            >
              <h3 className="text-xl font-semibold leading-tight text-headline md:text-2xl">
                {request.title}
              </h3>
              <p className="mt-3 max-w-xl leading-7 text-text">{request.text}</p>
            </article>
          ))}
        </div>

        <div className="relative mt-9 grid gap-7 overflow-hidden rounded-2xl border border-secondary/24 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.78),transparent_38%),radial-gradient(circle_at_86%_86%,rgba(61,169,252,0.08),transparent_34%),linear-gradient(135deg,#f5fafd_0%,#eaf3f8_48%,#deebf3_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_24px_78px_rgba(9,64,103,0.075)] md:mt-12 md:grid-cols-[0.92fr_1.08fr] md:p-9">
          <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-white/55 blur-3xl" />
          <div className="relative">
            <p className="text-sm font-semibold text-accent">Отдельный фокус</p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight text-headline">
              Работа с трудными подростками
            </h3>
            <p className="mt-5 rounded-r-2xl border-l border-accent/50 bg-white/36 px-5 py-4 text-xl font-semibold leading-8 text-headline shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] md:text-2xl md:leading-10">
              «Важно не победить подростка, а снова стать семьёй, где можно говорить».
            </p>
          </div>
          <div className="relative grid content-center gap-5 leading-8 text-text">
            <p>
              Обычно работа начинается с запроса родителей: что изменилось, где
              стало опасно или невозможно договориться.
            </p>
            <p>
              С ребёнком я работаю только с согласия родителей. Цель — не
              «исправить подростка», а помочь семье восстановить контакт и
              понятные правила общения.
            </p>
          </div>
        </div>

        <div className="relative mt-7 rounded-2xl border border-border/28 bg-white/42 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.74)] backdrop-blur md:mt-9 md:p-5">
          <p className="text-sm font-semibold text-accent">
            Также можно обратиться с темами
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {secondaryRequests.map((request) => (
              <div
                key={request}
                className="rounded-full border border-secondary/22 bg-white/58 px-3.5 py-1.5 text-sm font-semibold leading-5 text-headline/88 shadow-[0_7px_20px_rgba(9,64,103,0.018)] backdrop-blur transition-all duration-300 ease-out hover:-translate-y-px hover:border-secondary/45 hover:bg-white/78 hover:text-headline"
              >
                {request}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
