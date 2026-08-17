/**
 * 화면에 고정되어 깔리는 설계도 프레임.
 * 세로 헤어라인 몇 줄과 모서리 십자 마커만으로 "도면 위에 얹힌 문서" 느낌을 만든다.
 * 순수 장식이므로 aria-hidden, 포인터 이벤트도 통과시킨다.
 */
export default function Frame() {
  /*
    기준선은 실제 레이아웃 경계에만 둔다.
    레일의 오른쪽 끝과 콘텐츠 열이 시작하는 자리 — 임의의 위치에 그으면
    도면이 아니라 그냥 줄무늬로 보인다.
  */
  const verticals = ["var(--bp-gutter)", "calc(var(--bp-gutter) + 40px)"];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {verticals.map((left, i) => (
        <span
          key={left}
          className="absolute top-0 bottom-0 hidden w-px lg:block"
          style={{
            left,
            background: i === 0 ? "var(--bp-line-strong)" : "var(--bp-line)",
          }}
        />
      ))}

      {/* 상·하단 가로 기준선 */}
      <span
        className="absolute inset-x-0 h-px"
        style={{ top: 88, background: "var(--bp-line)" }}
      />
      <span
        className="absolute inset-x-0 h-px"
        style={{ bottom: 88, background: "var(--bp-line)" }}
      />

      {/* 교차점의 십자 마커 — 도면의 기준점 */}
      {[
        { left: "var(--bp-gutter)", top: 88 },
        { left: "var(--bp-gutter)", bottom: 88 },
        { left: "50%", top: 88 },
        { left: "50%", bottom: 88 },
      ].map((pos, i) => (
        <span
          key={i}
          className="absolute hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 lg:block"
          style={{
            ...pos,
            ...(pos.bottom !== undefined ? { transform: "translate(-50%, 50%)" } : {}),
            background: `linear-gradient(var(--bp-mark),var(--bp-mark)) center/1px 100% no-repeat,
                         linear-gradient(var(--bp-mark),var(--bp-mark)) center/100% 1px no-repeat`,
          }}
        />
      ))}
    </div>
  );
}
