import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "text";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-600)] hover:-translate-y-0.5",
  secondary:
    "border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-bg-blue-soft)] hover:-translate-y-0.5",
  text: "px-0 py-0 rounded-none text-[var(--color-primary)] hover:text-[var(--color-primary-600)]",
};

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  children: ReactNode;
  fullWidthOnMobile?: boolean;
}

export default function Button({
  href,
  variant = "primary",
  children,
  fullWidthOnMobile,
  className = "",
  ...rest
}: ButtonProps) {
  const isText = variant === "text";
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${fullWidthOnMobile ? "w-full sm:w-auto" : ""} ${className}`}
      {...rest}
    >
      {children}
      {isText && (
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      )}
    </Link>
  );
}
