import type { HistoryEntry } from "@/lib/types";

export default function HistoryTimeline({ entries }: { entries: HistoryEntry[] }) {
  const years = Array.from(new Set(entries.map((e) => e.year))).sort((a, b) => b - a);

  return (
    <div className="space-y-10">
      {years.map((year) => (
        <div key={year} className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <div className="text-3xl font-extrabold text-[var(--color-primary)] sm:w-28 sm:shrink-0">
            {year}
          </div>
          <ul className="flex-1 space-y-4 border-l border-[var(--color-border)] pl-6">
            {entries
              .filter((e) => e.year === year)
              .map((entry) => (
                <li key={`${entry.month}-${entry.title}`} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]"
                  />
                  <p className="text-sm font-semibold text-[var(--color-accent)]">{entry.month}</p>
                  <p className="mt-1 text-[15px] font-medium text-[var(--color-text)]">{entry.title}</p>
                  {entry.description && (
                    <p className="mt-1 text-sm text-[var(--color-text-muted)]">{entry.description}</p>
                  )}
                  {/* link 는 타입(lib/types.ts)에도 데이터에도 있었는데 그리는 코드가 없었다
                      — 매거진 창간 항목의 링크가 조용히 죽어 있었다 (2026-08-24 발견) */}
                  {entry.link && (
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-1 inline-block text-sm font-medium text-[var(--color-accent)] underline underline-offset-4"
                    >
                      바로가기
                    </a>
                  )}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
