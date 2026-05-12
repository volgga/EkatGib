import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary";
};

export function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-[#2f9ff0] text-white shadow-[0_10px_28px_rgba(61,169,252,0.22)] hover:-translate-y-0.5 hover:bg-[#1f94ea] hover:shadow-[0_14px_34px_rgba(61,169,252,0.28)]",
    secondary:
      "border border-border bg-white text-headline hover:border-secondary hover:bg-surface",
  };

  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center rounded-lg px-6 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
