import type { Metadata } from "next";
import PageHead from "@/components/blueprint/PageHead";
import Section from "@/components/blueprint/Section";
import Rows from "@/components/blueprint/Rows";
import Wipe from "@/components/blueprint/Wipe";
import Magnetic from "@/components/blueprint/Magnetic";
import { whyUs, collabTypes, collabProcess } from "@/content/contact";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "비즈니스 제안 | MOYEON",
  description: "모두의문제연구소에 산학협력 및 협업을 제안해 주세요.",
};

export default function ContactPage() {
  return (
    <>
      <PageHead
        index="08"
        label="BUSINESS CONTACT"
        title="함께 더 나은"
        accent="세상을 만들어요."
        description="산학협력, 공공기관 협업 등 데이터 분석이 필요한 곳이라면 어디든. 우리의 문은 항상 열려있습니다."
      />

      <Section index="01" label="WHY US" title="왜 우리와 함께해야 하나요?">
        <Rows
          items={whyUs.map((item, i) => ({
            key: item.title,
            lead: String(i + 1).padStart(2, "0"),
            title: item.title,
            body: item.description,
          }))}
        />
      </Section>

      <Section index="02" label="협력 유형" title="이런 협력을 환영합니다." dark>
        <Rows
          items={collabTypes.map((item, i) => ({
            key: item.title,
            lead: String(i + 1).padStart(2, "0"),
            title: item.title,
            body: item.description,
          }))}
        />
      </Section>

      <Section index="03" label="PROCESS" title="협업 진행 과정">
        <ol className="grid gap-px overflow-hidden border border-[var(--bp-line-strong)] bg-[var(--bp-line-strong)] sm:grid-cols-2 lg:grid-cols-4">
          {collabProcess.map((step, i) => (
            <li key={step.step} className="bg-[var(--bp-bg)] px-6 py-8">
              <Wipe delay={i * 70}>
                <span className="font-display bp-grad-text text-3xl font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Wipe>
              <Wipe delay={i * 70 + 70}>
                <span className="bp-subhead mt-4 block text-base">{step.title}</span>
              </Wipe>
              <Wipe delay={i * 70 + 130}>
                <span className="bp-body mt-3 block text-sm text-[var(--bp-muted)]">
                  {step.description}
                </span>
              </Wipe>
            </li>
          ))}
        </ol>
      </Section>

      {/*
        제안 폼은 만들지 않는다. 원래 폼이 실제로 어디로도 전송되지 않아
        실제 연락 수단으로 대체된 이력이 있다 (content/contact.ts 참고).
      */}
      <section
        className="bp-dark relative overflow-hidden py-28 md:py-44"
        style={{ background: "linear-gradient(135deg, #1b1450 0%, #2a3fa0 50%, #0d6e80 100%)" }}
      >
        <span
          aria-hidden
          className="bp-orb"
          style={{
            width: 600, height: 600, right: "-8%", top: "-26%",
            background: "radial-gradient(circle, #22b8cf, transparent 68%)", opacity: 0.42,
          }}
        />
        <div className="bp-col relative">
          <Wipe>
            <p className="bp-label">04 / 문의하기</p>
          </Wipe>
          <h2 className="bp-headline mt-8 max-w-4xl text-[clamp(1.9rem,5.2vw,5rem)] leading-[1.16]">
            <Wipe delay={120}>
              <span>협업 제안서 보내기.</span>
            </Wipe>
          </h2>
          <Wipe delay={260}>
            <p className="bp-body mt-8 max-w-xl text-[15px] text-[var(--bp-muted)] md:text-base">
              기관 · 담당자 · 협력 유형과{" "}
              <em className="text-[var(--bp-text)] not-italic">다루고 싶은 문제</em>를 적어 주시면
              검토 후 회신드립니다.
            </p>
          </Wipe>
          <Wipe delay={380}>
            <span className="mt-14 flex flex-wrap gap-4">
              <Magnetic>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent("[협업 제안] ")}`}
                  className="bp-label group inline-flex items-center gap-3 bg-white px-8 py-5 !text-[#1b1450] transition-opacity hover:opacity-90"
                >
                  {site.email}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </Magnetic>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="bp-btn bp-label inline-flex items-center gap-3 border border-[var(--bp-line-strong)] px-8 py-5 !text-[var(--bp-text)] transition-colors hover:border-transparent hover:!text-white"
              >
                Instagram {site.instagramHandle} DM
                <span className="sr-only">(새 창으로 열림)</span>
              </a>
            </span>
          </Wipe>
        </div>
      </section>
    </>
  );
}
