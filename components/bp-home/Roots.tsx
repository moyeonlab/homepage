import Wipe from "@/components/blueprint/Wipe";
import { site, roots } from "@/content/site";

/** 어디에서 출발했는지. 학과와의 연결을 도면의 사양표처럼 둔다. */
export default function Roots() {
  return (
    <section className="bp-dark relative overflow-hidden py-24 md:py-36">
      <div className="bp-col relative">
        <Wipe>
          <p className="bp-label">05 / 뿌리</p>
        </Wipe>

        <h2 className="bp-headline mt-10 max-w-3xl text-[clamp(1.8rem,4vw,3.4rem)] leading-[1.24]">
          <Wipe delay={100}>
            <span>모연은 수리데이터사이언스학과에서</span>
          </Wipe>
          <Wipe delay={220}>
            <span>출발했습니다.</span>
          </Wipe>
        </h2>

        <Wipe delay={340}>
          <p className="mt-8 max-w-xl text-[15px] bp-body text-[var(--bp-muted)] md:text-base">
            강의실에서 배우는 수학·통계·데이터사이언스를 교실 밖의 실제 문제에 적용해보는 것이
            모연이 하는 일입니다. 학과에 뿌리를 두고 있지만, 문제를 함께 푸는 사람에 전공 제한을
            두지는 않습니다.
          </p>
        </Wipe>

        <dl className="mt-16 max-w-3xl">
          {[...roots.facts, { label: "학과 영문명", value: roots.departmentNameEn }].map(
            (fact, i) => (
              <div key={fact.label}>
                <div className="grid gap-1 py-6 md:grid-cols-[10rem_1fr] md:gap-8">
                  <Wipe delay={i * 70}>
                    <dt className="bp-label">{fact.label}</dt>
                  </Wipe>
                  <Wipe delay={i * 70 + 60}>
                    <dd className="text-[15px] md:text-base">{fact.value}</dd>
                  </Wipe>
                </div>
              </div>
            )
          )}
        </dl>

        <Wipe delay={120}>
          <span className="mt-12 inline-flex">
            <a
              href={roots.departmentUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="bp-label group inline-flex items-center gap-3 !text-[var(--bp-text)] transition-colors hover:!text-[var(--bp-accent)]"
            >
              {site.department} 홈페이지
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
              <span className="sr-only">(새 창으로 열림)</span>
            </a>
          </span>
        </Wipe>
      </div>
    </section>
  );
}
