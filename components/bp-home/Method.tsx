import Wipe from "@/components/blueprint/Wipe";
import { workSteps } from "@/content/site";

/** 일하는 방식 3단계. 번호를 화면만큼 키워 리듬을 만든다. */
export default function Method() {
  return (
    <section className="relative py-24 md:py-36">
      <div className="bp-col">
        <Wipe>
          <p className="bp-label">02 / 일하는 방식</p>
        </Wipe>

        <ol className="mt-20">
          {workSteps.map((step, i) => (
            <li key={step.key} className="border-t border-[var(--bp-line-strong)]">
              <div className="grid gap-6 py-14 md:grid-cols-[minmax(0,1fr)_1.1fr] md:gap-16 md:py-20">
                <div>
                  <Wipe delay={i * 80}>
                    <span className="font-display block text-[clamp(4rem,11vw,10rem)] leading-[0.85] text-[var(--bp-line-strong)]">
                      {step.step}
                    </span>
                  </Wipe>
                  <Wipe delay={i * 80 + 120}>
                    <h3 className="bp-headline mt-8 text-3xl leading-snug md:text-5xl">
                      {step.title}
                    </h3>
                  </Wipe>
                </div>

                <div className="md:self-end md:pb-4">
                  <Wipe delay={i * 80 + 200}>
                    <span className="bp-label !text-[var(--bp-accent)]">{step.key}</span>
                  </Wipe>
                  <Wipe delay={i * 80 + 260}>
                    <p className="mt-5 max-w-md text-[15px] bp-body text-[var(--bp-muted)] md:text-base">
                      {step.description}
                    </p>
                  </Wipe>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="border-t border-[var(--bp-line-strong)]" />
      </div>
    </section>
  );
}
