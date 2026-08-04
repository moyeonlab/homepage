import SectionLabel from "@/components/shared/SectionLabel";
import SectionHeading from "@/components/shared/SectionHeading";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { history } from "@/content/history";

export default function StatsSection() {
  const years = new Date().getFullYear() - site.foundedYear;

  // 확인되지 않은 수치는 쓰지 않는다. 아래 값은 모두 이 사이트에 실제 기록된 데이터에서 계산한 것.
  const stats = [
    { value: String(site.foundedYear), unit: "년", label: "학회 창립" },
    { value: String(years), unit: "년째", label: "이어온 활동" },
    { value: String(projects.length), unit: "개", label: "아카이브에 기록된 프로젝트" },
    { value: String(history.length), unit: "건", label: "기록된 활동 연혁" },
  ];

  return (
    <section className="bg-[var(--color-bg-soft)]">
      <div className="container-page py-20 md:py-28">
        <SectionLabel index="05">MOYEON IN NUMBERS</SectionLabel>
        <SectionHeading className="max-w-3xl">함께 쌓아온 모연의 기록</SectionHeading>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-base">
          {site.foundedYear}년부터 다양한 전공의 학생들과 사회문제를 데이터로 탐구하고 있습니다.
        </p>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-7 py-9">
              <dt className="text-sm font-medium text-[var(--color-text-muted)]">{s.label}</dt>
              <dd className="mt-3 flex items-baseline gap-1">
                <span className="font-eng text-4xl font-extrabold tracking-tight text-[var(--color-primary)] md:text-5xl">
                  {s.value}
                </span>
                <span className="text-base font-semibold text-[var(--color-text-muted)]">
                  {s.unit}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-5 text-xs text-[var(--color-text-muted)]">
          위 수치는 현재 홈페이지에 기록된 자료를 기준으로 합니다. 자료가 추가되면 함께 갱신됩니다.
        </p>
      </div>
    </section>
  );
}
