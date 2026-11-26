"use client";

import { useEffect, useRef, useState } from "react";
import { VOTE_DEMO, VOTE_STEP_LABELS } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion";
import {
  initialDemo,
  nextKey,
  requestText,
  responseBody,
  startRun,
  statusLine,
  vote,
  withResponse,
  withStep,
  type DemoResponse,
  type DemoState,
  type StepState,
} from "@/lib/voteDemo";

// One check per step: each shows "checking" for most of the gap, then its result
const STEP_GAP_MS = 380;
const RUN_SHARE = 0.7;
const RESPONSE_DELAY_MS = 120;
const RANDOM_BYTES = 16;

// Pill colour and row border per step state, from the theme tokens
const STEP_PILL: Record<StepState, string> = {
  idle: "text-muted border-muted",
  run: "text-accent border-accent",
  pass: "text-ok border-ok",
  hit: "text-info border-info",
  stop: "text-stop border-stop",
  skip: "text-muted border-muted",
};

const STEP_ROW: Record<StepState, string> = {
  idle: "border-rule",
  run: "border-accent",
  pass: "border-ok",
  hit: "border-info",
  stop: "border-stop",
  skip: "border-rule",
};

const STATUS_LOOK: Record<DemoResponse["status"], string> = { 200: "text-info", 201: "text-ok", 409: "text-stop" };

const EXPLAIN: Record<DemoResponse["status"], string> = {
  200: VOTE_DEMO.explainReplay,
  201: VOTE_DEMO.explainCreated,
  409: VOTE_DEMO.explainConflict,
};

/** 32 random hex characters from the browser's crypto source */
const randomHex = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(RANDOM_BYTES)), (byte) => byte.toString(16).padStart(2, "0")).join("");

type RequestKind = "new" | "retry";

/** The key for a request, read from the latest state so two clicks in one tick never share a stale key */
const keyFor = (kind: RequestKind, state: DemoState) => (kind === "new" ? nextKey(state) : state.lastKey);

/** Demo state plus the step timers; every new request clears the old timers, so the newest one wins */
const useVoteRun = () => {
  const [demo, setDemo] = useState<DemoState>(initialDemo);
  const current = useRef<DemoState>(demo);
  const timers = useRef<number[]>([]);

  const commit = (update: (state: DemoState) => DemoState) => {
    current.current = update(current.current);
    setDemo(current.current);
  };
  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };
  const later = (delay: number, update: (state: DemoState) => DemoState) => {
    timers.current.push(window.setTimeout(() => commit(update), delay));
  };

  useEffect(() => clearTimers, []);

  const send = (kind: RequestKind) => {
    const key = keyFor(kind, current.current);
    if (key === null) return;
    clearTimers();
    const { next, finals, response } = vote(current.current, key, new Date(), randomHex);
    // The response is cleared first and set in a later task, so a repeated identical result is announced again
    commit(() => startRun(next));
    if (prefersReducedMotion()) {
      later(0, () => next);
      return;
    }
    finals.forEach((final, i) => {
      later(i * STEP_GAP_MS, (state) => withStep(state, i, "run"));
      later((i + RUN_SHARE) * STEP_GAP_MS, (state) => withStep(state, i, final));
    });
    later(finals.length * STEP_GAP_MS + RESPONSE_DELAY_MS, (state) => withResponse(state, response));
  };

  const reset = () => {
    clearTimers();
    commit(initialDemo);
  };

  return { demo, send, reset };
};

const buttonBase = "press min-h-12 rounded-full px-5 font-sans text-[15px] font-semibold";

const Controls = ({ demo, send, reset }: ReturnType<typeof useVoteRun>) => (
  <div className="flex flex-wrap gap-2.5">
    <button type="button" onClick={() => send("new")} className={`${buttonBase} cursor-pointer border-0 bg-ink text-paper`}>
      {VOTE_DEMO.castNew}
    </button>
    <button
      type="button"
      onClick={() => send("retry")}
      disabled={demo.lastKey === null}
      className={`${buttonBase} cursor-pointer border-[1.5px] border-ink bg-transparent text-ink`}
    >
      {VOTE_DEMO.retrySame}
    </button>
    <button
      type="button"
      onClick={reset}
      className="press min-h-12 cursor-pointer border-0 bg-transparent px-4 font-sans text-[15px] text-muted underline underline-offset-4"
    >
      {VOTE_DEMO.reset}
    </button>
  </div>
);

const codeBlock = "m-0 overflow-x-auto whitespace-pre rounded-2xl bg-code p-5 font-mono text-[13.5px] leading-[1.6] text-on-band";

const StepList = ({ steps }: { steps: StepState[] }) => (
  <ol aria-label={VOTE_DEMO.checksLabel} className="m-0 flex list-none flex-col gap-2 p-0">
    {VOTE_STEP_LABELS.map((label, i) => (
      <li
        key={label}
        className={`flex items-center justify-between gap-3 rounded-xl border-[1.5px] bg-paper px-4 py-3 font-sans text-[15px] transition-colors duration-250 ${STEP_ROW[steps[i]]}`}
      >
        <span className="text-ink">{label}</span>
        <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[12.5px] font-bold ${STEP_PILL[steps[i]]}`}>
          {VOTE_DEMO.stepStatus[steps[i]]}
        </span>
      </li>
    ))}
  </ol>
);

const ResponsePanel = ({ response }: { response: DemoResponse | null }) => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-3 font-sans">
      <span className="text-sm text-muted">{VOTE_DEMO.responseLabel}</span>
      <span
        data-status
        className={`rounded-full border-[1.5px] border-current px-3.5 py-1.5 text-[15px] font-bold ${response ? STATUS_LOOK[response.status] : "text-muted"}`}
      >
        {response ? statusLine(response) : VOTE_DEMO.waiting}
      </span>
    </div>
    <pre aria-label={VOTE_DEMO.responseBodyLabel} className={`${codeBlock} min-h-[260px]`}>
      {response ? responseBody(response) : VOTE_DEMO.waitingBody}
    </pre>
    {response && <p className="m-0 font-sans text-[13.5px] leading-normal text-muted">{EXPLAIN[response.status]}</p>}
    {/* Spoken once per finished run; empty while a run plays, so the same result twice is read twice */}
    <p aria-live="polite" className="sr-only m-0">
      {response ? `${statusLine(response)}. ${EXPLAIN[response.status]}` : ""}
    </p>
    <p className="m-0 font-sans text-[12.5px] text-muted">{VOTE_DEMO.caption}</p>
  </div>
);

/** The interactive half of "Try to vote twice": controls, request, checks and response */
export const VoteDemo = () => {
  const run = useVoteRun();
  const { demo } = run;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-5">
      <div className="flex min-w-0 flex-col gap-4">
        <Controls {...run} />
        <pre aria-label={VOTE_DEMO.requestLabel} className={codeBlock}>
          {requestText(demo.lastKey ?? nextKey(demo))}
        </pre>
        <StepList steps={demo.steps} />
      </div>
      <div className="min-w-0">
        <ResponsePanel response={demo.response} />
      </div>
    </div>
  );
};
