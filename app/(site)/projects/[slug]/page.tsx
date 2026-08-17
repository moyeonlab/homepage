import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Wipe from "@/components/blueprint/Wipe";
import Rows from "@/components/blueprint/Rows";
import Magnetic from "@/components/blueprint/Magnetic";
import { projects, getProjectBySlug } from "@/content/projects";

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
  if (!project) return { title: "프로젝트 | MOYEON" };
  return { title: `${project.title} | MOYEON`, description: project.summary };
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
  ].filter((s) => Boolean(s.content));

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <section className="relative overflow-hidden pt-[168px] pb-16 md:pt-[220px] md:pb-24">
        <span
          aria-hidden
          className="bp-orb"
          style={{
            width: 520, height: 520, right: "-4%", top: "-20%",
            background: "radial-gradient(circle, var(--bp-glow-b), transparent 68%)", opacity: 0.4,
          }}
        />
        <div className="bp-col relative">
          <Wipe>
            <p className="bp-label">
              {project.year ?? "—"} · {project.category}
            </p>
          </Wipe>

          <h1 className="mt-8 max-w-4xl text-[clamp(1.9rem,5.4vw,5.4rem)] leading-[1.08] bp-headline">
            <Wipe delay={140}>
              <span>{project.title}</span>
            </Wipe>
          </h1>

          <Wipe delay={300}>
            <p className="mt-10 max-w-xl text-[15px] bp-body text-[var(--bp-muted)] md:text-base">
              {project.summary}
            </p>
          </Wipe>
        </div>
      </section>

      {project.thumbnail && (
        <section className="relative pb-20 md:pb-28">
          <div className="bp-col">
            <Wipe>
              <span className="block overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt=""
                  width={1600}
                  height={900}
                  className="h-auto w-full object-cover"
                  priority
                />
              </span>
            </Wipe>
          </div>
        </section>
      )}

      <section className="relative py-8 md:py-12">
        <div className="bp-col">
          {sections.length > 0 ? (
            <Rows
              items={sections.map((s, i) => ({
                key: s.title,
                lead: String(i + 1).padStart(2, "0"),
                title: s.title,
                body: s.content,
              }))}
            />
          ) : (
            <div className="border-y border-[var(--bp-line-strong)] py-16">
              <Wipe>
                <p className="max-w-xl text-[15px] bp-body text-[var(--bp-muted)]">
                  이 프로젝트의 상세 기록은 아직 준비 중입니다. 담당 학회원의 자료가 확보되는 대로
                  문제 정의부터 해결책까지 순차적으로 채워집니다.
                </p>
              </Wipe>
            </div>
          )}
        </div>
      </section>

      {/* 다음 프로젝트로 계속 넘어가게 한다 — 목록으로 되돌아가지 않아도 되도록 */}
      <section className="bp-dark relative overflow-hidden py-24 md:py-36">
        <div className="bp-col relative">
          <Wipe>
            <p className="bp-label">다음 프로젝트</p>
          </Wipe>
          <Link href={`/projects/${next.slug}`} className="group mt-8 block">
            <Wipe delay={120}>
              <span className="block text-[clamp(1.65rem,4.6vw,4.2rem)] leading-[1.14] bp-headline transition-colors group-hover:text-[var(--bp-accent)]">
                {next.title}
              </span>
            </Wipe>
          </Link>

          <Wipe delay={260}>
            <span className="mt-14 inline-flex">
              <Magnetic>
                <Link
                  href="/projects"
                  className="bp-btn bp-label group inline-flex items-center gap-3 border border-[var(--bp-line-strong)] px-8 py-5 !text-[var(--bp-text)] transition-colors hover:border-transparent hover:!text-white"
                >
                  전체 목록으로
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Magnetic>
            </span>
          </Wipe>
        </div>
      </section>
    </>
  );
}
