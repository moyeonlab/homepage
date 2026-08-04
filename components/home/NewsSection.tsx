import Link from "next/link";
import SectionLabel from "@/components/shared/SectionLabel";
import SectionHeading from "@/components/shared/SectionHeading";
import { site } from "@/content/site";

export default function NewsSection() {
  return (
    <section className="bg-[var(--color-bg-soft)]">
      <div className="container-page py-20 md:py-28">
        <div className="flex flex-col items-start justify-between gap-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-8 md:flex-row md:items-center md:p-12">
          <div>
            <SectionLabel index="10">LATEST NEWS</SectionLabel>
            <SectionHeading className="max-w-xl !text-2xl md:!text-4xl">
              모연의 최근 활동을 만나보세요.
            </SectionHeading>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[var(--color-text-muted)]">
              스터디, 프로젝트 발표, 모집, 행사 — 모연의 소식을 확인해보세요.
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-3 md:w-auto">
            <Link
              href="/news"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--color-primary-600)]"
            >
              소식 전체 보기
              <span aria-hidden>→</span>
            </Link>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[var(--color-border)] px-6 py-3.5 text-[15px] font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              Instagram {site.instagramHandle}
            </a>
            {site.email && (
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[var(--color-border)] px-6 py-3.5 text-[15px] font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                {site.email}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
