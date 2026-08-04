"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SectionLabel from "@/components/shared/SectionLabel";
import SectionHeading from "@/components/shared/SectionHeading";
import { workSteps } from "@/content/site";

const DURATION = 5000; // 자동 전환 주기(ms)

export default function WorkShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // 화면에 보일 때만 자동 전환한다
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!onScreen || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % workSteps.length), DURATION);
    return () => clearTimeout(id);
  }, [active, onScreen, paused]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div aria-hidden className="bg-data-grid pointer-events-none absolute inset-0" />

      <div className="container-page relative py-20 md:py-28">
        <SectionLabel index="02">HOW WE WORK</SectionLabel>
        <SectionHeading className="max-w-3xl">우리는 이렇게 일합니다.</SectionHeading>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-base">
          하나의 문제가 해답이 되기까지, 모연이 거치는 세 단계입니다.
        </p>

        <div
          className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* 일러스트 — 순차적으로 교차 전환 */}
          <div className="relative order-1 aspect-square w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-primary-dark)] shadow-[var(--shadow-md)] lg:order-2">
            {workSteps.map((s, i) => (
              <div
                key={s.key}
                aria-hidden={i !== active}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  i === active ? "scale-100 opacity-100" : "scale-[1.05] opacity-0"
                }`}
              >
                <Image
                  src={s.image}
                  alt={`${s.title} 일러스트`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          {/* 단계 목록 — 클릭으로도 이동 가능 */}
          <ul className="order-2 space-y-2 lg:order-1">
            {workSteps.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.key}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={isActive ? "true" : undefined}
                    className={`w-full rounded-[var(--radius-md)] px-5 py-5 text-left transition-colors duration-300 ${
                      isActive
                        ? "bg-[var(--color-bg-blue-soft)]"
                        : "hover:bg-[var(--color-bg-soft)]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`font-eng text-xs transition-colors ${
                          isActive
                            ? "text-[var(--color-primary)]"
                            : "text-[var(--color-text-muted)]"
                        }`}
                      >
                        {s.step}
                      </span>
                      <span
                        className={`font-eng text-[11px] font-bold tracking-[0.18em] transition-colors ${
                          isActive
                            ? "text-[var(--color-accent)]"
                            : "text-[var(--color-text-muted)]"
                        }`}
                      >
                        {s.key}
                      </span>
                    </span>

                    <span
                      className={`mt-2 block text-lg font-bold tracking-tight transition-colors md:text-xl ${
                        isActive ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]"
                      }`}
                    >
                      {s.title}
                    </span>

                    {/* 활성 항목만 설명을 펼친다 */}
                    <span
                      className={`grid transition-all duration-500 ${
                        isActive ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <span className="overflow-hidden">
                        <span className="block text-[15px] leading-relaxed text-[var(--color-text-muted)]">
                          {s.description}
                        </span>
                      </span>
                    </span>

                    {/* 남은 시간 표시 */}
                    <span
                      aria-hidden
                      className="mt-4 block h-0.5 w-full overflow-hidden rounded-full bg-[var(--color-border)]"
                    >
                      <span
                        className={`block h-full origin-left rounded-full bg-[var(--color-accent)] transition-transform ease-linear ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                        style={{
                          transitionDuration: isActive && !paused ? `${DURATION}ms` : "300ms",
                        }}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
