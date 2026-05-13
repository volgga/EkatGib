import { ContactForm } from "@/components/sections/contact-form";

export function Contact() {
  return (
    <section id="contact" className="section-reveal premium-section-bleed relative scroll-mt-24 overflow-hidden px-5 py-11 md:px-8 md:py-24">
      <div className="absolute bottom-[-16rem] right-[-14rem] h-[30rem] w-[30rem] rounded-full bg-button/8 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-headline md:text-4xl">
            Начните с короткого сообщения
          </h2>
          <p className="mt-4 text-lg leading-8 text-text">
            Опишите ситуацию в свободной форме. Я свяжусь с вами удобным способом,
            чтобы обсудить формат первой онлайн-встречи.
          </p>
          <div className="mt-7 rounded-2xl border border-secondary/22 bg-[radial-gradient(circle_at_18%_12%,rgba(144,180,206,0.16),transparent_34%),linear-gradient(145deg,#ffffff_0%,#f7fbff_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.76),0_16px_48px_rgba(9,64,103,0.045)] md:mt-8">
            <p className="font-semibold text-headline">Формат</p>
            <p className="mt-2 leading-7 text-text">
              Онлайн-консультации проходят спокойно и конфиденциально. Возможна
              работа из любой страны.
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-white/88 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_22px_70px_rgba(9,64,103,0.065)] backdrop-blur md:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
