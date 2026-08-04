"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav, joinNavItem, site } from "@/content/site";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState(pathname);

  if (pathname !== menuPathname) {
    setMenuPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // 홈 최상단에서는 다크 Hero 위에 투명하게 얹는다
  const onDarkHero = pathname === "/" && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          onDarkHero
            ? "border-b border-transparent bg-transparent"
            : scrolled
              ? "border-b border-[var(--color-border)] bg-white/95 shadow-[var(--shadow-sm)] backdrop-blur"
              : "border-b border-transparent bg-white/70 backdrop-blur"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="flex items-center gap-2.5" aria-label="MOYEON 홈으로 이동">
            {/* 로고는 배경과 무관하게 항상 브랜드 원색을 유지한다 */}
            <Image
              src="/images/logo-mark.png"
              alt=""
              width={161}
              height={96}
              className="h-7 w-auto md:h-8"
              priority
            />
            <span className="flex flex-col leading-none">
              <span
                className={`font-eng text-lg font-extrabold tracking-tight md:text-xl ${
                  onDarkHero ? "text-white" : "text-[var(--color-primary)]"
                }`}
              >
                {site.nameEn}
              </span>
              <span
                className={`text-[11px] font-medium ${
                  onDarkHero ? "text-white/70" : "text-[var(--color-text-muted)]"
                }`}
              >
                {site.nameKo}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="주 메뉴">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-[15px] font-semibold transition-colors ${
                    onDarkHero
                      ? active
                        ? "text-white"
                        : "text-white/75 hover:text-white"
                      : active
                        ? "text-[var(--color-primary)]"
                        : "text-[var(--color-text)] hover:text-[var(--color-primary)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={joinNavItem.href}
              className={`rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors ${
                onDarkHero
                  ? "bg-white text-[var(--color-primary)] hover:bg-white/90"
                  : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-600)]"
              }`}
            >
              {joinNavItem.label}
            </Link>
          </nav>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full md:hidden"
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="relative block h-4 w-5" aria-hidden>
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 transition-transform ${
                  onDarkHero ? "bg-white" : "bg-[var(--color-text)]"
                } ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 transition-opacity ${
                  onDarkHero ? "bg-white" : "bg-[var(--color-text)]"
                } ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 transition-transform ${
                  onDarkHero ? "bg-white" : "bg-[var(--color-text)]"
                } ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-white md:hidden"
        >
          <nav className="container-page flex flex-col gap-1 py-6" aria-label="모바일 메뉴">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-xl px-4 py-4 text-lg font-semibold ${
                    active ? "bg-[var(--color-bg-blue-soft)] text-[var(--color-primary)]" : "text-[var(--color-text)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={joinNavItem.href}
              className="mt-4 rounded-full bg-[var(--color-primary)] px-5 py-4 text-center text-lg font-semibold text-white"
            >
              {joinNavItem.label}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
