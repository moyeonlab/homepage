import SectionLabel from "@/components/shared/SectionLabel";
import SectionHeading from "@/components/shared/SectionHeading";
import { site, roots } from "@/content/site";

/**
 * 모연이 어디에서 출발했는지를 밝히는 섹션.
 * 학과 고유의 팔레트(--color-dept)를 써서 모연 블루와 구분되게 두었다.
 */
export default function RootsSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-dept-deep)] text-white">
      <div aria-hidden className="bg-data-dots pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[var(--color-dept-sub)] opacity-15 blur-3xl"
      />

      <div className="container-page relative grid gap-12 py-20 md:py-28 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        {/* break-keep: 한글이 단어 중간에서 끊기지 않게 한다 */}
        <div className="break-keep">
          <SectionLabel index="07" dark>
            OUR ROOTS
          </SectionLabel>
          <SectionHeading dark className="max-w-2xl">
            모연은 수리데이터사이언스학과에서 출발했습니다.
          </SectionHeading>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/70 md:text-base">
            모연은 {site.campus} {site.department}의 학생 학회입니다. 강의실에서 배우는 수학·통계·데이터사이언스를
            교실 밖의 실제 문제에 적용해보는 것이 모연이 하는 일입니다.
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/70 md:text-base">
            학과에 뿌리를 두고 있지만, 문제를 함께 푸는 사람에 전공 제한을 두지는 않습니다.
            서로 다른 전공이 같은 데이터를 다르게 읽는 것이 모연의 방식입니다.
          </p>

          <a
            href={roots.departmentUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group mt-9 inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            수리데이터사이언스학과 홈페이지
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
            <span className="sr-only">(새 창으로 열림)</span>
          </a>
        </div>

        {/* gap-px + 배경색으로 칸 사이 구분선을 만든다. self-center로 늘어나지 않게 둔다 */}
        <dl className="flex flex-col gap-px self-center overflow-hidden rounded-[var(--radius-lg)] border border-white/12 bg-white/12">
          {roots.facts.map((f) => (
            <div key={f.label} className="bg-[var(--color-dept-deep)] px-7 py-6">
              <dt className="text-[13px] font-semibold tracking-wide text-[var(--color-accent)]">
                {f.label}
              </dt>
              <dd className="mt-1.5 text-[17px] leading-snug font-bold text-white">{f.value}</dd>
            </div>
          ))}
          <div className="bg-[var(--color-dept-deep)] px-7 py-6">
            <dt className="text-[13px] font-semibold tracking-wide text-[var(--color-accent)]">
              학과 영문명
            </dt>
            <dd className="font-eng mt-1.5 text-[17px] leading-snug font-bold text-white">
              {roots.departmentNameEn}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
