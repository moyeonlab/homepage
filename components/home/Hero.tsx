import Button from "@/components/shared/Button";
import HeroSideDecor from "@/components/home/HeroSideDecor";
import WaveMesh from "@/components/shared/WaveMesh";
import { site, heroKeywords } from "@/content/site";
import { isRecruiting } from "@/content/recruitment";

export default function Hero() {
  const secondaryCta = isRecruiting
    ? { label: "학회원 지원하기", href: "/join" }
    : { label: "주요 활동 보기", href: "/activities" };

  return (
    // 스티키 헤더가 Hero 위에 겹쳐 보이도록 헤더 높이만큼 끌어올린다
    <section className="relative -mt-16 overflow-hidden bg-[linear-gradient(180deg,var(--color-hero-from),var(--color-hero-to))] text-white md:-mt-20">
      <WaveMesh className="pointer-events-none absolute inset-0 h-full w-full" />

      {/* 텍스트 가독성 확보용 오버레이 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,18,51,0.72)_0%,rgba(10,18,51,0.35)_45%,transparent_75%)]"
      />

      {/* 배경 파동을 만드는 실제 수식 — 수리데이터사이언스 학회의 서명 */}
      <p
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-6 hidden font-mono text-[11px] tracking-wide text-white/25 lg:block"
      >
        y = Σ aᵢ · sin(ωᵢx + φᵢ)
      </p>

      {/* 넓은 화면에서 좌우로 남는 여백을 채운다 */}
      <HeroSideDecor />

      <div className="container-page relative flex min-h-[560px] flex-col items-center justify-center pt-32 pb-16 text-center md:min-h-[660px] md:pt-40 md:pb-20">
        <p className="text-sm font-semibold tracking-wide text-white/60">{site.heroEyebrow}</p>

        <p className="mt-5 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
          <span className="font-eng text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            {site.nameEn}
          </span>
          <span className="text-base font-medium text-white/60 md:text-lg">{site.nameKo}</span>
        </p>

        {/* 브랜드 문장. '문제'와 '해답'이 번갈아 하이라이트되며 잔상이 스쳐 지나간다 */}
        <h1 className="text-balance mt-6 text-4xl font-extrabold leading-[1.18] tracking-tight md:text-6xl lg:text-7xl">
          모두의{" "}
          <span className="kw">
            <span
              aria-hidden
              className="kw-mark bg-[linear-gradient(90deg,rgba(255,255,255,0.22),rgba(255,255,255,0.05))]"
            />
            <span aria-hidden className="kw-ghost text-white/50">
              문제
            </span>
            <span className="kw-text">문제</span>
          </span>
          를,
          <br />
          모두의{" "}
          <span className="kw kw-delay">
            <span
              aria-hidden
              className="kw-mark bg-[linear-gradient(90deg,rgba(34,184,207,0.42),rgba(34,184,207,0.08))]"
            />
            <span aria-hidden className="kw-ghost text-[var(--color-accent)]">
              해답
            </span>
            <span className="kw-text text-[var(--color-accent)]">해답</span>
          </span>
          으로.
        </h1>

        <p className="text-balance mt-7 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
          {site.description}
        </p>

        <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Button
            href="/about"
            variant="primary"
            className="!bg-white !text-[var(--color-primary)] hover:!bg-white/90"
            fullWidthOnMobile
          >
            모연 알아보기
          </Button>
          <Button
            href={secondaryCta.href}
            variant="secondary"
            className="!border-white/70 !text-white hover:!bg-white/10"
            fullWidthOnMobile
          >
            {secondaryCta.label}
          </Button>
        </div>

        {/* 하단 요약 스트립 — 비어 보이던 아래쪽을 채우고 활동 흐름을 미리 보여준다 */}
        <ul className="mt-12 grid w-full max-w-2xl grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-7 sm:grid-cols-4">
          {heroKeywords.map((k) => (
            <li key={k.key} className="text-center">
              <p className="font-eng text-[11px] font-bold tracking-[0.18em] text-[var(--color-accent)]">
                {k.key}
              </p>
              <p className="mt-1.5 text-sm font-medium text-white/70">{k.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
