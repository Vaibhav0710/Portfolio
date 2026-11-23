export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
export const SYSTEM_DARK_QUERY = "(prefers-color-scheme: dark)";

export const isTheme = (value: string | null): value is Theme => value === "light" || value === "dark";

/** A saved choice wins; otherwise the page follows the system setting. */
export const resolveTheme = (stored: string | null, systemDark: boolean): Theme => {
  if (isTheme(stored)) return stored;
  return systemDark ? "dark" : "light";
};

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
};

// Storage throws in some private windows and when site data is blocked: that only means no saved choice.
export const readStoredTheme = (): string | null => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
};

// If storage is blocked the theme still applies for this visit; it is just not remembered.
export const saveTheme = (theme: Theme) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    return;
  }
};

/**
 * Runs in <head> before the first paint so a dark page never flashes light. It repeats the
 * resolveTheme rule in plain ES5; theme.test.ts checks both give the same answer.
 */
export const THEME_SCRIPT = `(function () {
  var stored = null;
  try { stored = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)}); } catch (e) {}
  try {
    var systemDark = window.matchMedia(${JSON.stringify(SYSTEM_DARK_QUERY)}).matches;
    var theme = stored === "light" || stored === "dark" ? stored : systemDark ? "dark" : "light";
    var root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  } catch (e) {}
})();`;
