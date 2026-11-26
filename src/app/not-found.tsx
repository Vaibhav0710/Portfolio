import Link from "next/link";
import { PERSON } from "@/lib/constants";

// A small focus chart, in keeping with the hero plate: the missing page is the line nobody can read.
// Sizes are container units of the plate, like the hero chart, so each line fits at any width.
const LINES = [
  { text: "404", size: "text-[26cqi]" },
  { text: "Page not found", size: "text-[7.4cqi]" },
];
const LINE_CLASS = "m-0 whitespace-nowrap font-bold uppercase leading-none tracking-[0.06em] [font-stretch:110%]";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center px-[clamp(20px,4vw,48px)] py-16">
      <div className="flex w-full max-w-xl flex-col items-center gap-8 font-sans">
        <div className="@container w-full rounded-[22px] bg-plate shadow-plate">
          <h1 className="sr-only">Page not found</h1>
          <div aria-hidden="true" className="flex flex-col items-center gap-[5cqi] px-[6cqi] pb-[6cqi] pt-[9cqi]">
            {LINES.map((line) => (
              <p key={line.text} className={`${LINE_CLASS} ${line.size}`}>
                {line.text}
              </p>
            ))}
            <div className="mx-[4cqi] h-[2px] self-stretch bg-accent" />
          </div>
          <p className="m-0 px-[6cqi] pb-[8cqi] text-center font-serif text-[17px] leading-[1.7] text-muted">
            This address doesn&apos;t match anything on {PERSON.name}&apos;s site.
          </p>
        </div>

        <Link
          href="/"
          className="press inline-flex min-h-[50px] items-center rounded-full bg-ink px-[26px] text-base font-semibold text-paper no-underline hover:text-paper"
        >
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
