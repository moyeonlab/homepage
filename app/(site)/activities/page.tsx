import type { Metadata } from "next";
import PageHead from "@/components/blueprint/PageHead";
import Section from "@/components/blueprint/Section";
import Rows from "@/components/blueprint/Rows";
import Wipe from "@/components/blueprint/Wipe";
import Highlight from "@/components/blueprint/Highlight";
import Magnetic from "@/components/blueprint/Magnetic";
import Link from "next/link";
import { processStepsDetailed, detailedActivities, bootcamp, workSteps } from "@/content/site";

export const metadata: Metadata = {
  title: "활동 | MOYEON",
  description: "모두의문제연구소의 문제 해결 프로세스와 주요 활동을 소개합니다.",
};

export default function ActivitiesPage() {
  return (
    <>
      <PageHead
        index="02"
        label="WHAT WE DO"
        title="질문에서 시작해,"
        accent="변화를 위한 제안으로."
        description="모연의 활동은 문제 발견, 데이터 분석, 해결책 제안, 결과 공유의 과정으로 이어집니다."
      />

      {/* 3단계를 거대한 번호로 — 홈의 리듬을 그대로 이어받는다 */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="bp-col">
          <Wipe>
            <p className="bp-label">01 / 큰 흐름</p>
          </Wipe>
          <ol className="mt-16">
            {workSteps.map((step, i) => (
              <li key={step.key} className="border-t border-[var(--bp-line-strong)]">
                <div className="grid gap-6 py-14 md:grid-cols-[minmax(0,1fr)_1.1fr] md:gap-16 md:py-20">
                  <div>
                    <Wipe delay={i * 80}>
                      <span className="font-display bp-grad-text block text-[clamp(4rem,11vw,10rem)] leading-[0.85] font-bold">
                        {step.step}
                      </span>
                    </Wipe>
                    <Wipe delay={i * 80 + 120}>
                      <h3 className="mt-8 text-3xl leading-snug bp-headline md:text-5xl">
                        {step.title}
                      </h3>
                    </Wipe>
                  </div>
                  <div className="md:self-end md:pb-4">
                    <Wipe delay={i * 80 + 200}>
                      <span className="bp-label">{step.key}</span>
                    </Wipe>
                    <Wipe delay={i * 80 + 260}>
                      <p className="mt-5 max-w-md text-[15px] bp-body text-[var(--bp-muted)] md:text-base">
                        {step.description}
                      </p>
                    </Wipe>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <div className="border-t border-[var(--bp-line-strong)]" />
        </div>
      </section>

      <Section index="02" label="문제 해결 프로세스" title="여섯 단계로 문제를 해결합니다." dark>
        <Rows
          items={processStepsDetailed.map((s, i) => ({
            key: s.title,
            lead: `STEP ${String(i + 1).padStart(2, "0")}`,
            title: s.title,
            body: s.description,
          }))}
        />
      </Section>

      <Section index="03" label="주요 활동" title="모연이 활동하는 방식">
        <Rows
          items={detailedActivities.map((a, i) => ({
            key: a.title,
            lead: String(i + 1).padStart(2, "0"),
            title: a.title,
            body: a.description,
          }))}
        />
      </Section>

      <Section index="04" label="교육사업" title="배운 것을 다시 나누는 데이터 부트캠프">
        <Wipe>
          <span className="bp-label !text-[var(--bp-accent)]">현재 — {bootcamp.status}</span>
        </Wipe>
        <ul className="mt-10 max-w-2xl">
          {bootcamp.points.map((point, i) => (
            <li key={point} className="border-t border-[var(--bp-line-strong)] py-6">
              <Wipe delay={i * 70}>
                <span className="block text-[15px] bp-body md:text-base">{point}</span>
              </Wipe>
            </li>
          ))}
          <li className="border-t border-[var(--bp-line-strong)]" />
        </ul>
        <Wipe delay={200}>
          <p className="mt-8 text-sm text-[var(--bp-muted)]">
            커리큘럼과 모집 일정은 확정되는 대로 안내드립니다.
          </p>
        </Wipe>
      </Section>

      <section
        className="bp-dark relative overflow-hidden py-28 md:py-40"
        style={{ background: "linear-gradient(135deg, #1b1450 0%, #2a3fa0 50%, #0d6e80 100%)" }}
      >
        <div className="bp-col relative">
          <h2 className="max-w-4xl text-[clamp(1.7rem,4.4vw,3.8rem)] leading-[1.2] bp-headline">
            <Wipe>
              <span>
                데이터 분석을 <Highlight>처음 시작해도</Highlight> 괜찮습니다.
              </span>
            </Wipe>
          </h2>
          <Wipe delay={200}>
            <p className="mt-8 max-w-xl text-[15px] bp-body text-[var(--bp-muted)] md:text-base">
              모연은 분석 경험보다 문제를 바라보는 관심과 협업 의지를 중요하게 생각합니다. 필요한
              기초 역량은 스터디와 팀 활동을 통해 함께 배울 수 있습니다.
            </p>
          </Wipe>
          <Wipe delay={320}>
            <span className="mt-12 inline-flex">
              <Magnetic>
                <Link
                  href="/join"
                  className="bp-label group inline-flex items-center gap-3 bg-white px-8 py-5 !text-[#1b1450] transition-opacity hover:opacity-90"
                >
                  지원 안내 보기
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Magnetic>
            </span>
          </Wipe>
        </div>
      </section>
    </>
  );
}
