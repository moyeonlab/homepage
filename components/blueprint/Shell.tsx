import type { ReactNode } from "react";
import Frame from "./Frame";
import Rail from "./Rail";
import SmoothScroll from "./SmoothScroll";
import Enter from "./Enter";
import Foot from "@/components/bp-home/Foot";

/**
 * 모든 페이지의 공통 껍데기.
 * 관성 스크롤·커스텀 커서·진입 전환·고정 레일·표제란을 한곳에서 건다.
 */
export default function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="bp relative min-h-svh">
      <SmoothScroll />
      <Enter />
      <Frame />
      <Rail />

      <main className="relative z-10">{children}</main>

      <Foot />
    </div>
  );
}
