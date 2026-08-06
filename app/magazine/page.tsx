import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import PageHero from "@/components/shared/PageHero";
import MagazineGrid from "@/components/magazine/MagazineGrid";
// 빌드할 때 매거진에서 내려받아 저장한 목록 (scripts/sync-magazine.mjs · prebuild 로 자동 실행).
// 이걸 넘겨야 발행물 제목이 정적 HTML 에 들어가 검색엔진에 잡힌다.
import snapshot from "@/content/magazine-snapshot.json";

export const metadata: Metadata = pageMeta({
  title: "매거진",
  description:
    "모연 데이터 저널리즘 매거진 — 공공데이터로 지역 사회 문제를 기록합니다. 모든 수치는 발행 전 검증 관문을 통과합니다.",
  path: "/magazine",
});

export default function MagazinePage() {
  return (
    <>
      <PageHero
        label="MOYEON MAGAZINE"
        title={"공공데이터로 기록하는\n지역 사회의 문제들."}
        description="모든 수치는 발행 전 데이터 검증 관문을 통과합니다. 본문 수치는 전부 수치대장에 등록되고, 인용 수치는 원문에서 직접 확인한 위치가 기록된 것만 싣습니다."
      />
      <section className="container-page py-20 md:py-24">
        <MagazineGrid initial={snapshot.발행물} />
      </section>
    </>
  );
}
