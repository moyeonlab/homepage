import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Badge from "@/components/shared/Badge";
import ProjectCard from "@/components/shared/ProjectCard";
import DataGraphic from "@/components/shared/DataGraphic";
import { projects, getProjectBySlug } from "@/content/projects";
import { site } from "@/content/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return pageMeta({ title: "프로젝트", description: "", path: "/projects" });
  return pageMeta({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    // 썸네일이 있으면 공유 미리보기로 쓴다 — 로고보다 훨씬 잘 눌린다
    image: project.thumbnail,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // 공식 자료가 확보된 항목만 노출한다. 없는 내용은 추측해서 채우지 않는다.
  const sections = [
    { title: "문제 정의", content: project.problem },
    { title: "프로젝트 배경", content: project.background },
    { title: "활용 데이터", content: project.data },
    { title: "분석 과정", content: project.analysis },
    { title: "주요 발견", content: project.findings },
    { title: "제안한 해결책", content: project.solution },
  ].filter((s): s is { title: string; content: string } => Boolean(s.content));

  const related = projects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      <section className="bg-[var(--color-bg-blue-soft)]">
        <div className="container-page grid items-center gap-10 py-14 md:grid-cols-[1.1fr_1fr] md:py-20">
          <div>
            <Link
              href="/projects"
              className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
            >
              ← 전체 프로젝트
            </Link>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Badge>{project.category}</Badge>
              {project.year && <Badge tone="outline">{project.year}</Badge>}
            </div>
            <h1 className="text-balance mt-4 text-3xl font-extrabold leading-[1.2] tracking-tight text-[var(--color-text)] md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              {project.summary}
            </p>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-[var(--shadow-md)]">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={`${project.title} 대표 이미지`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <DataGraphic className="h-1/2 w-1/2 opacity-80" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
          <div>
            {sections.length > 0 ? (
              <>
                {sections.map((s) => (
                  <div
                    key={s.title}
                    className="border-t border-[var(--color-border)] py-8 first:border-t-0 first:pt-0"
                  >
                    <h2 className="text-lg font-bold text-[var(--color-text)]">{s.title}</h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-text-muted)]">
                      {s.content}
                    </p>
                  </div>
                ))}
                <p className="mt-4 text-sm text-[var(--color-text-muted)]">
                  이 프로젝트의 나머지 기록은 계속 정리하고 있습니다.
                </p>
              </>
            ) : (
              <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] bg-[var(--color-bg-soft)] p-10 text-center md:p-14">
                <p className="text-lg font-bold text-[var(--color-text)]">
                  프로젝트 기록을 정리하고 있습니다.
                </p>
                <p className="text-balance mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[var(--color-text-muted)]">
                  문제 정의부터 분석 과정, 제안한 해결책까지 이 프로젝트의 상세 기록은 곧 모연의
                  새로운 기록으로 찾아뵙겠습니다.
                </p>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-6 inline-flex items-center justify-center rounded-full border-2 border-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-bg-blue-soft)]"
                >
                  Instagram에서 활동 보기
                </a>
              </div>
            )}
          </div>

          <aside className="h-fit space-y-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
            <div>
              <p className="text-xs font-semibold text-[var(--color-text-muted)]">진행 연도</p>
              <p className="mt-1 text-sm font-medium text-[var(--color-text)]">
                {project.year ?? "확인 중"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--color-text-muted)]">카테고리</p>
              <p className="mt-1 text-sm font-medium text-[var(--color-text)]">{project.category}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--color-text-muted)]">참여자</p>
              <p className="mt-1 text-sm font-medium text-[var(--color-text)]">
                {project.participants ?? "업데이트 예정"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--color-text-muted)]">프로젝트 결과물</p>
              {project.resultLinks && project.resultLinks.length > 0 ? (
                <ul className="mt-1 space-y-1">
                  {project.resultLinks.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-sm font-medium text-[var(--color-primary)] hover:underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">업데이트 예정</p>
              )}
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-[var(--color-bg-soft)]">
          <div className="container-page py-16 md:py-20">
            <h2 className="text-xl font-bold tracking-tight text-[var(--color-text)]">
              관련 프로젝트
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
