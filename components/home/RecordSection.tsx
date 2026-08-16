import SectionLabel from "@/components/shared/SectionLabel";
import SectionHeading from "@/components/shared/SectionHeading";
import HistoryTimeline from "@/components/shared/HistoryTimeline";
import Button from "@/components/shared/Button";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { history, homeHistoryCount } from "@/content/history";

/**
 * 숫자로 본 기록(구 StatsSection)과 연혁(구 HistoryPreview)을 한 섹션으로 합쳤다.
 * 둘 다 "모연이 쌓아온 것"이라는 같은 이야기여서, 나란히 두면 같은 말을 두 번 하게 된다.
 */
export default function RecordSection() {
  const years = new Date().getFullYear() - site.foundedYear;
  const recent = history.slice(-homeHistoryCount);

  // 확인되지 않은 수치는 쓰지 않는다. 아래 값은 모두 이 사이트에 실제 기록된 데이터에서 계산한 것.
  const stats = [
    { value: String(site.foundedYear), unit: "년", label: "학회 창립" },
    { value: String(years), unit: "년째", label: "이어온 활동" },
    { value: String(projects.length), unit: "개", label: "기록된 프로젝트" },
    { value: String(history.length), unit: "건", label: "기록된 활동 연혁" },
  ];

  return (
    <section className="bg-[var(--color-bg-soft)]">
      <div className="container-page py-16 md:py-20">
        <SectionLabel index="05">OUR RECORD</SectionLabel>
        <SectionHeading size="md" className="max-w-3xl">
          함께 쌓아온 모연의 기록
        </SectionHeading>

        {/* 숫자는 연혁의 요약이므로, 연혁 위에 얇은 띠로 얹는다 */}
        <dl className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-6 py-6">
              <dt className="text-sm font-medium text-[var(--color-text-muted)]">{s.label}</dt>
              <dd className="mt-2 flex items-baseline gap-1">
                <span className="font-eng text-3xl font-extrabold tracking-tight text-[var(--color-primary)] md:text-4xl">
                  {s.value}
                </span>
                <span className="text-base font-semibold text-[var(--color-text-muted)]">
                  {s.unit}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12">
          <HistoryTimeline entries={recent} />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <Button href="/about#history" variant="text" className="group">
            모연의 전체 연혁 보기
          </Button>
          <p className="text-xs text-[var(--color-text-muted)]">
            위 수치는 현재 홈페이지에 기록된 자료를 기준으로 합니다. 자료가 추가되면 함께 갱신됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}
