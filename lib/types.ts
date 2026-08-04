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
