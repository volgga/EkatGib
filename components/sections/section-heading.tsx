type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  text?: string;
};

export function SectionHeading({ eyebrow, title, text }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-headline md:text-4xl">
        {title}
      </h2>
      {text ? <p className="mt-4 text-lg leading-8 text-text">{text}</p> : null}
    </div>
  );
}
