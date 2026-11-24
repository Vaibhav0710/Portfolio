import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { REDUCED_MOTION_QUERY } from "@/lib/motion";
import { CountUp } from "./CountUp";

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined;
}

const PROPS = { value: 400, decimals: 0, suffix: "+", spokenSuffix: "+" };

/** An observer that reports the element as off screen at a given top edge as soon as it is watched */
const offScreenObserverAt = (top: number) =>
  class {
    constructor(private readonly callback: IntersectionObserverCallback) {}
    observe(target: Element) {
      const entry = { isIntersecting: false, target, boundingClientRect: { top } } as IntersectionObserverEntry;
      this.callback([entry], this as never);
    }
    disconnect() {}
  };

const BELOW_SCREEN_TOP = 2000;
const ABOVE_SCREEN_TOP = -2000;
const OffScreenObserver = offScreenObserverAt(BELOW_SCREEN_TOP);

const stubReducedMotion = (reduce: boolean) =>
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: reduce && query === REDUCED_MOTION_QUERY,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));

const visibleText = (container: HTMLElement) => container.querySelector("[aria-hidden='true']")?.textContent;
const spokenText = (container: HTMLElement) => container.querySelector(".sr-only")?.textContent;

describe("CountUp on the server", () => {
  test("renders the final value in the visible and the spoken copy", () => {
    const html = renderToString(<CountUp value={1.5} decimals={1} suffix=" yrs" spokenSuffix=" years" />);

    expect(html).toContain("1.5<span");
    expect(html).toContain(" yrs</span>");
    expect(html).toContain("1.5 years");
  });
});

describe("CountUp in the browser", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  test("keeps the final value when IntersectionObserver is missing", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    stubReducedMotion(false);

    act(() => root.render(<CountUp {...PROPS} />));

    expect(visibleText(container)).toBe("400+");
    expect(spokenText(container)).toBe("400+");
  });

  test("keeps the final value with reduced motion", () => {
    vi.stubGlobal("IntersectionObserver", OffScreenObserver);
    stubReducedMotion(true);

    act(() => root.render(<CountUp {...PROPS} />));

    expect(visibleText(container)).toBe("400+");
  });

  test("drops to zero off screen when motion is allowed, but still speaks the final value", () => {
    vi.stubGlobal("IntersectionObserver", OffScreenObserver);
    stubReducedMotion(false);

    act(() => root.render(<CountUp {...PROPS} />));

    expect(visibleText(container)).toBe("0+");
    expect(spokenText(container)).toBe("400+");
  });

  test("keeps the final value when the page loads already scrolled past the numbers", () => {
    vi.stubGlobal("IntersectionObserver", offScreenObserverAt(ABOVE_SCREEN_TOP));
    stubReducedMotion(false);

    act(() => root.render(<CountUp {...PROPS} />));

    expect(visibleText(container)).toBe("400+");
  });
});
