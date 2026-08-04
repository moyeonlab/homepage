import { site } from "@/content/site";

/**
 * 넓은 화면에서 Hero 좌우로 남는 여백을 채우는 장식.
 * 화면이 충분히 넓을 때만(1600px~) 나타나므로 노트북·모바일 레이아웃에는 영향이 없다.
 * 안에 든 그래프는 모연이 쓰는 분석 방법을 나타내는 그림일 뿐,
 * 실제 프로젝트 수치가 아니다. (수치를 지어내지 않기 위한 의도적 선택)
 */

/** 정규분포 곡선 */
function NormalCurve() {
  return (
    <svg viewBox="0 0 132 52" className="h-[52px] w-full" aria-hidden focusable="false">
      <path
        d="M4 48 C 30 48, 34 8, 66 8 C 98 8, 102 48, 128 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 48 C 30 48, 34 8, 66 8 C 98 8, 102 48, 128 48 Z"
        fill="currentColor"
        opacity="0.14"
      />
      <line x1="66" y1="10" x2="66" y2="48" stroke="currentColor" strokeWidth="1" opacity="0.5" strokeDasharray="3 3" />
    </svg>
  );
}

/** 산점도와 회귀 직선 */
function Regression() {
  const pts = [
    [12, 42], [26, 38], [34, 30], [46, 33], [56, 24],
    [68, 26], [78, 18], [92, 20], [104, 12], [118, 14],
  ];
  return (
    <svg viewBox="0 0 132 52" className="h-[52px] w-full" aria-hidden focusable="false">
      <line x1="8" y1="46" x2="124" y2="10" stroke="currentColor" strokeWidth="1.5" opacity="0.75" />
      {pts.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill="currentColor" opacity="0.9" />
      ))}
    </svg>
  );
}

/** 히스토그램 */
function Histogram() {
  const bars = [10, 20, 34, 44, 38, 26, 14];
  return (
    <svg viewBox="0 0 132 52" className="h-[52px] w-full" aria-hidden focusable="false">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={8 + i * 17}
          y={48 - h}
          width="12"
          height={h}
          rx="2"
          fill="currentColor"
          opacity={0.35 + (h / 44) * 0.55}
        />
      ))}
    </svg>
  );
}

/** 군집 — 서로 다른 전공이 모여 하나의 문제를 다룬다는 뜻 */
function Cluster() {
  const a = [[18, 16], [28, 26], [14, 32], [30, 12], [22, 38], [38, 22]];
  const b = [[86, 34], [98, 22], [106, 38], [92, 46], [114, 28], [104, 14]];
  return (
    <svg viewBox="0 0 132 52" className="h-[52px] w-full" aria-hidden focusable="false">
      <ellipse cx="25" cy="26" rx="22" ry="19" fill="currentColor" opacity="0.1" />
      <ellipse cx="100" cy="30" rx="23" ry="20" fill="currentColor" opacity="0.1" />
      {a.map(([x, y]) => (
        <circle key={`a${x}${y}`} cx={x} cy={y} r="2.6" fill="currentColor" opacity="0.85" />
      ))}
      {b.map(([x, y]) => (
        <circle key={`b${x}${y}`} cx={x} cy={y} r="2.6" fill="currentColor" opacity="0.55" />
      ))}
    </svg>
  );
}

type Chip = { key: string; caption: string; chart: () => React.ReactElement };

const leftChips: Chip[] = [
  { key: "DISTRIBUTION", caption: "흩어진 값의 모양을 본다", chart: NormalCurve },
  { key: "CORRELATION", caption: "무엇이 무엇을 끌고 가는지 본다", chart: Regression },
];

const rightChips: Chip[] = [
  { key: "FREQUENCY", caption: "어디에 얼마나 몰려 있는지 센다", chart: Histogram },
  { key: "CLUSTER", caption: "서로 다른 전공이 한 문제에 모인다", chart: Cluster },
];

function ChipCard({ chip, delay }: { chip: Chip; delay: string }) {
  const Chart = chip.chart;
  return (
    <div
      className="hero-float w-[176px] rounded-[var(--radius-md)] border border-white/12 bg-white/[0.06] p-4 backdrop-blur-sm"
      style={{ animationDelay: delay }}
    >
      <p className="font-eng text-[10px] font-bold tracking-[0.16em] text-[var(--color-accent)]">
        {chip.key}
      </p>
      <div className="mt-2.5 text-[var(--color-hero-dot)]">
        <Chart />
      </div>
      <p className="mt-2.5 text-[11px] leading-snug break-keep text-white/55">{chip.caption}</p>
    </div>
  );
}

export default function HeroSideDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
      {/* 세로 레일 — 우리가 어디에 속해 있는지를 가장자리에 새긴다.
          rotate 대신 writing-mode를 쓴다. rotate는 회전 전 가로 폭만큼
          박스가 남아 칩을 파고든다. */}
      <span className="font-eng absolute top-1/2 left-8 hidden -translate-y-1/2 rotate-180 text-[10px] font-semibold tracking-[0.42em] text-white/25 [writing-mode:vertical-rl] min-[1440px]:block">
        HANYANG UNIV. ERICA
      </span>
      <span className="font-eng absolute top-1/2 right-8 hidden -translate-y-1/2 text-[10px] font-semibold tracking-[0.42em] text-white/25 [writing-mode:vertical-rl] min-[1440px]:block">
        MATHEMATICAL DATA SCIENCE
      </span>

      {/* 데이터 칩 — 콘텐츠(1240px) 바깥에 붙어 좌우 여백을 메운다 */}
      <div className="hidden min-[1600px]:block">
        <div className="absolute top-1/2 right-[calc(50%+632px)] flex -translate-y-1/2 flex-col items-end gap-5">
          {leftChips.map((c, i) => (
            <ChipCard key={c.key} chip={c} delay={`${i * 1.6}s`} />
          ))}
        </div>
        <div className="absolute top-1/2 left-[calc(50%+632px)] flex -translate-y-1/2 flex-col items-start gap-5">
          {rightChips.map((c, i) => (
            <ChipCard key={c.key} chip={c} delay={`${0.8 + i * 1.6}s`} />
          ))}
        </div>
      </div>

      {/* 소속 표기 — 우측 하단, 좌측 하단의 수식과 짝을 이룬다 */}
      <p className="font-eng absolute right-6 bottom-6 hidden text-[11px] tracking-wide text-white/25 lg:block">
        est. {site.foundedYear}
      </p>
    </div>
  );
}
