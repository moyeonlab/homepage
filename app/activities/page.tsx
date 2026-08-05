import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import PageHero from "@/components/shared/PageHero";
import SectionLabel from "@/components/shared/SectionLabel";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import { processStepsDetailed, detailedActivities, bootcamp } from "@/content/site";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata: Metadata = pageMeta({
  title: "활동",
  description:
    "모두의문제연구소의 문제 해결 프로세스와 주요 활동을 소개합니다.",
  path: "/activities",
});

export default function ActivitiesPage() {
  return (
    <>
      <PageHero
        label="WHAT WE DO"
        title={"질문에서 시작해,\n변화를 위한 제안으로 완성합니다."}
        description="모연의 활동은 문제 발견, 데이터 분석, 해결책 제안, 결과 공유의 과정으로 이어집니다."
      />

      <section className="container-page py-20 md:py-24">
        <SectionLabel>문제 해결 프로세스</SectionLabel>
        <SectionHeading className="max-w-3xl">
          여섯 단계로 문제를 해결합니다.
        </SectionHeading>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {processStepsDetailed.map((step, i) => (
            <RevealOnScroll key={step.title} delay={i * 60}>
              <li className="h-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-sm)]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-bg-blue-soft)] text-sm font-bold text-[var(--color-primary)]">
                  {i + 1}
                </span>
                <p className="mt-4 text-base font-bold text-[var(--color-text)]">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {step.description}
                </p>
              </li>
            </RevealOnScroll>
          ))}
        </ol>
      </section>

      <section className="bg-[var(--color-bg-soft)]">
        <div className="container-page py-20 md:py-24">
          <SectionLabel>주요 활동 상세</SectionLabel>
          <SectionHeading className="max-w-3xl">
            모연이 활동하는 방식
          </SectionHeading>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {detailedActivities.map((activity, i) => (
              <RevealOnScroll key={activity.title} delay={i * 60}>
                <div className="h-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-7 shadow-[var(--shadow-sm)]">
                  <p className="text-lg font-bold text-[var(--color-text)]">{activity.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {activity.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <SectionLabel>교육사업</SectionLabel>
        <SectionHeading className="max-w-3xl">
          배운 것을 다시 나누는
          <br />
          데이터 부트캠프를 준비하고 있습니다.
        </SectionHeading>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[var(--color-bg-blue-soft)] px-3.5 py-1.5 text-sm font-semibold text-[var(--color-primary)]">
            {bootcamp.status}
          </span>
        </div>
        <ul className="mt-8 max-w-2xl space-y-3">
          {bootcamp.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--color-text)]"
            >
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
              />
              {point}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-[var(--color-text-muted)]">
          커리큘럼과 모집 일정은 확정되는 대로 안내드립니다.
        </p>
      </section>

      <section className="container-page pb-20 md:pb-24">
        <div className="rounded-[var(--radius-lg)] bg-[var(--color-bg-blue-soft)] p-8 text-center md:p-14">
          <h2 className="text-2xl font-extrabold tracking-tight text-[var(--color-text)] md:text-3xl">
            데이터 분석을 처음 시작해도 괜찮습니다.
          </h2>
          <p className="text-balance mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-base">
            모연은 데이터 분석 경험보다 문제를 바라보는 관심과 협업 의지를 중요하게 생각합니다.
            프로젝트에 필요한 기초 역량은 스터디와 팀 활동을 통해 함께 배울 수 있습니다.
          </p>
        </div>
      </section>
    </>
  );
}
