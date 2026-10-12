import type { CSSProperties } from "react";
import { CHART_LINES, CHART_LAST_LINE, PERSON } from "@/lib/constants";

// Type size, width and letter spacing for each chart line, largest first (index matches CHART_LINES)
// Sizes are in container units (cqi) of the line's own column, so every line fits the plate at any screen width.
// The lower lines have a readable minimum and may wrap on small phones.
const LINE_STYLES = [
  "text-[15cqi] [font-stretch:125%] tracking-[0.06em]",
  "text-[10.5cqi] [font-stretch:125%] tracking-[0.08em]",
  "text-[5.2cqi] [font-stretch:118%] tracking-[0.08em]",
  "text-[max(0.72rem,3.2cqi)] [font-stretch:112%] tracking-[0.09em]",
  "text-[max(0.66rem,2.45cqi)] [font-stretch:105%] tracking-[0.1em]",
  "text-[max(0.62rem,1.95cqi)] [font-stretch:100%] tracking-[0.11em]",
];

const lineDelay = (i: number) => ({ "--line": i }) as CSSProperties;

export const ProfileSection = () => {
  return (
    <section id="top" className="px-5 pb-14 pt-8 sm:px-8 md:pb-20 md:pt-14">
      <div className="mx-auto max-w-4xl">
        <h1 className="sr-only">
          {PERSON.name}, Java backend developer. {CHART_LINES.slice(3).map((l) => l.text).join(". ")}.
        </h1>

        {/* The chart plate */}
        <div className="rounded-md bg-plate px-3 py-9 shadow-plate ring-1 ring-rule sm:px-10 sm:py-14">
          <div aria-hidden="true" className="space-y-[0.9em] sm:space-y-6">
            {CHART_LINES.map((line, i) => (
              <div key={line.acuity} className="grid grid-cols-[1.25rem_1fr_2.5rem] items-center gap-1 sm:grid-cols-[2rem_1fr_3.25rem] sm:gap-3">
                <span className="font-sans text-[0.65rem] tabular-nums text-muted sm:text-xs">{i + 1}</span>
                <div className="@container min-w-0">
                  <p className={`chart-line text-center text-balance ${LINE_STYLES[i]}`} style={lineDelay(i)}>
                    {line.text}
                  </p>
                </div>
                <span className="text-right font-sans text-[0.65rem] tabular-nums text-muted sm:text-xs">{line.acuity}</span>
              </div>
            ))}
          </div>

          {/* The red line printed under the driving-standard row on real charts */}
          <div aria-hidden="true" className="mx-auto my-6 h-[2px] w-2/3 bg-accent sm:my-8" />

          <div className="grid grid-cols-[1.25rem_1fr_2.5rem] items-center gap-1 sm:grid-cols-[2rem_1fr_3.25rem] sm:gap-3">
            <span aria-hidden="true" className="font-sans text-[0.65rem] tabular-nums text-muted sm:text-xs">
              {CHART_LINES.length + 1}
            </span>
            <p className="chart-line text-center text-balance text-[0.66rem] tracking-[0.14em] sm:text-[0.72rem]" style={lineDelay(CHART_LINES.length + 1)}>
              {/* The 6/6 line stays small on purpose; padding gives it a full-size tap target */}
              <a href="#contact" className="link inline-flex min-h-11 items-center px-2">
                {CHART_LAST_LINE.text}
              </a>
            </p>
            <span aria-hidden="true" className="text-right font-sans text-[0.65rem] tabular-nums text-muted sm:text-xs">
              {CHART_LAST_LINE.acuity}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 font-sans sm:flex-row sm:justify-center sm:gap-4">
          <a
            href={`mailto:${PERSON.email}`}
            className="pressable inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-ink px-6 text-sm font-medium text-paper hover:opacity-90 sm:w-auto"
          >
            Email me
          </a>
          <a
            href={PERSON.cv}
            className="pressable inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-ink px-6 text-sm font-medium hover:bg-ink hover:text-paper sm:w-auto"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
};
