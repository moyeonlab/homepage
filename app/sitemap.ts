import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

// 정적 export에는 Date.now() 같은 동적 값이 라우트에 들어가면 안 되므로 강제로 고정
export const dynamic = "force-static";

const SITE_URL = "https://homepage.moyeonlabs.workers.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/activities", "/magazine", "/projects", "/people", "/join", "/contact"].map(
    (path) => ({
      url: `${SITE_URL}${path}${path ? "/" : ""}`,
      lastModified: new Date(),
    })
  );

  const projectRoutes = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}/`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes];
}
