"use client";

import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { NAV_LINKS, PERSON } from "@/lib/constants";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 font-sans sm:px-8" aria-label="Main">
        <a href="#top" className="inline-flex min-h-11 items-center text-[0.95rem] font-semibold tracking-tight [font-stretch:115%]">
          {PERSON.name}
        </a>

        <ul className="hidden items-center gap-7 text-sm text-muted md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="inline-flex min-h-11 items-center transition-colors hover:text-ink">
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={PERSON.cv}
            className="pressable inline-flex min-h-11 items-center rounded-sm border border-ink px-3.5 text-sm font-medium hover:bg-ink hover:text-paper"
          >
            Download CV
          </a>
          <button
            type="button"
            className="pressable -mr-2.5 inline-flex h-11 w-11 items-center justify-center md:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X aria-hidden="true" size={22} /> : <List aria-hidden="true" size={22} />}
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
                className="flex min-h-12 items-center border-b border-rule text-base"
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
