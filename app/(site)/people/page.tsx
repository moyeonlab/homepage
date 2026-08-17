import type { Metadata } from "next";
import PageHead from "@/components/blueprint/PageHead";
import Section from "@/components/blueprint/Section";
import Rows from "@/components/blueprint/Rows";
import Wipe from "@/components/blueprint/Wipe";
import Highlight from "@/components/blueprint/Highlight";
import { advisor, currentOfficers, pastPresidents } from "@/content/people";

export const metadata: Metadata = {
  title: "함께하는 사람들 | MOYEON",
  description: "모두의문제연구소를 이끌어온 지도교수, 운영진, 역대 회장단을 소개합니다.",
};

export default function PeoplePage() {
  return (
    <>
      <PageHead
        index="04"
        label="PEOPLE OF MOYEON"
        title="다양한 관점이 모여,"
        accent="하나의 해답을 만듭니다."
        description="모연은 특정 전공의 지식만으로 움직이지 않습니다. 서로 다른 경험과 관점을 가진 학생들이 함께 문제를 정의하고 해결책을 만들어갑니다."
      />

      <Section index="01" label="지도교수">
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
          <Wipe>
            <span className="text-3xl bp-headline md:text-5xl">
              <Highlight>{advisor.name}</Highlight>
            </span>
          </Wipe>
          <Wipe delay={100}>
            <span className="bp-label">{advisor.role}</span>
          </Wipe>
          <Wipe delay={180}>
            <span className="text-[15px] text-[var(--bp-muted)]">{advisor.department}</span>
          </Wipe>
        </div>
      </Section>

      <Section index="02" label="현재 운영진" title="모연을 이끌어가는 사람들" dark>
        {currentOfficers.length === 0 ? (
          <Wipe>
            <p className="max-w-lg text-[15px] bp-body text-[var(--bp-muted)]">
              새로운 운영진 소개를 준비하고 있습니다.
            </p>
          </Wipe>
        ) : (
          <Rows
            items={currentOfficers.map((p) => ({
              key: p.name,
              lead: p.role,
              title: p.name,
              body: p.description,
            }))}
          />
        )}
      </Section>

      <Section index="03" label="역대 회장단" title="모연을 만들어온 시간">
        <Rows
          items={pastPresidents.map((p) => ({
            key: p.name,
            lead: p.generation ?? "—",
            title: p.name,
            body: p.role,
          }))}
        />
      </Section>
    </>
  );
}
