"use client";

import { useState } from "react";
import ProjectCard from "@/components/shared/ProjectCard";
import type { Project } from "@/lib/types";
import { projectCategories } from "@/content/projects";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState("전체");

  const filtered =
    category === "전체" ? projects : projects.filter((p) => p.category === category);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="프로젝트 카테고리 필터">
        {projectCategories.map((cat) => {
          const active = cat === category;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={active}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-bg-blue-soft)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-[var(--color-text-muted)]">
          해당 카테고리의 프로젝트 자료가 아직 없습니다.
        </p>
      )}
    </div>
  );
}
