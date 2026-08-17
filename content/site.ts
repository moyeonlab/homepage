import type { NavItem } from "@/lib/types";

export const site = {
  nameKo: "모두의문제연구소",
  nameEn: "MOYEON",
  affiliation: "한양대학교 ERICA 학생 학회",
  campus: "한양대학교 ERICA 캠퍼스",
  department: "수리데이터사이언스학과",
  advisor: "정혜영 교수",
  advisorDepartment: "한양대학교 ERICA 수리데이터사이언스학과",
  slogan: "모두의 문제를,\n모두의 해답으로.",
  sloganOneLine: "모두의 문제를, 모두의 해답으로.",
  description:
    "데이터를 통해 우리 주변의 문제를 발견하고, 다양한 전공의 학생들과 함께 모두를 위한 해결책을 만들어가는 한양대학교 ERICA 학생 학회입니다.",
  heroEyebrow: "한양대학교 ERICA 데이터 기반 사회문제 해결 학회",
  foundedYear: 2023,
  logo: "/images/logo.png",
  instagramHandle: "@moyeonlabs",
  instagramUrl: "https://www.instagram.com/moyeonlabs",
  email: "moyeonlabs@gmail.com" as string | null,
};

/**
 * 모연이 속한 학과와의 연결.
 * 학과의 교육 목표·연구 분야 등 학과 고유의 설명은 여기에 옮겨 적지 않고
 * 공식 홈페이지로 보낸다. (학과 소개를 임의로 요약해 적지 않기 위함)
 */
export const roots = {
  departmentUrl: "https://mds.hanyang.ac.kr",
  departmentNameEn: "Mathematical Data Science",
  facts: [
    { label: "소속", value: "한양대학교 ERICA 수리데이터사이언스학과" },
    { label: "지도교수", value: "정혜영 교수" },
    { label: "참여 자격", value: "전공 무관 · 한양대학교 ERICA 재학생" },
  ],
} as const;

export const primaryNav: NavItem[] = [
  { label: "홈", href: "/" },
  { label: "모연 소개", href: "/about" },
  { label: "매거진", href: "/magazine" },
  { label: "소식", href: "/news" },
  { label: "활동", href: "/activities" },
  { label: "프로젝트", href: "/projects" },
  { label: "함께하는 사람들", href: "/people" },
];

export const joinNavItem: NavItem = { label: "지원하기", href: "/join" };

/** 주 메뉴에는 두지 않고 표제란에서만 안내하는 항목 (외부 기관 대상) */
export const businessNavItem: NavItem = { label: "비즈니스 제안", href: "/contact" };

export const coreValues = [
  {
    key: "DISCOVER",
    title: "문제를 발견합니다.",
    description: "우리 주변에서 반복되지만 쉽게 지나치는 불편과 사회문제를 찾아냅니다.",
  },
  {
    key: "ANALYZE",
    title: "데이터로 분석합니다.",
    description: "데이터를 수집하고 시각화하며 문제의 원인과 구조를 분석합니다.",
  },
  {
    key: "SOLVE",
    title: "해결책을 제안합니다.",
    description: "분석 결과를 바탕으로 모두에게 도움이 되는 해결 방향을 제안합니다.",
  },
] as const;

export const shareValue = {
  key: "SHARE",
  title: "결과를 공유합니다.",
  description: "프로젝트 결과를 카드뉴스, 보고서, 발표, 공모전 등 다양한 방식으로 공유합니다.",
} as const;

export const valueBadges = ["문제 중심", "데이터 기반", "전공 무관", "협업", "사회적 환류"];

/** Hero 하단 요약 스트립 - 모연의 문제 해결 흐름을 한 줄로 */
export const heroKeywords = [
  { key: "DISCOVER", label: "문제 발견" },
  { key: "ANALYZE", label: "데이터 분석" },
  { key: "SOLVE", label: "해결 제안" },
  { key: "SHARE", label: "결과 공유" },
];

export const activityCards = [
  {
    key: "PROJECT",
    title: "사회문제를 데이터로 탐구합니다.",
    description:
      "팀별로 관심 있는 사회문제를 선정하고 문제 정의부터 데이터 수집, 분석, 해결책 제안까지 하나의 프로젝트를 완성합니다.",
  },
  {
    key: "CONTENT",
    title: "분석 결과를 누구나 이해할 수 있게 전달합니다.",
    description: "복잡한 분석 결과를 카드뉴스, 데이터 시각화, 짧은 콘텐츠로 제작합니다.",
  },
  {
    key: "CHALLENGE",
    title: "학회 안의 경험을 외부 무대로 확장합니다.",
    description: "데이터 분석, 지역 활성화, 사회문제 해결 관련 공모전과 외부 활동에 참여합니다.",
  },
  {
    key: "GROWTH",
    title: "함께 배우며 문제 해결 역량을 키웁니다.",
    description: "데이터 분석 경험이 없는 학회원도 참여할 수 있도록 기초부터 함께 학습합니다.",
  },
];

/** 홈 "우리가 하는 일" 순차 전환 섹션. */
export const workSteps = [
  {
    key: "COLLECT",
    step: "01",
    title: "흩어진 데이터를 모읍니다.",
    description:
      "공공데이터, 설문조사, 통계자료를 직접 수집하고 분석할 수 있는 형태로 다듬습니다. 문제를 제대로 보려면 먼저 재료가 필요합니다.",
    image: "/images/activities/collect.png",
  },
  {
    key: "ANALYZE",
    step: "02",
    title: "숫자 뒤의 원인을 들여다봅니다.",
    description:
      "데이터를 시각화하고 통계적으로 분석해 문제의 구조와 원인을 찾습니다. 눈에 보이지 않던 패턴이 여기서 드러납니다.",
    image: "/images/activities/analyze.png",
  },
  {
    key: "SHARE",
    step: "03",
    title: "찾은 해답을 모두와 나눕니다.",
    description:
      "분석 결과를 카드뉴스, 보고서, 발표로 만들어 공유합니다. 우리만 아는 결론은 아직 해답이 아니라고 생각합니다.",
    image: "/images/activities/share.png",
  },
];

export const processSteps = [
  "문제 발견",
  "문제 정의",
  "데이터 수집",
  "분석과 시각화",
  "해결책 설계",
  "결과 공유",
];


export const processStepsDetailed = [
  { title: "문제 발견", description: "사회와 학교, 지역사회에서 반복되는 문제를 관찰합니다." },
  { title: "문제 정의", description: "문제의 범위, 대상, 원인을 구체적으로 정리합니다." },
  { title: "데이터 수집", description: "공공데이터, 설문조사, 통계자료, 직접 조사 자료를 활용합니다." },
  {
    title: "분석과 시각화",
    description: "데이터를 정리하고 통계적으로 분석하여 구조와 패턴을 파악합니다.",
  },
  { title: "해결책 설계", description: "분석 결과를 바탕으로 현실적인 개선안을 제안합니다." },
  { title: "결과 공유", description: "카드뉴스, 보고서, 발표, 공모전, SNS 등으로 결과를 공유합니다." },
];

export const detailedActivities = [
  {
    title: "데이터 프로젝트",
    description: "문제 정의부터 분석과 해결책 제안까지 팀별 프로젝트를 진행합니다.",
  },
  {
    title: "카드뉴스 제작",
    description: "분석 결과를 이해하기 쉬운 시각 콘텐츠로 제작합니다.",
  },
  {
    title: "공모전 참여",
    description: "교내외 데이터 분석 및 사회문제 해결 공모전에 참여합니다.",
  },
  {
    title: "스터디",
    description: "데이터 분석 기초, 통계, 시각화, 자격증 등을 함께 학습합니다.",
  },
  {
    title: "발표 및 피드백",
    description: "프로젝트 결과를 발표하고 학회원 간 피드백을 통해 개선합니다.",
  },
  // 출처: 정기회의 자료 (2026-08-04)
  {
    title: "데이터 부트캠프",
    description:
      "수리데이터사이언스학과의 데이터 처리·머신러닝 커리큘럼을 바탕으로 모연만의 색을 담은 교육 과정을 기획합니다.",
  },
  {
    title: "대외 기회 발굴",
    description:
      "공모전, 해커톤, 외부 협업 등 모연이 참여할 만한 기회를 상시 발굴해 학회원에게 공유합니다.",
  },
];

// 출처: 정기회의 자료 (2026-08-04) — 현재 기획 단계
// TODO: 커리큘럼·모집 일정 확정 시 상세 내용 갱신
export const bootcamp = {
  status: "기획 중",
  points: [
    "수리데이터사이언스학과의 데이터 처리 · 머신러닝 · 인턴십 프로그램 커리큘럼을 바탕으로 구성",
    "원데이 클래스 또는 주 1~2회 × 한 달 과정, 기수제로 운영",
    "정식 시작 후에는 방학마다 운영 예정",
  ],
};

export const coreValueList = [
  { title: "문제 중심", description: "데이터보다 먼저 문제를 바라봅니다." },
  { title: "데이터 기반", description: "감이 아닌 데이터로 문제의 원인을 분석합니다." },
  { title: "다양한 전공", description: "전공에 관계없이 다양한 관점이 모입니다." },
  { title: "협업", description: "혼자가 아닌 팀으로 문제를 해결합니다." },
  { title: "해결책 제안", description: "분석에서 끝나지 않고 실질적인 방향을 제안합니다." },
  { title: "사회적 환류", description: "프로젝트 결과를 사회와 나누고 환류합니다." },
];
