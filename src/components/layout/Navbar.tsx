"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { List, X } from "@phosphor-icons/react";
import { ACTION_LABELS, NAV_LINKS, PERSON, type NavLink } from "@/lib/constants";
import { sectionIdFromHref, watchedSectionIds } from "@/lib/sections";
import { ThemeToggle } from "./ThemeToggle";
import { useActiveSection } from "./useActiveSection";

const SECTION_IDS = watchedSectionIds(NAV_LINKS.map((link) => sectionIdFromHref(link.href)));
const EMAIL_HREF = `mailto:${PERSON.email}`;
const MENU_ICON_SIZE = 22;

interface NavItemProps {
  link: NavLink;
  isActive: boolean;
}

// The underline bar scales in from the left; aria-current tells screen readers which section is on screen
const NavItem = ({ link, isActive }: NavItemProps) => (
  <a
    href={link.href}
    aria-current={isActive ? "true" : undefined}
    className={`navlink relative inline-flex min-h-11 items-center ${isActive ? "font-bold" : "font-medium"}`}
  >
    {link.name}
    <span
      aria-hidden="true"
      className={`absolute inset-x-0 bottom-1.5 h-0.5 origin-left rounded-[2px] bg-accent transition-transform duration-350 ease-(--ease-out) motion-reduce:transition-none ${isActive ? "scale-x-100" : "scale-x-0"}`}
    />
  </a>
);

interface PhoneMenuProps {
  activeId: string | null;
  onNavigate: () => void;
}

const PhoneMenu = ({ activeId, onNavigate }: PhoneMenuProps) => (
  <ul id="phone-menu" className="border-t border-rule px-[clamp(20px,4vw,48px)] pb-4 font-sans md:hidden">
    {NAV_LINKS.map((link) => {
      const isActive = sectionIdFromHref(link.href) === activeId;
      return (
        <li key={link.href}>
          <a
            href={link.href}
            onClick={onNavigate}
            aria-current={isActive ? "true" : undefined}
            className={`navlink flex min-h-12 items-center border-b border-rule text-base ${isActive ? "font-bold" : ""}`}
          >
            {link.name}
          </a>
        </li>
      );
    })}
    <li>
      <a href={EMAIL_HREF} onClick={onNavigate} className="navlink flex min-h-12 items-center text-base font-semibold">
        {ACTION_LABELS.email}
      </a>
    </li>
  </ul>
);

// Escape closes the open phone menu and puts focus back on the button that opened it
const useCloseOnEscape = (isOpen: boolean, close: () => void, focusTarget: RefObject<HTMLButtonElement | null>) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      focusTarget.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close, focusTarget]);
};

/**
 * Sticky header, exactly 61px tall (8px padding, 44px controls, 8px padding, 1px rule); --nav-h in
 * globals.css repeats that height so the pinned sections stick right under it.
 */
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const activeId = useActiveSection(SECTION_IDS);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  useCloseOnEscape(isOpen, closeMenu, menuButtonRef);

  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-glass backdrop-blur-[14px]">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-[calc(1180px_+_2*clamp(20px,4vw,48px))] flex-wrap items-center justify-between gap-x-6 gap-y-1.5 px-[clamp(20px,4vw,48px)] py-2 font-sans"
      >
        <a
          href="#top"
          className="navlink inline-flex min-h-11 items-center text-[17px] font-bold tracking-[0.01em] [font-stretch:118%]"
        >
          {PERSON.name}
        </a>

        <div className="flex flex-wrap items-center gap-x-[18px] gap-y-0.5 text-[15px]">
          <ul className="hidden items-center gap-x-[18px] md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavItem link={link} isActive={sectionIdFromHref(link.href) === activeId} />
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <a
            href={EMAIL_HREF}
            className="press hidden min-h-11 items-center rounded-full bg-ink px-[18px] font-semibold text-paper no-underline md:inline-flex"
          >
            {ACTION_LABELS.email}
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="press inline-flex h-11 w-11 cursor-pointer items-center justify-center md:hidden"
            aria-expanded={isOpen}
            aria-controls="phone-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X aria-hidden="true" size={MENU_ICON_SIZE} /> : <List aria-hidden="true" size={MENU_ICON_SIZE} />}
          </button>
        </div>
      </nav>

      {isOpen && <PhoneMenu activeId={activeId} onNavigate={closeMenu} />}

      <div aria-hidden="true" className="prog absolute inset-x-0 -bottom-px h-[3px] origin-left bg-accent" />
    </header>
  );
};
