import { afterEach, describe, expect, test, vi } from "vitest";
import { REDUCED_MOTION_QUERY, countValue, entranceClass, prefersReducedMotion, tiltAngles } from "./motion";

describe("countValue", () => {
  test("countValue at t=1 is the exact target", () => {
    expect(countValue(400, 1, 0)).toBe("400");
    expect(countValue(1.5, 1, 1)).toBe("1.5");
  });

  test("starts at zero", () => {
    expect(countValue(400, 0, 0)).toBe("0");
  });

  test("clamps t to 0..1", () => {
    expect(countValue(59, 2, 0)).toBe("59");
    expect(countValue(59, -1, 0)).toBe("0");
  });

  test("eases out, so halfway through time it is past halfway in value", () => {
    expect(countValue(100, 0.5, 0)).toBe("88");
  });
});

describe("tiltAngles", () => {
  test("the top-left corner tips the card back and to the left by the maximum", () => {
    expect(tiltAngles(0, 0, 100, 100)).toEqual({ rx: 6, ry: -6 });
  });

  test("the bottom-right corner tilts the opposite way", () => {
    expect(tiltAngles(100, 100, 100, 100)).toEqual({ rx: -6, ry: 6 });
  });

  test("the centre point gives no tilt", () => {
    const angles = tiltAngles(50, 50, 100, 100);
    expect(angles.rx).toBeCloseTo(0);
    expect(angles.ry).toBeCloseTo(0);
  });

  test("uses a custom maximum", () => {
    expect(tiltAngles(0, 100, 200, 100, 10)).toEqual({ rx: -10, ry: -10 });
  });

  test("gives no tilt for a card with no size", () => {
    expect(tiltAngles(10, 10, 0, 0)).toEqual({ rx: 0, ry: 0 });
  });
});

describe("prefersReducedMotion", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("follows the reduced-motion media query", () => {
    vi.stubGlobal("matchMedia", (query: string) => ({ matches: query === REDUCED_MOTION_QUERY, media: query }));
    expect(prefersReducedMotion()).toBe(true);
  });

  test("is false when the browser cannot answer the query", () => {
    vi.stubGlobal("matchMedia", undefined);
    expect(prefersReducedMotion()).toBe(false);
  });
});

describe("entranceClass", () => {
  test("staggers the first four cards", () => {
    expect([0, 1, 2, 3].map(entranceClass)).toEqual(["pop", "pop d2", "pop d3", "pop d4"]);
  });

  test("gives later cards the last delay", () => {
    expect(entranceClass(7)).toBe("pop d4");
  });
});
