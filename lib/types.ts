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
  images?: string[];
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

export type RecruitmentStatus = "모집예정" | "모집중" | "모집마감";

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
