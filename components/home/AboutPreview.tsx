import SectionLabel from "@/components/shared/SectionLabel";
import SectionHeading from "@/components/shared/SectionHeading";
import ValueCard from "@/components/shared/ValueCard";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import Button from "@/components/shared/Button";
import { coreValues, valueBadges } from "@/content/site";

export default function AboutPreview() {
  return (
    <section className="relative overflow-hidden">
      {/* 데이터 격자 텍스처 */}
      <div aria-hidden className="bg-data-grid pointer-events-none absolute inset-0" />

      <div className="container-page relative py-20 md:py-28">
        <SectionLabel index="01">ABOUT MOYEON</SectionLabel>
        <SectionHeading className="max-w-3xl">모연은 어떤 학회인가요?</SectionHeading>
        <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-relaxed text-[var(--color-text-muted)] md:text-base">
          <p>
            모두의문제연구소는 사회와 일상 속에서 우리가 함께 겪고 있는 문제를 발견하고, 데이터를 통해
            원인을 분석하며, 모두를 위한 해결책을 제안하는 한양대학교 ERICA 학생 학회입니다.
          </p>
          <p>
            특정 전공의 지식만을 요구하지 않습니다. 다양한 학과의 학생들이 각자의 관점과 경험을 나누며
            하나의 문제를 여러 방향에서 바라봅니다.
          </p>
        </div>

        {/* 학회 정체성을 가장 압축한 문장 — 페이지에서 가장 큰 목소리로 */}
        <figure className="relative mt-12 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-primary-dark)] px-8 py-12 text-white md:px-14 md:py-16">
          <div aria-hidden className="bg-data-dots pointer-events-none absolute inset-0" />
          <span
            aria-hidden
            className="pointer-events-none absolute left-5 top-2 font-mono text-[110px] leading-none text-white/10 md:text-[150px]"
          >
            &ldquo;
          </span>
          <blockquote className="relative">
            <p className="text-balance text-xl font-bold leading-[1.5] tracking-tight md:text-3xl">
              우리는 데이터를 분석하기 위해 문제를 찾지 않습니다.
              <br />
              모두의 문제를 해결하기 위해{" "}
              <span className="text-[var(--color-accent)]">데이터를 활용</span>합니다.
            </p>
          </blockquote>
        </figure>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {coreValues.map((value, i) => (
            <RevealOnScroll key={value.key} delay={i * 100} className="h-full">
              <ValueCard
                eyebrow={value.key}
                title={value.title}
                description={value.description}
                index={String(i + 1).padStart(2, "0")}
              />
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {valueBadges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-[var(--color-border)] bg-white px-3.5 py-1.5 text-sm font-medium text-[var(--color-primary)]"
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="mt-10">
          <Button href="/about" variant="text" className="group">
            모연 소개 더 보기
          </Button>
        </div>
      </div>
    </section>
  );
}
