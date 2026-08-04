import SectionLabel from "@/components/shared/SectionLabel";
import SectionHeading from "@/components/shared/SectionHeading";
import ProjectCard from "@/components/shared/ProjectCard";
import Button from "@/components/shared/Button";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import { getFeaturedProjects } from "@/content/projects";

export default function ProjectsPreview() {
  const featured = getFeaturedProjects(4);
  const [first, ...rest] = featured;

  return (
    <section className="container-page py-20 md:py-28">
      <SectionLabel index="04">OUR PROJECTS</SectionLabel>
      <SectionHeading className="max-w-3xl">
        데이터로 문제를 바라보고,
        <br />
        해결의 가능성을 제안합니다.
      </SectionHeading>
      <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-base">
        모연은 사회와 학교, 지역사회에서 발견한 문제를 데이터로 분석하고 해결 방향을 제안합니다. 각
        프로젝트는 문제 정의부터 결과 공유까지 학회원들의 협업을 통해 완성됩니다.
      </p>

      {featured.length > 0 ? (
        <div className="mt-12 space-y-5">
          {first && (
            <RevealOnScroll>
              <ProjectCard project={first} layout="horizontal" />
            </RevealOnScroll>
          )}
          {rest.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((project, i) => (
                <RevealOnScroll key={project.slug} delay={(i + 1) * 80} className="h-full">
                  <ProjectCard project={project} />
                </RevealOnScroll>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="mt-12 text-[var(--color-text-muted)]">대표 프로젝트 자료 준비 중입니다.</p>
      )}

      <div className="mt-12">
        <Button href="/projects" variant="secondary">
          모든 프로젝트 보기
        </Button>
      </div>
    </section>
  );
}
