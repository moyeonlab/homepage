"use client";

import { useEffect, useState } from "react";
import { useInView } from "./useInView";

/** 화면에 들어오면 0에서 목표값까지 올라가는 수치. 계측기가 값을 잡는 느낌. */
export default function Counter({ to, className = "" }: { to: number; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // 움직임을 원하지 않으면 한 프레임 만에 최종값에 도달한다
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 0 : 1100;

    let raf = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      // ease-out — 빠르게 올라가 천천히 멈춘다
      const p = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
