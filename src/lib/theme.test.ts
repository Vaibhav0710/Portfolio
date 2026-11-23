import { afterEach, describe, expect, test, vi } from "vitest";
import { resolveTheme, THEME_SCRIPT, THEME_STORAGE_KEY } from "./theme";

describe("resolveTheme", () => {
  test("resolveTheme prefers the stored choice over the system", () => {
    expect(resolveTheme("dark", false)).toBe("dark");
    expect(resolveTheme("light", true)).toBe("light");
  });

  test("falls back to the system setting when nothing is stored", () => {
    expect(resolveTheme(null, true)).toBe("dark");
    expect(resolveTheme(null, false)).toBe("light");
  });

  test("ignores an unknown stored value", () => {
    expect(resolveTheme("garbage", false)).toBe("light");
    expect(resolveTheme("garbage", true)).toBe("dark");
  });
});

const stubSystemDark = (matches: boolean) => {
  vi.stubGlobal("matchMedia", (query: string) => ({ matches, media: query }));
};

const runThemeScript = () => {
  new Function(THEME_SCRIPT)();
};

describe("THEME_SCRIPT", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    localStorage.clear();
    document.documentElement.className = "";
    document.documentElement.style.colorScheme = "";
  });

  const cases: [string | null, boolean][] = [
    ["dark", false],
    ["light", true],
    [null, true],
    [null, false],
    ["garbage", true],
  ];

  test.each(cases)("applies the same rule as resolveTheme (stored %s, system dark %s)", (stored, systemDark) => {
    if (stored !== null) localStorage.setItem(THEME_STORAGE_KEY, stored);
    stubSystemDark(systemDark);

    runThemeScript();

    const expected = resolveTheme(stored, systemDark);
    expect(document.documentElement.classList.contains("dark")).toBe(expected === "dark");
    expect(document.documentElement.style.colorScheme).toBe(expected);
  });

  test("follows the system when storage is blocked", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    stubSystemDark(true);

    expect(runThemeScript).not.toThrow();

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
