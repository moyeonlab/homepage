import type { HistoryEntry } from "@/lib/types";

// 출처: 기존 홈페이지(sites.google.com/view/moyeon) 크롤링 자료 (moyeon_website_crawl.md, 2026-07-29 수집)
// 2026년 7월 항목은 매거진 사이트 발행 이력으로 확인된 내용만 추가함(2026-08-04).
// 딥테크오디션: 예선·결선 진출은 창업교육센터 공지 No.233·238 캡처(1차 출처)로 확인,
// 수상 여부는 회장 확인(2026-08-10). TODO: 상 이름·순위 확인 시 title 에 반영.
// ★ 2026-08-24 — 옛 계정 Instagram(@moyeon_lab, 게시물 18건)에서 게시일을 직접 확인해
//   2024~2025년 항목을 바로잡았다. 옛 홈페이지 연혁이 「국민연금,우유값」을 **한 줄로 묶어
//   2024년 9월**에 걸어 뒀는데, 실제로는 서로 다른 두 게시물이고 날짜도 둘 다 달랐다
//   (우유값 2024-11-14 · 국민연금 2025-01-26). 옛 연혁을 1차 출처로 믿으면 안 된다.
//   ⚠ 옛 연혁은 완전한 목록도 아니다 — 2024년 항목이 4건뿐이라 빠진 활동이 더 있을 수 있다.
// ★ 인스타 계정이 둘이다 (2026-08-24 회장 확인): 옛 `@moyeon_lab`(게시물 18건)은
//   **아카이브로 두고**, 앞으로는 `@moyeonlabs` 로 **새로 시작**한다 — 옛 게시물을 옮기지 않는다.
//   그래서 아래 링크들은 계속 옛 계정을 가리킨다. ⛔ 옛 계정을 삭제하면 이 링크가 전부 죽는다.
// TODO: 2025년의 나머지 활동, 그리고 2026년의 나머지 활동(정기 모집·스터디 등) 업데이트 필요.
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
    link: "https://www.instagram.com/p/Cr45LT2yeVj/",
  },
  {
    year: 2023,
    month: "10월",
    title: "학술정보관 열람석 관련 분석",
    link: "https://www.instagram.com/p/Cy250hkB0VB/",
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
    month: "11월",
    title: "우유값 변동 원인 카드뉴스 발행",
    link: "https://www.instagram.com/p/DCWOLznhtW6/",
  },
  {
    year: 2024,
    month: "11월",
    title: "자체 데이터 분석 대회 개최",
    description:
      "학회원이 주제를 정해 데이터를 분석하고 카드뉴스로 발표하는 자체 대회. 9월 23일부터 11월 13일까지 접수했고, 대상·우수상·장려상을 시상했습니다.",
    link: "https://www.instagram.com/p/DAK_Y_mhOHn/",
  },
  {
    year: 2025,
    month: "1월",
    title: "국민연금 바로 알기 카드뉴스 발행",
    link: "https://www.instagram.com/p/DFSoyTBhzyM/",
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
    link: "https://magazine.moyeonlab.com",
  },
];

// 홈 화면에는 최근 연혁만 노출
export const homeHistoryCount = 6;
