"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import {
  applyTheme,
  isTheme,
  readStoredTheme,
  resolveTheme,
  saveTheme,
  SYSTEM_DARK_QUERY,
  type Theme,
} from "@/lib/theme";

const ICON_SIZE = 20;

// The head script sets the class before React runs, so the class on <html> is the source of truth.
const subscribeToThemeClass = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
};

const readThemeClass = (): Theme => (document.documentElement.classList.contains("dark") ? "dark" : "light");

// The server cannot know the theme; null renders an empty button until hydration, so the markup matches.
const readServerTheme = (): Theme | null => null;

const useFollowSystemTheme = () => {
  useEffect(() => {
    const media = window.matchMedia(SYSTEM_DARK_QUERY);
    const followSystem = () => {
      if (!isTheme(readStoredTheme())) applyTheme(resolveTheme(null, media.matches));
    };
    media.addEventListener("change", followSystem);
    return () => media.removeEventListener("change", followSystem);
  }, []);
};

export const ThemeToggle = () => {
  const theme = useSyncExternalStore(subscribeToThemeClass, readThemeClass, readServerTheme);
  useFollowSystemTheme();

  const target: Theme = theme === "dark" ? "light" : "dark";
  const label = theme === null ? "Switch theme" : `Switch to ${target} theme`;

  const toggle = () => {
    applyTheme(target);
    saveTheme(target);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="press inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-rule bg-transparent text-ink"
    >
      {theme === "dark" && <Sun aria-hidden="true" size={ICON_SIZE} />}
      {theme === "light" && <Moon aria-hidden="true" size={ICON_SIZE} />}
    </button>
  );
};
