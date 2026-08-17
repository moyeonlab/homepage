import type { Metadata } from "next";
import Image from "next/image";
import PageHead from "@/components/blueprint/PageHead";
import Wipe from "@/components/blueprint/Wipe";
import { getNewsItems } from "@/lib/news";

export const metadata: Metadata = {
  title: "소식 | MOYEON",
  description: "스터디, 프로젝트 발표, 모집, 행사 — 모두의문제연구소의 활동 기록.",
};

export default function NewsPage() {
  const items = getNewsItems();

  return (
    <>
      <PageHead
        index="06"
        label="NEWS"
        title="모연의"
        accent="활동 기록."
        description="스터디, 프로젝트 발표, 모집, 행사 — 모두의문제연구소의 소식을 이곳에서 전합니다."
      />

      <section className="relative py-8 md:py-12">
        <div className="bp-col">
          <div>
            {items.map((item, i) => (
              <article key={item.id} className="border-t border-[var(--bp-line-strong)]">
                <div className="bp-row grid gap-6 py-10 md:grid-cols-[8rem_1fr_18rem] md:gap-10 md:py-12">
                  <Wipe delay={i * 50}>
                    <span className="bp-label pt-1">
                      {item.date}
                      <span className="mt-2 block !text-[var(--bp-accent)]">{item.category}</span>
                    </span>
                  </Wipe>

                  <Wipe delay={i * 50 + 60}>
                    <div>
                      <h2 className="bp-subhead text-xl leading-snug md:text-2xl">{item.title}</h2>
                      <p className="bp-body mt-4 max-w-2xl text-[15px] whitespace-pre-line text-[var(--bp-muted)]">
                        {item.body}
                      </p>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="bp-label mt-5 inline-flex items-center gap-2 !text-[var(--bp-text)] transition-colors hover:!text-[var(--bp-accent)]"
                        >
                          자세히 보기
                          <span aria-hidden>↗</span>
                          <span className="sr-only">(새 창으로 열림)</span>
                        </a>
                      )}
                    </div>
                  </Wipe>

                  {item.image && (
                    <Wipe delay={i * 50 + 120}>
                      <span className="block overflow-hidden">
                        <Image
                          src={item.image}
                          alt=""
                          width={720}
                          height={405}
                          className="h-auto w-full object-cover"
                        />
                      </span>
                    </Wipe>
                  )}
                </div>
              </article>
            ))}
            <div className="border-t border-[var(--bp-line-strong)]" />
          </div>
        </div>
      </section>
    </>
  );
}
