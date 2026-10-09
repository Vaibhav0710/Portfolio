"use client";

import { useState } from "react";
import { NAV_LINKS, PERSON } from "@/lib/constants";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 font-sans sm:px-8" aria-label="Main">
        <a href="#top" className="text-[0.95rem] font-semibold tracking-tight [font-stretch:115%]">
          {PERSON.name}
        </a>

        <ul className="hidden items-center gap-7 text-sm text-muted md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-ink">
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={PERSON.cv}
            className="rounded-sm border border-ink px-3 py-1.5 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
          >
            CV <span className="text-muted">(PDF)</span>
          </a>
          <button
            type="button"
            className="-mr-2 p-2 md:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((open) => !open)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
              {isOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isOpen && (
        <ul id="mobile-menu" className="border-t border-rule px-5 pb-4 font-sans md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block border-b border-rule py-3 text-base"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};
