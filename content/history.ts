import type { HistoryEntry } from "@/lib/types";

// 출처: 기존 홈페이지(sites.google.com/view/moyeon) 크롤링 자료 (moyeon_website_crawl.md, 2026-07-29 수집)
// TODO: 2025년 이후 연혁 업데이트 필요
export const history: HistoryEntry[] = [
  {
    year: 2023,
    month: "5월",
    title: "정혜영 교수 지도 아래 학회 창립",
  },
  {
    year: 2023,
    month: "5월",
    title: "학과별 MBTI 분포 설문조사",
  },
  {
    year: 2023,
    month: "10월",
    title: "학술정보관 열람석 관련 분석",
  },
  {
    year: 2024,
    month: "5월",
    title: "1학기 카드뉴스 발표회",
  },
  {
    year: 2024,
    month: "9월",
    title: "자체 사이트 제작",
  },
  {
    year: 2024,
    month: "9월",
    title: "국민연금 및 우유값 관련 카드뉴스 제작",
  },
  {
    year: 2024,
    month: "11월",
    title: "자체 데이터 분석 대회 개최",
  },
];

// 홈 화면에는 최근 연혁만 노출
export const homeHistoryCount = 6;
