import type { Project } from "@/lib/types";

// 출처: 기존 홈페이지·가입 신청서 크롤링 자료 (moyeon_website_crawl.md, 2026-07-29 수집)
// 문제 정의/배경/분석/발견/해결책 등 상세 필드는 공식 자료가 없어 비워둠 -> 임의로 채우지 않음.
// TODO: 각 프로젝트 담당 학회원에게 상세 내용·이미지·결과물 링크 확보 후 채울 것.
export const projects: Project[] = [
  {
    title: "학술정보관 이용률 분석",
    slug: "library-usage-analysis",
    thumbnail: "/images/projects/library-usage-analysis.png",
    year: 2023,
    category: "캠퍼스",
    summary:
      "학술정보관 열람석 이용 데이터를 분석해 공간 이용의 불균형과 개선 가능성을 탐구했습니다.",
    status: "준비중",
    featured: true,
  },
  {
    title: "국민연금 바로 알기 프로젝트",
    slug: "national-pension",
    thumbnail: "/images/projects/national-pension.png",
    year: 2024,
    category: "복지",
    summary: "국민연금 제도와 관련 데이터를 다룬 프로젝트입니다. 상세 내용은 준비 중입니다.",
    status: "준비중",
    featured: true,
  },
  {
    title: "우유값 변동 원인 분석",
    slug: "milk-price-analysis",
    thumbnail: "/images/projects/milk-price-analysis.png",
    year: 2024,
    category: "경제",
    summary: "우유값 변동의 원인을 데이터로 살펴본 프로젝트입니다. 상세 내용은 준비 중입니다.",
    status: "준비중",
    featured: true,
  },
  {
    title: "안성시 지역살리기 기획봉사",
    slug: "anseong-community",
    thumbnail: "/images/projects/anseong-community.png",
    category: "지역사회",
    summary: "안성시 지역 활성화를 주제로 한 기획봉사 프로젝트입니다. 상세 내용은 준비 중입니다.",
    status: "준비중",
    featured: true,
  },
  {
    title: "학과별 MBTI 분포 조사",
    slug: "mbti-survey",
    thumbnail: "/images/projects/mbti-survey.png",
    year: 2023,
    category: "캠퍼스",
    summary: "학과별 MBTI 분포를 설문으로 조사한 프로젝트입니다. 상세 내용은 준비 중입니다.",
    status: "준비중",
  },
  {
    title: "자체 데이터 분석 대회",
    slug: "internal-data-contest",
    thumbnail: "/images/projects/internal-data-contest.png",
    year: 2024,
    category: "기타",
    summary: "학회원들이 주제를 정해 데이터를 분석하고 발표하는 자체 대회입니다. 상세 내용은 준비 중입니다.",
    status: "준비중",
  },
];

export const projectCategories = [
  "전체",
  "캠퍼스",
  "경제",
  "복지",
  "지역사회",
  "환경",
  "교육",
  "기타",
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(limit = 4): Project[] {
  return projects.filter((p) => p.featured).slice(0, limit);
}
