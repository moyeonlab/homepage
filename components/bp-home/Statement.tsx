import Wipe from "@/components/blueprint/Wipe";
import ScrollText from "@/components/blueprint/ScrollText";

/**
 * 학회의 정체성을 가장 압축한 문장.
 * 스크롤에 맞춰 어절이 하나씩 밝아지도록 해서, 훑지 않고 읽게 만든다.
 */
export default function Statement() {
  return (
    <section className="bp-dark relative overflow-hidden py-32 md:py-52">
      {/* 어두운 밴드 안에서 색이 번지게 둔다 */}
      <span
        aria-hidden
        className="bp-orb"
        style={{
          width: 560, height: 560, right: "4%", top: "-20%",
          background: "radial-gradient(circle, #22b8cf, transparent 70%)",
          opacity: 0.3,
        }}
      />
      <span
        aria-hidden
        className="bp-orb"
        style={{
          width: 480, height: 480, left: "2%", bottom: "-24%",
          background: "radial-gradient(circle, #6d3fd4, transparent 70%)",
          opacity: 0.34,
        }}
      />

      <div className="bp-col relative">
        <Wipe>
          <p className="bp-label">01 / 우리가 서 있는 자리</p>
        </Wipe>

        <blockquote className="mt-16">
          <ScrollText
            className="bp-headline max-w-5xl text-[clamp(1.7rem,4.4vw,4rem)] leading-[1.35]"
            text="우리는 데이터를 분석하기 위해 문제를 찾지 않습니다. 모두의 문제를 해결하기 위해 데이터를 활용합니다."
            accentFrom={9}
          />
        </blockquote>
      </div>
    </section>
  );
}
