import { PERSON } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 font-sans text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© 2026 {PERSON.name}. Built with Next.js, hosted on Vercel.</p>
        <a href={PERSON.sourceCode} target="_blank" rel="noreferrer" className="link inline-flex min-h-11 items-center self-start text-ink sm:self-auto">
          Source code on GitHub
        </a>
      </div>
    </footer>
  );
};
