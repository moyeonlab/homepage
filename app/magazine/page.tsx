import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import MagazineGrid from "@/components/magazine/MagazineGrid";

export const metadata: Metadata = {
  title: "매거진 | MOYEON",
  description:
    "모연 데이터 저널리즘 매거진 — 공공데이터로 지역 사회 문제를 기록합니다. 모든 수치는 발행 전 검증 관문을 통과합니다.",
};

export default function MagazinePage() {
  return (
    <>
      <PageHero
        label="MOYEON MAGAZINE"
        title={"공공데이터로 기록하는\n지역 사회의 문제들."}
        description="모든 수치는 발행 전 데이터 검증 관문을 통과합니다. 본문 수치는 전부 수치대장에 등록되고, 인용 수치는 원문에서 직접 확인한 위치가 기록된 것만 싣습니다."
      />
      <section className="container-page py-20 md:py-24">
        <MagazineGrid />
      </section>
    </>
  );
}
