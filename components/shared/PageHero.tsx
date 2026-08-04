import SectionLabel from "./SectionLabel";
import type { ReactNode } from "react";

export default function PageHero({
  label,
  title,
  description,
}: {
  label: string;
  title: ReactNode;
  description: string;
}) {
  return (
    <section className="bg-[var(--color-bg-blue-soft)]">
      <div className="container-page py-16 md:py-24">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="text-balance mt-4 max-w-2xl whitespace-pre-line text-4xl font-extrabold leading-tight text-[var(--color-text)] md:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
