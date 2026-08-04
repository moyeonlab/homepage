export default function ProcessTimeline({ steps, dark = false }: { steps: string[]; dark?: boolean }) {
  return (
    <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:flex md:flex-nowrap md:gap-0">
      {steps.map((step, i) => (
        <li key={step} className="relative flex items-center md:flex-1">
          <div className="flex w-full items-center gap-4 md:flex-col md:items-start md:gap-3">
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                dark ? "bg-[var(--color-accent)] text-[var(--color-primary-dark)]" : "bg-[var(--color-primary)] text-white"
              }`}
            >
              {i + 1}
            </span>
            <span
              className={`text-[15px] font-semibold md:text-base ${dark ? "text-white" : "text-[var(--color-text)]"}`}
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className={`mx-4 hidden h-px flex-1 md:block ${dark ? "bg-white/20" : "bg-[var(--color-border)]"}`}
            />
          )}
        </li>
      ))}
    </ol>
  );
}
