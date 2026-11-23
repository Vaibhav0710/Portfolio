import { describe, expect, test } from "vitest";
import { lensFrame } from "./lens";

const PLATE = { width: 200, height: 100 };
const RADIUS = 60;

describe("lensFrame", () => {
  test("centres the lens on a point inside the plate", () => {
    expect(lensFrame(50, 40, PLATE, RADIUS)).toEqual({ x: 50, y: 40, r: 60, visible: true });
  });

  test("hides the lens when the pointer is left of or above the plate", () => {
    expect(lensFrame(-5, 40, PLATE, RADIUS).visible).toBe(false);
    expect(lensFrame(50, -1, PLATE, RADIUS).visible).toBe(false);
  });

  test("hides the lens when the pointer is beyond the plate's width or height", () => {
    expect(lensFrame(201, 40, PLATE, RADIUS).visible).toBe(false);
    expect(lensFrame(50, 101, PLATE, RADIUS).visible).toBe(false);
  });

  test("clamps the centre inside the plate", () => {
    const frame = lensFrame(250, -20, PLATE, RADIUS);
    expect(frame.x).toBe(200);
    expect(frame.y).toBe(0);
  });

  test("passes the radius through", () => {
    expect(lensFrame(10, 10, PLATE, 110).r).toBe(110);
  });

  test("never gives a negative radius", () => {
    expect(lensFrame(10, 10, PLATE, -20).r).toBe(0);
  });

  test("hides the lens on a plate with no size", () => {
    expect(lensFrame(0, 0, { width: 0, height: 0 }, RADIUS)).toEqual({ x: 0, y: 0, r: 60, visible: false });
  });
});
