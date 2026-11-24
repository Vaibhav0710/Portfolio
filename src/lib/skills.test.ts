import { describe, expect, test } from "vitest";
import { isDimmed } from "./skills";

describe("isDimmed", () => {
  test("dims a work skill when the projects filter is on", () => {
    expect(isDimmed({ where: "work" }, "projects")).toBe(true);
  });

  test("dims nothing when the all filter is on", () => {
    expect(isDimmed({ where: "projects" }, "all")).toBe(false);
    expect(isDimmed({ where: "work" }, "all")).toBe(false);
  });

  test("keeps a skill bright when the filter matches where it was used", () => {
    expect(isDimmed({ where: "work" }, "work")).toBe(false);
    expect(isDimmed({ where: "projects" }, "projects")).toBe(false);
  });

  test("dims a project skill when the work filter is on", () => {
    expect(isDimmed({ where: "projects" }, "work")).toBe(true);
  });
});
