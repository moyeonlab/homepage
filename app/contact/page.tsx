import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SectionLabel from "@/components/shared/SectionLabel";
import SectionHeading from "@/components/shared/SectionHeading";
import ValueCard from "@/components/shared/ValueCard";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import { whyUs, collabTypes, collabProcess } from "@/content/contact";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "비즈니스 제안 | MOYEON",
  description: "모두의문제연구소에 산학협력 및 협업을 제안해 주세요.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="BUSINESS CONTACT"
        title={"함께 더 나은\n세상을 만들어요."}
        description="산학협력, 공공기관 협업 등 데이터 분석이 필요한 곳이라면 어디든. 우리의 문은 항상 열려있습니다."
      />

      <section className="container-page py-20 md:py-24">
        <SectionLabel>Why Us</SectionLabel>
        <SectionHeading className="max-w-3xl">왜 우리와 함께해야 하나요?</SectionHeading>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((item, i) => (
            <RevealOnScroll key={item.title} delay={i * 60}>
              <ValueCard
                index={String(i + 1).padStart(2, "0")}
                eyebrow={`— ${String(i + 1).padStart(2, "0")}`}
                title={item.title}
                description={item.description}
              />
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-bg-soft)]">
        <div className="container-page py-20 md:py-24">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <SectionLabel>협력 유형</SectionLabel>
              <SectionHeading className="max-w-lg">이런 협력을 환영합니다.</SectionHeading>
              <div className="mt-8 flex flex-col gap-3">
                {collabTypes.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-sm)]"
                  >
                    <p className="text-base font-bold text-[var(--color-text)]">{item.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionLabel>문의하기</SectionLabel>
              <SectionHeading className="max-w-lg">협업 제안서 보내기.</SectionHeading>
              <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-8 shadow-[var(--shadow-sm)]">
                <p className="text-[15px] leading-relaxed text-[var(--color-text-muted)]">
                  협업 제안은 아래로 보내주세요. 기관 · 담당자 · 협력 유형과{" "}
                  <span className="font-medium italic text-[var(--color-text)]">다루고 싶은 문제</span>를
                  적어 주시면 검토 후 회신드립니다.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={`mailto:${site.email}?subject=${encodeURIComponent("[협업 제안] ")}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--color-primary-600)]"
                  >
                    {site.email}
                  </a>
                  <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[var(--color-primary)] px-6 py-3 text-[15px] font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-bg-blue-soft)]"
                  >
                    인스타그램 {site.instagramHandle} DM
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <SectionLabel>Process</SectionLabel>
        <SectionHeading className="max-w-3xl">협업 진행 과정</SectionHeading>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {collabProcess.map((step) => (
            <div
              key={step.step}
              className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-sm)]"
            >
              <span className="font-eng text-xs font-semibold tracking-widest text-[var(--color-accent)]">
                {step.step}
              </span>
              <p className="mt-4 text-base font-bold text-[var(--color-text)]">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
