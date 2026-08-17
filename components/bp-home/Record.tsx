import Link from "next/link";
import Wipe from "@/components/blueprint/Wipe";
import Counter from "@/components/blueprint/Counter";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { history } from "@/content/history";

/** 숫자와 연혁. 시간축 위에 사건이 찍힌 형태로 둔다. */
export default function Record() {
  const years = new Date().getFullYear() - site.foundedYear;

  // 확인되지 않은 수치는 쓰지 않는다. 전부 이 저장소에 실제 기록된 자료에서 계산한 값.
  const stats = [
    { to: years, unit: "년째", label: "이어온 활동" },
    { to: projects.length, unit: "건", label: "기록된 프로젝트" },
    { to: history.length, unit: "건", label: "기록된 연혁" },
  ];

  const byYear = Array.from(new Set(history.map((h) => h.year))).sort((a, b) => a - b);

  return (
    <section className="relative py-24 md:py-36">
      <div className="bp-col">
        <Wipe>
          <p className="bp-label">04 / 쌓아온 기록</p>
        </Wipe>

        <dl className="mt-14 grid gap-10 sm:grid-cols-3">
          {stats.map((s, i) => (
            <div key={s.label}>
              <Wipe delay={i * 80 + 60}>
                <dd className="font-display mt-6 flex items-baseline gap-1.5 text-6xl font-bold md:text-7xl">
                  <span className="bp-grad-text">
                    <Counter to={s.to} />
                  </span>
                  <span className="text-lg font-normal text-[var(--bp-muted)]">{s.unit}</span>
                </dd>
              </Wipe>
              <Wipe delay={i * 80 + 120}>
                <dt className="bp-label mt-3">{s.label}</dt>
              </Wipe>
            </div>
          ))}
        </dl>

        {/* 연도를 축으로 삼은 연혁 */}
        <div className="mt-24">
          {byYear.map((year, yi) => (
            <div key={year} className="grid gap-4 md:grid-cols-[6rem_1fr] md:gap-10">
              <Wipe delay={yi * 80}>
                <span className="font-display pt-8 text-2xl text-[var(--bp-accent)] md:text-3xl">
                  {year}
                </span>
              </Wipe>

              <ul>
                {history
                  .filter((h) => h.year === year)
                  .map((entry, i) => (
                    <li key={`${entry.month}-${entry.title}`}>
                      <div className="flex items-baseline gap-5 py-5">
                        <Wipe delay={i * 60}>
                          <span className="bp-label w-10 shrink-0">{entry.month}</span>
                        </Wipe>
                        <Wipe delay={i * 60 + 60}>
                          <span className="text-[15px] md:text-base">{entry.title}</span>
                        </Wipe>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <Wipe delay={120}>
          <span className="mt-12 inline-flex">
            <Link
              href="/about#history"
              className="bp-label group inline-flex items-center gap-3 !text-[var(--bp-text)] transition-colors hover:!text-[var(--bp-accent)]"
            >
              전체 연혁 보기
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </span>
        </Wipe>

        <p className="mt-8 text-xs text-[var(--bp-muted)]">
          위 수치는 현재 홈페이지에 기록된 자료를 기준으로 합니다. 자료가 추가되면 함께 갱신됩니다.
        </p>
      </div>
    </section>
  );
}
