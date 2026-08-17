"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { Project } from "@/lib/types";

/**
 * 프로젝트 목록. 행에 마우스를 올리면 썸네일이 커서를 따라온다.
 *
 * 목록은 조밀하게 유지하면서 이미지를 보여줄 수 있어서,
 * 카드 그리드보다 훨씬 밀도 있고 훑기 좋다.
 * 포인터가 없는 환경(터치·키보드)에서는 미리보기가 뜨지 않고
 * 목록 자체로 완결되므로 정보 손실이 없다.
 */
export default function HoverPreview({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // 스프링을 물려 커서보다 살짝 늦게 따라오게 한다
  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 });

  const onMove = (e: React.MouseEvent) => {
    const box = wrapRef.current?.getBoundingClientRect();
    if (!box) return;
    x.set(e.clientX - box.left);
    y.set(e.clientY - box.top);
  };

  return (
    <div ref={wrapRef} className="relative" onMouseMove={onMove}>
      <ul onMouseLeave={() => setActive(null)}>
        {projects.map((project, i) => (
          <li key={project.slug} className="border-t border-[var(--bp-line-strong)]">
            <Link
              href={`/projects/${project.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="bp-row group grid grid-cols-[3.5rem_1fr] items-baseline gap-x-5 gap-y-1 py-8 md:grid-cols-[4rem_8rem_1fr_2rem] md:gap-x-8 md:py-10"
            >
              <span className="font-display text-xs text-[var(--bp-muted)]">
                {project.year ?? "—"}
              </span>
              <span className="bp-label max-md:col-start-2">{project.category}</span>
              <span className="bp-headline text-2xl transition-colors duration-300 group-hover:text-[var(--bp-accent)] max-md:col-start-2 md:text-4xl">
                {project.title}
              </span>
              <span
                aria-hidden
                className="hidden text-[var(--bp-muted)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--bp-accent)] md:block md:justify-self-end"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="border-t border-[var(--bp-line-strong)]" />

      {/* 커서를 따라오는 썸네일. 장식이므로 화면 낭독기에서는 감춘다 */}
      <motion.div
        aria-hidden
        style={{ left: sx, top: sy }}
        className="pointer-events-none absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
      >
        {/* 썸네일이 없는 프로젝트는 미리보기를 띄우지 않는다 (자료 준비 중인 건들) */}
        {projects.map((project, i) =>
          !project.thumbnail ? null : (
          <div
            key={project.slug}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            style={{
              opacity: active === i ? 1 : 0,
              transform: `translate(-50%,-50%) scale(${active === i ? 1 : 0.9})`,
            }}
          >
            <Image
              src={project.thumbnail}
              alt=""
              width={520}
              height={340}
              className="h-[220px] w-[330px] object-cover"
            />
          </div>
          )
        )}
      </motion.div>
    </div>
  );
}
