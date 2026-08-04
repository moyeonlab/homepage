import type { RecruitmentInfo } from "@/lib/types";

// TODO: 최신 모집 일정 확정 시 status/startDate/endDate/applicationUrl 업데이트.
// 기존 2025-2학기 모집 정보(9/1~9/14)는 과거 정보이므로 재사용하지 않음.
export const recruitment: RecruitmentInfo = {
  status: "모집예정",
  target: "전공과 학년에 관계없이 데이터와 사회문제 해결에 관심 있는 한양대학교 ERICA 재학생",
  // TODO: 현재 운영 기준의 학회비 여부 확인 후 게시
  fee: undefined,
  applicationUrl: undefined,
  contact: "공식 이메일 (moyeonlabs@gmail.com)",
  notice: "다음 모집 일정은 확정되는 대로 이 페이지와 Instagram을 통해 안내합니다.",
};

export const applicationSteps = [
  "모집 공고 확인",
  "지원서 작성",
  "필요 시 간단한 인터뷰",
  "최종 안내",
  "학회 활동 시작",
];

export const targetCriteria = [
  "한양대학교 ERICA 재학생",
  "전공 무관",
  "학년 무관",
  "데이터 분석 경험 무관",
  "사회문제와 문제 해결에 관심 있는 학생",
  "팀 프로젝트와 협업에 참여할 수 있는 학생",
];

export const activityContent = [
  "사회문제 해결 프로젝트",
  "데이터 수집과 분석",
  "카드뉴스 및 콘텐츠 제작",
  "발표와 피드백",
  "공모전 참여",
  "데이터 분석 스터디",
];
