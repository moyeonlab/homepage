import type { RecruitmentInfo } from "@/lib/types";

// 2026-08-24 운영 결정 반영: **상시 모집**으로 전환.
//   왜 상시인가 — 학기 초 2주만 여는 방식은 그 창을 놓친 사람을 1년 가까이 기다리게 한다.
//   대신 마감이 없으면 지원자가 「연락이 오긴 오나」를 불안해하므로, 마감 대신
//   **합격 발표 주기(매월 말)**를 약속으로 못 박는다. 이 둘은 세트다 — 한쪽만 두지 말 것.
// 지원서 폼은 2026-08-24 생성 (모연 계정 소유).
//   ⛔ **폼 문항을 구글 폼 화면에서 손으로 고치지 말 것.** 정본은 `scripts/apply-form/Code.gs` 다.
//      고칠 때는 그 파일을 고치고 `폼고치기('1RVtfx8NZ46PV_nE90R_KWB33okUWv9FVmX50QgBXr6Y')` 를
//      돌린다 — `폼만들기` 를 다시 돌리면 폼이 하나 더 생겨 응답이 두 군데로 갈린다.
//   응답 시트: docs.google.com/spreadsheets/d/1iWV2G5kaReu1lTCGhy8hUNnT4H4UFvX-I50hXhzM1h0/edit
export const recruitment: RecruitmentInfo = {
  status: "상시모집",
  periodNote: "상시 모집 — 마감 없음",
  activityPeriod: "학기 단위 (방학 중에도 프로젝트·스터디 진행)",
  target: "전공과 학년에 관계없이 데이터와 사회문제 해결에 관심 있는 한양대학교 ERICA 재학생",
  fee: "10,000원",
  applicationUrl: "https://forms.gle/6ZBGmDUACDdq6u2t8",
  applyMethod: "온라인 지원서(구글 폼) 제출",
  interview: "없음 — 지원서 검토로 선발",
  announceDate: "매월 말 이메일로 개별 안내",
  contact: "공식 이메일 (moyeonlabs@gmail.com)",
  notice:
    "모연은 상시로 신입 학회원을 받습니다. 마감이 없으니 언제든 지원서를 제출하시면 되고, 지원해 주신 분들께는 매월 말 이메일로 결과를 개별 안내드립니다. 면접은 없으며 지원서 검토로 선발합니다.",
};

/**
 * 지금 지원서를 받는 상태인가.
 *
 * ⚠ **화면에서 `status === "모집중"` 으로 직접 비교하지 말 것.**
 *   2026-08-24 에 「상시모집」을 도입했을 때 Hero·JoinCta 가 그렇게 비교하고 있어서,
 *   상시 모집으로 열어 둔 상태가 홈 화면에서는 「다음 모집 안내 보기」(=닫힘)로 보였다.
 *   판정은 여기 한 곳에만 둔다 — 상태를 새로 만들면 이 줄만 고치면 된다.
 */
export const isRecruiting =
  recruitment.status === "모집중" || recruitment.status === "상시모집";

export const applicationSteps = [
  "온라인 지원서 작성",
  "지원서 제출",
  "매월 말 결과 안내",
  "학회비 납부",
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
