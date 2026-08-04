import type { ReactNode } from "react";

export default function Badge({
  children,
  tone = "soft",
}: {
  children: ReactNode;
  tone?: "soft" | "dark" | "outline";
}) {
  const tones = {
    soft: "bg-[var(--color-bg-blue-soft)] text-[var(--color-primary)]",
    dark: "bg-white/10 text-white",
    outline: "border border-[var(--color-border)] text-[var(--color-text-muted)]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
