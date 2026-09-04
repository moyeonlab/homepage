import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

// 정적 export에는 Date.now() 같은 동적 값이 라우트에 들어가면 안 되므로 강제로 고정
export const dynamic = "force-static";

const SITE_URL = "https://moyeonlab.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // ⛔ 2026-09-04 — `/magazine` 을 뺐다. 네비가 매거진 사이트로 곧장 가게 바뀌면서
  //   이 페이지는 «아무도 안 들어오는» 상태가 됐다. 고아 페이지를 검색엔진에 알리면
  //   같은 발행물 목록이 두 주소로 갈려 색인된다. 페이지 자체는 남겼다(되살릴 수 있게).
  const staticRoutes = ["", "/about", "/activities", "/news", "/projects", "/people", "/join", "/contact"].map(
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
