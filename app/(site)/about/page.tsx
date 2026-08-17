import type { Metadata } from "next";
import PageHead from "@/components/blueprint/PageHead";
import Section from "@/components/blueprint/Section";
import Rows from "@/components/blueprint/Rows";
import Wipe from "@/components/blueprint/Wipe";
import Highlight from "@/components/blueprint/Highlight";
import ScrollText from "@/components/blueprint/ScrollText";
import { site, coreValueList, processStepsDetailed } from "@/content/site";
import { advisor } from "@/content/people";
import { history } from "@/content/history";

export const metadata: Metadata = {
  title: "모연 소개 | MOYEON",
  description:
    "모두의문제연구소는 데이터를 통해 사회문제를 발견하고 해결책을 제안하는 한양대학교 ERICA 학생 학회입니다.",
};

export default function AboutPage() {
  const byYear = Array.from(new Set(history.map((h) => h.year))).sort((a, b) => a - b);

  return (
    <>
      <PageHead
        index="01"
        label="ABOUT MOYEON"
        title="문제는 어디에나 있고,"
        accent="데이터는 그 문제를 비춘다."
        description={site.description}
      />

      <section className="bp-dark relative overflow-hidden py-28 md:py-44">
        <span
          aria-hidden
          className="bp-orb"
          style={{
            width: 540, height: 540, left: "6%", top: "-20%",
            background: "radial-gradient(circle, #6d3fd4, transparent 70%)", opacity: 0.36,
          }}
        />
        <div className="bp-col relative">
          <Wipe>
            <p className="bp-label">설립 배경</p>
          </Wipe>
          <ScrollText
            className="mt-14 max-w-5xl text-[clamp(1.5rem,3.8vw,3.2rem)] leading-[1.38] bp-headline"
            text={`${site.nameKo}는 ${site.foundedYear}년 ${site.advisor}의 지도 아래 창립되었습니다. 전공의 경계를 넘어 같은 데이터를 다르게 읽는 것이 우리의 방식입니다.`}
            accentFrom={11}
          />
        </div>
      </section>

      <Section index="02" label="핵심 가치" title="모연이 붙잡고 있는 여섯 가지">
        <Rows
          items={coreValueList.map((v, i) => ({
            key: v.title,
            lead: String(i + 1).padStart(2, "0"),
            title: v.title,
            body: v.description,
          }))}
        />
      </Section>

      <Section
        index="03"
        label="활동 방식"
        title="여섯 단계로 문제를 해결합니다."
        dark
      >
        <Rows
          items={processStepsDetailed.map((s, i) => ({
            key: s.title,
            lead: `STEP ${String(i + 1).padStart(2, "0")}`,
            title: s.title,
            body: s.description,
          }))}
        />
      </Section>

      <Section index="04" label="지도교수">
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
          <Wipe>
            <span className="text-3xl bp-headline md:text-5xl">
              <Highlight>{advisor.name}</Highlight>
            </span>
          </Wipe>
          <Wipe delay={120}>
            <span className="text-[15px] text-[var(--bp-muted)]">{advisor.department}</span>
          </Wipe>
        </div>
        <Wipe delay={200}>
          <p className="mt-8 max-w-lg text-sm bp-body text-[var(--bp-muted)]">
            상세 약력과 인사말은 공식 자료 제공 시 추가될 예정입니다.
          </p>
        </Wipe>
      </Section>

      <section id="history" className="relative scroll-mt-32 overflow-hidden py-20 md:py-32">
        <div className="bp-col">
          <Wipe>
            <p className="bp-label">05 / 연혁</p>
          </Wipe>
          <h2 className="mt-6 max-w-4xl text-[clamp(1.7rem,4vw,3.4rem)] leading-[1.2] bp-headline">
            <Wipe delay={120}>
              <span>하나씩 기록해왔습니다.</span>
            </Wipe>
          </h2>

          <div className="mt-14">
            {byYear.map((year) => (
              <div key={year} className="grid gap-2 md:grid-cols-[8rem_1fr] md:gap-10">
                <Wipe>
                  <span className="font-display bp-grad-text pt-8 text-4xl font-bold md:text-5xl">
                    {year}
                  </span>
                </Wipe>
                <Rows
                  items={history
                    .filter((h) => h.year === year)
                    .map((e) => ({ key: `${e.month}-${e.title}`, lead: e.month, title: e.title }))}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
