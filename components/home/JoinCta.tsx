import SectionLabel from "@/components/shared/SectionLabel";
import Button from "@/components/shared/Button";
import { isRecruiting } from "@/content/recruitment";
import { site } from "@/content/site";
import SectionHeading from "@/components/shared/SectionHeading";

export default function JoinCta() {
  const isOpen = isRecruiting;

  return (
    <section className="container-page py-20 md:py-28">
      <div className="rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-8 py-16 text-center text-white md:px-16 md:py-20">
        <SectionLabel index="09" dark>JOIN MOYEON</SectionLabel>
        <SectionHeading dark className="mx-auto max-w-3xl">
          당신이 발견한 문제에서,
          <br />
          다음 해답이 시작될 수 있습니다.
        </SectionHeading>
        <p className="text-balance mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/80 md:text-base">
          모두의문제연구소는 전공과 학년에 관계없이 데이터와 사회문제 해결에 관심 있는 모든
          한양대학교 학생에게 열려 있습니다. 데이터 분석 경험이 없어도 괜찮습니다.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {isOpen ? (
            <>
              <Button href="/join" variant="secondary" className="!border-white !text-white hover:!bg-white/10" fullWidthOnMobile>
                지원 안내 보기
              </Button>
              <Button href="/join" variant="primary" className="!bg-white !text-[var(--color-primary)] hover:!bg-white/90" fullWidthOnMobile>
                학회원 지원하기
              </Button>
            </>
          ) : (
            <>
              <Button href="/join" variant="secondary" className="!border-white !text-white hover:!bg-white/10" fullWidthOnMobile>
                다음 모집 안내 보기
              </Button>
              <Button
                href={site.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                variant="primary"
                className="!bg-white !text-[var(--color-primary)] hover:!bg-white/90"
                fullWidthOnMobile
              >
                Instagram에서 소식 확인하기
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
