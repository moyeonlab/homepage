export default function SectionLabel({
  children,
  index,
  dark = false,
}: {
  children: string;
  /** 홈 섹션 순번. "01" 처럼 넘기면 라벨 앞에 표시된다 */
  index?: string;
  dark?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2.5 text-sm font-semibold tracking-widest uppercase">
      {index ? (
        <>
          <span
            className={`font-eng text-xs ${dark ? "text-white/40" : "text-[var(--color-text-muted)]"}`}
          >
            {index}
          </span>
          <span
            aria-hidden
            className={`h-px w-5 ${dark ? "bg-white/25" : "bg-[var(--color-border)]"}`}
          />
        </>
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden />
      )}
      <span className="font-eng text-[var(--color-accent)]">{children}</span>
    </span>
  );
}
