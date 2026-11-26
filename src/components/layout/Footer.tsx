import { PERSON } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer className="border-t border-rule px-[clamp(20px,4vw,48px)] py-7">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 font-sans text-sm text-muted">
        <span>
          {PERSON.name} · {PERSON.location}
        </span>
        <a
          href={PERSON.sourceCode}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center text-muted underline hover:text-link"
        >
          Source on GitHub
        </a>
      </div>
    </footer>
  );
};
