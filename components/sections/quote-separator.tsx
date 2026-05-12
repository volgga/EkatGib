type QuoteSeparatorProps = {
  children: string;
};

export function QuoteSeparator({ children }: QuoteSeparatorProps) {
  return (
    <section className="section-reveal relative -mt-2 overflow-hidden px-5 py-7 md:px-8 md:py-12">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-secondary/18 to-transparent" />
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-secondary/18 bg-[radial-gradient(circle_at_16%_18%,rgba(144,180,206,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.92)_0%,rgba(247,251,255,0.94)_58%,rgba(234,243,248,0.72)_100%)] px-5 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.76),0_18px_58px_rgba(9,64,103,0.045)] md:px-10 md:py-9">
        <div className="absolute -right-24 -top-28 h-64 w-64 rounded-full bg-secondary/16 blur-3xl" />
        <p className="relative max-w-4xl text-[1.42rem] font-semibold leading-snug text-headline md:text-[2rem] md:leading-tight">
          {children}
        </p>
      </div>
    </section>
  );
}
