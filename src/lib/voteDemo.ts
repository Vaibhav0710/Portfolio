/**
 * The "Try to vote twice" demo: a browser-only copy of the voting service's vote endpoint.
 * The checks, status codes and messages follow the real service (Voting_Voting_Service);
 * ids and hashes are random. Pure functions: the caller passes the clock and the random source.
 */
import { VOTE_STEP_LABELS } from "./constants";

export type StepState = "idle" | "run" | "pass" | "stop" | "hit" | "skip";
export type VoteStatus = 200 | 201 | 409;

/** The stored vote, with the idempotency key it was cast under */
export interface Receipt {
  key: string;
  voteId: string;
  voteHash: string;
  timestamp: string;
}

export interface VoteData {
  voteId: string;
  voteHash: string;
  timestamp: string;
  replay: boolean;
}

export interface DemoResponse {
  status: VoteStatus;
  message: string;
  data: VoteData | null;
  /** Set on the 409 error body, which has no receipt */
  timestamp: string | null;
}

export interface DemoState {
  voted: boolean;
  keyN: number;
  lastKey: string | null;
  receipt: Receipt | null;
  steps: StepState[];
  response: DemoResponse | null;
}

export interface VoteResult {
  next: DemoState;
  finals: StepState[];
  response: DemoResponse;
}

// The real service's endpoint and messages, shown as the request and response bodies
const ENDPOINT = "POST /api/v1/votes";
const ELECTION_ID = "7c1e4f2a-0b6d-4e8a-9f31-2d5c8a1b6e90";
const CANDIDATE_ID = "b3a9d0c4-5e27-4f81-a6d2-9c0e7f13b452";
const KEY_PREFIX = "vote-req-";
const MESSAGES = {
  created: "Vote successfully cast!",
  replay: "Vote already recorded (idempotent replay).",
  conflict: "User has already voted in this election.",
};
const STATUS_LINES: Record<VoteStatus, string> = { 200: "200 OK (replay)", 201: "201 Created", 409: "409 Conflict" };
const SHOWN_HASH_CHARS = 24;
const JSON_INDENT = 2;

const STEP_COUNT = VOTE_STEP_LABELS.length;
const allSteps = (state: StepState) => Array.from({ length: STEP_COUNT }, () => state);
// Only the first check ran: the key was seen before (replay) or the Redis check refused the vote
const REPLAY_FINALS: StepState[] = ["hit", ...allSteps("skip").slice(1)];
const CONFLICT_FINALS: StepState[] = ["pass", "stop", ...allSteps("skip").slice(2)];

/** Seconds precision, no zone, as the service prints it */
const stamp = (now: Date) => now.toISOString().slice(0, 19);

/** A version-4 style UUID from 32 random hex characters */
const toUuid = (hex: string) =>
  `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-a${hex.slice(17, 20)}-${hex.slice(20, 32)}`;

export const initialDemo = (): DemoState => ({
  voted: false,
  keyN: 0,
  lastKey: null,
  receipt: null,
  steps: allSteps("idle"),
  response: null,
});

export const resetDemo = initialDemo;

/** The idempotency key a new request would use */
export const nextKey = (state: DemoState) => `${KEY_PREFIX}${state.keyN + 1}`;

const receiptData = (receipt: Receipt, replay: boolean): VoteData => ({
  voteId: receipt.voteId,
  voteHash: receipt.voteHash,
  timestamp: receipt.timestamp,
  replay,
});

const answer = (status: VoteStatus, data: VoteData | null, timestamp: string | null): DemoResponse => ({
  status,
  message: status === 201 ? MESSAGES.created : status === 200 ? MESSAGES.replay : MESSAGES.conflict,
  data,
  timestamp,
});

/**
 * Sends one request: a key seen before replays its receipt (200), a voter who already voted is
 * refused (409), otherwise the vote is stored (201). `next` holds the finished run.
 */
export const vote = (state: DemoState, key: string, now: Date, rand: () => string): VoteResult => {
  const counted = key === state.lastKey ? state : { ...state, keyN: state.keyN + 1 };
  const base = { ...counted, lastKey: key };
  const finish = (next: DemoState, finals: StepState[], response: DemoResponse): VoteResult => ({
    next: { ...next, steps: finals, response },
    finals,
    response,
  });

  if (state.receipt?.key === key) {
    return finish(base, REPLAY_FINALS, answer(200, receiptData(state.receipt, true), null));
  }
  if (state.voted) {
    return finish(base, CONFLICT_FINALS, answer(409, null, stamp(now)));
  }
  const receipt: Receipt = { key, voteId: toUuid(rand()), voteHash: rand() + rand(), timestamp: stamp(now) };
  return finish({ ...base, voted: true, receipt }, allSteps("pass"), answer(201, receiptData(receipt, false), null));
};

/** Clears the steps and the response before a run plays its finals one by one */
export const startRun = (state: DemoState): DemoState => ({ ...state, steps: allSteps("idle"), response: null });

export const withStep = (state: DemoState, index: number, step: StepState): DemoState => ({
  ...state,
  steps: state.steps.map((current, i) => (i === index ? step : current)),
});

export const withResponse = (state: DemoState, response: DemoResponse): DemoState => ({ ...state, response });

export const requestText = (key: string) =>
  `${ENDPOINT}\nAuthorization: Bearer <voter JWT>\nContent-Type: application/json\n\n` +
  JSON.stringify({ electionId: ELECTION_ID, candidateId: CANDIDATE_ID, idempotencyKey: key }, null, JSON_INDENT);

export const statusLine = (response: DemoResponse) => STATUS_LINES[response.status];

export const responseBody = (response: DemoResponse) => {
  if (!response.data) {
    return JSON.stringify({ success: false, message: response.message, timestamp: response.timestamp }, null, JSON_INDENT);
  }
  const data = { ...response.data, voteHash: `${response.data.voteHash.slice(0, SHOWN_HASH_CHARS)}…` };
  return JSON.stringify({ success: true, message: response.message, data }, null, JSON_INDENT);
};
