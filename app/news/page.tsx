import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/shared/PageHero";
import Badge from "@/components/shared/Badge";
import { getNewsItems } from "@/lib/news";

export const metadata: Metadata = {
  title: "소식 | MOYEON",
  description: "스터디, 프로젝트 발표, 모집, 행사 — 모두의문제연구소의 활동 기록.",
};

export default function NewsPage() {
  const items = getNewsItems();

  return (
    <>
      <PageHero
        label="NEWS"
        title={"모연의 활동 기록."}
        description="스터디, 프로젝트 발표, 모집, 행사 — 모두의문제연구소의 소식을 이곳에서 전합니다."
      />

      <section className="container-page py-20 md:py-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          {items.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-sm)]"
            >
              {item.image && (
                <div className="relative aspect-[16/9] w-full">
                  <Image src={item.image} alt="" fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
                </div>
              )}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <Badge>{item.category}</Badge>
                  <span className="text-sm text-[var(--color-text-muted)]">{item.date}</span>
                </div>
                <h2 className="mt-3 text-xl font-bold leading-snug tracking-tight text-[var(--color-text)]">
                  {item.title}
                </h2>
                <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-[var(--color-text-muted)]">
                  {item.body}
                </p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] hover:underline"
                  >
                    자세히 보기 ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
