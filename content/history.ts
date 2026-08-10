import type { HistoryEntry } from "@/lib/types";

// 출처: 기존 홈페이지(sites.google.com/view/moyeon) 크롤링 자료 (moyeon_website_crawl.md, 2026-07-29 수집)
// 2026년 7월 항목은 매거진 사이트 발행 이력으로 확인된 내용만 추가함(2026-08-04).
// 딥테크오디션: 예선·결선 진출은 창업교육센터 공지 No.233·238 캡처(1차 출처)로 확인,
// 수상 여부는 회장 확인(2026-08-10). TODO: 상 이름·순위 확인 시 title 에 반영.
// TODO: 2025년, 그리고 2026년의 나머지 활동(정기 모집·스터디 등) 업데이트 필요.
//   2026년 여름 조직 개편·사업자 등록 관련 진행 사항은 아직 완료 전이라 공개 연혁에는
//   싣지 않음 — 대외 공개 여부는 운영진 확인 후 결정.
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
  {
    year: 2026,
    month: "6월",
    title: "ERICA 딥테크오디션(Deep Tech Audition) 수상",
    description:
      "창업교육센터 주관 창업 경진 프로그램. 예선 32팀 중 본선 9팀 선발, 6월 결선(10팀) 진출 끝에 수상 — 팀 「모두의 문제 연구소」.",
  },
  {
    year: 2026,
    month: "7월",
    title: "모연 매거진 창간 — 데이터 저널리즘 정기 발행 시작",
    description: "공공데이터로 지역 사회 문제를 기록하는 정기 매거진. 모든 수치는 발행 전 데이터 검증 관문을 통과합니다.",
    link: "https://magazine-4r3.pages.dev",
  },
];

// 홈 화면에는 최근 연혁만 노출
export const homeHistoryCount = 6;
