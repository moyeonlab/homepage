import type { ReactNode } from "react";

/** 섹션 제목 공통 스타일. 모든 섹션의 위계를 한곳에서 통일한다. */
export default function SectionHeading({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance mt-4 text-3xl font-extrabold leading-[1.22] tracking-tight md:text-5xl ${
        dark ? "text-white" : "text-[var(--color-text)]"
      } ${className}`}
    >
      {children}
    </h2>
  );
}
