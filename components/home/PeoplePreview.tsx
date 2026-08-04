import SectionLabel from "@/components/shared/SectionLabel";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";
import { advisor, currentOfficers, pastPresidents } from "@/content/people";

export default function PeoplePreview() {
  return (
    <section className="bg-[var(--color-bg-soft)]">
      <div className="container-page grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <div>
          <SectionLabel index="07">PEOPLE OF MOYEON</SectionLabel>
          <SectionHeading>
            다양한 관점이 모여,
            <br />
            하나의 해답을 만듭니다.
          </SectionHeading>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-base">
            모연은 특정 전공의 지식만으로 움직이지 않습니다. 서로 다른 경험과 관점을 가진 학생들이
            함께 문제를 정의하고 해결책을 만들어갑니다.
          </p>
          <div className="mt-8">
            <Button href="/people" variant="secondary">
              함께하는 사람들 보기
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-7 shadow-[var(--shadow-sm)]">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-lg font-bold text-white">
              정
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wider text-[var(--color-accent)]">
                지도교수
              </p>
              <p className="mt-1.5 text-lg font-bold text-[var(--color-text)]">{advisor.name}</p>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">{advisor.department}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-sm)]">
              <p className="text-xs font-semibold tracking-wider text-[var(--color-accent)]">
                역대 회장단
              </p>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--color-primary)]">
                {pastPresidents.length}
                <span className="ml-1 text-base font-semibold text-[var(--color-text-muted)]">
                  기
                </span>
              </p>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                {pastPresidents.map((p) => p.name).join(", ")}
              </p>
            </div>

            {currentOfficers.length === 0 ? (
              <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-text-muted)]/30 p-6">
                <p className="text-xs font-semibold tracking-wider text-[var(--color-text-muted)]">
                  현재 운영진
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  새로운 운영진 소개를 준비하고 있습니다.
                </p>
              </div>
            ) : (
              <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-sm)]">
                <p className="text-xs font-semibold tracking-wider text-[var(--color-accent)]">
                  현재 운영진
                </p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--color-primary)]">
                  {currentOfficers.length}
                  <span className="ml-1 text-base font-semibold text-[var(--color-text-muted)]">
                    명
                  </span>
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  5개 부서에서 함께하고 있습니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
