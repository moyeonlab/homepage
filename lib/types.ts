export interface NavItem {
  label: string;
  href: string;
}

export type ProjectStatus = "게시완료" | "준비중";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  slug: string;
  year?: number;
  category: string;
  summary: string;
  status: ProjectStatus;
  featured?: boolean;
  problem?: string;
  background?: string;
  data?: string;
  analysis?: string;
  findings?: string;
  solution?: string;
  participants?: string;
  thumbnail?: string;
  /** 카드뉴스 전문 — 발행 순서대로. thumbnail(표지)도 첫 장으로 포함한다. */
  images?: string[];
  /**
   * `images` 의 가로세로비. 한 프로젝트의 카드는 비율이 같다 (실측: 카드뉴스 1:1, 발표 슬라이드 16:9).
   * 비율을 미리 알아야 이미지가 로드되기 전에 자리를 잡아 화면이 튀지 않는다.
   */
  imageAspect?: "square" | "wide";
  /**
   * `images` 묶음의 제목. 기본값은 카드뉴스/발표 슬라이드 — 그 둘이 아닌 것
   * (분석 차트, 보고서 그림 등)을 실을 때 여기에 실제 이름을 적는다.
   */
  imagesLabel?: string;
  resultLinks?: ProjectLink[];
  instagramUrl?: string;
}

export interface HistoryEntry {
  year: number;
  month: string;
  title: string;
  description?: string;
  link?: string;
}

export interface Person {
  name: string;
  role: string;
  department?: string;
  generation?: string;
  image?: string;
  description?: string;
}

/** 「상시모집」은 마감이 없는 상태다 — 기간 대신 «언제 답을 받는지»(announceDate)가 약속이 된다. */
export type RecruitmentStatus = "모집예정" | "모집중" | "상시모집" | "모집마감";

export interface RecruitmentInfo {
  status: RecruitmentStatus;
  startDate?: string;
  endDate?: string;
  /** 확정 전 임시 표기 (예: "2026년 9월 초 예정") — startDate/endDate 확정 시 무시됨 */
  periodNote?: string;
  /** 접수 방법 (예: "공식 이메일 접수") */
  applyMethod?: string;
  activityPeriod?: string;
  target: string;
  fee?: string;
  applicationUrl?: string;
  interview?: string;
  announceDate?: string;
  contact: string;
  notice?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface NewsItem {
  id: number;
  date: string;
  category: string;
  title: string;
  body: string;
  image: string;
  link: string;
}
