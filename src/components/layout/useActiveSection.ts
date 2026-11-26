"use client";

import { useEffect, useState } from "react";
import { pickActiveSection } from "@/lib/sections";

// A band from 45% to 50% of the viewport height: a section is current once its top passes just above mid-screen
const SECTION_BAND = "-45% 0px -50% 0px";

/** Returns the id of the section in the middle of the screen; null on the server and before the first crossing. */
export const useActiveSection = (ids: readonly string[]): string | null => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const crossings = entries.map((entry) => ({ id: entry.target.id, isIntersecting: entry.isIntersecting }));
        setActiveId((current) => pickActiveSection(crossings, current));
      },
      { root: document, rootMargin: SECTION_BAND },
    );

    ids.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
};
