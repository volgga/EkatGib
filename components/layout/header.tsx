"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/lib/site-data";

const contacts = {
  phone: "+7 908 492-10-19",
  phoneHref: "tel:+79084921019",
  telegram: "https://t.me/kats_78",
  whatsapp: "https://wa.me/79084921019",
  max: "https://max.ru/u/f9LHodD0cOIyle2ubUzyhw2_pNBCGdDBrK_kCPsSevVXBK1DCtOo0cJOlVY",
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerNavItems = navItems.filter((item) => item.href !== "#contact");
  const mobileNavItems = [
    ...headerNavItems,
    { href: "#faq", label: "FAQ" },
  ];

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    function updateScrollState() {
      const scrollTop = window.scrollY;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

      setScrollProgress(scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0);
    }

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-white/80 shadow-[0_10px_34px_rgba(9,64,103,0.032)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3.5 md:px-8">
        <a
          href="#top"
          className="shrink-0 text-[0.95rem] font-semibold leading-[1.08] tracking-[0.01em] text-headline"
        >
          <span className="block">Гибадуллина</span>
          <span className="block">Екатерина</span>
        </a>
        <nav aria-label="Основная навигация" className="hidden md:block">
          <ul className="flex h-10 items-center gap-4 text-sm font-medium leading-none text-text lg:gap-6">
            {headerNavItems.map((item) => (
              <li key={item.href}>
                <a className="nav-link-underline transition-colors hover:text-headline" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex h-10 shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            className="hidden h-10 items-center text-[0.95rem] font-semibold leading-none text-headline/84 transition-colors hover:text-button lg:inline-flex"
            href={contacts.phoneHref}
          >
            {contacts.phone}
          </a>
          <div className="hidden h-10 items-center gap-1 md:flex">
            <IconLink href={contacts.telegram} label="Написать в Telegram">
              <TelegramIcon />
            </IconLink>
            <IconLink href={contacts.whatsapp} label="Написать в WhatsApp">
              <WhatsAppIcon />
            </IconLink>
            <IconLink href={contacts.max} label="MAX">
              <span className="text-[0.58rem] font-bold leading-none tracking-[0.045em] text-headline/76">
                MAX
              </span>
            </IconLink>
          </div>
          <a
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#2f9ff0] px-3 text-sm font-semibold leading-none text-white shadow-[0_8px_24px_rgba(61,169,252,0.20)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#1f94ea] hover:shadow-[0_14px_32px_rgba(61,169,252,0.28)] sm:px-4"
            href="#contact"
          >
            <span className="hidden sm:inline">Записаться</span>
            <span className="sm:hidden">Запись</span>
          </a>
          <button
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-white/75 text-headline shadow-[0_8px_22px_rgba(9,64,103,0.025)] transition-colors hover:border-secondary/50 hover:bg-surface md:hidden"
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300 ${
                  isMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2 h-px w-5 bg-current transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-300 ${
                  isMenuOpen ? "-translate-y-[0.45rem] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>
      <div className="h-0.5 bg-secondary/12">
        <div
          className="h-full bg-[linear-gradient(90deg,rgba(61,169,252,0.25),rgba(61,169,252,0.82),rgba(144,180,206,0.55))] transition-[width] duration-200 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <div
        className={`fixed inset-0 top-[4.25rem] z-20 bg-[rgba(247,251,255,0.74)] backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      <div
        className={`fixed inset-x-3 top-[4.75rem] z-30 origin-top overflow-hidden rounded-3xl border border-secondary/20 bg-[radial-gradient(circle_at_16%_8%,rgba(144,180,206,0.18),transparent_32%),linear-gradient(145deg,rgba(255,255,255,0.96)_0%,rgba(247,251,255,0.94)_100%)] shadow-[0_28px_86px_rgba(9,64,103,0.14)] backdrop-blur-xl transition-all duration-[420ms] ease-out md:hidden ${
          isMenuOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-3 scale-[0.98] opacity-0"
        }`}
      >
        <nav aria-label="Мобильная навигация" className="px-5 py-5">
          <div className="grid gap-1">
            {mobileNavItems.map((item) => (
              <a
                key={item.href}
                className="rounded-2xl px-4 py-3 text-lg font-semibold text-headline transition-colors hover:bg-surface"
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-secondary/18 pt-4">
            <a
              className="rounded-2xl border border-secondary/20 bg-white/70 px-4 py-3 text-sm font-semibold text-headline transition-colors hover:border-secondary/45"
              href={contacts.phoneHref}
              onClick={() => setIsMenuOpen(false)}
            >
              Телефон
            </a>
            <MobileContactLink href={contacts.telegram} label="Telegram" />
            <MobileContactLink href={contacts.whatsapp} label="WhatsApp" />
            <MobileContactLink href={contacts.max} label="MAX" />
          </div>

          <a
            className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-[#2f9ff0] px-5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(61,169,252,0.22)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#1f94ea] hover:shadow-[0_14px_34px_rgba(61,169,252,0.28)]"
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
          >
            Записаться
          </a>
        </nav>
      </div>
    </header>
  );
}

function MobileContactLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      aria-label={label}
      className="rounded-2xl border border-secondary/20 bg-white/70 px-4 py-3 text-sm font-semibold text-headline transition-colors hover:border-secondary/45"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {label}
    </a>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-white/75 text-headline/72 shadow-[0_8px_22px_rgba(9,64,103,0.025)] transition-all duration-300 ease-out hover:-translate-y-px hover:border-secondary/50 hover:bg-surface hover:text-headline hover:shadow-[0_12px_28px_rgba(9,64,103,0.052)]"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

function TelegramIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[1.08rem] w-[1.08rem]"
      fill="none"
      height="18"
      viewBox="0 0 24 24"
      width="18"
    >
      <path
        d="M20.4 4.7 3.9 11.1c-.9.35-.88 1.1-.15 1.32l4.2 1.3 1.6 5.05c.2.58.5.72.95.32l2.3-2.18 4.28 3.14c.78.43 1.33.2 1.52-.72l2.75-12.98c.28-1.12-.43-1.62-.95-1.65Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="m8.1 13.62 9.64-6.08-7.5 7.42-.3 3.55"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[1.08rem] w-[1.08rem]"
      fill="none"
      height="18"
      viewBox="0 0 24 24"
      width="18"
    >
      <path
        d="M5.2 19.05 6.1 16A7.6 7.6 0 1 1 8 17.86l-2.8 1.2Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M9.25 8.35c.18-.4.38-.42.72-.42h.45c.16 0 .38.04.58.46l.68 1.58c.12.28.1.5-.05.72l-.42.52c-.14.18-.12.36.03.58.38.6 1.02 1.4 1.84 1.86.24.14.42.14.6-.07l.65-.78c.2-.24.44-.25.7-.12l1.52.72c.34.16.46.34.42.62-.1.72-.76 1.54-1.56 1.72-.72.16-2.26-.08-4.1-1.62-1.78-1.48-2.9-3.28-3.03-4.14-.12-.82.36-1.44.45-1.62Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.45"
      />
    </svg>
  );
}
