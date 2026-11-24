import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { VOTE_DEMO } from "@/lib/constants";
import { VoteDemo } from "./VoteDemo";

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined;
}

const MID_RUN_MS = 500;

const stubMotion = (reduce: boolean) =>
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: reduce,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));

describe("VoteDemo", () => {
  let container: HTMLDivElement;
  let root: Root;
  let mounted: boolean;

  const button = (label: string) =>
    [...container.querySelectorAll("button")].find((element) => element.textContent === label) as HTMLButtonElement;
  const click = (...labels: string[]) => act(() => labels.forEach((label) => button(label).click()));
  const finishRun = () => act(() => vi.runAllTimers());
  const pills = () => [...container.querySelectorAll("ol li span:last-child")].map((pill) => pill.textContent);
  const badge = () => container.querySelector("[data-status]")?.textContent;
  const announcement = () => container.querySelector("[aria-live='polite']")?.textContent;
  const request = () => container.querySelector(`pre[aria-label='${VOTE_DEMO.requestLabel}']`)?.textContent;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    vi.useFakeTimers();
    stubMotion(false);
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
    act(() => root.render(<VoteDemo />));
    mounted = true;
  });

  afterEach(() => {
    if (mounted) act(() => root.unmount());
    container.remove();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  test("a second request mid-run wins and ends in a clean 409", () => {
    click(VOTE_DEMO.castNew);
    act(() => vi.advanceTimersByTime(MID_RUN_MS));

    click(VOTE_DEMO.castNew);
    finishRun();

    const { pass, stop, skip } = VOTE_DEMO.stepStatus;
    expect(pills()).toEqual([pass, stop, skip, skip, skip, skip]);
    expect(badge()).toBe("409 Conflict");
  });

  test("two casts in the same tick use two keys, so the second is refused", () => {
    click(VOTE_DEMO.castNew, VOTE_DEMO.castNew);
    finishRun();

    expect(badge()).toBe("409 Conflict");
    expect(request()).toContain('"idempotencyKey": "vote-req-2"');
  });

  test("reset and cast in the same tick start again from vote-req-1", () => {
    click(VOTE_DEMO.castNew);
    finishRun();

    click(VOTE_DEMO.reset, VOTE_DEMO.castNew);
    finishRun();

    expect(badge()).toBe("201 Created");
    expect(request()).toContain('"idempotencyKey": "vote-req-1"');
  });

  test("a retry in the same tick as a cast replays that cast", () => {
    click(VOTE_DEMO.castNew);
    finishRun();

    click(VOTE_DEMO.castNew, VOTE_DEMO.retrySame);
    finishRun();

    expect(badge()).toBe("409 Conflict");
    expect(request()).toContain('"idempotencyKey": "vote-req-2"');
  });

  test("announces the result only when the run finishes", () => {
    click(VOTE_DEMO.castNew);
    act(() => vi.advanceTimersByTime(MID_RUN_MS));

    expect(announcement()).toBe("");

    finishRun();

    expect(announcement()).toBe(`201 Created. ${VOTE_DEMO.explainCreated}`);
  });

  test("a repeated identical result is cleared before it is announced again", () => {
    click(VOTE_DEMO.castNew);
    finishRun();
    click(VOTE_DEMO.retrySame);
    finishRun();

    click(VOTE_DEMO.retrySame);

    expect(announcement()).toBe("");

    finishRun();

    expect(announcement()).toBe(`200 OK (replay). ${VOTE_DEMO.explainReplay}`);
  });

  test("with reduced motion the result still clears, then announces", () => {
    stubMotion(true);
    click(VOTE_DEMO.castNew);

    expect(announcement()).toBe("");

    finishRun();

    expect(announcement()).toBe(`201 Created. ${VOTE_DEMO.explainCreated}`);
  });

  test("no timer is left after unmount", () => {
    click(VOTE_DEMO.castNew);

    act(() => root.unmount());
    mounted = false;

    expect(vi.getTimerCount()).toBe(0);
  });
});
