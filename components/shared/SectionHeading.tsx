import type { ReactNode } from "react";

/**
 * 섹션 제목 공통 스타일. 모든 섹션의 위계를 한곳에서 통일한다.
 * size: 페이지의 주요 섹션은 "lg", 뒷받침하는 섹션은 "md".
 *       모든 섹션이 같은 크기면 어디가 중요한지 읽는 사람이 알 수 없다.
 */
const sizes = {
  lg: "text-3xl md:text-5xl",
  md: "text-2xl md:text-4xl",
} as const;

export default function SectionHeading({
  children,
  dark = false,
  size = "lg",
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance mt-4 font-extrabold leading-[1.22] tracking-tight ${sizes[size]} ${
        dark ? "text-white" : "text-[var(--color-text)]"
      } ${className}`}
    >
      {children}
    </h2>
  );
}
