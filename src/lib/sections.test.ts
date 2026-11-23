import { describe, expect, test } from "vitest";
import { pickActiveSection, sectionIdFromHref } from "./sections";

describe("pickActiveSection", () => {
  test("keeps the current section when no entry is crossing the band", () => {
    const entries = [{ id: "work", isIntersecting: false }];

    expect(pickActiveSection(entries, "about")).toBe("about");
  });

  test("makes a crossing section active", () => {
    const entries = [
      { id: "about", isIntersecting: false },
      { id: "work", isIntersecting: true },
    ];

    expect(pickActiveSection(entries, "about")).toBe("work");
  });

  test("lets the last crossing entry win when several arrive together", () => {
    const entries = [
      { id: "work", isIntersecting: true },
      { id: "projects", isIntersecting: true },
    ];

    expect(pickActiveSection(entries, null)).toBe("projects");
  });

  test("stays empty until a section crosses the band", () => {
    expect(pickActiveSection([], null)).toBeNull();
  });
});

describe("sectionIdFromHref", () => {
  test("drops the leading hash", () => {
    expect(sectionIdFromHref("#skills")).toBe("skills");
  });
});
