import type { ComponentPropsWithoutRef, ReactNode } from "react";

type FieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

export function Field({ label, error, children }: FieldProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-headline">
      <span>{label}</span>
      {children}
      {error ? <span className="text-sm text-danger">{error}</span> : null}
    </label>
  );
}

export function inputClassName(className = "") {
  return `min-h-12 w-full rounded-2xl border border-border/55 bg-white/92 px-4 py-3 text-base text-headline shadow-[0_10px_28px_rgba(9,64,103,0.025)] transition-all duration-200 placeholder:text-text/50 hover:border-secondary/35 focus:border-secondary/70 focus:bg-white focus:outline-none focus:ring-4 focus:ring-secondary/14 ${className}`;
}

export function Input(props: ComponentPropsWithoutRef<"input">) {
  return <input className={inputClassName()} {...props} />;
}

export function Textarea(props: ComponentPropsWithoutRef<"textarea">) {
  return <textarea className={inputClassName("min-h-28 resize-y leading-7")} {...props} />;
}
