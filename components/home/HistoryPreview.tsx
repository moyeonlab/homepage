import SectionLabel from "@/components/shared/SectionLabel";
import HistoryTimeline from "@/components/shared/HistoryTimeline";
import Button from "@/components/shared/Button";
import { history, homeHistoryCount } from "@/content/history";
import SectionHeading from "@/components/shared/SectionHeading";

export default function HistoryPreview() {
  const recent = history.slice(-homeHistoryCount);

  return (
    <section className="container-page py-20 md:py-28">
      <SectionLabel index="06">OUR HISTORY</SectionLabel>
      <SectionHeading className="max-w-3xl">
        문제에서 시작해,
        <br />
        하나씩 기록해왔습니다.
      </SectionHeading>

      <div className="mt-12">
        <HistoryTimeline entries={recent} />
      </div>

      <div className="mt-10">
        <Button href="/about#history" variant="text">
          모연의 전체 연혁 보기
        </Button>
      </div>
    </section>
  );
}
