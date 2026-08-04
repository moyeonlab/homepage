export default function ValueCard({
  eyebrow,
  title,
  description,
  index,
}: {
  eyebrow: string;
  title: string;
  description: string;
  /** 카드 배경에 크게 깔리는 순번 */
  index?: string;
}) {
  return (
    <div className="group relative h-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-7 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-md)]">
      {/* 상단 액센트 바 - hover 시 좌에서 우로 채워진다 */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[var(--color-accent)] transition-transform duration-300 group-hover:scale-x-100"
      />

      {index && (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-2 -top-3 font-eng text-7xl font-extrabold text-[var(--color-bg-blue-soft)] transition-colors duration-300 group-hover:text-[var(--color-accent)]/15"
        >
          {index}
        </span>
      )}

      <div className="relative">
        <p className="text-sm font-bold tracking-widest text-[var(--color-accent)]">{eyebrow}</p>
        <h3 className="mt-3 text-lg font-bold tracking-tight text-[var(--color-text)]">{title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-text-muted)]">
          {description}
        </p>
      </div>
    </div>
  );
}
