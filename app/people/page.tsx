import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SectionLabel from "@/components/shared/SectionLabel";
import { advisor, currentOfficers, departments, pastPresidents } from "@/content/people";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "함께하는 사람들 | MOYEON",
  description: "모두의문제연구소 지도교수, 운영진, 역대 회장단을 소개합니다.",
};

export default function PeoplePage() {
  return (
    <>
      <PageHero
        label="PEOPLE OF MOYEON"
        title={"서로 다른 관점이 모여,\n더 나은 해답을 만듭니다."}
        description="모연은 다양한 전공과 경험을 가진 학생들이 함께 문제를 바라보고 해결책을 만들어가는 학회입니다."
      />

      <section className="container-page py-20 md:py-24">
        <SectionLabel>지도교수</SectionLabel>
        <div className="mt-8 flex max-w-md items-start gap-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-7 shadow-[var(--shadow-sm)]">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-xl font-bold text-white">
            정
          </div>
          <div>
            <p className="text-lg font-bold text-[var(--color-text)]">{advisor.name}</p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{advisor.department}</p>
            <p className="mt-1 text-sm font-medium text-[var(--color-accent-ink)]">{advisor.role}</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-soft)]">
        <div className="container-page py-20 md:py-24">
          <SectionLabel>현재 운영진</SectionLabel>
          <SectionHeading>
            모연을 이끌어가는 사람들
          </SectionHeading>

          {currentOfficers.length === 0 ? (
            <div className="mt-10 rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] bg-white p-10 text-center text-[15px] text-[var(--color-text-muted)]">
              현재 운영진 명단과 소개는 업데이트 예정입니다.
            </div>
          ) : (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {currentOfficers.map((person) => (
                <div
                  key={person.name}
                  className="flex items-start gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-sm)]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-blue-soft)] text-base font-bold text-[var(--color-primary)]">
                    {person.name.slice(0, 1)}
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-[var(--color-accent-ink)]">
                      {person.role}
                    </p>
                    <p className="mt-1 text-base font-bold text-[var(--color-text)]">{person.name}</p>
                    {person.description && (
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-muted)]">
                        {person.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <SectionLabel>조직</SectionLabel>
        <SectionHeading className="max-w-3xl">
          다섯 갈래로 나뉘어,
          <br />
          하나의 방향으로 움직입니다.
        </SectionHeading>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-base">
          모연은 프로젝트만 하는 학회가 아닙니다. 기획부터 실행, 기록과 공유까지 이어질 수 있도록
          다섯 개 부서가 각자의 역할을 맡고 있습니다.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d) => (
            <div
              key={d.name}
              className="h-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-sm)]"
            >
              <p className="text-base font-bold text-[var(--color-primary)]">{d.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {d.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-bg-soft)]">
        <div className="container-page py-20 md:py-24">
        <SectionLabel>역대 회장단</SectionLabel>
        <SectionHeading>
          모연을 만들어온 시간
        </SectionHeading>
        <ul className="mt-10 divide-y divide-[var(--color-border)] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white">
          {pastPresidents.map((person) => (
            <li key={person.generation} className="flex items-center justify-between gap-4 px-6 py-5">
              <span className="text-sm font-semibold text-[var(--color-accent-ink)]">{person.generation}</span>
              <span className="flex-1 text-base font-medium text-[var(--color-text)]">{person.name}</span>
              <span className="text-sm text-[var(--color-text-muted)]">{person.role}</span>
            </li>
          ))}
        </ul>
        </div>
      </section>
    </>
  );
}
