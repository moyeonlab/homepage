import Link from "next/link";
import Wipe from "@/components/blueprint/Wipe";
import Highlight from "@/components/blueprint/Highlight";
import HoverPreview from "@/components/blueprint/HoverPreview";
import { projects } from "@/content/projects";

/** 프로젝트 — 카드 그리드 대신 목록. 행에 올리면 썸네일이 커서를 따라온다. */
export default function Work() {
  return (
    <section className="relative py-24 md:py-36">
      <div className="bp-col">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <Wipe>
            <p className="bp-label">03 / 기록된 프로젝트</p>
          </Wipe>
          <Wipe delay={80}>
            <span className="font-display text-sm text-[var(--bp-muted)]">n = {projects.length}</span>
          </Wipe>
        </div>

        <h2 className="bp-headline mt-12 max-w-4xl text-[clamp(1.75rem,4.6vw,4.5rem)] leading-[1.16]">
          <Wipe delay={140}>
            <span>데이터로 문제를 바라보고,</span>
          </Wipe>
          <Wipe delay={280}>
            <span>
              <Highlight>해결의 가능성</Highlight>을 제안합니다.
            </span>
          </Wipe>
        </h2>

        <div className="mt-20">
          <HoverPreview projects={projects} />
        </div>

        <Wipe delay={120}>
          <span className="mt-14 inline-flex">
            <Link
              href="/projects"
              className="bp-label group inline-flex items-center gap-3 !text-[var(--bp-text)] transition-colors hover:!text-[var(--bp-accent)]"
            >
              모든 프로젝트 보기
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </span>
        </Wipe>
      </div>
    </section>
  );
}
