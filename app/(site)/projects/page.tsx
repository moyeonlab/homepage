import type { Metadata } from "next";
import PageHead from "@/components/blueprint/PageHead";
import HoverPreview from "@/components/blueprint/HoverPreview";
import Wipe from "@/components/blueprint/Wipe";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "프로젝트 | MOYEON",
  description: "모두의문제연구소가 데이터로 분석하고 해결 방향을 제안한 프로젝트 기록입니다.",
};

export default function ProjectsPage() {
  // 분류별로 몇 건인지 보여주면 목록이 '기록'처럼 읽힌다
  const byCategory = projects.reduce<Record<string, number>>((acc, p) => {
    if (p.category) acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <PageHead
        index="03"
        label="OUR PROJECTS"
        title="우리가 들여다본"
        accent="문제들의 목록."
        description="문제 정의부터 데이터 수집, 분석, 해결책 제안까지 학회원들의 협업으로 완성된 기록입니다."
      />

      <section className="relative py-8 md:py-12">
        <div className="bp-col">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Wipe>
              <span className="font-display bp-grad-text text-3xl font-bold">
                n = {projects.length}
              </span>
            </Wipe>
            {Object.entries(byCategory).map(([cat, n], i) => (
              <Wipe key={cat} delay={80 + i * 60}>
                <span className="bp-label">
                  {cat} · {n}
                </span>
              </Wipe>
            ))}
          </div>

          <div className="mt-16">
            <HoverPreview projects={projects} />
          </div>

          <Wipe delay={160}>
            <p className="mt-10 max-w-xl text-sm bp-body text-[var(--bp-muted)]">
              각 프로젝트의 상세 내용은 담당 학회원의 자료 확보 후 순차적으로 채워집니다.
            </p>
          </Wipe>
        </div>
      </section>
    </>
  );
}
