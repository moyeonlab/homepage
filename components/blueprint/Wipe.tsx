"use client";

import type { ReactNode } from "react";
import { useInView } from "./useInView";

/** 좌에서 우로 닦이며 드러나는 텍스트. */
export default function Wipe({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.2);

  return (
    <span ref={ref} className={`bp-wipe ${inView ? "is-in" : ""} ${className}`}>
      <span style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}>{children}</span>
    </span>
  );
}
