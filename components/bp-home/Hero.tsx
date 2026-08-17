import Link from "next/link";
import Wipe from "@/components/blueprint/Wipe";
import SpecimenWall from "@/components/blueprint/SpecimenWall";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

/**
 * 첫 화면.
 * 배경은 장식이 아니라 모연이 실제로 만든 분석물이다.
 * 흑백으로 눌러 흐르게 두고, 그 위에서 슬로건만 색을 가진다.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-[88px] pb-20">
      <SpecimenWall />

      <div className="bp-col relative">
        <Wipe>
          <p className="bp-label">{site.heroEyebrow}</p>
        </Wipe>

        <h1 className="mt-8 bp-headline text-[clamp(3rem,9vw,9rem)] leading-[1.02]">
          <Wipe delay={140}>
            <span>모두의 문제를,</span>
          </Wipe>
          <Wipe delay={300}>
            <span className="bp-grad-text">모두의 해답으로.</span>
          </Wipe>
        </h1>

        <Wipe delay={480}>
          <p className="mt-10 max-w-md text-[15px] bp-body text-[var(--bp-muted)]">
            {site.description}
          </p>
        </Wipe>

        <Wipe delay={600}>
          <span className="mt-12 inline-flex">
            <Link
              href="/join"
              className="bp-label group inline-flex items-center gap-3 border border-[var(--bp-line-strong)] bg-[var(--bp-text)] px-7 py-4 !text-[var(--bp-bg)] transition-opacity hover:opacity-85"
            >
              학회원 지원하기
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </span>
        </Wipe>
      </div>

      {/* 배경이 무엇인지 밝히는 주석 — 스톡 이미지가 아니라 우리 작업물이라는 사실 */}
      <div className="bp-col absolute inset-x-0 bottom-8">
        <Wipe delay={800}>
          <p className="bp-label">
            배경 — 모연이 직접 만든 분석 자료 · 프로젝트 {projects.length}건 · {site.foundedYear}년부터
          </p>
        </Wipe>
      </div>
    </section>
  );
}
