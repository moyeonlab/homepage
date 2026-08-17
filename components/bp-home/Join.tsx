import Link from "next/link";
import Wipe from "@/components/blueprint/Wipe";
import { site } from "@/content/site";
import { recruitment } from "@/content/recruitment";

/** 페이지의 마지막 목소리. 여기서 가장 크게 말한다. */
export default function Join() {
  const isOpen = recruitment.status === "모집중";

  return (
    <section
      className="bp-dark relative overflow-hidden pt-28 pb-36 md:pt-40 md:pb-52"
      style={{
        background:
          "linear-gradient(135deg, #1b1450 0%, #2a3fa0 46%, #0d6e80 100%)",
      }}
    >
      <span
        aria-hidden
        className="bp-orb"
        style={{
          width: 640, height: 640, right: "-8%", top: "-24%",
          background: "radial-gradient(circle, #22b8cf, transparent 68%)",
          opacity: 0.42,
        }}
      />

      <div className="bp-col relative">
        <Wipe>
          <p className="bp-label">06 / 합류</p>
        </Wipe>

        <h2 className="bp-headline mt-16 max-w-4xl text-[clamp(1.9rem,5.2vw,5rem)] leading-[1.14]">
          <Wipe delay={80}>
            <span>당신이 발견한 문제에서,</span>
          </Wipe>
          <Wipe delay={220}>
            <span className="text-[#7dd3fc]">다음 해답이 시작됩니다.</span>
          </Wipe>
        </h2>

        <Wipe delay={380}>
          <p className="mt-10 max-w-xl text-[15px] bp-body text-[var(--bp-muted)] md:text-base">
            전공과 학년에 관계없이 데이터와 사회문제 해결에 관심 있는 모든 한양대학교 ERICA
            학생에게 열려 있습니다. 데이터 분석 경험이 없어도 괜찮습니다.
          </p>
        </Wipe>

        <Wipe delay={480}>
          <span className="mt-14 flex flex-wrap gap-4">
            <Link
              href="/join"
              className="bp-label group inline-flex items-center gap-3 bg-white px-8 py-5 !text-[#1b1450] transition-opacity hover:opacity-90"
            >
              {isOpen ? "학회원 지원하기" : "다음 모집 안내 보기"}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="bp-label group inline-flex items-center gap-3 border border-[var(--bp-line-strong)] px-8 py-5 !text-[var(--bp-text)] transition-colors hover:border-[var(--bp-accent)] hover:!text-[var(--bp-accent)]"
            >
              Instagram {site.instagramHandle}
              <span className="sr-only">(새 창으로 열림)</span>
            </a>
          </span>
        </Wipe>
      </div>
    </section>
  );
}
