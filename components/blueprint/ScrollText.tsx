"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

/**
 * 스크롤 진행에 맞춰 어절이 하나씩 밝아진다.
 * 읽는 속도와 스크롤 속도를 묶어서, 문장을 '읽게' 만든다.
 */
export default function ScrollText({
  text,
  accentFrom,
  className = "",
}: {
  text: string;
  /** 이 어절 인덱스부터는 강조색으로 */
  accentFrom?: number;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: ref,
    // 섹션이 화면 아래에서 올라와 가운데를 지날 때까지를 0 -> 1 로 본다
    offset: ["start 0.85", "start 0.25"],
  });

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          accent={accentFrom !== undefined && i >= accentFrom}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);

  return (
    <span className="mr-[0.28em] inline-block">
      <motion.span style={{ opacity }} className={accent ? "text-[var(--bp-accent)]" : undefined}>
        {children}
      </motion.span>
    </span>
  );
}
