"use client";

import { useInView } from "./useInView";

/** 스크롤이 닿으면 좌에서 우로 그어지는 경계선 */
export default function Rule({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <div
      ref={ref}
      className={`bp-rule bp-draw ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    />
  );
}
