import type { ReactNode } from "react";
import Wipe from "./Wipe";

/** 하위 페이지의 일반 섹션. 라벨·제목의 위계를 한곳에서 통일한다. */
export default function Section({
  index,
  label,
  title,
  dark = false,
  children,
}: {
  index?: string;
  label: string;
  title?: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`relative overflow-hidden py-20 md:py-32 ${dark ? "bp-dark" : ""}`}
    >
      {dark && (
        <span
          aria-hidden
          className="bp-orb"
          style={{
            width: 520,
            height: 520,
            right: "2%",
            top: "-24%",
            background: "radial-gradient(circle, #22b8cf, transparent 70%)",
            opacity: 0.28,
          }}
        />
      )}

      <div className="bp-col relative">
        <Wipe>
          <p className="bp-label">{index ? `${index} / ${label}` : label}</p>
        </Wipe>

        {title && (
          <h2 className="mt-6 max-w-4xl text-[clamp(1.7rem,4vw,3.4rem)] leading-[1.2] bp-headline">
            <Wipe delay={120}>
              <span>{title}</span>
            </Wipe>
          </h2>
        )}

        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}
