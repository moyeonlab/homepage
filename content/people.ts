import type { Person } from "@/lib/types";

export const advisor: Person = {
  name: "정혜영 교수",
  role: "모두의문제연구소 지도교수",
  department: "한양대학교 ERICA 수리데이터사이언스학과",
  // TODO: 공식 제공 자료(사진, 상세 약력) 확보 시 추가. 임의로 작성하지 않음.
};

// 출처: 정기회의 자료 (2026-08-04, 작성: 부회장 조우진). 실명 공개 동의 확인 완료.
// TODO: 프로필 사진·한 줄 소개는 확보 후 추가.
export const currentOfficers: Person[] = [
  { name: "나동욱", role: "회장", description: "실무 총괄 · 회계" },
  { name: "조우진", role: "부회장", description: "전체 진행 관리 · 교육/프로젝트 실행" },
  { name: "이재완", role: "운영진", description: "홍보·브랜딩 · 프로젝트" },
  { name: "한경민", role: "운영진", description: "홍보·브랜딩 · 교육사업 기획" },
  { name: "허진영", role: "운영진", description: "대외협력 · 홍보·브랜딩" },
  { name: "김윤수", role: "매니저", description: "교육사업 기획 · 대외협력" },
];

// 출처: 정기회의 자료 (2026-08-04)
// 내부 결재 라인·회계 세부 절차 등 운영 정보는 공개하지 않고, 활동 영역만 소개한다.
export const departments = [
  {
    name: "교육사업 기획",
    description:
      "수리데이터사이언스학과의 데이터 처리·머신러닝 커리큘럼을 바탕으로 모연만의 색을 담은 데이터 부트캠프를 기획합니다.",
  },
  {
    name: "프로젝트",
    description:
      "팀별로 문제를 정의하고 데이터를 분석해 해결책을 제안하는 프로젝트를 기획하고 수행합니다.",
  },
  {
    name: "홍보·브랜딩",
    description:
      "활동 기록과 분석 결과를 카드뉴스·콘텐츠로 제작해 모연이 어떤 문제를 왜 다루는지 알립니다.",
  },
  {
    name: "대외협력",
    description:
      "공모전, 해커톤, 외부 협업 등 모연이 참여할 만한 기회를 발굴하고 학회원에게 공유합니다.",
  },
  {
    name: "회계·정산",
    description: "학회 운영비와 지출을 기록하고 정기적으로 결산해 투명하게 관리합니다.",
  },
];

// 명단 출처: 기존 홈페이지 크롤링 자료 (moyeon_website_crawl.md, 기수 표기: 1기 임수민 · 2기 한경민 · 3기 김종호 · 4기 황은성)
// 시기 매핑: 회장 확인 (2026-08-10 구술) — 임수민 2023(1년) · 한경민 2024-1 · 김종호 2024-2 · 황은성 2025(1·2학기).
// 한경민의 재임 학기는 확신이 낮다고 함 — 정정되면 여기만 고치면 된다.
export const pastPresidents: Person[] = [
  { name: "임수민", role: "회장", generation: "2023 · 창립" },
  { name: "한경민", role: "회장", generation: "2024 1학기" },
  { name: "김종호", role: "회장", generation: "2024 2학기" },
  { name: "황은성", role: "회장", generation: "2025" },
  { name: "황원준", role: "회장", generation: "2026 1학기" },
  { name: "나동욱", role: "회장", generation: "2026 2학기 · 현재" },
];
