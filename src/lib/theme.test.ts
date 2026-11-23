import { afterEach, describe, expect, test, vi } from "vitest";
import { applyTheme, readStoredTheme, resolveTheme, saveTheme, THEME_SCRIPT, THEME_STORAGE_KEY } from "./theme";

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

const blockStorage = (method: "getItem" | "setItem") => {
  vi.spyOn(Storage.prototype, method).mockImplementation(() => {
    throw new Error("blocked");
  });
};

const runThemeScript = () => {
  new Function(THEME_SCRIPT)();
};

const isDarkClassSet = () => document.documentElement.classList.contains("dark");

const resetPage = () => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  localStorage.clear();
  document.documentElement.className = "";
  document.documentElement.style.colorScheme = "";
};

describe("THEME_SCRIPT", () => {
  afterEach(resetPage);

  const storedValues = ["light", "dark", null, "garbage"];
  const cases = storedValues.flatMap((stored) => [true, false].map((systemDark) => [stored, systemDark] as const));

  test.each(cases)("applies the same rule as resolveTheme (stored %s, system dark %s)", (stored, systemDark) => {
    if (stored !== null) localStorage.setItem(THEME_STORAGE_KEY, stored);
    stubSystemDark(systemDark);

    runThemeScript();

    const expected = resolveTheme(stored, systemDark);
    expect(isDarkClassSet()).toBe(expected === "dark");
    expect(document.documentElement.style.colorScheme).toBe(expected);
  });

  test.each([true, false])("follows the system when storage is blocked (system dark %s)", (systemDark) => {
    blockStorage("getItem");
    stubSystemDark(systemDark);

    expect(runThemeScript).not.toThrow();

    expect(isDarkClassSet()).toBe(systemDark);
    expect(document.documentElement.style.colorScheme).toBe(systemDark ? "dark" : "light");
  });
});

describe("theme storage", () => {
  afterEach(resetPage);

  test("readStoredTheme returns null when storage is blocked", () => {
    blockStorage("getItem");

    expect(readStoredTheme()).toBeNull();
  });

  test("saveTheme does not throw when storage is blocked", () => {
    blockStorage("setItem");

    expect(() => saveTheme("dark")).not.toThrow();
  });

  test("saveTheme stores the choice for readStoredTheme", () => {
    saveTheme("dark");

    expect(readStoredTheme()).toBe("dark");
  });
});

describe("applyTheme", () => {
  afterEach(resetPage);

  test("removes an existing dark class when switching to light", () => {
    document.documentElement.classList.add("dark");

    applyTheme("light");

    expect(isDarkClassSet()).toBe(false);
    expect(document.documentElement.style.colorScheme).toBe("light");
  });

  test("adds the dark class when switching to dark", () => {
    applyTheme("dark");

    expect(isDarkClassSet()).toBe(true);
    expect(document.documentElement.style.colorScheme).toBe("dark");
  });
});
