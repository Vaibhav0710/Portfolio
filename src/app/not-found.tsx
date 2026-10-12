import type { CSSProperties } from "react";
import Link from "next/link";
import { PERSON } from "@/lib/constants";

// A small eye chart, in keeping with the home page: the missing page is the line nobody can read.
const LINES = [
  { text: "404", acuity: "6/60", size: "text-[clamp(3.5rem,18vw,6rem)] [font-stretch:125%] tracking-[0.08em]" },
  { text: "Page not found", acuity: "6/18", size: "text-[clamp(1rem,4.5vw,1.6rem)] [font-stretch:115%] tracking-[0.09em]" },
];

const lineDelay = (i: number) => ({ "--line": i }) as CSSProperties;

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center px-5 py-16 sm:px-8">
      <div className="w-full max-w-xl">
        <div className="rounded-md bg-plate px-4 py-10 shadow-plate ring-1 ring-rule sm:px-10 sm:py-12">
          <h1 className="sr-only">Page not found</h1>
          <div aria-hidden="true" className="space-y-5">
            {LINES.map((line, i) => (
              <div key={line.acuity} className="grid grid-cols-[1.5rem_1fr_2.5rem] items-center gap-2">
                <span className="font-sans text-xs tabular-nums text-muted">{i + 1}</span>
                <p className={`chart-line text-center ${line.size}`} style={lineDelay(i)}>
                  {line.text}
                </p>
                <span className="text-right font-sans text-xs tabular-nums text-muted">{line.acuity}</span>
              </div>
            ))}
          </div>
          <div aria-hidden="true" className="mx-auto my-8 h-[2px] w-2/3 bg-accent" />
          <p className="text-center">This address doesn&apos;t match anything on {PERSON.name}&apos;s site.</p>
        </div>

        <div className="mt-8 flex justify-center font-sans">
          <Link
            href="/"
            className="pressable inline-flex min-h-11 items-center rounded-sm bg-ink px-6 text-sm font-medium text-paper hover:opacity-90"
          >
            Back to the portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
