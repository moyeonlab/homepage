import type { ReactNode } from "react";
import Wipe from "./Wipe";

/** 헤어라인으로 구분되는 행 목록. 이 사이트에서 정보를 담는 기본 형태. */
export default function Rows({
  items,
}: {
  items: { key: string; lead: ReactNode; title: ReactNode; body?: ReactNode }[];
}) {
  return (
    <div>
      {items.map((item, i) => (
        <div key={item.key} className="border-t border-[var(--bp-line-strong)]">
          <div className="bp-row grid gap-3 py-8 md:grid-cols-[7rem_1fr_1.1fr] md:gap-10 md:py-10">
            <Wipe delay={i * 60}>
              <span className="bp-label pt-1">{item.lead}</span>
            </Wipe>
            <Wipe delay={i * 60 + 60}>
              <span className="text-lg bp-subhead md:text-2xl">{item.title}</span>
            </Wipe>
            {item.body && (
              <Wipe delay={i * 60 + 120}>
                <span className="block text-[15px] bp-body text-[var(--bp-muted)]">
                  {item.body}
                </span>
              </Wipe>
            )}
          </div>
        </div>
      ))}
      <div className="border-t border-[var(--bp-line-strong)]" />
    </div>
  );
}
