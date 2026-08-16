import SectionLabel from "@/components/shared/SectionLabel";
import SectionHeading from "@/components/shared/SectionHeading";
import { site } from "@/content/site";

export default function NewsSection() {
  return (
    <section className="bg-[var(--color-bg-soft)]">
      <div className="container-page py-16 md:py-20">
        <div className="flex flex-col items-start justify-between gap-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-8 md:flex-row md:items-center md:p-12">
          <div>
            <SectionLabel index="08">LATEST NEWS</SectionLabel>
            <SectionHeading size="md" className="max-w-xl">
              모연의 최근 활동을 만나보세요.
            </SectionHeading>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[var(--color-text-muted)]">
              카드뉴스, 활동 공지, 프로젝트 결과 등 모연의 소식은 공식 Instagram과 이메일로 만나볼 수
              있습니다.
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-3 md:w-auto">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--color-primary-600)]"
            >
              Instagram {site.instagramHandle}
              <span aria-hidden>→</span>
            </a>
            {site.email && (
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[var(--color-border)] px-6 py-3.5 text-[15px] font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                {site.email}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
