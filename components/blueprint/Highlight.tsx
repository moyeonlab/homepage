"use client";

import type { ReactNode } from "react";
import { useInView } from "./useInView";

/**
 * 글자 뒤에 형광펜처럼 그라데이션 띠가 좌에서 우로 채워진다.
 * 띠는 장식이고 글자 자체의 대비는 그대로라, 색을 못 보는 사용자도 내용을 잃지 않는다.
 */
export default function Highlight({ children }: { children: ReactNode }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.6);

  return (
    <span ref={ref} className={`bp-highlight ${inView ? "is-in" : ""}`}>
      {children}
    </span>
  );
}
