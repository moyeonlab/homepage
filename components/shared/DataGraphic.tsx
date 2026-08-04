/**
 * 실사 이미지가 없을 때 사용하는 추상 데이터 그래픽 placeholder.
 * 흩어진 점들이 선으로 연결되는 형태로 "문제 발견 → 분석 → 해결" 컨셉을 표현.
 */
export default function DataGraphic({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const dot = dark ? "#5B7CFF" : "var(--color-primary)";
  const line = dark ? "rgba(255,255,255,0.25)" : "var(--color-border)";
  const accent = "var(--color-accent)";

  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-label="흩어진 데이터가 선으로 연결되어 하나의 해답으로 모이는 모습을 표현한 그래픽"
    >
      <g stroke={line} strokeWidth="1.5">
        <line x1="40" y1="60" x2="180" y2="150" />
        <line x1="90" y1="220" x2="180" y2="150" />
        <line x1="180" y1="150" x2="320" y2="90" />
        <line x1="180" y1="150" x2="300" y2="220" />
        <line x1="320" y1="90" x2="300" y2="220" />
        <line x1="40" y1="60" x2="90" y2="220" />
      </g>
      <circle cx="40" cy="60" r="6" fill={dot} opacity="0.55" />
      <circle cx="90" cy="220" r="5" fill={dot} opacity="0.4" />
      <circle cx="320" cy="90" r="5" fill={dot} opacity="0.4" />
      <circle cx="300" cy="220" r="6" fill={dot} opacity="0.55" />
      <circle cx="180" cy="150" r="10" fill={accent} />
    </svg>
  );
}
