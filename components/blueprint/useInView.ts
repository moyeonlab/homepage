"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 요소가 화면에 들어오면 한 번만 true 가 된다.
 * 등장 애니메이션은 되돌아가지 않는 편이 읽기에 편해서 disconnect 한다.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}
