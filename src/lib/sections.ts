export interface SectionCrossing {
  id: string;
  isIntersecting: boolean;
}

/**
 * The navbar watches a thin band just above mid-screen. Only a section entering that band changes
 * the active link, so a section leaving it never clears the highlight between two sections.
 */
export const pickActiveSection = (entries: SectionCrossing[], current: string | null): string | null => {
  const crossing = entries.filter((entry) => entry.isIntersecting);
  return crossing.length > 0 ? crossing[crossing.length - 1].id : current;
};

/** Sections with no nav link; watching them clears the highlight while they are on screen. */
const UNLINKED_SECTION_IDS = { before: "top", after: "education" } as const;

export const watchedSectionIds = (linkedIds: string[]): string[] => [
  UNLINKED_SECTION_IDS.before,
  ...linkedIds,
  UNLINKED_SECTION_IDS.after,
];

export const sectionIdFromHref =(href: string): string => href.replace(/^#/, "");
