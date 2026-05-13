import { GoalLink } from "@/components/analytics/GoalLink";

export function Footer() {
  const navItems = [
    { href: "#about", label: "Обо мне" },
    { href: "#areas", label: "Запросы" },
    { href: "#pricing", label: "Стоимость" },
    { href: "#approach", label: "Подход" },
    { href: "#contact", label: "Записаться" },
  ];
  const contactLinks = [
    { href: "https://wa.me/79084921019", label: "WhatsApp", external: true, goal: "click_whatsapp" },
    { href: "https://t.me/kats_78", label: "Telegram", external: true, goal: "click_telegram" },
    {
      href: "https://max.ru/u/f9LHodD0cOIyle2ubUzyhw2_pNBCGdDBrK_kCPsSevVXBK1DCtOo0cJOlVY",
      label: "MAX",
      external: true,
      goal: "click_max",
    },
    { href: "tel:+79084921019", label: "+7 908 492-10-19", goal: "click_phone" },
  ];

  return (
    <footer className="section-reveal relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(ellipse_at_center,rgba(144,180,206,0.12),transparent_68%)]" />
      <div className="absolute right-[-16rem] top-[-18rem] h-[32rem] w-[32rem] rounded-full bg-white/38 blur-3xl" />
      <div className="absolute left-[-18rem] bottom-[-20rem] h-[34rem] w-[34rem] rounded-full bg-secondary/14 blur-3xl" />
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
              <GoalLink
                key={link.href}
                className="inline-flex min-h-9 items-center justify-center rounded-xl border border-secondary/20 bg-white/44 px-3 text-center text-xs font-semibold text-headline/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.62),0_8px_20px_rgba(9,64,103,0.018)] backdrop-blur transition-all duration-300 ease-out hover:-translate-y-px hover:border-secondary/45 hover:bg-white/68 hover:text-headline hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.76),0_12px_28px_rgba(9,64,103,0.04)]"
                href={link.href}
                goal={link.goal}
                rel={link.external ? "noopener noreferrer" : undefined}
                target={link.external ? "_blank" : undefined}
              >
                {link.label}
              </GoalLink>
            ))}
          </div>
          <GoalLink
            className="mt-4 inline-flex min-h-10 w-full max-w-[20rem] items-center justify-center rounded-xl border border-secondary/30 bg-white/58 px-4 text-sm font-semibold text-headline shadow-[inset_0_1px_0_rgba(255,255,255,0.68),0_10px_26px_rgba(9,64,103,0.03)] backdrop-blur transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-secondary/55 hover:bg-white/78 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_14px_34px_rgba(9,64,103,0.05)]"
            href="#contact"
            goal="click_floating_cta"
          >
            Оставить заявку
          </GoalLink>
        </div>
      </div>
      <div className="relative mx-auto max-w-6xl border-t border-secondary/14 px-5 py-4 text-xs text-text/68 shadow-[0_-1px_0_rgba(255,255,255,0.35)] md:px-8">
        © 2026 Гибадуллина Екатерина Вахитовна
      </div>
    </footer>
  );
}
