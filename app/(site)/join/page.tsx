import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/blueprint/PageHead";
import Section from "@/components/blueprint/Section";
import Rows from "@/components/blueprint/Rows";
import Wipe from "@/components/blueprint/Wipe";
import Highlight from "@/components/blueprint/Highlight";
import Magnetic from "@/components/blueprint/Magnetic";
import { recruitment, applicationSteps, targetCriteria, activityContent } from "@/content/recruitment";
import { faq } from "@/content/faq";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "지원하기 | MOYEON",
  description: "모두의문제연구소 학회원 모집 안내입니다. 전공과 학년에 관계없이 지원할 수 있습니다.",
};

export default function JoinPage() {
  const isOpen = recruitment.status === "모집중";

  // 확인된 값만 노출한다. 미확정 항목을 그럴듯하게 채우지 않는다.
  const facts = [
    { key: "status", lead: "모집 상태", title: recruitment.status },
    {
      key: "period",
      lead: "모집 기간",
      title:
        recruitment.startDate && recruitment.endDate
          ? `${recruitment.startDate} ~ ${recruitment.endDate}`
          : "업데이트 예정",
    },
    { key: "target", lead: "지원 대상", title: recruitment.target },
    { key: "fee", lead: "학회비", title: recruitment.fee ?? "업데이트 예정" },
    { key: "contact", lead: "문의", title: recruitment.contact },
  ];

  return (
    <>
      <PageHead
        index="05"
        label="JOIN MOYEON"
        title="당신이 발견한 문제에서,"
        accent="다음 해답이 시작됩니다."
        description={recruitment.target}
      />

      <Section index="01" label="모집 정보">
        <Rows items={facts} />
        {recruitment.notice && (
          <Wipe delay={160}>
            <p className="mt-8 max-w-xl text-sm bp-body text-[var(--bp-muted)]">
              {recruitment.notice}
            </p>
          </Wipe>
        )}

        <Wipe delay={260}>
          <span className="mt-12 flex flex-wrap gap-4">
            {isOpen && recruitment.applicationUrl ? (
              <Magnetic>
                <a
                  href={recruitment.applicationUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="bp-label group inline-flex items-center gap-3 bg-[var(--bp-text)] px-8 py-5 !text-[var(--bp-bg)] transition-opacity hover:opacity-85"
                >
                  지원서 작성하기
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                  <span className="sr-only">(새 창으로 열림)</span>
                </a>
              </Magnetic>
            ) : (
              <Magnetic>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="bp-label group inline-flex items-center gap-3 bg-[var(--bp-text)] px-8 py-5 !text-[var(--bp-bg)] transition-opacity hover:opacity-85"
                >
                  Instagram에서 모집 소식 받기
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                  <span className="sr-only">(새 창으로 열림)</span>
                </a>
              </Magnetic>
            )}
            {site.email && (
              <a
                href={`mailto:${site.email}`}
                className="bp-btn bp-label inline-flex items-center gap-3 border border-[var(--bp-line-strong)] px-8 py-5 !text-[var(--bp-text)] transition-colors hover:border-transparent hover:!text-white"
              >
                {site.email}
              </a>
            )}
          </span>
        </Wipe>
      </Section>

      <Section index="02" label="지원 대상" title="이런 학생을 기다립니다." dark>
        <Rows
          items={targetCriteria.map((c, i) => ({
            key: c,
            lead: String(i + 1).padStart(2, "0"),
            title: c,
          }))}
        />
      </Section>

      <Section index="03" label="활동 내용" title="함께하게 될 일들">
        <Rows
          items={activityContent.map((c, i) => ({
            key: c,
            lead: String(i + 1).padStart(2, "0"),
            title: c,
          }))}
        />
      </Section>

      <Section index="04" label="지원 절차">
        <ol className="grid gap-px overflow-hidden border border-[var(--bp-line-strong)] bg-[var(--bp-line-strong)] sm:grid-cols-2 lg:grid-cols-5">
          {applicationSteps.map((step, i) => (
            <li key={step} className="bg-[var(--bp-bg)] px-6 py-8">
              <Wipe delay={i * 70}>
                <span className="font-display bp-grad-text text-3xl font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Wipe>
              <Wipe delay={i * 70 + 70}>
                <span className="mt-4 block text-[15px] font-bold">{step}</span>
              </Wipe>
            </li>
          ))}
        </ol>
      </Section>

      <Section index="05" label="자주 묻는 질문">
        <div>
          {faq.map((item) => (
            <details key={item.question} className="group border-t border-[var(--bp-line-strong)]">
              <summary className="bp-row flex cursor-pointer list-none items-center justify-between gap-6 py-7">
                <span className="text-lg bp-subhead md:text-xl">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className="shrink-0 text-2xl font-light text-[var(--bp-muted)] transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-8 text-[15px] bp-body text-[var(--bp-muted)]">
                {item.answer}
              </p>
            </details>
          ))}
          <div className="border-t border-[var(--bp-line-strong)]" />
        </div>
      </Section>

      <section
        className="bp-dark relative overflow-hidden py-28 md:py-44"
        style={{ background: "linear-gradient(135deg, #1b1450 0%, #2a3fa0 50%, #0d6e80 100%)" }}
      >
        <span
          aria-hidden
          className="bp-orb"
          style={{
            width: 620, height: 620, right: "-8%", top: "-26%",
            background: "radial-gradient(circle, #22b8cf, transparent 68%)", opacity: 0.42,
          }}
        />
        <div className="bp-col relative">
          <h2 className="max-w-4xl text-[clamp(1.75rem,4.6vw,4.4rem)] leading-[1.16] bp-headline">
            <Wipe>
              <span>
                데이터 분석 경험이 <Highlight>없어도</Highlight> 괜찮습니다.
              </span>
            </Wipe>
          </h2>
          <Wipe delay={220}>
            <span className="mt-12 inline-flex">
              <Magnetic>
                <Link
                  href="/activities"
                  className="bp-label group inline-flex items-center gap-3 bg-white px-8 py-5 !text-[#1b1450] transition-opacity hover:opacity-90"
                >
                  모연의 활동 보기
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Magnetic>
            </span>
          </Wipe>
        </div>
      </section>
    </>
  );
}
