import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  intro?: string;
  /**
   * "sidebar": heading in a narrow left column, content to its right.
   * "stacked": heading above, content uses the full width (for wide content such as the diagram or skills band).
   */
  layout?: "sidebar" | "stacked";
  /** Full-width plate background, to mark a section off from its neighbours */
  band?: boolean;
  children: ReactNode;
}

export const Section = ({ id, title, intro, layout = "sidebar", band = false, children }: SectionProps) => {
  const heading = (
    <>
      <h2 id={`${id}-title`} className="text-balance font-sans text-2xl font-semibold tracking-tight [font-stretch:118%] md:text-[1.75rem]">
        {title}
      </h2>
      {intro && <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-muted">{intro}</p>}
    </>
  );

  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`border-t border-rule ${band ? "bg-plate" : ""}`}>
      {layout === "sidebar" ? (
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-14 sm:px-8 md:grid-cols-[13rem_1fr] md:gap-12 md:py-20">
          <div>
            <div className="md:sticky md:top-24">{heading}</div>
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
          <div className="mb-10 md:mb-12">{heading}</div>
          {children}
        </div>
      )}
    </section>
  );
};
