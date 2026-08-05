import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import PageHero from "@/components/shared/PageHero";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import { projects } from "@/content/projects";

export const metadata: Metadata = pageMeta({
  title: "프로젝트",
  description:
    "모두의문제연구소가 수행한 데이터 기반 사회문제 해결 프로젝트를 확인할 수 있습니다.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        label="PROJECT ARCHIVE"
        title={"모연이 발견하고,\n분석하고, 제안한 문제들"}
        description="모두의문제연구소가 수행한 데이터 기반 사회문제 해결 프로젝트를 확인할 수 있습니다."
      />
      <section className="container-page py-16 md:py-20">
        <ProjectsGrid projects={projects} />
      </section>
    </>
  );
}
