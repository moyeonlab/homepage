"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { primaryNav, joinNavItem } from "@/content/site";

/**
 * 좌측 고정 레일. 로고와 메뉴 토글만 남기고 나머지는 비운다.
 * 좁은 화면에서는 레일이 상단 바로 바뀐다.
 */
export default function Rail() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Esc 로 닫기 — 열린 오버레이에서 빠져나갈 키보드 경로
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 flex h-[88px] items-center justify-between px-6 lg:inset-y-0 lg:right-auto lg:h-auto lg:w-[var(--bp-gutter)] lg:flex-col lg:justify-start lg:px-0 lg:py-6">
        <Link
          href="/"
          aria-label="MOYEON 홈"
          className="flex items-center gap-2 lg:flex-col lg:gap-0"
        >
          <Image src="/images/logo-mark.png" alt="" width={161} height={96} className="h-6 w-auto" priority />
          <span className="font-display text-[11px] font-bold tracking-[0.2em] lg:hidden">
            MOYEON
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="bp-menu"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          className="flex h-11 w-11 items-center justify-center lg:mt-8"
        >
          <span aria-hidden className="relative block h-3.5 w-4">
            <span
              className={`absolute left-0 h-px w-4 bg-[var(--bp-text)] transition-transform duration-300 ${
                open ? "top-[7px] rotate-45" : "top-0.5"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-4 bg-[var(--bp-text)] transition-transform duration-300 ${
                open ? "top-[7px] -rotate-45" : "top-[11px]"
              }`}
            />
          </span>
        </button>
      </div>

      {/* 지원 유도는 항상 화면에 떠 있다 */}
      <Link
        href={joinNavItem.href}
        className="bp-label fixed top-0 right-6 z-40 hidden h-[88px] items-center gap-2 lg:flex !text-[var(--bp-text)] transition-colors hover:!text-[var(--bp-accent)]"
      >
        {joinNavItem.label}
        <span aria-hidden>→</span>
      </Link>

      {open && (
        <nav
          id="bp-menu"
          aria-label="주 메뉴"
          className="fixed inset-0 z-30 flex flex-col justify-center gap-2 bg-[var(--bp-bg)] px-8 lg:pl-[calc(var(--bp-gutter)+40px)]"
        >
          {[...primaryNav, joinNavItem].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="bp-headline group flex items-baseline gap-5 py-2 text-4xl text-[var(--bp-text)] transition-colors hover:text-[var(--bp-accent)] md:text-6xl"
            >
              <span className="bp-label w-8 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
