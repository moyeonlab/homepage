import SectionLabel from "@/components/shared/SectionLabel";
import ProcessTimeline from "@/components/shared/ProcessTimeline";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import Button from "@/components/shared/Button";
import { activityCards, homeProcessSteps } from "@/content/site";
import SectionHeading from "@/components/shared/SectionHeading";

export default function ActivitiesPreview() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-primary-dark)] text-white">
      <div aria-hidden className="bg-data-dots pointer-events-none absolute inset-0" />
      <div className="container-page relative py-20 md:py-28">
        <SectionLabel index="03" dark>WHAT WE DO</SectionLabel>
        <SectionHeading dark className="max-w-3xl">
          문제를 발견하고,
          <br />
          해답을 만들어갑니다.
        </SectionHeading>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/70 md:text-base">
          모연의 활동은 하나의 질문에서 시작합니다. 우리가 함께 겪고 있지만 쉽게 지나쳤던 문제를
          발견하고, 데이터를 통해 원인을 분석합니다. 그리고 분석 결과를 바탕으로 해결책을 제안하며
          카드뉴스, 보고서, 발표, 공모전 등 다양한 방식으로 결과를 공유합니다.
        </p>

        <div className="mt-14">
          <ProcessTimeline steps={homeProcessSteps} dark />
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {activityCards.map((card, i) => (
            <RevealOnScroll key={card.key} delay={i * 80}>
              <div className="h-full rounded-[var(--radius-lg)] border border-white/10 bg-white/5 p-7">
                <p className="text-sm font-bold tracking-widest text-[var(--color-accent)]">{card.key}</p>
                <h3 className="mt-3 text-lg font-bold">{card.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">{card.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <p className="mt-12 max-w-2xl border-l-4 border-[var(--color-accent)] pl-5 text-lg font-semibold leading-relaxed">
          전공보다 중요한 것은 문제를 바라보는 관심과 해결해보고 싶은 마음입니다.
        </p>

        <div className="mt-8">
          <Button href="/activities" variant="secondary" className="!border-white !text-white hover:!bg-white/10">
            모연의 활동 자세히 보기
          </Button>
        </div>
      </div>
    </section>
  );
}
