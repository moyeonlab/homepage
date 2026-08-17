import Wipe from "./Wipe";

/**
 * 하위 페이지의 첫 화면. 홈의 Hero 와 같은 무게로 연다.
 * 번호·제목·설명만 두고 나머지는 비운다.
 */
export default function PageHead({
  index,
  label,
  title,
  accent,
  description,
}: {
  index: string;
  label: string;
  title: string;
  /** 제목 뒤에 붙어 그라데이션으로 강조되는 줄 */
  accent?: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden pt-[168px] pb-24 md:pt-[220px] md:pb-32">
      <span
        aria-hidden
        className="bp-orb"
        style={{
          width: 560,
          height: 560,
          right: "-6%",
          top: "-22%",
          background: "radial-gradient(circle, var(--bp-glow-b), transparent 68%)",
          opacity: 0.42,
        }}
      />
      <span
        aria-hidden
        className="bp-orb"
        style={{
          width: 420,
          height: 420,
          left: "-8%",
          bottom: "-30%",
          background: "radial-gradient(circle, var(--bp-glow-c), transparent 70%)",
          opacity: 0.32,
        }}
      />

      <div className="bp-col relative">
        <Wipe>
          <p className="bp-label">
            {index} / {label}
          </p>
        </Wipe>

        <h1 className="mt-8 text-[clamp(2.6rem,7vw,6.5rem)] leading-[1.06] bp-headline">
          <Wipe delay={140}>
            <span>{title}</span>
          </Wipe>
          {accent && (
            <Wipe delay={280}>
              <span className="bp-grad-text">{accent}</span>
            </Wipe>
          )}
        </h1>

        <Wipe delay={440}>
          <p className="mt-10 max-w-xl text-[15px] bp-body text-[var(--bp-muted)] md:text-base">
            {description}
          </p>
        </Wipe>
      </div>
    </section>
  );
}
