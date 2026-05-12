export function Footer() {
  const navItems = [
    { href: "#about", label: "Обо мне" },
    { href: "#areas", label: "Запросы" },
    { href: "#pricing", label: "Стоимость" },
    { href: "#approach", label: "Подход" },
    { href: "#contact", label: "Записаться" },
  ];
  const contactLinks = [
    { href: "https://wa.me/79084921019", label: "WhatsApp", external: true },
    { href: "https://t.me/kats_78", label: "Telegram", external: true },
    {
      href: "https://max.ru/u/f9LHodD0cOIyle2ubUzyhw2_pNBCGdDBrK_kCPsSevVXBK1DCtOo0cJOlVY",
      label: "MAX",
      external: true,
    },
    { href: "tel:+79084921019", label: "+7 908 492-10-19" },
  ];

  return (
    <footer className="section-reveal relative overflow-hidden border-t border-secondary/20 bg-[radial-gradient(circle_at_86%_0%,rgba(255,255,255,0.62),transparent_30rem),radial-gradient(circle_at_12%_88%,rgba(9,64,103,0.08),transparent_26rem),linear-gradient(180deg,#eef6fb_0%,#ddebf3_100%)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-button/30 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/42 to-transparent" />
      <div className="absolute right-[-16rem] top-[-18rem] h-[32rem] w-[32rem] rounded-full bg-white/52 blur-3xl" />
      <div className="absolute left-[-18rem] bottom-[-20rem] h-[34rem] w-[34rem] rounded-full bg-secondary/18 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-7 px-5 py-8 text-sm text-text md:grid-cols-[1.18fr_0.68fr_0.92fr] md:gap-10 md:px-8 md:py-12">
        <div className="max-w-[25rem]">
          <p className="text-base font-semibold leading-snug text-headline md:text-lg">
            Гибадуллина Екатерина Вахитовна
          </p>
          <p className="mt-2.5 font-medium leading-6 text-text/86">
            Семейный психолог, медиатор, юридический психолог
          </p>
          <p className="mt-3 leading-6 text-text/82">
            Онлайн-консультации по всей России и из других стран.
          </p>
        </div>

        <nav aria-label="Навигация в футере">
          <p className="font-semibold text-headline">Разделы</p>
          <div className="mt-3 grid gap-1.5">
            {navItems.map((item) => (
              <a
                key={item.href}
              className="nav-link-underline w-fit py-0.5 text-text/82 transition-colors hover:text-headline"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <div>
          <p className="font-semibold text-headline">Связь</p>
          <div className="mt-3 grid max-w-[20rem] grid-cols-2 gap-2">
            {contactLinks.map((link) => (
              <a
                key={link.href}
                className="inline-flex min-h-9 items-center justify-center rounded-xl border border-secondary/20 bg-white/48 px-3 text-center text-xs font-semibold text-headline/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_20px_rgba(9,64,103,0.018)] backdrop-blur transition-all duration-300 ease-out hover:-translate-y-px hover:border-secondary/45 hover:bg-white/76 hover:text-headline hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_12px_28px_rgba(9,64,103,0.04)]"
                href={link.href}
                rel={link.external ? "noopener noreferrer" : undefined}
                target={link.external ? "_blank" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            className="mt-4 inline-flex min-h-10 w-full max-w-[20rem] items-center justify-center rounded-xl border border-secondary/30 bg-white/68 px-4 text-sm font-semibold text-headline shadow-[inset_0_1px_0_rgba(255,255,255,0.76),0_10px_26px_rgba(9,64,103,0.035)] backdrop-blur transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-secondary/55 hover:bg-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_14px_34px_rgba(9,64,103,0.055)]"
            href="#contact"
          >
            Оставить заявку
          </a>
        </div>
      </div>
      <div className="relative mx-auto max-w-6xl border-t border-secondary/18 px-5 py-4 text-xs text-text/68 shadow-[0_-1px_0_rgba(255,255,255,0.45)] md:px-8">
        © 2026 Гибадуллина Екатерина Вахитовна
      </div>
    </footer>
  );
}
