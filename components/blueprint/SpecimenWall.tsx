import Image from "next/image";

/**
 * 모연이 실제로 만든 데이터 시각화가 검정 위를 흐른다.
 *
 * 카드뉴스 46장 중 '범용 템플릿 슬라이드'는 전부 제외하고
 * 직접 만든 차트·지도·표만 골랐다. 스톡 이미지가 섞이면
 * 벽 전체가 남의 것처럼 보인다.
 */
const ROW_A = [
  "/images/cardnews/magazine-01.jpg", // 코로플레스 지도 (파랑)
  "/images/cardnews/card-38.jpg", // 타 대학 도서관 비교 라인차트
  "/images/cardnews/card-05.jpg", // 국민연금 재정추계 그래프
  "/images/cardnews/magazine-01-ratio.jpg", // 코로플레스 지도 (주황)
  "/images/cardnews/card-41.jpg", // 시험기간 방문자 누적막대
];

const ROW_B = [
  "/images/cardnews/magazine-01-scatter.jpg", // 산점도
  "/images/cardnews/card-20.jpg", // 우유값 변화 라인차트
  "/images/cardnews/card-36.jpg", // 학술정보관 현황
  "/images/cardnews/card-39.jpg", // 방문 데이터 표
  "/images/cardnews/card-37.jpg", // 타 대학 비교
];

const ROW_C = [
  "/images/cardnews/card-40.jpg", // 시험기간 데이터 표
  "/images/cardnews/card-01.jpg", // 국민연금 표지 (코발트)
  "/images/cardnews/card-19.jpg", // 원유가격 연동제
  "/images/cardnews/card-42.jpg", // 요약 및 결론
  "/images/cardnews/card-22.jpg", // 우유값 주요 변화요인
];

function Row({ items, reverse, dur }: { items: string[]; reverse?: boolean; dur: number }) {
  return (
    <div
      className={`bp-marquee ${reverse ? "is-reverse" : ""}`}
      style={{ ["--dur" as string]: `${dur}s` }}
    >
      {/* 끊김 없이 이어지도록 같은 열을 두 번 늘어놓는다 */}
      {[...items, ...items].map((src, i) => (
        <span key={`${src}-${i}`} className="mr-5 block shrink-0">
          <Image
            src={src}
            alt=""
            width={1000}
            height={1000}
            className="h-[22vh] w-auto max-w-none object-cover md:h-[26vh]"
            priority={i < 3}
          />
        </span>
      ))}
    </div>
  );
}

export default function SpecimenWall() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 원래의 색을 살린다. 주황 지도와 코발트 표지가 밝은 바탕에서 살아난다 */}
      <div className="absolute inset-0 flex flex-col justify-center gap-5 opacity-[0.55] saturate-[1.15]">
        <Row items={ROW_A} dur={96} />
        <Row items={ROW_B} dur={132} reverse />
        {/* 좁은 화면에서는 세 줄을 동시에 움직이면 부담이 크다 */}
        <div className="hidden md:block">
          <Row items={ROW_C} dur={112} />
        </div>
      </div>

      {/* 글자가 앉는 왼쪽을 바탕색으로 덮어 읽히게 하고, 위아래는 바탕으로 녹인다 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 58% at 26% 50%, var(--bp-bg) 0%, rgba(251,251,253,0.88) 42%, rgba(251,251,253,0.1) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--bp-bg) 0%, transparent 20%, transparent 80%, var(--bp-bg) 100%)",
        }}
      />

      {/* 배경에 번지는 그라데이션 덩어리 — 화면에 색을 넣는 주된 장치 */}
      <span
        className="bp-orb"
        style={{
          width: 620, height: 620, right: "-6%", top: "-14%",
          background: "radial-gradient(circle, var(--bp-glow-b), transparent 68%)",
        }}
      />
      <span
        className="bp-orb"
        style={{
          width: 540, height: 540, left: "-10%", bottom: "-18%",
          background: "radial-gradient(circle, var(--bp-glow-c), transparent 68%)",
          opacity: 0.4,
        }}
      />
    </div>
  );
}
