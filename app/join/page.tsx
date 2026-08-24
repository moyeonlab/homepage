import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import PageHero from "@/components/shared/PageHero";
import SectionLabel from "@/components/shared/SectionLabel";
import Badge from "@/components/shared/Badge";
import { recruitment, applicationSteps, targetCriteria, activityContent } from "@/content/recruitment";
import { faq } from "@/content/faq";
import { site } from "@/content/site";

export const metadata: Metadata = pageMeta({
  title: "지원하기",
  description:
    "모두의문제연구소 지원 대상, 활동 내용, 모집 정보와 FAQ를 안내합니다.",
  path: "/join",
});

const statusTone: Record<string, "soft" | "outline"> = {
  모집중: "soft",
  상시모집: "soft",
  모집예정: "outline",
  모집마감: "outline",
};

export default function JoinPage() {
  return (
    <>
      <PageHero
        label="JOIN MOYEON"
        title={"모두의 문제를 함께 해결할\n다음 사람을 기다립니다."}
        description="전공과 학년에 관계없이 데이터와 사회문제 해결에 관심 있는 한양대학교 학생이라면 누구나 지원할 수 있습니다."
      />

      <section className="container-page py-20 md:py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <SectionLabel>지원 대상</SectionLabel>
            <ul className="mt-6 space-y-3">
              {targetCriteria.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] text-[var(--color-text)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionLabel>활동 내용</SectionLabel>
            <ul className="mt-6 space-y-3">
              {activityContent.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] text-[var(--color-text)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-soft)]">
        <div className="container-page py-20 md:py-24">
          <SectionLabel>모집 정보</SectionLabel>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge tone={statusTone[recruitment.status]}>{recruitment.status}</Badge>
          </div>

          <dl className="mt-8 grid gap-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-7 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold text-[var(--color-text-muted)]">모집 기간</dt>
              <dd className="mt-1 text-sm font-medium text-[var(--color-text)]">
                {recruitment.startDate && recruitment.endDate
                  ? `${recruitment.startDate} ~ ${recruitment.endDate}`
                  : recruitment.periodNote ?? "업데이트 예정"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-[var(--color-text-muted)]">활동 기간</dt>
              <dd className="mt-1 text-sm font-medium text-[var(--color-text)]">
                {recruitment.activityPeriod ?? "업데이트 예정"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-[var(--color-text-muted)]">지원 대상</dt>
              <dd className="mt-1 text-sm font-medium text-[var(--color-text)]">{recruitment.target}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-[var(--color-text-muted)]">학회비</dt>
              <dd className="mt-1 text-sm font-medium text-[var(--color-text)]">
                {recruitment.fee ?? "업데이트 예정"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-[var(--color-text-muted)]">면접 여부</dt>
              <dd className="mt-1 text-sm font-medium text-[var(--color-text)]">
                {recruitment.interview ?? "업데이트 예정"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-[var(--color-text-muted)]">합격 발표일</dt>
              <dd className="mt-1 text-sm font-medium text-[var(--color-text)]">
                {recruitment.announceDate ?? "업데이트 예정"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-[var(--color-text-muted)]">접수 방법</dt>
              <dd className="mt-1 text-sm font-medium text-[var(--color-text)]">
                {recruitment.applyMethod ?? "업데이트 예정"}
              </dd>
            </div>
          </dl>

          {recruitment.notice && (
            <p className="mt-6 text-sm text-[var(--color-text-muted)]">{recruitment.notice}</p>
          )}

          <div className="mt-6">
            {recruitment.applicationUrl ? (
              <a
                href={recruitment.applicationUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-[15px] font-semibold text-white hover:bg-[var(--color-primary-600)]"
              >
                지원서 작성하기
              </a>
            ) : (
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center rounded-full border-2 border-[var(--color-primary)] px-6 py-3 text-[15px] font-semibold text-[var(--color-primary)] hover:bg-[var(--color-bg-blue-soft)]"
              >
                Instagram에서 모집 소식 확인하기
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <SectionLabel>지원 절차</SectionLabel>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-5">
          {applicationSteps.map((step, i) => (
            <li
              key={step}
              className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5 text-center"
            >
              <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-bg-blue-soft)] text-sm font-bold text-[var(--color-primary)]">
                {i + 1}
              </span>
              <p className="mt-3 text-sm font-semibold text-[var(--color-text)]">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[var(--color-bg-soft)]">
        <div className="container-page py-20 md:py-24">
          <SectionLabel>FAQ</SectionLabel>
          <div className="mt-8 divide-y divide-[var(--color-border)] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white">
            {faq.map((item) => (
              <details key={item.question} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-[var(--color-text)]">
                  {item.question}
                  <span
                    aria-hidden
                    className="shrink-0 text-[var(--color-accent)] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <SectionLabel>문의</SectionLabel>
        <p className="mt-4 text-[15px] text-[var(--color-text)]">
          {site.email ? (
            <a href={`mailto:${site.email}`} className="font-medium text-[var(--color-primary)] hover:underline">
              {site.email}
            </a>
          ) : (
            recruitment.contact
          )}
        </p>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          또는 공식 Instagram({site.instagramHandle})으로 문의하실 수 있습니다.
        </p>
      </section>
    </>
  );
}
