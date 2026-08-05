import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import PageHero from "@/components/shared/PageHero";
import SectionLabel from "@/components/shared/SectionLabel";
import ProcessTimeline from "@/components/shared/ProcessTimeline";
import HistoryTimeline from "@/components/shared/HistoryTimeline";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import RootsSection from "@/components/home/RootsSection";
import { site, coreValueList, processStepsDetailed } from "@/content/site";
import { advisor } from "@/content/people";
import { history } from "@/content/history";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata: Metadata = pageMeta({
  title: "모연 소개",
  description:
    "모두의문제연구소의 설립 배경, 핵심 가치, 활동 방식과 지도교수를 소개합니다.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="ABOUT MOYEON"
        title={"모두의 문제를 발견하고,\n모두의 해답을 만들어갑니다."}
        description="모두의문제연구소는 데이터와 다양한 관점을 통해 사회와 일상 속 문제를 탐구하는 한양대학교 학생 학회입니다."
      />

      <section className="container-page py-20 md:py-24">
        <SectionLabel>학회 소개</SectionLabel>
        <SectionHeading className="max-w-3xl">
          데이터보다 먼저, 문제를 바라봅니다.
        </SectionHeading>
        <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-base">
          <p>
            모두의문제연구소는 데이터 분석 자체를 목적으로 하지 않습니다. 우리가 일상과 사회 속에서
            함께 겪고 있는 문제를 발견하고, 그 문제를 더 정확하게 이해하기 위해 데이터를 활용합니다.
          </p>
          <p>
            다양한 학과의 학생들이 각자의 관점과 경험을 바탕으로 문제를 정의하고, 데이터를 수집하고
            분석합니다. 분석 결과는 카드뉴스, 보고서, 발표, 공모전 등 여러 형태로 공유하며 실질적인
            해결 방향을 제안합니다.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-bg-soft)]">
        <div className="container-page py-20 md:py-24">
          <SectionLabel>설립 배경</SectionLabel>
          <SectionHeading className="max-w-3xl">
            모두가 겪는 문제를, 함께 연구하기 위해 시작했습니다.
          </SectionHeading>
          <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-base">
            <p>
              모두의문제연구소는 한양대학교 수리데이터사이언스학과 {site.advisor}의 지도 아래{" "}
              {site.foundedYear}년 5월 창립되었습니다.
            </p>
            <p>
              데이터가 넘쳐나는 시대에 숫자를 단순히 해석하는 것을 넘어, 그 안에서 사회의 문제를
              발견하고 더 나은 해결책을 제시하는 것을 목표로 합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <SectionLabel>핵심 가치</SectionLabel>
        <SectionHeading className="max-w-3xl">
          모연이 지키는 6가지 기준
        </SectionHeading>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {coreValueList.map((value, i) => (
            <RevealOnScroll key={value.title} delay={i * 60}>
              <div className="h-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-sm)]">
                <p className="text-base font-bold text-[var(--color-primary)]">{value.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {value.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-primary-dark)] text-white">
        <div className="container-page py-20 md:py-24">
          <SectionLabel>활동 방식</SectionLabel>
          <SectionHeading dark className="max-w-3xl">
            질문에서 시작해, 해답으로 이어집니다.
          </SectionHeading>
          <div className="mt-14">
            <ProcessTimeline steps={processStepsDetailed.map((s) => s.title)} dark />
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {processStepsDetailed.map((step) => (
              <p key={step.title} className="text-sm leading-relaxed text-white/70">
                <span className="font-semibold text-white">{step.title}</span> — {step.description}
              </p>
            ))}
          </div>
        </div>
      </section>

      <RootsSection />

      <section className="container-page py-20 md:py-24">
        <SectionLabel>지도교수</SectionLabel>
        <div className="mt-8 flex max-w-md items-start gap-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-7 shadow-[var(--shadow-sm)]">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-xl font-bold text-white">
            정
          </div>
          <div>
            <p className="text-lg font-bold text-[var(--color-text)]">{advisor.name}</p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{advisor.department}</p>
            <p className="mt-1 text-sm font-medium text-[var(--color-accent)]">{advisor.role}</p>
            <p className="mt-3 text-xs text-[var(--color-text-muted)]">
              상세 약력과 인사말은 공식 자료 제공 시 추가될 예정입니다.
            </p>
          </div>
        </div>
      </section>

      <section id="history" className="scroll-mt-24 bg-[var(--color-bg-soft)]">
        <div className="container-page py-20 md:py-24">
          <SectionLabel>연혁</SectionLabel>
          <SectionHeading className="max-w-3xl">
            모연이 걸어온 길
          </SectionHeading>
          <div className="mt-12">
            <HistoryTimeline entries={history} />
          </div>
        </div>
      </section>
    </>
  );
}
