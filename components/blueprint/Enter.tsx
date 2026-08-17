"use client";

import { usePathname } from "next/navigation";

/**
 * 페이지 진입 오버레이. 판이 위로 걷히면서 내용이 드러난다.
 *
 * 상태 없이 CSS 애니메이션으로만 돌린다. 경로가 바뀌면 key 가 바뀌어
 * 요소가 새로 마운트되고 애니메이션이 다시 재생된다.
 * pointer-events 를 막지 않으므로 걷히는 중에도 클릭이 통과한다.
 */
export default function Enter() {
  const pathname = usePathname();
  return <div key={pathname} aria-hidden className="bp-enter" />;
}
