"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * 관성 스크롤. 레퍼런스 사이트들의 '무게감'은 대부분 여기서 온다.
 *
 * 움직임을 원하지 않는 사용자에게는 켜지 않는다. 관성 스크롤은
 * 전정기관 문제가 있는 사용자에게 특히 부담이 되고, 끄면 브라우저
 * 기본 스크롤이 그대로 동작하므로 잃는 기능이 없다.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    // 터치 기기에서는 켜지 않는다. OS 의 네이티브 모멘텀 스크롤과 겹치면
    // 오히려 미끄럽지 않고 어긋나는 느낌이 된다.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // 같은 페이지 안의 앵커(#history 등)도 관성 스크롤을 타게 한다
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      const hash = link?.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -100 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
