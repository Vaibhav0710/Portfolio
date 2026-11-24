import { describe, expect, test } from "vitest";
import { VOTE_STEP_LABELS } from "./constants";
import {
  initialDemo,
  nextKey,
  requestText,
  responseBody,
  resetDemo,
  startRun,
  statusLine,
  vote,
  withResponse,
  withStep,
  type DemoState,
} from "./voteDemo";

const NOW = new Date("2026-11-24T10:15:30.000Z");
const LATER = new Date("2026-11-24T10:16:00.000Z");

/** A deterministic stand-in for the random hex source: 32 hex characters, a new digit each call */
const counterRand = () => {
  let calls = 0;
  return () => {
    calls += 1;
    return String(calls % 10).repeat(32);
  };
};

const castFirst = () => vote(initialDemo(), "vote-req-1", NOW, counterRand());

describe("vote demo", () => {
  test("starts with every step idle and nothing sent", () => {
    const state = initialDemo();

    expect(state).toEqual({ voted: false, keyN: 0, lastKey: null, receipt: null, steps: VOTE_STEP_LABELS.map(() => "idle"), response: null });
  });

  test("a first vote passes every check and returns 201 with a receipt", () => {
    const { next, finals, response } = castFirst();

    expect(finals).toEqual(["pass", "pass", "pass", "pass", "pass", "pass"]);
    expect(response.status).toBe(201);
    expect(response.message).toBe("Vote successfully cast!");
    expect(response.data).toEqual({
      voteId: "11111111-1111-4111-a111-111111111111",
      voteHash: "2".repeat(32) + "3".repeat(32),
      timestamp: "2026-11-24T10:15:30",
      replay: false,
    });
    expect(next.voted).toBe(true);
    expect(next.lastKey).toBe("vote-req-1");
  });

  test("a retry with the same key replays and runs only the first check", () => {
    const first = castFirst();

    const { finals, response } = vote(first.next, "vote-req-1", LATER, counterRand());

    expect(finals).toEqual(["hit", "skip", "skip", "skip", "skip", "skip"]);
    expect(response.status).toBe(200);
    expect(response.message).toBe("Vote already recorded (idempotent replay).");
    expect(response.data?.replay).toBe(true);
  });

  test("a retry returns the original receipt", () => {
    const first = castFirst();

    const { response } = vote(first.next, "vote-req-1", LATER, () => "f".repeat(32));

    expect(response.data?.voteId).toBe(first.response.data?.voteId);
    expect(response.data?.voteHash).toBe(first.response.data?.voteHash);
    expect(response.data?.timestamp).toBe(first.response.data?.timestamp);
  });

  test("a new request after voting is stopped by the Redis check with 409", () => {
    const first = castFirst();

    const { next, finals, response } = vote(first.next, "vote-req-2", LATER, counterRand());

    expect(finals).toEqual(["pass", "stop", "skip", "skip", "skip", "skip"]);
    expect(response.status).toBe(409);
    expect(response.message).toBe("User has already voted in this election.");
    expect(response.data).toBeNull();
    expect(response.timestamp).toBe("2026-11-24T10:16:00");
    expect(next.receipt).toEqual(first.next.receipt);
  });

  test("retrying a refused request is refused again, not replayed", () => {
    const refused = vote(castFirst().next, "vote-req-2", LATER, counterRand());

    const { response } = vote(refused.next, "vote-req-2", LATER, counterRand());

    expect(response.status).toBe(409);
  });

  test("the vote is hashed before it is inserted, as in the voting service", () => {
    const hash = VOTE_STEP_LABELS.findIndex((label) => label.startsWith("SHA-256"));
    const insert = VOTE_STEP_LABELS.findIndex((label) => label.startsWith("Insert vote"));

    expect(hash).toBeGreaterThan(-1);
    expect(hash).toBeLessThan(insert);
  });

  test("every outcome has one final state per step", () => {
    const first = castFirst();
    const outcomes = [first, vote(first.next, "vote-req-1", LATER, counterRand()), vote(first.next, "vote-req-2", LATER, counterRand())];

    outcomes.forEach(({ finals }) => expect(finals).toHaveLength(VOTE_STEP_LABELS.length));
  });

  test("new keys count up from vote-req-1 and a retry keeps the count", () => {
    const first = vote(initialDemo(), nextKey(initialDemo()), NOW, counterRand());
    const retried = vote(first.next, "vote-req-1", LATER, counterRand());

    expect(nextKey(initialDemo())).toBe("vote-req-1");
    expect(nextKey(retried.next)).toBe("vote-req-2");
  });

  test("a second request mid-run resets the steps", () => {
    const first = castFirst();
    const midRun: DemoState = withStep(withStep(startRun(first.next), 0, "pass"), 1, "run");

    const second = vote(midRun, "vote-req-1", LATER, counterRand());
    const restarted = startRun(second.next);

    expect(restarted.steps).toEqual(VOTE_STEP_LABELS.map(() => "idle"));
    expect(restarted.response).toBeNull();
  });

  test("withStep and withResponse return new states and leave the input alone", () => {
    const start = startRun(castFirst().next);

    const stepped = withStep(start, 2, "run");
    const answered = withResponse(stepped, castFirst().response);

    expect(start.steps[2]).toBe("idle");
    expect(stepped.steps[2]).toBe("run");
    expect(answered.response?.status).toBe(201);
    expect(stepped.response).toBeNull();
  });

  test("reset returns initialDemo()", () => {
    const voted = vote(castFirst().next, "vote-req-2", LATER, counterRand()).next;

    expect(resetDemo()).toEqual(initialDemo());
    expect(resetDemo()).not.toEqual(voted);
  });
});

describe("vote demo text", () => {
  test("the request shows the endpoint, headers and idempotency key", () => {
    const text = requestText("vote-req-3");

    expect(text).toMatch(/^POST \/api\/v1\/votes\n/);
    expect(text).toContain("Authorization: Bearer <voter JWT>");
    expect(text).toContain("Content-Type: application/json");
    expect(text).toContain('"idempotencyKey": "vote-req-3"');
  });

  test("status lines name each outcome", () => {
    const first = castFirst();
    const replay = vote(first.next, "vote-req-1", LATER, counterRand()).response;
    const conflict = vote(first.next, "vote-req-2", LATER, counterRand()).response;

    expect([statusLine(first.response), statusLine(replay), statusLine(conflict)]).toEqual([
      "201 Created",
      "200 OK (replay)",
      "409 Conflict",
    ]);
  });

  test("the response body shortens the hash and shows the replay flag", () => {
    const body = responseBody(castFirst().response);

    expect(body).toContain('"voteHash": "' + "2".repeat(24) + '…"');
    expect(body).toContain('"replay": false');
    expect(body).toContain('"success": true');
  });
});
