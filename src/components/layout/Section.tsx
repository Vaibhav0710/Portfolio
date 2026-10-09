import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

/** A page section: the heading sits in a narrow left column, the content to its right (stacked on mobile). */
export const Section = ({ id, title, intro, children }: SectionProps) => {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-rule">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-14 sm:px-8 md:grid-cols-[13rem_1fr] md:gap-12 md:py-20">
        <div>
          <div className="md:sticky md:top-24">
            <h2 id={`${id}-title`} className="text-balance font-sans text-2xl font-semibold tracking-tight [font-stretch:118%] md:text-[1.75rem]">
              {title}
            </h2>
            {intro && <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-muted">{intro}</p>}
          </div>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
};
