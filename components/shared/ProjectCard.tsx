import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import DataGraphic from "./DataGraphic";

/**
 * 썸네일.
 *
 * ★ `object-contain` 인 이유 (2026-08-24) — **카드뉴스가 잘리면 안 된다.**
 *   썸네일은 대부분 카드뉴스 «표지»고, 표지의 제목은 위쪽에 있다. 카드는 1:1 인데
 *   카드 틀은 16:10 이라 `object-cover` 로 채우면 위아래가 잘려 **제목이 반쯤 날아간다**
 *   (실제로 학과별 MBTI 표지가 그렇게 보였다). 지어낸 그림이면 잘려도 그만이지만
 *   이건 학회가 실제로 발행한 결과물이라, 여백이 생기더라도 통째로 보여준다.
 */
function Thumb({ project, sizes }: { project: Project; sizes: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[var(--color-bg-blue-soft)]">
      {project.thumbnail ? (
        <Image
          src={project.thumbnail}
          alt=""
          fill
          sizes={sizes}
          className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <DataGraphic className="h-2/3 w-2/3 opacity-80" />
        </div>
      )}
    </div>
  );
}

function Meta({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold">
      <span className="rounded-full bg-[var(--color-bg-blue-soft)] px-2.5 py-1 text-[var(--color-primary)]">
        {project.category}
      </span>
      {project.year && <span className="text-[var(--color-text-muted)]">{project.year}</span>}
    </div>
  );
}

function More() {
  return (
    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]">
      자세히 보기
      <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </span>
  );
}

const cardBase =
  "group flex overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]";

export default function ProjectCard({
  project,
  layout = "vertical",
}: {
  project: Project;
  /** horizontal: 대표 프로젝트용 와이드 카드 (데스크톱에서 이미지 좌측 + 텍스트 우측) */
  layout?: "vertical" | "horizontal";
}) {
  if (layout === "horizontal") {
    return (
      <Link href={`/projects/${project.slug}`} className={`${cardBase} h-full flex-col md:flex-row`}>
        <div className="aspect-[4/3] w-full md:aspect-auto md:w-[55%]">
          <Thumb project={project} sizes="(max-width: 768px) 100vw, 55vw" />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-3 p-7 md:p-10">
          <Meta project={project} />
          <h3 className="text-2xl font-bold leading-snug tracking-tight text-[var(--color-text)] md:text-3xl">
            {project.title}
          </h3>
          <p className="text-[15px] leading-relaxed text-[var(--color-text-muted)]">
            {project.summary}
          </p>
          <More />
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/projects/${project.slug}`} className={`${cardBase} h-full flex-col`}>
      <div className="aspect-[4/3] w-full">
        <Thumb
          project={project}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-6">
        <Meta project={project} />
        <h3 className="text-lg font-bold leading-snug tracking-tight text-[var(--color-text)]">
          {project.title}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
          {project.summary}
        </p>
        <More />
      </div>
    </Link>
  );
}
