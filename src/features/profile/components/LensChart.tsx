"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { CHART_LINES, CLOSING_LINE, HERO } from "@/lib/constants";
import { lensFrame, type LensFrame } from "@/lib/lens";

// Lens radius in px (the design's lensSize default)
const LENS_RADIUS = 110;

// Type size and scroll-focus range of each chart line, largest first (index matches CHART_LINES).
// Sizes are in container units of the plate, so the chart scales with it. The top line is always sharp.
const LINE_STYLES = [
  { size: "text-[17cqi]", focus: "" },
  { size: "text-[8.2cqi]", focus: "cl r2" },
  { size: "text-[4.4cqi]", focus: "cl r3" },
  { size: "text-[3.4cqi]", focus: "cl r4" },
  { size: "text-[2.7cqi]", focus: "cl r5" },
  { size: "text-[2.2cqi]", focus: "cl r6" },
];
const CLOSING_STYLE = { size: "text-[max(12px,2.1cqi)]", focus: "cl r7" };
const LINE_CLASS = "whitespace-nowrap font-bold uppercase leading-none tracking-[0.06em] [font-stretch:110%]";

const styleFor = (index: number) => LINE_STYLES[Math.min(index, LINE_STYLES.length - 1)];

/** The chart text; `blurred` adds the scroll-focus classes, the lens copy stays sharp */
const ChartLines = ({ blurred }: { blurred: boolean }) => (
  <div className="flex flex-col items-center gap-[3.4cqi] px-[6cqi] pb-[5cqi] pt-[9cqi] font-sans">
    {CHART_LINES.map((line, i) => (
      <div key={line.text} className={`${LINE_CLASS} ${styleFor(i).size} ${blurred ? styleFor(i).focus : ""}`}>
        {line.text}
      </div>
    ))}
    <div className="mx-[4cqi] mt-[1cqi] h-[2px] self-stretch bg-accent" />
    <div className={`${CLOSING_STYLE.size} ${blurred ? CLOSING_STYLE.focus : ""}`}>{CLOSING_LINE}</div>
  </div>
);

const HIDDEN_LENS: LensFrame = { x: 0, y: 0, r: LENS_RADIUS, visible: false };

/** Follows the pointer over the plate, at most once per frame */
const useLens = () => {
  const [frame, setFrame] = useState<LensFrame>(HIDDEN_LENS);
  const pendingFrame = useRef<number | null>(null);

  const cancelPending = () => {
    if (pendingFrame.current !== null) cancelAnimationFrame(pendingFrame.current);
    pendingFrame.current = null;
  };

  useEffect(() => cancelPending, []);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const plate = event.currentTarget;
    const box = plate.getBoundingClientRect();
    // The hero shrinks as it scrolls away; divide by that scale to get the plate's own pixels
    const scale = plate.offsetWidth ? box.width / plate.offsetWidth : 1;
    const px = (event.clientX - box.left) / scale;
    const py = (event.clientY - box.top) / scale;
    const size = { width: plate.offsetWidth, height: plate.offsetHeight };
    cancelPending();
    pendingFrame.current = requestAnimationFrame(() => {
      pendingFrame.current = null;
      setFrame(lensFrame(px, py, size, LENS_RADIUS));
    });
  };

  // Keep the last position so the ring fades out where it was
  const hide = () => {
    cancelPending();
    setFrame((current) => ({ ...current, visible: false }));
  };

  return { frame, move, hide };
};

export const LensChart = () => {
  const { frame, move, hide } = useLens();
  const clipRadius = frame.visible ? frame.r : 0;

  return (
    <>
      <ul aria-label={HERO.chartLabel} className="sr-only">
        {CHART_LINES.map((line) => (
          <li key={line.text}>{line.text}</li>
        ))}
        <li>{CLOSING_LINE}</li>
      </ul>
      <div
        aria-hidden="true"
        onPointerMove={move}
        onPointerLeave={hide}
        className="@container relative w-full cursor-crosshair overflow-hidden rounded-[22px] bg-plate shadow-plate"
      >
        <ChartLines blurred />
        <div
          className="pointer-events-none absolute inset-0 bg-plate"
          style={{ clipPath: `circle(${clipRadius}px at ${frame.x}px ${frame.y}px)` }}
        >
          <ChartLines blurred={false} />
        </div>
        <div
          className="pointer-events-none absolute left-0 top-0 rounded-full border-2 border-accent shadow-[0_0_0_6px_color-mix(in_srgb,var(--ink)_6%,transparent)] transition-opacity duration-200"
          style={{
            width: frame.r * 2,
            height: frame.r * 2,
            transform: `translate(${frame.x - frame.r}px, ${frame.y - frame.r}px)`,
            opacity: frame.visible ? 1 : 0,
          }}
        />
      </div>
    </>
  );
};
